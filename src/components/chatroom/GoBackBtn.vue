<template>
  <button type="button" class="btn bg-dark text-silver btn-hover-none px-5 py-2"
          @click.left="goBackMsg"
          v-if="tempPosition">跳至先前的訊息</button>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapState('chatBubble', ['tempPosition', 'tempMsgData'])
  },

  methods: {
    ...mapMutations('chatBubble', ['TEMP_POSITION_INIT']),

    // 返回先前的訊息
    goBackMsg () {
      document.querySelector('#msgList').scrollTo(0, this.tempPosition)

      const discussId = this.tempMsgData.discussId
      const preElement = document.querySelector(`#msg-${discussId}`)

      // 加上搖晃效果
      if (!preElement.className.includes('shake-animation')) {
        let btn = null // 訊息內容超過200字的 "顯示全部內容"按紐

        preElement.classList.add('shake-animation')

        // 若訊息內容超過200字, "顯示全部內容"的按紐也要一起搖晃
        if (this.tempMsgData.textContent.length > 200) {
          btn = document.querySelector(`#msg-btn-${discussId}`)
          btn.classList.add('shake-animation')
        }
        setTimeout(() => {
          preElement.classList.remove('shake-animation')
          if (this.tempMsgData.textContent.length > 200) btn.classList.remove('shake-animation')
        }, 1000)
      }

      // 初始化 tempPosition
      this.TEMP_POSITION_INIT()
    }
  },

  mounted () {
  }

}
</script>

<style lang='scss' scope>
// 蓋掉bs5 .btn hover 樣式
.btn.btn-hover-none:hover {
  &:hover {
    color: silver;
  }
}
</style>
