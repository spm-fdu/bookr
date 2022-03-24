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

    <!-- <v-card-text class="signup__reset ma-0 pr-16 pa-0 text-right" @click="resetPassword()" ><a class="text-overline">Forget password?</a></v-card-text> -->
    <v-spacer class="mb-2"></v-spacer>

    <v-dialog transition="dialog-bottom-transition" max-width="600">
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
              @click="signUp()"
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
    </v-dialog>

    <v-spacer class="mb-8"></v-spacer>

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
    </v-dialog>

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
      email_verification: {
        uid: "",
      },
      social: [
        {
          icon: "mdi-google",
        },
      ],
      disabled: {
        both: true,
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
    signUpEmail() {
      this.$fire.auth.createUserWithEmailAndPassword(
        this.credentials.uid,
        this.credentials.pwd
      );
    },
    async sendPhoneVerificationCode() {
      const auth = getAuth();
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
    },
    signUpMobile() {
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
      const auth = getAuth();
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
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
  margin: 45px 100px 45px 100px;
}
</style>