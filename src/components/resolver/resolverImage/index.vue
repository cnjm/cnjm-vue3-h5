<script setup lang="ts"></script>

<template>
  <van-image v-bind="$attrs">
    <template v-for="(_value, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </van-image>
</template>

<style scoped lang="less"></style>
