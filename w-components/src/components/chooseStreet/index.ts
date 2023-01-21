import type {App} from 'vue'
import chooseStreet from './src/index.vue'

export default {
  install (app:App) {
    app.component('wChooseStreet', chooseStreet)
  }
}