<template>
  <div class="position-fixed-center z100 border border-2 border-dark bg-light overflow-scroll" style="width:300px;max-height:500px;">

    <header class="position-sticky top-0 start-0 z100 d-flex align-items-center justify-content-center w-100 border-bottom border-1 border-dark py-2" style="background-color:rgb(83, 172, 255);">
      {{ messages.insertUser }}
      <button type="button" class="position-absolute end-0 btn btn-danger text-12 rounded-pill me-5 p-1 px-3" @click="MODAL_HIDE">X</button>
    </header>

    <main class="position-relative pt-8 p-10" style="word-wrap:break-word;">
      <pre style="white-space:pre-wrap;word-wrap:break-word;">{{ messages.textContent }}</pre>
    </main>
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
    ...mapState('allContentModal', ['messages'])
  },

  methods: {
    ...mapMutations('allContentModal', ['MODAL_HIDE'])
  },

  mounted () {
  }

}
</script>

<style lang='scss' scope></style>
