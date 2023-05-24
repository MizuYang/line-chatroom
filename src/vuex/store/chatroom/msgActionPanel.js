
// import axios from 'axios'

const msgActionPanel = {
  namespaced: true,
  state: {
    replyMsg: {} // 回覆對象
  },
  actions: {
  },
  mutations: {
    GET_REPLY_OBJECT (state, object) {
      state.replyMsg = object
    },
    CLEAR_REPLY_OBJECT (state) {
      state.replyMsg = {}
    }
  },
  getters: {
  }
}

export default msgActionPanel
