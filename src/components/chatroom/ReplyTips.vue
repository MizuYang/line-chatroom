<template>
  <div class="position-relative" v-if="replyMsg.discussId">
    <button type="button" class="w-100 btn d-flex align-items-center text-start ps-6 pe-4 py-4" @mousedown.left="moveToReply" @touchstart="moveToReply">
      <!-- 姓氏(頭貼) -->
      <span class="rounded-pill text-12 fw-bold-5 me-2" style="background-color:#FFC7A4;padding:5px 8px">{{ replyMsg.insertUser?.split('')[0] }}</span>
      <div>
        <!-- 姓名 -->
        <p class="text-12 text-light fw-bold-5" style="margin-bottom:2px;">{{ replyMsg.insertUser }}</p>
        <!-- 內容 -->
        <p class="text-12 text-gray text-cut" style="max-width:300px;">{{ replyMsg.textContent }}</p>
      </div>
    </button>

    <button type="button" class="position-absolute top-0 end-0 btn x-icon m-0 p-0" @mousedown.left.prevent="clearReply" @touchstart.prevent="clearReply"></button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {

  data () {
    return {
    }
  },

  computed: {
    ...mapState(['isPhone']),
    ...mapState('msgActionPanel', ['replyMsg'])
  },

  methods: {
    ...mapMutations('msgActionPanel', ['CLEAR_REPLY_OBJECT']),

    moveToReply (e) {
      if (e.target.className.includes('x-icon')) return

      const el = document.querySelector(`#msg-${this.replyMsg.discussId}`)

      // 對話氣泡上方的位置 + (螢幕高度的1/3高度)
      const position = el.parentElement.offsetTop - (screen.height / 3)

      // 加上搖晃效果
      if (!el.className.includes('shake-animation')) {
        let btn = null // 訊息內容超過200字的 "顯示全部內容"按紐

        el.classList.add('shake-animation')

        // 若訊息內容超過200字, "顯示全部內容"的按紐也要一起搖晃
        if (this.replyMsg.textContent.length > 200) {
          btn = document.querySelector(`#msg-btn-${this.replyMsg.discussId}`)
          btn.classList.add('shake-animation')
        }
        setTimeout(() => {
          el.classList.remove('shake-animation')
          if (this.replyMsg.textContent.length > 200) btn.classList.remove('shake-animation')
        }, 1000)
      }

      document.querySelector('#msgList').scrollTo(0, position)
    },
    clearReply (e) {
      if (e.target.className.includes('x-icon')) {
        this.CLEAR_REPLY_OBJECT()
      }
    }
  },

  mounted () {
  }

}
</script>

<style lang='scss' scope>
.x-icon::before,
.x-icon::after {
  content: "";
  position: absolute;
  top: 5px;
  right: 20px;
  width: 2px;
  height: 20px;
  border-left: 2px solid #fff;
}
.x-icon:before {
  transform: rotate(45deg);
}
.x-icon:after {
  transform: rotate(-45deg);
}
</style>
