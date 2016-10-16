import crossfilter from 'crossfilter2';
import reductio from 'reductio';
import find from 'lodash/find';


/**
 * Store and query trade history.
 *
 * trade are array of object of the form:
 * {
 *    id       : 59778914,
 *    exchange : "poloniex",
 *    market   : "BTC_ETH",
 *    date     : "2016-10-13 15:55:07",
 *    type     : "sell",
 *    rate     : 0.01862083,
 *    amount   : 92
 *  }
 */
class TradeStore {
  constructor() {
    this.xf = crossfilter();
    this.tradesByDates = this.xf.dimension(d => +new Date(d.date + "Z"));
    this.tradesByMarket = this.xf.dimension(d => `${d.exchange}-${d.market}`);
    //a second date dimension is needed for candle group
    this.tradesByDates2 = this.xf.dimension(d => +new Date(d.date + "Z"));
    this.candleGroup5min = this._createCandleGroup();
  }

  add(trades) {
    this.xf.add(trades);
  }

  filterByMarket(exchange, market) {
    this.tradesByMarket.filter(`${exchange}-${market}`);
  }

  filterByPeriod(begin, end) {
    this.tradesByDates.filter([begin, end]);
  }

  clearMarketFilter() {
    this.tradesByMarket.filter(null);
  }

  clearPeriodFilter() {
    this.tradesByDates.filter(null);
  }


  getTrades(limit = Infinity /*, from = 'top' */) {
    return this.tradesByDates.top(limit)
  }

  getCandles(limit = Infinity) {
    const trades = this.getTrades();
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


  _createCandleGroup(period = 300 /* 5 min */) {
    const p = period * 1000;
    let group = this.tradesByDates2.group(date => Math.floor(date/p) * p);
    let reducer = reductio();
    reducer.value('trades').count(true);
    reducer.value('volume').sum('amount');
    reducer.value('rates').min('rate').max(true);
    reducer.value('ids').min('id').max(true);
    reducer(group);
    return group;
  }


}


//export singleton
export default new TradeStore();
