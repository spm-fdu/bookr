<template>
  <div class="footer">
    <img src="../static/footer.svg" object-fill style="width:100%; height:100%; background-color:white; pointer-events:none;">
    <div class="footer__content">
      <v-row style="background-color: #f9fafb">
        <v-col md="6" class="ml-md-auto" v-if="$vuetify.breakpoint.mdAndUp">
          <v-card flat style="background-color: #f9fafb" class="pa-16">
            <v-card-text tile class="text-justify">{{ description }}</v-card-text>
          </v-card>
        </v-col>
        <v-col :md="$vuetify.breakpoint.mdAndUp ? 4 : 12" class="ml-md-auto">
          <v-card flat style="background-color: #f9fafb" class="pa-16">
            <v-card-text>
              <template v-for="(link, index) in links" >
                <router-link v-if="$vuetify.breakpoint.mdAndUp" :to="link.href" :key="index" :nuxtChildKey="$route.fullPath" class="footer__links ml-4 mr-4">{{ link.label }}</router-link>
                <router-link v-else :to="link.href" :key="$route.fullPath && index" class="footer__links ml-4 mr-4">
                  <v-btn icon large class="footer__icons"><v-icon>{{ link.icon }}</v-icon></v-btn>
                </router-link>
              </template>
            </v-card-text>
            <!-- <v-card-text>
              <v-btn></v-btn>
            </v-card-text> -->
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PageFooter',

    data () {
      return {
        description: "Bookr. is a platform that allows Fudan students to book a specific seat around the campus.",
        links: [
          {
            icon: 'mdi-home',
            label: 'home',
            href: '/'
          },
          {
            icon: 'mdi-account-group',
            label: 'about us',
            href: 'about'
          },
          {
            icon: 'mdi-at',
            label: 'contact us',
            href: 'contact'
          },

        ],  

        icons: [
          {
            icon: 'mdi-home',
            label: 'home'
          },
          {
            icon: 'mdi-home',
            label: 'about us'
          },
          {
            icon: 'mdi-phone',
            label: 'contact us'
          }
        ],
        padless: true,
        variant: 'default',
      }
    },
    computed: {
      localAttrs () {
        const attrs = {}
        if (this.variant === 'default') {
          attrs.absolute = false
          attrs.fixed = false
        } else {
          attrs[this.variant] = true
        }
        return attrs
      },
    },
  }
</script>

<style>
  .footer { 
    margin-top: auto;
  }
  .footer__links {
    text-decoration: none;
    color: #3b47ec !important;
  }
  .footer__icons :hover {
    color: #3b47ec !important;
  }

  .test__class {
    white-space: nowrap ;
    word-break: normal;
    overflow: hidden ;
    text-overflow: ellipsis;
  }
</style>