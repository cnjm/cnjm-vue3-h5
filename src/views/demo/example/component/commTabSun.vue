<script setup lang="ts">
  const value = defineModel({ type: String });
  const value1 = defineModel("value1", { type: String, default: "默认值" });
</script>

<template>
  <div>
    <van-field v-model="value" label="defineModel宏" placeholder="请输入" />
    <van-field v-model="value1" label="使用多个" placeholder="请输入" />
  </div>
</template>
