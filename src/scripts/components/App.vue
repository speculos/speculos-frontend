<template>
  <div class="app" :class="theme">
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name : 'App',
    created() {
      if (DEV) {
        const admin_token = require('../admin_token.js').default
        admin_token && this.$store.dispatch('setAuthToken', {token:admin_token})
      }
      if (this.$store.state.user.tokens.auth) {
        //INIT
        this.$store.dispatch('requestExchangesData')
        let now = +new Date()
        this.$store.commit('SET_GRAPH_TRADES_PERIOD', {period:[now-60*60*1000, now]})
      }
      else {
        //TODO launch login page
      }
    },
    computed: {
      ...mapGetters({
        theme : 'theme'
      })
    }
  }
</script>

<style lang="less">
  @import "../../styles/app.less";

  .app {
    height: 100%;
  }
</style>
