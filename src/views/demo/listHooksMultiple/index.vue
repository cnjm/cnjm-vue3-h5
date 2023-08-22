<script setup lang="ts">
  import { loadList } from "/@/api/example/hooks";
  import useMultipleLoadList from "/@/hooks/core/useMultipleLoadList";

  defineOptions({ name: "DemoListHooksMultiplePage", inheritAttrs: false, meta: { title: "listHooksMultiple" } });

  const formState = reactive({ name: "", other: "" });

  const tabs = [
    { name: "a", title: "a-tab" },
    { name: "b", title: "b-tab" },
    { name: "c", title: "c-tab" },
  ];

  const { tabsData, onRefresh } = useMultipleLoadList<string>({
    request: loadList,
    formState,
    tabs,
    field: "name",
  });

  // watch(tabsData, (value) => {
  //   console.log(value);
  // });
</script>

<template>
  <div>
    <van-field v-model="formState.other" center label="筛选参数" placeholder="可以有其他参数">
      <template #button>
        <van-button size="small" type="primary" @click="onRefresh">搜索</van-button>
      </template>
    </van-field>
    <van-tabs v-model:active="formState.name">
      <van-tab :title="tab.title" :name="tab.name" v-for="tab in tabsData" :key="tab.name">
        <van-pull-refresh v-model="tab.refreshing.value" @refresh="tab.onRefresh">
          <van-list
            v-model:loading="tab.loading.value"
            v-model:error="tab.error.value"
            :finished="tab.finished.value"
            :finished-text="tab.loadState.status === 'noMore' ? '没有更多了' : '暂无数据'"
            error-text="请求失败，点击重新加载"
            @load="tab.loadData"
          >
            <van-cell v-for="item in tab.loadState.list" :key="item" :title="item" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="less"></style>
