<script setup lang="ts">
  import axios from "axios";
  import { useUserStore } from "/@/store/modules/user";

  const userStore = useUserStore();

  async function handleLogin() {
    const message = await axios.get("/base/mock/test");
    console.log(message);
    await userStore.login({
      //请求login接口
      password: "123456",
      account: "admin",
      // mode: 'none', //不要默认的错误提示
    });
  }
</script>

<template>
  <div class="w-xs" w:bg="grey" w:text="base" w:animate="spin">test</div>
  <van-button type="primary" @click="handleLogin">登录</van-button>
</template>

<style scoped>
  .w100 {
    width: 750px;
  }
</style>
