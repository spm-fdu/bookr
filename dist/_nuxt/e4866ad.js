(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{368:function(e,t,n){var content=n(389);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(35).default)("5ba919b4",content,!0,{sourceMap:!1})},388:function(e,t,n){"use strict";n(368)},389:function(e,t,n){var r=n(34)(!1);r.push([e.i,".signup__title{font-size:2.5rem!important}.signup__input{background-color:#f7f7f7;border-radius:20%}.signup__reset a{transition:.3s;color:#d3d3d3}.signup__reset a:hover{color:#3b47ec}.signup__short_divider{margin:45px 100px}",""]),e.exports=r},394:function(e,t,n){"use strict";n.r(t);var r=n(8),o=(n(36),n(21),n(373)),l={name:"SignUp",data:function(){return{title:"Sign Up",labels:{uid:"Email or phone number",pwd:"Password",ver_code:"Verification code"},credentials:{uid:"",pwd:"",ver_code:""},email_verification:{uid:""},social:[{icon:"mdi-google"}],disabled:{both:!0,email:!0,pwd:!0,email_send_password:!0},std_login_type:{email:!1,phone:!1},showPwd:!1,spin:!1}},methods:{required:function(e){return e?(this.disabled.both=!1,!0):(this.disabled.both=!0,"Required")},required_send_password_email:function(e){return e?(this.disabled.email_send_password=!1,!0):(this.disabled.email_send_password=!0,"Required")},validateEmailPhone:function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(e)||/^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/.test(e)?(this.disabled.email=!1,!0):(this.disabled.email=!0,"Please enter a valid email address or phone number (+country code)")},validatePasswordLength:function(e){return e.length<8?(this.disabled.pwd=!0,"Min. 8 characters"):(this.disabled.pwd=!1,!0)},validateEmail:function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(e)?(this.disabled.email_send_password=!1,!0):(this.disabled.email_send_password=!0,"Please enter a valid email address")},isEmailOrPhoneNumber:function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(e)?"email":/^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/.test(e)?"phone_number":"none"},signUpEmail:function(){this.$fire.auth.createUserWithEmailAndPassword(this.credentials.uid,this.credentials.pwd)},sendPhoneVerificationCode:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=Object(o.c)(),r=e.credentials.uid,console.log(r),l=window.recaptchaVerifier,Object(o.e)(n,r,l).then((function(e){window.confirmationResult=e})).catch((function(e){console.log(e)}));case 5:case"end":return t.stop()}}),t)})))()},signUpMobile:function(){var code=this.$self.credentials.ver_code;console.log(code),confirmationResult.confirm(code).then((function(e){var t=e.user;console.log(t)})).catch((function(e){console.log(e)}))},signUpThirdParty:function(i){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.t0=i,t.next=0===t.t0?3:6;break;case 3:return n=new e.$fireModule.auth.GoogleAuthProvider,e.$fire.auth.signInWithPopup(n).then((function(e){var t=e.credential.accessToken,n=e.user;console.log(t),console.log(n)})).catch((function(e){console.log(e)})),t.abrupt("break",7);case 6:return t.abrupt("break",7);case 7:case"end":return t.stop()}}),t)})))()},showCaptcha:function(){var e=Object(o.c)();window.recaptchaVerifier=new o.b("recaptcha-container",{},e)},sendPasswordReset:function(e){var t=Object(o.c)();Object(o.d)(t,e).then((function(){console.log("Password reset email sent")})).catch((function(e){console.log(e)}))},standardLoginType:function(){var e=this.isEmailOrPhoneNumber(this.credentials.uid);"email"==e?(this.std_login_type.email=!0,this.std_login_type.phone=!1):"phone_number"==e&&(this.std_login_type.email=!1,this.std_login_type.phone=!0)}}},c=(n(388),n(65)),d=n(80),v=n.n(d),_=n(355),f=n(175),h=n(145),m=n(351),w=n(451),C=n(411),k=n(346),x=n(353),y=n(450),P=n(457),component=Object(c.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",{staticClass:"pa-4 rounded justify-center",attrs:{elevation:"1",width:"500",height:"650","max-width":"500"}},[n("v-card-title",{staticClass:"signup__title justify-center font-weight-bold"},[e._v(e._s(e.title))]),e._v(" "),n("v-spacer",{staticClass:"ma-6"}),e._v(" "),n("v-text-field",{staticClass:"ml-16 mr-16",attrs:{label:e.labels.uid,rules:[e.required,e.validateEmailPhone],outlined:"",loading:e.spin,color:"#3b47ec"},model:{value:e.credentials.uid,callback:function(t){e.$set(e.credentials,"uid",t)},expression:"credentials.uid"}}),e._v(" "),n("v-spacer",{staticClass:"mb-2"}),e._v(" "),n("v-dialog",{attrs:{transition:"dialog-bottom-transition","max-width":"600"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n("v-btn",e._g(e._b({staticClass:"pl-16 pr-16",attrs:{depressed:""},on:{click:function(t){return e.standardLoginType()}}},"v-btn",o,!1),r),[e._v("Next")])]}},{key:"default",fn:function(dialog){return[e.std_login_type.email?n("v-card",[n("v-toolbar",{attrs:{dark:""}},[e._v("Sign up with email")]),e._v(" "),n("v-spacer",{staticClass:"mb-2"}),e._v(" "),n("v-col",{attrs:{align:"center"}},[n("v-text-field",{staticClass:"ml-16 mr-16",attrs:{label:e.labels.pwd,"append-icon":e.showPwd?"mdi-eye":"mdi-eye-off",type:e.showPwd?"text":"password",rules:[e.required,e.validatePasswordLength],outlined:"",loading:e.spin,color:"#3b47ec"},on:{"click:append":function(t){e.showPwd=!e.showPwd}},model:{value:e.credentials.pwd,callback:function(t){e.$set(e.credentials,"pwd",t)},expression:"credentials.pwd"}}),e._v(" "),n("v-spacer",{staticClass:"mb-6"}),e._v(" "),n("v-btn",{staticClass:"pl-16 pr-16",attrs:{depressed:"",disabled:e.disabled.both||e.disabled.email||e.disabled.pwd},on:{click:function(t){return e.signUp()}}},[e._v("Sign Up")])],1),e._v(" "),n("v-card-actions",{staticClass:"justify-end"},[n("v-btn",{attrs:{text:""},on:{click:function(e){dialog.value=!1}}},[e._v("Close")])],1)],1):e._e(),e._v(" "),e.std_login_type.phone?n("v-card",[n("v-toolbar",{attrs:{dark:""}},[e._v("Sign up with phone number")]),e._v(" "),n("v-spacer",{staticClass:"mb-2"}),e._v(" "),n("v-col",{attrs:{align:"center"}},[n("v-btn",{staticClass:"pl-16 pr-16",attrs:{depressed:""},on:{click:function(t){e.showCaptcha(),e.sendPhoneVerificationCode()}}},[e._v("Send code")]),e._v(" "),n("v-spacer",{staticClass:"mb-6"}),e._v(" "),n("div",{attrs:{id:"recaptcha-container"}}),e._v(" "),n("v-spacer",{staticClass:"mb-6"}),e._v(" "),n("v-text-field",{staticClass:"ml-16 mr-16",attrs:{label:e.labels.ver_code,rules:[],outlined:"",loading:e.spin,color:"#3b47ec"},model:{value:e.credentials.ver_code,callback:function(t){e.$set(e.credentials,"ver_code",t)},expression:"credentials.ver_code"}}),e._v(" "),n("v-spacer",{staticClass:"mb-6"}),e._v(" "),n("v-btn",{staticClass:"pl-16 pr-16",attrs:{depressed:""},on:{click:function(t){return e.signUpMobile()}}},[e._v("Sign Up")])],1),e._v(" "),n("v-card-actions",{staticClass:"justify-end"},[n("v-btn",{attrs:{text:""},on:{click:function(e){dialog.value=!1}}},[e._v("Close")])],1)],1):e._e()]}}])}),e._v(" "),n("v-spacer",{staticClass:"mb-8"}),e._v(" "),n("v-dialog",{attrs:{transition:"dialog-bottom-transition","max-width":"600"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n("v-btn",e._g(e._b({staticClass:"pl-16 pr-16",attrs:{plain:""}},"v-btn",o,!1),r),[e._v("Forgot password?")])]}},{key:"default",fn:function(dialog){return[n("v-card",[n("v-toolbar",{attrs:{dark:""}},[e._v("Forgot password?")]),e._v(" "),n("v-spacer",{staticClass:"mb-2"}),e._v(" "),n("v-col",{attrs:{align:"center"}},[n("v-text-field",{staticClass:"ml-16 mr-16",attrs:{label:"Email",rules:[e.required_send_password_email,e.validateEmail],outlined:"",loading:e.spin,color:"#3b47ec"},model:{value:e.email_verification.uid,callback:function(t){e.$set(e.email_verification,"uid",t)},expression:"email_verification.uid"}}),e._v(" "),n("v-btn",{staticClass:"pl-16 pr-16",attrs:{depressed:"",disabled:e.disabled.email_send_password},on:{click:function(t){return e.sendPasswordReset(e.email_verification.uid)}}},[e._v("Send")])],1),e._v(" "),n("v-card-actions",{staticClass:"justify-end"},[n("v-btn",{attrs:{text:""},on:{click:function(e){dialog.value=!1}}},[e._v("Close")])],1)],1)]}}])}),e._v(" "),n("v-divider",{staticClass:"signup__short_divider"}),e._v(" "),e._l(e.social,(function(i,t){return n("v-btn",{key:t,staticClass:"ml-4 mr-4",attrs:{fab:"",depressed:"","x-small":""},on:{click:function(n){return e.signUpThirdParty(t)}}},[n("v-icon",[e._v(e._s(i.icon))])],1)}))],2)}),[],!1,null,null,null);t.default=component.exports;v()(component,{VBtn:_.a,VCard:f.a,VCardActions:h.a,VCardTitle:h.d,VCol:m.a,VDialog:w.a,VDivider:C.a,VIcon:k.a,VSpacer:x.a,VTextField:y.a,VToolbar:P.a})}}]);