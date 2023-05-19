<template>
  <footer class="position-fixed bottom-0 z110 w-100 d-flex align-items-center px-8" style="height:66px;background-color:#CBE6FF;">
    <button type="button" class="btn me-6 p-0">
      <img src='@/assets/images/chatroom/檔案上傳.svg' alt='檔案上傳'>
    </button>
    <button type="button" class="btn me-6 p-0">
      <img src='@/assets/images/chatroom/圖片上傳.svg' alt='圖片上傳'>
    </button>

    <div class="position-relative me-4">
      <textarea rows="1" class="form-control raduis-20" ref="myInput" :value="messages" @change="updateMsg" @click="getCursorIndex" @keydown="handleKeyDown" style="width:230px;height:36px;resize:none;padding-right:37px;"></textarea>
      <button type="button" class="position-absolute end-0 emoji d-flex align-items-center btn me-5 p-0" @click="emojiToggle" style="top:50%;transform:translateY(-50%);">
        <img src='@/assets/images/chatroom/表情符號.svg' class="d-inline-block" alt='表情符號'>
      </button>
    </div>

    <button type="button" class="btn p-0" @click="sendMsg">
      <img src='@/assets/images/chatroom/訊息送出.svg' alt='訊息送出'>
    </button>
  </footer>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {

  data () {
    return {
    }
  },

  computed: {
    ...mapState('footerPanel', ['messages'])
  },

  methods: {
    ...mapActions('emoji', ['emojiToggle']),
    ...mapMutations('emoji', ['EMOJI_HIDE']),
    ...mapMutations('footerPanel', ['UPDATE_MESSAGES', 'UPDATE_CURSOR_INDEX', 'GET_INPUT_EL']),

    updateMsg (e) {
      this.UPDATE_MESSAGES(e.target.value)
    },
    getCursorIndex () {
      const cursorIndex = this.$refs.myInput.selectionStart
      this.UPDATE_CURSOR_INDEX(cursorIndex)
    },
    // 捕捉用戶使用 左、右方向鍵改變的光標位置
    handleKeyDown (e) {
      if (e.keyCode === 37 || e.keyCode === 39) {
        // 在左右鍵切換光標後才取得光標位置, 所以加個setTimeout
        setTimeout(() => {
          this.getCursorIndex()
        })
      }
    },
    sendMsg () {
      this.EMOJI_HIDE()
    }
  },

  mounted () {
    this.GET_INPUT_EL(this.$refs.myInput)

    // ? 行動版用戶改變光標位置 (待測試)
    this.$refs.myInput.addEventListener('selectionchange', this.getCursorIndex)
  },
  beforeUnmount () {
    // ? 行動版用戶改變光標位置 (待測試)
    this.$refs.myInput.removeEventListener('selectionchange', this.getCursorIndex)
  }

}
</script>

<style lang='scss' scope></style>
