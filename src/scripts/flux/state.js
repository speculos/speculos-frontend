
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
    pages : {
      markets : {
        exchange : 'poloniex',
        market : 'BTC_ETH',
        period : [],
        graph : {
          trades : {
            period : []
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
