<script setup lang="ts">
  defineOptions({ name: "DemoRouterPage", inheritAttrs: false, meta: { title: "router" } });

  const router = useRouter();

  const query = ref("test");

  function pathMode() {
    router.push({ path: "/demo/example/router/deepRouter", query: { query: query.value } });
  }
  function nameMode() {
    router.push({ name: "DemoDeepRouterPage", query: { plan: "private" } });
  }
  function nameParamsMode() {
    router.push({ name: "DemoDeepRouterPage", params: { mode: "params" } });
  }
</script>

<template>
  <div>
    <van-field v-model="query" label="query参数：" placeholder="请输入" />
    <br />
    <br />
    <van-button @click="pathMode">path-push</van-button>
    <br />
    <br />
    <van-button @click="nameMode">name-push</van-button>
    <br />
    <br />
    <van-button @click="nameParamsMode">name-push-params</van-button>
    <br />
    <br />
    <router-link to="/demo/example/router/deepRouter">router-link跳转(to:string)</router-link>
    <br />
    <br />
    <RouterLink :to="{ path: `/demo/example/router/deepRouter`, query: { link: 'router-link' } }">
      router-link跳转(to:RouteLocationPathRaw)
    </RouterLink>
  </div>
</template>

<style scoped lang="less"></style>
