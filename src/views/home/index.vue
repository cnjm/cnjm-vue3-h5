<script setup lang="ts">
  import { usePageStore } from "/@/store/modules/page";
  const pageStore = usePageStore();

  function onChange() {
    const theme = pageStore.pageTheme;
    pageStore.updateTheme(theme === "dark" ? "light" : "dark");
  }
</script>

<template>
  <div class="flex justify-center">
    <van-button @click="onChange">主题切换</van-button>
  </div>
</template>

<style scoped></style>
