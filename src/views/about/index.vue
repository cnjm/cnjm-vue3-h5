<script setup lang="ts">
  import SvgIcon from "/@/components/icon/index";
  import { useUserStore } from "/@/store/modules/user";

  const userStore = useUserStore();

  async function handleLogout() {
    await userStore.confirmLogout();
  }
</script>

<template>
  <div class="w-routine">
    <SvgIcon name="logout" @click="handleLogout" />
  </div>
</template>

<style scoped>
  :root {
    --van-button-primary-background-color: red;
  }
</style>
