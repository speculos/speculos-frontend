
<template>
  <page :title="title">
    <p v-if="invalid">Invalid exchange name.</p>
    <p v-if="empty">No market data.</p>
    <ul v-if="!invalid && !empty">
      <li v-for="market in markets">
        <router-link :to="`/home/markets/${market.exchange}/${market.name}`">
          {{ market.name }}
        </router-link>
      </li>
    </ul>
  </page>
</template>

<script>
import Page from './Page.vue'
import {mapGetters} from 'vuex'
import capitalize from 'lodash/capitalize'
import isArray from 'lodash/isArray'

export default {
  name : "PageMarkets",
  data () {
    return {
    }
  },
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
    ...mapGetters(['markets'])
  },
  components : {
    page : Page
  }
}
</script>

<style>
</style>
