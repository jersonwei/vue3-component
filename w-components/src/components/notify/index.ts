import type{App} from 'vue'
import notify from './src/index.vue'
export default {
  install (app:App) {
    app.component('wNotify', notify)
  }
}