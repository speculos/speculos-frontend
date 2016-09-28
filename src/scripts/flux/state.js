
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
        market : 'BTC_XMR'
      }
    }
  },
  data : {
    server : {
      name : "",
      version : null,
      token : null
    },
    exchanges : [
    /* {
      minimalAmount :
      fees : {}
    } */
    ],
    markets : [
    /* {
      currency : ""
      asset :	""
      ticker : {}
    } */
    ],
    tradeHistories : [
    /* {
      exchange : "",
      market : "",
      trades : [
        {
          date :
          type :
          rate :
          amount :
        }
      ]
    } */
    ],
    orderBooks : [
    /* {
      exchange : "",
      market : "",
      bids : [
        {
          rate :
          amount :
        }
      ],
      asks : [
        {
          rate :
          amount :
        }
      ]
    } */
    ]
  }
}
