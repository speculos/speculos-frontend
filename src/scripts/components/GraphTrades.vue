<template>
  <div class="graph-trades">
    <graph-trades-visus
      :dataCandles="dataCandles"
      :dataDots="dataDots"
      :showCandles="showCandles"
      :showDots="showDots"
      :ranges="tradesRanges">
    </graph-trades-visus>
    <graph-trades-minimap
      :data="minimapData"
      :brush="tradesRanges"
      :ranges="minimapRanges">
    </graph-trades-minimap>
  </div>
</template>

<script>
  import GraphTradesVisus from './GraphTradesVisus.vue'
  import GraphTradesMinimap from './GraphTradesMinimap.vue'
  import { mapGetters } from 'vuex'

  export default {
    name : 'GraphTrades',
    computed : mapGetters({
      dataDots : 'marketPageTradesDotsData',
      dataCandles : 'marketPageTradesCandlesData',
      showDots : 'marketPageTradesShowDots',
      showCandles : 'marketPageTradesShowCandles',
      minimapData : 'marketPageTradesMinimapData',
      tradesRanges : 'marketPageTradesRanges',
      minimapRanges : 'marketPageTradesMinimapRanges'
    }),
    components: {
      "graph-trades-visus" : GraphTradesVisus,
      "graph-trades-minimap" : GraphTradesMinimap
    }
  }
</script>

<style lang="less">
  @import "../../styles/graph.less";

  .graph-trades {
    width: 100%;
    height: 100%;

    .trades-visus {
      width: 100%;
      height: 80%;
    }

    .trades-minimap {
      width: 100%;
      height: 20%;
    }
  }
</style>
