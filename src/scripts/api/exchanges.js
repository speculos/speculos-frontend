import tokenRequest from './tokenRequest.js'

const endpoints = {

}

class ExchangeAPI {

  constructor() {
    this.publicToken = null
    this.tradingToken = null
  }

  setPublicToken(token) {
    this.publicToken = token
  }

  setTradingToken(token) {
    this.tradingToken = token
  }

  async getMarkets(exchange) {
    return this.request(exchange, 'GET', '/markets', {trading:false})
  }


  async request(exchange, method='GET', endpoint, {trading}, data) {
    if (!config.api.exchanges[exchange]) {
      throw new Error('Unknown exchange name : ' + exchange)
    }
    if (!config.api.exchanges[exchange].url) {
      throw new Error('No url given in config file')
    }
    if (trading && !this.tradingToken) {
      throw new Error('No trading token setted')
    }
    if (!trading && !this.publicToken) {
      throw new Error('No public token setted')
    }
    return tokenRequest({
      token : trading ? this.tradingToken : this.publicToken,
      url : config.api.exchanges[exchange].url + endpoint,
      method,
      data
    })
  }

}


//export singleton
export default new ExchangeAPI()
