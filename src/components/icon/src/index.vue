<script setup lang="ts">
  import type { CSSProperties } from "vue";
  import { computed, toRefs } from "vue";
  import { px2vw } from "/@/utils/internal/transform";

  const props = defineProps({
    prefix: {
      type: String,
      default: "icon",
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 24,
    },
    color: {
      type: String,
      default: "#333",
    },
  });
  const { color } = toRefs(props);

  const symbolId = computed(() => `#${props.prefix}-${props.name}`);
  // const getStyle = computed((): String => {
  //   const { size } = props;
  //   const s = `${size}`;
  //   const w = `w-[${s.replace("px", "")}px]`;
  //   const h = `h-[${s.replace("px", "")}px]`;
  //   return `${w} ${h}`;
  // });
  // px2vw
  const getStyle = computed((): CSSProperties => {
    const { size } = props;
    const vw = px2vw(size);
    return {
      width: vw,
      height: vw,
    };
  });
</script>

<template>
  <!-- :class="`svg-icon ${getStyle}`" -->
  <svg aria-hidden="true" :style="getStyle">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<style lang="less" scoped>
  .svg-icon {
    display: inline-block;
    overflow: hidden;
    fill: currentColor;
    vertical-align: middle;
  }
</style>
