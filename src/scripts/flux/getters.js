

export const theme = state => state.options.theme

export const tradeHistory = (state, exchange, market) => {
  if (!state.data || !state.data.tradeHistories) return null;
  let id = state.data.tradeHistories.findIndex(t => {
    return t.exchange == exchange && t.market == market
  })
  if (id >= 0) {
    return state.data.tradeHistories[id].trades
  }
}
