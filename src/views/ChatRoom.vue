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
        <ChatBubble :msg="msg" v-else-if='msg.insertUser===myName'></ChatBubble>

        <!-- 左側: 其他人的對話氣泡 -->
        <OtherChatBubble :msg="msg" v-else></OtherChatBubble>
      </li>
    </div>
  </ul>

  <!-- 下方控制輸入區 -->
  <FooterPanel></FooterPanel>
</template>

<script>
import NavBar from '@/components/layout/navbar/NavBar.vue'
import ChatBubble from '@/components/chatroom/MyChatBubble.vue'
import OtherChatBubble from '@/components/chatroom/OtherChatBubble.vue'
import FooterPanel from '@/components/chatroom/FooterPanel.vue'
export default {
  name: 'chatRoom',
  components: {
    NavBar,
    ChatBubble,
    OtherChatBubble,
    FooterPanel
  },

  data () {
    return {
      chatData: {}, // {0502: [當天所有對話], 0503: [當天所有對話]}
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
      holdDownTimestamp: 0, // 滑鼠按住時的時間戳
      timer: null,
      isShowMsgActionPanel: null, // 當前顯示的訊息動作選單
      eventListenStart: false
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
    }
  },

  mounted () {
    this.getMsg()
  }
}
</script>

<style lang="scss" scoped>
</style>
