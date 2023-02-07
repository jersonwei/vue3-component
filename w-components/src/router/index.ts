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
      },
      {
        path: 'areaChoose',
        component:() => import('../views/chooseArea/index.vue')
      },
      {
        path: 'streetChoose',
        component:() => import('../views/chooseStreet/index.vue')
      },
      {
        path: 'areaCascader',
        component:() => import('../views/cascaderArea/index.vue')
      },
      {
        path: 'trend',
        component:() => import('../views/trend/index.vue')
      },
      {
        path: 'notify',
        component:() => import('../views/notify/index.vue')
      },
      {
        path: 'menu',
        component:() => import('../views/menu/index.vue')
      },
      {
        path: 'progress',
        component:() => import('../views/progress/index.vue')
      }
    ]
  }
]
const router = createRouter ({
  routes,
  history:createWebHistory()
})
export default router