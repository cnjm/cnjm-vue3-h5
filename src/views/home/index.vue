<script setup lang="ts">
  import { setPageTitle } from "/@/hooks/web/usePageTitle";

  const a = "666";
  // const pageTitle = useTitle();
  // pageTitle.value = "新的";
  function getData(e: Event) {
    console.log("hh", a, e);
    setPageTitle("新的");
  }
</script>

<template>
  <div>
    <div v-debounce="{ fun: getData, event: 'click' }">1231</div>
    <!-- <div v-auth="['s_admin', 'test']">权限</div> -->
    <div class="box">143123</div>
    <div>hhh</div>
  </div>
</template>

<style scoped></style>
