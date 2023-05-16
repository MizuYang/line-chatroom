<template>
  <footer class="position-fixed bottom-0 z100 w-100 d-flex align-items-center px-8" style="height:66px;background-color:#CBE6FF;">
    <button type="button" class="btn me-6 p-0">
      <img src='@/assets/images/chatroom/檔案上傳.svg' alt='檔案上傳'>
    </button>
    <button type="button" class="btn me-6 p-0">
      <img src='@/assets/images/chatroom/圖片上傳.svg' alt='圖片上傳'>
    </button>

    <div class="position-relative me-4">
      <textarea rows="1" class="form-control raduis-20" v-model="message" style="width:230px;height:36px;resize:none;"></textarea>
      <button type="button" class="position-absolute end-0 d-flex align-items-center btn me-5 p-0" style="top:50%;transform:translateY(-50%);">
        <img src='@/assets/images/chatroom/表情符號.svg' class="d-inline-block" alt='表情符號'>
      </button>
    </div>

    <button type="button" class="btn p-0">
      <img src='@/assets/images/chatroom/訊息送出.svg' alt='訊息送出'>
    </button>
  </footer>
</template>

<script>

export default {

  data () {
    return {
      message: '豬到了'
    }
  },

  watch: {
  },

  methods: {
  },

  mounted () {
  }

}
</script>

<style lang='scss' scope></style>
