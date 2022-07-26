<script setup lang="ts">
  import { onBeforeUnmount, reactive, ref } from "vue";

  // 并不能响应式
  const msg = "一段普通文本";
  const codeMsg = `const msg = "一段普通文本";
<div>{{ msg }}</div>`;

  // 一般用作简单类型的定义，比如string number
  // 定义对象或数组也是可以，但仍通过 obj.value.age读取
  // ref方法 实际返回一个RefImpl类型的对象，本质仍是 reactive
  // 在 RefImpl 对象中 _value 通过 toReactive 获取 reactive 返回的代理对象
  let count = 0;
  let refMsg = ref("ref文本");

  let timer: NodeJS.Timeout | null = setInterval(() => {
    count++;
    const text = count % 2 ? "一段ref文本，setInterval调用不停更改中" : "这样使用：refMsg.value = '一段新的文本'";
    refMsg.value = text;
  }, 2000);

  onBeforeUnmount(() => {
    if (timer) {
      clearInterval(Number(timer));
    }
  });

  const codeRefMsg = `let count = 0;
let refMsg = ref("ref文本");
let timer: NodeJS.Timeout | null = setInterval(() => {
  count++;
  const text = count % 2 ? "一段ref文本，setInterval调用不停更改中" : "这样使用：refMsg.value = '一段新的文本'";
  refMsg.value = text;
}, 2000);
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(Number(timer));
    console.log(timer);
  }
});`;

  const obj = reactive({
    name: "reactiveApi",
    count: 0,
  });
</script>

<template>
  <div>
    <div>{{ msg }}</div>
    <highlightjs language="typescript" :autodetect="false" :code="codeMsg" />
    <van-divider />
    <div>{{ refMsg }}</div>
    <div>定时器也将在 onBeforeUnmount 中清除</div>
    <highlightjs language="typescript" :autodetect="false" :code="codeRefMsg" />
    <van-divider />
    <div>{{ obj.count }}</div>
  </div>
</template>
