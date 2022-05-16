import type { UserInfo } from "/#/store";
import { store } from "/@/store";
import { defineStore } from "pinia";
import { RoleEnum } from "/@/enums/role.enum";
import { GetUserInfoModel, LoginParams } from "/@/api/system/model/user.model";
import { ErrorMessageMode } from "/#/axios";
import { setLocalCache } from "/@/utils/cache";
import { TOKEN_KEY } from "/@/enums/cache.enum";
import { router } from "/@/router";
import { PAGE_NOT_FOUND_ROUTE } from "/@/router/routes/error";
import { RouteRecordRaw } from "vue-router";
import { PageEnum } from "/@/enums/page.enum";
import { usePermissionStore } from "./permission";
import { loginApi } from "/@/api/system/user";

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
      setLocalCache(TOKEN_KEY, info);
    },
    // 登录
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        // const data = { token: "123456" };
        console.log(goHome, mode, loginParams, data);
        const { token } = data;

        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // login after
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      const permissionStore = usePermissionStore();
      if (!permissionStore.isDynamicAddedRoute) {
        const routes = await permissionStore.buildRoutesAction();
        routes.forEach((route) => {
          router.addRoute(route as unknown as RouteRecordRaw);
        });
        router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
        permissionStore.setDynamicAddedRoute(true);
      }
      goHome && (await router.replace(PageEnum.BASE_HOME));
      return null;
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
