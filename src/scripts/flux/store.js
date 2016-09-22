import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'
import state from './state.js'
import * as getters from './getters.js'
import * as actions from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex)

const prod = process.env.NODE_ENV == 'production'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict : !prod,
  plugins : prod ? [] : [createLogger()]
})


if (DEV) {
  window.actions = actions;
  window.getters = getters;
  window.mutations = mutations;
}
