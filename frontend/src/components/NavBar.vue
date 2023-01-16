<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">Sample App</router-link>
    <div v-if="isLoggedIn" class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/posts" class="nav-link">Posts</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/add" class="nav-link">Add</router-link>
      </li>
    </div>
    <div v-else class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/register" class="nav-link">Register</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/login" class="nav-link">Login</router-link>
      </li>
    </div>
    <div v-if="isLoggedIn" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link to="/profile" class="nav-link">Profile</router-link>
      </li>
      <li class="nav-item">
        <span class="nav-link" v-on:click="logout">Logout</span>
      </li>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      await this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
});
</script>
