import{r as p,b as $,c as f,a as N,K as R,S as _,M as w,O as E,o as z,e as H,f as B,g as I,n as g}from"./index-3f55ee30.js";import{g as y}from"./index-BvmDLUYP-2e4d003f.js";import{u as d}from"./index-B1qsj2XR-140f9323.js";const{create:C}=E("sticky"),L=C({props:{position:{type:String,default:"top"},top:{type:[Number,String],default:0},bottom:{type:[Number,String],default:0},container:{type:Object,default:null},zIndex:{type:[Number,String],default:99}},emits:["change"],setup(e,{emit:m}){const i=p(),l=p(),t=$({fixed:!1,height:0,width:0,transform:0}),n=f(()=>e.position==="top"?Number(e.top):Number(e.bottom)),v=f(()=>t.fixed?{height:`${t.height}px`}:{}),x=f(()=>t.fixed?{[e.position]:`${n.value}px`,height:`${t.height}px`,width:`${t.width}px`,transform:t.transform?`translate3d(0, ${t.transform}px, 0)`:void 0,position:t.fixed?"fixed":void 0,zIndex:Number(e.zIndex)}:{}),u=()=>{const o=e.container;if(!i.value&&!o)return;const s=d(i),b=l.value,h=d(b),c=d(o);t.height=s.height,t.width=s.width;const S=()=>{let r=!1;if(e.position==="top")r=o?n.value>s.top&&c.bottom>0:n.value>s.top;else{const a=document.documentElement.clientHeight;r=o?c.bottom>0&&a-n.value-h.height>c.top:a-n.value<s.bottom}return r},k=()=>{if(o)if(e.position==="top"){const r=c.bottom-n.value-h.height;return r<0?r:0}else{const r=document.documentElement.clientHeight,a=c.bottom-(r-n.value);return a<0?a:0}return 0};t.transform=k(),t.fixed=S()};return N(()=>t.fixed,o=>{m("change",o)}),R(()=>{u(),y(i.value).addEventListener("scroll",u,!0)}),_(()=>{y(i.value).removeEventListener("scroll",u)}),{rootRef:i,rootStyle:v,stickyRef:l,stickyStyle:x}}});function M(e,m,i,l,t,n){return z(),H("div",{ref:"rootRef",class:"nut-sticky",style:g(e.rootStyle)},[B("div",{ref:"stickyRef",class:"nut-sticky__box",style:g(e.stickyStyle)},[I(e.$slots,"default")],4)],4)}const K=w(L,[["render",M]]);export{K as N};