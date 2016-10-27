<template>
  <div class="graph-trades">
    <graph-trades-dots :data="dotsData" :ranges="dotsRanges"></graph-trades-dots>
    <graph-trades-minimap :data="minimapData" :brush="minimapBrush"></graph-trades-minimap>
  </div>
</template>

<script>
  import GraphTradesDots from './GraphTradesDots.vue'
  import GraphTradesMinimap from './GraphTradesMinimap.vue'
  import { mapGetters } from 'vuex'

  export default {
    name : 'GraphTrades',
    computed : mapGetters({
      dotsData : 'marketPageTradesDotsData',
      dotsRanges : 'marketPageTradesDotsRanges',
      minimapData : 'marketPageTradesMinimapData',
      minimapBrush : 'marketPageTradesDotsRanges'
    }),
    components: {
      "graph-trades-dots" : GraphTradesDots,
      "graph-trades-minimap" : GraphTradesMinimap
    }
  }
</script>

<style lang="less">
  @import "../../styles/graph.less";

  .graph-trades {
    width: 100%;
    height: 100%;

    .trades-dots {
      width: 100%;
      height: 80%;
    }
    .trades-minimap {
      width: 100%;
      height: 20%;
    }
  }
</style>
