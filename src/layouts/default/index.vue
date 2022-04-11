<script setup lang="ts" name="layoutsEntrance">
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
</template>

<style scoped></style>
