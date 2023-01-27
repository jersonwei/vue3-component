import type {App} from 'vue'
import cascaderArea from './cascaderArea'
import chooseArea from './chooseArea'
import chooseStreet from './chooseStreet'
import chooseIcon from './iconChoose'
import list from './list'
import menu from './menu'
import notify from './notify'
import trend from './trend'
const components = [
  menu,
  list,
  notify,
  trend,
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