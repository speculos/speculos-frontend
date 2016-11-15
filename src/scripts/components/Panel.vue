<template>
  <div class="panel ui segments" :class="{hover}">
    <div class="panel-header ui segment" v-if="showHeader" @mouseenter="hover=true" @mouseleave="hover=false">
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

export default {
  data() {
    return {
      hover : false
    }
  },
  props: {
    loading : {type : Boolean, default : false},
    showHeader : {type : Boolean, default : true},
    showFooter : {type : Boolean, default : true},
  }
}
</script>

<style lang="less">
  @import "../../styles/colors.less";

  .ui.segments.panel {
    margin: 20px 10px;
    border: none;
    box-shadow: none;
    .ui.segment {
      transition: all 0.3s ease 0.1s;
      background-color: transparent;
      border-color: transparent;
    }
    .ui.segment.loading:before {
      background-color: transparent;
    }
  }

  .theme-dark {
    .panel.hover .ui.segment {
      background-color: lighten(@color_dark_bg, 5%);
      border-color: lighten(@color_dark_bg, 12%);
    }
  }

  .theme-light {
    .panel.hover .ui.segment {
      background-color: darken(@color_light_bg, 5%);
      border-color: darken(@color_light_bg, 12%);
    }
  }
</style>
