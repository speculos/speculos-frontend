
export default {
  options : {
    theme : 'light'  //'light' or 'dark'
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
