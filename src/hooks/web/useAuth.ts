import { toRaw } from "vue";
import { RoleEnum } from "/@/enums/role.enum";
import { useUserStoreWithOut } from "/@/store/modules/user";
const userStore = useUserStoreWithOut();
export function getAuthStatus(roles: RoleEnum[]) {
  const roleList = toRaw(userStore.getRoleList) || [];
  // 没有设置角色则默认通过
  if (!roles || roles.length <= 0) return true;
  // 设置特定的角色（超级管理员）默认都可以访问
  if (roleList.includes(RoleEnum.SUPER)) return true;
  // 余下需要判断该用户是否包含所需角色
  return roleList.some((role) => roles.includes(role));
}
