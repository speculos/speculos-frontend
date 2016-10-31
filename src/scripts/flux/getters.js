//import tradeStore from '../data/tradeStore.js'

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
  return state.ui.pages.market.tradesVisus.dataDots
}
export const marketPageTradesCandlesData = (state) => {
  return state.ui.pages.market.tradesVisus.dataCandles
}
export const marketPageTradesMinimapData = (state) => {
  return state.ui.pages.market.tradesMinimap.data
}
export const marketPageTradesShowDots = (state) => {
  return state.ui.pages.market.tradesVisus.showDots
}
export const marketPageTradesShowCandles = (state) => {
  return state.ui.pages.market.tradesVisus.showCandles
}
