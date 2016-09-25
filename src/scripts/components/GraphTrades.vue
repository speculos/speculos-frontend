<template>
  <div class="graph"></div>
</template>

<script>
  import Graph from '../common/Graph.js';
  import VisuTradeDots from '../common/VisuTradeDots.js';

  let graph;

  export default {
    name : 'GraphTrades',
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
        graph = new Graph(this.$el, {fillContainer : true});
        graph.addVisualisation(VisuTradeDots);
        if (this.data) {
          graph.setData(this.data);
        }
      })
    },
    watch : {
      data : (newData) => {
        newData && graph.setData(newData)
      }
    },
    updated() {
      console.log('graph updated');
      graph.setData(this.data);
    },
    destroyed() {
      graph.destroy();
    },
    methods: {},
    components: {}
  };
</script>

<style lang="less">
  @import "../../styles/graph.less";

  .graph {
    width: 100%;
    height: 100%;
  }
</style>
