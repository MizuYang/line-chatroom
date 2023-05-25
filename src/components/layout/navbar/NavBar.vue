<template>
  <nav class="position-fixed top-0 z110 w-100 text-center"
       style="background-color:#53ACFF;min-height:96px;">
      <button type="button" class="btn btn-dark px-3 py-2" @click="CHANGE_MODE">
        目前是{{ isPhone?'手機版':'電腦版' }}
      </button>
  </nav>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {

  data () {
    return {
    }
  },

  computed: {
    ...mapState(['isPhone'])
  },

  methods: {
    ...mapMutations(['CHANGE_MODE'])
  },

  mounted () {
  }

}
</script>

<style lang='scss' scope></style>
