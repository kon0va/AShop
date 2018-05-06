// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import store from './store'
import { AjaxPlugin } from 'vux'

Vue.use(VueRouter)

FastClick.attach(document.body)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  store.commit('updateLoadingStatus', { isLoading: true })
  next()
})

router.afterEach(to => {
  store.commit('updateLoadingStatus', { isLoading: false })
})

Vue.use(AjaxPlugin)
let http = Vue.prototype.$http
http.defaults.baseURL ="/api/v1"
http.defaults.timeout = 5000

http.interceptors.request.use(
  config => {
    store.commit('updateLoadingStatus', { isLoading: true })
    return config
  },
  err => {
    store.commit('updateLoadingStatus', { isLoading: false })
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  response => {
    let resData = response.data
    if (resData.data && typeof resData.data === 'string') {
      try {
        resData.data = JSON.parse(resData.data)
      } catch (e) {
        console.log('parse API Response error: ', e.message)
      }
    }
    // if (resData.token) store.commit(types.LOGIN, resData)
    store.commit('updateLoadingStatus', { isLoading: false })
    return resData
  },
  async error => {
    if (error.response) {
    }
    store.commit('updateLoadingStatus', { isLoading: false })
    return Promise.reject(error.response.data)
  }
)
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
