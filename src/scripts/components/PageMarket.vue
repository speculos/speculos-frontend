
<template>
  <page class="page-market" :title="title">
    <div class="graph-trades-container">
      <graph-trades></graph-trades>
    </div>
  </page>
</template>

<script>
import Page from './Page.vue'
import GraphTrades from './GraphTrades.vue'
import tradeStore from '../data/tradeStore.js'
import capitalize from 'lodash/capitalize'
//import {mapGetters} from 'vuex'

export default {
  name : "PageMarket",
  computed: {
    exchange() {
      return this.$route.params.exchange
    },
    market() {
      return this.$route.params.market
    },
    title() {
      return `${this.market} on ${capitalize(this.exchange)}`
    },
  },
  created() {
    this.initData()
  },
  watch: {
    exchange() {
      this.initData()
    },
    market() {
      this.initData()
    }
  },
  methods : {
    async initData() {
      //fetch market data if store is empty
      let exchange = this.exchange
      let market = this.market
      if (!tradeStore.isMarketData({exchange, market})) {
        await this.$store.dispatch('requestTradesBefore', {exchange, market})
      }
      //set graph data and ranges
      let now = +new Date()
      let last5min = [now - 5*60*1000, now]
      let lastHour = [now - 60*60*1000, now]
      let raterange = tradeStore.getMarketRateRange({exchange, market})
      let dotsData = tradeStore.getTrades({exchange, market, daterange:last5min})
      let candlesData = tradeStore.getCandles({exchange, market, daterange:lastHour})
      let minimapData = tradeStore.getTrades({exchange, market})
      this.$store.commit('SET_GRAPH_TRADES_RANGES', {daterange:lastHour, raterange})
      this.$store.commit('SET_GRAPH_TRADES_DOTS_DATA', {data : dotsData})
      this.$store.commit('SET_GRAPH_TRADES_CANDLES_DATA', {data : candlesData})
      this.$store.commit('SET_GRAPH_TRADES_MINIMAP_DATA', {data : minimapData})
      //this.$store.commit('SET_GRAPH_TRADES_CANDLES_PERIOD', {period : '5min'})
    }
  },
  components : {
    "page" : Page,
    "graph-trades" : GraphTrades
  }
}
</script>

<style lang="less">
.page-market {
  .graph-trades-container {
    width: 100%;
    height: 600px;
    user-select: none;
  }
}
</style>
