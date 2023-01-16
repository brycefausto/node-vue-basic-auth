<template>
  <div>
    <h1>Register</h1>
    <form class="submit-form" v-on:submit="register">
      <div class="form-group">
        <label for="exampleInputName1">Name</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputName1"
          required
          v-model="registerData.name"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          required
          v-model="registerData.email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          required
          v-model="registerData.password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthService from "@/services/AuthService";
import { mapMutations } from "vuex";
import ResponseData, { getErrorMessage } from "@/types/ResponseData";

export default defineComponent({
  name: "register",
  data() {
    return {
      registerData: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    register(e: Event) {
      e.preventDefault();
      AuthService.register(this.registerData)
        .then((response: ResponseData) => {
          this.setUser(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          alert(getErrorMessage(error));
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
