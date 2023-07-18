<script setup lang="ts">
  defineOptions({ name: "DemoSvgIconsPage", inheritAttrs: false, meta: { title: "svgIcons" } });
</script>

<template>
  <div>
    <div class="eg">
      以引入iconify 字图标集：svg-spinners 为示例
      <icon-spinners-blocks-shuffle-2 color="#21a675" class="w-2em h-2em v-mid" />
    </div>
    <div class="eg">
      以自定义svg图标 为示例
      <icon-about-logout class="v-end" />
      <icon-about-car color="red" />
      <icon-about-box style="font-size: 2em" />
    </div>
    <div class="eg">
      vant icon组件使用
      <van-icon class="v-top" name="chat-o" size="1em" />
    </div>
  </div>
</template>

<style scoped lang="less">
  .eg {
    line-height: 80px;
    background: rgb(53, 71, 49);
    color: #ffffff;
    font-size: 32px;
    padding: 0 8px;
    margin-bottom: 50px;
  }
</style>
