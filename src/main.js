// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from './btnPermission'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import 'font-awesome/css/font-awesome.css'
import axios from 'axios';
import App from './App.vue'
import router from './router'
import store from './vuex'
import i18n from './i18n/i18n'
import VueQriously from 'vue-qriously';
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueQriously);




// 全局引入公共js
import Base from '../static/base';
axios.defaults.withCredentials=true;
Vue.prototype.$ajax = axios;


//  获取角色信息，根据用户权限动态加载路由
router.beforeEach((to, from, next) => {
  console.log(store.getters.token)
  // debugger

  if (store.getters.token) {
  /*   store.dispatch('setToken', store.getters.token)
    if (to.path === '/login') {
      next({path: '/'})
    } else { */
      if (!store.getters.info.role) {
        // const role = ['/markdown', '/erji', '/erji2', '/siji', '/wuji']
        !async function getAddRouters () {
          await store.dispatch('getInfo', store.getters.token)
          await store.dispatch('newRoutes', store.getters.info.role)
          console.log(store.getters.addRouters)
          await router.addRoutes(store.getters.addRouters)
          next({path: '/index'})
        }()
      } else {
        let is404 = to.matched.some(record => {
          if(record.meta.role){
            return record.meta.role.indexOf(store.getters.info.role) === -1
          }
        })
        if(is404){
          next({path: '/404'})
          return false
        }
        next()
      }
    // }
  } 
  else {
    if (to.path === '/login') {
      next()
    }
    next({path: '/login'})

  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Base,
  store,
  i18n,
  render: h => h(App),
  components: {App},
  template: '<App/>'
})
