(window.webpackJsonp=window.webpackJsonp||[]).push([[16,9],{367:function(e,t,n){var content=n(387);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(35).default)("42c37c80",content,!0,{sourceMap:!1})},386:function(e,t,n){"use strict";n(367)},387:function(e,t,n){var r=n(34)(!1);r.push([e.i,".login__title{font-size:2.5rem!important}.login__input{background-color:#f7f7f7;border-radius:20%}.login__reset a{transition:.3s;color:#d3d3d3}.login__reset a:hover{color:#3b47ec}.login__short_divider{margin:45px 100px}",""]),e.exports=r},393:function(e,t,n){"use strict";n.r(t);var r=n(33),o=n(8),l=(n(36),n(21),new(n(373).a),{name:"Login",data:function(){return{title:"Sign In",labels:{uid:"Email or phone number",pwd:"Password"},credentials:{uid:"",pwd:""},social:[{icon:"mdi-facebook"},{icon:"mdi-google"}],disabled:{both:!0,email:!0,pwd:!0},showPwd:!1,spin:!1}},methods:{required:function(e){return e?(this.disabled.both=!1,!0):(this.disabled.both=!0,"Required")},validateEmailPhone:function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(e)||/^\+?([0-9]{2})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/.test(e)?(this.disabled.email=!1,!0):(this.disabled.email=!0,"Please enter a valid email address or phone number (+country code)")},validatePasswordLength:function(e){return e.length<8?(this.disabled.pwd=!0,"Min. 8 characters"):(this.disabled.pwd=!1,!0)},login:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.spin=!0,t.next=4,e.$fire.auth.signInWithEmailAndPassword(e.credentials.uid,e.credentials.pwd);case 4:e.$router.push("/dashboard"),t.next=11;break;case 7:return t.prev=7,t.t0=t.catch(0),e.handleLoginError(!0),t.abrupt("return");case 11:e.spin=!1;case 12:case"end":return t.stop()}}),t,null,[[0,7]])})))()},handleLoginError:function(e){return Object(r.a)(e)!==Boolean||(this.labels.pwd="The credentials you provided doesn't match the record of our database.",!1)},resetPassword:function(){}}}),d=(n(386),n(65)),c=n(80),v=n.n(c),h=n(355),f=n(175),m=n(145),_=n(351),w=n(411),x=n(346),C=n(352),k=n(353),y=n(450),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",{staticClass:"pa-4 rounded justify-center",attrs:{elevation:"1",width:"500",height:"550","max-width":"500"}},[n("v-card-title",{staticClass:"login__title justify-center font-weight-bold"},[e._v(e._s(e.title))]),e._v(" "),n("v-spacer",{staticClass:"ma-6"}),e._v(" "),n("v-text-field",{staticClass:"ml-16 mr-16",attrs:{label:e.labels.uid,rules:[e.required,e.validateEmailPhone],outlined:"",loading:e.spin,color:"#3b47ec"},model:{value:e.credentials.uid,callback:function(t){e.$set(e.credentials,"uid",t)},expression:"credentials.uid"}}),e._v(" "),n("v-spacer"),e._v(" "),n("v-text-field",{staticClass:"ml-16 mr-16",attrs:{label:e.labels.pwd,"append-icon":e.showPwd?"mdi-eye":"mdi-eye-off",type:e.showPwd?"text":"password",rules:[e.required,e.validatePasswordLength],outlined:"",loading:e.spin,color:"#3b47ec"},on:{"click:append":function(t){e.showPwd=!e.showPwd}},model:{value:e.credentials.pwd,callback:function(t){e.$set(e.credentials,"pwd",t)},expression:"credentials.pwd"}}),e._v(" "),n("v-row",[n("v-col",[n("v-card-text",{staticClass:"login__reset ma-0 pl-16 pa-0 text-left"},[n("nuxt-link",{staticClass:"text-overline text-decoration-none",attrs:{to:"signup"}},[e._v("new user?")])],1)],1),e._v(" "),n("v-col",[n("v-card-text",{staticClass:"login__reset ma-0 pr-16 pa-0 text-right"},[n("nuxt-link",{staticClass:"text-overline text-decoration-none",attrs:{to:"reset"}},[e._v("Forget password?")])],1)],1)],1),e._v(" "),n("v-spacer",{staticClass:"mb-8"}),e._v(" "),n("v-btn",{staticClass:"pl-16 pr-16",attrs:{depressed:"",disabled:e.disabled.both||e.disabled.email||e.disabled.pwd},on:{click:function(t){return e.login()}}},[e._v("login")]),e._v(" "),n("v-divider",{staticClass:"login__short_divider "}),e._v(" "),e._l(e.social,(function(i,t){return n("v-btn",{key:t,staticClass:"ml-4 mr-4",attrs:{fab:"",depressed:"","x-small":""}},[n("v-icon",[e._v(e._s(i.icon))])],1)}))],2)}),[],!1,null,null,null);t.default=component.exports;v()(component,{VBtn:h.a,VCard:f.a,VCardText:m.c,VCardTitle:m.d,VCol:_.a,VDivider:w.a,VIcon:x.a,VRow:C.a,VSpacer:k.a,VTextField:y.a})},414:function(e,t,n){e.exports=n.p+"img/login.7987229.svg"},453:function(e,t,n){"use strict";n.r(t);var r={components:{BookrLogin:n(393).default},mounted:function(){this.verifyLoginStatus()},methods:{verifyLoginStatus:function(){this.$fire.auth.currentUser&&this.$router.push("/dashboard")}}},o=n(65),l=n(80),d=n.n(l),c=n(351),v=n(356),h=n(352),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{staticClass:"bookr__login ml-8 mr-8",attrs:{fluid:"","fill-height":""}},[r("v-row",{staticClass:"text-center justify-center align-center"},[r("v-col",{attrs:{cols:"7"}},[r("img",{style:"pointer-events:none",attrs:{src:n(414)}})]),e._v(" "),r("v-col",{attrs:{cols:"5"}},[r("bookr-login")],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;d()(component,{BookrLogin:n(393).default}),d()(component,{VCol:c.a,VContainer:v.a,VRow:h.a})}}]);