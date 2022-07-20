<script setup lang="ts">
  import { usePageTitle } from "/@/hooks/web/usePageTitle";
  usePageTitle();
  const themeVars = {
    rateIconFullColor: "#07c160",
    sliderBarHeight: "4px",
    sliderButtonWidth: "20px",
    sliderButtonHeight: "20px",
    sliderActiveBackgroundColor: "#07c160",
    buttonPrimaryBorderColor: "#07c160",
    buttonPrimaryBackgroundColor: "#07c160",
  };
</script>

<template>
  <van-config-provider :theme-vars="themeVars"><RouterView /></van-config-provider>
</template>

<style lang="less">
  :root {
    --van-button-primary-background-color: red;
  }
</style>
