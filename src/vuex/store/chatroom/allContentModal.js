
// import axios from 'axios'

const allContentModal = {
  namespaced: true,
  state: {
    messages: {},
    isAllContentModalShow: false
  },
  actions: {
  },
  mutations: {
    GET_MESSAGES (state, data) {
      state.messages = data
    },
    MODAL_SHOW (state) {
      state.isAllContentModalShow = true
    },
    MODAL_HIDE (state) {
      state.isAllContentModalShow = false
    }
  },
  getters: {
  }
}

export default allContentModal
