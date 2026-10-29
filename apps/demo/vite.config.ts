import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages alt dizinde yayınlar (/Beluga-Icon/); lokal geliştirmede kök dizin kalır
  base: process.env.DEMO_BASE_PATH ?? '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@beluga-icon/react') || id.includes('/packages/react/')) {
            return 'beluga-icons'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
})
