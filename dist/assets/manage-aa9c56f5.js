import{a as J,r as V,c as E,w as x,N as ve,L as te,_ as ce,b as de,h as he,o as P,d as U,e as F,H as B,k as Q,f as ne,F as W,C as le,s as c,n as q,$ as ae,l as ge,a0 as ye,m as be,q as ke,T as we,a1 as oe,v as b,t as m,x as X,A as R,j as se,z as Z,y as K}from"./index-783af5e0.js";import{F as Te,a as _e}from"./index-af7cd4e9.js";import{U as Ne}from"./index-691bca9f.js";import{R as Se,a as De}from"./index-02d363a1.js";import{I as Oe}from"./index-1c5bd63f.js";import{B as re}from"./index-257aea4f.js";import{P as Ve,T as Ce}from"./index-75dc2a9c.js";import{C as Pe}from"./index-17ef9fc2.js";import{w as $e}from"./Plus-f0f186cb.js";import{p as Ie}from"./Cell-586959d3.js";import{u as Me}from"./index-7a7385e4-13da4444.js";import"./Checked-00c9111d.js";import"./CheckNormal-8b81c4d7.js";var He=Object.defineProperty,Re=Object.defineProperties,Ue=Object.getOwnPropertyDescriptors,ue=Object.getOwnPropertySymbols,Ye=Object.prototype.hasOwnProperty,Ee=Object.prototype.propertyIsEnumerable,ie=(e,a,i)=>a in e?He(e,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[a]=i,G=(e,a)=>{for(var i in a||(a={}))Ye.call(a,i)&&ie(e,i,a[i]);if(ue)for(var i of ue(a))Ee.call(a,i)&&ie(e,i,a[i]);return e},me=(e,a)=>Re(e,Ue(a));const Fe={text:"text",value:"value",children:"children"},Le=(e,a)=>{const i=J({formattedColumns:e.columns}),t=E(()=>G(G({},Fe),e.fieldNames)),u=V([]),N=E(()=>{const o=t.value;return M.value.map((v,C)=>{const p=v.findIndex(S=>S[o.value]===u.value[C]);return p===-1?0:p})}),d=V([]),k=o=>{o&&d.value.length<M.value.length&&d.value.push(o)},f=E(()=>{const o=t.value;return M.value.map((v,C)=>v.find(p=>p[o.value]===u.value[C])||v[0])}),s=E(()=>{const o=i.formattedColumns[0],v=t.value;if(o){if(Array.isArray(o))return"multiple";if(v.children in o)return"cascade"}return"single"}),M=E(()=>{let o=[];switch(s.value){case"multiple":o=i.formattedColumns;break;case"cascade":o=$(i.formattedColumns,u.value?u.value:[]);break;default:o=[i.formattedColumns];break}return o}),$=(o,v)=>{const C=[],p=t.value;let S={text:"",value:"",[p.children]:o},T=0;for(;S&&S[p.children];){const A=S[p.children],r=v[T];let n=A.findIndex(l=>l[p.value]===r);n===-1&&(n=0),S=S[p.children][n],T++,C.push(A)}return C},Y=()=>{a("cancel",{selectedValue:u.value,selectedOptions:f.value})},D=(o,v)=>{var C;const p=t.value;if(v&&Object.keys(v).length){if(u.value=u.value?u.value:[],s.value==="cascade"){u.value[o]=(C=v[p.value])!=null?C:"";let S=o,T=v;for(;T&&T[p.children]&&T[p.children][0];)u.value[S+1]=T[p.children][0][p.value],S++,T=T[p.children][0];T&&T[p.children]&&T[p.children].length===0&&(u.value=u.value.slice(0,S+1))}else u.value[o]=Object.prototype.hasOwnProperty.call(v,p.value)?v[p.value]:"";a("change",{columnIndex:o,selectedValue:u.value,selectedOptions:f.value})}},j=()=>{const o=t.value;u.value&&!u.value.length&&M.value.forEach(v=>{u.value.push(v[0][o.value])}),a("confirm",{selectedValue:u.value,selectedOptions:f.value})},L=(o,v)=>JSON.stringify(o)===JSON.stringify(v);return x(()=>e.modelValue,o=>{L(o,u.value)||(u.value=o)},{deep:!0,immediate:!0}),x(u,o=>{L(o,e.modelValue)||a("update:modelValue",o)},{deep:!0}),x(()=>e.columns,o=>{o.length&&(i.formattedColumns=o)}),me(G({},te(i)),{columnsType:s,columnsList:M,columnFieldNames:t,cancel:Y,changeHandler:D,confirm:j,defaultValues:u,defaultIndexes:N,pickerColumn:d,swipeRef:k,selectedOptions:f,isSameValue:L})},{create:Ae}=de("picker-column"),Be=Ae({props:{value:[String,Number],columnsType:String,column:{type:Array,default:()=>[]},threeDimensional:{type:Boolean,default:!0},swipeDuration:{type:[Number,String],default:1e3},visibleOptionNum:{type:[Number,String],default:7},optionHeight:{type:[Number,String],default:36},fieldNames:{type:Object,default:()=>({})},taro:{type:Boolean,defualt:!1}},emits:["click","change"],setup(e,{emit:a}){const i=Me(),t=J({touchParams:{startY:0,endY:0,startTime:0,endTime:0,lastY:0,lastTime:0},currIndex:1,transformY:0,scrollDistance:0,rotation:20}),u=V(null),N=V(!1),d=V(0),k=V(0),f=200,s=300,M=15,$=E(()=>({transition:`transform ${k.value}ms cubic-bezier(0.17, 0.89, 0.45, 1)`,transform:`rotate3d(1, 0, 0, ${d.value})`,top:`calc(50% - ${+e.optionHeight/2}px)`})),Y=E(()=>{const{optionHeight:l}=e;return{transition:`transform ${k.value}ms cubic-bezier(0.17, 0.89, 0.45, 1)`,transform:`translate3d(0, ${t.scrollDistance}px, 0)`,top:`calc(50% - ${+l/2}px)`,height:`${l}px`}}),D=l=>`transform: rotate3d(1, 0, 0, ${-t.rotation*l}deg) translate3d(0px, 0px, 104px)`,j=E(()=>({backgroundSize:`100% ${(+e.visibleOptionNum-1)*+e.optionHeight/2}px`})),L=l=>{if(i.start(l),N.value&&!e.taro){const h=u.value,{transform:w}=window.getComputedStyle(h);if(e.threeDimensional){const g=Math.floor(parseInt(d.value)/360),_=+w.split(", ")[5],O=+w.split(", ")[6]<0?180:0,I=g*360+Math.acos(_)/Math.PI*180+O;t.scrollDistance=-Math.abs((I/t.rotation-1)*+e.optionHeight)}else t.scrollDistance=+w.slice(7,w.length-1).split(", ")[5]}ae(l,!0),t.touchParams.startY=i.deltaY.value,t.touchParams.startTime=Date.now(),t.transformY=t.scrollDistance},o=l=>{i.move(l),i.isVertical()&&(N.value=!0,ae(l,!0)),t.touchParams.lastY=i.deltaY.value;let h=t.touchParams.lastY-t.touchParams.startY;T(h)},v=()=>{t.touchParams.lastY=i.deltaY.value,t.touchParams.lastTime=Date.now();let l=t.touchParams.lastY-t.touchParams.startY,h=t.touchParams.lastTime-t.touchParams.startTime;if(h<=s&&Math.abs(l)>M){const w=C(l,h);T(w,"end",+e.swipeDuration);return}else T(l,"end");setTimeout(()=>{i.reset(),N.value=!1},0)},C=(l,h)=>(l=Math.abs(l/h)/.003*(l<0?-1:1),l),p=l=>l>=t.currIndex+8||l<=t.currIndex-8,S=(l=0,h,w=f,g)=>{h==="end"?k.value=w:k.value=0,d.value=g,t.scrollDistance=l},T=(l,h,w)=>{const{optionHeight:g}=e;let _=l+t.transformY;if(h==="end"){_>0&&(_=0),_<-(e.column.length-1)*+g&&(_=-(e.column.length-1)*+g);let O=Math.round(_/+g)*+g,I=`${(Math.abs(Math.round(O/+g))+1)*t.rotation}deg`;S(O,h,w,I),t.currIndex=Math.abs(Math.round(O/+g))+1}else{let O=0,I=(-_/+g+1)*t.rotation;const H=(e.column.length+1)*t.rotation,z=0;O=ye(I,z,H),z<O&&O<H&&(S(_,null,void 0,O+"deg"),t.currIndex=Math.abs(Math.round(_/+g))+1)}},A=()=>{a("change",e.column[t.currIndex-1])},r=l=>{const{column:h}=e;let w=h.findIndex(_=>_[e.fieldNames.value]===e.value);t.currIndex=w===-1?1:w+1;let g=w===-1?0:w*+e.optionHeight;l&&A(),T(-g)},n=()=>{N.value=!1,k.value=0,A()};return x(()=>e.column,()=>{e.column&&e.column.length>0&&(t.transformY=0,r(!1))},{deep:!0}),x(()=>e.value,()=>{t.transformY=0,r(!1)},{deep:!0}),ve(()=>{r(!0)}),me(G(G({},te(t)),te(e)),{setRollerStyle:D,isHidden:p,roller:u,onTouchStart:L,onTouchMove:o,onTouchEnd:v,touchRollerStyle:$,touchTileStyle:Y,setMove:T,stopMomentum:n,pxCheck:Ie,maskStyles:j})}});function je(e,a,i,t,u,N){return P(),U("view",{class:"nut-picker__list",onTouchstart:a[1]||(a[1]=(...d)=>e.onTouchStart&&e.onTouchStart(...d)),onTouchmove:a[2]||(a[2]=(...d)=>e.onTouchMove&&e.onTouchMove(...d)),onTouchend:a[3]||(a[3]=(...d)=>e.onTouchEnd&&e.onTouchEnd(...d))},[F("view",{ref:"roller",class:"nut-picker-roller",style:q(e.threeDimensional?e.touchRollerStyle:e.touchTileStyle),onTransitionend:a[0]||(a[0]=(...d)=>e.stopMomentum&&e.stopMomentum(...d))},[(P(!0),U(W,null,le(e.column,(d,k)=>{var f;return P(),U(W,{key:(f=d[e.fieldNames.value])!=null?f:k},[d&&d[e.fieldNames.text]&&e.threeDimensional?(P(),U("view",{key:0,class:ge(["nut-picker-roller-item",{"nut-picker-roller-item-hidden":e.isHidden(k+1)}]),style:q(e.setRollerStyle(k+1))},B(d[e.fieldNames.text]),7)):Q("",!0),d&&d[e.fieldNames.text]&&!e.threeDimensional?(P(),U("view",{key:1,class:"nut-picker-roller-item-tile",style:q({height:e.pxCheck(e.optionHeight),lineHeight:e.pxCheck(e.optionHeight)})},B(d[e.fieldNames.text]),5)):Q("",!0)],64)}),128))],36),F("view",{class:"nut-picker-roller-mask",style:q(e.maskStyles)},null,4)],32)}const ee=ce(Be,[["render",je]]),ze={modelValue:{type:Array,default:()=>[]},title:{type:String,default:""},cancelText:{type:String,default:""},okText:{type:String,default:""},columns:{type:Array,default:()=>[]},threeDimensional:{type:Boolean,default:!1},swipeDuration:{type:[Number,String],default:1e3},showToolbar:{type:Boolean,default:!0},visibleOptionNum:{type:[Number,String],default:7},optionHeight:{type:[Number,String],default:36},fieldNames:{type:Object,default:()=>({})}},{create:xe,translate:qe}=de("picker"),Je=xe({components:{[ee.name]:ee},props:ze,emits:["cancel","change","confirm","update:modelValue"],setup(e,{emit:a}){const{changeHandler:i,confirm:t,defaultValues:u,columnsList:N,columnsType:d,columnFieldNames:k,cancel:f}=Le(e,a),s=V([]),M=D=>{D&&s.value.length<N.value.length&&s.value.push(D)},$=E(()=>{const D={};return D.height=`${+e.visibleOptionNum*+e.optionHeight}px`,D["--lineHeight"]=`${+e.optionHeight}px`,D});return{column:ee,columnsType:d,columnsList:N,columnFieldNames:k,cancel:f,changeHandler:i,confirmHandler:()=>{s.value.length>0&&s.value.forEach(D=>{D.stopMomentum()}),t()},defaultValues:u,translate:qe,pickerColumn:s,swipeRef:M,columnStyle:$}}}),Ge={class:"nut-picker"},Ke={key:0,class:"nut-picker__bar"},Qe={class:"nut-picker__title"};function We(e,a,i,t,u,N){const d=he("nut-picker-column");return P(),U("div",Ge,[e.showToolbar?(P(),U("view",Ke,[F("view",{class:"nut-picker__left",onClick:a[0]||(a[0]=(...k)=>e.cancel&&e.cancel(...k))},B(e.cancelText||e.translate("cancel")),1),F("view",Qe,B(e.title),1),F("view",{class:"nut-picker__right",onClick:a[1]||(a[1]=(...k)=>e.confirmHandler&&e.confirmHandler(...k))},B(e.okText||e.translate("confirm")),1)])):Q("",!0),ne(e.$slots,"top"),F("view",{class:"nut-picker__column",style:q(e.columnStyle)},[(P(!0),U(W,null,le(e.columnsList,(k,f)=>(P(),U("view",{key:f,class:"nut-picker__columnitem"},[c(d,{ref_for:!0,ref:e.swipeRef,column:k,"columns-type":e.columnsType,"field-names":e.columnFieldNames,value:e.defaultValues&&e.defaultValues[f],"three-dimensional":e.threeDimensional,"swipe-duration":e.swipeDuration,"visible-option-num":e.visibleOptionNum,"option-height":e.optionHeight,onChange:s=>{e.changeHandler(f,s)}},null,8,["column","columns-type","field-names","value","three-dimensional","swipe-duration","visible-option-num","option-height","onChange"])]))),128))],4),ne(e.$slots,"default")])}const Xe=ce(Je,[["render",We]]),Ze=e=>e,et=Ze(Xe);const tt={class:"p-2 pb-[50px]"},lt={class:"p-[12px]"},nt={class:"pt-[18px] px-[20px]"},gt=be({__name:"manage",setup(e){const a=ke();a.getMenu();const i=J([{title:"菜名",key:"name",align:"center"},{title:"价格",key:"price",align:"center",sorter:(r,n)=>n.price-r.price},{title:"类型",key:"type",align:"center",render:r=>{var n;return(n=a.selectList.find(l=>l.value==r.type))==null?void 0:n.text}},{title:"操作",key:"render",align:"center",render:r=>we(re,{onClick:()=>{Object.assign(s,r),$.value="edit",Y.value=r.isOnline?"1":"0",s.type=r.type+"",f.value=!0},size:"small",type:"primary"},()=>"修改")}]),t=V(!1),u=V("全部"),N=V(0),d=r=>{t.value=!1,u.value=r.selectedOptions[0].text,N.value=r.selectedOptions[0].value,a.getMenu(Number(N.value))},k=V(null),f=V(!1),s=J({id:"",name:"",price:"",type:"1",picImg:"",isOnline:"",unit:"串"}),M=oe(s),$=V("add"),Y=V("1"),D=()=>{k.value.validate().then(r=>{if(!r.valid)return;let n={...s,type:Number(s.type),price:Number(s.price),isOnline:Y.value=="1",picImg:s.picImg.includes("http")?"":s.picImg};$.value=="edit"&&Z.post("/updateMenu",n).then(()=>{K.success("修改成功"),a.getMenu(Number(N.value)),f.value=!1}),$.value=="add"&&Z.post("/addMenu",n).then(()=>{K.success("添加成功"),a.getMenu(Number(N.value)),f.value=!1})})},j=r=>{k.value.validate(r).then(()=>{})},L=r=>/^\d+(\.\d+)?$/.test(r)?Promise.resolve():Promise.reject("必须输入数字");x(()=>s.unit,r=>{console.log(r)});const o=r=>{s.picImg=JSON.parse(r.responseText).data,K.success("上传成功")},v=J(oe(a.selectList));v.unshift({text:"全部",value:0});const C=()=>{Z.post("/deleteMenu",{id:s.id}).then(()=>{K.success("删除成功"),a.getMenu(Number(N.value)),f.value=!1})},p=r=>new Promise(n=>{const l=new FileReader;l.onloadend=h=>n(h.target.result),l.readAsDataURL(r)}),S=r=>new Promise(n=>{const l=new Image;l.onload=()=>n(l),l.src=r}),T=(r,n,l)=>new Promise(h=>r.toBlob(w=>h(w),n,l)),A=async r=>{let n=r[0].name;const l=document.createElement("canvas"),h=l.getContext("2d"),w=await p(r[0]),g=await S(w);l.width=g.width,l.height=g.height,h.clearRect(0,0,g.width,g.height),h.drawImage(g,0,0,g.width,g.height);let _=await T(l,"image/jpeg",.5);return[await new File([_],n)]};return(r,n)=>{const l=Pe,h=et,w=Ve,g=Ce,_=re,O=Oe,I=Te,H=Se,z=De,pe=Ne,fe=_e;return P(),U("div",tt,[c(l,{title:"请选择分类",desc:b(u),onClick:n[0]||(n[0]=y=>t.value=!0)},null,8,["desc"]),c(w,{position:"bottom",visible:b(t),"onUpdate:visible":n[2]||(n[2]=y=>X(t)?t.value=y:null)},{default:m(()=>[c(h,{threeDimensional:"",columns:b(v),title:"请选择分类",onConfirm:d,onCancel:n[1]||(n[1]=y=>t.value=!1)},null,8,["columns"])]),_:1},8,["visible"]),c(g,{columns:b(i),data:b(a).productList},null,8,["columns","data"]),F("div",lt,[c(_,{block:"",type:"primary",onClick:n[3]||(n[3]=y=>{f.value=!0,$.value="add",Object.assign(b(s),b(M))})},{icon:m(()=>[c(b($e))]),default:m(()=>[R(" 添加菜品 ")]),_:1})]),c(w,{position:"right",closeable:"","close-icon-position":"top-left",visible:b(f),"onUpdate:visible":n[12]||(n[12]=y=>X(f)?f.value=y:null),style:{height:"100%",width:"100%"}},{default:m(()=>[F("div",nt,[c(fe,{"model-value":b(s),ref_key:"ruleForm",ref:k},{default:m(()=>[c(I,{label:"菜名",prop:"name",onBlur:n[5]||(n[5]=y=>j("name")),required:"",rules:[{required:!0,message:"请填写菜名"}]},{default:m(()=>[c(O,{class:"nut-input-text",rules:[{required:!0,message:"请填写菜名"}],modelValue:b(s).name,"onUpdate:modelValue":n[4]||(n[4]=y=>b(s).name=y),placeholder:"请填写要添加的菜名",type:"text"},null,8,["modelValue"])]),_:1}),c(I,{label:"价格",prop:"price",onBlur:n[7]||(n[7]=y=>j("price")),required:"",rules:[{required:!0,message:"请填写价格"},{validator:L,message:"必须输入数字"}]},{default:m(()=>[c(O,{class:"nut-input-text",modelValue:b(s).price,"onUpdate:modelValue":n[6]||(n[6]=y=>b(s).price=y),placeholder:"请输入单价",type:"text"},null,8,["modelValue"])]),_:1},8,["rules"]),c(I,{label:"单位",prop:"unit"},{default:m(()=>[c(z,{direction:"horizontal",modelValue:b(s).unit,"onUpdate:modelValue":n[8]||(n[8]=y=>b(s).unit=y)},{default:m(()=>[c(H,{label:"串"},{default:m(()=>[R("串")]),_:1}),c(H,{label:"份"},{default:m(()=>[R("份")]),_:1}),c(H,{label:"瓶"},{default:m(()=>[R("瓶")]),_:1}),c(H,{label:"件"},{default:m(()=>[R("件")]),_:1}),c(H,{label:"个"},{default:m(()=>[R("个")]),_:1})]),_:1},8,["modelValue"])]),_:1}),c(I,{label:"是否上架",prop:"isOnline"},{default:m(()=>[c(z,{direction:"horizontal",modelValue:b(Y),"onUpdate:modelValue":n[9]||(n[9]=y=>X(Y)?Y.value=y:null)},{default:m(()=>[c(H,{label:"1"},{default:m(()=>[R("上架")]),_:1}),c(H,{label:"0"},{default:m(()=>[R("下架")]),_:1})]),_:1},8,["modelValue"])]),_:1}),c(I,{label:"所属分类",prop:"type"},{default:m(()=>[c(z,{direction:"horizontal",modelValue:b(s).type,"onUpdate:modelValue":n[10]||(n[10]=y=>b(s).type=y)},{default:m(()=>[(P(!0),U(W,null,le(b(a).selectList,y=>(P(),se(H,{label:y.value,key:y.value},{default:m(()=>[R(B(y.text),1)]),_:2},1032,["label"]))),128))]),_:1},8,["modelValue"])]),_:1}),c(I,{label:"预览图片上传",prop:"picImg"},{default:m(()=>[c(pe,{url:"/api/upload",accept:"image/*",modelValue:b(s).picImg,"onUpdate:modelValue":n[11]||(n[11]=y=>b(s).picImg=y),onSuccess:o,"before-upload":A,name:"image"},null,8,["modelValue"])]),_:1}),c(l,null,{default:m(()=>[c(_,{block:"",type:"primary",onClick:D},{default:m(()=>[R("确认"+B(b($)=="edit"?"修改":"添加"),1)]),_:1})]),_:1}),c(l,null,{default:m(()=>[b($)=="edit"?(P(),se(_,{key:0,block:"",type:"warning",onClick:C},{default:m(()=>[R(" 删 除")]),_:1})):Q("",!0)]),_:1})]),_:1},8,["model-value"])])]),_:1},8,["visible"])])}}});export{gt as default};
