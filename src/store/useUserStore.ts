import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null as number | null,
    username: '',
    userRole: '',
    isLoggedIn: false
  }),
  actions: {
    login(user: { id: number, username: string, role: string }) {
      this.userId = user.id;
      this.username = user.username;
      this.userRole = user.role;
      this.isLoggedIn = true;
    },
    logout() {
      this.userId = null;
      this.username = '';
      this.userRole = '';
      this.isLoggedIn = false;
    }
  }
});
