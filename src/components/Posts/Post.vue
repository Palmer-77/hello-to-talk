<template>
  <v-card
    class="mx-auto mt-5 ml-5 mr-5 text-left"
    dark
    max-width="100%"
    rounded
    @click="selectPost(p_id), viewComment()"
    v-bind:href="'/post/'+p_id"
  >
    <v-list-item-avatar color="grey darken-3 ml-3">
      <v-img
        class="elevation-6"
        alt=""
        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
      ></v-img> </v-list-item-avatar
    ><b>User</b
    ><v-list-item-action-text class="ml-2"
      ><v-icon size="12px">mdi-clock-time-four</v-icon>
      {{ timeP }}</v-list-item-action-text
    >
    <v-divider class=""></v-divider>
    <v-card-title
      ><center>
        <b>{{ post }}</b>
      </center></v-card-title
    >
    <v-divider class="mr-5 ml-5"></v-divider>
    <div light v-for="comM in comments_Data" :key="comM">
      ID {{ comM.c_id }} ข้อมูล {{ comM.comment }}
    </div>
    <v-card-text class="text-center">
      <v-dialog :v-model="showComment" width="95%" dark>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text block v-bind="attrs" v-on="on">
            <v-icon>mdi-comment</v-icon> คอมเมน
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h4"
              ><b>{{ post }}</b></span
            >
          </v-card-title>
          <v-card-subtitle class="mt-1"
            ><v-icon size="18px">mdi-account</v-icon> User
            <v-icon size="18px">mdi-clock-time-eight</v-icon>
            {{ timeP }}</v-card-subtitle
          >
          <v-divider class="mr-5 ml-5 mb-5"></v-divider>
          <v-card-text>
            <v-list-item-action-text>
              <v-text-field
                v-model="textC"
                clear-icon="mdi-close-circle"
                outlined
                clearable
                label="Message"
                type="text"
              ></v-text-field
            ></v-list-item-action-text>
            <v-list-item-action-text
              ><v-btn block @click="addComment()"
                >โพสต์</v-btn
              ></v-list-item-action-text
            >
          </v-card-text>
        </v-card>
      </v-dialog>
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