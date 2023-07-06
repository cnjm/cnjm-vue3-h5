<script setup lang="ts">
  defineOptions({ inheritAttrs: false, meta: { title: "自定义指令", name: "DemoCustomPage" } });

  const { createToast } = useMessage();

  const throttleNum = ref(0);
  const debounceNum = ref(0);

  function throttleClick(event: Event) {
    throttleNum.value++;
    console.log(event);
  }
  function debounceClick(event: Event) {
    debounceNum.value++;
    console.log(event);
  }

  function onScroll(event: Event) {
    console.log(event);
    createToast({ message: "触底啦" });
  }
  function longTouchClick(event: Event) {
    console.log(event);
    createToast({ message: "长按事件" });
  }
</script>

<template>
  <div>
    <div class="p-20px">
      <van-button plain type="primary" size="small" v-auth="['custom']">权限指令</van-button>
      <van-button plain type="primary" size="small" v-auth="['s_admin', 'test']" class="ml-50px">按钮级别</van-button>
    </div>
    <div class="p-20px">
      <van-button plain type="primary" size="small" v-throttle="throttleClick">节流指令</van-button>
      <div class="mt-12px text-28px">点击次数{{ throttleNum }}</div>
    </div>
    <div class="p-20px">
      <van-button plain type="primary" size="small" v-debounce="debounceClick">防抖指令</van-button>
      <div class="mt-12px text-28px">点击次数{{ debounceNum }}</div>
    </div>
    <div class="p-20px">
      <van-button plain type="primary" size="small" v-longTouch:stop="longTouchClick">长按指令</van-button>
    </div>
    <div class="p-20px h-200px overflow-scroll" v-scroll="onScroll">
      <div class="mt-12px text-28px" v-for="key in 30" :key="key">触底指令 | 滚动触发</div>
    </div>
  </div>
</template>

<style scoped lang="less">
  // a{
  //   overflow-y: scroll;
  // }
</style>
