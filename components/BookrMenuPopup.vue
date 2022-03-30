<template>
  <div>
    <v-menu
      left
      v-model="menu"
      offset-x
      content-class="elevation-1"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab depressed small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-card width="270px">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img
                src="../static/male.svg"
                alt="avatar"
              >
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ name }}</v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
            </v-list-item-content>

          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content class="text-overline">
              <nuxt-link :to="item.to" class="text-decoration-none ">{{ item.label }}</nuxt-link>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>

export default {
  name: 'BookrMenuPopup',
  data () {
    return {
      menu: false,
      name: '',
      email: '',
      items: [
        {
          to: 'profile',
          icon: 'mdi-account',
          label: 'manage profile'
        },
        {
          to: 'booking',
          icon: 'mdi-clipboard-list-outline',
          label: 'manage bookings'
        },
        {
          to: 'logout',
          icon: 'mdi-logout-variant',
          label: 'logout'
        }
      ]
    }
  },
  mounted () {
    this.name = `${this.$store.state.persisted.fname} ${this.$store.state.persisted.lname}`;
    this.email = this.$store.state.persisted.email;
  }
}
</script>