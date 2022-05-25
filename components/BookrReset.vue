<template>
    <v-card elevation="1" class="pa-4 rounded justify-center" width="500" height="550" max-width="500">
      <v-card-title class="reset__title justify-center font-weight-bold">{{ title }}</v-card-title>
      <v-spacer class="ma-6"></v-spacer>

      <v-text-field
        v-model="credentials.uid"
        :label="labels.uid"
        :rules="[required,validateEmail]"
        outlined :loading="spin"
        class="ml-16 mr-16"
        color="#3b47ec"
        ></v-text-field>

      <v-spacer class="mb-8"></v-spacer>
      <v-btn depressed class="pl-16 pr-16" :disabled="disabled.email" @click="sendEmailPasswordReset()">send email</v-btn>
      <v-divider class="reset__short_divider "></v-divider>

    </v-card>
</template>

<script>

import { mapActions, mapState } from 'vuex';

export default {
  name: 'Reset',
  data () {
    return {
      title: 'Recover Password',
      labels: {
        uid: 'Email'
      },
      credentials: {
        uid: '',
      },
      disabled: {
        email: true
      },
      spin: false
    }
  },
  computed: {
    // ...mapState(['persisted'])
  },
  // mounted() {
  //   if (this.persisted !== null) {
  //     this.
  //   }
  // },
  methods: {
    ...mapActions(['persist']),
    required (value) {
      if (!value) {
        this.disabled.email = true;
        return 'Required'
      } else {
        this.disabled.email = false;
        return true
      }
    },
    validateEmail (value) {
      let eReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

      if(eReg.test(value)) {
        this.disabled.email = false;
        return true
      } else {
        this.disabled.email = true;
        return "Please enter a valid email address or phone number (+country code)"
      }
    },
    async sendEmailPasswordReset () {
      this.spin = true;

      this.$fire.auth.sendPasswordResetEmail(this.credentials.uid).then(() => {
        console.log("Password reset email sent.");
      }).catch((error) => {
        console.log(error.message);
      });

      this.spin = false;
    },
  },
}
</script>

<style>
.reset__title {
  font-size: 2.5rem !important;
}
.reset__input {
  background-color: #f7f7f7;
  border-radius: 20%;
}
.reset__reset a {
  transition: 0.3s;
  color: lightgrey;
}
.reset__reset a:hover {
  color: #3b47ec
}
.reset__short_divider {
  margin: 45px 100px 45px 100px;
}
</style>