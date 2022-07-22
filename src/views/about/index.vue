<script setup lang="ts" meta="123">
  import SvgIcon from "/@/components/icon/index";
  import { useUserStore } from "/@/store/modules/user";

  const userStore = useUserStore();
  const { pkg, lastBuildTime } = __APP_INFO__;
  const { dependencies, devDependencies } = pkg;
  const infos = { dependencies, devDependencies };

  function handleLogout() {
    userStore.confirmLogout();
  }
</script>

<template>
  <div class="w-routine m-auto pt-50px pr-25px pl-25px">
    <div class="mb-lg flex justify-between">
      <span class="text-tiny text-secondary">最后构建：{{ lastBuildTime }}</span>
      <SvgIcon name="logout" @click="handleLogout" :size="48" />
    </div>
    <!-- dependencies -->
    <div class="mb-xl" v-for="(item, name) in infos" :key="name">
      <div class="text-primary text-lg">{{ name }}:</div>
      <div class="flex justify-between" v-for="(value, key) in item" :key="key">
        <div class="text-base text-dark-800">{{ key }}</div>
        <div class="text-dark-50">
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  a {
    font-size: 10px;
  }
</style>
