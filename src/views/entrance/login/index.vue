<script setup lang="ts">
  import { useUserStore } from "/@/store/modules/user";

  const userStore = useUserStore();

  async function handleLogin() {
    await userStore.login({
      //请求login接口
      password: "123456",
      account: "admin",
      // mode: 'none', //不要默认的错误提示
    });
  }
</script>

<template>
  <van-button type="primary" @click="handleLogin">登录</van-button>
</template>

<style scoped>
  .w100 {
    width: 100%;
  }
</style>
