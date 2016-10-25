import crossfilter from 'crossfilter2'
import reductio from 'reductio'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'


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
    this.candleGroup5min = this._createCandleGroup()
  }

  /**
   * Add trades to the store, preventing duplicates.
   * All given trades must be from the same exchange/market pair.
   */
  add(trades) {
    let exchange = trades[0].exchange
    let market = trades[0].market
    const trades_ids = this.getTrades({exchange, market}).map(t => t.id)
    const filtered_trades = trades.filter(t => trades_ids.indexOf(t.id) < 0)
    this.xf.add(filtered_trades)
  }


  /**
   * Return an array with the first and last trade timestamp (ms) of a market
   */
  getMarketPeriod({exchange, market}) {
    this._filterByMarket(exchange, market)
    this._filterByPeriod(null)
    let bottom = this.tradesByDates.bottom(1)
    let top = this.tradesByDates.top(1)
    let begin = bottom.length ? bottom[0].date : null
    let end = top.length ? top[0].date : null
    return [begin, end]
  }


  /**
   * Return true if there is no market data in store
   */
  isMarketData({exchange, market}) {
    return !!this.getMarketPeriod({exchange, market})[0]
  }


  /**
   * Return trades filtered by market and period
   */
  getTrades({exchange, market, period=null, limit=Infinity, from='top'}) {
    this._filterByMarket(exchange, market)
    this._filterByPeriod(period)
    return this.tradesByDates[from](limit)
  }


  getCandles(limit = Infinity) {
    //TODO filters
    const trades = this.getTrades()
    return this.candleGroup5min.top(limit)
      .map(c => {
        if (!c.value.ids.min) return undefined
        return {
          date : c.key,
          entry : find(trades, {id : c.value.ids.min}).rate,
          close : find(trades, {id : c.value.ids.max}).rate,
          min : c.value.rates.min,
          max : c.value.rates.max,
          volume : c.value.volume.sum,
        }
      })
      .filter(c => !!c)
      .sort((a, b) => a.date - b.date)
  }

  /**
   * Return a preview of the whole market, unfiltered by date.
   * @param {number} numberOfSamples approximate number of trades returned
   */
  getPreview({exchange, market, numberOfSamples=1000}) {
    this._filterByMarket(exchange, market)
    this._filterByPeriod(null)
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

  _filterByPeriod(period = null) {
    if (isEmpty(period)) {
      period = null
    }
    this.tradesByDates.filter(period)
  }


  _createCandleGroup(period = 300 /* 5 min */) {
    const p = period * 1000
    let group = this.tradesByDates2.group(date => Math.floor(date/p) * p)
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
