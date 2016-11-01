import tradeStore from '../data/tradeStore.js'
import {increaseRange} from '../common/ranges.js'

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
 * Page Markets getters
 */
export const pageMarketsExchangeName = (state) => {
  return state.ui.pages.market.exchangeName
}
export const pageMarketsCurrencyPair = (state) => {
  return state.ui.pages.market.currencyPair
}
export const pageMarketsData = (state) => {
  let exchange = state.ui.pages.market.exchangeName || state.route.params.exchange
  if (!exchange) return null
  let data = state.data.exchanges[exchange]
  if (!data) return null
  return Object.keys(data.markets).map(pair => {
    return Object.assign({name : pair}, data.markets[pair])
  })
}


/*
  Graph getters
 */
export const marketPageTradesRanges = (state) => {
  let daterange = state.ui.pages.market.tradesVisus.daterange
  let raterange = state.ui.pages.market.tradesVisus.raterange
  return {daterange, raterange}
}
export const marketPageTradesMinimapRanges = (state) => {
  let daterange = state.ui.pages.market.tradesMinimap.daterange
  let raterange = state.ui.pages.market.tradesMinimap.raterange
  return {daterange, raterange}
}
export const marketPageTradesDotsData = (state) => {
  let exchange = state.ui.pages.market.exchangeName
  let market = state.ui.pages.market.currencyPair
  let daterange = state.ui.pages.market.tradesVisus.daterange
  let trades = tradeStore.getTrades({exchange, market, daterange, limit:401})
  if (trades.length >= 400) return []
  return trades
}
export const marketPageTradesCandlesData = (state) => {
  let exchange = state.ui.pages.market.exchangeName
  let market = state.ui.pages.market.currencyPair
  let daterange = state.ui.pages.market.tradesVisus.daterange
  if (daterange && daterange.length) {
    daterange = increaseRange(daterange)
  }
  let period = state.ui.pages.market.tradesVisus.periodCandles
  return tradeStore.getCandles({exchange, market, daterange, period})
}
export const marketPageTradesMinimapData = (state) => {
  let exchange = state.ui.pages.market.exchangeName
  let market = state.ui.pages.market.currencyPair
  let daterange = state.ui.pages.market.tradesMinimap.daterange
  return tradeStore.getPreview({exchange, market, daterange})

}
export const marketPageTradesShowDots = (state) => {
  return state.ui.pages.market.tradesVisus.showDots
}
export const marketPageTradesShowCandles = (state) => {
  return state.ui.pages.market.tradesVisus.showCandles
}
