import { createStore } from 'vuex'
// import axios from 'axios'

// 其它store
import chatBubble from '@/vuex/store/chatroom/chatBubble.js'
import footerPanel from '@/vuex/store/chatroom/footerPanel.js'

export default createStore({
  strict: false, // 嚴謹模式
  state: {
  },
  actions: {
  },
  mutations: {
  },
  getters: {
  },
  modules: {
    chatBubble,
    footerPanel
  }
})
