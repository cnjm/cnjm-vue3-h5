<script setup lang="ts">
  import { useRoute } from "vue-router";
  import TabBar from "./tabBar/index.vue";
  const uRoute = useRoute();
  const includes = ["CompPage"];

  const defaultTransitionName = "fade";
</script>

<template>
  <RouterView>
    <template #default="{ Component, route }">
      <!-- 没有填写则使用默认的transitionName -->
      <transition :name="route.meta.transitionName || defaultTransitionName" mode="out-in" appear>
        <keep-alive v-if="route.meta.keepAlive" :include="includes">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
  <TabBar v-if="uRoute.meta.showTabbar" />
</template>

<style scoped></style>
