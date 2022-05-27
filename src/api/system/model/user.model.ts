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
  // 用户id
  userId: string | number;
  // 用户名
  userName: string;
  // 角色列表
  roles?: RoleInfo[];
}
