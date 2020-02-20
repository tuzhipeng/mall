import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

import FastClick from 'fastclick'
import VueLazeLoad from 'vue-lazyload'
import toast from 'components/common/toast'
Vue.use(toast)

// 解决移动端300ms点击延迟
FastClick.attach(document.body)
// 使用图片懒加载
Vue.use(VueLazeLoad, {
  loading: require('assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
