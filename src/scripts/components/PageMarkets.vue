
<template>
  <page :title="title">
    <p v-if="invalid">Invalid exchange name.</p>
    <p v-if="empty">No market data.</p>

    <div class="ui cards" v-if="!invalid && !empty">
      <a class="market card" v-for="market in markets" :href="`#/home/markets/${market.exchange}/${market.name}`">
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
    title() {
      return capitalize(this.$route.params.exchange) + ' markets'
    },
    currencies() {
      return config.currencies
    },
    ...mapGetters(['markets'])
  },
  components : {
    page : Page
  }
}
</script>

<style lang="less">
  @import "../../styles/cryptocoins.css";
  @import "../../styles/cards.less";

  i.coin.icon {
    float: right;
  }
</style>
