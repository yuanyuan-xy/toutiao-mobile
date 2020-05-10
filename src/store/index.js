import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: ''
  },
  mutations: {
    setUser (store, data) {
      store.user = window.localStorage.setItem('user', data)
    }
  },
  actions: {
  },
  modules: {
  }
})
