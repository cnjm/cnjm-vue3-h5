<script setup lang="ts">
  import { comList } from "./constant/config";
</script>

<template>
  <div class="min-h-screen bg-[#fafafa]">
    <VanCellGroup inset :title="item.title" v-for="(item, index) in comList" :key="index">
      <VanCell v-for="page in item.children" :key="page.path" :title="page.title" is-link :to="page.path" />
    </VanCellGroup>
  </div>
</template>

<style scoped></style>
