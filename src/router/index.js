import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { // 首頁
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  { // 討論區列表
    path: '/chatroomList',
    name: 'chatroomList',
    component: () => import('@/views/ChatRoomList.vue')
  },
  { // 討論區裡面
    path: '/chatroom',
    name: 'chatroom',
    component: () => import('@/views/ChatRoom.vue')
  }
  // { //* 代表所有主頁面下的頁面，路由錯誤都會被導向
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/'
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.fullPath.match('/')) {
      return {
        top: 0 //* 切換頁面時會切換到最上面的位置
      }
    }
    return {}
  }
})

export default router
