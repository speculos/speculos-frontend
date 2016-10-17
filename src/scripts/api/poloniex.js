
const url = "https://poloniex.com/public"

async function getPoloniexTradeHistory(market="BTC_ETH", start, end) {
  const data = {
    command : 'returnTradeHistory',
    currencyPair : market,
    start,
    end
  }
  let result = await $.ajax({
    method : 'GET',
    dataType : 'json',
    url,
    data
  })
  return result.map(({date, type, rate, amount, globalTradeID}) => {
    return  {
      exchange : 'poloniex',
      market : market,
      id : +globalTradeID,
      date : date,
      type : type,
      rate : +rate,
      amount : +amount
    }
  })
}

export {getPoloniexTradeHistory}
