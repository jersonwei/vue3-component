import { createApp } from 'vue'
// import './style.css'
import './styles/base.scss';
import './styles/ui.scss';
import wUI from './components'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import App from './App.vue'
import { toLine } from './utils/func'
const app = createApp(App)
for (const [key, component] of Object.entries(Icons)) {
app.component(`el-icon-${toLine(key)}`, component)
}
for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component)
}
app.use(router).use(ElementPlus).use(wUI)
app.mount('#app')
