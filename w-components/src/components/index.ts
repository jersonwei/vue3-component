import type {App} from 'vue'
import chooseArea from './chooseArea'
import chooseStreet from './chooseStreet'
import chooseIcon from './iconChoose'
const components = [
  chooseArea,
  chooseIcon,
  chooseStreet
]

export default {
  install (app:App) {
    components.map(item =>
      app.use(item))
  }
}