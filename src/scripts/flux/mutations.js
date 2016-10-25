import {set} from 'vue'
//import {tradeHistory} from './getters.js'

export default {

  SET_AUTH_TOKEN (state, {token}) { state.user.tokens.auth = token },

  SET_THEME (state, {theme}) { state.options.theme = theme },
  SET_THEME_LIGHT (state) { state.options.theme = 'light' },
  SET_THEME_DARK (state) { state.options.theme = 'dark' },

  HIDE_MENU_LEFT (state) { state.ui.menuLeft.visible = false},
  SHOW_MENU_LEFT (state) { state.ui.menuLeft.visible = true},
  TOGGLE_MENU_LEFT (state) { state.ui.menuLeft.visible = !state.ui.menuLeft.visible},

  SET_MARKETS_PAGE_EXCHANGE (state, {exchange}) {state.ui.pages.markets.exchange = exchange},
  SET_MARKETS_PAGE_MARKET (state, {market}) {state.ui.pages.markets.market = market},

  SET_MARKET_DATA (state, {exchange, data}) {
    state.data.exchanges[exchange].markets = data
  },

  SET_GRAPH_TRADES_PERIOD (state, {period}) {
    state.ui.pages.market.graph.trades.period = period
  },

  /**
   * Called when new trade data arrived from API request.
   * Update state.requests.trades
   */
  UPDATE_REQUESTS_TRADES (state, {exchange, market, begin, end}) {
    let marketId = `${exchange}_${market}`
    let current_period = state.requests.trades.periods[marketId]
    let new_period
    if (!current_period) {
      new_period = [begin, end]
    }
    else {
      new_period = [
        Math.min(begin, current_period[0]),
        Math.max(end, current_period[1])
      ]
    }
    set(state.requests.trades.periods, marketId, new_period)
    //if new data are in current graph view period, update period to trigger a redraw
    let graph_period = state.ui.pages.market.graph.trades.period
    if (
      graph_period
      && graph_period.length
      && ( (graph_period[0] >= begin && graph_period[0] <= end)
        || (graph_period[1] >= begin && graph_period[1] <= end)
      )
    ) {
      set(state.ui.pages.market.graph.trades, 'period', [graph_period[0], graph_period[1]])
    }
  }

}
