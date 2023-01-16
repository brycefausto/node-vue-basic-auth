<template>
  <div v-if="currentPost.id" class="post-details">
    <h4>Post</h4>
    <div class="mb-2">
      <h1>{{ currentPost.title }}</h1>
      <div>
        <p>{{ currentPost.body }}</p>
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentPost.published ? "Published" : "Pending" }}
      </div>

      <router-link :to="'/posts/edit/' + currentPost.id" class="btn btn-success"
        >Edit</router-link
      >
    </div>

    <router-link to="/" class="btn btn-primary">Back</router-link>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Post...</p>
  </div>
</template>

<script lang="ts">
import PostDataService from "@/services/PostDataService";
import Post from "@/types/Post";
import ResponseData from "@/types/ResponseData";
import { defineComponent } from "vue";

export default defineComponent({
  name: "post",
  data() {
    return {
      currentPost: {} as Post,
    };
  },
  methods: {
    getPost(id: string) {
      PostDataService.get(id)
        .then((response: ResponseData) => {
          this.currentPost = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getPost(this.$route.params.id as string);
  },
});
</script>

<style>
.post-details {
  max-width: 500px;
  margin: auto;
}
</style>
