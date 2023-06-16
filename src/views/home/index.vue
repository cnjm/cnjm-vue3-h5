<script setup lang="ts">
  import { setPageTitle } from "/@/hooks/web/usePageTitle";
  import { usePageStore } from "/@/store/modules/page";
  const pageStore = usePageStore();
  const a = "666";
  // const pageTitle = useTitle();
  // pageTitle.value = "新的";
  function getData(e: Event) {
    pageStore.updatePageTitle("hhh");
    console.log("hh", a, e, pageStore);

    setPageTitle("新的");
  }
</script>

<template>
  <div>
    <div v-debounce="getData">1231</div>

    <div class="box">5555</div>
    <div>hhh</div>
  </div>
</template>

<style scoped></style>
