# GenUI Chat

A progressive web app (PWA) featuring a ChatGPT-like interface for generative UI powered by local LLM. Built with vanilla JavaScript and Vite.

## Features

- 💬 **Chat Interface** - Clean, modern chat UI similar to ChatGPT
- 🤖 **In-Browser LLM** - Powered by WebLLM for client-side AI inference
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🌙 **Dark/Light Theme** - Automatic theme detection with manual toggle
- 📴 **Offline Support** - Full PWA with service worker caching
- 💾 **Local Storage** - Messages persist across sessions
- ⚡ **Fast & Lightweight** - Vanilla JavaScript with no framework overhead
- 🎨 **Accessible** - WCAG compliant with keyboard navigation
- 🔒 **Privacy First** - All AI processing happens locally in your browser

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## PWA Features

### Installation

The app can be installed on any device:

- **Desktop**: Click the install icon in the browser address bar
- **Mobile**: Use "Add to Home Screen" from the browser menu
- **iOS**: Tap the share button and select "Add to Home Screen"

### Offline Support

- All app assets are cached for offline use
- Messages are stored locally in browser storage
- Works completely offline after first visit

### Service Worker

The service worker provides:
- Automatic caching of static assets
- Network-first strategy for dynamic content
- Background cache updates
- Offline fallback support
- WebLLM engine hosting for persistent AI inference

## Architecture

### Tech Stack

- **Vite** - Fast build tool and dev server
- **Vanilla JavaScript** - No framework dependencies
- **WebLLM** - In-browser LLM inference engine
- **CSS Variables** - Dynamic theming support
- **Service Worker** - PWA functionality and WebLLM hosting
- **LocalStorage API** - State persistence

### File Structure

```
genui-web/
├── public/
│   ├── manifest.json      # PWA manifest
│   ├── sw.js             # Service worker
│   └── icon.svg          # App icons
├── index.html            # Main HTML file
├── main.js              # Application logic
├── style.css            # Styles and themes
└── vite.config.js       # Vite configuration
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Development

The app uses modern web standards:
- ES Modules
- CSS Custom Properties
- Service Worker API
- LocalStorage API
- Async/Await

## WebLLM Integration

This app uses [WebLLM](https://webllm.mlc.ai/) to run large language models directly in the browser using WebGPU. The LLM inference happens entirely on your device, ensuring privacy and enabling offline functionality.

### How It Works

- **Service Worker Architecture**: WebLLM runs in a service worker, keeping the model loaded even when navigating between pages
- **Local Inference**: All AI processing happens on your device using WebGPU
- **Model**: Currently configured with Llama-3.2-3B-Instruct-q4f32_1-MLC (can be changed in `main.js`)
- **Privacy**: No data is sent to external servers

### Requirements

- Modern browser with WebGPU support (Chrome 113+, Edge 113+)
- Sufficient RAM (at least 4GB recommended)
- Initial model download (approximately 1.5GB) cached locally after first use

### First Use

On first launch, the app will download the LLM model to your browser's cache. This may take a few minutes depending on your internet connection. Subsequent uses will load instantly from cache.

## Future Enhancements

- Model selection UI
- Streaming responses
- Message export functionality
- Multiple conversation support
- Voice input support
- Custom themes

## License

MIT License - see LICENSE file for details


