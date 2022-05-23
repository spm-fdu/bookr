<template>
  <v-container fluid class="bookr__signup ml-8 mr-8 mt-16 mb-16">
    <v-row class="text-center justify-center align-center">
      <v-col cols="5">
        <img src="../static/join.svg" :style="`pointer-events:none`"/>
      </v-col>
      <v-col cols="5">
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
  middleware: 'authenticated'
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