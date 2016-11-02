
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
import {lastHourRange} from '../common/timestamps.js'
//import delay from '../common/delay.js'
//import {mapGetters} from 'vuex'

export default {
  name : "PageMarket",
  data() {
    return {
      //showGraph : false
    }
  },
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
      let exchange = this.exchange
      let market = this.market
      let daterange
      let raterange
      //first data fetch
      if (!tradeStore.isMarketData({exchange, market})) {
        await this.$store.dispatch('requestTradesBefore', {exchange, market, duration:'hour'})
        daterange = tradeStore.getMarketDateRange({exchange, market})
        raterange = tradeStore.getMarketRateRange({exchange, market})
        this.$store.commit('SET_GRAPH_TRADES_VISUS_RANGES', {daterange, raterange})
        this.$store.commit('SET_GRAPH_TRADES_MINIMAP_RANGES', {daterange, raterange})
        await this.$store.dispatch('requestTradesBefore', {exchange, market, duration:'day'})
        daterange = tradeStore.getMarketDateRange({exchange, market})
        raterange = tradeStore.getMarketRateRange({exchange, market})
        this.$store.commit('SET_GRAPH_TRADES_MINIMAP_RANGES', {daterange, raterange})
      }
      else {
        daterange = tradeStore.getMarketDateRange({exchange, market})
        raterange = tradeStore.getMarketRateRange({exchange, market})
        this.$store.commit('SET_GRAPH_TRADES_VISUS_RANGES', {daterange:lastHourRange(), raterange})
        this.$store.commit('SET_GRAPH_TRADES_MINIMAP_RANGES', {daterange, raterange})
      }
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
