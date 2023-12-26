import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/lib/index.ts', import.meta.url)),
      name: 'VueDirectives',
      fileName: (format) => {
        if (format === 'umd') {
          return 'index.js'
        } else {
          return 'index.mjs'
        }
      }
    }
  },
  server: {
    port: 4000
  }
})
