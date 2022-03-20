<template>
  <v-card
    elevation="1"
    class="pa-4 rounded justify-center"
    width="500"
    height="650"
    max-width="500"
  >
    <v-card-title class="signup__title justify-center font-weight-bold">{{
      title
    }}</v-card-title>
    <v-spacer class="ma-6"></v-spacer>
    <!-- <v-card-subtitle class="pt-2 mb-4">{{ subtitle }}</v-card-subtitle> -->

    <v-text-field
      v-model="credentials.uid"
      :label="labels.uid"
      :rules="[required, validateEmailPhone]"
      outlined
      :loading="spin"
      class="ml-16 mr-16"
      color="#3b47ec"
    ></v-text-field>
    <v-spacer></v-spacer>
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
    <!-- <v-card-text class="signup__reset ma-0 pr-16 pa-0 text-right" @click="resetPassword()" ><a class="text-overline">Forget password?</a></v-card-text> -->
    <v-spacer class="mb-2"></v-spacer>
    <v-btn plain class="pl-16 pr-16" @click="sendPasswordReset()"
      >Forgot password?</v-btn
    >
    <v-spacer class="mb-8"></v-spacer>
    <v-btn
      depressed
      class="pl-16 pr-16"
      :disabled="disabled.both || disabled.email || disabled.pwd"
      @click="signUp()"
      >signup</v-btn
    >

    <v-spacer class="mb-8"></v-spacer>

    <v-container fluid>
      <v-row align="center" justify="center">
        <div id="recaptcha-container"></div>
      </v-row>
      <v-spacer class="mb-8"></v-spacer>
      <v-row align="center" justify="center">
        <v-col>
          <div id="sms-code-signup">
            <v-text-field
              v-model="credentials.ver_code"
              :label="labels.ver_code"
              :rules="[]"
              outlined
              :loading="spin"
              class="ml-16 mr-16"
              color="#3b47ec"
            ></v-text-field>
          </div>
        </v-col>
        <v-col>
          <v-btn
            depressed
            class="pl-16 pr-16"
            @click="this.verifyVeriticationCode()"
            >Enter</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <v-spacer class="mb-8"></v-spacer>

    <v-divider class="signup__short_divider"></v-divider>

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
  </v-card>
</template>

<script>
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendPasswordResetEmail,
} from "firebase/auth";

export default {
  name: "SignUp",
  data() {
    return {
      title: "Sign Up",
      labels: {
        uid: "Email or phone number",
        pwd: "Password",
        ver_code: "Verification code",
      },
      credentials: {
        uid: "",
        pwd: "",
        ver_code: "",
      },
      social: [
        {
          icon: "mdi-facebook",
        },
        {
          icon: "mdi-google",
        },
      ],
      disabled: {
        both: true,
        email: true,
        pwd: true,
      },
      showPwd: false,
      spin: false,
    };
  },
  methods: {
    required(value) {
      if (!value) {
        this.disabled.both = true;
        return "Required";
      } else {
        this.disabled.both = false;
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
    verifyVeriticationCode() {
      const code = this.$self.credentials.ver_code;
      console.log(code);
      confirmationResult
        .confirm(code)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log(user);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    signUp() {
      let res = this.isEmailOrPhoneNumber(this.credentials.uid);
      if (res == "email") {
        this.$fire.auth.createUserWithEmailAndPassword(
          this.credentials.uid,
          this.credentials.pwd
        );
      } else if (res == "phone_number") {
        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {},
          auth
        );

        const phoneNumber = this.credentials.uid;
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async signUpThirdParty(i) {
      switch (i) {
        case 0:
          break;
        case 1:
          const provider = new this.$fireModule.auth.GoogleAuthProvider();
          this.$fire.auth
            .signInWithPopup(provider)
            .then((result) => {
              let token = result.credential.accessToken;
              let user = result.user;
              console.log(token);
              console.log(user);
            })
            .catch((err) => {
              console.log(err);
            });
          break;
        default:
          break;
      }
    },
    sendPasswordReset() {
      const auth = getAuth();
      sendPasswordResetEmail(auth, "spm.fudan@gmail.com")
        .then(() => {
          console.log("Password reset email sent");
        })
        .catch((err) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
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
  margin: 45px 100px 45px 100px;
}
</style>