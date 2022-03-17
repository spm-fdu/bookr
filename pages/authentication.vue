<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <h1 class="page__title"><span>Auth</span>.</h1>
        <h4 class="subheading font-weight-light">Testing authentication.</h4>
      </v-col>
      <v-col class="text-center mt-6">
        <nuxt-link :key="$router.fullPath" to="./">
          <v-btn depressed outlined rounded class="pl-9 pr-9" color="#3b47ec">
            Home
          </v-btn>
        </nuxt-link>
        <create-user ref="create_user"></create-user>
        <v-btn @click="$refs.create_user.createUser()" depressed outlined rounded class="pl-9 pr-9" color="#3b47ec">
          Register
        </v-btn>
        <div id="example"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CreateUser from "../components/CreateUser.vue";
export default {
  name: "Authentication",
  components: {
    'create-user': CreateUser
  }
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