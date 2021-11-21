<template>
  <v-container>
    <div light v-for="comM in comments_Data" :key="comM">
      ID {{ comM.c_id }} ข้อมูล {{ comM.comment }}
    </div>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { firestore } from "@/firebase";

const detail_Comment = Vue.extend({
  props: {
    p_id: String,
  },
});

interface dataComment {
  c_id: string;
  comment: string;
  timeC: string;
  post_id: string;
}

export default class Comment extends detail_Comment {
  comments_Data: dataComment[] = [];
  post_id = "";

  setDataComment() {
    this.post_id = this.p_id;
      firestore
        .collection("comments")
        .where("post_id", "==", this.post_id)
        .onSnapshot((querySnapshot) => {
          this.comments_Data = [];
          querySnapshot.forEach((doc) => {
            this.comments_Data.push({
              c_id: doc.id,
              comment: doc.data()["comment"],
              timeC: doc.data()["timeC"],
              post_id: doc.data()["post_id"],
            });
            console.log(doc.id);
          });
        });
    
  }

  mounted() {
    this.setDataComment();
  }
}
</script>