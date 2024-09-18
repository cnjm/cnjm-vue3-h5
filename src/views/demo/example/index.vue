<script setup lang="ts">
  import { ref, shallowRef } from "vue";
  import lifeTab from "./component/lifeTab.vue";
  import proxyTab from "./component/proxyTab.vue";
  import commTab from "./component/commTab.vue";

  defineOptions({
    name: "DemoExamplePage",
    inheritAttrs: false,
    meta: { title: "vue3使用示例" },
  });
  const tabList = shallowRef([
    {
      component: proxyTab,
      title: "响应式",
    },
    {
      component: lifeTab,
      title: "生命周期",
    },
    {
      component: commTab,
      title: "组件通信",
    },
  ]);

  const active = ref(0);
</script>

<template>
  <div>
    <van-tabs v-model:active="active">
      <van-tab v-for="item in tabList" :title="item.title" :key="item.title">
        <component :is="item.component" class="text-dark-400 p-[24px]" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="less"></style>
