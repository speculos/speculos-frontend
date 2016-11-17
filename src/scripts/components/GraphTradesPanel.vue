<template>
  <panel class="graph-trades-panel">
    <h3 slot="header">Trades</h3>
    <graph-trades class="graph-trades"></graph-trades>
    <div slot="footer" class="graph-trades-panel-footer">
      <div class="ui compact buttons visus">
        <button class="ui button" v-on:click="toggleDots()" :class="{active:showDots}">Dots</button>
        <button class="ui button" v-on:click="toggleCandles()" :class="{active:showCandles}">Candles</button>
      </div>
      <div class="ui compact buttons periods">
        <button class="ui button" v-on:click="setCandlePeriod({period:'1min'})" :class="{active:candlePeriod == '1min'}">1 min</button>
        <button class="ui button" v-on:click="setCandlePeriod({period:'5min'})" :class="{active:candlePeriod == '5min'}">5 min</button>
        <button class="ui button" v-on:click="setCandlePeriod({period:'20min'})" :class="{active:candlePeriod == '20min'}">20 min</button>
        <button class="ui button" v-on:click="setCandlePeriod({period:'1h'})" :class="{active:candlePeriod == '1h'}">1 h</button>
        <button class="ui button" v-on:click="setCandlePeriod({period:'6h'})" :class="{active:candlePeriod == '6h'}">6 h</button>
        <button class="ui button" v-on:click="setCandlePeriod({period:'1d'})" :class="{active:candlePeriod == '1d'}">1 d</button>
      </div>
    </div>
  </panel>
</template>

<script>
  import Panel from './Panel.vue'
  import GraphTrades from './GraphTrades.vue'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name : 'GraphTradesPanel',
    computed : mapGetters({
      showDots : 'marketPageTradesShowDots',
      showCandles : 'marketPageTradesShowCandles',
      candlePeriod : 'marketPageTradesCandlePeriod'
    }),
    methods : mapMutations({
      toggleDots : 'TOGGLE_GRAPH_TRADES_VISUS_DOTS',
      toggleCandles : 'TOGGLE_GRAPH_TRADES_VISUS_CANDLES',
      setCandlePeriod : 'SET_GRAPH_TRADES_CANDLE_PERIOD'
    }),
    components : {
      "panel" : Panel,
      "graph-trades" : GraphTrades
    }
  }
</script>

<style lang="less">

.graph-trades-panel {
  .graph-trades {
    height: 600px;
    user-select: none;
  }
  .ui.buttons.visus {
    margin-right: 20px;
  }
}
.graph-trades-panel-footer {
  text-align: center;
}
</style>
