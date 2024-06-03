import { defineStore } from "pinia";
import { store } from "@/store";

export const useUserStore = defineStore("user", () => {
  const user: any = {
    roles: [],
    perms: [],
  };

  const token = '';//useStorage("accessToken", "");

  /**
   * 登录
   *
   * @param {LoginData}
   * @returns
   */
  function login(loginData: any) {
    return new Promise<void>((resolve, reject) => {
      
    });
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getUserInfo() {
    return new Promise<any>((resolve, reject) => {
      
    });
  }

  // user logout
  function logout() {
    return new Promise<void>((resolve, reject) => {

    });
  }

  // remove token
  function resetToken() {
    return new Promise<void>((resolve) => {
    });
  }

  return {
    token,
    user,
    login,
    getUserInfo,
    logout,
    resetToken,
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
