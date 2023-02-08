import type{App} from 'vue'
import timer from './src/index.vue'
export default {
  install (app:App) {
    app.component('wTimer', timer)
  }
}