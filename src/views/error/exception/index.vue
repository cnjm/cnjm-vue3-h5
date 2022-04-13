<script setup lang="ts">
  const { pkg, lastBuildTime } = __APP_INFO__;
  console.log(pkg, lastBuildTime);
</script>

<template>
  <div class="box">页面出错啦</div>
  <van-button type="primary">主要按钮</van-button>
</template>

<style scoped>
  .box {
    width: 700px;
  }
</style>
