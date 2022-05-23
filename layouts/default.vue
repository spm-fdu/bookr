<template>
  <v-app>
    <v-main>
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
        <PageHeader />
      <!-- <v-container> -->
        <Nuxt keep-alive :keep-alive-props="{ max: 5 }"/>
        <PageFooter />
      <!-- </v-container> -->
    </v-main>
  </v-app>
</template>


<script>
import PageFooter from '../components/PageFooter.vue'
import PageHeader from '../components/PageHeader.vue'

export default {
  name: 'DefaultLayout',
  components: {
    PageFooter, 
    PageHeader
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
}
</script>

<style lang="scss" scoped>
  html * {
    background-color: white;
  }
  body {
    display: flex;
    flex-direction: column;
  }
</style>