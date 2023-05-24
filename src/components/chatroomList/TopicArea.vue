<template>
  <div class="d-flex">
    <!-- 群組圖 -->
    <span class="fw-bold-7 rounded-pill my-auto me-5 px-6 py-7" style="background-color: #ffcd83">
      {{ topic.name.slice(0, 2) }}
    </span>
    <div style="max-width:230px;">
      <p class="d-flex">
        <!-- 群組名稱 -->
        <span class="text-cut fw-bold-7 mb-2 me-1">{{ topic.name }}</span>
        ({{ topic.memberCount }})
      </p>
      <!-- 最新一則訊息 -->
      <p class="text-13 text-808080 text-start text-cut-line2" style="max-height:40px;">
        {{ topic.latestDiscuess }}
      </p>
    </div>
    <div class="d-flex flex-column ms-auto me-7">
      <time class="text-13 text-gray mb-2">{{ getTime(topic.newestTime) }}</time>
      <!-- 未讀數量 -->
      <span class="badge rounded-pill bg-danger text-12 text-center fw-bold-5 mx-auto px-2"
            :style="`width:${topic.unreadCount>999?38:27}px;`" v-if="topic.unreadCount">
        {{ topic.unreadCount>999?'999+':topic.unreadCount }}
      </span>
    </div>
  </div>

</template>

<script>
export default {
  props: ['topic'],

  data () {
    return {}
  },

  methods: {
    getTime (time) {
      // 最新一筆訊息的時間不是今天: 顯示日期

      const today = new Date().toISOString().slice(0, 10) // 2023-05-16
      const yesterday = new Date(new Date().getTime() - 86400000).toISOString().slice(0, 10) // 2023-05-16
      const msgDate = time.slice(0, 10) // 2023-05-16
      const timeSlice = time.slice(11) // 08:32:00

      // 最新一筆訊息的時間是今天: 顯示時間
      if (today === msgDate) {
        return timeSlice.slice(0, 5) // 08:32
      } else if (yesterday === msgDate) {
        // 最新一筆訊息的時間是昨天: 顯示文字"昨天"
        return '昨天'
      } else {
        const date = msgDate.slice(5).split('-').join('/') // 05/03
        return date
      }
    }
  },

  mounted () {}
}
</script>

<style lang='scss' scope></style>
