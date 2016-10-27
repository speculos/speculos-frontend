//import * as api from '../api/'
import moment from 'moment'
import tradeStore from '../data/tradeStore.js'
import exchangesAPI from '../api/exchanges.js'

export const setAuthToken = (store, {token}) => {
  exchangesAPI.setPublicToken(token)
  store.commit('SET_AUTH_TOKEN', {token})
}


export const requestExchangesData = async (store) => {
  let marketData = await exchangesAPI.getMarkets('poloniex')
  let markets = {}
  let market
  for (market of marketData) {
    markets[market.currency + '_' + market.asset] = market
  }
  store.commit('SET_MARKETS_DATA', {exchange:'poloniex', data:markets})
}


export const requestTrades = async (store, {exchange, market, begin, end}) => {
  //TODO commit 'SET_DATA_FETCHING'
  let trades = await exchangesAPI.getTrades(exchange, market, begin, end)
  tradeStore.add(trades)
  return trades
  //store.commit('UPDATE_REQUESTS_TRADES', {exchange, market, begin, end})
  //store.commit('SET_DATA_FETCHING', exchange, market, trades, false)
}

/**
 * Request trades before the current saved trades data.
 */
export const requestTradesBefore = async (store, {exchange, market, duration="hour"}) => {
  let current_period = tradeStore.getMarketDateRange({exchange, market})
  let end = current_period[0] || +new Date()
  let begin = moment(end).subtract(1, duration).valueOf()
  return requestTrades(store, {exchange, market, begin, end})
}

/**
 * Request trades after the current saved trades data.
 */
export const requestTradesAfter = async (store, {exchange, market, duration="hour"}) => {
  let current_period = tradeStore.getMarketDateRange({exchange, market})
  let now = +new Date()
  let begin = current_period[1] || now - 60*60*1000
  let end = Math.min(moment(begin).add(1, duration).valueOf(), now)
  return requestTrades(store, {exchange, market, begin, end})
}
