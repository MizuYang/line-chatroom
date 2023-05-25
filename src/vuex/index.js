import { createStore } from 'vuex'
// import axios from 'axios'

// 其它store
import chatBubble from '@/vuex/store/chatroom/chatBubble.js'
import footerPanel from '@/vuex/store/chatroom/footerPanel.js'
import allContentModal from '@/vuex/store/chatroom/allContentModal.js'
import emoji from '@/vuex/store/chatroom/emoji.js'
import msgActionPanel from '@/vuex/store/chatroom/msgActionPanel.js'

export default createStore({
  strict: false, // 嚴謹模式
  state: {
    isPhone: false //! 測試裝置為手機
    // const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())

  },
  actions: {
  },
  mutations: {
    CHANGE_MODE (state) {
      state.isPhone = !state.isPhone
    }
  },
  getters: {
  },
  modules: {
    chatBubble,
    footerPanel,
    allContentModal,
    emoji,
    msgActionPanel
  }
})
