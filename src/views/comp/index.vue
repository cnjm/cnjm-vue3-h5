<script setup lang="ts">
  import { comList } from "./constant/config";
</script>

<template>
  <div class="min-h-screen bg-[#fafafa]">
    <van-cell-group inset :title="item.title" v-for="(item, index) in comList" :key="index">
      <van-cell v-for="page in item.children" :key="page.path" :title="page.title" is-link :to="page.path" />
    </van-cell-group>
  </div>
</template>

<style scoped></style>
