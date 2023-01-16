import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth, { AuthState } from "./modules/auth";

interface IState {
  auth: AuthState;
}

// Create store
export default new Vuex.Store<IState>({
  modules: {
    auth,
  },
  state: {} as IState,
  plugins: [createPersistedState()],
});
