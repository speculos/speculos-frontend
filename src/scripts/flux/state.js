
export default {
  options : {
    theme : 'dark'  //'light' or 'dark'
  },
  user : {
    tokens : {
      auth : null,
      exchanges : {
        poloniex : null
      }
    }
  },
  ui : {
    menuLeft : {
      visible : true
    },
    pages : {
      market : {
        exchangeName : null,
        currencyPair : null,
        graph : {
          trades : {
            dots : {
              show : true,
              data : null,
              daterange : null,
              raterange : null
            },
            candles : {
              show : false
            },
            minimap : {
              data : null,
              daterange : null
            }
          }
        }
      }
    }
  },
  requests : {
    trades : {
      periods : {
        /*
        poloniex_BTC_ETH : [145548823485, 146509605009]
        */
      }
    }
  },
  data : {
    server : {
      name : "",
      version : null,
      token : null
    },
    exchanges : {
      poloniex : {
        minimalAmount : null,
        fees : {},
        markets : {
          /*
          BTC_ETH : {
            types : ['EXCHANGE', 'MARGIN'],
            volume24 : 12,
            ticker : {}
          }
          */
        }
      }
    }
  }
}
