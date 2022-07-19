<script setup lang="ts">
  console.log("首页");
  const a = "666";
  function getData(e: Event) {
    console.log("hh", a, e);
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
