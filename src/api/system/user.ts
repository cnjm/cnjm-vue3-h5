import { LoginParams, LoginResult } from "./model/user.model";
import { defHttp } from "/@/utils/axios/index";

enum Api {
  LOGIN = "/user/login",
}

// 用户登录
export const login = (params: LoginParams) => defHttp.get<LoginResult>({ url: Api.LOGIN, params });
