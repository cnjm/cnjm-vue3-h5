<script setup lang="ts">
  import type { CSSProperties } from "vue";
  import { computed, toRefs } from "vue";

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
  console.log(props);
  const symbolId = computed(() => `#${props.prefix}-${props.name}`);
  const getStyle = computed((): CSSProperties => {
    const { size } = props;
    let s = `${size}`;
    s = `${s.replace("px", "")}px`;
    return {
      width: s,
      height: s,
    };
  });
</script>

<template>
  <svg aria-hidden="true" class="svg-icon" :style="getStyle">
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
