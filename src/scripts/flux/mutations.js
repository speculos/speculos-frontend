//import {set} from 'vue'
//import tradeStore from '../data/tradeStore.js'
//import {tradeHistory} from './getters.js'

export default {

  /* User */
  SET_AUTH_TOKEN (state, {token}) { state.user.tokens.auth = token },

  /* Site options */
  SET_THEME (state, {theme}) { state.options.theme = theme },
  SET_THEME_LIGHT (state) { state.options.theme = 'light' },
  SET_THEME_DARK (state) { state.options.theme = 'dark' },

  /* Left menu */
  HIDE_MENU_LEFT (state) { state.ui.menuLeft.visible = false},
  SHOW_MENU_LEFT (state) { state.ui.menuLeft.visible = true},
  TOGGLE_MENU_LEFT (state) { state.ui.menuLeft.visible = !state.ui.menuLeft.visible},

  /* Markets page */
  SET_MARKET_PAGE_EXCHANGE (state, {exchangeName}) {
    state.ui.pages.market.exchangeName = exchangeName
  },
  SET_MARKET_PAGE_CURRENCY (state, {currencyPair}) {
    state.ui.pages.market.currencyPair = currencyPair
  },

  /* Data */
  SET_MARKETS_DATA (state, {exchange, data}) {
    state.data.exchanges[exchange].markets = data
  },

  /* Trades graph */
  HIDE_GRAPH_TRADES_VISUS_DOTS (state) {
    state.ui.pages.market.tradesVisus.showDots = false
  },
  SHOW_GRAPH_TRADES_VISUS_DOTS (state) {
    state.ui.pages.market.tradesVisus.showDots = true
  },
  TOGGLE_GRAPH_TRADES_VISUS_DOTS (state) {
    state.ui.pages.market.tradesVisus.showDots = !state.ui.pages.market.tradesVisus.showDots
  },
  HIDE_GRAPH_TRADES_VISUS_CANDLES (state) {
    state.ui.pages.market.tradesVisus.showCandles = false
  },
  SHOW_GRAPH_TRADES_VISUS_CANDLES (state) {
    state.ui.pages.market.tradesVisus.showCandles = true
  },
  TOGGLE_GRAPH_TRADES_VISUS_CANDLES (state) {
    state.ui.pages.market.tradesVisus.showCandles = !state.ui.pages.market.tradesVisus.showCandles
  },
  SET_GRAPH_TRADES_VISUS_RANGES (state, {daterange, raterange}) {
    if (daterange) state.ui.pages.market.tradesVisus.daterange = daterange
    if (raterange) state.ui.pages.market.tradesVisus.raterange = raterange
  },
  SET_GRAPH_TRADES_MINIMAP_RANGES (state, {daterange, raterange}) {
    if (daterange) state.ui.pages.market.tradesMinimap.daterange = daterange
    if (raterange) state.ui.pages.market.tradesMinimap.raterange = raterange
  },
  SET_GRAPH_TRADES_CANDLE_PERIOD (state, {period}) {
    state.ui.pages.market.tradesVisus.periodCandles = period
  }


}
