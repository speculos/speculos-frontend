import {set} from 'vue'

export default {

  SET_THEME_LIGHT (state) { state.options.theme = 'light' },
  SET_THEME_DARK (state) { state.options.theme = 'dark' },

  SET_TRADE_HISTORY (state, tradeHistory) {
    const id = state.data.tradeHistories.findIndex(t => {
      return t.exchange == tradeHistory.exchange && t.market == tradeHistory.market
    })
    if (id >= 0) {
      set(state.data.tradeHistories[id], "trades", tradeHistory.trades)
    }
    else {
      state.data.tradeHistories.push(tradeHistory)
    }
  }
}
