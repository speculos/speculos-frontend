<template>
  <div class="app" :class="theme">
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name : 'App',
    created() {
      if (DEV) {
        const admin_token = require('../admin_token.js').default
        admin_token && this.$store.dispatch('setAuthToken', {token:admin_token})
      }
      if (this.$store.state.user.tokens.auth) {
        this.$store.dispatch('requestExchangesData')
      }
      else {
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
