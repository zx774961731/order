<template>
  <n-layout has-sider wh-full>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      :native-scrollbar="false"
      :collapsed="appStore.collapsed"
    >
      <SideBar />
    </n-layout-sider>
    <article flex-1 flex-col overflow-y-scroll>
      <!-- <header bg-white px-15 border-b bc-eee flex items-center :style="`height: ${header.height}px`">
        <AppHeader />
      </header> -->
      <section v-if="tags.visible" border-b bc-eee>
        <AppTags :style="{ height: `${tags.height}px` }" />
      </section>
      <section flex-1>
        <AppMain />
      </section>
    </article>
  </n-layout>
</template>

<script setup>
import SideBar from './components/sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import AppTags from './components/tags/index.vue'
import { useAppStore } from '@/store'
import { header, tags } from '~/settings'

const appStore = useAppStore()
</script>
