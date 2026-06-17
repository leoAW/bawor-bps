import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    watch: {
      usePolling: true,
    },
    port: 5173,
    proxy: {
      '/backend-api': {
        target: 'https://leoananta-bawor-bps.hf.space',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend-api/, ''),
      },
    },
  },
})
 