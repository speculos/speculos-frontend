<template>
  <div class="graph trades-visus">
  </div>
</template>

<script>
  import CandleVisu from '../graph/VisuTradeCandles.js'
  import DotVisu from '../graph/VisuTradeDots.js'
  import Graph from '../graph/GraphTrades.js'

  export default {
    name : 'GraphTradesCandles',
    props : {
      dataCandles : {type : Array},
      dataDots : {type : Array},
      ranges : {type : Object}
    },
    mounted() {
      setTimeout(() => { //wait for component css to apply
        this.graph = new Graph(this.$el, {
          enableBrush : false,
          enableZoom : true,
          onRangeChange : this.onGraphRangeChange
        })
        this.graph.createVisualization('candles', CandleVisu)
        this.graph.createVisualization('dots', DotVisu)
        if (this.dataCandles)
          this.graph.setVisualisationData('candles', this.dataCandles)
        if (this.dataDots)
          this.graph.setVisualisationData('dots', this.dataDots)
        if (this.ranges)
          this.graph.setScaleDomains(this.ranges)
      })
    },
    watch : {
      dataCandles(data) {
        this.graph.setVisualisationData('candles', data)
      },
      dataDots(data) {
        this.graph.setVisualisationData('dots', data)
      },
      ranges(ranges) {
        this.graph.setScaleDomains(ranges)
      }
    },
    methods: {
      onGraphRangeChange(daterange, raterange) {
        this.$store.commit('SET_GRAPH_TRADES_VISUS_RANGES', {daterange, raterange})
        this.$store.commit('SET_GRAPH_TRADES_DOTS_DATA_FROM_DATERANGE', {daterange})
      }
    },
    destroyed() {
      //console.log('destroy GraphTradesVisu')
      this.graph && this.graph.destroy()
    }
  }
</script>

<style lang="less">

</style>
