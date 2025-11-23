# GenUI Chat

A progressive web app (PWA) featuring a ChatGPT-like interface for generative UI powered by local LLM. Built with vanilla JavaScript and Vite.

## Features

- 💬 **Chat Interface** - Clean, modern chat UI similar to ChatGPT
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🌙 **Dark/Light Theme** - Automatic theme detection with manual toggle
- 📴 **Offline Support** - Full PWA with service worker caching
- 💾 **Local Storage** - Messages persist across sessions
- ⚡ **Fast & Lightweight** - Vanilla JavaScript with no framework overhead
- 🎨 **Accessible** - WCAG compliant with keyboard navigation

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

## Architecture

### Tech Stack

- **Vite** - Fast build tool and dev server
- **Vanilla JavaScript** - No framework dependencies
- **CSS Variables** - Dynamic theming support
- **Service Worker** - PWA functionality
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

## Future Enhancements

- Integration with local LLM for generative UI
- Message export functionality
- Multiple conversation support
- Voice input support
- Custom themes

## License

MIT License - see LICENSE file for details


