import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  base: '/', // Base path yang eksplisit
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    outDir: 'dist',
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
    proxy: {
      '/apotek-backend': {
        target: 'https://romanesco.it.com/apotek-backend', // Tambahkan port Laravel
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apotek-backend/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
