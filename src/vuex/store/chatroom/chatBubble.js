
// import axios from 'axios'

const chatBubble = {
  namespaced: true,
  state: {
    holdDownTimestamp: 0, // 滑鼠按住時的時間戳
    timer: null,
    isShowMsgActionPanel: null, // 當前顯示的訊息動作選單(discussId)
    eventListenStart: false,
    noClickPanelHideMethod: null
  },
  actions: {
    // 行動版 - 按住對話氣泡五秒 顯示控制選項
    touchKeepFiveSeconds (store, [e, discussId, that]) {
      store.state.holdDownTimestamp = Date.now()
      store.state.timer = setInterval(() => {
        // 按住對話氣泡0.5秒就顯示"訊息動作選單"
        if (Date.now() - store.state.holdDownTimestamp >= 500) {
          store.state.eventListenStart = true
          const msgCenter = e.srcElement.clientWidth / 2 - 105 // 105是要讓選單下方箭頭置中到對話氣泡
          that.$refs[`msgActionPanel-${discussId}`].style.left = `${msgCenter}px`
          store.state.isShowMsgActionPanel = `msgActionPanel-${discussId}`

          document.addEventListener('click', noClickPanelHide)

          // 若不是點擊訊息動作選單就隱藏
          function noClickPanelHide (e) {
            if (store.state.eventListenStart) return

            const target = e.target.textContent
            const isClick = target === '複製' || target === '收回' || target === '回覆'

            if (!isClick) {
              store.dispatch('panelHide')
              document.removeEventListener('click', noClickPanelHide)
            }
          }
          // 訊息控制選項出現後0.3秒,才開始監聽點擊其他地方關閉控制選項
          setTimeout(() => {
            store.state.eventListenStart = false
          }, 300)
        }
      }, 100)
    },
    // 桌機版 - 按右鍵 顯示控制選項
    mousedownRight (store, [e, discussId, that]) {
      // 桌機版隱藏在網頁中滑鼠右鍵後, 顯示的功能按紐列表
      const ul = document.querySelector('#msgList')
      ul.addEventListener('contextmenu', e => {
        e.preventDefault()
      })

      store.state.eventListenStart = true
      const msgCenter = e.srcElement.clientWidth / 2 - 105 // 105是要讓選單下方箭頭置中到對話氣泡
      that.$refs[`msgActionPanel-${discussId}`].style.left = `${msgCenter}px`
      store.state.isShowMsgActionPanel = `msgActionPanel-${discussId}`

      document.addEventListener('click', noClickPanelHide)

      // 若不是點擊訊息動作選單就隱藏
      function noClickPanelHide (e) {
        if (store.state.eventListenStart) return

        const target = e.target.textContent
        const isClick = target === '複製' || target === '收回' || target === '回覆'

        if (!isClick) {
          store.dispatch('panelHide')
          document.removeEventListener('click', noClickPanelHide)
        }
      }
      // 訊息控制選項出現後0.3秒,才開始監聽點擊其他地方關閉控制選項
      setTimeout(() => {
        store.state.eventListenStart = false
      }, 300)
    },
    stopTimer (store) {
      clearTimeout(store.state.timer)
    },
    panelHide (store) {
      store.state.isShowMsgActionPanel = null
    }
  },
  mutations: {
  },
  getters: {

  }
}

export default chatBubble
