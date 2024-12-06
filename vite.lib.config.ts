import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/components/**/*.vue', 'src/index.ts'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('/src', ''),
        content
      })
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueDocViewerPlus',
      fileName: (format) => `vue-doc-viewer-plus.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'ant-design-vue'],
      output: {
        globals: {
          vue: 'Vue',
          'ant-design-vue': 'antd'
        }
      }
    }
  }
})
