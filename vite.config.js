import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      srcDir: '.',
      filename: 'sw.js',
      injectManifest: {
        globPatterns: []
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  build: {
    // Generate sourcemaps for debugging
    sourcemap: true,
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  // Configure PWA
  publicDir: 'public',
  server: {
    // Enable HTTPS for testing PWA features locally
    // https: true,
    port: 5173,
    open: true,
    // Headers required for WebLLM (SharedArrayBuffer support)
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    }
  },
  preview: {
    port: 4173,
    open: true,
    // Headers required for WebLLM (SharedArrayBuffer support)
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin'
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    exclude: ['@mlc-ai/web-llm']
  }
})
