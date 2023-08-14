<script setup lang="ts">
  import { usePageStore } from "/@/store/modules/page";
  import { useRoute, useRouter } from "vue-router";

  defineOptions({ name: "DemoDeepRouterPage", inheritAttrs: false, meta: { title: "deepRouter" } });

  const route = useRoute();
  const router = useRouter();

  // for (const key in route) {
  //   console.log(key, ":", route[key]);
  // }

  // route.params可以直接拿到带进来的数据、刷新页面也依然在

  const pageStore = usePageStore();
  console.log(pageStore.routerParams);
  console.log(router);

  function goBack() {}
</script>

<template>
  <div>
    <div>query:{{ route.query }}</div>
    <div>params:{{ route.params }}</div>
    <br />
    <br />
    <van-button @click="goBack">back</van-button>
  </div>
</template>

<style scoped lang="less"></style>
