export interface LoginParams {
  account: string;
  password: string;
}

export interface LoginResult {
  userId: string | number;
  token: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}
export interface GetUserInfoModel {
  roles?: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
