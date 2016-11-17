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
      showCandles : {type : Boolean},
      dataDots : {type : Array},
      showDots : {type : Boolean},
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
        this.graph[`${this.showDots ? 'show' : 'hide'}Visualization`]('dots')
        this.graph[`${this.showCandles ? 'show' : 'hide'}Visualization`]('candles')
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
      showCandles(state) {
        this.graph[`${state ? 'show' : 'hide'}Visualization`]('candles')
        state && this.graph.setVisualisationData('candles', this.dataCandles)
      },
      showDots(state) {
        this.graph[`${state ? 'show' : 'hide'}Visualization`]('dots')
        state && this.graph.setVisualisationData('dots', this.dataDots)
      },
      ranges(ranges) {
        this.graph.setScaleDomains(ranges)
      }
    },
    methods: {
      onGraphRangeChange(daterange, raterange) {
        this.$store.commit('SET_GRAPH_TRADES_VISUS_RANGES', {daterange, raterange})
        //this.$store.dispatch('setGraphTradesDotsData', {daterange})
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
