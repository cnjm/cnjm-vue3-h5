<script setup lang="ts">
  import { useUserStore } from "/@/store/modules/user";

  const userStore = useUserStore();

  async function handleLogout() {
    await userStore.logout(true);
  }
</script>

<template>
  <div>
    <van-config-provider
      ><div class="w-xs">关于</div>
      <van-button type="primary" @click="handleLogout">登出</van-button>
    </van-config-provider>
  </div>
</template>

<style scoped>
  :root {
    --van-button-primary-background-color: red;
  }
</style>
