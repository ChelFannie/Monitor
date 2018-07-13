import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.css'
import ILayout from './components/common/i-layout'
import IForm from './components/common/i-form'
import router from './router'
import store from './store/store'

Vue.use(ElementUI)
Vue.component('i-layout', ILayout)
Vue.component('i-form', IForm)

// 路由全局守卫
router.beforeEach((to, from, next) => {
  localStorage.setItem('lastRouter', from.path)
  if (!to.meta.requireAuth) {
    if (store.state.token) {
      next()
    } else {
      next({name: '登录'})
    }
  } else {
    next()
  }
})
