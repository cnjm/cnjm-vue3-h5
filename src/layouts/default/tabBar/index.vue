<script setup lang="ts">
  // import { ref } from "vue";
  import { usePageStore } from "/@/store/modules/page";
  const pageStore = usePageStore();
  const tabbar = pageStore.tabbar;
  console.log("pageStore", pageStore.tabbar);
</script>

<template>
  <div>
    <div v-for="item in tabbar" :key="item.path">
      <div w:bg="[#b2a8bb]" w:text="[20px] [#fff]">{{ item.title }}</div>
    </div>
  </div>
</template>

<style scoped></style>
