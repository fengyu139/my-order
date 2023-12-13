import{_ as V,b as B,o as g,d as b,f as $,H as O,k as P,e as C,c as E,a as U,a6 as z,w as J,h as G,s as K,t as L,G as Q,am as R,an as X,ao as Y,ap as Z,i as x,j as ee,l as N,n as A,A as te}from"./index-6ced0f24.js";import{p as re}from"./pxCheck-c6b9f6b7-e26267bf.js";import{C as T}from"./Cell-23ea0724.js";const{create:se}=B("cell-group"),le=se({props:{title:{type:String,default:""},desc:{type:String,default:""}}}),oe={class:"nut-cell-group"},ae={key:1,class:"nut-cell-group__title"},ne={key:3,class:"nut-cell-group__desc"},ie={class:"nut-cell-group__wrap"};function ue(e,l,s,r,o,p){return g(),b("view",oe,[e.$slots.title?$(e.$slots,"title",{key:0}):e.title?(g(),b("view",ae,O(e.title),1)):P("",!0),e.$slots.desc?$(e.$slots,"desc",{key:2}):e.desc?(g(),b("view",ne,O(e.desc),1)):P("",!0),C("view",ie,[$(e.$slots,"default")])])}const q=V(le,[["render",ue]]);var W=Object.getOwnPropertySymbols,ce=Object.prototype.hasOwnProperty,pe=Object.prototype.propertyIsEnumerable,de=(e,l)=>{var s={};for(var r in e)ce.call(e,r)&&l.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&W)for(var r of W(e))l.indexOf(r)<0&&pe.call(e,r)&&(s[r]=e[r]);return s},fe=(e,l,s)=>new Promise((r,o)=>{var p=u=>{try{h(s.next(u))}catch(w){o(w)}},m=u=>{try{h(s.throw(u))}catch(w){o(w)}},h=u=>u.done?r(u.value):Promise.resolve(u.value).then(p,m);h((s=s.apply(e,l)).next())});const me=e=>({props:{modelValue:{type:Object,default:()=>({})},rules:{type:Object,default:()=>({})}},components:e,emits:["validate"],setup(l,{emit:s,slots:r}){const o=E(()=>U({}));z("formErrorTip",o);const p=()=>{Object.keys(o.value).forEach(a=>{o.value[a]=""})},m=()=>{p()};J(()=>l.modelValue,()=>{p()},{immediate:!0});const h=a=>{const v=[],n=t=>{var d,i,f,y,_;if(R(t)){const c=((d=t==null?void 0:t.type)==null?void 0:d.name)||(t==null?void 0:t.type);c=="nut-form-item"||c!=null&&c.toString().endsWith("form-item")?v.push({prop:(i=t.props)==null?void 0:i.prop,rules:((f=t.props)==null?void 0:f.rules)||[]}):Array.isArray(t.children)&&((y=t.children)!=null&&y.length)?n(t.children):X(t.children)&&Object.keys(t.children)&&(_=t.children)!=null&&_.default&&n(t.children.default())}else Array.isArray(t)&&t.forEach(c=>{n(c)})};return n(a),v},u=a=>{a.message&&s("validate",a),o.value[a.prop]=a.message},w=a=>fe(this,null,function*(){const{rules:v,prop:n}=a,t=y=>new Promise((_,c)=>{try{u(y),_(y)}catch(S){c(S)}});n||console.warn("[NutUI] <FormItem> 使用 rules 校验规则时 , 必须设置 prop 参数");const d=Y(l.modelValue,n||"");u({prop:n,message:""});const i=l.rules||{},f=[...(i==null?void 0:i[n])||[],...v];for(;f.length;){const _=f.shift(),{validator:c}=_,S=de(_,["validator"]),{required:D,regex:I,message:H}=S,k={prop:n,message:H};if(D&&!d&&d!==0||I&&!I.test(String(d)))return t(k);if(c){const j=c(d,S);if(Z(j))try{if((yield j)===!1)return t(k)}catch(M){return t({prop:n,message:M})}else if(!j)return t(k)}}return Promise.resolve(!0)}),F=(a="")=>new Promise((v,n)=>{try{const d=h(r.default()).map(i=>a&&a!==i.prop?Promise.resolve(!0):w(i));Promise.all(d).then(i=>{i=i.filter(y=>y!==!0);const f={valid:!0,errors:[]};i.length&&(f.valid=!1,f.errors=i),v(f)})}catch(t){n(t)}});return{validate:F,reset:m,submit:()=>(F(),!1),formErrorTip:o}}}),{create:ye}=B("form"),he=ye(me({[q.name]:q})),_e=["onSubmit"];function ge(e,l,s,r,o,p){const m=G("nut-cell-group");return g(),b("form",{class:"nut-form",action:"#",onSubmit:Q(()=>!1,["prevent"])},[K(m,null,{default:L(()=>[$(e.$slots,"default")]),_:3})],40,_e)}const ve=V(he,[["render",ge]]),be=e=>e,Be=be(ve),{create:$e}=B("form-item"),we=$e({inheritAttrs:!1,props:{prop:{type:String,default:""},label:{type:String,default:""},rules:{type:Array,default:()=>[]},required:{type:Boolean,default:!1},showErrorMessage:{type:Boolean,default:!0},showErrorLine:{type:Boolean,default:!0},labelWidth:{type:[String,Number],default:""},labelAlign:{type:String,default:""},errorMessageAlign:{type:String,default:""},bodyAlign:{type:String,default:""}},components:{[T.name]:T},setup(e,{slots:l}){const s=x("formErrorTip");z("form",{props:e});const r=E(()=>({width:re(e.labelWidth),textAlign:e.labelAlign})),o=E(()=>({textAlign:e.bodyAlign})),p=E(()=>({textAlign:e.errorMessageAlign}));return{parent:s,labelStyle:r,bodyStyle:o,errorMessageStyle:p,getSlots:h=>l[h]}}}),Se={class:"nut-cell__value nut-form-item__body"};function ke(e,l,s,r,o,p){const m=G("nut-cell");return g(),ee(m,{class:N(["nut-form-item",[{error:e.parent[e.prop],line:e.showErrorLine},e.$attrs.class]]),style:A(e.$attrs.style)},{default:L(()=>[e.label||e.getSlots("label")?(g(),b("view",{key:0,class:N(["nut-cell__title nut-form-item__label",{required:e.required}]),style:A(e.labelStyle)},[$(e.$slots,"label",{},()=>[te(O(e.label),1)])],6)):P("",!0),C("view",Se,[C("view",{class:"nut-form-item__body__slots",style:A(e.bodyStyle)},[$(e.$slots,"default")],4),e.parent[e.prop]&&e.showErrorMessage?(g(),b("view",{key:0,class:"nut-form-item__body__tips",style:A(e.errorMessageStyle)},O(e.parent[e.prop]),5)):P("",!0)])]),_:3},8,["class","style"])}const Ae=V(we,[["render",ke]]),Ee=e=>e,Fe=Ee(Ae);export{Fe as F,Be as a};
