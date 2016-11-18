
<template>
  <page class="page-market" :title="title">
    <graph-trades-panel :loading="tradesLoading"></graph-trades-panel>
  </page>
</template>

<script>
import Page from './Page.vue'
import GraphTradesPanel from './GraphTradesPanel.vue'
import tradeStore from '../data/tradeStore.js'
import capitalize from 'lodash/capitalize'
import {lastHourRange} from '../common/timestamps.js'
//import {mapGetters} from 'vuex'
//import delay from '../common/delay.js'

export default {
  name : "PageMarket",
  data() {
    return {
      tradesLoading : false
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
    }
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
      this.tradesLoading = true
      //first data fetch
      if (!tradeStore.isMarketData({exchange, market})) {
        await this.$store.dispatch('requestTradesBefore', {exchange, market, duration:'hour'})
        daterange = tradeStore.getMarketDateRange({exchange, market})
        raterange = tradeStore.getMarketRateRange({exchange, market})
        this.$store.commit('SET_GRAPH_TRADES_VISUS_RANGES', {daterange, raterange})
        this.$store.commit('SET_GRAPH_TRADES_MINIMAP_RANGES', {daterange, raterange})
        this.tradesLoading = false
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
        this.tradesLoading = false
      }
    }
  },
  components : {
    "page" : Page,
    "graph-trades-panel" : GraphTradesPanel
  }
}
</script>

<style lang="less">
.page-market {

}
</style>
