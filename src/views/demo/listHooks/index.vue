<script setup lang="ts">
  import { loadList } from "/@/api/example/hooks";
  import useLoadList from "/@/hooks/core/useLoadList";

  defineOptions({ name: "DemoListHooksPage", inheritAttrs: false, meta: { title: "listHooks", keepAlive: true } });

  // const router = useRouter();

  const formState = reactive({ name: "" });

  const { loading, refreshing, error, finished, loadState, loadData, onRefresh } = useLoadList<string>({
    request: loadList,
    formState: formState,
  });

  function linkDetail(data: string) {
    console.log(data);
    // router.push({ path: `/demo/listHooks/detail` });
  }

  onActivated(() => {
    console.log("onActivated");
  });
</script>

<template>
  <div>
    <van-field v-model="formState.name" center label="筛选参数" placeholder="输入错误/无数据进行测试">
      <template #button>
        <van-button size="small" type="primary" @click="onRefresh">搜索</van-button>
      </template>
    </van-field>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        v-model:error="error"
        :finished="finished"
        :finished-text="loadState.status === 'noMore' ? '没有更多了' : '暂无数据'"
        error-text="请求失败，点击重新加载"
        @load="loadData"
      >
        <van-cell v-for="item in loadState.list" :key="item" :title="item" @click="linkDetail(item)" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="less"></style>
