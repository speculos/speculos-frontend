<template>
  <div id="menutop" class="ui top attached menu" :class="themeInvertedClass">
    <a class="item" v-on:click="TOGGLE_MENU_LEFT">
      <i class="sidebar icon"></i>
    </a>
    <div class="appname item">
      <router-link to="/home">
        <h4 class="ui header">
          Speculos
          <div class="gray sub header">v{{version}}</div>
        </h4>
      </router-link>
    </div>
    <div class="right item">
      <config-cog :fields="fields"></config-cog>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import ConfigCog from './ConfigCog.vue'

  export default {
    name : 'MenuTop',
    data() {
      return {
        version : VERSION,
        fields : [{
          type : 'toggle',
          label : 'Dark theme',
          state : true,
          mutation : 'SET_THEME',
          payload : (value) => value ? {theme:'dark'} : {theme:'light'}
        }]
      }
    },
    computed : mapGetters(['themeInvertedClass']),
    methods : mapMutations(['TOGGLE_MENU_LEFT']),
    components : {
      'config-cog' : ConfigCog
    }
  }
</script>

<style lang="less">
  @import "../../styles/colors.less";

  #menutop {
    border-top: none;
    z-index: 100;

    div.appname {
      padding: 0.7rem 1rem 0.3rem 1rem;

      div.sub.header {
        margin-top: -0.3rem;
        font-size: 0.7rem;
        text-align: right;
      }
    }
  }

  .theme-light #menutop h4.header {
    color : @color_light_text;
    div.sub.header {
      color : lighten(@color_light_text, 30%);
    }
  }

  .theme-dark #menutop {
    border-bottom: 1px solid @color_dark_border;
    box-shadow: 0 -2px 19px 0px black;
    h4.header {
      color : @color_dark_text;
      div.sub.header {
        color : darken(@color_dark_text, 30%);
      }
    }
  }
</style>
