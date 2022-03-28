<template>
  <div>
     <div class="header__login text-overline text-right pt-10 pr-16 text-decoration-none" v-show="!persisted.authenticated">
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
    </div>
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
  color: grey;
}
.header__login a:hover { 
  color: #3b47ec
}
</style>