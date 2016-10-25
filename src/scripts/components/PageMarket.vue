
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
    title() {
      return `${this.$route.params.market} on ${capitalize(this.$route.params.exchange)}`
    },
  },
  created() {
    this.initData()
  },
  watch: {
    '$route'() {
      this.initData()
    }
  },
  methods : {
    initData() {
      let exchange = this.$route.params.exchange
      let market = this.$route.params.market
      if (!tradeStore.isMarketData({exchange, market})) {
        this.$store.dispatch('requestTradesBefore', {exchange, market})
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
  }
}
</style>
