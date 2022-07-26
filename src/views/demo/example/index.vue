<script lang="ts">
  export default { name: "DemoExamplePage", meta: { title: "vue3使用示例" } };
</script>

<script setup lang="ts">
  import { ref, shallowRef } from "vue";
  import { tabList } from "./constant/tabConfig";
  import lifeTab from "./component/lifeTab.vue";
  import proxyTab from "./component/proxyTab.vue";

  const comDom = shallowRef({
    lifeTab: lifeTab,
    proxyTab: proxyTab,
  });

  const active = ref(0);
</script>

<template>
  <div>
    <van-tabs v-model:active="active">
      <van-tab v-for="item in tabList" :title="item.title" :key="item.id">
        <component :is="comDom[item.id]" class="text-dark-400 p-[24px]" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="less"></style>
