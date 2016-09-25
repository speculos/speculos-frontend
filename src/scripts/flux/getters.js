

export const theme = state => "theme-" + state.options.theme

export const tradeHistory = (state, exchange, market) => {
  if (!state.data || !state.data.tradeHistories) return null;
  let id = state.data.tradeHistories.findIndex(t => {
    return t.exchange == exchange && t.market == market
  })
  if (id >= 0) {
    return state.data.tradeHistories[id].trades
  }
  return null
}

export const marketPageTradeHistory = (state) => {
  let exchange = state.ui.pages.markets.exchange
  let market = state.ui.pages.markets.market
  return tradeHistory(state, exchange, market);
}
