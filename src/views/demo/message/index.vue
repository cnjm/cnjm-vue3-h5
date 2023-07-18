<script setup lang="ts">
  import { useMessage } from "/@/hooks/web/useMessage";

  defineOptions({ name: "DemoMessagePage", inheritAttrs: false, meta: { title: "信息反馈" } });

  const { createToast, createDialog } = useMessage();

  function openDialog() {
    createDialog({
      title: "温馨提示",
      message: "随便点个试试？",
      showCancelButton: true,
    })
      .then(() => {
        createToast("点击了确认");
      })
      .catch(() => {
        createToast("点击了取消");
      });
  }
</script>

<template>
  <div>
    <van-notice-bar mode="closeable">Vant Ui已有功能，可根据实际项目UI改造再统一导出</van-notice-bar>
    <div class="p-20px">
      <van-button plain type="primary" size="small" @click="createToast('轻反馈')">Toast</van-button>
    </div>
    <div class="p-20px">
      <van-button plain type="primary" size="small" @click="openDialog">确认弹窗</van-button>
    </div>
  </div>
</template>

<style scoped></style>
