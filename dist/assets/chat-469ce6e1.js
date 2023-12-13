import{J as Pe,K as Be,o as p,d as g,l as N,n as te,e as f,as as Ae,P as re,Y as Me,a4 as Re,c as Z,_ as be,b as we,at as je,h as le,j as ce,t as C,H as O,k as D,f as xe,F as ee,C as Ie,L as Fe,i as ke,r as x,au as He,av as Ve,aw as Ue,ax as Ce,ab as We,m as Ye,ac as Ge,ad as Je,ay as Ke,a as ue,az as Xe,N as qe,aA as Qe,w as Ze,p as de,s as w,v as m,a9 as et,ai as tt,A as H,aB as at,x as pe,I as st,z as nt,y as B,V as ot,W as it,a2 as me,aC as rt,X as lt}from"./index-6ced0f24.js";import{I as ct}from"./index-42d7c71b.js";import{B as fe}from"./index-ba695628.js";import{U as ut}from"./index-b0a43757.js";import{N as dt,w as pt,s as mt}from"./index-380c11ea.js";import{g as q}from"./index-b5ece0f3.js";import"./Checked-72beb956.js";import"./index-29892cda-6b6e0bac.js";import"./index-7a7385e4-9157872d.js";import"./raf-729dad54-b3324e41.js";import"./CSSPlugin-83f15978.js";const ft=Be("horizontal-n"),gt=f("path",{d:"M977.455 124.121H46.545C21.721 124.121 0 102.4 0 77.576S21.721 31.03 46.545 31.03h930.91c24.824 0 46.545 21.722 46.545 46.546s-21.721 46.545-46.545 46.545zm0 868.849H46.545C21.721 992.97 0 971.248 0 946.424s21.721-46.545 46.545-46.545h930.91c24.824 0 46.545 21.721 46.545 46.545s-21.721 46.546-46.545 46.546zm0-434.425H356.848c-24.824 0-46.545-21.72-46.545-46.545s21.721-46.545 46.545-46.545h620.607c24.824 0 46.545 21.72 46.545 46.545s-21.721 46.545-46.545 46.545z",fill:"currentColor","fill-opacity":"0.9"},null,-1),vt=[gt];function ht(e,t,n,h,r,_){return p(),g("svg",{class:N(e.classes),style:te(e.style),xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1024 1024",role:"presentation"},vt,6)}const _t=Pe(ft,[["render",ht]]),yt=e=>e,bt=yt(Ae);var wt=Object.defineProperty,xt=Object.defineProperties,It=Object.getOwnPropertyDescriptors,ge=Object.getOwnPropertySymbols,kt=Object.prototype.hasOwnProperty,Ct=Object.prototype.propertyIsEnumerable,ve=(e,t,n)=>t in e?wt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,St=(e,t)=>{for(var n in t||(t={}))kt.call(t,n)&&ve(e,n,t[n]);if(ge)for(var n of ge(t))Ct.call(t,n)&&ve(e,n,t[n]);return e},$t=(e,t)=>xt(e,It(t));const{componentName:Tt,create:Et}=we("action-sheet"),Ot=Et({components:{[re.name]:re,Loading:Me},props:$t(St({},je),{cancelTxt:{type:String,default:""},optionTag:{type:String,default:"name"},optionSubTag:{type:String,default:"subname"},chooseTagValue:{type:String,default:""},title:{type:String,default:""},color:{type:String,default:"#ee0a24"},description:{type:String,default:""},menuItems:{type:Array,default:()=>[]},closeAbled:{type:Boolean,default:!0}}),emits:["cancel","close","choose","update:visible"],setup(e,{emit:t}){const n=!!Re().default,h=Z(()=>({[Tt]:!0}));return{slotDefault:n,isHighlight:a=>e.chooseTagValue&&e.chooseTagValue===a[e.optionTag]?e.color:"",cancelActionSheet:()=>{t("cancel"),t("update:visible",!1)},chooseItem:(a,v)=>{!a.disable&&!a.loading&&(t("choose",a,v),t("update:visible",!1))},close:a=>{e.closeAbled&&(t("close",a),t("update:visible",!1))},classes:h}}}),Nt={key:0,class:"nut-action-sheet__title"},Lt={key:1},zt={key:0,class:"nut-action-sheet__item nut-action-sheet__desc"},Dt={key:1,class:"nut-action-sheet__menu"},Pt=["onClick"],Bt={key:1},At={class:"nut-action-sheet__subdesc"};function Mt(e,t,n,h,r,_){const l=le("Loading"),d=le("nut-popup");return p(),ce(d,{visible:e.visible,position:"bottom",round:"","close-on-click-overlay":e.closeAbled,"lock-scroll":e.lockScroll,onClickOverlay:e.close},{default:C(()=>[f("view",{class:N(e.classes)},[e.title?(p(),g("view",Nt,O(e.title),1)):D("",!0),xe(e.$slots,"default"),e.slotDefault?D("",!0):(p(),g("view",Lt,[e.description?(p(),g("view",zt,O(e.description),1)):D("",!0),e.menuItems.length?(p(),g("view",Dt,[(p(!0),g(ee,null,Ie(e.menuItems,(a,v)=>(p(),g("view",{key:v,class:N(["nut-action-sheet__item",{"nut-action-sheet__item--disabled":a.disable,"nut-action-sheet__item--loading":a.loading}]),style:te({color:e.isHighlight(a)||a.color}),onClick:I=>e.chooseItem(a,v)},[a.loading?(p(),ce(l,{key:0,name:"loading"})):(p(),g("view",Bt,O(a[e.optionTag]),1)),f("view",At,O(a[e.optionSubTag]),1)],14,Pt))),128))])):D("",!0),e.cancelTxt?(p(),g("view",{key:2,class:"nut-action-sheet__cancel",onClick:t[0]||(t[0]=(...a)=>e.cancelActionSheet&&e.cancelActionSheet(...a))},O(e.cancelTxt),1)):D("",!0)]))],2)]),_:3},8,["visible","close-on-click-overlay","lock-scroll","onClickOverlay"])}const Rt=be(Ot,[["render",Mt]]),jt=e=>e,Ft=jt(Rt),{create:Ht}=we("avatar"),Vt=Ht({props:{size:{type:[String,Number],default:"normal"},shape:{type:String,default:"round"},bgColor:{type:String,default:"#eee"},color:{type:String,default:"#666"}},setup(e){const{size:t,shape:n,bgColor:h,color:r}=Fe(e),_=["large","normal","small"],l=ke("avatarGroup",null),d=x(null),a=Z(()=>{var I,b;return{["nut-avatar"]:!0,[`nut-avatar-${t.value||((I=l==null?void 0:l.props)==null?void 0:I.size)||"normal"}`]:!0,[`nut-avatar-${n.value||((b=l==null?void 0:l.props)==null?void 0:b.shape)||"round"}`]:!0}}),v=Z(()=>{var I,b;return{width:t.value in _?"":`${t.value}px`,height:t.value in _?"":`${t.value}px`,backgroundColor:`${h.value}`,color:`${r.value}`,marginLeft:(I=l==null?void 0:l.props)!=null&&I.span?`${(b=l==null?void 0:l.props)==null?void 0:b.span}px`:""}});return{classes:a,styles:v,avatarRef:d}}});function Ut(e,t,n,h,r,_){return p(),g("view",{ref:"avatarRef",style:te(e.styles),class:N(e.classes)},[xe(e.$slots,"default")],6)}const Wt=be(Vt,[["render",Ut]]),Yt=e=>e,Gt=Yt(Wt);const Jt="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='18' cy='12' r='0' fill='red'%3E%3Canimate attributeName='r' begin='.67' calcMode='spline' dur='1.5s' keySplines='0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8' repeatCount='indefinite' values='0;2;0;0'/%3E%3C/circle%3E%3Ccircle cx='12' cy='12' r='0' fill='red'%3E%3Canimate attributeName='r' begin='.33' calcMode='spline' dur='1.5s' keySplines='0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8' repeatCount='indefinite' values='0;2;0;0'/%3E%3C/circle%3E%3Ccircle cx='6' cy='12' r='0' fill='red'%3E%3Canimate attributeName='r' begin='0' calcMode='spline' dur='1.5s' keySplines='0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8' repeatCount='indefinite' values='0;2;0;0'/%3E%3C/circle%3E%3C!-- 1701252868811 --%3E%3C/svg%3E",Se=Jt,Kt=""+new URL("chatBg-91517f37.jpg",import.meta.url).href;var Xt=He,qt=function(){return Xt.Date.now()},Qt=qt,Zt=/\s/;function ea(e){for(var t=e.length;t--&&Zt.test(e.charAt(t)););return t}var ta=ea,aa=ta,sa=/^\s+/;function na(e){return e&&e.slice(0,aa(e)+1).replace(sa,"")}var oa=na,ia=Ve,ra=Ue,la="[object Symbol]";function ca(e){return typeof e=="symbol"||ra(e)&&ia(e)==la}var ua=ca,da=oa,he=Ce,pa=ua,_e=0/0,ma=/^[-+]0x[0-9a-f]+$/i,fa=/^0b[01]+$/i,ga=/^0o[0-7]+$/i,va=parseInt;function ha(e){if(typeof e=="number")return e;if(pa(e))return _e;if(he(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=he(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=da(e);var n=fa.test(e);return n||ga.test(e)?va(e.slice(2),n?2:8):ma.test(e)?_e:+e}var _a=ha,ya=Ce,Q=Qt,ye=_a,ba="Expected a function",wa=Math.max,xa=Math.min;function Ia(e,t,n){var h,r,_,l,d,a,v=0,I=!1,b=!1,L=!0;if(typeof e!="function")throw new TypeError(ba);t=ye(t)||0,ya(n)&&(I=!!n.leading,b="maxWait"in n,_=b?wa(ye(n.maxWait)||0,t):_,L="trailing"in n?!!n.trailing:L);function P(c){var k=h,S=r;return h=r=void 0,v=c,l=e.apply(S,k),l}function V(c){return v=c,d=setTimeout(z,t),I?P(c):l}function U(c){var k=c-a,S=c-v,R=t-k;return b?xa(R,_-S):R}function A(c){var k=c-a,S=c-v;return a===void 0||k>=t||k<0||b&&S>=_}function z(){var c=Q();if(A(c))return M(c);d=setTimeout(z,U(c))}function M(c){return d=void 0,L&&h?P(c):(h=r=void 0,l)}function W(){d!==void 0&&clearTimeout(d),v=0,h=a=r=d=void 0}function Y(){return d===void 0?l:M(Q())}function E(){var c=Q(),k=A(c);if(h=arguments,r=this,a=c,k){if(d===void 0)return V(a);if(b)return clearTimeout(d),d=setTimeout(z,t),P(a)}return d===void 0&&(d=setTimeout(z,t)),l}return E.cancel=W,E.flush=Y,E}var ka=Ia;const Ca=We(ka);const ae=e=>(ot("data-v-778dfe50"),e=e(),it(),e),Sa={class:"flex items-center"},$a=ae(()=>f("span",null," 刷新",-1)),Ta=["onClick"],Ea=["src"],Oa={class:"text-[12px]"},Na=["data-id"],La=["innerHTML"],za={key:0,class:"absolute left-[-20px] top-[10px] text-[#858585]"},Da={class:"relative"},Pa={class:"text-red-500 absolute top-[-10px] text-[12px] left-[4px] z-10 bg-white flex"},Ba=ae(()=>f("img",{src:Se,alt:"",srcset:""},null,-1)),Aa={class:"flex items-center"},Ma=ae(()=>f("div",{class:"wrapper"},[f("img",{src:Kt,class:"w-full",alt:"",srcset:""})],-1)),Ra=Ye({__name:"chat",setup(e){const t=Ge("chatId","");t.value=Je().query.id;const n=ke("socket");console.log(Se);const{copy:h}=Ke({legacy:!0}),r=ue({msg:"",name:t.value=="1"?"小扈":"老胡",chatId:t.value,picImg:"",type:"text",msgId:""}),_=Xe(),l=x(null),d=x(null),a=x([]),v=x(null),I=()=>{if(r.msg=="")return B.fail("请输入内容");r.type="text",r.msgId=new Date().getTime().toString(),n.emit("chat",r),a.value.push(JSON.parse(JSON.stringify(r))),r.msg="",b(!1)},b=s=>{st(()=>{var y,$;q.to(l.value,{scrollTop:(y=l.value)==null?void 0:y.scrollHeight,duration:.3});let o=v.value[(($=v.value)==null?void 0:$.length)-1],u=s?-100:100;q.fromTo(o,{opacity:0,x:u},{opacity:1,duration:.3,x:0}),s&&ze.observe(o)})};n.on("chat",s=>{a.value.push(s),b(!0),_.value!="visible"&&t.value=="2"&&alert("有消息了")}),n.on("chatEnter",s=>{se.value=s.entering}),n.on("chatDelete",s=>{let o=a.value.findIndex(u=>u.msgId==s);a.value.splice(o,1)}),n.on("read",s=>{s.forEach(o=>{let u=a.value.findIndex(y=>y.msgId==(o.msgId||o));a.value[u].isRead=!0})});const L=s=>new Promise(o=>{const u=new FileReader;u.onloadend=y=>o(y.target.result),u.readAsDataURL(s)}),P=(s,o,u)=>new Promise(y=>s.toBlob($=>y($),o,u)),V=s=>new Promise(o=>{const u=new Image;u.onload=()=>o(u),u.src=s}),U=s=>{r.picImg=JSON.parse(s.responseText).data,r.msgId=new Date().getTime().toString(),n.emit("chat",r),d.value.clearUploadQueue(),r.picImg=""},A=s=>{B.fail(s)},z=async s=>{if(M(s[0])){r.type="img";let u=s[0].name;const y=document.createElement("canvas"),$=y.getContext("2d"),K=await L(s[0]),T=await V(K);y.width=T.width,y.height=T.height,$.clearRect(0,0,T.width,T.height),$.drawImage(T,0,0,T.width,T.height);let X=await P(y,"image/jpeg",.5);return[await new File([X],u)]}r.type="file";let o=await new File([s[0]],s[0].name);return console.log(o),[o]};function M(s){return s.type.startsWith("image/")}const W=s=>{const o=document.createElement("a");o.href=s,o.download=s.slice(s.lastIndexOf("/"),s.length),o.click()};qe(()=>{});const Y=x(10),E=x(1),c=async()=>{let s=await nt.get("/chatList",{params:{pageSize:Y.value,pageNum:E.value}});a.value.unshift(...s.data),k.value=!1,E.value==1&&setTimeout(()=>{q.to(l.value,{scrollTop:l.value.scrollHeight,duration:.5});let o=a.value.filter(u=>u.chatId!=t.value);o.length>0&&n.emit("read",o)},800),s.data.length==0&&Ee()};c();const k=x(!1),{y:S,directions:R}=Qe(l,{offset:{top:30,bottom:30,right:30,left:30}}),$e=Ca(async()=>{E.value++,await c(),S.value=400},500),Te=()=>{E.value=1,a.value=[],c()},Ee=Ze(S,()=>{S.value<11&&R.top&&$e()}),G=x(!1),se=x(!1);let ne=null;const Oe=()=>{clearTimeout(ne),G.value||(G.value=!0,n.emit("chatEnter",{entering:!0})),ne=setTimeout(()=>{G.value=!1,n.emit("chatEnter",{entering:!1})},1500)},j=x(!1),F=x(!1),Ne=ue([{name:"删除当条消息",type:"delete"},{name:"复制消息",type:"copy"}]),J=x(""),Le=async s=>{if(s.type=="delete")n.emit("chatDelete",J.value),B.success("删除成功");else{let o=a.value.find(u=>u.msgId==J.value);console.log(o);try{await h(o.msg||o.picImg),B.success("复制成功")}catch{B.fail("复制失败")}}},ze=new IntersectionObserver(s=>{s.forEach(o=>{o.isIntersecting&&(console.log(de().format("YYYY-MM-DD HH:mm:ss")),console.log(_.value),_.value=="visible"&&n.emit("read",[o.target.dataset.id]))})},{});return(s,o)=>{const u=dt,y=Gt,$=fe,K=ut,T=fe,X=ct,oe=bt,De=Ft;return p(),g(ee,null,[w(u,{title:"小小聊天室",fixed:"",class:"bg-gray-300",onClickRight:o[0]||(o[0]=i=>j.value=!0),onClickBack:Te},{left:C(()=>[f("div",Sa,[$a,w(m(pt),{width:"18px"})])]),right:C(()=>[w(m(_t),{class:"right",width:"18px"})]),_:1}),f("div",{style:{height:"calc(100vh - 96px)"},class:"overflow-y-auto overflow-x-hidden",ref_key:"chatBox",ref:l},[f("ul",null,[(p(!0),g(ee,null,Ie(m(a),i=>(p(),g("li",{class:N(["flex mt-[10px] mb-[24px]",{"flex-row-reverse":i.chatId==m(t)}]),key:i.msgId},[w(y,{onClick:ie=>{F.value=!0,J.value=i.msgId},class:"z-20 relative",color:"rgb(245, 106, 0)","bg-color":"rgb(253, 227, 207)"},{default:C(()=>[H(O(i.name),1)]),_:2},1032,["onClick"]),i.type=="img"?(p(),g("div",{key:0,onClick:ie=>m(mt)({show:!0,images:[{src:i.picImg}]}),class:"mx-[12px]"},[f("img",{src:i.picImg,alt:"",srcset:""},null,8,Ea)],8,Ta)):i.type=="file"?(p(),g("div",{key:1,class:N(["flex items-center max-w-[82%] overflow-hidden",[i.chatId==m(t)?"mr-[12px]":"ml-[12px]"]])},[f("span",Oa,"文件："+O(i.picImg.slice(i.picImg.lastIndexOf("/"),i.picImg.length)),1),w($,{size:"small",onClick:ie=>W(i.picImg)},{default:C(()=>[H("点击下载")]),_:2},1032,["onClick"])],2)):(p(),g("div",{key:2,ref_for:!0,ref_key:"chatList",ref:v,class:N(["bg-gray-100 rounded-lg text-[14px] max-w-[82%] p-[4px] relative z-10",[i.chatId==m(t)?"mr-[12px] ml-[12px]":"ml-[12px] mr-[12px] bg-green-500 text-white"]]),"data-id":i.msgId},[f("span",{class:"inline-block w-full overflow-hidden",innerHTML:i.msg},null,8,La),i.chatId==m(t)?(p(),g("span",za,[w(me,{size:"18",icon:i.isRead?"ion:checkmark-done-outline":"ion:checkmark-outline"},null,8,["icon"])])):D("",!0),f("span",{class:N(["absolute text-[10px] text-gray-400 bottom-[-14px] whitespace-nowrap",[i.chatId==m(t)?"right-0":"left-0"]])},O(m(de)(i.time).format("MM-DD HH:mm:ss")),3)],10,Na))],2))),128))])],512),f("div",Da,[et(f("span",Pa,[H("对方正在输入中"),Ba],512),[[tt,m(se)]]),w(X,{modelValue:m(r).msg,"onUpdate:modelValue":o[1]||(o[1]=i=>m(r).msg=i),onKeyup:at(I,["enter"]),onInput:Oe,placeholder:"请输入内容",clearable:""},{right:C(()=>[f("div",Aa,[w(K,{ref_key:"myUploader",ref:d,url:"/api/upload",onSuccess:U,"before-upload":z,onFailure:A,name:"image"},{default:C(()=>[w(m(rt),{name:"image",size:"24"})]),_:1},512),w(T,{style:{"margin-left":"10px"},type:"primary",size:"small",icon:"",onClick:I},{icon:C(()=>[w(me,{icon:"ion:paper-plane-outline"})]),default:C(()=>[H("发送 ")]),_:1})])]),_:1},8,["modelValue","onKeyup"])]),w(oe,{visible:m(j),"onUpdate:visible":o[2]||(o[2]=i=>pe(j)?j.value=i:null)},{default:C(()=>[Ma]),_:1},8,["visible"]),w(De,{visible:m(F),"onUpdate:visible":o[3]||(o[3]=i=>pe(F)?F.value=i:null),"cancel-txt":"取消","menu-items":m(Ne),onChoose:Le},null,8,["visible","menu-items"])],64)}}});const qa=lt(Ra,[["__scopeId","data-v-778dfe50"]]);export{qa as default};
