<script setup lang="ts">
  import { LocationQueryValue } from "vue-router";
  import { useUserStore } from "/@/store/modules/user";
  const userStore = useUserStore();

  const route = useRoute();

  async function handleLogin() {
    try {
      await userStore.login(
        {
          password: "123456",
          account: "admin",
        },
        {
          redirect: route?.query?.redirect as LocationQueryValue,
          // mode: 'none', //不要默认的错误提示
        },
      );
    } catch (error) {
      alert(error);
    }
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
