/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{362:function(e,t,n){"use strict";n.d(t,"a",(function(){return v}));var r=n(360),o=n(359),c=n(361),l=n(363);class f{constructor(e,t){this._delegate=e,this.firebase=t,Object(c._addComponent)(e,new o.a("app-compat",(()=>this),"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise((e=>{this._delegate.checkDestroyed(),e()})).then((()=>(this.firebase.INTERNAL.removeApp(this.name),Object(c.deleteApp)(this._delegate))))}_getService(e,t=c._DEFAULT_ENTRY_NAME){var n;this._delegate.checkDestroyed();const r=this._delegate.container.getProvider(e);return r.isInitialized()||"EXPLICIT"!==(null===(n=r.getComponent())||void 0===n?void 0:n.instantiationMode)||r.initialize(),r.getImmediate({identifier:t})}_removeServiceInstance(e,t=c._DEFAULT_ENTRY_NAME){this._delegate.container.getProvider(e).clearInstance(t)}_addComponent(component){Object(c._addComponent)(this._delegate,component)}_addOrOverwriteComponent(component){Object(c._addOrOverwriteComponent)(this._delegate,component)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}}const d={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},m=new r.b("app-compat","Firebase",d);const w=function e(){const t=function(e){const t={},n={__esModule:!0,initializeApp:function(o,l={}){const f=c.initializeApp(o,l);if(Object(r.m)(t,f.name))return t[f.name];const d=new e(f,n);return t[f.name]=d,d},app:o,registerVersion:c.registerVersion,setLogLevel:c.setLogLevel,onLog:c.onLog,apps:null,SDK_VERSION:c.SDK_VERSION,INTERNAL:{registerComponent:function(component){const t=component.name,l=t.replace("-compat","");if(c._registerComponent(component)&&"PUBLIC"===component.type){const c=(e=o())=>{if("function"!=typeof e[l])throw m.create("invalid-app-argument",{appName:t});return e[l]()};void 0!==component.serviceProps&&Object(r.r)(c,component.serviceProps),n[l]=c,e.prototype[l]=function(...e){return this._getService.bind(this,t).apply(this,component.multipleInstances?e:[])}}return"PUBLIC"===component.type?n[l]:null},removeApp:function(e){delete t[e]},useAsService:function(e,t){return"serverAuth"===t?null:t},modularAPIs:c}};function o(e){if(e=e||c._DEFAULT_ENTRY_NAME,!Object(r.m)(t,e))throw m.create("no-app",{appName:e});return t[e]}return n.default=n,Object.defineProperty(n,"apps",{get:function(){return Object.keys(t).map((e=>t[e]))}}),o.App=e,n}(f);return t.INTERNAL=Object.assign(Object.assign({},t.INTERNAL),{createFirebaseNamespace:e,extendNamespace:function(e){Object(r.r)(t,e)},createSubscribe:r.o,ErrorFactory:r.b,deepExtend:r.r}),t}(),h=new l.b("@firebase/app-compat");if(Object(r.y)()&&void 0!==self.firebase){h.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");const e=self.firebase.SDK_VERSION;e&&e.indexOf("LITE")>=0&&h.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")}const v=w;var y;Object(c.registerVersion)("@firebase/app-compat","0.1.20",y)},369:function(e,t,n){"use strict";var r=n(361),o=n(359),c=n(360);const l="@firebase/installations",f="0.5.6",d=1e4,m="w:0.5.6",w="FIS_v2",h=36e5,v={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},y=new c.b("installations","Installations",v);function C(e){return e instanceof c.c&&e.code.includes("request-failed")}function I({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function S(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function j(e,t){const n=(await t.json()).error;return y.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function O({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function _(e,{refreshToken:t}){const n=O(e);return n.append("Authorization",function(e){return`FIS_v2 ${e}`}(t)),n}async function T(e){const t=await e();return t.status>=500&&t.status<600?e():t}function E(e){return new Promise((t=>{setTimeout(t,e)}))}const N=/^[cdef][\w-]{21}$/;function P(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){return(t=e,btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22);var t}(e);return N.test(t)?t:""}catch(e){return""}}function k(e){return`${e.appName}!${e.appId}`}const A=new Map;function D(e,t){const n=k(e);F(n,t),function(e,t){const n=$();n&&n.postMessage({key:e,fid:t});V()}(n,t)}function F(e,t){const n=A.get(e);if(n)for(const e of n)e(t)}let L=null;function $(){return!L&&"BroadcastChannel"in self&&(L=new BroadcastChannel("[Firebase] FID Change"),L.onmessage=e=>{F(e.data.key,e.data.fid)}),L}function V(){0===A.size&&L&&(L.close(),L=null)}const R="firebase-installations-store";let M=null;function x(){return M||(M=Object(c.N)("firebase-installations-database",1,((e,t)=>{if(0===t)e.createObjectStore(R)}))),M}async function U(e,t){const n=k(e),r=(await x()).transaction(R,"readwrite"),o=r.objectStore(R),c=await o.get(n);return await o.put(t,n),await r.complete,c&&c.fid===t.fid||D(e,t.fid),t}async function z(e){const t=k(e),n=(await x()).transaction(R,"readwrite");await n.objectStore(R).delete(t),await n.complete}async function K(e,t){const n=k(e),r=(await x()).transaction(R,"readwrite"),o=r.objectStore(R),c=await o.get(n),l=t(c);return void 0===l?await o.delete(n):await o.put(l,n),await r.complete,!l||c&&c.fid===l.fid||D(e,l.fid),l}async function B(e){let t;const n=await K(e.appConfig,(n=>{const r=function(e){return Y(e||{fid:P(),registrationStatus:0})}(n),o=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(y.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=async function(e,t){try{const n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=I(e),o=O(e),c=t.getImmediate({optional:!0});if(c){const e=await c.getHeartbeatsHeader();e&&o.append("x-firebase-client",e)}const body={fid:n,authVersion:w,appId:e.appId,sdkVersion:m},l={method:"POST",headers:o,body:JSON.stringify(body)},f=await T((()=>fetch(r,l)));if(f.ok){const e=await f.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:S(e.authToken)}}throw await j("Create Installation",f)}(e,t);return U(e.appConfig,n)}catch(n){throw C(n)&&409===n.customData.serverCode?await z(e.appConfig):await U(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:H(e)}:{installationEntry:t}}(e,r);return t=o.registrationPromise,o.installationEntry}));return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function H(e){let t=await J(e.appConfig);for(;1===t.registrationStatus;)await E(100),t=await J(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await B(e);return n||t}return t}function J(e){return K(e,(e=>{if(!e)throw y.create("installation-not-found");return Y(e)}))}function Y(e){return 1===(t=e).registrationStatus&&t.registrationTime+d<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t}async function W({appConfig:e,heartbeatServiceProvider:t},n){const r=function(e,{fid:t}){return`${I(e)}/${t}/authTokens:generate`}(e,n),o=_(e,n),c=t.getImmediate({optional:!0});if(c){const e=await c.getHeartbeatsHeader();e&&o.append("x-firebase-client",e)}const body={installation:{sdkVersion:m,appId:e.appId}},l={method:"POST",headers:o,body:JSON.stringify(body)},f=await T((()=>fetch(r,l)));if(f.ok){return S(await f.json())}throw await j("Generate Auth Token",f)}async function G(e,t=!1){let n;const r=await K(e.appConfig,(r=>{if(!Q(r))throw y.create("not-registered");const o=r.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+h}(e)}(o))return r;if(1===o.requestStatus)return n=async function(e,t){let n=await X(e.appConfig);for(;1===n.authToken.requestStatus;)await E(100),n=await X(e.appConfig);const r=n.authToken;return 0===r.requestStatus?G(e,t):r}(e,t),r;{if(!navigator.onLine)throw y.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(r);return n=async function(e,t){try{const n=await W(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await U(e.appConfig,r),n}catch(n){if(!C(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await U(e.appConfig,n)}else await z(e.appConfig);throw n}}(e,t),t}}));return n?await n:r.authToken}function X(e){return K(e,(e=>{if(!Q(e))throw y.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+d<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e;var n}))}function Q(e){return void 0!==e&&2===e.registrationStatus}async function Z(e,t=!1){const n=e;await async function(e){const{registrationPromise:t}=await B(e);t&&await t}(n);return(await G(n,t)).token}function ee(e){return y.create("missing-app-config-values",{valueName:e})}const te="installations",ne=e=>{const t=e.getProvider("app").getImmediate(),n=function(e){if(!e||!e.options)throw ee("App Configuration");if(!e.name)throw ee("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw ee(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:Object(r._getProvider)(t,"heartbeat"),_delete:()=>Promise.resolve()}},ae=e=>{const t=e.getProvider("app").getImmediate(),n=Object(r._getProvider)(t,te).getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:r}=await B(t);return r?r.catch(console.error):G(t).catch(console.error),n.fid}(n),getToken:e=>Z(n,e)}};Object(r._registerComponent)(new o.a(te,ne,"PUBLIC")),Object(r._registerComponent)(new o.a("installations-internal",ae,"PRIVATE")),Object(r.registerVersion)(l,f),Object(r.registerVersion)(l,f,"esm2017")}}]);