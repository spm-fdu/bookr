<template>
  <v-container fluid class="bookr__reset ml-8 mr-8 mt-16 mb-16">
    <v-row class="text-center justify-center align-center">
      <v-col cols="7">
        <img src="../static/reset.svg" :style="`pointer-events:none`"/>
      </v-col>
      <v-col cols="5" >
        <bookr-reset></bookr-reset>
      </v-col>
    </v-row>
    </v-container>
</template>

<script>
import BookrReset from '../components/BookrReset.vue'
// import { mapState, mapActions } from 'vuex';

export default {
  components: {
    BookrReset,
  },
  middleware: 'authenticated'
  // mounted () {
  //   // route guard
  //   this.verifyLoginStatus();
  // },
  // computed: {
  //   ...mapState(['persisted'])
  // },
  // methods: {
  //   ...mapActions(['persist'])
  // },

  // mounted () {
  //   if ((this.persisted.authenticated === true) && (this.persisted.email.length > 0)) {
  //     const payload = {
  //       fname: this.persisted.fname,
  //       lname: this.persisted.lname,
  //       email: this.persisted.email,
  //       authenticated: this.persisted.authenticated
  //     }
  //     this.persist(payload)
  //     this.$router.push('/dashboard')
  //     // this.$store.state.persisted.fname = this.persisted.fname;
  //     // this.$store.state.persisted.lname = this.persisted.lname;
  //     // this.$store.state.persisted.email = this.persisted.email;
  //     // this.$store.state.persisted.authenticated = this.persisted.authenticated;
  //   } else {
  //     console.log(this.persisted)
  //   }
  // },
  // methods: {
  //   verifyLoginStatus () {
  //     if (this.$fire.auth.currentUser) {
  //       this.$router.push('/dashboard');
  //     }
  //   }
  // }
}
</script>

<style>

</style>