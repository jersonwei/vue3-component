import type {App} from 'vue'
import './styles/base.scss'
import './styles/ui.scss'
import calendar from './calendar'
import cascaderArea from './cascaderArea'
import chooseArea from './chooseArea'
import chooseCity from './chooseCity'
import chooseDate from './chooseDate'
import chooseStreet from './chooseStreet'
import form from './form'
import chooseIcon from './iconChoose'
import list from './list'
import menu from './menu'
import modelForm from './modelForm'
import notify from './notify'
import progress from './progress'
import table from './table'
import timer from './timer'
import trend from './trend'
const components = [
  calendar,
  table,
  modelForm,
  form,
  chooseCity,
  chooseDate,
  timer,
  progress,
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