<script setup lang="ts">
  defineOptions({ inheritAttrs: false, name: "Custom", title: "用户", meta: { a: 11 } });
</script>

<template>
  <div>
    <div v-auth="['s_admin', 'test']">权限</div>
    <div v-auth="['custom']">custom权限</div>
  </div>
</template>

<style scoped lang="less"></style>
