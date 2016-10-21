import {set} from 'vue';
import {tradeHistory} from './getters.js';

export default {

  SET_AUTH_TOKEN (state, {token}) { state.user.tokens.auth = token },

  SET_THEME_LIGHT (state) { state.options.theme = 'light' },
  SET_THEME_DARK (state) { state.options.theme = 'dark' },

  HIDE_MENU_LEFT (state) { state.ui.menuLeft.visible = false},
  SHOW_MENU_LEFT (state) { state.ui.menuLeft.visible = true},
  TOGGLE_MENU_LEFT (state) { state.ui.menuLeft.visible = !state.ui.menuLeft.visible},

  SET_MARKETS_PAGE_EXCHANGE (state, {exchange}) {state.ui.pages.markets.exchange = exchange},
  SET_MARKETS_PAGE_MARKET (state, {market}) {state.ui.pages.markets.market = market},

  SET_MARKET_DATA (state, {exchange, data}) {
    state.data.exchanges[exchange].markets = data;
  },

  /**
   * Called when new trade data arrived from API request.
   * Update state.ui.pages.markets & state.requests.trades
   */
  UPDATE_DATA_TRADES (state, {exchange, market, begin, end}) {
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
    current_period = new_period
    let page = state.ui.pages.markets
    if (page.exchange === exchange && page.market === market) {
      page.period = new_period
      page.graph.trades.period = new_period  //test only
    }
  }

}
