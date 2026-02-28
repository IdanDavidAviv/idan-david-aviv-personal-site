import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Spirit Lab Terminal Logger for better debugging
const terminalLogger = () => ({
  name: 'terminal-logger',
  configureServer(server) {
    server.ws.on('terminal:log', (data) => {
      const { level, message, args } = data
      const colors = {
        INFO: '\x1b[32m',
        WARN: '\x1b[33m',
        ERROR: '\x1b[31m',
        DEBUG: '\x1b[36m',
      }
      const reset = '\x1b[0m'
      const color = colors[level] || reset
      console.log(`${color}[Client ${level}]${reset} ${message}`, ...(args || []))
    })
  }
})

export default defineConfig({
  plugins: [react(), terminalLogger()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@sections': path.resolve(__dirname, './src/components/sections'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@data': path.resolve(__dirname, './src/data'),
    },
  },
})

