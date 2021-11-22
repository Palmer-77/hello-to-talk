<template>
  <div class="talk">
    <center>
      <v-card class="mx-auto mr-5 ml-5 mb-5 mt-5" dark max-width="100%" rounded>
        <v-list-item-avatar color="grey darken-3 ml-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img> </v-list-item-avatar
        ><v-list-item-action-text>
          <v-dialog
            transition="dialog-top-transition"
            max-width="100%"
            v-model="showDialog"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                rounded
                dense
                class="ml-2 mr-2 mb-2 mt-2"
                outlined
                width="94%"
              >
                โพสต์สิ่งที่คุณต้องการถาม
              </v-btn>
            </template>

            <template v-slot:default>
              <v-card>
                <v-toolbar dark><b>โพสต์</b></v-toolbar>
                <v-container fluid>
                  <v-textarea
                    label="คุณคิดอะไร"
                    auto-grow
                    outlined
                    rows="6"
                    row-height="15"
                    v-model="textP"
                  ></v-textarea>
                </v-container>
                <v-card-actions class="justify-end">
                  <v-row>
                    <v-col>
                      <v-btn
                        :disabled="!textP"
                        block
                        dark
                        max-width="90%"
                        @click="addPost()"
                      >
                        โพสต์
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-btn text @click="(showDialog = false), clenText()"
                    >ยกเลิก</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-list-item-action-text>
      </v-card>
    </center>
    <v-divider class="mt-5"></v-divider>
    <div v-for="postText in posts" :key="postText">
      <Post
        :p_id="postText.p_id"
        :post="postText.post"
        :timeP="postText.timeP"
        :post_Status="postText.post_Status"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { firestore } from "@/firebase";
import Post from "@/components/Posts/Post.vue";

interface dataPost {
  p_id: string;
  post: string;
  timeP: string;
  post_Status: boolean;
}

@Component({
  components: {
    Post,
  },
})
export default class Talk extends Vue {
  posts: dataPost[] = [];
  textP = "";
  form = false;
  date = "";
  time = "";
  year = "";
  timestamp = "";
  fulldatetime = "";
  showDialog = false;
  show = false;
  p_id = "";

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

  clenText() {
    this.textP = "";
  }

  //เรียกโพสต์
  getPosts() {
    try {
      firestore
        .collection("posts").orderBy("timestamp","desc")
        .onSnapshot((querySnapshot) => {
          this.posts = [];
          querySnapshot.forEach((doc) => {
            this.posts.push({
              p_id: doc.id,
              post: doc.data()["post"],
              timeP: doc.data()["timeP"],
              post_Status: doc.data()["post_Status"],
            });
            this.p_id = doc.id;
            
          });
        });
    } catch (e) {
      console.log(e);
    }
  }

  addPost() {
    this.showDialog = false;

    try {
      firestore
        .collection("posts")
        .add({
          post: this.textP,
          timeP: this.rintDate() + " " + this.printTime(),
          post_Status: true,
          timestamp: this.printFullDate(),
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          firestore
            .collection("posts")
            .doc(docRef.id)
            .update({
              p_id: docRef.id,
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
    this.clenText();
  }

  mounted() {
    this.getPosts();
    this.date = this.rintDate();
    this.time = this.printTime();
    this.timestamp = "" + this.printTimestamp();
    this.year = "" + this.printYear();
    this.fulldatetime = "" + this.printFullDate();
    console.log(this.date);
    console.log(this.time);
    console.log(this.timestamp);
    console.log(this.year);
    console.log(this.fulldatetime);
  }
}
</script>