<script setup lang="ts">
  import { useDemoStore } from "/@/store/modules/demo";

  defineOptions({ name: "DemoPiniaPage", inheritAttrs: false, meta: { title: "pinia" } });

  // 使用前先实例化store
  const demoStore = useDemoStore();

  // 可以直接进行读写
  demoStore.count = 1;

  // 或者通过$patch
  demoStore.$patch((state) => {
    state.count++;
    state.testArray.push(2);
  });
  // 甚至整个替换
  demoStore.$state = {
    count: 0,
    testObj: {
      title: "demo",
    },
    testArray: [1],
  };

  demoStore.testObj.title = "5555";

  // 响应式的可以通过storeToRefs解构使用（读写）
  const { count, getDoubleCount } = storeToRefs(demoStore);
  // 此时需要.value访问，template中不用
  console.log(count.value);
  console.log(getDoubleCount.value);

  // 订阅相关
  const subscribeData = reactive({ record: [] as string[] });

  // 订阅state mutation可以获取一些更改的相关信息
  demoStore.$subscribe((mutation, _state) => {
    // mutation.type 'direct' | 'patch object' | 'patch function'
    console.log(mutation);
  });

  // 订阅一个action
  const unsubscribe = demoStore.$onAction(
    ({
      name, // action 的名字
      store, // store 实例
      args, // 调用这个 action 的参数
      after, // 在这个 action 执行完毕之后，执行这个函数
      onError, // 在这个 action 抛出异常的时候，执行这个函数
    }) => {
      // 此处将在actions开始前执行
      subscribeData.record.push(`before----${Date.now()}:${name}[${args.join(", ")}]`);

      console.log(store);

      // 如果 action 成功并且完全运行后，after 将触发。
      // 它将等待任何返回的 promise
      after((result) => {
        subscribeData.record.push(`after----${Date.now()}:${name}[${result}]`);
      });

      // 如果 action 抛出或返回 Promise.reject ，onError 将触发
      onError((error) => {
        subscribeData.record.push(`Failed----${Date.now()}:${name}[${error}]`);
      });
    },
  );

  function addCount() {
    count.value++;
  }
  function resetCount() {
    // 重置单个
    demoStore.$resetFields(["count"]);
    // 重置多个
    // demoStore.$resetFields(["count", "testObj"]);

    // 重置全部
    // demoStore.$reset();
    // demoStore.$resetFields();
  }
  function changeCount() {
    demoStore.updateCount(91);
  }
  async function asyncChangeCount() {
    await demoStore.asyncChangeCount(88);
    console.log("改动完成");
  }
  async function removeActionsSubscribe() {
    // 手动移除订阅
    unsubscribe();
  }
</script>

<template>
  <div>
    {{ demoStore.testObj.title }}
    <div>通过 storeToRefs count:{{ count }}</div>
    <br />
    <div>demoStore.count:{{ demoStore.count }}</div>
    <br />
    <div>doubleCount:{{ getDoubleCount }}</div>
    <br />
    <br />
    <van-button @click="addCount">增加</van-button>
    <br />
    <br />
    <van-button @click="resetCount">重置count</van-button>
    <br />
    <br />
    <div>通过actions改动</div>
    <van-button @click="changeCount">改为99</van-button>
    <br />
    <br />
    <div>异步actions</div>
    <van-button @click="asyncChangeCount">改为88</van-button>
    <br />
    <br />
    <div>订阅记录：</div>
    <div v-for="(item, index) in subscribeData.record" :key="index">{{ item }}</div>
    <br />
    <br />
    <van-button @click="removeActionsSubscribe">移除actions订阅</van-button>
  </div>
</template>

<style scoped lang="less">
  // a{
  //   overflow-y: scroll;
  // }
</style>
