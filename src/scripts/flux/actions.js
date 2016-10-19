import * as api from '../api/';
import moment from 'moment';
import tradeStore from '../data/tradeStore.js';

export const setMarketsPageExchange = (store, exchange) => {
  store.commit('SET_MARKETS_PAGE_EXCHANGE', exchange)
}

export const setMarketsPageMarket = (store, market) => {
  store.commit('SET_MARKETS_PAGE_MARKET', market)
}

/**
 * Request trades before the current saved trades data.
 */
export const requestTradeHistoryBefore = (store, exchange, market, duration = "day") => {
  let end;
  let current_data = tradeHistory(store.state, exchange, market);
  if (current_data && current_data.begin) {
    end = current_data.begin;
  }
  else {
    end = moment().unix();
  }
  let begin = moment(end * 1000).subtract(1, duration).unix();
  requestTradeHistory(store, exchange, market, begin, end);
}

export const requestTradeHistory = (store, {exchange, market, begin, end}) => {
  //TODO handle exchange var
  //TODO commit 'SET_DATA_FETCHING'
  //TODO do not request allready requested periods
  begin = Math.round(begin);
  end = Math.round(end);
  api
    .getPoloniexTradeHistory(market, begin, end)
    .then(trades => {
      tradeStore.add(trades);
      begin *= 1000;
      end *= 1000;
      store.commit('UPDATE_DATA_TRADES', {exchange, market, begin, end})
      //store.commit('SET_DATA_FETCHING', exchange, market, trades, false)
    })
}
