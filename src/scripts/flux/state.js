
export default {
  options : {
    theme : 'dark'  //'light' or 'dark'
  },
  user : {
    tokens : {
      poloniex : ""
    }
  },
  ui : {
    pages : {
      markets : {
        exchange : 'poloniex',
        market : 'BTC_XMR',
        period : [],
        graph : {
          trades : {
            period : []
          }
        }
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
          BTC_XMR : {
            trades : {
              period : []
            },
            orders : {
              updated : null
            }
          },
          BTC_ETH : {
            trades : {
              period : []
            },
            orders : {
              updated : null
            }
          }
        }
      }
    }
  }
}
