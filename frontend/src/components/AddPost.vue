<template>
  <div class="submit-form">
    <div class="mb-2">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="post.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="textArea">Body</label>
        <textarea
          class="form-control"
          id="textArea"
          rows="3"
          v-model="post.body"
        ></textarea>
      </div>

      <button @click="savePost" class="btn btn-success">Submit</button>
    </div>
    <router-link to="/" class="btn btn-primary">Back</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostDataService from "@/services/PostDataService";
import Post from "@/types/Post";
import ResponseData, { getErrorMessage } from "@/types/ResponseData";

export default defineComponent({
  name: "add-post",
  data() {
    return {
      post: {
        id: null,
        title: "",
        body: "",
        published: false,
      } as Post,
      submitted: false,
    };
  },
  methods: {
    savePost() {
      let data = {
        title: this.post.title,
        body: this.post.body,
      };

      PostDataService.create(data)
        .then((response: ResponseData) => {
          this.post.id = response.data.id;
          console.log(response.data);
          alert("Post submitted successfully!");
          this.$router.push("/");
        })
        .catch((e) => {
          alert(getErrorMessage(e));
        });
    },

    newPost() {
      this.post = {} as Post;
    },
  },
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
