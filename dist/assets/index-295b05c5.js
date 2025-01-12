import{p as m}from"./pxCheck-DN6FYV6q-3938f682.js";import{I as C,J as I,o as w,e as g,m as d,n as B,f as p,d as $,w as j,ah as D,c as k,a as A,g as h,t as N,u as i,R as E}from"./index-3f55ee30.js";import{w as F}from"./Plus-25201ca1.js";import{u as R}from"./common-BH7uB7Cn-ad9c9445.js";const W=I("minus"),J=p("path",{d:"M299.52 460.8h409.6c28.16 0 51.2 23.04 51.2 51.2s-23.04 51.2-51.2 51.2h-409.6c-28.16 0-51.2-23.04-51.2-51.2s23.04-51.2 51.2-51.2z",fill:"currentColor","fill-opacity":"0.9"},null,-1),M=[J];function U(a,u,r,l,n,c){return w(),g("svg",{class:d(a.classes),style:B(a.style),xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024",role:"presentation"},M,6)}const q=C(W,[["render",U]]);var G=Object.defineProperty,H=Object.defineProperties,K=Object.getOwnPropertyDescriptors,_=Object.getOwnPropertySymbols,L=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable,v=(a,u,r)=>u in a?G(a,u,{enumerable:!0,configurable:!0,writable:!0,value:r}):a[u]=r,T=(a,u)=>{for(var r in u||(u={}))L.call(u,r)&&v(a,r,u[r]);if(_)for(var r of _(u))Q.call(u,r)&&v(a,r,u[r]);return a},X=(a,u)=>H(a,K(u));const Y=["min","max","disabled","readonly","value"],Z=$(X(T({},{name:"NutInputNumber",inheritAttrs:!1}),{__name:"input-number",props:{modelValue:{default:0},inputWidth:{default:""},buttonSize:{default:""},min:{default:1},max:{default:9999},step:{default:1},decimalPlaces:{default:0},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1}},emits:["update:modelValue","change","blur","focus","reduce","add","overlimit"],setup(a,{emit:u}){const r=a,l=u,n=R(D(r,"disabled")),c=k(()=>{const e="nut-input-number";return{[e]:!0,[`${e}--disabled`]:n.value}}),y=e=>Number(e).toFixed(Number(r.decimalPlaces)),P=e=>{const t=e.target;l("update:modelValue",t.value,e),l("change",t.value,e)},s=(e,t)=>{let o=y(e);l("update:modelValue",o,t),Number(r.modelValue)!==Number(o)&&l("change",o,t)},b=(e=Number(r.modelValue))=>e<Number(r.max)&&!n.value,f=(e=Number(r.modelValue))=>e>Number(r.min)&&!n.value,V=e=>{if(n.value)return;l("reduce",e);let t=Number(r.modelValue)-Number(r.step);f()&&t>=Number(r.min)?s(t,e):(s(Number(r.min),e),l("overlimit",e,"reduce"))},O=e=>{if(n.value)return;l("add",e);let t=Number(r.modelValue)+Number(r.step);b()&&t<=Number(r.max)?s(t,e):(s(Number(r.max),e),l("overlimit",e,"add"))},x=e=>{n.value||r.readonly||l("focus",e)},S=e=>{if(n.value||r.readonly)return;const t=e.target;let o=Number(t.value);o<Number(r.min)?o=Number(r.min):o>Number(r.max)&&(o=Number(r.max)),s(o,e),l("blur",e)},z=e=>{let t=Number(e);return t<Number(r.min)?t=Number(r.min):t>Number(r.max)&&(t=Number(r.max)),t};return A(()=>[r.max,r.min],()=>{Number(r.min)>Number(r.max)&&console.warn("[NutUI] <InputNumber>","props.max < props.min");const e=z(r.modelValue);e!==Number(r.modelValue)&&s(e,{})}),(e,t)=>(w(),g("view",{class:d(c.value)},[p("view",{class:d(["nut-input-number__icon nut-input-number__left",{"nut-input-number__icon--disabled":!f()}]),onClick:V},[h(e.$slots,"left-icon",{},()=>[N(i(q),{width:i(m)(e.buttonSize),height:i(m)(e.buttonSize)},null,8,["width","height"])])],2),p("input",E({type:"number"},e.$attrs,{min:e.min,max:e.max,style:{width:i(m)(e.inputWidth),height:i(m)(e.buttonSize)},disabled:i(n),readonly:e.readonly,value:e.modelValue,onInput:P,onBlur:S,onFocus:x}),null,16,Y),p("view",{class:d(["nut-input-number__icon nut-input-number__right",{"nut-input-number__icon--disabled":!b()}]),onClick:O},[h(e.$slots,"right-icon",{},()=>[N(i(F),{width:i(m)(e.buttonSize),height:i(m)(e.buttonSize)},null,8,["width","height"])])],2)],2))}}));j(Z);export{Z as _};