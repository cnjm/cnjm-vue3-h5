import type { UserInfo } from "/#/store";
import { store } from "/@/store";
import { defineStore } from "pinia";
import { RoleEnum } from "/@/enums/role.enum";

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    // 用户信息
    userInfo: null,
    // token
    token: undefined,
    roleList: [],
  }),
  getters: {
    // 获取token
    getToken(): string {
      return this.token || "";
    },
    getRoleList(): RoleEnum[] {
      // return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
      return [RoleEnum.SUPER];
    },
  },
  actions: {
    // 设置token
    setToken(info: string | undefined) {
      this.token = info ? info : ""; // for null or undefined value
      // setAuthCache(TOKEN_KEY, info);
    },
    // 登出
    async logout(goLogin = false) {
      console.log("logout", goLogin);
      // if (this.getToken) {
      //   try {
      //     await doLogout();
      //   } catch {
      //     console.log("注销Token失败");
      //   }
      // }
      // this.setToken(undefined);
      // this.setSessionTimeout(false);
      // this.setUserInfo(null);
      // goLogin && router.push(PageEnum.BASE_LOGIN);
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
