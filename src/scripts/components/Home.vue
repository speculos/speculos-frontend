<template>
  <div class="home">
    <menu-top></menu-top>
    <div id="sidebarAndPage-container">
      <menu-left class="folded"></menu-left>
      <div id="page-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import MenuTop from './MenuTop.vue'
  import MenuLeft from './MenuLeft.vue'

  export default {
    name : 'Home',
    components : {
      'menu-left' : MenuLeft,
      'menu-top' : MenuTop
    }
  }
</script>

<style lang="less">

  div.home {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    #sidebarAndPage-container {
      height: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: stretch;

      .menu-left {
        width: 120px;
      }

      #page-container {
        overflow-y: auto;
        flex-grow: 1;
      }
    }

  }

</style>
