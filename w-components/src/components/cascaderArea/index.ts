import type {App} from 'vue'
import cascaderArea from './src/index.vue'

export default {
  install (app:App) {
    app.component('wCascaderArea',cascaderArea)
  }
}