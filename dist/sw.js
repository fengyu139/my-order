if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const a=s=>l(s,r),t={module:{uri:r},exports:u,require:a};e[r]=Promise.all(i.map((s=>t[s]||a(s)))).then((s=>(n(...s),u)))}}define(["./workbox-4de3aa5f"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/abIcon-6a593099.css",revision:null},{url:"assets/abIcon.vue_vue_type_style_index_0_lang-1a1a9b43.js",revision:null},{url:"assets/Cell-f0271993.js",revision:null},{url:"assets/chat-ad4b674b.css",revision:null},{url:"assets/chat-b4d2c24e.js",revision:null},{url:"assets/Checked-1664ce92.js",revision:null},{url:"assets/CheckNormal-27ecca24.js",revision:null},{url:"assets/demo-59276a69.js",revision:null},{url:"assets/home-8fcbf788.css",revision:null},{url:"assets/home-ee213a07.js",revision:null},{url:"assets/index-06ceaaf5.css",revision:null},{url:"assets/index-0c47a5bb.css",revision:null},{url:"assets/index-0f2aa826.js",revision:null},{url:"assets/index-12190a84.js",revision:null},{url:"assets/index-17641e15.css",revision:null},{url:"assets/index-2725b4f4.css",revision:null},{url:"assets/index-29892cda-4c2bd712.js",revision:null},{url:"assets/index-3b307b6b.css",revision:null},{url:"assets/index-41b06edc.css",revision:null},{url:"assets/index-5f7ff0ab.css",revision:null},{url:"assets/index-7a7385e4-c5ab4cd4.js",revision:null},{url:"assets/index-83bb8677.js",revision:null},{url:"assets/index-97b44e6c-3229dcc2.js",revision:null},{url:"assets/index-9ea07d5a.js",revision:null},{url:"assets/index-a0f0bb16.css",revision:null},{url:"assets/index-ab068c28.js",revision:null},{url:"assets/index-ab5e3c65.css",revision:null},{url:"assets/index-c084f3e1.js",revision:null},{url:"assets/index-c12f429d.css",revision:null},{url:"assets/index-c19a858b.js",revision:null},{url:"assets/index-c5eb6854.js",revision:null},{url:"assets/index-ca6b1194.css",revision:null},{url:"assets/index-cbeb036d.js",revision:null},{url:"assets/index-d53667ab.js",revision:null},{url:"assets/index-dc701ce9.css",revision:null},{url:"assets/index-e657c784.js",revision:null},{url:"assets/index-eea3b958.css",revision:null},{url:"assets/index-f4ed2ffc.js",revision:null},{url:"assets/index-f8cef8db.js",revision:null},{url:"assets/login-08a8d8aa.css",revision:null},{url:"assets/login-afc5acd5.js",revision:null},{url:"assets/manage-39134bac.js",revision:null},{url:"assets/manage-49588f3c.css",revision:null},{url:"assets/order-3831a7be.js",revision:null},{url:"assets/order-8416462b.css",revision:null},{url:"assets/orderDetail-04d12fe8.js",revision:null},{url:"assets/orderDetail-0cd1e4d2.css",revision:null},{url:"assets/Plus-bb377253.js",revision:null},{url:"assets/raf-729dad54-ecc02616.js",revision:null},{url:"assets/settlement-198a010b.js",revision:null},{url:"assets/statistics-2909666c.js",revision:null},{url:"assets/Sticky-bb3bdbe5.js",revision:null},{url:"index.html",revision:"e6eaf5d0e4b29bb3c147138423731c1b"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"manifest.webmanifest",revision:"50011dd7e9e340c228d7a17c305f6f75"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
