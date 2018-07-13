import Vue from 'vue'
import Router from 'vue-router'
import LeftNav from '@/components/left-nav'
import RealTimeMonitoring from './real-time-monitoring'
import OrderQuery from './order-query'
import Match from './match'
import ShopList from './shop-list'
// import business from './business'
// import operation from './operation'
// import member from './member'
const Welcome = () => import('../page/welcome')
const Login = () => import('../components/login')
const Error = () => import('../components/404.vue')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'leftNav',
      component: LeftNav,
      redirect: '/welcome',
      children: [
        {
          path: 'welcome',
          name: '欢迎页',
          component: Welcome
        },
        ...RealTimeMonitoring,
        ...OrderQuery,
        ...Match,
        ...ShopList
        // ...operation,
        // ...member,
        // ...system
      ]
    }, {
      path: '/login',
      name: '登录',
      component: Login,
      meta: {
        requireAuth: true
      }
    }, {
      path: '*',
      name: '404',
      component: Error
    }]
})
