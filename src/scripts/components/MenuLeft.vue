<template>
  <div class="menu-left">
    <div class="ui vertical labeled icon menu" :class="themeInvertedClass">
      <router-link to="/home/overview">
        <a class="item"><i class="line chart icon"></i>Overview</a>
      </router-link>
      <router-link to="/home/bots">
        <a class="item"><i class="game icon"></i>Bots</a>
      </router-link>
      <router-link to="/home/instances">
        <a class="item"><i class="plug icon"></i>Instances</a>
      </router-link>
      <router-link to="/home/markets">
        <a class="item"><i class="bitcoin icon"></i>Markets</a>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name : 'MenuLeft',
    computed: mapGetters(['themeInvertedClass'])
  }
</script>

<style lang="less">
  @import "../../styles/colors.less";

  .menu-left {
    padding-top : 10px;
  }

  .menu-left .ui.icon.menu {
    width: 100%;
    border: none;
    box-shadow: none;
  }

  .theme-light .menu-left {
    box-shadow: -2px 0px 8px 0px black;
    .ui.icon.menu a.router-link-active a.item {
      color: @color_light_tonic;
    }
  }

  .theme-dark .menu-left {
    border-right: 1px solid #292929;
    box-shadow: -2px 0px 16px 0px black;
    .ui.icon.menu a.router-link-active a.item {
      color: @color_dark_tonic;
    }
  }

</style>
