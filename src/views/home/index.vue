<script setup lang="ts">
  console.log("首页");
  function getData() {
    console.log("hh");
  }
</script>

<template>
  <div>
    <div v-debounce="{ fun: getData, event: 'click' }">1231</div>
  </div>
</template>

<style scoped></style>
