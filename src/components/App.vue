<template>
  <div class="app-structure" :class="theme">

    <menu-top></menu-top>

    <!-- Semantic UI Sidebar -->
    <div class="sidebar-structure pushable">
      <div class="ui left visible vertical labeled icon menu thin sidebar">
        <router-link to="overview">
          <a class="item"><i class="line chart icon"></i>Overview</a>
        </router-link>
        <router-link to="bots">
          <a class="item"><i class="game icon"></i>Bots</a>
        </router-link>
        <router-link to="instances">
          <a class="item"><i class="plug icon"></i>Instances</a>
        </router-link>
        <router-link to="markets">
          <a class="item"><i class="bitcoin icon"></i>Markets</a>
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
      $('.sidebar-structure .ui.sidebar').sidebar({
        context: $('.sidebar-structure')
      })
    },
    components : {
      'menu-top' : MenuTop
    }
  }
</script>

<style lang="less">
  @import "../styles/semantic.less";

  div.app-structure {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  div.ui.sidebar {
    width: 141px !important;
    border-top: none;
  }
</style>
