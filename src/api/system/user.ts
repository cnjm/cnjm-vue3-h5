import { LoginParams, LoginResult } from "./model/user.model";
import { ErrorMessageMode } from "/#/axios";
import { defHttp } from "/@/utils/axios/index";

enum Api {
  LOGIN = "/mock/user/login",
}

// 用户登录
export const loginApi = (params: LoginParams, mode: ErrorMessageMode = "modal") =>
  defHttp.post<LoginResult>({ url: Api.LOGIN, params }, { errorMessageMode: mode });
