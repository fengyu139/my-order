import{m as u,ae as f,r as m,i as h,z as v,aa as y,o as l,d as c,e as s,A as o,H as a,ab as k,v as r,s as _,F as N,C as g,ac as F}from"./index-dab13d73.js";import{N as b}from"./index-c78d9cd5.js";const D={class:"text-center pt-[20px]"},T=s("h2",null,"正在准备中",-1),V={class:"text-red-500"},B={class:"mb-[6px] text-[12px] text-gray-500 flex justify-around items-center"},L=F('<li class="flex text-center text-[12px]"><span class="flex-1">菜名</span><span class="flex-1">单价</span><span class="flex-[0.5]"></span><span class="flex-1"> 数量</span><span class="flex-[0.5]"></span><span class="flex-1"> 小记 </span></li>',1),S={class:"flex-1"},j={class:"flex-1"},z=s("span",{class:"flex-[0.5]"},"*",-1),C={class:"flex-1"},O=s("span",{class:"flex-[0.5]"},"=",-1),q={class:"flex-1"},P=u({__name:"settlement",setup(w){const d=f("storeOrder",""),t=m({});return h("socket").close(),v.post("/orderList",{id:d.value}).then(n=>{t.value=n.data[0]}),(n,E)=>{var p;const i=b,x=y("FormatTime");return l(),c("div",D,[T,s("h2",null,[o(" 您的取餐号是: "),s("span",V,a(n.$route.query.orderFlag),1)]),s("div",B,[s("span",null,[o("下单时间 : "),k(s("span",null,null,512),[[x,r(t).createdTime]])]),s("span",null,[o("订单金额 :"),_(i,{price:r(t).totalMoney,symbol:"¥"},null,8,["price"])])]),s("ul",null,[L,(l(!0),c(N,null,g((p=r(t).orderDetail)==null?void 0:p.filter(e=>e.count>0),e=>(l(),c("li",{key:e.type,class:"flex text-center text-[12px]"},[s("span",S,a(e.name),1),s("span",j,a(e.price),1),z,s("span",C,a(e.count),1),O,s("span",q,[_(i,{price:e.price*e.count,symbol:"¥",size:"small"},null,8,["price"])])]))),128))])])}}});export{P as default};