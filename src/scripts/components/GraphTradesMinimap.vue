<template>
  <div class="graph trades-minimap">
  </div>
</template>

<script>
  import Graph from '../graph/GraphTrades.js'
  import LineVisu from '../graph/VisuTradeLines.js'


  export default {
    name : 'GraphTradesMinimap',
    props : {
      data : {type : Array},
      brush : {type : Object},
      ranges : {type : Object}
    },
    mounted() {
      setTimeout(() => { //wait for component css to apply
        this.graph = new Graph(this.$el, {
          enableBrush : true,
          enableZoom : false,
          showYAxis : false,
          onBrushEnd : this.onGraphBrushEnd
        })
        this.graph.createVisualization('lines', LineVisu)
        if (this.data)
          this.graph.setVisualisationData('lines', this.data)
        if (this.brush)
          this.graph.setBrush(this.brush.daterange, this.brush.raterange)
        if (this.ranges)
          this.graph.setScaleDomains(this.ranges)
      })
    },
    watch : {
      data(data) {
        this.graph.setVisualisationData('lines', data)
      },
      brush(brush) {
        this.graph.setBrush(brush.daterange, brush.raterange)
      },
      ranges(ranges) {
        this.graph.setScaleDomains(ranges)
      }
    },
    methods: {
      onGraphBrushEnd(daterange, raterange) {
        this.$store.commit('SET_GRAPH_TRADES_VISUS_RANGES', {daterange, raterange})
        this.$store.dispatch('setGraphTradesDotsData', {daterange})
      }
    },
    destroyed() {
      this.graph && this.graph.destroy()
    }
  }
</script>

<style lang="less">

</style>
