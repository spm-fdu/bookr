(window.webpackJsonp=window.webpackJsonp||[]).push([[14,10,11,12],{365:function(t,e,r){"use strict";r.r(e);var o={name:"BookrSeatIcon",props:{icon:{type:String,require:!0},title:{type:String,require:!0},color:{type:String,require:!1,default:"#c5c5c5"}}},n=r(65),c=r(80),l=r.n(c),d=r(175),m=r(346),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"text-center mr-6",attrs:{flat:"",tile:"","max-width":"8vw"}},[r("v-icon",{attrs:{outlined:"",large:"",color:t.color}},[t._v(t._s(t.icon))]),t._v(" "),r("p",{staticClass:"pa-0 text-overline"},[t._v(t._s(t.title))])],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VCard:d.a,VIcon:m.a})},366:function(t,e,r){var content=r(377);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(35).default)("a81a519e",content,!0,{sourceMap:!1})},376:function(t,e,r){"use strict";r(366)},377:function(t,e,r){var o=r(34)(!1);o.push([t.i,'@media(min-width:640px){.bookr__calendar_day{font-size:.7em}}@media(min-width:768px){.bookr__calendar_day{font-size:.8em}}@media(min-width:1024px){.bookr__calendar_day{font-size:1em}}.bookr__calendar_conditions *{font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue","Arial",sans-serif;opacity:.9;font-size:15px;font-family:"Roboto";text-transform:uppercase}.timeslots{border:.5px solid #c5c5c5;background-color:#eee}.timeslots:hover{color:red}.timeslots__norm{border-left-width:.5px;border-bottom-width:.5px;border-left-color:#c5c5c5;border-bottom-color:#c5c5c5;border-right:.5px dashed #c5c5c5;border-top:.5px solid #c5c5c5;background-color:#eee}.timeslots__side{border-bottom-width:.5px;border-right-width:.5px;border-left:.5px dashed #c5c5c5;border-bottom-color:#c5c5c5;border-right-color:#c5c5c5;border-top:.5px solid #c5c5c5;background-color:#eee}',""]),t.exports=o},390:function(t,e,r){"use strict";r.r(e);r(16),r(18),r(6),r(27),r(15),r(28);var o=r(1),n=(r(68),r(19),r(14),r(101));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={name:"BookrCalendar",props:{width:{type:String,required:!1},conditions:{type:Object,required:!0}},data:function(){return{time:["7 AM","8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM"],timeslots:{}}},computed:l(l({},Object(n.b)(["dayShort"])),{},{numBox:function(){return Array.from(Array(2*this.time.length+1),(function(t,i){return i+1}))},week:function(){var t=new Date,e=new Array;t.setDate(t.getDate()-t.getDay()+1);for(var i=0;i<5;i++){var r=new Date(t),p=r.getDate()+"/"+(r.getMonth()+1);e.push(p),t.setDate(t.getDate()+1)}return this.$store.commit("setWeek",e),e}}),methods:{updateList:function(t,time){if(!(Object.keys(this.timeslots).length>2*this.conditions.max-1)){var e=t+"_"+time;void 0!==this.timeslots[e]?(delete this.timeslots[e],this.$store.commit("removeTimeslots",e),this.$store.commit("updateHistory","remove")):(this.timeslots[e]={day:t,time:{start:this.$store.getters.time[time-1],end:this.$store.getters.time[time]}},this.$store.commit("setTimeslots",this.timeslots),this.$store.commit("updateHistory","insert"))}}}},m=(r(376),r(65)),v=r(80),f=r.n(v),_=r(351),h=r(346),y=r(406),k=r(446),O=r(352),w=r(174),component=Object(m.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"bookr__calendar"},[r("v-item-group",{style:"width:"+t.width,attrs:{multiple:"",max:2*t.conditions.max}},[r("v-row",{attrs:{"no-gutters":""}},t._l(t.numBox,(function(e){return r("v-col",{key:e,class:e%2==0||1==e?"timeslots__side":"timeslots__norm"},[[e%2==0?r("v-item",[r("v-sheet",{staticClass:"pt-4 pb-4 text-center justify-center",attrs:{color:"#eeeeee"}},[r("b",[t._v(t._s(t.time[e/2-1]))])])],1):t._e()]],2)})),1),t._v(" "),t._l(5,(function(i){return r("v-row",{key:i,attrs:{"no-gutters":""}},t._l(t.numBox,(function(e){return r("v-col",{key:e,staticClass:"timeslots"},[[1!=e?r("v-item",{scopedSlots:t._u([{key:"default",fn:function(o){var n=o.active,c=o.toggle;return[r("v-sheet",{staticClass:"align-center justify-center text-center",staticStyle:{height:"100%",width:"100%"},attrs:{color:n?"#3b47ec":"",align:"center",justify:"center"},on:{click:function(r){c(),t.updateList(i,e)}}},[r("v-icon",{staticClass:"text-center pt-5 pb-5",attrs:{color:"white"}},[t._v("mdi-check")])],1)]}}],null,!0)}):r("v-item",[r("v-sheet",{staticClass:"pt-2 pb-2 text-center justify-center bookr__calendar_day"},[r("span",{staticStyle:{"font-weight":"bold"}},[t._v(t._s(t.dayShort[i-1]))]),t._v(" "),r("span",[t._v(t._s(t.week[i-1]))])])],1)]],2)})),1)}))],2),t._v(" "),r("div",{staticClass:"bookr__calendar_conditions mt-4"},[r("b",[t._v("min")]),r("span",{staticClass:"mr-4 font-weight-normal"},[t._v(" "+t._s(t.conditions.min)+" hour")]),t._v(" "),r("b",[t._v("max")]),r("span",{staticClass:"mr-4"},[t._v(" "+t._s(t.conditions.max)+" hours")]),t._v(" "),r("b",[t._v("up to")]),r("span",{staticClass:"mr-4"},[t._v(" "+t._s(t.conditions.advance)+" days in advance")])])],1)}),[],!1,null,null,null);e.default=component.exports;f()(component,{VCol:_.a,VIcon:h.a,VItem:y.a,VItemGroup:k.a,VRow:O.a,VSheet:w.a})},391:function(t,e,r){"use strict";r.r(e);r(6),r(15),r(14);var o={name:"BookrSeatDesc",components:{BookrSeatIcon:r(365).default},props:{data:Object},data:function(){return this.data},computed:{icons:function(){var t=this,e=Array();return Object.keys(this.data.equipments).forEach((function(r){var o={};"power"==r?(o.icon="mdi-power-socket",o.title="Power Socket"):"projector"==r&&(o.icon="mdi-projector",o.title="Projector"),o.color=t.getColorFromStatus(t.data.equipments[r].status),e.push(o)})),e}},methods:{getColorFromStatus:function(t){return 1==t?"#4de123":0==t?"grey":"red"}}},n=r(65),c=r(80),l=r.n(c),d=r(355),m=r(175),v=r(145),f=r(346),_=r(465),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-card",{staticClass:"pl-0 pr-0",attrs:{flat:""}},[r("v-card-title",{staticClass:"pl-0 pr-0"},[t._v("Seat #"+t._s(t.data.no))]),t._v(" "),r("v-card-subtitle",{staticClass:"pl-0 pr-0"},[t._v(t._s(t.data.location))]),t._v(" "),r("v-card-text",{staticClass:"pl-0 pr-0"},[t._v(t._s(t.data.description))])],1),t._v(" "),r("v-card",{staticClass:"d-flex mt-4",attrs:{flat:""}},[t._l(t.icons,(function(i,t){return[r("bookr-seat-icon",{key:t,attrs:{icon:i.icon,color:i.color,title:i.title}})]})),t._v(" "),r("v-tooltip",{attrs:{right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[r("v-btn",t._g(t._b({attrs:{fab:"","x-small":"",depressed:"",plain:""}},"v-btn",n,!1),o),[r("v-icon",[t._v("mdi-information-outline")])],1)]}}])},[t._v(" "),r("span",[t._v("Equipment availability")])])],2)],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{BookrSeatIcon:r(365).default}),l()(component,{VBtn:d.a,VCard:m.a,VCardSubtitle:v.b,VCardText:v.c,VCardTitle:v.d,VIcon:f.a,VTooltip:_.a})},392:function(t,e,r){"use strict";r.r(e);r(16),r(18),r(27),r(28);var o=r(1),n=(r(14),r(6),r(15),r(184),r(31),r(259),r(101));function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={name:"BookrSeatBook",components:{},data:function(){return{disable:!0,colors:["#f2c627","#ff7530","#63eb4b","#ff30c8","#ff2b56"]}},computed:l(l({},Object(n.b)(["time","dayFull","week","stepper"])),{},{bookings:function(){var t={},e={},r={},o={},n=this.reorder(this.$store.getters.timeslots),c=Object.keys(n);return c.length>=2?this.disable=!1:this.disable=!0,c.forEach((function(r){var o=n[r].day,c=n[r].time.start,l=n[r].time.end;void 0===t[o]&&(t[o]=[]),void 0===e[o]&&(e[o]={}),e[o][c]=e[o][c]?e[o][c]+1:1,e[o][l]=e[o][l]?e[o][l]+1:1})),Object.keys(e).forEach((function(n){for(var c=Object.values(e[n]).indexOf(1);-1!=c;)void 0===r[n]&&(r[n]=[]),r[n].push(c),c=Object.values(e[n]).indexOf(1,c+1);r[n].forEach((function(r){t[n].push(Object.keys(e[n])[r])}));for(var i=0;i<t[n].length/2;i++)null==o[n]&&(o[n]=[]),null==o[n][i]&&(o[n][i]={}),o[n][i]=0==i?"".concat(t[n][i],"-").concat(t[n][i+1]):"".concat(t[n][2*i],"-").concat(t[n][2*i+1])})),o}}),methods:{reorder:function(t){return Object.keys(t).sort().reduce((function(e,r){return e[r]=t[r],e}),{})},moveNext:function(){this.$store.commit("incrStepper"),console.log(this.$store.state.stepper)}}},m=r(65),v=r(80),f=r.n(v),_=r(355),h=r(175),y=r(145),k=r(351),O=r(352),w=r(353),component=Object(m.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-card",{staticClass:"pl-4 pr-4 pb-4",attrs:{flat:"",outlined:""}},[r("v-card-title",[t._v("Booking Summary")]),t._v(" "),t._l(t.bookings,(function(e,o,n){return r("v-card-text",{key:o},[r("v-row",[r("v-col",{attrs:{sm:"1"}},[r("v-btn",{staticClass:"mr-4",staticStyle:{color:"rgb(0,0,0) !important"},attrs:{depressed:"",fab:"","x-small":"",plain:"",disabled:""}},[t._v(t._s(n+1))])],1),t._v(" "),r("v-col",{staticClass:"ml-4",attrs:{sm:"10"}},[r("div",{staticClass:"font-weight-normal"},[t._v("\n            "+t._s(t.dayFull[o-1])+" "+t._s(t.week[o-1])+"\n          ")]),t._v(" "),t._l(e,(function(slot,e){return r("span",{key:e},[r("span",{staticClass:"pl-3 pr-3 mr-2",style:"background-color: "+t.colors[o-1]+"; color: white;"},[t._v(t._s(slot))]),t._v(" "),(e+1)%3==0?r("v-spacer"):t._e()],1)}))],2)],1)],1)})),t._v(" "),r("v-btn",{attrs:{depressed:"",block:"",disabled:t.disable},on:{click:function(e){return t.moveNext()}}},[t._v("Continue")])],2)],1)}),[],!1,null,null,null);e.default=component.exports;f()(component,{VBtn:_.a,VCard:h.a,VCardText:y.c,VCardTitle:y.d,VCol:k.a,VRow:O.a,VSpacer:w.a})},397:function(t,e,r){var content=r(410);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(35).default)("073d31fa",content,!0,{sourceMap:!1})},409:function(t,e,r){"use strict";r(397)},410:function(t,e,r){var o=r(34)(!1);o.push([t.i,'.booking__stepper{font-size:15px;font-family:"Roboto",serif}',""]),t.exports=o},452:function(t,e,r){"use strict";r.r(e);r(14),r(16),r(18),r(6),r(27),r(15),r(28);var o=r(1),n=r(101),c=r(390),l=r(391),d=r(392);function m(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var v={components:{BookrCalendar:c.default,BookrSeatDesc:l.default,BookrSeatBook:d.default},data:function(){return{cond:{max:4,min:1,advance:2},seat:{no:341,availability:!0,equipments:{power:{status:1},projector:{status:-1}},location:"Guanghua Building Room 232",description:"s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}}},created:function(){this.$store.commit("setId",this.seat.no)},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({width:function(){return.95*window.innerWidth+"px"}},Object(n.b)(["timeslots","stepper"]))},f=v,_=(r(409),r(65)),h=r(80),y=r.n(h),k=r(351),O=r(411),w=r(346),j=r(352),x=r(398),C=r(395),S=r(399),component=Object(_.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"booking ml-16 mr-16 mb-16 mt-12"},[[r("h1",[t._v("\n      Bookings\n      "),r("v-icon",{attrs:{"x-large":""}},[t._v("mdi-arrow-right-thin")]),t._v(" "),r("span",{staticStyle:{color:"#cdcdcd"}},[t._v(t._s(t.seat.no))])],1)],t._v(" "),r("v-stepper",{staticClass:"booking__stepper font-weight-bold",attrs:{flat:"",width:"500"},model:{value:t.stepper,callback:function(e){t.stepper=e},expression:"stepper"}},[r("v-stepper-header",[r("v-stepper-step",{staticClass:"pl-0",attrs:{step:"1",color:t.stepper>1?"#4de123":"#3b47ec",complete:t.stepper>1,"complete-icon":"mdi-check"}},[t._v("SCHEDULING")]),t._v(" "),r("v-divider"),t._v(" "),r("v-stepper-step",{attrs:{step:"2",color:t.stepper>2?"#4de123":"#3b47ec",complete:t.stepper>2,"complete-icon":"mdi-check"}},[t._v("DETAILS")]),t._v(" "),r("v-divider"),t._v(" "),r("v-stepper-step",{attrs:{color:t.stepper>3?"#4de123":"#3b47ec",step:"3",complete:t.stepper>3}},[t._v("FINISH")])],1)],1),t._v(" "),r("bookr-calendar",{staticClass:"ma-0 ma-auto",attrs:{conditions:t.cond}}),t._v(" "),r("div",{staticClass:"booking__seats mt-8"},[r("v-row",[r("v-col",{attrs:{sm:"7"}},[r("bookr-seat-desc",{attrs:{data:t.seat}})],1),t._v(" "),r("v-col",{attrs:{md:"4","offset-sm":"1"}},[r("bookr-seat-book")],1)],1)],1)],2)}),[],!1,null,null,null);e.default=component.exports;y()(component,{BookrCalendar:r(390).default,BookrSeatDesc:r(391).default,BookrSeatBook:r(392).default}),y()(component,{VCol:k.a,VDivider:O.a,VIcon:w.a,VRow:j.a,VStepper:x.a,VStepperHeader:C.a,VStepperStep:S.a})}}]);