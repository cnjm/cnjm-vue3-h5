<script setup lang="ts" meta="123">
  import { ref } from "vue";
  import SvgIcon from "/@/components/icon/index";
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
    <div class="mb-lg flex justify-end pt-50px pr-25px pl-25px">
      <SvgIcon name="logout" @click="handleLogout" :size="36" />
    </div>
    <van-tabs v-model:active="active">
      <van-tab :title="name" v-for="(item, name) in infos" :key="name">
        <van-cell :title="key" :value="value" v-for="(value, key) in item" :key="key" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="less" scoped></style>
