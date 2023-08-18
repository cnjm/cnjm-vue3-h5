<script setup lang="ts">
  import { loadList } from "/@/api/example/hooks";
  import { LoadListFormState } from "/@/api/example/model/hooks.model";
  import useLoadList from "/@/hooks/core/useLoadList";

  defineOptions({ name: "DemoListHooksPage", inheritAttrs: false, meta: { title: "listHooks" } });

  const formState = reactive({ type: "1" });

  const { loading, finished, loadState, loadData } = useLoadList<LoadListFormState, number>(loadList, formState);
  // console.log(loadState.list);
</script>

<template>
  <div>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="loadData">
      <van-cell v-for="item in loadState.list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<style scoped lang="less"></style>
