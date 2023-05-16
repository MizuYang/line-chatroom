<template>
  <!-- 姓氏(頭貼) -->
  <span class="rounded-pill fw-bold-5 me-2" style="background-color:#FFC7A4;padding:6px 10px 7px 10px;">{{ msg.insertUser.split('')[0] }}</span>
  <div class="d-flex flex-column">
    <!-- 姓名 -->
    <p class="text-12 text-gray fw-bold-5 mb-2">{{ msg.insertUser }}</p>
    <div class="position-relative d-flex">
      <!-- 內容 -->
      <pre class="text-start bg-fff triangle-left raduis-10 ms-2 mb-0 ps-6 pe-4 py-2"
            @mousedown="startTimer([$event,`msgActionPanel-${msg.discussId}`,this])"
            @mouseup="stopTimer"
            @touchstart="startTimer([$event,`msgActionPanel-${msg.discussId}`,this])"
            @touchend="stopTimer"
            style="max-width:250px;white-space: pre-wrap;">{{ msg.textContent }}</pre>
      <!-- 時間 -->
      <time class="text-silver text-12 mt-auto ms-3">{{ msg.insertDate.split(' ')[1].slice(0,5) }}</time>

      <!-- 訊息動作選單 -->
      <div class="position-absolute"
            :class="{'d-none':`msgActionPanel-${msg.discussId}`!==isShowMsgActionPanel}"
            :ref="`msgActionPanel-${msg.discussId}`" style="top:-60px;">
        <MsgActionPanel :msg="msg.textContent"></MsgActionPanel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
    ...mapActions('chatBubble', ['startTimer', 'stopTimer'])
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
</style>
