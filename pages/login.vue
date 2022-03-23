<template>
  <v-container fluid fill-height class="bookr__login ml-8 mr-8">
    <v-row class="text-center justify-center align-center">
      <v-col cols="7">
        <img src="../static/login.svg" :style="`pointer-events:none`"/>
      </v-col>
      <v-col cols="5" >
        <bookr-login></bookr-login>
      </v-col>
    </v-row>
    </v-container>
</template>

<script>
import BookrLogin from '../components/BookrLogin.vue'

export default {
  components: {
    BookrLogin,
  },
  mounted () {
    // route guard
    this.verifyLoginStatus();
  },
  methods: {
    verifyLoginStatus () {
      if (this.$fire.auth.currentUser) {
        this.$router.push('/dashboard');
      }
    }
  }
}
</script>

<style>

</style>