import expect from 'unexpected'
import tradeStore from '../src/scripts/data/tradeStore.js'

const dataTradesA = [
  {id:0, exchange:'test', market:'A', date:1000, type:'SELL', rate:1,   amount:1},
  {id:1, exchange:'test', market:'A', date:1001, type:'SELL', rate:2,   amount:2},
  {id:2, exchange:'test', market:'A', date:1002, type:'BUY',  rate:0.5, amount:1.5},
  {id:3, exchange:'test', market:'A', date:1005, type:'SELL', rate:0.5, amount:0.5}
]
const dataTradesB = [
  {id:0, exchange:'test', market:'B', date:2000, type:'BUY',  rate:0.1, amount:1},
  {id:1, exchange:'test', market:'B', date:3000, type:'BUY',  rate:2,   amount:2},
  {id:2, exchange:'test', market:'B', date:4000, type:'BUY',  rate:0.5, amount:1.5},
  {id:3, exchange:'test', market:'B', date:5000, type:'SELL', rate:10,  amount:0.5}
]
const dataCandles = [
  {id:100, exchange:'candle', market:'A', date:10000*1000, type:'BUY', rate:2, amount:1},
  {id:101, exchange:'candle', market:'A', date:10060*1000, type:'BUY', rate:8, amount:1},
  {id:102, exchange:'candle', market:'A', date:10120*1000, type:'BUY', rate:1, amount:1},
  {id:103, exchange:'candle', market:'A', date:10180*1000, type:'BUY', rate:3, amount:1},
  {id:104, exchange:'candle', market:'A', date:10240*1000, type:'BUY', rate:5, amount:1},
  {id:105, exchange:'candle', market:'A', date:10300*1000, type:'BUY', rate:4, amount:1},
  {id:106, exchange:'candle', market:'A', date:10360*1000, type:'BUY', rate:3, amount:1},
  {id:107, exchange:'candle', market:'A', date:10600*1000, type:'BUY', rate:2, amount:1},
  {id:108, exchange:'candle', market:'A', date:10660*1000, type:'BUY', rate:1, amount:1},
  {id:109, exchange:'candle', market:'A', date:12000*1000, type:'BUY', rate:2, amount:1},
  {id:110, exchange:'candle', market:'A', date:13004*1000, type:'BUY', rate:3, amount:1},
]

const expectedCandle5min = [
  { date: 9900000, entry: 2, close: 3, min: 1, max: 8, volume: 4 },
  { date: 10200000, entry: 5, close: 3, min: 3, max: 5, volume: 3 },
  { date: 10500000, entry: 2, close: 1, min: 1, max: 2, volume: 2 },
  { date: 12000000, entry: 2, close: 2, min: 2, max: 2, volume: 1 },
  { date: 12900000, entry: 3, close: 3, min: 3, max: 3, volume: 1 }
]
const expectedCandle20min = [
  { date: 9600000, entry: 2, close: 1, min: 1, max: 8, volume: 9 },
  { date: 12000000, entry: 2, close: 3, min: 2, max: 3, volume: 2 }
]
const expectedCandle1d = [
  { date: 0, entry: 2, close: 3, min: 1, max: 8, volume: 11 }
]

describe('tradeStore', function() {
  it('should exist', function() {
    expect(tradeStore, 'to be defined')
    expect(tradeStore.xf, 'to be defined')
  })

  describe('add()', function() {
    it('should return tradeStore instance', function() {
      let res = tradeStore.add(dataTradesA).add(dataTradesB)
      expect(res, 'to be', tradeStore)
    })
    it('should prevent duplicates', function() {
      tradeStore.add(dataTradesA)
      let count = tradeStore.getTrades({exchange:'test', market:'A'}).length
      expect(count, 'to equal', 4)
    })
  })

  describe('getMarketDateRange()', function() {
    it('should return full date range for each market', function() {
      let resA = tradeStore.getMarketDateRange({exchange:'test', market:'A'})
      let resB = tradeStore.getMarketDateRange({exchange:'test', market:'B'})
      expect(resA, 'to equal', [1000, 1005])
      expect(resB, 'to equal', [2000, 5000])
    })
  })

  describe('getMarketRateRange()', function() {
    it('should return full rate range for each market', function() {
      let resA = tradeStore.getMarketRateRange({exchange:'test', market:'A'})
      let resB = tradeStore.getMarketRateRange({exchange:'test', market:'B'})
      expect(resA, 'to equal', [0.5, 2])
      expect(resB, 'to equal', [0.1, 10])
    })
  })

  describe('isMarketData()', function() {
    it('should return true when there is market data', function() {
      let resA = tradeStore.isMarketData({exchange:'test', market:'A'})
      let resB = tradeStore.isMarketData({exchange:'test', market:'B'})
      expect(resA, 'to equal', true)
      expect(resB, 'to equal', true)
    })
    it('should return false when there is no market data', function() {
      let resA = tradeStore.isMarketData({exchange:'test', market:'C'})
      let resB = tradeStore.isMarketData({exchange:'tset', market:'A'})
      expect(resA, 'to equal', false)
      expect(resB, 'to equal', false)
    })
  })

  describe('getTrades()', function() {
    it('should return all trades by default', function() {
      let resA = tradeStore.getTrades({exchange:'test', market:'A'})
      let resB = tradeStore.getTrades({exchange:'test', market:'B'})
      expect(resA, 'to equal', [dataTradesA[3], dataTradesA[2], dataTradesA[1], dataTradesA[0]])
      expect(resB, 'to equal', [dataTradesB[3], dataTradesB[2], dataTradesB[1], dataTradesB[0]])
    })
    it('should return an empty array when there is no data', function() {
      let resA = tradeStore.getTrades({exchange:'test', market:'C'})
      expect(resA, 'to equal', [])
    })
    it('should allow to filter by date', function() {
      let res = tradeStore.getTrades({exchange:'test', market:'B', daterange:[2500, 3400]})
      expect(res, 'to equal', [dataTradesB[1]])
    })
    //it.skip('filter by date should be inclusive', function() {
    //  let res = tradeStore.getTrades({exchange:'test', market:'B', daterange:[3000, 4000]})
    //  expect(res, 'to equal', [dataTradesB[2], dataTradesB[1]])
    //})
    it('should allow to limit number of results', function() {
      let res = tradeStore.getTrades({exchange:'test', market:'B', limit:2})
      expect(res, 'to equal', [dataTradesB[3], dataTradesB[2]])
    })
    it('should allow to get results from bottom', function() {
      let res = tradeStore.getTrades({exchange:'test', market:'B', limit:1, from:'bottom'})
      expect(res, 'to equal', [dataTradesB[0]])
    })
  })

  describe('getCandles()', function() {
    before(function() {
      tradeStore.add(dataCandles)
    })
    it('should group by 5min per default', function() {
      let res = tradeStore.getCandles({exchange:'candle', market:'A'})
      expect(res, 'to equal', expectedCandle5min)
    })
    it('should return an empty array on non existant data', function() {
      let res = tradeStore.getCandles({exchange:'candle', market:'B'})
      expect(res, 'to equal', [])
    })
    it('should allow other group periods', function() {
      let res1 = tradeStore.getCandles({exchange:'candle', market:'A', period:'20min'})
      let res2 = tradeStore.getCandles({exchange:'candle', market:'A', period:'1d'})
      expect(res1, 'to equal', expectedCandle20min)
      expect(res2, 'to equal', expectedCandle1d)
    })
    it('should allow filtering', function() {
      let res1 = tradeStore.getCandles({exchange:'candle', market:'A', daterange:[12000000, 13000000]})
      let res2 = tradeStore.getCandles({exchange:'candle', market:'A', daterange:[20000000, 30000000]})
      expect(res1, 'to equal', [expectedCandle5min[3]])
      expect(res2, 'to equal', [])
    })
  })

})
