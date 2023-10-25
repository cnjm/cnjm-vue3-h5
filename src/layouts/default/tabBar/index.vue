<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { Tabbar, usePageStore } from "/@/store/modules/page";
  const pageStore = usePageStore();
  const tabbar = pageStore.tabbar;
  const router = useRouter();
  let activeValue = "home";

  const active = ref(activeValue);
  const onClick = (tab: Tabbar) => {
    router.replace({ path: tab.path });
  };

  watch(
    () => router.currentRoute.value.path,
    (newValue: any) => {
      tabbar.forEach((item) => {
        if (item.path === newValue) {
          active.value = item.name;
        }
      });
    },
    { immediate: true },
  );
</script>

<template>
  <van-tabbar v-model="active" active-color="#21a675" inactive-color="#a2e2c6" placeholder>
    <van-tabbar-item v-for="item in tabbar" :key="item.name" :name="item.name" @click="onClick(item)">
      <span>{{ item.title }}</span>
      <template #icon="props">
        <img :src="getAssetsImageUrl(props.active ? item.activeImg : item.normalImg)" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
  .w100 {
    width: 750px;
  }
</style>
