import{d as w,w as m,c as u,o as i,e as n,m as o,l,f as d,G as y}from"./index-3f55ee30.js";var P=Object.defineProperty,O=Object.defineProperties,S=Object.getOwnPropertyDescriptors,b=Object.getOwnPropertySymbols,D=Object.prototype.hasOwnProperty,$=Object.prototype.propertyIsEnumerable,g=(s,r,t)=>r in s?P(s,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[r]=t,k=(s,r)=>{for(var t in r||(r={}))D.call(r,t)&&g(s,t,r[t]);if(b)for(var t of b(r))$.call(r,t)&&g(s,t,r[t]);return s},z=(s,r)=>O(s,S(r));const T=["innerHTML"],B=["innerHTML"],v="nut-price",j=w(z(k({},{name:"NutPrice"}),{__name:"price",props:{price:{default:0},needSymbol:{type:Boolean,default:!0},symbol:{default:"&yen;"},decimalDigits:{default:2},thousands:{type:Boolean,default:!1},position:{default:"before"},size:{default:"normal"},strikeThrough:{type:Boolean,default:!1}},setup(s){const r=s,t=u(()=>({[v]:!0,[`${v}--strike`]:r.strikeThrough})),a=u(()=>r.needSymbol?r.symbol:""),p=e=>String(e).indexOf(".")>0,_=e=>(Number(e)==0&&(e=0),p(e)?(e=Number(e).toFixed(r.decimalDigits),e=typeof e.split(".")=="string"?e.split("."):e.split(".")[0]):e=e.toString(),r.thousands?(e||0).toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,"):e),h=e=>{Number(e)==0&&(e=0),p(e)?(e=Number(e).toFixed(r.decimalDigits),e=typeof e.split(".")=="string"?0:e.split(".")[1]?e.split(".")[1]:0):e=0;const c="0."+e,f=Number(c).toFixed(r.decimalDigits);return String(f).substring(2,f.length)};return(e,c)=>(i(),n("view",{class:o(t.value)},[e.needSymbol&&e.position==="before"?(i(),n("view",{key:0,class:o(["nut-price--symbol",`nut-price--symbol-${e.size}`]),innerHTML:a.value},null,10,T)):l("",!0),d("view",{class:o(`nut-price--${e.size}`)},y(_(e.price)),3),e.decimalDigits!=0?(i(),n("view",{key:1,class:o(`nut-price--decimal-${e.size}`)},".",2)):l("",!0),d("view",{class:o(`nut-price--decimal-${e.size}`)},y(h(e.price)),3),e.needSymbol&&e.position==="after"?(i(),n("view",{key:2,class:o(["nut-price--symbol",`nut-price--symbol-${e.size}`]),innerHTML:a.value},null,10,B)):l("",!0)],2))}}));m(j);export{j as _};