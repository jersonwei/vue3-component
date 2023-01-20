import { createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'
import container from '../components/container/src/index.vue'
const routes: RouteRecordRaw[] =[
  {
    path:'/',
    component:() => container,
    children:[
      {
        path: '',
        component : () => import('../views/Home.vue')
      },
      {
        path: 'iconChoose',
        component:() => import('../views/chooseIcon/index.vue')
      }
    ]
  }
]
const router = createRouter ({
  routes,
  history:createWebHistory()
})
export default router