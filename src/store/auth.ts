import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userId: null as string | null,
    userInfo: null as Record<string, any> | null,
    isLoggedIn: false as boolean,
  }),

  actions: {
    async login() {},

    async twoFactorLogin() {},

    async logout() {},
  },
});
