import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  token: sessionStorage.getItem('token')
}

const mutations = {
  editFootBallScrollId (state, param) {
    state.footBallScrollId = param
  },
  token (state, param) {
    state.token = param
  }
}

const actions = {

}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
