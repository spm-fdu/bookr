<template>
  <v-card
    elevation="2"
    class="pa-12 pb-6 ml-10 rounded-xl justify-center align-center"
    max-width="650px"
  >
    <v-card-title class="signup__title justify-center font-weight-bold">{{ title }}</v-card-title>
    <v-spacer class="ma-6"></v-spacer>

    <div v-show="verification.phone.sent" class="text-center pa-4">
      <v-otp-input v-model="verification.phone.otp" length="6" type="number" class="pa-10"></v-otp-input>
      <div id="recaptcha-container" class="ma-10"></div>
      <v-btn depressed class="text-overline" @click="verifyOTP(verification.phone.otp)">submit</v-btn>
    </div>

    <v-snackbar v-model="snackbar" timeout="-1" top>
      Account created successfully! Redirecting to login page...
    </v-snackbar>


    <!-- Sign Up Information -->
    <div v-show="!verification.phone.sent">
      <v-row class="d-flex flex-wrap ma-0">
        <v-col sm="12" md="12" lg="6" class="pt-0">
          <v-card-text class="pt-0">First Name</v-card-text>
          <v-text-field
            dense
            v-model="user.fname"
            :rules="[required]"
            outlined
            class="rounded-lg"
            color="#3b47ec"
          >
          </v-text-field>
        </v-col>
        <v-col sm="12" md="12" lg="6" class="pt-0">
          <v-card-text class="pt-0">Last Name</v-card-text>
          <v-text-field
            dense
            v-model="user.lname"
            :rules="[required]"
            outlined
            class="rounded-lg"
            color="#3b47ec"
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-row class="d-flex flex-wrap ma-0">
        <v-col sm="12" md="12" lg="6" class="pt-0">
          <v-card-text class="pt-0">Email</v-card-text>
          <v-text-field
            dense
            v-model="user.uid"
            :rules="[required, validateEmailPhone]"
            outlined
            :loading="spin"
            class="rounded-lg"
            color="#3b47ec"
          ></v-text-field>
        </v-col>
        <v-col sm="12" md="12" lg="6" class="pt-0">
            <v-card-text class="v-card__text pt-0">Phone Number (optional)
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn fab depressed plain v-bind="attrs" v-on="on" x-small style="width:18px; height:18px; fontsize:0.625rem;"><v-icon>mdi-information-outline</v-icon></v-btn>
                </template>
                <span>Requires verification</span>
              </v-tooltip>
            </v-card-text>
          <v-text-field v-model="user.hp" dense outlined class="rounded-lg"></v-text-field>
        </v-col>
      </v-row>

      <v-row class="d-flex flex-wrap ma-0">
        <v-col sm="12" md="12" lg="6" class="pt-0 pb-0">
          <v-card-text class="pt-0">Password</v-card-text>
          <v-text-field
            dense
            v-model="user.pwd"
            :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPwd ? 'text' : 'password'"
            :rules="[required, validatePasswordLength]"
            outlined
            :loading="spin"
            class="rounded-lg"
            color="#3b47ec"
            @click:append="showPwd = !showPwd"
          ></v-text-field>
        </v-col>
        <v-col sm="12" md="12" lg="6" class="pt-0 pb-0">
          <v-card-text class="pt-0">Gender (optional)</v-card-text>
          <v-btn-toggle group color="#3b47ec" v-model="user.gender">
            <v-btn x-small outlined fab color="blue" value="m"><v-icon>mdi-gender-male</v-icon></v-btn>
            <v-btn x-small outlined fab color="pink" value="f"><v-icon>mdi-gender-female</v-icon></v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>

      <v-card-text class="login__reset pt-0">
        <v-row>
          <v-col>
            <nuxt-link to="/login" class="text-left text-overline text-decoration-none">Already have an account? </nuxt-link>
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-card-text>

      <div class="text-center mt-6">
        <v-btn
          depressed
          class="pl-16 pr-16"
          :disabled="disabled.all || disabled.email || disabled.pwd "
          @click="createUser()"
          >Create Account</v-btn
        >
      </div>

      <!-- <v-spacer class="mb-2"></v-spacer> -->
      <v-divider class="signup__short_divider"></v-divider>

      <div class="text-center">
        <v-btn
          fab
          depressed
          x-small
          class="ml-4 mr-4"
          v-for="(i, index) in social"
          :key="index"
          @click="signUpThirdParty(index)"
        >
          <v-icon>{{ i.icon }}</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- <v-card-text class="signup__reset ma-0 pr-16 pa-0 text-right" @click="resetPassword()" ><a class="text-overline">Forget password?</a></v-card-text> -->



    <!-- <v-dialog transition="dialog-bottom-transition" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          depressed
          class="pl-16 pr-16"
          v-bind="attrs"
          v-on="on"
          :disabled="disabled.email"
          @click="standardLoginType()"
          >Next</v-btn
        >
      </template>
      <template v-slot:default="dialog">
        <v-card v-if="std_login_type.email">
          <v-toolbar dark>Sign up with email</v-toolbar>

          <v-spacer class="mb-2"></v-spacer>

          <v-col align="center">
            <v-text-field
              v-model="credentials.pwd"
              :label="labels.pwd"
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPwd ? 'text' : 'password'"
              :rules="[required, validatePasswordLength]"
              outlined
              :loading="spin"
              class="ml-16 mr-16"
              color="#3b47ec"
              @click:append="showPwd = !showPwd"
            ></v-text-field>

            <v-spacer class="mb-6"></v-spacer>

            <v-btn
              depressed
              class="pl-16 pr-16"
              :disabled="disabled.both || disabled.email || disabled.pwd"
              @click="signUpEmail()"
              >Sign Up</v-btn
            >
          </v-col>

          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-if="std_login_type.phone">
          <v-toolbar dark>Sign up with phone number</v-toolbar>

          <v-spacer class="mb-2"></v-spacer>

          <v-col align="center">
            <v-btn
              depressed
              class="pl-16 pr-16"
              @click="
                showCaptcha();
                sendPhoneVerificationCode();
              "
              >Send code</v-btn
            >

            <v-spacer class="mb-6"></v-spacer>

            <div id="recaptcha-container"></div>

            <v-spacer class="mb-6"></v-spacer>

            <v-text-field
              v-model="credentials.ver_code"
              :label="labels.ver_code"
              :rules="[]"
              outlined
              :loading="spin"
              class="ml-16 mr-16"
              color="#3b47ec"
            ></v-text-field>

            <v-spacer class="mb-6"></v-spacer>

            <v-btn depressed class="pl-16 pr-16" @click="signUpMobile()"
              >Sign Up</v-btn
            >
          </v-col>

          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog> -->

    <!-- <v-spacer class="mb-8"></v-spacer>

    <v-dialog transition="dialog-bottom-transition" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn plain class="pl-16 pr-16" v-bind="attrs" v-on="on"
          >Forgot password?</v-btn
        >
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar dark>Forgot password?</v-toolbar>

          <v-spacer class="mb-2"></v-spacer>

          <v-col align="center">
            <v-text-field
              v-model="email_verification.uid"
              :label="'Email'"
              :rules="[required_send_password_email, validateEmail]"
              outlined
              :loading="spin"
              class="ml-16 mr-16"
              color="#3b47ec"
            ></v-text-field>
            <v-btn
              depressed
              class="pl-16 pr-16"
              :disabled="disabled.email_send_password"
              @click="sendPasswordReset(email_verification.uid)"
              >Send</v-btn
            >
          </v-col>

          <v-card-actions class="justify-end">
            <v-btn text @click="dialog.value = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog> -->

    <!-- <template fill-height>
      <v-row>
        <v-col cols="4" justify="center" align="center">
          <v-divider class="text-center"></v-divider>
        </v-col>
        <v-col cols="4">

          <v-card-text>or you can sign up</v-card-text>
        </v-col>
        <v-col cols="4">

        </v-col>
      </v-row>
    </template> -->

  </v-card>
</template>

<script>
// import {
//   getAuth,
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
//   sendPasswordResetEmail,
// } from "firebase/auth";

// firebase.auth.getAuth === this.$fire.auth._delegate

export default {
  name: "BookrSignUp",
  data() {
    return {
      title: "Sign Up",
      labels: {
        uid: "Email or phone number",
        pwd: "Password",
        ver_code: "Verification code",
      },
      user: {
        fname: '',
        lname: '',
        uid: '', // email
        pwd: '',
        hp: null, // phone number
        gender: null,
      },
      verification: {
        phone: {
          sent: false,
          otp: null
        }
      },
      verificationCodeSent: false,
      email_verification: {
        uid: "",
      },
      social: [
        {
          icon: "mdi-google",
        },
      ],
      disabled: {
        all: true,
        email: true,
        pwd: true,
        email_send_password: true,
      },
      std_login_type: {
        email: false,
        phone: false,
      },
      showPwd: false,
      spin: false,
      snackbar: false,
      timeout: 10
    };
  },
  // watch: {
  //   snackbar: {
  //     handler (v) {
  //       if (v) {
  //         setInterval(() => {
  //           if (this.timeout > 0) {

  //           }
  //         }, 1000)
  //         this.$router.push("/login")
  //       }
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    required(value) {
      if (!value) {
        this.disabled.all = true;
        return "Required";
      } else {
        this.disabled.all = false;
        return true;
      }
    },
    required_send_password_email(value) {
      if (!value) {
        this.disabled.email_send_password = true;
        return "Required";
      } else {
        this.disabled.email_send_password = false;
        return true;
      }
    },
    validateEmailPhone(value) {
      let eReg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      let pReg = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/;

      if (eReg.test(value) || pReg.test(value)) {
        this.disabled.email = false;
        return true;
      } else {
        this.disabled.email = true;
        return "Please enter a valid email address or phone number (+country code)";
      }
    },
    validatePasswordLength(value) {
      if (value.length < 8) {
        this.disabled.pwd = true;
        return "Min. 8 characters";
      } else {
        this.disabled.pwd = false;
        return true;
      }
    },
    validateEmail(value) {
      let eReg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

      if (eReg.test(value)) {
        this.disabled.email_send_password = false;
        return true;
      } else {
        this.disabled.email_send_password = true;
        return "Please enter a valid email address";
      }
    },
    isEmailOrPhoneNumber(value) {
      let eReg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      let pReg = /^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/;

      if (eReg.test(value)) {
        return "email";
      } else if (pReg.test(value)) {
        return "phone_number";
      }
      return "none";
    },
    async createUser() {
      await this.$fire.auth.createUserWithEmailAndPassword(this.user.uid, this.user.pwd)
      .then((res) => {
        // verifies mobile number

        if (this.user.hp) {
          // show captcha
          window.applicationVerifier = new this.$fireModule.auth.RecaptchaVerifier('recaptcha-container');

          // this.verification.phone.sent = true;
          this.sendPhoneVerificationCode(this.user.hp)
        }

        // when successfully created
        var userProfile = { displayName: `${this.user.fname} ${this.user.lname}` }

        this.$fire.firestore.collection("users").doc(res.user._delegate.uid).set({ 'admin': false })

        res.user.updateProfile(userProfile)
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push('/login')
        }, 5000)

      }).catch((e) => {
        console.log('Failed to update profile');
        console.log(`Error message: ${e}`);
        alert(`An unexpected error has occured: ${e}`)
        this.$router.go("/signup")
      });
      ;
    },
    async sendPhoneVerificationCode(mobile) {
      this.verification.phone.sent = true;
      this.$fire.auth.signInWithPhoneNumber(mobile, window.applicationVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    verifyOTP(otp) {
      window.confirmationResult.confirm(otp)
        .then(() => {
          // verified
          this.verification.phone.sent = false;

          // force relogout and ask user to login again
          this.$fire.auth.signOut(this.$fire.auth).then(() => {
            this.clearPersist();
            this.$router.push('/login');
          }).catch((e) => {
            console.log('Sign out failed.');
            console.log(`Error message: ${e}`);
          })
        }).catch((e) => {
          console.log('Failed to verify phone number.')
          console.log(`Error message: ${e}`)
        });
    },
    signUpMobile() {
      const code = this.$self.credentials.ver_code;
      console.log(code);
      window.confirmationResult
        .confirm(code)
        .then((result) => {
          const user = result.user;
          console.log(user);

          this.$fire.firestore.collection("users").doc(user.uid).set({});

          this.$router.push('/booking');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async signUpThirdParty(i) {
      switch (i) {
        case 0:
          const provider = new this.$fireModule.auth.GoogleAuthProvider();
          this.$fire.auth
            .signInWithPopup(provider)
            .then((result) => {
              let token = result.credential.accessToken;
              let user = result.user;
              console.log(token);
              console.log(user);

              this.$fire.firestore.collection("users").doc(user.uid).set({});

              this.$store.commit("setDatabaseUid", user.uid);

              console.log("Database uid is: ", this.$store.state.databaseUid);

              this.$router.push('/booking');
            })
            .catch((err) => {
              console.log(err);
            });
          break;
        default:
          break;
      }
    },
    showCaptcha() {
      // const auth = getAuth();
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        this.$fireModule.auth.getAuth()
      );
    },
    sendPasswordReset(email) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log("Password reset email sent");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    standardLoginType() {
      let result = this.isEmailOrPhoneNumber(this.credentials.uid);
      if (result == "email") {
        this.std_login_type.email = true;
        this.std_login_type.phone = false;
      } else if (result == "phone_number") {
        this.std_login_type.email = false;
        this.std_login_type.phone = true;
      }
    },
  },
};
</script>

<style>
.signup__title {
  font-size: 2.5rem !important;
}
.signup__input {
  background-color: #f7f7f7;
  border-radius: 20%;
}
.signup__reset a {
  transition: 0.3s;
  color: lightgrey;
}
.signup__reset a:hover {
  color: #3b47ec;
}
.signup__short_divider {
  margin: 3vh 70px 2.5vh 70px;
}
</style>