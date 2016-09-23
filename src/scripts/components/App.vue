<template>
  <div class="app" :class="theme">
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name : 'App',
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
