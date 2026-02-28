// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Premium Vite Configuration
 * Includes path aliases and custom terminal logging for high-integrity debugging.
 */
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'terminal-logger',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/__log') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              const { level, message, args } = JSON.parse(body);
              const colors: Record<string, string> = {
                INFO: '\x1b[32m',
                WARN: '\x1b[33m',
                ERROR: '\x1b[31m',
                DEBUG: '\x1b[34m',
              };
              const reset = '\x1b[0m';
              const color = colors[level as keyof typeof colors] || reset;
              // eslint-disable-next-line no-console
              console.log(`${color}[Client ${level}]${reset} ${message}`, ...(args || []));
              res.end();
            });
          } else {
            next();
          }
        });
      },
    }
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@sections': resolve(__dirname, './src/components/sections'),
      '@ui': resolve(__dirname, './src/components/ui'),
      '@layout': resolve(__dirname, './src/components/layout'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@lib': resolve(__dirname, './src/lib'),
      '@data': resolve(__dirname, './data'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-utils': ['framer-motion', 'lucide-react', 'clsx', 'tailwind-merge'],
        },
      },
    },
  },
});
