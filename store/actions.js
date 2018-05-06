import axios from 'axios'
import Services from './services'

export default {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.user) {
      const { email, nickname, avatarUrl } = req.session.user
      const user = {
        email,
        nickname,
        avatarUrl
      }

      commit('SET_USER', user)
    }
  },

  getWechatSignature ({ commit }, url) {
    return Services.getWechatSignature(url)
  },

  getWechatOAuth ({ commit }, url) {
    return Services.getWechatOAuth(url)
  },

  setAuthUser ({ commit }, authUser) {
    commit('SET_AUTHUSER', authUser)
  },

  async login ({ commit }, { email, password }) {
    try {
      let res = await axios.post('/api/login', {
        email,
        password
      })

      let { data } = res
      if (!data.ret) commit('SET_USER', data.user)

      return data
    } catch (e) {
      if (e.response.status === 401) {
        throw new Error('You can\'t do it')
      }
    }
  },

  async logout ({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  },

  async  fetchProducts ({ state }) {
    const res = await Services.allProducts()
    state.products = res.data
    return res
  },

  async focusProduct ({ state }, _id) {
    if (_id === state.focusProduct._id) return
    const res = await Services.focusProduct(_id)
    state.focusProduct = res.data
    return res
  },

  async fetchPayments ({ state }) {
    let { data } = await Services.getPayments()
    console.log(data)
    state.payments = data
    return data
  },

  async saveProduct ({ state, dispatch }, product) {
    await axios.post('/api/products', product)
    let res = await dispatch('fetchProducts')
    return res.data
  },

  async putProduct ({ state, dispatch }, product) {
    await axios.put('/api/products', product)
    let res = await dispatch('fetchProducts')
    return res.data
  }
}
