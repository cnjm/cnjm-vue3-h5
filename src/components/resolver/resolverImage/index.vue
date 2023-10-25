<script setup lang="ts">
  // 全局的图片组件，可以基于van-image针对自身项目对图片做处理
  const props = defineProps({
    src: {
      type: String,
      default: "",
    },
  });
  const imageUrl = getAssetsImageUrl(props.src);
</script>

<template>
  <van-image v-bind="$attrs" :src="imageUrl">
    <template v-for="(_value, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </van-image>
</template>

<style scoped lang="less"></style>
