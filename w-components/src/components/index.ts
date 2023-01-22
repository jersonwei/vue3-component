import type {App} from 'vue'
import cascaderArea from './cascaderArea'
import chooseArea from './chooseArea'
import chooseStreet from './chooseStreet'
import chooseIcon from './iconChoose'
const components = [
  chooseArea,
  chooseIcon,
  chooseStreet,
  cascaderArea
]

export default {
  install (app:App) {
    components.map(item =>
      app.use(item))
  }
}