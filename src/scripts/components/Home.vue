<template>
  <div class="home">
    <menu-top></menu-top>
    <div id="sidebarAndPage-container">
      <menu-left :class="menuLeftVisibility"></menu-left>
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
    computed : {
      menuLeftVisibility() {
        return this.$store.state.ui.menuLeft.visible ? 'visible' : 'hided'
      }
    },
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
        width: 140px;
        flex-shrink: 0;
        transition: margin-left 0.3s ease;
      }

      .menu-left.visible {
        margin-left: 0;
      }

      .menu-left.hided {
        margin-left: -140px;
      }

      #page-container {
        padding: 10px 30px 0 40px;
        overflow-y: auto;
        flex-grow: 1;
      }
    }

  }

</style>
