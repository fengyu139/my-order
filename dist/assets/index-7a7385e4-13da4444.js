import{r as t}from"./index-783af5e0.js";const h=10;function m(e,a){return e>a&&e>h?"horizontal":a>e&&a>h?"vertical":""}function b(){const e=t(0),a=t(0),r=t(0),i=t(0),l=t(0),u=t(0),c=t(0),n=t(0),o=t(""),X=()=>o.value==="vertical",Y=()=>o.value==="horizontal",f=()=>{l.value=0,u.value=0,c.value=0,n.value=0,o.value=""};return{move:s=>{const v=s.touches[0];l.value=v.clientX-e.value,u.value=v.clientY-a.value,r.value=v.clientX,i.value=v.clientY,c.value=Math.abs(l.value),n.value=Math.abs(u.value),o.value||(o.value=m(c.value,n.value))},start:s=>{f(),e.value=s.touches[0].clientX,a.value=s.touches[0].clientY},reset:f,startX:e,startY:a,moveX:r,moveY:i,deltaX:l,deltaY:u,offsetX:c,offsetY:n,direction:o,isVertical:X,isHorizontal:Y}}export{b as u};
