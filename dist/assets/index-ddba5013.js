import{$ as R,r as V,a as E,c as h,w as j,L as B,_ as C,b as L,M,I as _,h as I,o as y,d as Y,e as m,n as v,j as z,k as d,H as q,f,a0 as x}from"./index-cceea35e.js";import{u as A}from"./index-084nl_oE-4d3a8cae.js";import{p as F}from"./Cell-c1c99215.js";import{u as G}from"./index-xDfQLRen-67bdb8c7.js";var J=Object.defineProperty,K=Object.defineProperties,Q=Object.getOwnPropertyDescriptors,S=Object.getOwnPropertySymbols,U=Object.prototype.hasOwnProperty,W=Object.prototype.propertyIsEnumerable,P=(e,s,l)=>s in e?J(e,s,{enumerable:!0,configurable:!0,writable:!0,value:l}):e[s]=l,X=(e,s)=>{for(var l in s||(s={}))U.call(s,l)&&P(e,l,s[l]);if(S)for(var l of S(s))W.call(s,l)&&P(e,l,s[l]);return e},Z=(e,s)=>K(e,Q(s));const{create:ee}=L("pull-refresh"),te="NutPullRefresh",se=ee({props:{modelValue:{type:Boolean,default:!1},pullingTxt:{type:String,default:""},loosingTxt:{type:String,default:""},loadingTxt:{type:String,default:""},completeTxt:{type:String,default:""},headHeight:{type:[String,Number],default:50},pullDistance:{type:[String,Number],default:50},duration:{type:[String,Number],default:.3},completeDuration:{type:Number,default:0}},emits:["change","refresh","update:modelValue"],components:{Loading:R},setup(e,{emit:s,slots:l}){const u=M(te),r=A(),g=V(),i=G(g),t=E({isPullRefresh:!1,distance:0,status:"normal"}),T=h(()=>{switch(t.status){case"pulling":return l.pulling?"":e.pullingTxt||u("pulling");case"loosing":return l.loosing?"":e.loosingTxt||u("loosing");case"loading":return l.loading?"":e.loadingTxt||u("loading");case"complete":return l.complete?"":e.completeTxt||u("complete")}return""}),D=h(()=>({transitionDuration:`${e.duration}s`,transform:t.distance?`translate3d(0,${t.distance}px, 0)`:""})),$=h(()=>{const o={};return e.headHeight!=50&&(o.height=F(e.headHeight)),o}),b=o=>{const a=+(e.pullDistance||e.headHeight);let c=o;return o>a&&(o<a*2?c=(o+a)/2:c=a+o/4),Math.round(c)},n=(o,a,c)=>{const N=+(e.pullDistance||e.headHeight);t.distance=o,a?t.status="loading":c?t.status="complete":o===0?t.status="normal":o<N?t.status="pulling":t.status="loosing",s("change",{status:t.status,distance:o})},p=()=>t.status!=="loading"&&t.status!=="complete",w=()=>i.value==window?x()==0:i.value&&i.value.scrollTop==0,O=o=>{p()&&(w()?(r.start(o),t.isPullRefresh=!0):(t.distance=0,t.isPullRefresh=!1))},H=o=>{if(p()){r.move(o);const{deltaY:a}=r;r.isVertical()&&a.value>0&&t.isPullRefresh&&(o.preventDefault(),n(b(a.value)))}},k=()=>{t.isPullRefresh&&p()&&r.deltaY.value&&(t.status==="loosing"?(n(+e.headHeight,!0),s("update:modelValue",!0),_(()=>s("refresh"))):n(0)),setTimeout(()=>{r.reset()},0)};return j(()=>e.modelValue,o=>{o?n(+e.headHeight,!0):(e.completeDuration===0&&n(0),n(+e.headHeight,!1,!0),setTimeout(()=>{n(0)},e.completeDuration))}),Z(X({scroller:g},B(t)),{touchStart:O,touchMove:H,touchEnd:k,getStyle:D,translate:u,slots:l,getHeightStyle:$,getPullStatus:T})}}),oe={class:"nut-pull-refresh-container-topbox-text"};function le(e,s,l,u,r,g){const i=I("Loading");return y(),Y("div",{ref:"scroller",class:"nut-pull-refresh",onTouchstart:s[0]||(s[0]=(...t)=>e.touchStart&&e.touchStart(...t)),onTouchmove:s[1]||(s[1]=(...t)=>e.touchMove&&e.touchMove(...t)),onTouchend:s[2]||(s[2]=(...t)=>e.touchEnd&&e.touchEnd(...t))},[m("div",{class:"nut-pull-refresh-container",style:v(e.getStyle)},[m("div",{class:"nut-pull-refresh-container-topbox",style:v(e.getHeightStyle)},[e.status=="loading"&&!e.slots.loading?(y(),z(i,{key:0,class:"nut-icon-loading nut-pull-refresh-container-topbox-icon"})):d("",!0),m("div",oe,q(e.getPullStatus),1),e.status=="pulling"?f(e.$slots,"pulling",{key:1}):d("",!0),e.status=="loosing"?f(e.$slots,"loosing",{key:2}):d("",!0),e.status=="loading"?f(e.$slots,"loading",{key:3}):d("",!0),e.status=="complete"?f(e.$slots,"complete",{key:4}):d("",!0)],4),f(e.$slots,"default")],4)],544)}const ie=C(se,[["render",le]]);export{ie as i};
