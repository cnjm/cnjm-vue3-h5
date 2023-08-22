import useLoadList, { DefHttpRequest, UseLoadState } from "./useLoadList";

interface MultipleLoadListParams<T> {
  request: DefHttpRequest<T>;
  formState: Object;
  tabs: any[];
  // TODO 可以修改为props，因为可能是嵌套的
  field: string;
}
interface MultipleLoad<T> {
  name: string;
  title: string;
  loading: Ref<boolean>;
  finished: ComputedRef<boolean>;
  error: Ref<boolean>;
  refreshing: Ref<boolean>;
  loadState: UseLoadState<T>;
  loadData: () => void;
  onRefresh: () => void;
}

export default function useMultipleLoadList<T>({ request, formState, tabs, field }: MultipleLoadListParams<T>) {
  const tabsData: MultipleLoad<T>[] = [];
  for (let i = 0; i < tabs.length; i++) {
    const { name, title } = tabs[i];
    const tabState = { [field]: name };
    const { loading, refreshing, error, finished, loadState, loadData, onRefresh } = useLoadList({
      request,
      formState,
      tabState,
    });
    tabsData.push({
      loading,
      refreshing,
      error,
      finished,
      loadState,
      loadData,
      onRefresh,
      name,
      title,
    });
  }

  function onRefresh() {
    tabsData.forEach((tab) => tab.onRefresh());
  }

  return { tabsData, onRefresh };
}
