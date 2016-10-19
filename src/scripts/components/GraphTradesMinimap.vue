<template>
  <div class="graph trades-minimap">
  </div>
</template>

<script>
  import Graph from '../graph/GraphTradesMinimap.js';

  let graph;

  export default {
    name : 'GraphTradesMinimap',
    data() {
      return {
      };
    },
    props : {
      data : {type : Array}
    },
    ready() {},
    mounted() {
      setTimeout(() => { //wait for component css to apply
        graph = new Graph(this.$el);
        if (this.data) {
          graph.setData(this.data);
        }
      })
    },
    watch : {
      data : ((newData) => graph.setData(newData))
    },
    updated() {
      console.log('graph updated');
      graph.setData(this.data);
    },
    destroyed() {
      graph && graph.destroy();
    },
    methods: {},
    components: {}
  };
</script>

<style lang="less">

</style>
