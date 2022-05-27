<script setup lang="ts">
  import { useUserStore } from "/@/store/modules/user";

  const userStore = useUserStore();

  async function handleLogout() {
    await userStore.logout(true);
  }
</script>

<template>
  <div>
    <div>关于</div>
    <van-button type="primary" @click="handleLogout">登出</van-button>
  </div>
</template>

<style scoped></style>
