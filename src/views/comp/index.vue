<script setup lang="ts">
  console.log("组件");
</script>

<template>
  <div class="min-h-screen bg-[#f9f9f9]">
    <van-cell-group inset title="反馈组件">
      <van-cell title="Message" is-link to="message" />
      <van-cell title="Toast" is-link to="toast" />
    </van-cell-group>
  </div>
</template>

<style scoped></style>
