import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
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
    open: true
  },
  preview: {
    port: 4173,
    open: true
  }
})
