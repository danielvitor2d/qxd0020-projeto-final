import jwtDecode from 'jwt-decode';
import { defineStore } from 'pinia';

interface Token {
  sub: string;
  email: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null
  }),
  getters: {
    isLogged(): boolean {
      return this.token === null ? false : true
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token)
    },
    clearToken() {
      this.token = null
      localStorage.removeItem('token')
    },
    getUserIdIfIsLoggedIn() {
      if (!this.token) return null
      const decodedToken = jwtDecode(this.token) as Token;
      const userId = decodedToken.sub;
      return userId;
    }
  }
})
