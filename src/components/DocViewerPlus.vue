<template>
  <div class="vue-doc-viewer">
    <!-- 图片预览组件 -->
    <a-image
      :style="{ display: 'none' }"
      v-if="isImage && previewVisible"
      :width="200"
      
      :src="props.fileUrl"
      :preview="{
        visible: previewVisible,
        onVisibleChange: (visible) => {
          handlePreviewChange(visible);
        }
      }"
      class="preview-image"
      v-show="false"
    />

    <!-- 其他文件类型的模态框预览 -->
    <a-modal
      v-if="!isImage"
      v-model:visible="innerVisible"
      :footer="null"
      @cancel="handleClose"
      width="80%"
      wrapClassName="doc-viewer-modal"
      :centered="true"
    >
      <template #title>
        <div class="modal-header">
          <span class="modal-title">预览</span>
          <a-button 
            v-if="isOffice" 
            type="link" 
            class="download-btn"
            @click="handleDownload"
          >
            <template #icon><DownloadOutlined /></template>
            下载
          </a-button>
        </div>
      </template>
      <div class="doc-viewer-container">
        <iframe
          v-if="isOffice"
          :src="officeViewerUrl"
          width="100%"
          height="100%"
          frameborder="0"
        ></iframe>
        <embed
          v-else-if="isPdf"
          :src="props.fileUrl"
          type="application/pdf"
          width="100%"
          height="100%"
        />
        <div v-else class="unsupported-format">
          不支持的文件格式
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Modal, Image, Button } from 'ant-design-vue'
import { DownloadOutlined } from '@ant-design/icons-vue'
import 'ant-design-vue/dist/reset.css'

// 组件重命名
const AModal = Modal
const AImage = Image
const AButton = Button

const props = defineProps({
  fileUrl: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible'])

const innerVisible = ref(props.visible)
const previewVisible = ref(false)

// 监听visible属性变化
watch(() => props.visible, (newVal) => {
  if (isImage.value) {
    previewVisible.value = newVal
  } else {
    innerVisible.value = newVal
  }
})

// 监听内部visible变化
watch(() => innerVisible.value, (newVal) => {
  emit('update:visible', newVal)
})

const handleClose = () => {
  innerVisible.value = false
  previewVisible.value = false
  emit('update:visible', false)
}

const handlePreviewChange = (visible: boolean) => {
  previewVisible.value = visible
  emit('update:visible', visible)
}

const handleDownload = () => {
  if (props.fileUrl) {
    const link = document.createElement('a')
    link.href = props.fileUrl
    link.download = props.fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// 文件类型判断
const fileExtension = computed(() => {
  return props.fileName.split('.').pop()?.toLowerCase() || ''
})

const isImage = computed(() => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
  return imageExtensions.includes(fileExtension.value)
})

const isPdf = computed(() => {
  return fileExtension.value === 'pdf'
})

const isOffice = computed(() => {
  const officeExtensions = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx']
  return officeExtensions.includes(fileExtension.value)
})

// Office文档在线预览URL（使用微软在线预览服务）
const officeViewerUrl = computed(() => {
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(props.fileUrl)}`
})
</script>

<style>
/* 全局样式覆盖 */
:global(.ant-modal-wrap) {
  overflow: hidden !important;
}

:global(.ant-modal-mask) {
  position: fixed !important;
}

:global(.ant-image-preview-img) {
  display: inline-block;
  max-width: 100%;
  max-height: 100%;
}

:global(.ant-image-preview-operations) {
  background: rgba(0, 0, 0, 0.5);
}
</style>

<style scoped>
.vue-doc-viewer {
  width: 100%;
  height: 100%;
}

.doc-viewer-container {
  width: 100%;
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f2f5;

  iframe,
  embed {
    width: 100%;
    height: 100%;
    border: none;
  }
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  
  :deep(.ant-image) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  :deep(.ant-image-img) {
    object-fit: contain;
    max-width: 100%;
    max-height: 75vh;
  }
}

.unsupported-format {
  padding: 20px;
  text-align: center;
  color: #999;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .modal-title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }

  .download-btn {
    padding-right: 50px !important;

    &:hover,
    &:focus {
      color: #1890ff !important;
      border-color: transparent !important;
      background: transparent !important;
    }
  }
}
</style>
