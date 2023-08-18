<script setup lang="ts">
  import { loadList } from "/@/api/example/hooks";

  defineOptions({ name: "DemoListHooksPaget", inheritAttrs: false, meta: { title: "listHooks" } });
  console.log(loadList);
</script>

<template>
  <div>123</div>
</template>

<style scoped lang="less">
  .eg {
    line-height: 80px;
    background: rgb(53, 71, 49);
    color: #ffffff;
    font-size: 32px;
    padding: 0 8px;
    margin-bottom: 50px;
  }
</style>
