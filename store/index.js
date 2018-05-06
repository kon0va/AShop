import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const createStore = () => {
  return new Vuex.Store({
    state: {
      authUser: {
        avatarUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLsa6XxsET7kz8yxwlM4F5Fq4hy5EgMibKWDCr1FTccFdo363d2lNXXXfgOsTdoibBJneZsfUSxD6pw/132',
        nickname: '亮亮亮👑'
      },
      user: null,
      products: [],
      focusProduct: {},
      payments: []
    },
    getters,
    actions,
    mutations
  })
}

export default createStore
