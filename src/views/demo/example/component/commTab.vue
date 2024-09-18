<script setup lang="ts">
  import CommTabSun from "./commTabSun.vue";
  const value = ref("");
  const value1 = ref("");
</script>

<template>
  <div>
    <CommTabSun v-model="value" v-model:value1="value1" />
  </div>
</template>
