import{i as Ge,m as te,c as k,o as vt,d as ee,e as Qe,l as St,v as et,n as ne,X as We,r as Je,w as Ke,N as Ye,j as Xe,I as Ze}from"./index-f8cef8db.js";function tn(t=Symbol(),e){return Ge(t,e||{})}const en=Symbol();function nn(){return tn(en)}function rn(t){const e=nn();return{prefixCls:`${e.prefixCls}-${t}`,prefixVar:e.prefixCls}}const on=["xlink:href"],sn=te({name:"SvgIcon",__name:"svgIcon",props:{prefix:{type:String,default:"icon"},name:{type:String,required:!0},size:{type:[Number,String],default:16},spin:{type:Boolean,default:!1}},setup(t){const e=t,{prefixCls:n}=rn("svg-icon"),o=k(()=>`#${e.prefix}-${e.name}`),r=k(()=>{const{size:s}=e;let i=`${s}`;return i=`${i.replace("px","")}px`,{width:i,height:i}});return(s,i)=>(vt(),ee("svg",{class:St([et(n),s.$attrs.class,t.spin&&"svg-icon-spin"]),style:ne(r.value),"aria-hidden":"true"},[Qe("use",{"xlink:href":o.value},null,8,on)],6))}});const cn=We(sn,[["__scopeId","data-v-84f8207d"]]);/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt or license.gpl.txt
* files at https://github.com/iconify/iconify
*
* Licensed under MIT.
*
* @license MIT
* @version 3.1.1
*/const re=Object.freeze({left:0,top:0,width:16,height:16}),ot=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),G=Object.freeze({...re,...ot}),wt=Object.freeze({...G,body:"",hidden:!1});function an(t,e){const n={};!t.hFlip!=!e.hFlip&&(n.hFlip=!0),!t.vFlip!=!e.vFlip&&(n.vFlip=!0);const o=((t.rotate||0)+(e.rotate||0))%4;return o&&(n.rotate=o),n}function Dt(t,e){const n=an(t,e);for(const o in wt)o in ot?o in t&&!(o in n)&&(n[o]=ot[o]):o in e?n[o]=e[o]:o in t&&(n[o]=t[o]);return n}function un(t,e){const n=t.icons,o=t.aliases||Object.create(null),r=Object.create(null);function s(i){if(n[i])return r[i]=[];if(!(i in r)){r[i]=null;const c=o[i]&&o[i].parent,a=c&&s(c);a&&(r[i]=[c].concat(a))}return r[i]}return(e||Object.keys(n).concat(Object.keys(o))).forEach(s),r}function ln(t,e,n){const o=t.icons,r=t.aliases||Object.create(null);let s={};function i(c){s=Dt(o[c]||r[c],s)}return i(e),n.forEach(i),Dt(t,s)}function oe(t,e){const n=[];if(typeof t!="object"||typeof t.icons!="object")return n;t.not_found instanceof Array&&t.not_found.forEach(r=>{e(r,null),n.push(r)});const o=un(t);for(const r in o){const s=o[r];s&&(e(r,ln(t,r,s)),n.push(r))}return n}const V=/^[a-z0-9]+(-[a-z0-9]+)*$/,N=(t,e,n,o="")=>{const r=t.split(":");if(t.slice(0,1)==="@"){if(r.length<2||r.length>3)return null;o=r.shift().slice(1)}if(r.length>3||!r.length)return null;if(r.length>1){const c=r.pop(),a=r.pop(),u={provider:r.length>0?r[0]:o,prefix:a,name:c};return e&&!nt(u)?null:u}const s=r[0],i=s.split("-");if(i.length>1){const c={provider:o,prefix:i.shift(),name:i.join("-")};return e&&!nt(c)?null:c}if(n&&o===""){const c={provider:o,prefix:"",name:s};return e&&!nt(c,n)?null:c}return null},nt=(t,e)=>t?!!((t.provider===""||t.provider.match(V))&&(e&&t.prefix===""||t.prefix.match(V))&&t.name.match(V)):!1,fn={provider:"",aliases:{},not_found:{},...re};function yt(t,e){for(const n in e)if(n in t&&typeof t[n]!=typeof e[n])return!1;return!0}function se(t){if(typeof t!="object"||t===null)return null;const e=t;if(typeof e.prefix!="string"||!t.icons||typeof t.icons!="object"||!yt(t,fn))return null;const n=e.icons;for(const r in n){const s=n[r];if(!r.match(V)||typeof s.body!="string"||!yt(s,wt))return null}const o=e.aliases||Object.create(null);for(const r in o){const s=o[r],i=s.parent;if(!r.match(V)||typeof i!="string"||!n[i]&&!o[i]||!yt(s,wt))return null}return e}const st=Object.create(null);function dn(t,e){return{provider:t,prefix:e,icons:Object.create(null),missing:new Set}}function O(t,e){const n=st[t]||(st[t]=Object.create(null));return n[e]||(n[e]=dn(t,e))}function At(t,e){return se(e)?oe(e,(n,o)=>{o?t.icons[n]=o:t.missing.add(n)}):[]}function pn(t,e,n){try{if(typeof n.body=="string")return t.icons[e]={...n},!0}catch{}return!1}function hn(t,e){let n=[];return(typeof t=="string"?[t]:Object.keys(st)).forEach(r=>{(typeof r=="string"&&typeof e=="string"?[e]:Object.keys(st[r]||{})).forEach(i=>{const c=O(r,i);n=n.concat(Object.keys(c.icons).map(a=>(r!==""?"@"+r+":":"")+i+":"+a))})}),n}let H=!1;function gn(t){return typeof t=="boolean"&&(H=t),H}function Q(t){const e=typeof t=="string"?N(t,!0,H):t;if(e){const n=O(e.provider,e.prefix),o=e.name;return n.icons[o]||(n.missing.has(o)?null:void 0)}}function ie(t,e){const n=N(t,!0,H);if(!n)return!1;const o=O(n.provider,n.prefix);return pn(o,n.name,e)}function ce(t,e){if(typeof t!="object")return!1;if(typeof e!="string"&&(e=t.provider||""),H&&!e&&!t.prefix){let r=!1;return se(t)&&(t.prefix="",oe(t,(s,i)=>{i&&ie(s,i)&&(r=!0)})),r}const n=t.prefix;if(!nt({provider:e,prefix:n,name:"a"}))return!1;const o=O(e,n);return!!At(o,t)}function yn(t){return!!Q(t)}function mn(t){const e=Q(t);return e?{...G,...e}:null}const ae=Object.freeze({width:null,height:null}),ue=Object.freeze({...ae,...ot}),bn=/(-?[0-9.]*[0-9]+[0-9.]*)/g,vn=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function xt(t,e,n){if(e===1)return t;if(n=n||100,typeof t=="number")return Math.ceil(t*e*n)/n;if(typeof t!="string")return t;const o=t.split(bn);if(o===null||!o.length)return t;const r=[];let s=o.shift(),i=vn.test(s);for(;;){if(i){const c=parseFloat(s);isNaN(c)?r.push(s):r.push(Math.ceil(c*e*n)/n)}else r.push(s);if(s=o.shift(),s===void 0)return r.join("");i=!i}}const Sn=t=>t==="unset"||t==="undefined"||t==="none";function lt(t,e){const n={...G,...t},o={...ue,...e},r={left:n.left,top:n.top,width:n.width,height:n.height};let s=n.body;[n,o].forEach(g=>{const m=[],I=g.hFlip,K=g.vFlip;let b=g.rotate;I?K?b+=2:(m.push("translate("+(r.width+r.left).toString()+" "+(0-r.top).toString()+")"),m.push("scale(-1 1)"),r.top=r.left=0):K&&(m.push("translate("+(0-r.left).toString()+" "+(r.height+r.top).toString()+")"),m.push("scale(1 -1)"),r.top=r.left=0);let v;switch(b<0&&(b-=Math.floor(b/4)*4),b=b%4,b){case 1:v=r.height/2+r.top,m.unshift("rotate(90 "+v.toString()+" "+v.toString()+")");break;case 2:m.unshift("rotate(180 "+(r.width/2+r.left).toString()+" "+(r.height/2+r.top).toString()+")");break;case 3:v=r.width/2+r.left,m.unshift("rotate(-90 "+v.toString()+" "+v.toString()+")");break}b%2===1&&(r.left!==r.top&&(v=r.left,r.left=r.top,r.top=v),r.width!==r.height&&(v=r.width,r.width=r.height,r.height=v)),m.length&&(s='<g transform="'+m.join(" ")+'">'+s+"</g>")});const i=o.width,c=o.height,a=r.width,u=r.height;let l,f;i===null?(f=c===null?"1em":c==="auto"?u:c,l=xt(f,a/u)):(l=i==="auto"?a:i,f=c===null?xt(l,u/a):c==="auto"?u:c);const d={},h=(g,m)=>{Sn(m)||(d[g]=m.toString())};return h("width",l),h("height",f),d.viewBox=r.left.toString()+" "+r.top.toString()+" "+a.toString()+" "+u.toString(),{attributes:d,body:s}}const wn=/\sid="(\S+)"/g,xn="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let On=0;function le(t,e=xn){const n=[];let o;for(;o=wn.exec(t);)n.push(o[1]);if(!n.length)return t;const r="suffix"+(Math.random()*16777216|Date.now()).toString(16);return n.forEach(s=>{const i=typeof e=="function"?e(s):e+(On++).toString(),c=s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");t=t.replace(new RegExp('([#;"])('+c+')([")]|\\.[a-z])',"g"),"$1"+i+r+"$3")}),t=t.replace(new RegExp(r,"g"),""),t}const C={local:!0,session:!0},fe={local:new Set,session:new Set};let $t=!1;function jn(t){$t=t}const Rt="iconify2",U="iconify",de=U+"-count",Vt=U+"-version",pe=36e5,In=168;function Ot(t,e){try{return t.getItem(e)}catch{}}function Lt(t,e,n){try{return t.setItem(e,n),!0}catch{}}function Bt(t,e){try{t.removeItem(e)}catch{}}function jt(t,e){return Lt(t,de,e.toString())}function It(t){return parseInt(Ot(t,de))||0}let X=typeof window>"u"?{}:window;function he(t){const e=t+"Storage";try{if(X&&X[e]&&typeof X[e].length=="number")return X[e]}catch{}C[t]=!1}function ge(t,e){const n=he(t);if(!n)return;const o=Ot(n,Vt);if(o!==Rt){if(o){const c=It(n);for(let a=0;a<c;a++)Bt(n,U+a.toString())}Lt(n,Vt,Rt),jt(n,0);return}const r=Math.floor(Date.now()/pe)-In,s=c=>{const a=U+c.toString(),u=Ot(n,a);if(typeof u=="string"){try{const l=JSON.parse(u);if(typeof l=="object"&&typeof l.cached=="number"&&l.cached>r&&typeof l.provider=="string"&&typeof l.data=="object"&&typeof l.data.prefix=="string"&&e(l,c))return!0}catch{}Bt(n,a)}};let i=It(n);for(let c=i-1;c>=0;c--)s(c)||(c===i-1?(i--,jt(n,i)):fe[t].add(c))}function ye(){if(!$t){jn(!0);for(const t in C)ge(t,e=>{const n=e.data,o=e.provider,r=n.prefix,s=O(o,r);if(!At(s,n).length)return!1;const i=n.lastModified||-1;return s.lastModifiedCached=s.lastModifiedCached?Math.min(s.lastModifiedCached,i):i,!0})}}function me(t,e){switch(t){case"local":case"session":C[t]=e;break;case"all":for(const n in C)C[n]=e;break}}const Tt=Object.create(null);function be(t,e){Tt[t]=e}function Ct(t){return Tt[t]||Tt[""]}function Mt(t){let e;if(typeof t.resources=="string")e=[t.resources];else if(e=t.resources,!(e instanceof Array)||!e.length)return null;return{resources:e,path:t.path||"/",maxURL:t.maxURL||500,rotate:t.rotate||750,timeout:t.timeout||5e3,random:t.random===!0,index:t.index||0,dataAfterTimeout:t.dataAfterTimeout!==!1}}const ft=Object.create(null),D=["https://api.simplesvg.com","https://api.unisvg.com"],rt=[];for(;D.length>0;)D.length===1||Math.random()>.5?rt.push(D.shift()):rt.push(D.pop());ft[""]=Mt({resources:["https://api.iconify.design"].concat(rt)});function ve(t,e){const n=Mt(e);return n===null?!1:(ft[t]=n,!0)}function dt(t){return ft[t]}function Tn(){return Object.keys(ft)}const Cn=()=>{let t;try{if(t=fetch,typeof t=="function")return t}catch{}};let it=Cn();function Pn(t){it=t}function En(){return it}function _n(t,e){const n=dt(t);if(!n)return 0;let o;if(!n.maxURL)o=0;else{let r=0;n.resources.forEach(i=>{r=Math.max(r,i.length)});const s=e+".json?icons=";o=n.maxURL-r-n.path.length-s.length}return o}function kn(t){return t===404}const An=(t,e,n)=>{const o=[],r=_n(t,e),s="icons";let i={type:s,provider:t,prefix:e,icons:[]},c=0;return n.forEach((a,u)=>{c+=a.length+1,c>=r&&u>0&&(o.push(i),i={type:s,provider:t,prefix:e,icons:[]},c=a.length),i.icons.push(a)}),o.push(i),o};function $n(t){if(typeof t=="string"){const e=dt(t);if(e)return e.path}return"/"}const Ln=(t,e,n)=>{if(!it){n("abort",424);return}let o=$n(e.provider);switch(e.type){case"icons":{const s=e.prefix,c=e.icons.join(","),a=new URLSearchParams({icons:c});o+=s+".json?"+a.toString();break}case"custom":{const s=e.uri;o+=s.slice(0,1)==="/"?s.slice(1):s;break}default:n("abort",400);return}let r=503;it(t+o).then(s=>{const i=s.status;if(i!==200){setTimeout(()=>{n(kn(i)?"abort":"next",i)});return}return r=501,s.json()}).then(s=>{if(typeof s!="object"||s===null){setTimeout(()=>{s===404?n("abort",s):n("next",r)});return}setTimeout(()=>{n("success",s)})}).catch(()=>{n("next",r)})},Mn={prepare:An,send:Ln};function Nn(t){const e={loaded:[],missing:[],pending:[]},n=Object.create(null);t.sort((r,s)=>r.provider!==s.provider?r.provider.localeCompare(s.provider):r.prefix!==s.prefix?r.prefix.localeCompare(s.prefix):r.name.localeCompare(s.name));let o={provider:"",prefix:"",name:""};return t.forEach(r=>{if(o.name===r.name&&o.prefix===r.prefix&&o.provider===r.provider)return;o=r;const s=r.provider,i=r.prefix,c=r.name,a=n[s]||(n[s]=Object.create(null)),u=a[i]||(a[i]=O(s,i));let l;c in u.icons?l=e.loaded:i===""||u.missing.has(c)?l=e.missing:l=e.pending;const f={provider:s,prefix:i,name:c};l.push(f)}),e}function Se(t,e){t.forEach(n=>{const o=n.loaderCallbacks;o&&(n.loaderCallbacks=o.filter(r=>r.id!==e))})}function Fn(t){t.pendingCallbacksFlag||(t.pendingCallbacksFlag=!0,setTimeout(()=>{t.pendingCallbacksFlag=!1;const e=t.loaderCallbacks?t.loaderCallbacks.slice(0):[];if(!e.length)return;let n=!1;const o=t.provider,r=t.prefix;e.forEach(s=>{const i=s.icons,c=i.pending.length;i.pending=i.pending.filter(a=>{if(a.prefix!==r)return!0;const u=a.name;if(t.icons[u])i.loaded.push({provider:o,prefix:r,name:u});else if(t.missing.has(u))i.missing.push({provider:o,prefix:r,name:u});else return n=!0,!0;return!1}),i.pending.length!==c&&(n||Se([t],s.id),s.callback(i.loaded.slice(0),i.missing.slice(0),i.pending.slice(0),s.abort))})}))}let Dn=0;function Rn(t,e,n){const o=Dn++,r=Se.bind(null,n,o);if(!e.pending.length)return r;const s={id:o,icons:e,callback:t,abort:r};return n.forEach(i=>{(i.loaderCallbacks||(i.loaderCallbacks=[])).push(s)}),r}function Vn(t,e=!0,n=!1){const o=[];return t.forEach(r=>{const s=typeof r=="string"?N(r,e,n):r;s&&o.push(s)}),o}var Bn={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function zn(t,e,n,o){const r=t.resources.length,s=t.random?Math.floor(Math.random()*r):t.index;let i;if(t.random){let p=t.resources.slice(0);for(i=[];p.length>1;){const w=Math.floor(Math.random()*p.length);i.push(p[w]),p=p.slice(0,w).concat(p.slice(w+1))}i=i.concat(p)}else i=t.resources.slice(s).concat(t.resources.slice(0,s));const c=Date.now();let a="pending",u=0,l,f=null,d=[],h=[];typeof o=="function"&&h.push(o);function g(){f&&(clearTimeout(f),f=null)}function m(){a==="pending"&&(a="aborted"),g(),d.forEach(p=>{p.status==="pending"&&(p.status="aborted")}),d=[]}function I(p,w){w&&(h=[]),typeof p=="function"&&h.push(p)}function K(){return{startTime:c,payload:e,status:a,queriesSent:u,queriesPending:d.length,subscribe:I,abort:m}}function b(){a="failed",h.forEach(p=>{p(void 0,l)})}function v(){d.forEach(p=>{p.status==="pending"&&(p.status="aborted")}),d=[]}function Ue(p,w,F){const Y=w!=="success";switch(d=d.filter(T=>T!==p),a){case"pending":break;case"failed":if(Y||!t.dataAfterTimeout)return;break;default:return}if(w==="abort"){l=F,b();return}if(Y){l=F,d.length||(i.length?gt():b());return}if(g(),v(),!t.random){const T=t.resources.indexOf(p.resource);T!==-1&&T!==t.index&&(t.index=T)}a="completed",h.forEach(T=>{T(F)})}function gt(){if(a!=="pending")return;g();const p=i.shift();if(p===void 0){if(d.length){f=setTimeout(()=>{g(),a==="pending"&&(v(),b())},t.timeout);return}b();return}const w={status:"pending",resource:p,callback:(F,Y)=>{Ue(w,F,Y)}};d.push(w),u++,f=setTimeout(gt,t.rotate),n(p,e,w.callback)}return setTimeout(gt),K}function we(t){const e={...Bn,...t};let n=[];function o(){n=n.filter(c=>c().status==="pending")}function r(c,a,u){const l=zn(e,c,a,(f,d)=>{o(),u&&u(f,d)});return n.push(l),l}function s(c){return n.find(a=>c(a))||null}return{query:r,find:s,setIndex:c=>{e.index=c},getIndex:()=>e.index,cleanup:o}}function zt(){}const mt=Object.create(null);function qn(t){if(!mt[t]){const e=dt(t);if(!e)return;const n=we(e),o={config:e,redundancy:n};mt[t]=o}return mt[t]}function xe(t,e,n){let o,r;if(typeof t=="string"){const s=Ct(t);if(!s)return n(void 0,424),zt;r=s.send;const i=qn(t);i&&(o=i.redundancy)}else{const s=Mt(t);if(s){o=we(s);const i=t.resources?t.resources[0]:"",c=Ct(i);c&&(r=c.send)}}return!o||!r?(n(void 0,424),zt):o.query(e,r,n)().abort}function Hn(t,e){const n=t.lastModifiedCached;if(n&&n>=e)return n===e;if(t.lastModifiedCached=e,n)for(const o in C)ge(o,r=>{const s=r.data;return r.provider!==t.provider||s.prefix!==t.prefix||s.lastModified===e});return!0}function Un(t,e){$t||ye();function n(o){let r;if(!C[o]||!(r=he(o)))return;const s=fe[o];let i;if(s.size)s.delete(i=Array.from(s).shift());else if(i=It(r),!jt(r,i+1))return;const c={cached:Math.floor(Date.now()/pe),provider:t.provider,data:e};return Lt(r,U+i.toString(),JSON.stringify(c))}e.lastModified&&!Hn(t,e.lastModified)||Object.keys(e.icons).length&&(e.not_found&&(e=Object.assign({},e),delete e.not_found),n("local")||n("session"))}function qt(){}function Gn(t){t.iconsLoaderFlag||(t.iconsLoaderFlag=!0,setTimeout(()=>{t.iconsLoaderFlag=!1,Fn(t)}))}function Qn(t,e){t.iconsToLoad?t.iconsToLoad=t.iconsToLoad.concat(e).sort():t.iconsToLoad=e,t.iconsQueueFlag||(t.iconsQueueFlag=!0,setTimeout(()=>{t.iconsQueueFlag=!1;const{provider:n,prefix:o}=t,r=t.iconsToLoad;delete t.iconsToLoad;let s;if(!r||!(s=Ct(n)))return;s.prepare(n,o,r).forEach(c=>{xe(n,c,a=>{if(typeof a!="object")c.icons.forEach(u=>{t.missing.add(u)});else try{const u=At(t,a);if(!u.length)return;const l=t.pendingIcons;l&&u.forEach(f=>{l.delete(f)}),Un(t,a)}catch(u){console.error(u)}Gn(t)})})}))}const Wn=t=>{const n=O(t.provider,t.prefix).pendingIcons;return!!(n&&n.has(t.name))},Nt=(t,e)=>{const n=Vn(t,!0,gn()),o=Nn(n);if(!o.pending.length){let a=!0;return e&&setTimeout(()=>{a&&e(o.loaded,o.missing,o.pending,qt)}),()=>{a=!1}}const r=Object.create(null),s=[];let i,c;return o.pending.forEach(a=>{const{provider:u,prefix:l}=a;if(l===c&&u===i)return;i=u,c=l,s.push(O(u,l));const f=r[u]||(r[u]=Object.create(null));f[l]||(f[l]=[])}),o.pending.forEach(a=>{const{provider:u,prefix:l,name:f}=a,d=O(u,l),h=d.pendingIcons||(d.pendingIcons=new Set);h.has(f)||(h.add(f),r[u][l].push(f))}),s.forEach(a=>{const{provider:u,prefix:l}=a;r[u][l].length&&Qn(a,r[u][l])}),e?Rn(e,o,s):qt},Jn=t=>new Promise((e,n)=>{const o=typeof t=="string"?N(t,!0):t;if(!o){n(t);return}Nt([o||t],r=>{if(r.length&&o){const s=Q(o);if(s){e({...G,...s});return}}n(t)})});function Oe(t,e){const n={...t};for(const o in e){const r=e[o],s=typeof r;o in ae?(r===null||r&&(s==="string"||s==="number"))&&(n[o]=r):s===typeof n[o]&&(n[o]=o==="rotate"?r%4:r)}return n}const pt={...ue,inline:!1},bt="iconify",Pt="iconify-inline",j="iconifyData"+Date.now();let P=[];function W(t){for(let e=0;e<P.length;e++){const n=P[e];if((typeof n.node=="function"?n.node():n.node)===t)return n}}function je(t,e=!1){let n=W(t);return n?(n.temporary&&(n.temporary=e),n):(n={node:t,temporary:e},P.push(n),n)}function Kn(){if(document.documentElement)return je(document.documentElement);P.push({node:()=>document.documentElement})}function Yn(t){P=P.filter(e=>t!==e&&t!==(typeof e.node=="function"?e.node():e.node))}function J(){return P}function Xn(t){const e=document;e.readyState&&e.readyState!=="loading"?t():e.addEventListener("DOMContentLoaded",t)}let B=null;const Zn={childList:!0,subtree:!0,attributes:!0};function Ie(t){if(!t.observer)return;const e=t.observer;e.pendingScan||(e.pendingScan=setTimeout(()=>{delete e.pendingScan,B&&B(t)}))}function tr(t,e){if(!t.observer)return;const n=t.observer;if(!n.pendingScan)for(let o=0;o<e.length;o++){const r=e[o];if(r.addedNodes&&r.addedNodes.length>0||r.type==="attributes"&&r.target[j]!==void 0){n.paused||Ie(t);return}}}function Te(t,e){t.observer.instance.observe(e,Zn)}function ct(t){let e=t.observer;if(e&&e.instance)return;const n=typeof t.node=="function"?t.node():t.node;!n||!window||(e||(e={paused:0},t.observer=e),e.instance=new window.MutationObserver(tr.bind(null,t)),Te(t,n),e.paused||Ie(t))}function Ht(){J().forEach(ct)}function Ce(t){if(!t.observer)return;const e=t.observer;e.pendingScan&&(clearTimeout(e.pendingScan),delete e.pendingScan),e.instance&&(e.instance.disconnect(),delete e.instance)}function er(t){const e=B!==null;if(B!==t&&(B=t,e&&J().forEach(Ce)),e){Ht();return}Xn(Ht)}function Et(t){(t?[t]:J()).forEach(e=>{if(!e.observer){e.observer={paused:1};return}const n=e.observer;if(n.paused++,n.paused>1||!n.instance)return;n.instance.disconnect()})}function nr(t){if(t){const e=W(t);e&&Et(e)}else Et()}function _t(t){(t?[t]:J()).forEach(e=>{if(!e.observer){ct(e);return}const n=e.observer;if(n.paused&&(n.paused--,!n.paused)){const o=typeof e.node=="function"?e.node():e.node;if(o)n.instance?Te(e,o):ct(e);else return}})}function rr(t){if(t){const e=W(t);e&&_t(e)}else _t()}function Pe(t,e=!1){const n=je(t,e);return ct(n),n}function Ee(t){const e=W(t);e&&(Ce(e),Yn(t))}function or(t,e){if(t.name!==e.name||t.mode!==e.mode)return!0;const n=t.customisations,o=e.customisations;for(const r in pt)if(n[r]!==o[r])return!0;return!1}function sr(t,e=0){const n=t.replace(/^-?[0-9.]*/,"");function o(r){for(;r<0;)r+=4;return r%4}if(n===""){const r=parseInt(t);return isNaN(r)?0:o(r)}else if(n!==t){let r=0;switch(n){case"%":r=25;break;case"deg":r=90}if(r){let s=parseFloat(t.slice(0,t.length-n.length));return isNaN(s)?0:(s=s/r,s%1===0?o(s):0)}}return e}const ir=/[\s,]+/;function cr(t,e){e.split(ir).forEach(n=>{switch(n.trim()){case"horizontal":t.hFlip=!0;break;case"vertical":t.vFlip=!0;break}})}const ar=["width","height"],ur=["inline","hFlip","vFlip"];function lr(t,e){return t===e||t==="true"?!0:t===""||t==="false"?!1:null}function fr(t){const e=t.getAttribute("data-icon"),n=typeof e=="string"&&N(e,!0);if(!n)return null;const o={...pt,inline:t.classList&&t.classList.contains(Pt)};ar.forEach(c=>{const a=t.getAttribute("data-"+c);a&&(o[c]=a)});const r=t.getAttribute("data-rotate");typeof r=="string"&&(o.rotate=sr(r));const s=t.getAttribute("data-flip");typeof s=="string"&&cr(o,s),ur.forEach(c=>{const a="data-"+c,u=lr(t.getAttribute(a),a);typeof u=="boolean"&&(o[c]=u)});const i=t.getAttribute("data-mode");return{name:e,icon:n,customisations:o,mode:i}}const dr="svg."+bt+", i."+bt+", span."+bt+", i."+Pt+", span."+Pt;function pr(t){const e=[];return t.querySelectorAll(dr).forEach(n=>{const o=n[j]||n.tagName.toLowerCase()!=="svg"?fr(n):null;o&&e.push({node:n,props:o})}),e}function _e(t,e){let n=t.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const o in e)n+=" "+o+'="'+e[o]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+t+"</svg>"}let z;function hr(){try{z=window.trustedTypes.createPolicy("iconify",{createHTML:t=>t})}catch{z=null}}function gr(t){return z===void 0&&hr(),z?z.createHTML(t):t}function ke(t){const e=new Set(["iconify"]);return["provider","prefix"].forEach(n=>{t[n]&&e.add("iconify--"+t[n])}),e}function Ae(t,e,n,o){const r=t.classList;if(o){const i=o.classList;Array.from(i).forEach(c=>{r.add(c)})}const s=[];return e.forEach(i=>{r.contains(i)?n.has(i)&&s.push(i):(r.add(i),s.push(i))}),n.forEach(i=>{e.has(i)||r.remove(i)}),s}function $e(t,e,n){const o=t.style;(n||[]).forEach(s=>{o.removeProperty(s)});const r=[];for(const s in e)o.getPropertyValue(s)||(r.push(s),o.setProperty(s,e[s]));return r}function Le(t,e,n){let o;try{o=document.createElement("span")}catch{return t}const r=e.customisations,s=lt(n,r),i=t[j],c=_e(le(s.body),{"aria-hidden":"true",role:"img",...s.attributes});o.innerHTML=gr(c);const a=o.childNodes[0],u=t.attributes;for(let g=0;g<u.length;g++){const m=u.item(g),I=m.name;I!=="class"&&!a.hasAttribute(I)&&a.setAttribute(I,m.value)}const l=ke(e.icon),f=Ae(a,l,new Set(i&&i.addedClasses),t),d=$e(a,r.inline?{"vertical-align":"-0.125em"}:{},i&&i.addedStyles),h={...e,status:"loaded",addedClasses:f,addedStyles:d};return a[j]=h,t.parentNode&&t.parentNode.replaceChild(a,t),a}function yr(t){return t.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function mr(t){return"data:image/svg+xml,"+yr(t)}function br(t){return'url("'+mr(t)+'")'}const vr={display:"inline-block"},kt={"background-color":"currentColor"},Me={"background-color":"transparent"},Ut={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},Gt={"-webkit-mask":kt,mask:kt,background:Me};for(const t in Gt){const e=Gt[t];for(const n in Ut)e[t+"-"+n]=Ut[n]}function Qt(t){return t+(t.match(/^[-0-9.]+$/)?"px":"")}function Sr(t,e,n,o){const r=e.customisations,s=lt(n,r),i=s.attributes,c=t[j],a=_e(s.body,{...i,width:n.width+"",height:n.height+""}),u=ke(e.icon),l=Ae(t,u,new Set(c&&c.addedClasses)),d={"--svg":br(a),width:Qt(i.width),height:Qt(i.height),...vr,...o?kt:Me};r.inline&&(d["vertical-align"]="-0.125em");const h=$e(t,d,c&&c.addedStyles),g={...e,status:"loaded",addedClasses:l,addedStyles:h};return t[j]=g,t}let Z=!1;function wr(){Z||(Z=!0,setTimeout(()=>{Z&&(Z=!1,A())}))}function A(t,e=!1){const n=Object.create(null);function o(r,s){const{provider:i,prefix:c,name:a}=r,u=O(i,c),l=u.icons[a];if(l)return{status:"loaded",icon:l};if(u.missing.has(a))return{status:"missing"};if(s&&!Wn(r)){const f=n[i]||(n[i]=Object.create(null));(f[c]||(f[c]=new Set)).add(a)}return{status:"loading"}}(t?[t]:J()).forEach(r=>{const s=typeof r.node=="function"?r.node():r.node;if(!s||!s.querySelectorAll)return;let i=!1,c=!1;function a(u,l,f){if(c||(c=!0,Et(r)),u.tagName.toUpperCase()!=="SVG"){const d=l.mode,h=d==="mask"||(d==="bg"?!1:d==="style"?f.body.indexOf("currentColor")!==-1:null);if(typeof h=="boolean"){Sr(u,l,{...G,...f},h);return}}Le(u,l,f)}pr(s).forEach(({node:u,props:l})=>{const f=u[j];if(!f){const{status:h,icon:g}=o(l.icon,!0);if(g){a(u,l,g);return}i=i||h==="loading",u[j]={...l,status:h};return}let d;if(or(f,l)){if(d=o(l.icon,f.name!==l.name),!d.icon){i=i||d.status==="loading",Object.assign(f,{...l,status:d.status});return}}else{if(f.status!=="loading")return;if(d=o(l.icon,!1),!d.icon){f.status=d.status;return}}a(u,l,d.icon)}),r.temporary&&!i?Ee(s):e&&i?Pe(s,!0):c&&r.observer&&_t(r)});for(const r in n){const s=n[r];for(const i in s){const c=s[i];Nt(Array.from(c).map(a=>({provider:r,prefix:i,name:a})),wr)}}}function xr(t){const e=W(t);e?A(e):A({node:t,temporary:!0},!0)}function Ne(t,e,n=!1){const o=Q(t);if(!o)return null;const r=N(t),s=Oe(pt,e||{}),i=Le(document.createElement("span"),{name:t,icon:r,customisations:s},o);return n?i.outerHTML:i}function Or(){return"3.1.1"}function jr(t,e){return Ne(t,e,!1)}function Ir(t,e){return Ne(t,e,!0)}function Tr(t,e){const n=Q(t);if(!n)return null;const o=Oe(pt,e||{});return lt(n,o)}function Cr(t){t?xr(t):A()}if(typeof document<"u"&&typeof window<"u"){Kn();const t=window;if(t.IconifyPreload!==void 0){const e=t.IconifyPreload,n="Invalid IconifyPreload syntax.";typeof e=="object"&&e!==null&&(e instanceof Array?e:[e]).forEach(o=>{try{(typeof o!="object"||o===null||o instanceof Array||typeof o.icons!="object"||typeof o.prefix!="string"||!ce(o))&&console.error(n)}catch{console.error(n)}})}setTimeout(()=>{er(A),A()})}function Pr(t,e){me(t,e!==!1)}function Er(t){me(t,!0)}be("",Mn);if(typeof document<"u"&&typeof window<"u"){ye();const t=window;if(t.IconifyProviders!==void 0){const e=t.IconifyProviders;if(typeof e=="object"&&e!==null)for(const n in e){const o="IconifyProviders["+n+"] is invalid.";try{const r=e[n];if(typeof r!="object"||!r||r.resources===void 0)continue;ve(n,r)||console.error(o)}catch{console.error(o)}}}}const _r={getAPIConfig:dt,setAPIModule:be,sendAPIQuery:xe,setFetch:Pn,getFetch:En,listAPIProviders:Tn},Fe={_api:_r,addAPIProvider:ve,loadIcons:Nt,loadIcon:Jn,iconExists:yn,getIcon:mn,listIcons:hn,addIcon:ie,addCollection:ce,replaceIDs:le,calculateSize:xt,buildIcon:lt,getVersion:Or,renderSVG:jr,renderHTML:Ir,renderIcon:Tr,scan:Cr,observe:Pe,stopObserving:Ee,pauseObserver:nr,resumeObserver:rr,enableCache:Pr,disableCache:Er};try{self.Iconify===void 0&&(self.Iconify=Fe)}catch{}var kr=typeof global=="object"&&global&&global.Object===Object&&global;const Ar=kr;var $r=typeof self=="object"&&self&&self.Object===Object&&self,Lr=Ar||$r||Function("return this")();const Mr=Lr;var Nr=Mr.Symbol;const at=Nr;var De=Object.prototype,Fr=De.hasOwnProperty,Dr=De.toString,R=at?at.toStringTag:void 0;function Rr(t){var e=Fr.call(t,R),n=t[R];try{t[R]=void 0;var o=!0}catch{}var r=Dr.call(t);return o&&(e?t[R]=n:delete t[R]),r}var Vr=Object.prototype,Br=Vr.toString;function zr(t){return Br.call(t)}var qr="[object Null]",Hr="[object Undefined]",Wt=at?at.toStringTag:void 0;function Ur(t){return t==null?t===void 0?Hr:qr:Wt&&Wt in Object(t)?Rr(t):zr(t)}function Gr(t){return t!=null&&typeof t=="object"}var Qr=Array.isArray;const Wr=Qr;var Jr="[object String]";function Kr(t){return typeof t=="string"||!Wr(t)&&Gr(t)&&Ur(t)==Jr}/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */function Jt(t){return Object.prototype.toString.call(t)==="[object Object]"}function Yr(t){var e,n;return Jt(t)===!1?!1:(e=t.constructor,e===void 0?!0:(n=e.prototype,!(Jt(n)===!1||n.hasOwnProperty("isPrototypeOf")===!1)))}function q(){return q=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},q.apply(this,arguments)}function Re(t,e){if(t==null)return{};var n,o,r={},s=Object.keys(t);for(o=0;o<s.length;o++)e.indexOf(n=s[o])>=0||(r[n]=t[n]);return r}const Xr={silent:!1,logLevel:"warn"},Zr=["validator"],Ve=Object.prototype,Be=Ve.toString,to=Ve.hasOwnProperty,ze=/^\s*function (\w+)/;function Kt(t){var e;const n=(e=t==null?void 0:t.type)!==null&&e!==void 0?e:t;if(n){const o=n.toString().match(ze);return o?o[1]:""}return""}const E=Yr,eo=t=>t;let y=eo;const $=(t,e)=>to.call(t,e),no=Number.isInteger||function(t){return typeof t=="number"&&isFinite(t)&&Math.floor(t)===t},L=Array.isArray||function(t){return Be.call(t)==="[object Array]"},M=t=>Be.call(t)==="[object Function]",ut=(t,e)=>E(t)&&$(t,"_vueTypes_name")&&(!e||t._vueTypes_name===e),qe=t=>E(t)&&($(t,"type")||["_vueTypes_name","validator","default","required"].some(e=>$(t,e)));function Ft(t,e){return Object.defineProperty(t.bind(e),"__original",{value:t})}function _(t,e,n=!1){let o,r=!0,s="";o=E(t)?t:{type:t};const i=ut(o)?o._vueTypes_name+" - ":"";if(qe(o)&&o.type!==null){if(o.type===void 0||o.type===!0||!o.required&&e==null)return r;L(o.type)?(r=o.type.some(c=>_(c,e,!0)===!0),s=o.type.map(c=>Kt(c)).join(" or ")):(s=Kt(o),r=s==="Array"?L(e):s==="Object"?E(e):s==="String"||s==="Number"||s==="Boolean"||s==="Function"?function(c){if(c==null)return"";const a=c.constructor.toString().match(ze);return a?a[1].replace(/^Async/,""):""}(e)===s:e instanceof o.type)}if(!r){const c=`${i}value "${e}" should be of type "${s}"`;return n===!1?(y(c),!1):c}if($(o,"validator")&&M(o.validator)){const c=y,a=[];if(y=u=>{a.push(u)},r=o.validator(e),y=c,!r){const u=(a.length>1?"* ":"")+a.join(`
* `);return a.length=0,n===!1?(y(u),r):u}}return r}function S(t,e){const n=Object.defineProperties(e,{_vueTypes_name:{value:t,writable:!0},isRequired:{get(){return this.required=!0,this}},def:{value(r){return r===void 0?this.type===Boolean||Array.isArray(this.type)&&this.type.includes(Boolean)?void(this.default=void 0):($(this,"default")&&delete this.default,this):M(r)||_(this,r,!0)===!0?(this.default=L(r)?()=>[...r]:E(r)?()=>Object.assign({},r):r,this):(y(`${this._vueTypes_name} - invalid default value: "${r}"`),this)}}}),{validator:o}=n;return M(o)&&(n.validator=Ft(o,n)),n}function x(t,e){const n=S(t,e);return Object.defineProperty(n,"validate",{value(o){return M(this.validator)&&y(`${this._vueTypes_name} - calling .validate() will overwrite the current custom validator function. Validator info:
${JSON.stringify(this)}`),this.validator=Ft(o,this),this}})}function Yt(t,e,n){const o=function(a){const u={};return Object.getOwnPropertyNames(a).forEach(l=>{u[l]=Object.getOwnPropertyDescriptor(a,l)}),Object.defineProperties({},u)}(e);if(o._vueTypes_name=t,!E(n))return o;const{validator:r}=n,s=Re(n,Zr);if(M(r)){let{validator:a}=o;a&&(a=(c=(i=a).__original)!==null&&c!==void 0?c:i),o.validator=Ft(a?function(u){return a.call(this,u)&&r.call(this,u)}:r,o)}var i,c;return Object.assign(o,s)}function ht(t){return t.replace(/^(?!\s*$)/gm,"  ")}const ro=()=>x("any",{}),oo=()=>x("function",{type:Function}),Xt=()=>x("boolean",{type:Boolean}),so=()=>x("string",{type:String}),io=()=>x("number",{type:Number}),co=()=>x("array",{type:Array}),ao=()=>x("object",{type:Object}),uo=()=>S("integer",{type:Number,validator(t){const e=no(t);return e===!1&&y(`integer - "${t}" is not an integer`),e}}),lo=()=>S("symbol",{validator(t){const e=typeof t=="symbol";return e===!1&&y(`symbol - invalid value "${t}"`),e}}),fo=()=>Object.defineProperty({type:null,validator(t){const e=t===null;return e===!1&&y("nullable - value should be null"),e}},"_vueTypes_name",{value:"nullable"});function po(t,e="custom validation failed"){if(typeof t!="function")throw new TypeError("[VueTypes error]: You must provide a function as argument");return S(t.name||"<<anonymous function>>",{type:null,validator(n){const o=t(n);return o||y(`${this._vueTypes_name} - ${e}`),o}})}function ho(t){if(!L(t))throw new TypeError("[VueTypes error]: You must provide an array as argument.");const e=`oneOf - value should be one of "${t.map(o=>typeof o=="symbol"?o.toString():o).join('", "')}".`,n={validator(o){const r=t.indexOf(o)!==-1;return r||y(e),r}};if(t.indexOf(null)===-1){const o=t.reduce((r,s)=>{if(s!=null){const i=s.constructor;r.indexOf(i)===-1&&r.push(i)}return r},[]);o.length>0&&(n.type=o)}return S("oneOf",n)}function go(t){if(!L(t))throw new TypeError("[VueTypes error]: You must provide an array as argument");let e=!1,n=!1,o=[];for(let s=0;s<t.length;s+=1){const i=t[s];if(qe(i)){if(M(i.validator)&&(e=!0),ut(i,"oneOf")&&i.type){o=o.concat(i.type);continue}if(ut(i,"nullable")){n=!0;continue}if(i.type===!0||!i.type){y('oneOfType - invalid usage of "true" and "null" as types.');continue}o=o.concat(i.type)}else o.push(i)}o=o.filter((s,i)=>o.indexOf(s)===i);const r=n===!1&&o.length>0?o:null;return S("oneOfType",e?{type:r,validator(s){const i=[],c=t.some(a=>{const u=_(a,s,!0);return typeof u=="string"&&i.push(u),u===!0});return c||y(`oneOfType - provided value does not match any of the ${i.length} passed-in validators:
${ht(i.join(`
`))}`),c}}:{type:r})}function yo(t){return S("arrayOf",{type:Array,validator(e){let n="";const o=e.every(r=>(n=_(t,r,!0),n===!0));return o||y(`arrayOf - value validation error:
${ht(n)}`),o}})}function mo(t){return S("instanceOf",{type:t})}function bo(t){return S("objectOf",{type:Object,validator(e){let n="";const o=Object.keys(e).every(r=>(n=_(t,e[r],!0),n===!0));return o||y(`objectOf - value validation error:
${ht(n)}`),o}})}function vo(t){const e=Object.keys(t),n=e.filter(r=>{var s;return!((s=t[r])===null||s===void 0||!s.required)}),o=S("shape",{type:Object,validator(r){if(!E(r))return!1;const s=Object.keys(r);if(n.length>0&&n.some(i=>s.indexOf(i)===-1)){const i=n.filter(c=>s.indexOf(c)===-1);return y(i.length===1?`shape - required property "${i[0]}" is not defined.`:`shape - required properties "${i.join('", "')}" are not defined.`),!1}return s.every(i=>{if(e.indexOf(i)===-1)return this._vueTypes_isLoose===!0||(y(`shape - shape definition does not include a "${i}" property. Allowed keys: "${e.join('", "')}".`),!1);const c=_(t[i],r[i],!0);return typeof c=="string"&&y(`shape - "${i}" property validation error:
 ${ht(c)}`),c===!0})}});return Object.defineProperty(o,"_vueTypes_isLoose",{writable:!0,value:!1}),Object.defineProperty(o,"loose",{get(){return this._vueTypes_isLoose=!0,this}}),o}const So=["name","validate","getter"],wo=(()=>{var t;return(t=class{static get any(){return ro()}static get func(){return oo().def(this.defaults.func)}static get bool(){return this.defaults.bool===void 0?Xt():Xt().def(this.defaults.bool)}static get string(){return so().def(this.defaults.string)}static get number(){return io().def(this.defaults.number)}static get array(){return co().def(this.defaults.array)}static get object(){return ao().def(this.defaults.object)}static get integer(){return uo().def(this.defaults.integer)}static get symbol(){return lo()}static get nullable(){return fo()}static extend(e){if(y("VueTypes.extend is deprecated. Use the ES6+ method instead. See https://dwightjack.github.io/vue-types/advanced/extending-vue-types.html#extending-namespaced-validators-in-es6 for details."),L(e))return e.forEach(a=>this.extend(a)),this;const{name:n,validate:o=!1,getter:r=!1}=e,s=Re(e,So);if($(this,n))throw new TypeError(`[VueTypes error]: Type "${n}" already defined`);const{type:i}=s;if(ut(i))return delete s.type,Object.defineProperty(this,n,r?{get:()=>Yt(n,i,s)}:{value(...a){const u=Yt(n,i,s);return u.validator&&(u.validator=u.validator.bind(u,...a)),u}});let c;return c=r?{get(){const a=Object.assign({},s);return o?x(n,a):S(n,a)},enumerable:!0}:{value(...a){const u=Object.assign({},s);let l;return l=o?x(n,u):S(n,u),u.validator&&(l.validator=u.validator.bind(l,...a)),l},enumerable:!0},Object.defineProperty(this,n,c)}}).defaults={},t.sensibleDefaults=void 0,t.config=Xr,t.custom=po,t.oneOf=ho,t.instanceOf=mo,t.oneOfType=go,t.arrayOf=yo,t.objectOf=bo,t.shape=vo,t.utils={validate:(e,n)=>_(n,e,!0)===!0,toType:(e,n,o=!1)=>o?x(e,n):S(e,n)},t})();function He(t={func:()=>{},bool:!0,string:"",number:0,array:()=>[],object:()=>({}),integer:0}){var e;return(e=class extends wo{static get sensibleDefaults(){return q({},this.defaults)}static set sensibleDefaults(n){this.defaults=n!==!1?q({},n!==!0?n:t):{}}}).defaults=q({},t),e}class jo extends He(){}const xo=He({func:void 0,bool:void 0,string:void 0,number:void 0,object:void 0,integer:void 0});class tt extends xo{static get style(){return x("style",{type:[String,Object]})}static get VNodeChild(){return x("VNodeChild",{type:void 0})}}const Zt="|svg",Io=te({name:"Icon",__name:"abIcon",props:{icon:tt.string,color:tt.string,size:{type:[String,Number],default:16},spin:tt.bool.def(!1),prefix:tt.string.def("")},setup(t){const e=t,n=Je(null),o=k(()=>{var a;return(a=e.icon)==null?void 0:a.endsWith(Zt)}),r=k(()=>e.icon.replace(Zt,"")),s=k(()=>`${e.prefix?e.prefix+":":""}${e.icon}`),i=async()=>{if(et(o))return;const a=et(n);if(!a)return;await Ze();const u=et(s);if(!u)return;const l=Fe.renderSVG(u,{});if(l)a.textContent="",a.appendChild(l);else{const f=document.createElement("span");f.className="iconify",f.dataset.icon=u,a.textContent="",a.appendChild(f)}},c=k(()=>{const{size:a,color:u}=e;let l=a;return Kr(a)&&(l=parseInt(a,10)),{fontSize:`${l}px`,color:u,display:"inline-flex"}});return Ke(()=>e.icon,i,{flush:"post"}),Ye(i),(a,u)=>o.value?(vt(),Xe(cn,{key:0,size:t.size,name:r.value,class:St([a.$attrs.class,"anticon"]),spin:t.spin},null,8,["size","name","class","spin"])):(vt(),ee("span",{key:1,ref_key:"elRef",ref:n,class:St([a.$attrs.class,"app-iconify anticon",t.spin&&"app-iconify-spin"]),style:ne(c.value)},null,6))}});export{Io as _};