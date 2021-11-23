<template>
  <div class="post">
    <center>
      <v-card dark class="mt-5 mb-5 text-left" width="95%" height="98%">
        <v-list-item-avatar color="grey darken-3 ml-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png"
          ></v-img> </v-list-item-avatar
        ><b>{{posts.post}}</b
        ><v-list-item-action-text class="ml-2"
          >สร้างเมื่อ
          {{ posts.timeP }}</v-list-item-action-text
        >
        <v-divider class="mt-2 mb-2"></v-divider>
        <!-- คอมเม้น -->
        <v-responsive
      max-width="100%"
      class="mx-auto"
    >
          <div v-for="item in comments_Data" :key="item">
            <v-card light class="mx-5 mb-3">
                <v-list-item-avatar color="grey darken-3 ml-3">
                  <v-img
                    class="elevation-6"
                    alt=""
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img> </v-list-item-avatar
                ><b>Test User</b
                ><v-list-item-action-text class="ml-2"
                  ><v-icon size="12px">mdi-clock-time-four</v-icon>
                  {{ item.timeC }}</v-list-item-action-text
                > <b>:</b> {{ item.comment }}
            </v-card>
          </div>
        </v-responsive>
        <!-- จบคอมเม้น -->

        <v-divider class="mr-5 ml-5 mb-5 mt-5"></v-divider>
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
    </center>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { firestore } from "@/firebase";
import Post from "@/components/Posts/Post.vue";

const detail_Post = Vue.extend({
  props: {
    p_id: String,
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
    Post,
  },
})
export default class ViewComment extends detail_Post {
  post_id = "";
  posts = {};
  comments_Data: dataComment[] = [];
  textC = "";

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
  setData() {
    this.post_id = this.p_id;
    this.getDeteilPost();
    this.getDeteilComment();
  }
  getDeteilPost() {
    firestore
      .collection("posts")
      .doc(this.post_id)
      .onSnapshot((querySnapshot) => {
        console.log("data = "+querySnapshot.data().post);
        this.posts = {
          p_id: querySnapshot.data().p_id,
  post: querySnapshot.data().post,
  timeP: querySnapshot.data().timeP,
  post_Status: querySnapshot.data().post_Status,
        };
      });
  }
  getDeteilComment() {
    firestore
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((querySnapshot) => {
        this.comments_Data = [];
        querySnapshot.forEach((doc) => {
          if (doc.data()["post_id"] == this.p_id) {
            this.comments_Data.push({
              c_id: doc.id,
              comment: doc.data()["comment"],
              timeC: doc.data()["timeC"],
              post_id: doc.data()["post_id"],
            });
          }
          console.log("Comment = " + this.comments_Data);
        });
      });
  }
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

  mounted() {
    this.setData();
  }
}
</script>
