//import {set} from 'vue'
import tradeStore from '../data/tradeStore.js'
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
  SET_GRAPH_TRADES_VISUS_RANGES (state, {daterange, raterange}) {
    if (daterange) state.ui.pages.market.tradesVisus.daterange = daterange
    if (raterange) state.ui.pages.market.tradesVisus.raterange = raterange
  },
  SET_GRAPH_TRADES_MINIMAP_RANGES (state, {daterange, raterange}) {
    if (daterange) state.ui.pages.market.tradesMinimap.daterange = daterange
    if (raterange) state.ui.pages.market.tradesMinimap.raterange = raterange
  },
  SET_GRAPH_TRADES_DOTS_DATA (state, {data}) {
    state.ui.pages.market.tradesVisus.dataDots = data
  },
  SET_GRAPH_TRADES_DOTS_DATA_FROM_DATERANGE (state, {daterange}) {
    let exchange = state.ui.pages.market.exchangeName
    let market = state.ui.pages.market.currencyPair
    state.ui.pages.market.tradesVisus.dataDots = tradeStore.getTrades({exchange, market, daterange})
  },
  SET_GRAPH_TRADES_CANDLES_DATA (state, {data}) {
    state.ui.pages.market.tradesVisus.dataCandles = data
  },
  SET_GRAPH_TRADES_MINIMAP_DATA (state, {data}) {
    state.ui.pages.market.tradesMinimap.data = data
  }


}
