<template>
  <page title="Exchanges">
    <ul>
      <li v-for="exchange in exchanges">
        <router-link :to="'/home/markets/' + exchange.name">
          {{exchange.name | capitalize}}
        </router-link>
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
  data () {
    return {
    }
  },
  filters : { capitalize },
  computed : mapGetters(['exchanges']),
  components : {
    page : Page
  }
}
</script>

<style>
</style>
