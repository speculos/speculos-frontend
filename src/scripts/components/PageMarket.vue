
<template>
  <page :title="title">
  </page>
</template>

<script>
import Page from './Page.vue'
//import {mapGetters} from 'vuex'
import capitalize from 'lodash/capitalize'

export default {
  name : "PageMarket",
  data () {
    return {
    }
  },
  computed: {
    title() {
      return `${this.$route.params.market} on ${capitalize(this.$route.params.exchange)}`
    },
  },
  components : {
    page : Page
  }
}
</script>

<style>
</style>
