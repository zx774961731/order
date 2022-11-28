import { defineStore } from 'pinia'
import { resetRouter } from '@/router'
import { useTagsStore, usePermissionStore } from '@/store'
import { removeToken, toLogin } from '@/utils'
import api from '@/api'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {},
    }
  },
  getters: {
    userId() {
      return this.userInfo?.id
    },
    name() {
      return this.userInfo?.name
    },
    userName() {
      return this.userInfo?.userName || '未知用户'
    },
    avatar() {
      return this.userInfo?.avatar
    },
    role() {
      return this.userInfo?.role || []
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
      const { resetPermission } = usePermissionStore()
      removeToken()
      resetTags()
      resetPermission()
      resetRouter()
      this.$reset()
      toLogin()
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },

    getInfo(data) {
      console.log(data, 'data')
      this.userInfo.userName = data.userName
      this.userInfo.token = data.token
    },
  },
})
