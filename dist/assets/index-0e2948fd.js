import{d as F,w as R,o as y,e as g,g as O,G as V,l as B,f as M,an as L,c as v,b as se,a6 as oe,a as ae,t as le,v as J,u as j,j as ne,ao as ie,ap as ue,aq as pe,i as ce,h as fe,m as W,n as N,A as de}from"./index-3f55ee30.js";import{F as Q,a as X,b as _e}from"./common-BH7uB7Cn-ad9c9445.js";import{p as me}from"./pxCheck-DN6FYV6q-3938f682.js";import{_ as ve}from"./Cell-66225f71.js";var ye=Object.defineProperty,Pe=Object.defineProperties,he=Object.getOwnPropertyDescriptors,Y=Object.getOwnPropertySymbols,we=Object.prototype.hasOwnProperty,be=Object.prototype.propertyIsEnumerable,z=(t,e,r)=>e in t?ye(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,ge=(t,e)=>{for(var r in e||(e={}))we.call(e,r)&&z(t,r,e[r]);if(Y)for(var r of Y(e))be.call(e,r)&&z(t,r,e[r]);return t},Oe=(t,e)=>Pe(t,he(e));const $e={class:"nut-cell-group"},Ee={key:1,class:"nut-cell-group__title"},je={key:3,class:"nut-cell-group__desc"},Se={class:"nut-cell-group__wrap"},Z=F(Oe(ge({},{name:"NutCellGroup"}),{__name:"cell-group",props:{title:{default:""},desc:{default:""}},setup(t){return(e,r)=>(y(),g("view",$e,[e.$slots.title?O(e.$slots,"title",{key:0}):e.title?(y(),g("view",Ee,V(e.title),1)):B("",!0),e.$slots.desc?O(e.$slots,"desc",{key:2}):e.desc?(y(),g("view",je,V(e.desc),1)):B("",!0),M("view",Se,[O(e.$slots,"default")])]))}}));R(Z);var ke=Object.defineProperty,Ae=Object.defineProperties,Ce=Object.getOwnPropertyDescriptors,q=Object.getOwnPropertySymbols,x=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable,G=(t,e,r)=>e in t?ke(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Ie=(t,e)=>{for(var r in e||(e={}))x.call(e,r)&&G(t,r,e[r]);if(q)for(var r of q(e))ee.call(e,r)&&G(t,r,e[r]);return t},Ne=(t,e)=>Ae(t,Ce(e)),Ve=(t,e)=>{var r={};for(var o in t)x.call(t,o)&&e.indexOf(o)<0&&(r[o]=t[o]);if(t!=null&&q)for(var o of q(t))e.indexOf(o)<0&&ee.call(t,o)&&(r[o]=t[o]);return r},Be=(t,e,r)=>new Promise((o,P)=>{var h=l=>{try{m(r.next(l))}catch(p){P(p)}},_=l=>{try{m(r.throw(l))}catch(p){P(p)}},m=l=>l.done?o(l.value):Promise.resolve(l.value).then(h,_);m((r=r.apply(t,e)).next())});const qe=F(Ne(Ie({},{name:"NutForm"}),{__name:"form",props:{modelValue:{default:()=>({})},rules:{default:()=>({})},disabled:{type:Boolean,default:!1},labelPosition:{default:"left"},starPosition:{default:"left"}},emits:["validate"],setup(t,{expose:e,emit:r}){const o=t,P=r,{children:h,linkChildren:_}=L(X);_({props:o});const{linkChildren:m}=L(_e);m({props:o});const l=v(()=>se({}));oe(Q,l);const p=()=>{Object.keys(l.value).forEach(a=>{l.value[a]=""})},s=()=>{p()};ae(()=>o.modelValue,()=>{p()},{immediate:!0});const n=()=>{const a=[];return h.forEach(u=>{a.push({prop:u==null?void 0:u.prop,rules:(u==null?void 0:u.rules)||[]})}),a},$=a=>{a.message&&P("validate",a),l.value[a.prop]=a.message},c=a=>Be(this,null,function*(){const{rules:u=[],prop:f}=a,d=E=>new Promise((k,A)=>{try{$(E),k(E)}catch(C){A(C)}});f||console.warn("[NutUI] <FormItem> 使用 rules 校验规则时 , 必须设置 prop 参数");const w=ie(o.modelValue,f||"");$({prop:f,message:""});const i=o.rules||{},b=[...(i==null?void 0:i[f])||[],...u];for(;b.length;){const k=b.shift(),{validator:A}=k,C=Ve(k,["validator"]),{required:re,regex:T,message:te}=C,I={prop:f,message:te||""};if(re&&!w&&w!==0||T&&!T.test(String(w)))return d(I);if(A){const D=A(w,C);if(ue(D))try{if((yield D)===!1)return d(I)}catch(K){return d({prop:f,message:K})}else if(!D)return d(I)}}return Promise.resolve(!0)}),S=(a="")=>new Promise((u,f)=>{try{const w=n().map(i=>a&&a!==i.prop?Promise.resolve(!0):c(i));Promise.all(w).then(i=>{i=i.filter(E=>E!==!0);const b={valid:!0,errors:[]};i.length&&(b.valid=!1,b.errors=i),u(b)})}catch(d){f(d)}});return e({submit:()=>(S(),!1),reset:s,validate:S}),(a,u)=>(y(),g("form",{class:"nut-form",action:"#",onSubmit:ne(()=>!1,["prevent"])},[le(j(Z),null,{default:J(()=>[O(a.$slots,"default")]),_:3})],32))}}));R(qe);var De=Object.defineProperty,Me=Object.defineProperties,Fe=Object.getOwnPropertyDescriptors,U=Object.getOwnPropertySymbols,Re=Object.prototype.hasOwnProperty,Te=Object.prototype.propertyIsEnumerable,H=(t,e,r)=>e in t?De(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Ke=(t,e)=>{for(var r in e||(e={}))Re.call(e,r)&&H(t,r,e[r]);if(U)for(var r of U(e))Te.call(e,r)&&H(t,r,e[r]);return t},Le=(t,e)=>Me(t,Fe(e));const We={class:"nut-cell__value nut-form-item__body"},Ye=F(Le(Ke({},{name:"NutFormItem",inheritAttrs:!1}),{__name:"form-item",props:{prop:{default:""},label:{default:""},rules:{default:()=>[]},required:{type:Boolean,default:!1},showErrorMessage:{type:Boolean,default:!0},showErrorLine:{type:Boolean,default:!0},labelWidth:{},labelAlign:{},errorMessageAlign:{},bodyAlign:{},labelPosition:{},starPosition:{}},setup(t){const e=t,{parent:r}=pe(X),o=v(()=>{var s;const n=(s=r.props)==null?void 0:s.rules;let $=!1;for(const c in n)Object.prototype.hasOwnProperty.call(n,c)&&c===e.prop&&Array.isArray(n[c])&&($=n[c].some(S=>S.required));return e.required||e.rules.some(c=>c.required)||$}),P=v(()=>{const s=r.props.labelPosition,n=e.labelPosition?e.labelPosition:s;return n!=="left"?`nut-form-item__${n}`:""}),h=v(()=>{const s=r.props.starPosition,n=e.starPosition?e.starPosition:s;return n!=="left"?`nut-form-item__star-${n}`:""}),_=ce(Q),m=v(()=>({width:me(e.labelWidth),textAlign:e.labelAlign})),l=v(()=>({textAlign:e.bodyAlign})),p=v(()=>({textAlign:e.errorMessageAlign}));return(s,n)=>(y(),fe(j(ve),{class:W(["nut-form-item",[{error:j(_)[s.prop],line:s.showErrorLine},s.$attrs.class,P.value]]),style:N(s.$attrs.style)},{default:J(()=>[s.label||s.$slots.label?(y(),g("view",{key:0,class:W(["nut-cell__title nut-form-item__label",{required:o.value,[h.value]:h.value}]),style:N(m.value)},[O(s.$slots,"label",{},()=>[de(V(s.label),1)])],6)):B("",!0),M("view",We,[M("view",{class:"nut-form-item__body__slots",style:N(l.value)},[O(s.$slots,"default")],4),j(_)[s.prop]&&s.showErrorMessage?(y(),g("view",{key:0,class:"nut-form-item__body__tips",style:N(p.value)},V(j(_)[s.prop]),5)):B("",!0)])]),_:3},8,["class","style"]))}}));R(Ye);export{Ye as _,qe as a};