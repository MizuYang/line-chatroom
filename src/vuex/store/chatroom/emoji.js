
const emoji = {
  namespaced: true,
  state: {
    isEmojiShow: false
  },
  actions: {
    emojiToggle (store) {
      store.commit('EMOJI_TOGGLE')
      // 給予input光標位置
      const { msgInputEl, cursorIndex } = store.rootState.footerPanel
      msgInputEl.focus()
      let index = cursorIndex
      if (cursorIndex === -1) index = msgInputEl.value.length
      msgInputEl.setSelectionRange(index, index)
    }
  },
  mutations: {
    EMOJI_TOGGLE (state) {
      state.isEmojiShow = !state.isEmojiShow
    },
    EMOJI_HIDE (state) {
      state.isEmojiShow = false
    }
  },
  getters: {
  }
}

export default emoji
