<script setup lang="ts" name="layoutsError">
  import { onMounted, onBeforeUnmount, ref } from "vue";
  import { useRouter } from "vue-router";
  const router = useRouter();

  const countDown = ref(5);
  let timer: NodeJS.Timeout | null = null;

  onMounted(() => {
    timer = setInterval(() => {
      countDown.value--;
      if (countDown.value <= 0) {
        clearInterval(Number(timer));
        router.back();
      }
    }, 1000);
  });
  onBeforeUnmount(() => {
    if (timer) {
      clearInterval(Number(timer));
    }
  });
</script>

<template>
  <RouterView />
  <div class="text-center text-dark-400 text-[28px]">
    {{ countDown }}秒后返回<span class="text-blue-600" @click="router.back()">上一页</span>
  </div>
</template>

<style scoped></style>
