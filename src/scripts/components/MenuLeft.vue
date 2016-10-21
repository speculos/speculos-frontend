<template>
  <div class="menu-left">
    <div class="ui vertical labeled icon menu" :class="inverted">
      <router-link to="/home/overview">
        <a class="item"><i class="line chart icon"></i>Overview</a>
      </router-link>
      <router-link to="/home/bots">
        <a class="item"><i class="game icon"></i>Bots</a>
      </router-link>
      <router-link to="/home/instances">
        <a class="item"><i class="plug icon"></i>Instances</a>
      </router-link>
      <router-link to="/home/exchanges">
        <a class="item"><i class="bitcoin icon"></i>Exchanges</a>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name : 'MenuLeft',
    computed: {
      ...mapGetters(['theme']),
      inverted() {
        return this.theme == 'theme-dark' ? 'inverted' : '';
      }
    },
  }
</script>

<style lang="less">
  @import "../../styles/semantic.less";

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
  }

  .theme-dark .menu-left {
    border-right: 1px solid #292929;
    box-shadow: -2px 0px 16px 0px black;
  }

</style>
