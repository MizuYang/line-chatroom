<template>
  <div class="d-flex flex-column ms-auto">
    <div class="d-flex ms-auto">
      <div class="d-flex flex-column">
        <!-- 已讀人數 -->
        <span class="text-12 text-silver mt-auto">已讀21</span>
        <!-- 時間 -->
        <time class="text-silver text-12 ms-auto ms-3">{{ msg.insertDate.split(' ')[1].slice(0,5) }}</time>
      </div>
      <!-- 內容 -->
      <div class="position-relative">
        <pre class="text-start bg-fff triangle-right raduis-10 ms-2 mb-0 ps-6 pe-4 py-2"
             :class="{'overflow-hidden':msg.textContent.length>200}"
             @mousedown="startTimer([$event,`msgActionPanel-${msg.discussId}`,this])"
             @mouseup="stopTimer"
             @touchstart="startTimer([$event,`msgActionPanel-${msg.discussId}`,this])"
             @touchend="stopTimer"
             style="max-width:250px;white-space:pre-wrap;word-wrap:break-word;"
             :style="`${msg.textContent.length>200&&'max-height:270px;'}`">{{ msg.textContent }}</pre>
        <!-- 訊息動作選單 -->
        <div class="position-absolute z100"
              :class="{'d-none':`msgActionPanel-${msg.discussId}`!==isShowMsgActionPanel}"
              :ref="`msgActionPanel-${msg.discussId}`" style="top:-60px;">
          <MsgActionPanel :msg="msg.textContent"></MsgActionPanel>
        </div>
      </div>
    </div>
    <!-- 內容超過兩百字-顯示全部內容 -->
    <button type="button" class="btn d-flex align-items-center ms-auto z100"
            v-if="msg.textContent.length>200"
            @click="allContentShow"
            style="width:250px;background-color:gainsboro;border-radius:0 0 10px 10px;margin-top:-10px;">
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
