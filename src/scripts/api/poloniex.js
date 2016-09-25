
const url = "https://poloniex.com/public"

async function getPoloniexTradeHistory(market="BTC_XMR", start, end) {
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
  return {
    exchange : 'poloniex',
    market : market,
    trades : result.map(({date, type, rate, amount}) => {
      return  {
        date : new Date(date),
        type : type,
        rate : +rate,
        amount : +amount
      }
    })
  }
}

export {getPoloniexTradeHistory}
