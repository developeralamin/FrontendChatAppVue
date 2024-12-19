import axios from "axios";
import { defineStore } from "pinia";

export const useAuthenticateStore = defineStore({
  id: "authenticate",

  state: () => ({
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")),
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getToken: (state) => state.token,
    getUser: (state) => state.user,
  },

  actions: {
    login(token) {
      localStorage.setItem("token", token);
      this.token = token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },

    setUser(user) {
      localStorage.setItem("user", JSON.stringify(user));
      this.user = user;
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.token = "";
      this.user = "";
    },
  },
});
