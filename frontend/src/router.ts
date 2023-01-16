import {
  NavigationGuard,
  RouteRecordRaw,
  createRouter,
  createWebHistory,
} from "vue-router";
import AuthService from "./services/AuthService";
import store from "./store";

const authGuard: NavigationGuard = async (to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  if (!isAuthenticated) {
    try {
      const data = await AuthService.user();
      if (data.user) {
        next();
      } else {
        next("/login");
      }
    } catch (error) {
      next("/login");
    }
  } else {
    next();
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/posts",
    name: "posts",
    component: () => import("./components/PostList.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./components/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./components/Register.vue"),
  },
  {
    path: "/posts/:id",
    name: "post-details",
    component: () => import("./components/PostDetails.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/posts/edit/:id",
    name: "post-edit",
    component: () => import("./components/PostEdit.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddPost.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("./components/Profile.vue"),
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
