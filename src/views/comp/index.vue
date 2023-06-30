<script setup lang="ts">
  import { comList } from "./constant/config";
  const router = useRouter();

  function test() {
    console.log(router);
    console.log(router.push({ path: "/demo/custom" }));
  }
  function test1() {
    console.log(router);
    console.log(router.push({ name: "DemoCustomPage", query: { plan: "private" } }));
  }
</script>

<template>
  <div class="min-h-screen bg-[#fafafa]">
    <div @click="test">test</div>
    <div @click="test1">test1</div>
    <VanCellGroup inset :title="item.title" v-for="(item, index) in comList" :key="index">
      <VanCell v-for="page in item.children" :key="page.path" :title="page.title" is-link :to="page.path" />
    </VanCellGroup>
  </div>
</template>

<style scoped></style>
