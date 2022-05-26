<script setup lang="ts">
  import { ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { Tabbar, usePageStore } from "/@/store/modules/page";
  const pageStore = usePageStore();
  const tabbar = pageStore.tabbar;
  const route = useRoute();
  const router = useRouter();
  const active = ref("home");
  const onClick = (tab: Tabbar) => {
    router.replace({ path: tab.path });
  };

  console.log(route.path);
  console.log("pageStore", import.meta.globEager("/src/assets/tabbar/*.png"));
</script>

<template>
  <van-tabbar v-model="active" active-color="#21a675" inactive-color="#a2e2c6">
    <van-tabbar-item v-for="item in tabbar" :key="item.name" :name="item.name" @click="onClick(item)">
      <span>{{ item.title }}</span>
      <template #icon="props"> <img :src="props.active ? item.activeImg : item.normalImg" /> </template
    ></van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
  .w100 {
    width: 750px;
  }
</style>
