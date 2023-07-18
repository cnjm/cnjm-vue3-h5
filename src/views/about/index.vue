<script setup lang="ts" meta="123">
  import { ref } from "vue";
  import { useUserStore } from "/@/store/modules/user";

  const userStore = useUserStore();

  const { pkg, lastBuildTime } = __APP_INFO__;
  const { dependencies, devDependencies } = pkg;
  const infos = { dependencies, devDependencies };
  const active = ref(0);

  function handleLogout() {
    userStore.confirmLogout();
  }
</script>

<template>
  <div class="w-routine m-auto">
    <van-notice-bar mode="closeable">最后构建：{{ lastBuildTime }}</van-notice-bar>
    <div class="mb-lg flex justify-end pt-50px pr-25px pl-25px text-36px">
      <icon-about-logout @click="handleLogout" width="1em" height="1em" />
    </div>
    <van-tabs v-model:active="active">
      <van-tab :title="name" v-for="(item, name) in infos" :key="name">
        <van-cell :title="key" :value="value" v-for="(value, key) in item" :key="key" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="less" scoped></style>
