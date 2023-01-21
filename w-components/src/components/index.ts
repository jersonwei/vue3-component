import type {App} from 'vue'
import chooseArea from './chooseArea'
import chooseIcon from './iconChoose'

const components = [
  chooseArea,
  chooseIcon
]

export default {
  install (app:App) {
    components.map(item =>
      app.use(item))
  }
}