<template>
  <div>
    <h1>Login</h1>
    <form class="submit-form" v-on:submit="login">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          required
          aria-describedby="emailHelp"
          v-model="loginData.email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          required
          v-model="loginData.password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthService from "@/services/AuthService";
import { mapMutations } from "vuex";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "login",
  data() {
    return {
      loginData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login(e: Event) {
      e.preventDefault();
      AuthService.login(this.loginData)
        .then((response: ResponseData) => {
          this.setUser(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          if (error.response.data === "Unauthorized") {
            alert("The email or password is incorrect.");
          } else {
            alert(error.message);
          }
        });
    },
    ...mapMutations(["setUser"]),
  },
});
</script>

<style>
.submit-form {
  max-width: 400px;
  margin: auto;
}
</style>
