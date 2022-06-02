<script setup lang="ts" name="layoutsEntrance">
  // import { useRoute } from "vue-router";
  import TabBar from "./tabBar/index.vue";
  const includes = ["CompPage"];
</script>

<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition mode="out-in" appear>
        <keep-alive v-if="route.meta.keepAlive" :include="includes">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
  <TabBar />
</template>

<style scoped></style>
