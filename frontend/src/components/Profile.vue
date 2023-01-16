<template>
  <div v-if="currentUser.id" class="profile">
    <h4>Profile</h4>
    <div class="mb-2">
      <div v-if="!editing" class="container profile-details">
        <div class="row">
          <div class="col-2">Name:</div>
          <div class="col-10">{{ currentUser.name }}</div>
        </div>
        <div class="row">
          <div class="col-2">Email:</div>
          <div class="col-10">{{ currentUser.email }}</div>
        </div>
      </div>

      <form v-else>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="editingUser.name"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            v-model="editingUser.email"
          />
        </div>
      </form>

      <button v-if="!editing" class="btn btn-success" v-on:click="edit">
        Edit
      </button>
      <button v-if="editing" class="btn btn-success mr-2" v-on:click="save">
        Save
      </button>
      <button v-if="editing" class="btn btn-primary" v-on:click="cancelEdit">
        Cancel
      </button>
    </div>

    <router-link to="/" class="btn btn-primary">Back</router-link>
  </div>

  <div v-else>
    <br />
    <p>Loading User...</p>
  </div>
</template>

<script lang="ts">
import UserDataService from "@/services/UserDataService";
import User from "@/types/User";
import ResponseData, { getErrorMessage } from "@/types/ResponseData";
import { defineComponent } from "vue";

export default defineComponent({
  name: "user",
  data() {
    return {
      currentUser: {} as User,
      editingUser: {} as User,
      editing: false,
    };
  },
  methods: {
    getUser(id: string) {
      UserDataService.get(id)
        .then((response: ResponseData) => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          getErrorMessage(e);
        });
    },
    edit() {
      this.editingUser = { ...this.currentUser };
      this.editing = true;
    },
    save() {
      UserDataService.update(this.currentUser.id, this.currentUser)
        .then((response: ResponseData) => {
          alert("Your profile was updated successfully!");
          this.currentUser = { ...this.editingUser };
          this.editingUser = {} as User;
          this.editing = false;
        })
        .catch((e) => {
          alert(getErrorMessage(e));
        });
    },
    cancelEdit() {
      this.editingUser = {} as User;
      this.editing = false;
    },
  },
  mounted() {
    console.log("isAuth", this.$store.getters.isAuthenticated);
    console.log("userId", this.$store.getters.userId);
    this.getUser(this.$store.getters.userId as string);
  },
});
</script>

<style>
.profile {
  max-width: 500px;
  margin: auto;
}

.profile-details {
  max-width: 500px;
  margin: auto;
}

.profile-details .row div {
  padding: 10px;
}
</style>
