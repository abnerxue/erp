import Vue from 'vue'
import App from './App'
import pageHead from './components/page-head.vue'
import util from "./common/util";

Vue.config.productionTip = false
Vue.prototype.$jump=util.jump
Vue.prototype.$msg=util.msg

App.mpType = 'app'
Vue.component('page-head', pageHead)
const app = new Vue({
    ...App
})
app.$mount()
