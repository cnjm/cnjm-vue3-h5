import { defineStore } from "pinia";
import { RoleEnum } from "/@/enums/role.enum";

interface UserState {
  roleList: RoleEnum[];
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    roleList: [],
  }),
  getters: {
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
  },
  actions: {},
});
