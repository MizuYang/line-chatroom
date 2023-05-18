<template>
  <!-- 姓氏(頭貼) -->
  <span class="rounded-pill fw-bold-5 me-2" style="background-color:#FFC7A4;padding:6px 10px 7px 10px;">{{ msg.insertUser.split('')[0] }}</span>
  <div class="d-flex flex-column">
    <!-- 姓名 -->
    <p class="text-12 text-gray fw-bold-5 mb-2">{{ msg.insertUser }}</p>
    <div class="position-relative d-flex">
      <!-- 內容: 200字(若超過200字:限制最大高度、隱藏超出內容) -->
      <pre class="text-start bg-fff triangle-left raduis-10 ms-2 mb-0 ps-6 pe-4 py-2"
           :class="{'overflow-hidden':msg.textContent.length>200}"
           @mousedown="startTimer([$event,`msgActionPanel-${msg.discussId}`,this])"
           @mouseup="stopTimer"
           @touchstart="startTimer([$event,`msgActionPanel-${msg.discussId}`,this])"
           @touchend="stopTimer"
           style="max-width:250px;white-space:pre-wrap;word-wrap:break-word;"
           :style="`${msg.textContent.length>200&&'max-height:270px;'}`">{{ msg.textContent }}</pre>

      <!-- 時間 -->
      <time class="text-silver text-12 mt-auto ms-3">{{ msg.insertDate.split(' ')[1].slice(0,5) }}</time>

      <!-- 訊息動作選單 -->
      <div class="position-absolute"
            :class="{'d-none':`msgActionPanel-${msg.discussId}`!==isShowMsgActionPanel}"
            :ref="`msgActionPanel-${msg.discussId}`" style="top:-60px;">
        <MsgActionPanel :msg="msg.textContent"></MsgActionPanel>
      </div>
    </div>

    <!-- 內容超過兩百字-顯示全部內容 -->
    <button type="button" class="btn d-flex align-items-center text-start z100 ms-2"
            v-if="msg.textContent.length>200"
            @click="allContentShow"
            style="max-width:250px;background-color:gainsboro;border-radius:0 0 10px 10px;margin-top:-10px;">
            顯示全部內容
            <span class="arrow-right mt-1 ms-auto me-3"></span>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import MsgActionPanel from '@/components/chatroom/MsgActionPanel.vue'
export default {

  components: {
    MsgActionPanel
  },

  props: ['msg'],

  data () {
    return {
    }
  },

  computed: {
    ...mapState('chatBubble', ['isShowMsgActionPanel'])
  },

  methods: {
    ...mapActions('chatBubble', ['startTimer', 'stopTimer']),
    ...mapMutations('allContentModal', ['GET_MESSAGES', 'MODAL_SHOW']),

    allContentShow () {
      this.GET_MESSAGES(this.msg)
      this.MODAL_SHOW()
    }
  },

  mounted () {
  }

}
</script>

<style lang='scss' scope>
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
.arrow-right {
  display: inline-block;
  border-top: 2px solid #000;
  border-right: 2px solid #000;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
}
</style>
