<template>
  <div class="panel ui segments">
    <div class="panel-header ui segment" v-if="showHeader">
      <slot name="header"><h3>Default header</h3></slot>
    </div>
    <div class="panel-content ui segment" :class="{loading}">
      <slot>Default panel content</slot>
    </div>
    <div class="panel-footer ui segment" v-if="showFooter">
      <slot name="footer">Default panel footer</slot>
    </div>
  </div>
</template>

<script>
import ConfigCog from './ConfigCog.vue'

export default {
  props: {
    loading : {type : Boolean, default : false},
    showHeader : {type : Boolean, default : true},
    showFooter : {type : Boolean, default : true},
  },
  components : {
    "config-cog" : ConfigCog
  }
}
</script>

<style lang="less">
  @import "../../styles/colors.less";

  .panel {
    margin: 20px 10px;
    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
        margin-bottom: 0;
      }
    }
    .panel-content {
      width: 100%;
      height: 100%;
    }
  }

  .theme-dark {
    .panel {
      .ui.segment {
        background-color: lighten(@color_dark_bg, 5%);
        border-top: 1px solid lighten(@color_dark_bg, 8%);
      }
      .ui.loading.segment:before {
        background-color: lighten(@color_dark_bg, 5%);
      }
    }
  }
</style>
