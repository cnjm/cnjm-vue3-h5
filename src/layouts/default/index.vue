<script setup lang="ts" name="layoutsEntrance">
  import TabBar from "./tabBar/index.vue";
  console.log("layoutsEntrance");
</script>

<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition mode="out-in" appear>
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </template>
  </RouterView>
  <TabBar />
</template>

<style scoped></style>
