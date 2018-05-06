import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({})

store.registerModule('vux', {
  state: {
    isLoading: false,
    isShowBaseNav: true
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    toggleBaseNav (state, payload) {
      state.isShowBaseNav = payload.isShowNav
    } 
  }
})

export default store
