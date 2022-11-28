import { defineStore } from 'pinia'
import { router } from '@/router'
import { useTagsStore } from '@/store'
import { removeToken } from '@/utils'
import api from '@/api'

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
    async getUserInfo() {
      try {
        const res = await api.getUser()
        const { id, name, avatar, role } = res.data
        this.userInfo = { ...this.userInfo, id, name, avatar, role }
        return Promise.resolve(res.data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
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
