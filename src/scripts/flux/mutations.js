import {set} from 'vue';
import {tradeHistory} from './getters.js';

export default {

  SET_THEME_LIGHT (state) { state.options.theme = 'light' },
  SET_THEME_DARK (state) { state.options.theme = 'dark' },

  SET_MARKETS_PAGE_EXCHANGE (state, exchange) {state.ui.pages.markets.exchange = exchange},
  SET_MARKETS_PAGE_MARKET (state, market) {state.ui.pages.markets.market = market},

  /**
   * Called when new trade data arrived from API request.
   * Update state.ui.pages.markets & state.data.exchanges
   */
  UPDATE_DATA_TRADES (state, {exchange, market, begin, end}) {
    let trades = state.data.exchanges[exchange].markets[market].trades
    let page = state.ui.pages.markets
    let period = [
      trades.period[0] ? Math.min(begin, trades.period[0]) : begin,
      trades.period[1] ? Math.max(end, trades.period[1]) : end
    ]
    trades.period = period
    if (page.exchange === exchange && page.market === market) {
      page.period = period
      page.graph.trades.period = period  //test only
    }
  }

}
