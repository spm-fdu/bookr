<template>
  <div>
    <v-menu
      left
      v-model="menu"
      offset-x
      content-class="elevation-1"
      :close-on-content-click="true"
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
              <v-list-item-subtitle class="ml-2">{{ email }}</v-list-item-subtitle>
            </v-list-item-content>

          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item-group color="indigo">

            <v-list-item v-for="(item, index) in items" :key="index" class="menu-item" :to="item.to">
              <v-list-item-icon class="ml-2">
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content class="text-overline" >
                <span>{{ item.label }}</span>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
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
      email: '',
      userItems: [
        {
          to: 'booking',
          icon: 'mdi-clipboard-list-outline',
          label: 'make booking'
        },
        {
          to: 'manage',
          icon: 'mdi-clipboard-list-outline',
          label: 'manage booking'
        },
        {
          to: 'dashboard',
          icon: 'mdi-chart-line',
          label: 'dashboard'
        },
      ],
      items: [
        {
          to: 'profile',
          icon: 'mdi-account',
          label: 'manage profile'
        },
        {
          to: 'logout',
          icon: 'mdi-logout-variant',
          label: 'logout'
        }
      ]
    }
  },
  computed: {
    name () {
      if ((this.$store.state.persisted.fname.length > 0) && (this.$store.state.persisted.lname.length > 0)) { 
        return `${this.$store.state.persisted.fname} ${this.$store.state.persisted.lname}`;
      } else { 
        return ''
      }
    }
  },
  created () {
    this.email = this.$store.state.persisted.email;

    if (this.$store.state.persisted.admin === true) {
      this.items.unshift({
        to: 'admin',
        icon: 'mdi-crown-outline',
        label: 'admin portal'
      })
    } else {
      this.items = this.userItems.concat(this.items);
    }
  }
}
</script>

<style>
.menu-item:hover * {
  color: #3F51B5 !important;
}
</style>