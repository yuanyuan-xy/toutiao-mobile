import Vue from 'vue'
import Vuex from 'vuex'
// 引入本地模块
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
// 定义一个代表本地数据名称得数据
const USER_KEY = 'toutiao-user'
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (store, data) {
      store.user = setItem(USER_KEY, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
