import { ref, reactive } from "vue";
import { BasicFetchResult, BasicPageParams } from "/@/api/model/base.model";
import { LoadStatusEnum } from "/@/enums/loading.enum";

interface DefHttpRequest<T> {
  (arg1: BasicPageParams & T, ...arg2: any[]): Promise<any>;
}

interface LoadState<S> {
  list: S[];
  // 加载态
  status: LoadStatusEnum;
  // 当前页码
  pageNum: number;
  // 分页大小
  pageSize: number;
  // 总数量
  total: number;
}

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
export default function useLoadList<T, S>(request: DefHttpRequest<T>, formState: T) {
  const loadState = reactive<LoadState<S>>({
    list: [],
    status: LoadStatusEnum.LOADING,
    pageNum: 1,
    pageSize: 20,
    total: 0,
  });

  // 是否正在加载 - 接口是否请求中
  const loading = ref(false);

  // 是否加载完成 - 没有数据或没有更多数据
  const finished = computed(() => [LoadStatusEnum.NO_DATA, LoadStatusEnum.NO_MORE].includes(loadState.status));

  // 处理响应
  function handleList(result: BasicFetchResult<any>) {
    const { items = [], total = 0 } = result;
    // 第一页、并且没有数据，应为无数据状态 直接return
    if (loadState.pageNum === 1 && items.length <= 0) {
      loadState.status = LoadStatusEnum.NO_DATA;
      return;
    }

    loadState.list = [...loadState.list, ...items];

    loadState.total = total;
    loadState.pageNum++;

    // 如果数据长度等于总数，则加载完成
    if (loadState.list.length >= total || items.length < loadState.pageSize) {
      loadState.status = LoadStatusEnum.NO_MORE;
    }
  }

  // 处理参数
  function handleParams() {
    const params: BasicPageParams & T = {
      pageNum: loadState.pageNum,
      pageSize: loadState.pageSize,
      ...formState,
    };
    return params;
  }

  // 获取列表数据
  function loadData() {
    if (loadState.status === LoadStatusEnum.LOADING) {
      loading.value = true;
      request(handleParams())
        .then((result) => {
          handleList(result);
          loading.value = false;
        })
        .catch((_err) => {
          loading.value = false;
          // 如果请求出错
          loadState.status = LoadStatusEnum.FAIL;
        });
    }
  }

  // 重置
  function initList() {
    loadState.pageNum = 1;
    loadState.total = 0;
    loadState.status = LoadStatusEnum.LOADING;
    loadState.list = [];

    loadData();
  }

  return {
    loading,
    finished,
    loadState,
    loadData,
    initList,
  };
}
