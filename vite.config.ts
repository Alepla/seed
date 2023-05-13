/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    host: "0.0.0.0",
    watch: {
      usePolling: true,
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./setupTest.ts']
  },
})
