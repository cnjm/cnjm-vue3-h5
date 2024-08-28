import { GetUserInfoModel, LoginParams, LoginResult } from "./model/user.model";
import { ErrorMessageMode } from "/#/axios";
import { defHttp } from "/@/utils/axios/index";

enum Api {
  Login = "/mock/user/login",
  GetUserInfo = "/mock/user/getUserInfo",
  SmsCode = "/mock/user/getSmsCode",
  Logout = "/mock/user/logout",
}

/**
 * @description: 用户登录
 */
export const loginApi = (params: LoginParams, mode: ErrorMessageMode = "dialog") =>
  defHttp.post<LoginResult>({ url: Api.Login, params }, { errorMessageMode: mode });

/**
 * @description: 获取用户信息
 */
export const getUserInfo = () => {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: "none" });
};

/**
 * @description: 获取手机验证码
 */
export const getSmsCode = (params: { phone: string }, mode: ErrorMessageMode = "toast") =>
  defHttp.post({ url: Api.SmsCode, params }, { errorMessageMode: mode });

/**
 * @description: 用户登出
 */
export const doLogout = () => {
  return defHttp.get({ url: Api.Logout }, {});
};
