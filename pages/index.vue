<template>
  <v-container fluid fill-height>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <h1 class="page__title">
          <span>fdu</span>//bookr.
        </h1>
        <h4 class="subheading font-weight-light"> 
          reserve your seat(s) today!
        </h4>
      </v-col>
      <v-col class="text-center mt-6">
        <nuxt-link :key="$router.fullPath" to="booking">
          <v-btn depressed outlined rounded class="pl-9 pr-9" color="#3b47ec">
            reserve
          </v-btn>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // middleware: 'authenticated',
  middleware ({ store, redirect }) {
    if (store.getters.persisted.authenticated) {
      return redirect('/dashboard');
    } else {
      return Promise.resolve()
    }
  },
}
</script>

<style lang="scss">
  .page__title {
    font-family: 'Playfair-Display', serif;
    font-weight: 600;
  }

  @media (min-width: $large-screen-size) {
    .page__title {
      font-size: 6em
    }
  }
  @media (min-width: $medium-screen-size) {
    .page__title {
      font-size: 8em
    }
  }
  @media (max-width: $small-screen-size) {
    .page__title {
      font-size: 10em;
    }
  }

</style>