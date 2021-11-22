<template>
  <v-app>
    <v-tabs
      dark
      background-color="dark"
      grow
    >
      <v-tab to="/">
          <v-icon size="24px">mdi-home</v-icon>
      </v-tab>

      <v-tab to="/talk">
          <v-icon size="24px">mdi-email</v-icon>
      </v-tab>

      <v-tab to="/about">
      <v-icon size="24px">mdi-account-circle</v-icon>
      </v-tab>
    </v-tabs>

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->

      <!-- If using vue-router -->
      <router-view/>
  </v-main>

  <v-footer 
    dark
    >
    <v-card
      flat
      tile
      class=" lighten-1 white--text text-center mt-1"
      style="width: 100%"
    >
      <v-card-text>
        <v-btn
          class="mx-4 white--text"
          icon
          href="https://www.facebook.com/BSPHOTOSHOT"
        >
          <v-icon size="24px">
            mdi-facebook
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-4 white--text"
          icon
          href="https://www.instagram.com/palm.f.0.0/"
        >
          <v-icon size="24px">
            mdi-instagram
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
       เว็บนี้ทำขึ้นเพื่อทดสอบการเขียน Vue js แล้วฝึกฝีมือ 
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        <strong>© {{ new Date().getFullYear() }}  Poendittha Tech.</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</v-app>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

interface data_Icon_and_link {
  icon:string,
  link:string,
}

@Component({
  components: {
  },
})
export default class App extends Vue {
  soC:data_Icon_and_link[] = []
  
  mounted() {
    this.soC = [{icon:'mdi-facebook',link:'https://www.facebook.com/BSPHOTOSHOT'},{icon:'mdi-instagram',link:'https://www.instagram.com/palm.f.0.0/'}]
  }
}
</script>
