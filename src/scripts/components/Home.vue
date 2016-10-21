<template>
  <div class="home">

    <menu-top></menu-top>

    <!-- Semantic UI Sidebar -->
    <div class="sidebar-structure pushable">
      <div id="home-sidebar" class="ui left visible vertical labeled icon menu thin sidebar" :class="inverted">
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
      <div class="pusher">
        <!-- Router will mount components here -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import sidebar from 'semantic-ui-less/definitions/modules/sidebar.js'
  import { mapGetters } from 'vuex'
  import MenuTop from './MenuTop.vue'

  export default {
    name : 'Home',
    mounted () {
      $(this.$el).find('.sidebar-structure .ui.sidebar').sidebar({
        context: $('.sidebar-structure')
      })
    },
    computed: {
      ...mapGetters({
        theme : 'theme'
      }),
      inverted() {
        return this.theme == 'theme-dark' ? 'inverted' : '';
      }
    },
    components : {
      'menu-top' : MenuTop
    }
  }
</script>

<style lang="less">
  @import "../../styles/semantic.less";

  div.home {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;

    #home-sidebar {
      width: 141px;
      border-top: none;
    }

    div.pusher {
      height: 100%;
      overflow-y: auto;
    }
  }

  .theme-dark #home-sidebar {
    border-right: 1px solid #292929;
    box-shadow: -2px 0px 16px 0px black;
  }

</style>
