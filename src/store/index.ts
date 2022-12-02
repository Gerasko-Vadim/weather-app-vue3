import { createStore } from "vuex";

export type State = { theme: 'dark' | 'light' };

const state: State = { theme: 'light' };

export const store = createStore({
  state,
  mutations: {
    toggleTheme(state, payload) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    }
  },
  actions: {
    theme({ commit }) {
      commit("toggleTheme");
    }
  },

  getters: {
    theme(state) {
      return state.theme;
    }
  },
  modules: {}
});