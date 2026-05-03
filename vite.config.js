import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import anchor from 'markdown-it-anchor'

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Markdown({
      markdownItSetup(md) {
        md.use(anchor)
      }
    })
  ]
})
