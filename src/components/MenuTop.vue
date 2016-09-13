<template>
  <div class="ui top attached menu">
    <a class="item">
      <i class="sidebar icon"></i>
    </a>
    <div class="item">
      <h3>Speculos</h3>
      <span class="version">v{{version}}</span>
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

<style scoped>
  .ui.top.attached.menu {
    border-top: none;
  }
  span.version {
    color: #CCC;
    font-size: 0.9rem;
  }
</style>
