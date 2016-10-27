<template>
  <page class="page-exchanges" title="Exchanges">
    <ul>
      <li v-for="exchange in exchanges" v-on:click="onLinkClick(exchange.name)">
        {{exchange.name | capitalize}}
      </li>
    </ul>
  </page>
</template>

<script>
import Page from './Page.vue'
import {mapGetters} from 'vuex'
import capitalize from 'lodash/capitalize'

export default {
  name : "PageExchanges",
  filters : { capitalize },
  computed : mapGetters(['exchanges']),
  components : { page : Page },
  methods : {
    onLinkClick : function(exchangeName) {
      this.$store.commit('SET_MARKET_PAGE_EXCHANGE', {exchangeName})
      this.$router.push('/home/markets/' + exchangeName)
    }
  }
}
</script>

<style lang="less">
  .page-exchanges {
    li {
      cursor: pointer;
    }
  }
</style>
