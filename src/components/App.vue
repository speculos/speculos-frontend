<template>
  <div>
    <h1>Speculos</h1>
    <left-menu></left-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import LeftMenu from './LeftMenu.vue';

export default {
  name : 'App',
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
