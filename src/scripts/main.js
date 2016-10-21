// main.js
import $ from 'jquery'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App.vue'
import ComponentLoader from './components/ComponentLoader.vue'
import store from './flux/store.js'
import tradeStore from './data/tradeStore.js'
import exchangesAPI from './api/exchanges.js'
import router from './router.js'


sync(store, router)

// mount a root Vue instance
let app = new Vue({
  el : '#app',
  store : store,
  router : router,
  render : h => h(App)
})

if (DEV) {
  window.store = store;
  window.tradeStore = tradeStore;
  window.exchangesAPI = exchangesAPI;
  //window.onhashchange = () => window.location.reload(false);
}
