(window.webpackJsonp=window.webpackJsonp||[]).push([[11,12],{365:function(t,e,r){"use strict";r.r(e);var o={name:"BookrSeatIcon",props:{icon:{type:String,require:!0},title:{type:String,require:!0},color:{type:String,require:!1,default:"#c5c5c5"}}},n=r(65),c=r(80),l=r.n(c),d=r(175),v=r(346),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"text-center mr-6",attrs:{flat:"",tile:"","max-width":"8vw"}},[r("v-icon",{attrs:{outlined:"",large:"",color:t.color}},[t._v(t._s(t.icon))]),t._v(" "),r("p",{staticClass:"pa-0 text-overline"},[t._v(t._s(t.title))])],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VCard:d.a,VIcon:v.a})},391:function(t,e,r){"use strict";r.r(e);r(6),r(15),r(14);var o={name:"BookrSeatDesc",components:{BookrSeatIcon:r(365).default},props:{data:Object},data:function(){return this.data},computed:{icons:function(){var t=this,e=Array();return Object.keys(this.data.equipments).forEach((function(r){var o={};"power"==r?(o.icon="mdi-power-socket",o.title="Power Socket"):"projector"==r&&(o.icon="mdi-projector",o.title="Projector"),o.color=t.getColorFromStatus(t.data.equipments[r].status),e.push(o)})),e}},methods:{getColorFromStatus:function(t){return 1==t?"#4de123":0==t?"grey":"red"}}},n=r(65),c=r(80),l=r.n(c),d=r(355),v=r(175),_=r(145),f=r(346),m=r(465),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-card",{staticClass:"pl-0 pr-0",attrs:{flat:""}},[r("v-card-title",{staticClass:"pl-0 pr-0"},[t._v("Seat #"+t._s(t.data.no))]),t._v(" "),r("v-card-subtitle",{staticClass:"pl-0 pr-0"},[t._v(t._s(t.data.location))]),t._v(" "),r("v-card-text",{staticClass:"pl-0 pr-0"},[t._v(t._s(t.data.description))])],1),t._v(" "),r("v-card",{staticClass:"d-flex mt-4",attrs:{flat:""}},[t._l(t.icons,(function(i,t){return[r("bookr-seat-icon",{key:t,attrs:{icon:i.icon,color:i.color,title:i.title}})]})),t._v(" "),r("v-tooltip",{attrs:{right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,n=e.attrs;return[r("v-btn",t._g(t._b({attrs:{fab:"","x-small":"",depressed:"",plain:""}},"v-btn",n,!1),o),[r("v-icon",[t._v("mdi-information-outline")])],1)]}}])},[t._v(" "),r("span",[t._v("Equipment availability")])])],2)],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{BookrSeatIcon:r(365).default}),l()(component,{VBtn:d.a,VCard:v.a,VCardSubtitle:_.b,VCardText:_.c,VCardTitle:_.d,VIcon:f.a,VTooltip:m.a})}}]);