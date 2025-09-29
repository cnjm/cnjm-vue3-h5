<script setup lang="ts">
  import { useRoute } from "vue-router";
  import TabBar from "./tabBar/index.vue";
  const uRoute = useRoute();
  const includes = ["DemoListHooksPage"];

  const defaultTransitionName = "fade";
</script>

<template>
  <RouterView>
    <template #default="{ Component, route }">
      <!-- 没有填写则使用默认的transitionName -->
      <transition :name="route.meta.transitionName || defaultTransitionName" mode="out-in" appear>
        <keep-alive :include="includes">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </template>
  </RouterView>
  <TabBar v-if="uRoute.meta.showTabbar" />
</template>

<style scoped></style>
