import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import DocViewerPlus from './index'

import './style.css'

const app = createApp(App)
app.use(Antd)
app.use(DocViewerPlus)
app.mount('#app')
