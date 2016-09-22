import * as api from '../api/'


export const getTradeHistory = (store, market, start, end) => {
  api
    .getPoloniexTradeHistory(market, start, end)
    .then(result => store.commit('SET_TRADE_HISTORY', result))
}
