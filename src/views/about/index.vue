<script setup lang="ts">
  import SvgIcon from "/@/components/icon/index";
  import { useUserStore } from "/@/store/modules/user";

  const userStore = useUserStore();
  const { pkg, lastBuildTime } = __APP_INFO__;
  const { dependencies, devDependencies } = pkg;
  const infos = { dependencies, devDependencies };
  console.log(pkg, lastBuildTime);

  function handleLogout() {
    userStore.confirmLogout();
  }
</script>

<template>
  <div class="w-routine m-auto pt-lg">
    <div class="mb-lg flex justify-between">
      <span class="text-tiny text-secondary">最后构建：{{ lastBuildTime }}</span>
      <SvgIcon name="logout" @click="handleLogout" :size="48" />
    </div>
    <!-- dependencies -->
    <div class="mb-xl border-green-500" v-for="(item, name) in infos" :key="name">
      <div class="text-primary text-lg">{{ name }}:</div>
      <div class="flex justify-between" v-for="(value, key) in item" :key="key">
        <div class="text-base text-gray-500">{{ key }}</div>
        <div>
          <van-tag>{{ value }}</van-tag>
        </div>
      </div>
    </div>
    <!-- devDependencies -->
    <!-- <div class="mb-lg">
      <div>devDependencies:</div>
      <van-row justify="space-between" v-for="(value, key) in pkg.devDependencies" :key="key">
        <van-col span="18">{{ key }} </van-col>
        <van-col span="6"
          ><van-tag>{{ value }}</van-tag>
        </van-col>
      </van-row>
    </div> -->
  </div>
</template>

<style lang="less" scoped></style>
