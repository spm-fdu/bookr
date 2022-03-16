<template>
  <!-- <v-app dark class="ma-auto"> -->

    <v-container fill-height>
      <v-row>
        <v-col class="text-center">

              <img class="error__img" src="../static/404.svg"/>
              <v-spacer class="mt-16 mb-16"></v-spacer>
              <!-- <v-spacer class="mt-16 mb-16"></v-spacer>
              <v-spacer class="mt-16 mb-16"></v-spacer> -->


            <div class="error__link">
        
              <h1 v-if="error.statusCode == 404">{{ pageNotFound }}</h1>
              <h1 v-else>{{ otherError }}</h1>
              <nuxt-link to="/"><v-btn depressed class="ma-6" style="text-decoration: none; color: #3b47ec;">Take me home!</v-btn></nuxt-link>
              
            </div>
        </v-col>
      </v-row>

    </v-container>


    <!-- <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink> -->
  <!-- </v-app> -->
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404',
      otherError: 'An error occurred'
    }
  },
  computed: {
    width () {
      return  (process.client) ? window.innerWidth * 9 : null
    },
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
/* figure {
  position: absolute;
  top: -242px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
} */

 h1 {
   font-size: 120px;
  /* margin-bottom: 22px;
  color: #000;
  font-size: 120px;
  font-weight: bold;
  line-height: 100%; */
} 
/* section {
  display: flex;
      margin-top: 180px;
      position: relative;
      align-items: center;
      flex-direction: column;
      text-align: center;
    } */
  .error__img {
    position:absolute; 
    top: 18%; 
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    }
</style>
