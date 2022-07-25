<script lang="ts">
  export default { name: "DemoCustomPage", meta: { title: "自定义指令", roles: [] } };
</script>

<script setup lang="ts"></script>

<template>
  <div>
    <div v-auth="['s_admin', 'test']">权限</div>
    <div v-auth="['custom']">custom权限</div>
  </div>
</template>

<style scoped lang="less"></style>
