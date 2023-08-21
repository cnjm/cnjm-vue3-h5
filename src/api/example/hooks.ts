import { BasicFetchResult } from "../model/base.model";
import { LoadListParams } from "./model/hooks.model";
import { defHttp } from "/@/utils/axios/index";

enum Api {
  LOAD = "/mock/example/loadList",
}

/**
 * @description: 加载列表hooks示例
 */
export const loadList = (params: LoadListParams) => defHttp.post<BasicFetchResult<string>>({ url: Api.LOAD, params });
