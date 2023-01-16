<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
          v-on:keyup.enter="searchTitle"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <h4>Posts List</h4>
      <router-link class="m-3 btn btn-sm btn-success" tag="button" to="/add"
        >Add</router-link
      >

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="{ 'table-active': index == currentIndex }"
            v-for="(post, index) in posts"
            :key="index"
            @click="setActivePost(post, index)"
          >
            <td>{{ post.title }}</td>
            <td>{{ post.published ? "Published" : "Pending" }}</td>
            <td>
              <router-link
                :to="'/posts/' + post.id"
                class="badge badge-primary mr-2"
                >View</router-link
              >
              <router-link
                :to="'/posts/edit/' + post.id"
                class="badge badge-warning"
                >Edit</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostDataService from "@/services/PostDataService";
import Post from "@/types/Post";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "post-list",
  data() {
    return {
      posts: [] as Post[],
      currentPost: {} as Post,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrievePosts() {
      PostDataService.getAll()
        .then((response: ResponseData) => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievePosts();
      this.currentPost = {} as Post;
      this.currentIndex = -1;
    },

    setActivePost(tutorial: Post, index = -1) {
      this.currentPost = tutorial;
      this.currentIndex = index;
    },

    searchTitle() {
      PostDataService.findByTitle(this.title)
        .then((response: ResponseData) => {
          this.posts = response.data;
          this.setActivePost({} as Post);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrievePosts();
  },
});
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
