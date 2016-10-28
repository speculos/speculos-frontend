<template>
  <div class="graph-trades">
    <!-- <graph-trades-dots :data="dotsData" :ranges="tradesRanges"></graph-trades-dots> -->
    <graph-trades-candles :data="candlesData" :ranges="tradesRanges"></graph-trades-candles>
    <graph-trades-minimap :data="minimapData" :brush="tradesRanges"></graph-trades-minimap>
  </div>
</template>

<script>
  import GraphTradesDots from './GraphTradesDots.vue'
  import GraphTradesCandles from './GraphTradesCandles.vue'
  import GraphTradesMinimap from './GraphTradesMinimap.vue'
  import { mapGetters } from 'vuex'

  export default {
    name : 'GraphTrades',
    computed : mapGetters({
      dotsData : 'marketPageTradesDotsData',
      candlesData : 'marketPageTradesCandlesData',
      minimapData : 'marketPageTradesMinimapData',
      tradesRanges : 'marketPageTradesRanges'
    }),
    components: {
      "graph-trades-dots" : GraphTradesDots,
      "graph-trades-candles" : GraphTradesCandles,
      "graph-trades-minimap" : GraphTradesMinimap
    }
  }
</script>

<style lang="less">
  @import "../../styles/graph.less";

  .graph-trades {
    width: 100%;
    height: 100%;

    .trades-dots, .trades-candles {
      width: 100%;
      height: 80%;
    }
    .trades-minimap {
      width: 100%;
      height: 20%;
    }
  }
</style>
