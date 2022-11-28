import { defineStore } from 'pinia'
import { router } from '@/router'
import { useTagsStore } from '@/store'
import { removeToken } from '@/utils'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {},
    }
  },
  getters: {
    userName() {
      return this.userInfo?.userName || '未知用户'
    },
    token() {
      return this.userInfo?.token || 'zxcsdfsfsfbcbcbrgfdd'
    },
  },
  actions: {
    async logout() {
      const { resetTags } = useTagsStore()
      removeToken()
      resetTags()
      router.push('/login')
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },

    getInfo(data) {
      this.userInfo.userName = data.userName
      this.userInfo.token = data.token
    },
  },
})
