<template>
  <div class="ui top attached menu" :class="inverted">
    <a class="item">
      <i class="sidebar icon"></i>
    </a>
    <div class="appname item">
      <h4 class="ui header">
        Speculos
        <div class="gray sub header">v{{version}}</div>
      </h4>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name : 'MenuTop',
    data() {
      return {
        version : VERSION
      };
    },
    computed: {
      ...mapGetters({
        theme : 'theme'
      }),
      inverted() {
        return this.theme == 'theme-dark' ? 'inverted' : '';
      }
    },
    components: {}
  };
</script>

<style lang="less">
  @import "../../styles/colors.less";

  .ui.top.attached.menu {
    border-top: none;
  }
  div.ui.menu div.appname {
    padding: 0.7rem 1rem 0.3rem 1rem;

    div.sub.header {
      margin-top: -0.3rem;
      font-size: 0.7rem;
      text-align: right;
    }
  }

  .theme-light div.ui.menu div.appname h4.header {
    color : @color_light_text;
    div.sub.header {
      color : lighten(@color_light_text, 30%);
    }
  }

  .theme-dark div.ui.menu div.appname h4.header {
    color : @color_dark_text;
    div.sub.header {
      color : darken(@color_dark_text, 30%);
    }
  }
</style>
