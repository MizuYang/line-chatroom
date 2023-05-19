<template>
  <div class="row">
    <Picker :data="emojiIndex" set="google" @select="showEmoji" />
  </div>
</template>

<script>
import data from 'emoji-mart-vue-fast/data/all.json'
import 'emoji-mart-vue-fast/css/emoji-mart.css'

import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src'
import { mapState, mapMutations } from 'vuex'

const emojiIndex = new EmojiIndex(data)

export default {

  components: {
    Picker
  },

  data () {
    return {
      emojiIndex: emojiIndex
    }
  },

  computed: {
    ...mapState('footerPanel', ['messages', 'cursorIndex', 'msgInputEl'])
  },

  methods: {
    ...mapMutations('emoji', ['EMOJI_HIDE']),
    ...mapMutations('footerPanel', ['UPDATE_MESSAGES']),

    showEmoji (emoji) {
      let cIndex = this.cursorIndex
      if (cIndex === -1) cIndex = this.messages.length

      const msgSplit = this.messages.split('')
      msgSplit.splice(cIndex, 0, emoji.native)

      const msg = msgSplit.join('')
      this.UPDATE_MESSAGES(msg)

      this.$nextTick(() => {
        // 按表情之後 幫用戶focus input 並給予光標位置在表情後方, 方便用戶輸入
        this.msgInputEl.focus()
        this.msgInputEl.setSelectionRange(cIndex + 1, cIndex + 1)
      })
    },
    noClickEmojiPanelHide (e) {
      const path = e.composedPath()
      let isClickEmoji = false

      path.forEach(item => {
        if (!item || isClickEmoji) return

        if (item.tagName === 'svg' || item.tagName === 'path') return

        if (item?.className?.includes('emoji')) {
          isClickEmoji = true
        }
      })

      if (!isClickEmoji) {
        this.EMOJI_HIDE()
        document.removeEventListener('click', this.noClickEmojiPanelHide)
      }
    }
  },

  mounted () {
    document.addEventListener('click', this.noClickEmojiPanelHide)
  }
}
</script>

<style>
.row { display: flex; }
.row > * { margin: auto; }
</style>
