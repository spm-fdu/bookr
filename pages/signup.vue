<template>
  <v-container fluid fill-height class="bookr__signup ml-8 mr-8">
    <v-row class="text-center justify-center align-center">
      <v-col cols="7">
        <img src="../static/signup.svg" :style="`pointer-events:none`"/>
      </v-col>
      <v-col cols="5" >
        <bookr-sign-up></bookr-sign-up>
      </v-col>
    </v-row>
    </v-container>
</template>

<script>
import BookrSignUp from '../components/BookrSignUp.vue'

export default {
  components: {
    BookrSignUp
  },
};
</script>

<style lang="scss">
.page__title {
  font-family: "Playfair-Display", serif;
  font-weight: 600;
}

@media (min-width: $large-screen-size) {
  .page__title {
    font-size: 6em;
  }
}
@media (min-width: $medium-screen-size) {
  .page__title {
    font-size: 8em;
  }
}
@media (max-width: $small-screen-size) {
  .page__title {
    font-size: 10em;
  }
}
</style>