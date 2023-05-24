<template>
  <!-- 導航列 -->
  <NavBar></NavBar>

  <ul class="overflow-scroll pt-5 px-8" id="msgList" ref="msgList"
      @scroll.passive="isPhone||updateCanViewPosition()"
      @touchmove="isPhone&&updateCanViewPosition()"
      style="height: calc(100vh - 162px);background-color:#F5F5F5;margin-top:96px;">
    <!-- min-height -->
    <div v-for="(val,date) in chatData" :key="`content-${date}`" class="text-center ">
      <!-- 日期 -->
      <span class="d-inline-block text-light text-12 raduis-8 mb-6 px-7 py-1" style="background-color:#B6DCFF;">{{ getDay(date) }}</span>

      <li class="d-flex align-items-start text-start mb-6" v-for="msg in val" :key="`msg-${msg.discussId}`">
         <!-- 尚未讀取分隔線 -->
        <span class="w-100 d-inline-block bg-gainsboro text-light text-center raduis-20 my-10" ref="neverRead" v-if="msg.textContent==='以下尚未閱讀的訊息'">以下尚未閱讀的訊息</span>

        <!-- 右側: 自己的對話氣泡 -->
        <MyChatBubble :ref="`msg-${msg.discussId}`" :msg="msg" v-else-if='msg.insertUser===myName'></MyChatBubble>

        <!-- 左側: 其他人的對話氣泡 -->
        <OtherChatBubble :ref="`msg-${msg.discussId}`" :msg="msg" v-else></OtherChatBubble>
      </li>
    </div>
  </ul>

  <!-- 下方控制輸入區 -->
  <FooterPanel class="mt-15"></FooterPanel>

  <!-- emoji -->
  <div class="position-fixed" v-if="isEmojiShow" style="right:20px;bottom:70px;">
    <EmojiPanel></EmojiPanel>
  </div>

  <!-- modal:顯示超出200字內容 -->
  <AllContentModal v-if="isAllContentModalShow"></AllContentModal>

  <!-- 回覆提示 -->
  <div class="position-fixed z100 w-100 bg-dark" style="bottom:66px;">
    <ReplyTips></ReplyTips>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavBar from '@/components/layout/navbar/NavBar.vue'
import MyChatBubble from '@/components/chatroom/chatBubble/MyChatBubble.vue'
import OtherChatBubble from '@/components/chatroom/chatBubble/OtherChatBubble.vue'
import FooterPanel from '@/components/chatroom/FooterPanel.vue'
import EmojiPanel from '@/components/chatroom/EmojiPanel.vue'
import AllContentModal from '@/components/chatroom/modal/AllContentModal.vue'
import ReplyTips from '@/components/chatroom/ReplyTips.vue'
export default {
  name: 'chatRoom',
  components: {
    NavBar,
    MyChatBubble,
    OtherChatBubble,
    FooterPanel,
    EmojiPanel,
    AllContentModal,
    ReplyTips
  },

  data () {
    return {
      data: [],
      chatData: {}, // 我要的格式 {0502: [當天所有對話], 0503: [當天所有對話]}
      myName: '楊同學',
      day: {
        0: '日',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六'
      },
      neverReadMsg: [],
      canViewHeight: { // 螢幕可視高度:下方
        bottom: 0
      },
      isScrollLoading: false, // 節流
      num: 0, //! 測試查看捲動次數
      scrollHeight: 0 // 當前捲動條高度(用來判斷畫面是否滾動中)
    }
  },

  computed: {
    ...mapState(['isPhone']),
    ...mapState('emoji', ['isEmojiShow']),
    ...mapState('allContentModal', ['isAllContentModalShow']),
    ...mapState('footerPanel', ['cursorIndex', 'msgInputEl'])
  },

  methods: {
    getMsg () {
      return new Promise((resolve, reject) => {
        this.$http.get('/api/chatContent.json')
          .then(res => {
            console.log(res)
            this.data = res.data

            const data = res.data
            let hasDividingLine = false

            // 處理對話的回覆訊息
            data.forEach((msg, mIndex) => {
              // 不是回覆對話的訊息就中斷
              if (!msg.replyId) return
              // 抓出回覆的那則訊息
              const replyData = data.filter(item => msg.replyId === item.discussId)
              data[mIndex].replyData = { ...replyData[0] }
            })

            // 組成我要的格式, // {0502: [當天所有對話], 0503: [當天所有對話]}
            // 並在第一個未讀訊息前加入 "以下尚未閱讀的訊息" 分隔線
            data.forEach(item => {
              const date = item.insertDate.split(' ')[0]
              if (this.chatData[date]) {
                this.chatData[date].push(item)
              } else {
                this.chatData[date] = JSON.parse(JSON.stringify([item]))
              }
              // 若有未讀訊息, 則在該訊息前加入未讀訊息的提示
              if (!item.unreadFlag) {
                // 若已有未讀訊息的分隔線, 就不再新增了 (只會有一個未讀分隔線)
                if (hasDividingLine) return
                const data = { ...item }
                data.textContent = '以下尚未閱讀的訊息'
                data.discussId = -1
                const index = this.chatData[date].length - 1
                this.chatData[date].splice(index, 0, data)
                hasDividingLine = true
              }
            })
            console.log(this.chatData)
            resolve()
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    getDay (day) {
      // 若日期是今天or昨天的日期 就回傳今天or昨天的字樣
      const today = new Date().toISOString().split('T')[0]
      if (today === day) return '今天'
      const yesterday = new Date(new Date(today).getTime() - 86400000).toISOString().split('T')[0]
      if (yesterday === day) return '昨天'

      // 取得日期
      const date = day.slice(5).split('-').join('/')

      // 取得星期: 日一二三四五六
      const dayNumber = new Date(day).getDay()
      const dayCn = this.day[dayNumber]
      return `${date} (${dayCn})`
    },
    // [初始化]移動卷軸到對話底部or未讀訊息位置 + 取得可視畫面bottom初始值
    scrollHandleInit () {
      return new Promise((resolve, reject) => {
        let scrollPosition = null

        // 判斷是否有未讀訊息
        const hasNeverReadMsg = this.$refs.neverRead

        // 若有未讀訊息, 進入討論區的畫面應在未讀訊息的位置(未讀訊息字樣上方會有一半畫面的高度)
        if (hasNeverReadMsg) {
          scrollPosition = this.$refs.neverRead[0].offsetTop - screen.height / 2
        } else {
          // 若無未讀訊息, 進入討論區的畫面應在最底部
          scrollPosition = this.$refs.msgList.scrollHeight
        }

        // 控制滾動條位置
        this.$refs.msgList.scrollTo(0, scrollPosition)

        // (ul元素當前高度 + 螢幕高度) - 訊息欄位高度
        const bottom = (this.$refs.msgList.scrollTop + window.innerHeight) - 66
        // 畫面一進來進入可視區域 被已讀的訊息(可視畫面初始數值)
        this.canViewHeight.bottom = bottom

        resolve()
      })
    },
    // @scroll:滑動狀態中持續 更新可視畫面bottom
    async updateCanViewPosition () {
      // 有未讀訊息才執行
      if (this.neverReadMsg.length === 0) return

      // 節流(減少scroll觸發次數)
      if (this.isScrollLoading) {
        setTimeout(() => {
          this.isScrollLoading = false
        }, 100)
        return
      }

      this.num += 1
      console.log('畫面捲動次數: ', this.num)

      const bottomHeight = (this.$refs.msgList.scrollTop + window.innerHeight) - 66
      // 可視畫面的底部高度 < 未讀訊息的螢幕高度 就中斷(接近未閱讀訊息才開始執行)
      if (bottomHeight < this.$refs.neverRead[0].offsetTop) return

      // 下方可視範圍高度 = (列表元素在瀏覽器的高度+螢幕高度) - 對話控制欄位高度
      this.canViewHeight.bottom = bottomHeight

      console.log('可視畫面bottom: ', this.canViewHeight.bottom)

      this.checkReadStatus()

      this.isScrollLoading = true
    },
    getNeverReadMsgPosition () {
      const neverReadMsg = []

      this.data.forEach(msg => {
        // 已讀的訊息不執行
        if (msg.unreadFlag) return

        const obj = { ...msg }
        const el = document.querySelector(`#msg-${msg.discussId}`)
        // 底部高度 = 元素上方高度 + 元素本身的高度
        obj.bottom = el.parentElement.offsetTop + el.clientHeight

        neverReadMsg.push(obj)
      })

      this.neverReadMsg = neverReadMsg
      console.log('未讀訊息列表', this.neverReadMsg)
    },
    // @捲動的畫面停止後 檢查是否有已讀的訊息
    checkReadStatus () {
      // 例：假設用戶用非常快的畫面速度滑到下面, 最下面會被已讀, 但中間快速滑過的部分會是未讀
      // 此函式處理這個問題
      // (因為有做捲動節流, 防止行動版負荷過大)
      // 原理：用戶手指抬起後, 200毫秒後檢查卷軸高度若與剛才一樣, 代表畫面停止

      // 1. 先記錄當前捲動的高度為置
      this.scrollHeight = this.$refs.msgList.scrollTop

      const timer = setInterval(() => {
        // 2. 200毫秒後, 判斷剛剛紀錄的位置 與 現在的位置是否一樣
        if (this.scrollHeight === this.$refs.msgList.scrollTop) {
          console.log('畫面停止, 停止計時器')
          clearInterval(timer)

          const newNeverReadMsg = [...this.neverReadMsg]
          this.canViewHeight.bottom = (this.$refs.msgList.scrollTop + window.innerHeight) - 66

          this.neverReadMsg.forEach(msg => {
            // 判斷 若可視畫面的bottom > 未讀區.未讀對話氣泡的bottom 就代表是已讀了
            if (this.canViewHeight.bottom > msg.bottom) {
              // 此處為已讀的訊息
              console.log('已讀的訊息：', msg.textContent)

              //! testBg 測試用 (已讀的文字會變綠色)
              this.$refs[`msg-${msg.discussId}`][0].msg.testBg = true

              //! 發送API給後端, 說此訊息已讀了
              //! 程式碼 { ... }
              //! 程式碼 { ... }

              // 將應該是已讀的對話從neverReadMsg刪除
              const deleteIndex = newNeverReadMsg.findIndex(item => item.discussId === msg.discussId)
              newNeverReadMsg.splice(deleteIndex, 1)
            }
          })

          // 更新未讀訊息(將已讀取的刪除)
          this.neverReadMsg = [...newNeverReadMsg]
        } else {
          console.log('畫面未停止, 重新賦予值')
          this.scrollHeight = this.$refs.msgList.scrollTop
        }
      }, 200)
    }
  },

  async mounted () {
    await this.getMsg()
    this.getNeverReadMsgPosition()
    await this.scrollHandleInit()
    this.checkReadStatus()
  }
}
</script>

<style lang="scss" scoped>
</style>
