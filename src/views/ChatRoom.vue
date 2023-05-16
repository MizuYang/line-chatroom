<template>
  <!-- 導航列 -->
  <NavBar></NavBar>

  <ul class="overflow-scroll pt-5 px-8" style="min-height:100vh;background-color:#F5F5F5;margin-top:96px;margin-bottom:66px;">

    <div v-for="(val,date) in chatData" :key="`content-${date}`" class="text-center ">
      <!-- 日期 -->
      <span class="d-inline-block text-light text-12 raduis-8 mb-6 px-7 py-1" style="background-color:#B6DCFF;">{{ getDay(date) }}</span>

      <li class="d-flex align-items-start text-start mb-6" v-for="msg in val" :key="`msg-${msg.discussId}`">

         <!-- 尚未讀取分隔線 -->
        <span class="w-100 d-inline-block bg-gainsboro text-light text-center raduis-20 my-10" v-if="msg.textContent==='以下尚未閱讀的訊息'">以下尚未閱讀的訊息</span>

        <!-- 右側: 自己的對話氣泡 -->
        <div class="d-flex ms-auto" v-else-if='msg.insertUser===myName'>
          <div class="d-flex flex-column">
            <!-- 已讀人數 -->
            <span class="text-12 text-silver mt-auto">已讀21</span>
            <!-- 時間 -->
            <time class="text-silver text-12 ms-auto ms-3">{{ msg.insertDate.split(' ')[1].slice(0,5) }}</time>
          </div>
          <!-- 內容 -->
          <div class="position-relative">
            <pre class="text-start bg-fff triangle-right raduis-10 ms-2 mb-0 ps-6 pe-4 py-2"
                 @mousedown="startTimer($event,`msgActionPanel-${msg.discussId}`)"
                 @mouseup="stopTimer(`msgActionPanel-${msg.discussId}`)"
                 @touchstart="startTimer($event,`msgActionPanel-${msg.discussId}`)"
                 @touchend="stopTimer(`msgActionPanel-${msg.discussId}`)"
                 style="max-width:250px;white-space: pre-wrap;">{{ msg.textContent }}</pre>
            <!-- 訊息動作選單 -->
            <div class="position-absolute"
                 :class="{'d-none':`msgActionPanel-${msg.discussId}`!==isShowMsgActionPanel}"
                 :ref="`msgActionPanel-${msg.discussId}`" style="top:-60px;">
              <MsgActionPanel :msg="msg.textContent" @panelHide="panelHide"></MsgActionPanel>
            </div>
          </div>
        </div>

        <!-- 左側: 其他人的對話氣泡 -->
        <template v-else>
          <!-- 姓氏(頭貼) -->
          <span class="rounded-pill fw-bold-5 me-2" style="background-color:#FFC7A4;padding:6px 10px 7px 10px;">{{ msg.insertUser.split('')[0] }}</span>
          <div class="d-flex flex-column">
            <!-- 姓名 -->
            <p class="text-12 text-gray fw-bold-5 mb-2">{{ msg.insertUser }}</p>
            <div class="position-relative d-flex">
              <!-- 內容 -->
              <pre class="text-start bg-fff triangle-left raduis-10 ms-2 mb-0 ps-6 pe-4 py-2"
                   @mousedown="startTimer($event,`msgActionPanel-${msg.discussId}`)"
                   @mouseup="stopTimer(`msgActionPanel-${msg.discussId}`)"
                   @touchstart="startTimer($event,`msgActionPanel-${msg.discussId}`)"
                   @touchend="stopTimer(`msgActionPanel-${msg.discussId}`)"
                   style="max-width:250px;white-space: pre-wrap;">{{ msg.textContent }}</pre>
              <!-- 時間 -->
              <time class="text-silver text-12 mt-auto ms-3">{{ msg.insertDate.split(' ')[1].slice(0,5) }}</time>

              <!-- 訊息動作選單 -->
              <div class="position-absolute"
                   :class="{'d-none':`msgActionPanel-${msg.discussId}`!==isShowMsgActionPanel}"
                   :ref="`msgActionPanel-${msg.discussId}`" style="top:-60px;">
                <MsgActionPanel :msg="msg.textContent" @panelHide="panelHide"></MsgActionPanel>
              </div>
            </div>
          </div>
        </template>
      </li>
    </div>
  </ul>

  <!-- 下方輸入區 -->
  <footer class="position-fixed bottom-0 z100 w-100 d-flex align-items-center px-8" style="height:66px;background-color:#CBE6FF;">
    <button type="button" class="btn me-6 p-0">
      <img src='@/assets/images/chatroom/檔案上傳.svg' alt='檔案上傳'>
    </button>
    <button type="button" class="btn me-6 p-0">
      <img src='@/assets/images/chatroom/圖片上傳.svg' alt='圖片上傳'>
    </button>

    <div class="position-relative me-4">
      <textarea rows="1" class="form-control raduis-20" v-model="message" style="width:230px;height:36px;resize:none;"></textarea>
      <button type="button" class="position-absolute end-0 d-flex align-items-center btn me-5 p-0" style="top:50%;transform:translateY(-50%);">
        <img src='@/assets/images/chatroom/表情符號.svg' class="d-inline-block" alt='表情符號'>
      </button>
    </div>

    <button type="button" class="btn p-0">
      <img src='@/assets/images/chatroom/訊息送出.svg' alt='訊息送出'>
    </button>
  </footer>
</template>

<script>
import NavBar from '@/components/layout/navbar/NavBar.vue'
import MsgActionPanel from '@/components/MsgActionPanel.vue'
export default {
  name: 'chatRoom',
  components: {
    NavBar,
    MsgActionPanel
  },

  data () {
    return {
      chatData: {}, // {0502: [當天所有對話], 0503: [當天所有對話]}
      myName: '楊同學',
      message: '豬到了',
      day: {
        0: '日',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六'
      },
      // showActions: false,
      holdDownTimestamp: 0, // 滑鼠按住時的時間戳
      timer: null,
      isShowMsgActionPanel: null, // 當前顯示的訊息動作選單
      eventListenStart: false,
      copiedText: ''
    }
  },

  methods: {
    getMsg () {
      this.$http.get('/api/chatContent.json')
        .then(res => {
          console.log(res)
          // 組成我要的格式, // {0502: [當天所有對話], 0503: [當天所有對話]}
          const data = res.data
          let hasDividingLine = false
          data.forEach(item => {
            const date = item.insertDate.split(' ')[0]
            if (this.chatData[date]) {
              this.chatData[date].push(item)
              // 若有未讀訊息, 則在該訊息前加入未讀訊息的提示
              if (!item.unreadFlag) {
              // 若已有未讀訊息的分隔線, 就不再新增了 (只會有一個未讀分隔線)
                if (hasDividingLine) return
                const data = { ...item }
                data.textContent = '以下尚未閱讀的訊息'
                const index = this.chatData[date].length - 1
                this.chatData[date].splice(index, 0, data)
                hasDividingLine = true
              }
            } else {
              this.chatData[date] = JSON.parse(JSON.stringify([item]))
            }
          })
          console.log(this.chatData)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDay (day) {
      // 若日期是今天or昨天的日期 就回傳今天or昨天的字樣
      // console.log('day', day)
      const today = new Date().toISOString().split('T')[0]
      // console.log('today', today)
      if (today === day) return '今天'
      const yesterday = new Date(new Date(today).getTime() - 86400000).toISOString().split('T')[0]
      // console.log('yesterday', yesterday)
      if (yesterday === day) return '昨天'

      // 取得日期
      const date = day.slice(5).split('-').join('/')

      // 取得星期: 日一二三四五六
      const dayNumber = new Date(day).getDay()
      const dayCn = this.day[dayNumber]
      // console.log(day)
      return `${date} (${dayCn})`
    },
    startTimer (e, ref) {
      this.holdDownTimestamp = Date.now()
      this.timer = setInterval(() => {
        // 按住對話氣泡0.5秒就顯示"訊息動作選單"
        if (Date.now() - this.holdDownTimestamp >= 500) {
          this.eventListenStart = true
          const msgCenter = e.srcElement.clientWidth / 2 - 105 // 105是要讓選單下方箭頭置中到對話氣泡
          this.$refs[ref][0].style.left = `${msgCenter}px`
          this.isShowMsgActionPanel = ref

          document.addEventListener('click', this.noClickPanelHide)
          setTimeout(() => {
            this.eventListenStart = false
          }, 300)
        }
      }, 100)
    },
    stopTimer () {
      clearTimeout(this.timer)
    },
    panelHide () {
      this.isShowMsgActionPanel = null
    },
    // 若不是點擊訊息動作選單就隱藏
    noClickPanelHide (e) {
      if (this.eventListenStart) return

      const target = e.target.textContent
      const isClick = target === '複製' || target === '收回' || target === '回覆'

      if (!isClick) {
        this.panelHide()
        document.removeEventListener('click', this.noClickPanelHide)
      }
    }
  },

  mounted () {
    this.getMsg()
  }
}
</script>

<style lang="scss" scoped>
.triangle-left::before {
  content: '';
  position: absolute;
  top: 3px;
  left: -5px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 13px 5px 0;
  border-color: transparent #fff transparent transparent;
}
.triangle-right::before {
  content: '';
  position: absolute;
  top: 6px;
  right: -8px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6.5px 0 6.5px 13px;
  border-color: transparent transparent transparent #fff;
}
</style>
