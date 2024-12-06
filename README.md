# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

# Vue Doc Viewer Plus

A Vue 3 component for viewing various document formats including PDF, Office documents and images.

## Installation

```bash
npm install vue-doc-viewer-plus
# or
yarn add vue-doc-viewer-plus
```

## Usage

### Global Registration

```typescript
import { createApp } from 'vue'
import DocViewerPlus from 'vue-doc-viewer-plus'
import 'vue-doc-viewer-plus/dist/vue-doc-viewer-plus.css'

const app = createApp(App)
app.use(DocViewerPlus)
app.mount('#app')
```

### Local Registration

```vue
<script setup lang="ts">
import { DocViewerPlus } from 'vue-doc-viewer-plus'
import 'vue-doc-viewer-plus/dist/vue-doc-viewer-plus.css'
</script>

<template>
  <doc-viewer-plus
    :file-url="fileUrl"
    :file-name="fileName"
    v-model:visible="visible"
  />
</template>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| fileUrl | String | Yes | URL of the file to preview |
| fileName | String | Yes | Name of the file (used to determine file type) |
| visible | Boolean | No | Controls the visibility of the preview modal |

## Features

- 🖼️ Image preview with zoom and rotation
- 📄 PDF document viewing
- 📝 Microsoft Office documents preview (using Microsoft Office Online Viewer)
- 💫 Beautiful UI with Ant Design Vue
- 🎯 TypeScript support
- ⚡️ Built with Vue 3 + Vite
- Support for PDF files
- Support for Office documents (Word, Excel, PowerPoint)
- Support for images
- Built-in download functionality for Office documents
- Responsive design
- Based on Ant Design Vue

## Supported File Types

- Images: jpg, jpeg, png, gif, bmp, webp
- PDF: pdf
- Office: doc, docx, xls, xlsx, ppt, pptx

## Dependencies

- Vue 3
- Ant Design Vue 4.x

## License

MIT
