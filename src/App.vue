<script setup lang="ts">
import { ref } from 'vue'
import DocViewerPlus from './components/DocViewerPlus.vue'
import { Button } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

const visible = ref(false)
const fileUrl = ref('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png')
const fileName = ref('example.png')
</script>

<template>
  <div class="container">
    <h1>文档预览器演示</h1>
    <div class="demo-section">
      <Button type="primary" @click="visible = !visible">
        {{ visible ? '关闭预览' : '点击预览' }}
      </Button>
      
      <DocViewerPlus
        v-model:visible="visible"
        :file-url="fileUrl"
        :file-name="fileName"
      />
    </div>

    <div class="file-list">
      <h2>测试文件列表</h2>
      <ul>
        <li>
          <Button @click="() => {
            fileUrl = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
            fileName = 'example.png';
            visible = true;
          }">预览图片</Button>
        </li>
        <li>
          <Button @click="() => {
            fileUrl = 'https://dev.oss.zhongbiao001.com/test/platform/staff/2024/08/20/FoM-vhc3Y0zdZlJnZbhs7vFcbp4S.pdf';
            fileName = 'sample.pdf';
            visible = true;
          }">预览PDF</Button>
        </li>
        <li>
          <Button @click="() => {
            fileUrl = 'https://dev.oss.zhongbiao001.com/test/platform/staff/2024/12/06/FqvqPrP66n5STtYUSN-PTgeI6EJk.doc';
            fileName = 'sample.docx';
            visible = true;
          }">预览Word文档</Button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 30px;
}

.demo-section {
  margin-bottom: 40px;
}

.file-list {
  text-align: left;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 8px;
}

.file-list h2 {
  margin-bottom: 20px;
  color: #2c3e50;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 15px;
}

button {
  margin: 5px;
}
</style>
