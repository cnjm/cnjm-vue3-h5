import { MockMethod } from "vite-plugin-mock";
const baseUrl = "/api/mock/user";
export default [
  {
    url: `${baseUrl}/login`,
    method: "post",
    response: () => {
      return {
        code: 20000,
        result: { token: "123add" },
        message: "登录成功",
      };
    },
  },
  {
    url: `${baseUrl}/getUserInfo`,
    method: "get",
    response: () => {
      return {
        code: 20000,
        result: {
          userId: 1,
          userName: "微茫",
          roles: [
            { value: "s_admin", roleName: "超级管理员" },
            { value: "test", roleName: "测试角色" },
            { value: "test1", roleName: "测试角色1" },
          ],
        },
        message: "获取用户信息成功",
      };
    },
  },
  {
    url: `${baseUrl}/getSmsCode`,
    method: "post",
    response: () => {
      return {
        code: 20000,
        result: {},
        message: "获取成功",
      };
    },
  },
  {
    url: `${baseUrl}/logout`,
    method: "get",
    response: () => {
      return {
        code: 20000,
        result: {},
        message: "登出成功",
      };
    },
  },
] as MockMethod[];
