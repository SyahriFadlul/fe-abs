import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  // server: {
  //   port: 3000,
  //   hmr : {
  //     host: 'localhost'
  //   },
  //   test: {
  //     include: ['src/**/*.{test,spec}.{js,ts}'],
  //   },
  // },
  proxy: {
    '/.netlify/functions': {
      target: 'http://localhost:8888', // Netlify dev server
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/\.netlify\/functions/, '/.netlify/functions')
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  envDir: './'
})
