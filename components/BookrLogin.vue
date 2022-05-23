<template>
    <v-card elevation="1" class="pa-4 rounded justify-center" width="500" height="550" max-width="500">
      <v-card-title class="login__title justify-center font-weight-bold">{{ title }}</v-card-title>
      <v-spacer class="ma-6"></v-spacer>
      <!-- <v-card-subtitle class="pt-2 mb-4">{{ subtitle }}</v-card-subtitle> -->

      <v-text-field 
        v-model="credentials.uid" 
        :label="labels.uid" 
        :rules="[required,validateEmailPhone]"
        outlined :loading="spin"
        class="ml-16 mr-16" 
        color="#3b47ec"
        ></v-text-field>
      <v-spacer></v-spacer>
      <v-text-field 
        v-model="credentials.pwd" 
        :label="labels.pwd" 
        :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPwd ? 'text' : 'password'"
        :rules="[required,validatePasswordLength]"
        outlined :loading="spin"
        class="ml-16 mr-16" 
        color="#3b47ec"
        @click:append="showPwd = !showPwd"
        @keypress.enter="login()"
        ></v-text-field>
      <v-row>
        <v-col>
          <v-card-text class="login__reset ma-0 pl-16 pa-0 text-left"><nuxt-link to="signup" class="text-overline text-decoration-none">new user?</nuxt-link></v-card-text>
        </v-col>
        <v-col>
          <v-card-text class="login__reset ma-0 pr-16 pa-0 text-right"><nuxt-link to="reset" class="text-overline text-decoration-none">Forget password?</nuxt-link></v-card-text>
        </v-col>
      </v-row>
      <v-spacer class="mb-8"></v-spacer>
      <v-btn depressed class="pl-16 pr-16" :disabled="disabled.both || disabled.email || disabled.pwd" @click="login()">login</v-btn>
      <v-divider class="login__short_divider "></v-divider>

      <v-btn fab depressed x-small class="ml-4 mr-4" v-for="(i,index) in social" :key=index>
        <v-icon>{{ i.icon }}</v-icon>
      </v-btn>
    </v-card>
</template>

<script>
// import { GoogleAuthProvider } from 'firebase/auth'
// const provider = new GoogleAuthProvider();

// import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";

import { mapActions, mapState } from 'vuex';


export default {
  name: 'Login',
  data () {
    return {
      title: 'Sign In',
      labels: {
        uid: 'Email or phone number',
        pwd: 'Password',
      },
      credentials: {
        uid: '', 
        pwd: '',
      },
      social: [
        // {
        //   icon: 'mdi-facebook'
        // },
        {
          icon: 'mdi-google'
        }
      ],
      disabled: {
        both: true,
        email: true,
        pwd: true,
      }, 
      showPwd: false,
      spin: false,
      
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
        this.disabled.both = true;
        return 'Required'
      } else {
        this.disabled.both = false;
        return true
      }
    },
    validateEmailPhone (value) {
      let eReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      let pReg = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/
      
      if(eReg.test(value) || pReg.test(value)) {
        this.disabled.email = false;
        return true
      } else {
        this.disabled.email = true;
        return "Please enter a valid email address or phone number (+country code)"
      }
    },
    validatePasswordLength (value) {
      if (value.length < 8) {
        this.disabled.pwd = true;
        return "Min. 8 characters"
      } else {
        this.disabled.pwd = false; 
        return true
      }
    },
    async login () {
      this.spin = true; 
      // set persistence on auth; requires explicit sign out or token expiration 
      await this.$fire.auth.setPersistence(this.$fireModule.auth.Auth.Persistence.LOCAL).then(() => {
        this.$fire.auth.onAuthStateChanged((user) => {
          if (user) {
            // if login, retrieve name 
            let displayName = user._delegate.displayName !== null ? user._delegate.displayName.split(' ') : '';
            
            // retrieve user role 
            this.$fire.firestore.collection("users").doc(user._delegate.uid).get().then((snapshot) => {
              const userInfo = {
                fname: displayName.length > 0 ? displayName[0] : '',
                lname: displayName.length > 0 ? displayName[1] : '',
                uid: user._delegate.uid,
                email: user._delegate.email,
                admin: snapshot.data()['admin'], 
                authenticated: true,
                lastSignInTime: user._delegate.metadata.lastSignInTime
              }
  
              this.persist(userInfo);
              this.$store.commit("setDatabaseUid", user._delegate.uid);
              
              if (this.$store.state.persisted.admin) {
                this.$router.push('/admin');
              } else {
                // reroute
                this.$router.push('/dashboard'); 
              }
            });

          } else {
            return this.$fire.auth.signInWithEmailAndPassword(this.credentials.uid, this.credentials.pwd).catch((e) => {
              this.labels.pwd = "The credentials you provided doesn't match the record of our database."
            });
          }
        })
      })

      // this.$fire.auth.signInWithEmailAndPassword(this.credentials.uid, this.credentials.pwd)
      //   .then((userCredential) => {
      //     const user = userCredential.user;
      //     console.log(user.email);
      //     this.$store.commit("setDatabaseUid", user.uid);
      //     console.log("Database uid is: ", this.$store.state.databaseUid);
      //   })
      //   .catch((error) => {
      //     console.log(error.code, error.message);
      //   });

      // this.$router.push('/dashboard');

      this.spin = false;
    },
    handleLoginError (value) {
      if (typeof(value) !== Boolean) {
        return true 
      } else {
        this.labels.pwd = "The credentials you provided doesn't match the record of our database."
        return false
      }
    },
    resetPassword () {
      // todo 
    }
  },
}
</script>

<style>
.login__title {
  font-size: 2.5rem !important;
}
.login__input {
  background-color: #f7f7f7;
  border-radius: 20%;
}
.login__reset a { 
  transition: 0.3s;
  color: lightgrey;
}
.login__reset a:hover { 
  color: #3b47ec
}
.login__short_divider {
  margin: 45px 100px 45px 100px;
}
</style>