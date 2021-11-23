<template>
  <v-card
    class="mx-auto mt-5 ml-5 mr-5 text-left"
    dark
    max-width="100%"
    rounded
    @click="selectPost(p_id), viewComment()"
  >
    <v-card-title
      ><center>
        <h2>{{ post }}</h2>
      </center></v-card-title
    >
    <v-divider class="mr-5 ml-5"></v-divider>
    <v-card-text class="text-center">
      <v-btn text v-bind:href="'/post/'+p_id">
            <v-icon>mdi-login-variant</v-icon>&nbsp;เข้าร่วม
          </v-btn>
          <v-btn text>
            <v-icon>mdi-card-account-details</v-icon>&nbsp;รายละเอียด
          </v-btn>
    </v-card-text>
    <v-divider class="mr-5 ml-5 mb-5"></v-divider>
    
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { firestore } from "@/firebase";

const detail_Post = Vue.extend({
  props: {
    p_id: String,
    post: String,
    timeP: String,
    post_Status: Boolean,
  },
});

interface dataPost {
  p_id: string;
  post: string;
  timeP: string;
  post_Status: boolean;
}

interface dataComment {
  c_id: string;
  comment: string;
  timeC: string;
  post_id: string;
}

@Component({
  components: {
    
  },
})
export default class Post extends detail_Post {
  posts: dataPost[] = [];
  comments_Data: dataComment[] = [];
  post_id = "";
  showComment = false;
  textC = "";
  loading = false;

  //time
  rintDate() {
    return new Date().toLocaleDateString();
  }
  printTime() {
    return new Date().toLocaleTimeString();
  }
  printYear() {
    return new Date().getFullYear();
  }
  printTimestamp() {
    return Date.now();
  }
  printFullDate() {
    return new Date();
  }
  //จบ
  async addComment() {
    try {
      firestore
        .collection("comments")
        .add({
          comment: this.textC,
          timeC: this.printTime() + " " + this.rintDate(),
          post_id: "" + this.p_id,
          timestamp: this.printFullDate(),
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.textC = "";
          firestore
            .collection("comments")
            .doc(docRef.id)
            .update({
              c_id: docRef.id,
            })
            .then(function () {
              console.log("updated sussuc");
            });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } catch (e) {
      console.log(e);
    }
  }

  

  setDataPost() {
    this.posts.push({
      p_id: this.p_id,
      post: this.post,
      timeP: this.timeP,
      post_Status: this.post_Status,
    });
    this.post_id = this.p_id
  }

  mounted() {
    this.setDataPost();
  }
}
</script>