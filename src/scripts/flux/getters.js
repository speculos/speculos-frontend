import tradeStore from '../data/tradeStore.js'

export const theme = (state) => "theme-" + state.options.theme


/**
 * @return An array of exchanges
 */
export const exchanges = (state) => {
  console.log('exchanges getter');
  return Object.keys(state.data.exchanges).map(e => {
    return Object.assign({name : e}, state.data.exchanges[e])
  })
}

/**
 * @return An array of markets from the current selected exchange
 */
export const markets = (state) => {
  console.log('markets getter');
  let exchange = state.route.params.exchange
  if (!exchange) return null
  let data = state.data.exchanges[exchange]
  if (!data) return null
  return Object.keys(data.markets).map(m => {
    return Object.assign({name : m}, {exchange}, data.markets[m])
  })
}


export const marketPageTradesDots = (state) => {
  return tradeStore.getTrades({
    exchange : state.ui.pages.markets.exchange,
    market : state.ui.pages.markets.market,
    period : state.ui.pages.markets.graph.trades.period,
    limit : 400
  })
}

export const marketPageTradesPreview = (state) => {
  return tradeStore.getPreview({
    exchange : state.ui.pages.markets.exchange,
    market : state.ui.pages.markets.market,
    period : state.ui.pages.markets.period
  })
}
