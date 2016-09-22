// main.js
import $ from 'jquery'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App.vue'
import ComponentLoader from './components/ComponentLoader.vue'
import store from './flux/store.js'
import router from './router.js'

sync(store, router)

// mount a root Vue instance
let app = new Vue({
  el : '#app',
  store : store,
  router : router,
  render : h => {
    if (DEV && window.location.hash) {
      let hash = window.location.hash.substr(1)
      console.log("Render component", hash)
      return h(ComponentLoader, {
        props : {name:hash}
      })
    }
    console.log("Render full app");
    return h(App);
  }
})

if (DEV) {
  window.store = store;
  window.onhashchange = () => window.location.reload(false);
}
