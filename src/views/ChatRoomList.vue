<template>
  <header>
    <NavBar></NavBar>
  </header>

  <nav class="position-fixed top-0 z100 w-100" style="background-color:#CBE6FF;margin-top:96px;padding:8px 0;">
    <input type="search" class="form-control raduis-5 placeholder-ps30 mx-auto" v-model="searchTxt" @focus="isFocus=true" @blur="isFocus=false" style="width:350px;">

    <div class="position-absolute d-flex align-items-center" style="top:50%;left:32px;transform:translateY(-50%)" v-if="!isFocus&&!searchTxt">
      <img src='@/assets/images/chatroomList/搜尋.svg' alt='搜尋'>
      <span class="text-808080 fw-bold-5 ms-3">搜尋</span>
    </div>
  </nav>

  <ul class="ms-8" style="margin-top:170px;">
    <template v-if="data.length>0">
      <li class="mb-11" v-for="topic in data" :key="`chatroom-${topic.subjectId}`">
        <button type="button" class="w-100 btn p-0" @click="enterChatroom(topic)">
          <!-- 討論區話題元件 -->
          <TopicArea :topic="topic"></TopicArea>
        </button>
      </li>
    </template>
    <!-- 關鍵字搜尋不到相關討論區名稱 -->
    <template v-else>
      <p class="text-20 text-center">找不到符合您搜尋的討論區名稱</p>
    </template>
  </ul>

</template>

<script>
import NavBar from '@/components/layout/navbar/NavBar.vue'
import TopicArea from '@/components/chatroomList/TopicArea.vue'
export default {
  components: {
    NavBar,
    TopicArea
  },

  data () {
    return {
      cahtroomList: [],
      isFocus: false,
      searchTxt: ''
    }
  },

  computed: {
    data () {
      if (this.searchTxt) {
        return this.cahtroomList.filter(item => item.name.includes(this.searchTxt))
      } else {
        return this.cahtroomList
      }
    }
  },

  methods: {
    getChatroomList () {
      this.$http.get('api/chatroomList.json')
        .then(res => {
          console.log(res.data)
          this.cahtroomList = res.data
          //! 排序應該是  新 -> 舊
        })
        .catch(err => {
          console.log(err)
        })
    },
    enterChatroom (topic) {
      console.log('進入聊天室', topic)
    }
  },

  mounted () {
    this.getChatroomList()
  }

}
</script>

<style lang='scss' scope>
.placeholder-ps30::placeholder {
  padding-left: 30px;
}
</style>
