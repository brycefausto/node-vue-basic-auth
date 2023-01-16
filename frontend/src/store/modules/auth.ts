export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
}

const state: AuthState = {
  user: null,
};
const getters = {
  userId: (state: AuthState) => (state.user ? state.user.id : null),
  isAuthenticated: (state: AuthState) => !!state.user,
};
const actions = {};
const mutations = {
  setUser(state: AuthState, user: User) {
    console.log("user", user);
    state.user = user;
  },
  logout(state: AuthState) {
    state.user = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
