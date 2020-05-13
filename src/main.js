import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant
import Vant from 'vant'
// 引入vant样式
import 'vant/lib/index.css'

// 引入rem
import 'amfe-flexible'

// 全局样式
import '@/styles/index.less'

// 加载过滤时间的dayjs
import './utils/dayjs'

// 使用vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
