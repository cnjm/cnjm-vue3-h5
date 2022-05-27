import type { UserInfo } from "/#/store";
import { store } from "/@/store";
import { defineStore } from "pinia";
import { RoleEnum } from "/@/enums/role.enum";
import { GetUserInfoModel, LoginParams } from "/@/api/system/model/user.model";
import { ErrorMessageMode } from "/#/axios";
import { getLocalCache, setLocalCache } from "/@/utils/cache";
import { TOKEN_KEY, USER_INFO_KEY, USER_ROLES_KEY } from "/@/enums/cache.enum";
import { router } from "/@/router";
import { PAGE_NOT_FOUND_ROUTE } from "/@/router/routes/error";
import { RouteRecordRaw } from "vue-router";
import { PageEnum } from "/@/enums/page.enum";
import { usePermissionStore } from "./permission";
import { doLogout, getUserInfo, loginApi } from "/@/api/system/user";
import { isArray } from "/@/utils/internal/isType";

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    // 用户信息
    userInfo: null,
    // token
    token: undefined,
    // 角色列表
    roleList: [],
    // 是否登录过期
    sessionTimeout: false,
    // 最后更新时间
    lastUpdateTime: 0,
  }),
  getters: {
    // 获取token
    getToken(): string {
      return this.token || getLocalCache<string>(TOKEN_KEY);
    },
    // 获取用户信息
    getUserInfo(): UserInfo {
      return this.userInfo || getLocalCache<UserInfo>(USER_INFO_KEY) || {};
    },
    // 获取角色列表
    getRoleList(): RoleEnum[] {
      // return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
      return [RoleEnum.SUPER];
    },
    // 获取Session状态
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    // 获取最后更新时间
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    // 设置token
    setToken(info: string | undefined) {
      this.token = info ? info : ""; // for null or undefined value
      setLocalCache(TOKEN_KEY, info);
    },
    // 设置用户信息
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = !info ? 0 : new Date().getTime();
      setLocalCache(USER_INFO_KEY, info);
    },
    // 设置角色
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setLocalCache(USER_ROLES_KEY, roleList);
    },
    // 设置登录状态
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    /**
     * @description: 登录
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { token } = data;

        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: 登录后
     */
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // 获取用户信息
      const userInfo = await this.getUserInfoAction();
      const permissionStore = usePermissionStore();

      const sessionTimeout = this.sessionTimeout;

      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        goHome && (await router.replace(PageEnum.BASE_HOME));
      }

      return userInfo;
    },
    /**
     * @description: 获取用户信息
     */
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo = await getUserInfo();

      const { roles = [] } = userInfo;
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value) as RoleEnum[];
        this.setRoleList(roleList);
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }
      this.setUserInfo(userInfo);
      return userInfo;
    },
    // 登出
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          console.log("注销Token失败");
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
