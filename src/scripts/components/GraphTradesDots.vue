<template>
  <div class="graph trades-dots">
  </div>
</template>

<script>
  import Graph from '../graph/GraphTradesDots.js'

  let graph

  export default {
    name : 'GraphTradesDots',
    props : {
      data : {type : Array}
    },
    mounted() {
      setTimeout(() => { //wait for component css to apply
        graph = new Graph(this.$el, {onZoomEnd:this.onGraphZoomEnd})
        if (this.data) {
          graph.setData(this.data)
        }
      })
    },
    watch : {
      data : ((newData) => graph.setData(newData))
    },
    updated() {
      graph.setData(this.data)
    },
    destroyed() {
      graph && graph.destroy()
    },
    methods: {
      onGraphZoomEnd([dateBegin, dateEnd]) {
        this.$store.commit('SET_GRAPH_TRADES_PERIOD', {period:[+dateBegin, +dateEnd]})
      }
    },
    components: {}
  }
</script>

<style lang="less">

</style>
