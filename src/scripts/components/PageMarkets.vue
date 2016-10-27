
<template>
  <page class="page-markets" :title="title">
    <p v-if="invalid">Invalid exchange name.</p>
    <p v-if="empty">No market data.</p>

    <div class="ui cards" v-if="!invalid && !empty">
      <div class="market card" v-for="market in markets" v-on:click="onCardClick(market.name)">
        <div class="content">
          <div class="header">
            {{market.name}}
            <i class="large coin icon"
              :class="currencies[market.asset] && currencies[market.asset].logo">
            </i>
          </div>
          <div class="meta">{{currencies[market.asset].name}}</div>
          <div class="description"></div>
        </div>
      </div>
    </div>

  </page>
</template>

<script>
import Page from './Page.vue'
import {mapGetters} from 'vuex'
import capitalize from 'lodash/capitalize'
import isArray from 'lodash/isArray'

export default {
  name : "PageMarkets",
  computed: {
    empty() {
      return isArray(this.markets) && this.markets.length === 0
    },
    invalid() {
      return this.markets === null
    },
    exchange() {
      return this.$route.params.exchange
    },
    title() {
      return capitalize(this.exchange) + ' markets'
    },
    currencies() {
      return config.currencies
    },
    ...mapGetters({
      markets : 'pageMarketsData'
    })
  },
  components : {
    page : Page
  },
  methods : {
    onCardClick(currencyPair) {
      this.$store.commit('SET_MARKET_PAGE_CURRENCY', {currencyPair})
      this.$router.push(`/home/markets/${this.exchange}/${currencyPair}`)
    }
  }
}
</script>

<style lang="less">
  @import "../../styles/cryptocoins.css";
  @import "../../styles/cards.less";

  .page-markets {
    i.coin.icon {
      float: right;
    }
    .market.card {
      width: 220px;
      cursor: pointer;
    }
  }
</style>
