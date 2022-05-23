<template>
  <div>
    <v-row>
      <v-col>
        <!-- <nuxt-link to="/" class="text-decoration-none" style="color:black"> -->
          <h1 class="text-left pt-5 pl-16 font-weight-black">
            <nuxt-link to="/" class="text-decoration-none" style="color:black">
            fdu//bookr.</nuxt-link>
            <v-chip label small v-if="persisted.admin" class="text-overline" color="indigo" text-color="white">admin</v-chip>
            <!-- <v-chip label v-else-if="!persisted.admin">user</v-chip> -->
          </h1>
        <!-- </nuxt-link> -->
      </v-col>
      <v-col class="header__login text-overline text-right pt-10 pr-16 text-decoration-none" v-show="!persisted.authenticated">
        <span>
          <nuxt-link to="/signup" class="text-overline text-decoration-none">sign up</nuxt-link>
        </span>
        <span>/</span>
        <span>
          <nuxt-link to="/login" class="text-overline text-decoration-none">login</nuxt-link>
        </span>
      </v-col>
      <v-col class="text-overline text-right pt-10 pr-16" v-show="persisted.authenticated">
        <bookr-menu-popup></bookr-menu-popup>
      </v-col>
    </v-row>
     <!-- <div class="header__login text-overline text-right pt-10 pr-16 text-decoration-none" v-show="!persisted.authenticated">
        <span>
          <nuxt-link to="/signup" class="text-overline text-decoration-none">sign up</nuxt-link>
        </span>
        <span>/</span>
        <span>
          <nuxt-link to="/login" class="text-overline text-decoration-none">login</nuxt-link>
        </span>
    </div>
    <div class="text-overline text-right pt-10 pr-16" v-show="persisted.authenticated">
      <bookr-menu-popup></bookr-menu-popup>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BookrMenuPopup from '../components/BookrMenuPopup.vue'

export default {
  components: {
    BookrMenuPopup
  },
  computed: {
    ...mapState(['persisted'])
  },
  watch: {
    persisted: {
      handler(nv) {
        return nv
      },
      deep: true,
      immediate: true
    }
  },
}
</script>

<style>
.header__login a { 
  transition: 0.3s;
  color: grey !important;
}
.header__login a:hover { 
  color: #3b47ec !important;
}
</style>