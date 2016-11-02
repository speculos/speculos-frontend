import crossfilter from 'crossfilter2'
import reductio from 'reductio'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import {floorTimestamp, ceilTimestamp} from '../common/timestamps.js'

const CANDLE_PERIODS = {
  "1min" : 60,
  "5min" : 60*5,
  "20min" : 60*20,
  "1h" : 60*60,
  "1d" : 60*60*24
}

/**
 * Store and query trade history.
 * Trades are array of objects of the form:
 * {
 *    id       : 264948,  //per market id
 *    exchange : "poloniex",
 *    market   : "BTC_ETH",
 *    date     : 1476865265000,
 *    type     : "SELL",
 *    rate     : 0.01862083,
 *    amount   : 92
 *  }
 *
 * TODO unit tests
 * TODO other candle time ranges
 */
class TradeStore {
  constructor() {
    this.xf = crossfilter()
    this.onChange = this.xf.onChange
    this.tradesByDates = this.xf.dimension(d => d.date)
    this.tradesByDates2 = this.xf.dimension(d => d.date) //a second date dimension is needed for candle group
    this.tradesByMarket = this.xf.dimension(d => `${d.exchange}-${d.market}`)
    this.candlePeriods = CANDLE_PERIODS
    this.candleGroups = {}
    for (let period of Object.keys(CANDLE_PERIODS)) {
      this.candleGroups[period] = this._createCandleGroup(CANDLE_PERIODS[period])
    }
  }

  /**
   * Add trades to the store, preventing duplicates.
   * All given trades must be from the same exchange/market pair.
   */
  add(trades) {
    if (!trades || !trades.length) return
    let exchange = trades[0].exchange
    let market = trades[0].market
    const trades_ids = this.getTrades({exchange, market}).map(t => t.id)
    const filtered_trades = trades.filter(t => trades_ids.indexOf(t.id) < 0)
    this.xf.add(filtered_trades)
    return this
  }


  /**
   * Return an array with the first and last trade timestamp (ms) of a market
   */
  getMarketDateRange({exchange, market}) {
    this._filterByMarket(exchange, market)
    this._filterByDateRange(null)
    let bottom = this.tradesByDates.bottom(1)
    let top = this.tradesByDates.top(1)
    let begin = bottom.length ? bottom[0].date : null
    let end = top.length ? top[0].date : null
    return [begin, end]
  }

  /**
   * Return an array with the min and max rate of a market
   */
  getMarketRateRange({exchange, market, daterange=null}) {
    this._filterByMarket(exchange, market)
    this._filterByDateRange(daterange)
    let group = this.tradesByDates2.groupAll()
    let reducer = reductio()
    reducer.min('rate').max(true)
    reducer(group)
    let result = group.value()
    return [result.min, result.max]
  }

  /**
   * Return true if there is no market data in store
   */
  isMarketData({exchange, market}) {
    return !!this.getMarketDateRange({exchange, market})[0]
  }


  /**
   * Return trades filtered by market and daterange
   */
  getTrades({exchange, market, daterange=null, limit=Infinity, from='top'}) {
    this._filterByMarket(exchange, market)
    this._filterByDateRange(daterange)
    return this.tradesByDates[from](limit)
  }

  /**
   * Return candlestick data
   */
  getCandles({exchange, market, daterange=null, period='5min', limit=Infinity, extendRange=true}) {
    if (!exchange || !market) return []
    if (extendRange && daterange) {
      let p = CANDLE_PERIODS[period] * 1000
      daterange = [floorTimestamp(daterange[0], p), ceilTimestamp(daterange[1], p)]
    }
    this._filterByMarket(exchange, market)
    this._filterByDateRange(daterange)
    const trades = this.getTrades({exchange, market, daterange, limit})
    return this.candleGroups[period].top(limit)
      //map reduce result
      .map(candle => {
        //console.log(candle)
        if (isEmpty(candle.value.ids.valueList)) return undefined  //no data in this candle
        let entryRate = Number.isFinite(candle.value.ids.min) && find(trades, {id : candle.value.ids.min}).rate
        let closeRate = Number.isFinite(candle.value.ids.max) && find(trades, {id : candle.value.ids.max}).rate
        return {
          date : candle.key,
          entry : entryRate,
          close : closeRate,
          min : candle.value.rates.min,
          max : candle.value.rates.max,
          volume : candle.value.volume.sum,
        }
      })
      //remove empty candles
      .filter(c => !!c)
      //sort by date
      .sort((a, b) => a.date - b.date)
  }

  /**
   * Return a preview of the whole market, unfiltered by date.
   * @param {number} numberOfSamples approximate number of trades returned
   */
  getPreview({exchange, market, numberOfSamples=1000}) {
    this._filterByMarket(exchange, market)
    this._filterByDateRange(null)
    const trades = this.tradesByDates.top(Infinity)
    const delta = Math.floor(trades.length/numberOfSamples)
    if (delta >= 1) {
      let result = []
      for (let i = 0; i < trades.length; i+=delta) {
        result.push(trades[i])
      }
      return result//.slice(0, numberOfSamples)
    }
    else {
      return trades
    }
  }


  _filterByMarket(exchange = null, market = null) {
    if (!exchange || !market) {
      this.tradesByMarket.filter(null)
    }
    else {
      this.tradesByMarket.filter(`${exchange}-${market}`)
    }
  }

  _filterByDateRange(daterange = null) {
    if (isEmpty(daterange)) {
      daterange = null
    }
    this.tradesByDates.filter(daterange)
  }


  _createCandleGroup(period = 300 /* 5 min */) {
    const p = period * 1000
    let group = this.tradesByDates2.group(date => floorTimestamp(date, p))
    let reducer = reductio()
    reducer.value('trades').count(true)
    reducer.value('volume').sum('amount')
    reducer.value('rates').min('rate').max(true)
    reducer.value('ids').min('id').max(true)
    reducer(group)
    return group
  }


}


//export singleton
export default new TradeStore()
