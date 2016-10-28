<template>
  <div class="graph trades-minimap">
  </div>
</template>

<script>
  import Graph from '../graph/GraphTradesMinimap.js'

  let graph

  export default {
    name : 'GraphTradesMinimap',
    props : {
      data : {type : Array},
      brush : {type : Object}
    },
    mounted() {
      setTimeout(() => { //wait for component css to apply
        graph = new Graph(this.$el, {onBrushEnd:this.onGraphBrushEnd})
        if (this.data) {
          graph.setData(this.data)
        }
      })
    },
    watch : {
      data : ((newData) => graph.setData(newData)),
      brush : ((ranges) => graph.setBrush(ranges.daterange, ranges.raterange))
    },
    updated() {
      graph.setData(this.data)
    },
    methods: {
      onGraphBrushEnd(daterange, raterange) {
        this.$store.commit('SET_GRAPH_TRADES_RANGES', {daterange, raterange})
        this.$store.commit('SET_GRAPH_TRADES_DOTS_DATA_FROM_DATERANGE', {daterange})
      }
    },
    destroyed() {
      graph && graph.destroy()
    }
  }
</script>

<style lang="less">

</style>
