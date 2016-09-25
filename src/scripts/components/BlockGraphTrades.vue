<template>
  <div class="graphtrades">
    <graph :data="marketPageTradeHistory"></graph>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import GraphTrades from './GraphTrades.vue';

  export default {
    name : 'BlockGraphTrades',
    computed: mapGetters(['marketPageTradeHistory']),
    components: {
      graph : GraphTrades
    }
  };
</script>

<style>
  .graphtrades {
    width: 100%;
    height: 100%;
  }
</style>
