import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/dashboard.vue'
import { mscf } from '@/utils'

let routerArr = []
const files = require.context('./', false, /\.js$/)

files.keys().forEach((key) => {
  if (key.match(/index\.js/)) {
    return
  }
  routerArr = routerArr.concat(files(key).default)
})

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard
  },
  ...routerArr,
  {
    path: '*',
    name: 'page404',
    component: () => import('../views/Page404.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  mscf.emit('routeChange', '*', to.fullPath)
  next()
})

export default router
