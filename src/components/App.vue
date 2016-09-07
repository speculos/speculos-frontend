<template>
  <div :class="theme">
    <h1>Speculos</h1>
    <left-menu></left-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import LeftMenu from './LeftMenu.vue'
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
  components : {
    'left-menu' : LeftMenu
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
