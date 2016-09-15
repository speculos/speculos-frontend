// main.js
import $ from 'jquery'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App.vue'
import store from './flux/store.js'
import router from './router.js'

sync(store, router)

// mount a root Vue instance
let app = new Vue({
  el : '#app',
  store : store,
  router : router,
  render : h => h(App)
})

//Vuex debug
window.store = store
