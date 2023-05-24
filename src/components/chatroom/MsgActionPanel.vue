<template>
  <ul class="d-flex">
    <li class="flex-shrink-0">
      <button type="button" class="btn bg-dimgray text-light px-7 py-5"
              @click="copyText"
              style="border-radius:8px 0 0 8px;">複製</button>
    </li>
    <li class="flex-shrink-0 triangle-bottom">
      <button type="button" class="btn bg-dimgray text-light px-7 py-5"
              style="border-left:1px solid #808080;border-right:1px solid #808080;">收回</button>
    </li>
    <li class="flex-shrink-0">
      <button type="button" class="btn bg-dimgray text-light px-7 py-5"
              @click="reply"
              style="border-radius:0 8px 8px 0;">回覆</button>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {

  props: ['msg'],

  data () {
    return {
    }
  },

  methods: {
    ...mapActions('chatBubble', ['panelHide']),
    ...mapMutations('msgActionPanel', ['GET_REPLY_OBJECT']),

    copyText () {
      const el = document.createElement('input')

      document.body.appendChild(el)
      el.value = this.msg.textContent
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)

      this.panelHide()
    },
    reply () {
      this.GET_REPLY_OBJECT(this.msg)
      this.panelHide()
    }
  },

  mounted () {
  }

}
</script>

<style lang='scss' scope>
.triangle-bottom::before {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 0 10px;
  border-color: dimgray transparent transparent transparent;
}
</style>
