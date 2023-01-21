import { defineConfig } from 'vite'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3012
  },

  // https://cn.vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/chafingdish.ts'),
      name: 'Chafingdish',
      // the proper extensions will be added
      fileName: 'chafingdish'
    },
  }
})
