<template>
  <div class="graphtrades"></div>
</template>

<script>
  import Graph from '../common/Graph.js';

  export default {
    name : 'GraphTrades',
    data() {
      return {
      };
    },
    computed: {
    },
    ready() {},
    mounted() {
      setTimeout(() => { //wait for component css to apply
        this.graph = new Graph(this.$el, {fillContainer : true});
        this.graph.init();
        this.graph.draw();
      })
    },
    destroyed() {
      this.graph.destroy();
    },
    methods: {},
    components: {}
  };
</script>

<style>
  .graphtrades {
    width: 100%;
    height: 100%;
  }
</style>
