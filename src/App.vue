<script setup lang="ts">
  import { usePageTitle } from "/@/hooks/web/usePageTitle";
  import { usePageStore } from "/@/store/modules/page";
  const pageStore = usePageStore();
  const { pageTheme } = storeToRefs(pageStore);
  usePageTitle();
  const themeVars = {
    // tab的底部横线颜色
    tabsBottomBarColor: "rgb(33, 166, 117)",
    rateIconFullColor: "#07c160",
    sliderBarHeight: "4px",
    sliderButtonWidth: "20px",
    sliderButtonHeight: "20px",
    sliderActiveBackgroundColor: "#07c160",
    // toastBackground: "rgba(0, 0, 0,0.7)",
    // buttonPrimaryBorderColor: "#07c160",
    // buttonPrimaryBackgroundColor: "#07c160",
  };
</script>

<template>
  <van-config-provider :theme-vars="themeVars" :theme="pageTheme"><RouterView /></van-config-provider>
</template>

<style lang="less">
  :root {
    --van-button-primary-background-color: red;
  }
</style>
