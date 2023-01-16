<template>
  <div v-if="currentPost.id" class="edit-form">
    <h4>Post</h4>
    <div class="mb-2">
      <form>
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="currentPost.title"
          />
        </div>
        <div class="form-group">
          <label for="textArea">Body</label>
          <textarea
            class="form-control"
            id="textArea"
            rows="3"
            v-model="currentPost.body"
          ></textarea>
        </div>

        <div class="form-group">
          <label><strong>Status:</strong></label>
          {{ currentPost.published ? "Published" : "Pending" }}
        </div>
      </form>

      <button
        class="btn btn-primary mr-2"
        v-if="currentPost.published"
        @click="updatePublished(false)"
      >
        UnPublish
      </button>
      <button
        v-else
        class="btn btn-primary mr-2"
        @click="updatePublished(true)"
      >
        Publish
      </button>

      <button class="btn btn-danger mr-2" @click="deletePost">Delete</button>

      <button type="submit" class="btn btn-success" @click="updatePost">
        Update
      </button>
    </div>

    <router-link to="/" class="btn btn-primary">Back</router-link>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Post...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostDataService from "@/services/PostDataService";
import Post from "@/types/Post";
import ResponseData, { getErrorMessage } from "@/types/ResponseData";

export default defineComponent({
  name: "post-edit",
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

    updatePublished(status: boolean) {
      let data = {
        id: this.currentPost.id,
        title: this.currentPost.title,
        body: this.currentPost.body,
        published: status,
      };

      PostDataService.update(this.currentPost.id, data)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.currentPost.published = status;
          alert("The status was updated successfully!");
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePost() {
      PostDataService.update(this.currentPost.id, this.currentPost)
        .then((response: ResponseData) => {
          console.log(response.data);
          alert("The post was updated successfully!");
        })
        .catch((e) => {
          alert(getErrorMessage(e));
        });
    },

    deletePost() {
      if (confirm("Are you sure you want to delete?")) {
        PostDataService.delete(this.currentPost.id)
          .then((response: ResponseData) => {
            console.log(response.data);
            this.$router.push({ name: "posts" });
          })
          .catch((e) => {
            alert(getErrorMessage(e));
          });
      }
    },
  },
  mounted() {
    this.getPost(this.$route.params.id as string);
  },
});
</script>

<style>
.edit-form {
  max-width: 500px;
  margin: auto;
}
</style>
