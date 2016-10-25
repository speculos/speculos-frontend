import tradeStore from '../data/tradeStore.js'

export const theme = (state) => "theme-" + state.options.theme

export const themeInvertedClass = (state) => state.options.theme == 'dark' ? 'inverted' : ''


export const menuLeftVisibility = (state) => state.ui.menuLeft.visible


/**
 * @return An array of exchanges
 */
export const exchanges = (state) => {
  return Object.keys(state.data.exchanges).map(e => {
    return Object.assign({name : e}, state.data.exchanges[e])
  })
}

/**
 * @return An array of markets from the current selected exchange
 */
export const markets = (state) => {
  let exchange = state.route.params.exchange
  if (!exchange) return null
  let data = state.data.exchanges[exchange]
  if (!data) return null
  return Object.keys(data.markets).map(m => {
    return Object.assign({name : m}, {exchange}, data.markets[m])
  })
}


export const marketPageTradesDots = (state) => {
  let exchange = state.route.params.exchange
  let market = state.route.params.market
  if (!exchange || !market) return null
  let period = state.ui.pages.market.graph.trades.period
  return tradeStore.getTrades({exchange, market, period, limit:400})
}

export const marketPageTradesPreview = (state) => {
  let exchange = state.route.params.exchange
  let market = state.route.params.market
  if (!exchange || !market) return null
  let period = state.requests.trades.periods[`${exchange}_${market}`]
  return tradeStore.getPreview({exchange, market, period})
}
