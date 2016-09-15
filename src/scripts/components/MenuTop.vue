<template>
  <div class="ui top attached menu">
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
  export default {
    name : 'MenuTop',
    data() {
      return {
        version : VERSION
      };
    },
    computed: {},
    ready() {},
    attached() {},
    methods: {},
    components: {}
  };
</script>

<style scoped lang="less">
  .ui.top.attached.menu {
    border-top: none;
  }
  div.ui.menu div.appname {
    padding: 0.7rem 1rem 0.3rem 1rem;

    div.sub.header {
      margin-top: -0.3rem;
      color: #CCC;
      font-size: 0.7rem;
      text-align: right;
    }
  }
</style>
