import './style.css'
import { CreateServiceWorkerMLCEngine } from "@mlc-ai/web-llm";

// ===== State Management =====
const STATE_KEY = 'genui-chat-state'
let messages = []
let currentTheme = null
let engine = null

// ===== DOM Elements =====
const messagesContainer = document.getElementById('messages')
const chatForm = document.getElementById('chat-form')
const messageInput = document.getElementById('message-input')
const themeToggle = document.getElementById('theme-toggle')
const newChatButton = document.getElementById('new-chat')

// ===== Initialization =====
function init() {
  loadState()
  setupEventListeners()
  renderMessages()
  loadTheme()
}

// ===== Local Storage =====
function loadState() {
  try {
    const saved = localStorage.getItem(STATE_KEY)
    if (saved) {
      const state = JSON.parse(saved)
      messages = state.messages || []
    }
  } catch (e) {
    console.error('Failed to load state:', e)
  }
}

function saveState() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify({ messages }))
  } catch (e) {
    console.error('Failed to save state:', e)
  }
}

// ===== Theme Management =====
function loadTheme() {
  try {
    currentTheme = localStorage.getItem('theme')
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme)
    }
  } catch (e) {
    console.error('Failed to load theme:', e)
  }
}

function toggleTheme() {
  const html = document.documentElement
  const currentTheme = html.getAttribute('data-theme')

  let newTheme
  if (currentTheme === 'dark') {
    newTheme = 'light'
  } else if (currentTheme === 'light') {
    newTheme = null
  } else {
    // No explicit theme, use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    newTheme = prefersDark ? 'light' : 'dark'
  }

  if (newTheme) {
    html.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  } else {
    html.removeAttribute('data-theme')
    localStorage.removeItem('theme')
  }
}

// ===== Event Listeners =====
function setupEventListeners() {
  // Chat form submission
  chatForm.addEventListener('submit', handleSubmit)

  // Auto-resize textarea
  messageInput.addEventListener('input', autoResizeTextarea)

  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme)

  // New chat
  newChatButton.addEventListener('click', handleNewChat)

  // Enter to send, Shift+Enter for new line
  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      chatForm.dispatchEvent(new Event('submit'))
    }
  })
}

// ===== Message Handling =====
async function handleSubmit(e) {
  e.preventDefault()

  const text = messageInput.value.trim()
  if (!text) return

  // Add user message
  addMessage('user', text)

  // Clear input and reset height
  messageInput.value = ''
  messageInput.style.height = 'auto'

  // Show typing indicator
  showTypingIndicator()

  // Simulate assistant response
  await simulateAssistantResponse(text)
}

function addMessage(role, content) {
  const message = {
    role,
    content,
    timestamp: Date.now()
  }

  messages.push(message)
  saveState()
  renderMessages()
  scrollToBottom()
}

async function simulateAssistantResponse(userMessage) {
  try {
    // Check if engine is initialized
    if (!engine) {
      hideTypingIndicator()
      addMessage('assistant', 'WebLLM engine is still initializing. Please wait a moment and try again.')
      return
    }

    // Prepare conversation history for the LLM
    const conversationMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }))

    // Generate response using WebLLM
    const completion = await engine.chat.completions.create({
      messages: conversationMessages,
      stream: false,
      temperature: 0.7,
      max_tokens: 512
    })

    // Remove typing indicator
    hideTypingIndicator()

    // Extract response content
    const assistantMessage = completion.choices[0].message.content
    addMessage('assistant', assistantMessage)
  } catch (error) {
    console.error('Error generating response:', error)
    hideTypingIndicator()
    addMessage('assistant', `Error: ${error.message || 'Failed to generate response. Please try again.'}`)
  }
}

function showTypingIndicator() {
  const indicator = document.createElement('div')
  indicator.className = 'typing-indicator'
  indicator.id = 'typing-indicator'
  indicator.innerHTML = `
    <div class="typing-indicator-content">
      <div class="message-avatar">AI</div>
      <div class="typing-dots">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `
  messagesContainer.appendChild(indicator)
  scrollToBottom()
}

function hideTypingIndicator() {
  const indicator = document.getElementById('typing-indicator')
  if (indicator) {
    indicator.remove()
  }
}

function handleNewChat() {
  if (messages.length === 0) return

  const confirm = window.confirm('Start a new chat? Current conversation will be saved.')
  if (confirm) {
    messages = []
    saveState()
    renderMessages()
  }
}

// ===== Rendering =====
function renderMessages() {
  // Clear container except for welcome message
  messagesContainer.innerHTML = ''

  if (messages.length === 0) {
    // Show welcome message
    messagesContainer.innerHTML = `
      <div class="welcome-message">
        <h2>Welcome to GenUI Chat</h2>
        <p>Start a conversation below. Your messages are stored locally and work offline.</p>
      </div>
    `
    return
  }

  // Render all messages
  messages.forEach(message => {
    const messageEl = createMessageElement(message)
    messagesContainer.appendChild(messageEl)
  })
}

function createMessageElement(message) {
  const div = document.createElement('div')
  div.className = `message ${message.role}`

  const avatar = message.role === 'user' ? 'You' : 'AI'

  div.innerHTML = `
    <div class="message-content">
      <div class="message-avatar">${avatar}</div>
      <div class="message-text">${escapeHtml(message.content)}</div>
    </div>
  `

  return div
}

// ===== Utilities =====
function autoResizeTextarea() {
  messageInput.style.height = 'auto'
  messageInput.style.height = messageInput.scrollHeight + 'px'
}

function scrollToBottom() {
  requestAnimationFrame(() => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  })
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// ===== Service Worker Registration & WebLLM Engine Initialization =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        import.meta.env.MODE === 'production' ? '/sw.js' : '/dev-sw.js?dev-sw',
        { type: 'module' }
      )
      console.log('Service Worker registered:', registration.scope)

      // Initialize WebLLM engine with service worker
      console.log('Initializing WebLLM engine...')
      engine = await CreateServiceWorkerMLCEngine(
        "Llama-3.2-3B-Instruct-q4f32_1-MLC", // Default model
        {
          initProgressCallback: (progress) => {
            console.log('WebLLM init progress:', progress)
            // You can update UI here to show loading progress
          }
        }
      )
      console.log('WebLLM engine initialized successfully')

      // Check for updates periodically
      setInterval(() => {
        registration.update()
      }, 60000) // Check every minute
    } catch (error) {
      console.error('Service Worker registration or WebLLM initialization failed:', error)
    }
  })
}

// ===== Start the app =====
init()
