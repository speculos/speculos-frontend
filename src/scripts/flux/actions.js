import * as api from '../api/'


export const setMarketsPageExchange = (store, exchange) => {
  store.commit('SET_MARKETS_PAGE_EXCHANGE', exchange)
}

export const setMarketsPageMarket = (store, market) => {
  store.commit('SET_MARKETS_PAGE_MARKET', market)
}

export const requestTradeHistory = (store, exchange, market, start, end) => {
  //TODO handle exchange var
  api
    .getPoloniexTradeHistory(market, start, end)
    .then(result => store.commit('SET_TRADE_HISTORY', result))
}
