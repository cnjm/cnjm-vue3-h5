import type { UserInfo } from "/#/store";
import type { LocationQueryValue, RouteRecordRaw } from "vue-router";
// import { useRouter } from "vue-router";
import { store } from "/@/store";
import { defineStore } from "pinia";
import { RoleEnum } from "/@/enums/role.enum";
import { GetUserInfoModel, LoginParams } from "/@/api/system/model/user.model";
import { ErrorMessageMode } from "/#/axios";
import { PAGE_NOT_FOUND_ROUTE } from "/@/router/routes/error";
import { router } from "/@/router";
import { PageEnum } from "/@/enums/page.enum";
import { usePermissionStore } from "./permission";
import { doLogout, getUserInfo, loginApi } from "/@/api/system/user";
import { isArray } from "/@/utils/internal/isType";
import { useMessage } from "/@/hooks/web/useMessage";

interface LoginAfterParams {
  goHome?: boolean;
  redirect?: LocationQueryValue;
  mode?: ErrorMessageMode;
}

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
    getToken(): string | undefined {
      return this.token;
    },
    // 获取用户信息
    getUserInfo(): Nullable<UserInfo> {
      return this.userInfo;
    },
    // 获取角色列表
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : [];
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
    },
    // 设置用户信息
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = !info ? 0 : new Date().getTime();
    },
    // 设置角色
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
    },
    // 设置登录状态
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    /**
     * @description: 登录
     */
    async login(params: LoginParams, afterParams: LoginAfterParams): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = false, mode, redirect = undefined } = afterParams;
        const data = await loginApi(params, mode);
        const { token } = data;

        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome, redirect);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: 登录后
     */
    async afterLoginAction(goHome?: boolean, redirect?: LocationQueryValue): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;

      // 获取用户信息
      const userInfo = await this.getUserInfoAction();

      const permissionStore = usePermissionStore();
      if (!permissionStore.isDynamicAddedRoute) {
        const routes = await permissionStore.buildRoutesAction();
        routes.forEach((route) => {
          router.addRoute(route as unknown as RouteRecordRaw);
        });
        router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
        permissionStore.setDynamicAddedRoute(true);
      }

      if (!goHome && redirect) {
        await router.replace(decodeURIComponent(redirect));
      } else {
        await router.replace(PageEnum.BASE_HOME);
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
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
    // 登出确认弹窗
    confirmLogout() {
      const { createDialog } = useMessage();
      createDialog({
        title: "温馨提示",
        message: "是否确认退出？",
        showCancelButton: true,
      })
        .then(() => {
          this.logout(true);
        })
        .catch(() => {
          console.log("取消退出");
        });
    },
  },
  persist: {
    key: "user",
    paths: ["token", "userInfo", "sessionTimeout"],
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
