<template>
  <AppPage :show-footer="true" bg-cover :style="{ backgroundImage: `url(${bgImg})` }">
    <div
      style="transform: translateY(25px)"
      class="m-auto p-15 f-c-c min-w-345 max-w-700 rounded-10 card-shadow bg-white bg-opacity-60"
    >
      <div w-380 hidden md:block px-20 py-35>
        <img src="@/assets/images/login_banner.webp" w-full alt="login_banner" />
      </div>

      <div w-320 flex-col px-20 py-35>
        <h5 f-c-c text-24 font-normal color="#6a6a6a"><icon-custom-logo mr-10 text-50 color-primary /> {{ title }}</h5>
        <div mt-30>
          <n-input
            v-model:value="loginInfo.userId"
            autofocus
            class="text-16 items-center h-50 pl-10"
            placeholder="请输入账号"
            :maxlength="20"
          />
        </div>
        <div mt-30>
          <n-input
            v-model:value="loginInfo.password"
            class="text-16 items-center h-50 pl-10"
            type="password"
            show-password-on="mousedown"
            placeholder="请输入密码"
            :maxlength="20"
            @keydown.enter="handleLogin"
          />
        </div>

        <div mt-20>
          <n-checkbox :checked="isRemember" label="记住我" :on-update:checked="(val) => (isRemember = val)" />
        </div>

        <div mt-20>
          <n-button w-full h-50 rounded-5 text-16 type="primary" :loading="loading" @click="handleLogin">
            登录
          </n-button>
        </div>
      </div>
    </div>
  </AppPage>
</template>

<script setup>
import { lStorage } from '@/utils'
import { useStorage } from '@vueuse/core'
import bgImg from '@/assets/images/login_bg.webp'
import { useUserStore } from '@/store'
import { setToken } from '@/utils'

import { login } from '@/api/zx'
const userStore = useUserStore()
const title = import.meta.env.VITE_TITLE

const router = useRouter()

const loginInfo = ref({
  userId: '',
  password: '',
})

initLoginInfo()

function initLoginInfo() {
  const localLoginInfo = lStorage.get('loginInfo')
  if (localLoginInfo) {
    loginInfo.value.userId = localLoginInfo.userId || ''
    loginInfo.value.password = localLoginInfo.password || ''
  }
}

const isRemember = useStorage('isRemember', false)
const loading = ref(false)
async function handleLogin() {
  const { userId, password } = loginInfo.value
  if (!userId || !password) {
    $message.warning('请输入用户名和密码')
    return
  }
  loading.value = true
  $message.loading('正在验证...')
  const res = await login({ userId, password })
  userStore.getInfo(res)

  if (res !== -1) {
    setToken(res.token)
    $message.success('登录成功')
    if (isRemember.value) {
      lStorage.set('loginInfo', { userId, password, userName: res.userName })
    } else {
      lStorage.remove('loginInfo')
    }
    router.push('/')
  }

  loading.value = false
}
</script>
