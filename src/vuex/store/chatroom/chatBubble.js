
// import axios from 'axios'

const chatBubble = {
  namespaced: true,
  state: {
    holdDownTimestamp: 0, // 滑鼠按住時的時間戳
    timer: null,
    isShowMsgActionPanel: null, // 當前顯示的對話選單(discussId)
    eventListenStart: false,
    noClickPanelHideMethod: null,
    tempPosition: null, // 點選回覆訊息後暫存當前位置的變數
    tempMsgData: null // 點選回覆訊息後暫存的返回位置的資料{}
  },
  actions: {
    getTouchStartTime (store) {
      store.state.holdDownTimestamp = Date.now() // 紀錄點擊當下時間戳
    },
    // 手機版手指離開螢幕: 點擊螢幕時間 - 離開螢幕時間 = 手指在螢幕上的時間(點擊or按住)
    // 點擊: 跳轉到訊息中回覆的訊息位置
    // 按住0.2秒: 顯示"對話選單"
    getTouchEndTime (store, [e, discussId, that, msg]) {
      const touchEndTime = Date.now()

      if (touchEndTime - store.state.holdDownTimestamp <= 200) {
        // 跳轉到訊息中回覆的訊息位置
        store.dispatch('goToReplyPosition', msg)
      } else {
        // 按住對話氣泡>0.25秒就顯示"對話選單"
        // 顯示"對話選單"
        store.dispatch('msgToolShow', [e, discussId, that])
      }
    },
    // 對話選單 (複製、收回、回覆)
    msgToolShow (store, [e, discussId, that]) {
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

      // 若不是點擊對話選單就隱藏
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
    // 畫面跳到 回覆訊息位置
    goToReplyPosition (store, msg) {
      // 有回覆訊息才進行跳轉
      if (!msg?.replyData?.discussId) return

      const { discussId } = msg?.replyData

      const replyElement = document.querySelector(`#msg-${discussId}`)
      const ul = document.querySelector('#msgList')

      // 先將當前位置存起來，畫面跳轉後顯示 "跳至先前的訊息"按紐
      const tempPosition = ul.scrollTop

      // 對話氣泡上方的位置 + (螢幕高度的1/3高度)
      const position = replyElement.parentElement.offsetTop - (screen.height / 3)

      store.commit('UPDATE_POSITION', tempPosition)
      store.commit('UPDATE_MSG_DATA', msg)

      // 加上搖晃效果
      if (!replyElement.className.includes('shake-animation')) {
        let btn = null // 訊息內容超過200字的 "顯示全部內容"按紐

        replyElement.classList.add('shake-animation')

        // 若訊息內容超過200字, "顯示全部內容"的按紐也要一起搖晃
        if (msg.replyData.textContent.length > 200) {
          btn = document.querySelector(`#msg-btn-${msg.replyData.discussId}`)
          btn.classList.add('shake-animation')
        }
        setTimeout(() => {
          replyElement.classList.remove('shake-animation')
          if (msg.replyData.textContent.length > 200) btn.classList.remove('shake-animation')
        }, 1000)
      }

      ul.scrollTo(0, position)
    },
    panelHide (store) {
      store.state.isShowMsgActionPanel = null
    }
  },
  mutations: {
    TEMP_POSITION_INIT (state) {
      state.tempPosition = null
    },
    UPDATE_POSITION (state, position) {
      state.tempPosition = position
    },
    UPDATE_MSG_DATA (state, msg) {
      state.tempMsgData = msg
    }
  },
  getters: {

  }
}

export default chatBubble
