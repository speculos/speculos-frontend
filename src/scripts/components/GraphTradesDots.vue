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
      data : {type : Array},
      ranges : {type : Object}
    },
    mounted() {
      setTimeout(() => { //wait for component css to apply
        graph = new Graph(this.$el, {onRangeChange: this.onGraphRangeChange})
        if (this.data) graph.setData(this.data)
        if (this.ranges) graph.setScaleDomains(this.ranges)
      })
    },
    watch : {
      data : ((data) => graph.setData(data)),
      ranges : ((ranges) => graph.setScaleDomains(ranges))
    },
    destroyed() {
      graph && graph.destroy()
    },
    methods: {
      onGraphRangeChange(daterange, raterange) {
        this.$store.commit('SET_GRAPH_TRADES_DOTS_RANGES', {daterange, raterange})
        this.$store.commit('SET_GRAPH_TRADES_DOTS_DATA_FROM_DATERANGE', {daterange})
      }
    },
    components: {}
  }
</script>

<style lang="less">

</style>
