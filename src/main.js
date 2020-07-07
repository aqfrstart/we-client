import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/base.css'
import '@/styles/element_cover_new.css'

// 请求plugins
import requestPlugin from '@/plugin/request.js'

Vue.use(ElementUI)
Vue.use(requestPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
