<script setup lang="ts">
  import { usePageStore } from "/@/store/modules/page";
  import { useRoute, useRouter } from "vue-router";

  defineOptions({ name: "DemoDeepRouterPage", inheritAttrs: false, meta: { title: "deepRouter" } });

  const route = useRoute();
  const router = useRouter();

  // for (const key in route) {
  //   console.log(key, ":", route[key]);
  // }

  const pageStore = usePageStore();
  console.log(pageStore.routerParams);
  console.log(router);
</script>

<template>
  <div>
    <div>query:{{ route.query }}</div>
    <div>params:{{ route.params }}</div>
  </div>
</template>

<style scoped lang="less"></style>
