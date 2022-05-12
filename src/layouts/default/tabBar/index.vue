<script setup lang="ts">
  import { ref } from "vue";

  const active = ref(0);
</script>

<template>
  <van-tabbar v-model="active">
    <van-tabbar-item to="/home" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item to="/about" icon="search">关于</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
