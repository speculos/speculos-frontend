<template>
  <div :class="theme">
    <h1>Speculos</h1>
    <menu-left></menu-left>
    <router-view></router-view>
  </div>
</template>

<script>
import MenuLeft from './MenuLeft.vue'
import { mapGetters } from 'vuex'

export default {
  name : 'App',
  computed: {
    ...mapGetters({
      theme : 'theme'
    })
  },
  data () {
    return {
    }
  },
  mounted () {

  },
  components : {
    'menu-left' : MenuLeft
  }
}
</script>

<style lang="less">
@import "../styles/semantic.less";
@textColor : #333;

body {
  color : @textColor;
  font-family: Helvetica, sans-serif;
}
</style>
