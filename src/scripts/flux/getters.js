import tradeStore from '../data/tradeStore.js'

export const theme = state => "theme-" + state.options.theme

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
