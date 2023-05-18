
// import axios from 'axios'

const footerPanel = {
  namespaced: true,
  state: {
    msgInputEl: '', // 文字輸入框的元素
    messages: '豬到了', // 用戶輸入文字
    cursorIndex: -1 // 用戶當前光標的索引位置
  },
  actions: {
  },
  mutations: {
    GET_INPUT_EL (state, el) {
      state.msgInputEl = el
    },
    UPDATE_MESSAGES (state, msg) {
      state.messages = msg
    },
    UPDATE_CURSOR_INDEX (state, index) {
      state.cursorIndex = index
    }
  },
  getters: {
  }
}

export default footerPanel
