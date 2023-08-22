import { ref, reactive } from "vue";
import { BasicFetchResult } from "/@/api/model/base.model";
import { LoadStatusEnum } from "/@/enums/loading.enum";

export interface DefHttpRequest<T> {
  (arg: any): Promise<BasicFetchResult<T>>;
}

export interface UseLoadState<T> {
  list: T[];
  // 加载态
  status: LoadStatusEnum;
  // 当前页码
  pageNum: number;
  // 分页大小
  pageSize: number;
  // 总数量
  total: number;
}

interface LoadListParams<T> {
  request: DefHttpRequest<T>;
  formState: Object;
  tabState?: Object;
}

// 此处默认处理的是以下形式的请求以及响应，需结合实际业务需求
// const params = {
//   pageNum: 1,
//   pageSize: 1,
//   // ...其他请求参数
// };
// const res = {
//   message: "",
//   code: "",
//   result: {
//     items: [],
//     total: 100,
//   },
// };

export default function useLoadList<T>({ request, formState, tabState = {} }: LoadListParams<T>) {
  const loadState: UseLoadState<T> = reactive({
    list: [],
    status: LoadStatusEnum.LOADING,
    pageNum: 1,
    pageSize: 20,
    total: 0,
  });

  // 是否正在加载 - 接口是否请求中
  const loading = ref(false);

  // 是否正在下拉刷新
  const refreshing = ref(false);

  // 是否加载失败
  const error = ref(false);

  // 是否加载完成 - 没有数据或没有更多数据
  const finished = computed(() => [LoadStatusEnum.NO_DATA, LoadStatusEnum.NO_MORE].includes(loadState.status));

  // 处理响应
  function handleList(result: BasicFetchResult<T>) {
    const { items = [], total = 0 } = result;

    // 第一页、并且没有数据，应为无数据状态 直接return
    if (loadState.pageNum === 1 && items.length <= 0) {
      loadState.status = LoadStatusEnum.NO_DATA;
      return;
    }

    loadState.list.push(...items);
    loadState.total = total;
    loadState.pageNum++;

    // 如果数据长度等于总数，或者返回的数据长度小于size，则说明加载完成，标注为没有更多数据
    if (loadState.list.length >= total || items.length < loadState.pageSize) {
      loadState.status = LoadStatusEnum.NO_MORE;
    }
  }

  // 处理参数
  function handleParams() {
    const params = {
      pageNum: loadState.pageNum,
      pageSize: loadState.pageSize,
      ...formState,
      ...tabState,
    };
    return params;
  }

  // 获取列表数据
  function loadData() {
    // 只要没有真正请求完所有数据，都为有效请求
    if ([LoadStatusEnum.LOADING, LoadStatusEnum.FAIL].includes(loadState.status)) {
      // 标记请求中避免请求期间多次触发
      loading.value = true;
      // 只要进入请求，即使上次失败，也修改为可请求状态
      loadState.status = LoadStatusEnum.LOADING;
      request(handleParams())
        .then((result) => {
          handleList(result);
          // 标记加载请求结束
          loading.value = false;
          // 标记下拉加载动画结束
          refreshing.value = false;
        })
        .catch((_err) => {
          // 标记加载请求结束
          loading.value = false;
          // 标记请求出错 - 也可以出错后重试
          loadState.status = LoadStatusEnum.FAIL;
          error.value = true;
        });
    }
  }

  // 刷新列表
  function onRefresh() {
    loadState.pageNum = 1;
    loadState.total = 0;
    loadState.status = LoadStatusEnum.LOADING;
    loadState.list = [];
    // 重新加载数据
    loadData();
  }

  return {
    // 是否正在请求数据
    loading,
    // 是否加载完毕
    finished,
    // 请求是否出错
    error,
    // 是否正在进行下拉刷新
    refreshing,
    // 加载的列表、分页参数、列表总条数、以及更加完整的加载状态 1.可加载 2.无数据 3.没有更多数据 4.加载失败
    loadState,
    // 加载请求
    loadData,
    // 刷新加载
    onRefresh,
  };
}
