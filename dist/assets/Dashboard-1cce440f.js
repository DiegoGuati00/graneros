import{r as a,a as i,j as r,N as h}from"./index-39a70ab6.js";import{u as g}from"./keen-slider.min-9c2a669f.js";const N=({config:v={}})=>{const[d,p]=a.useState([]),[l,u]=a.useState([]),[m,c]=a.useState([]);return g({loop:!0,rtl:!1,slides:{perView:3,spacing:10},breakpoints:{"(min-width: 100px)":{slides:{perView:1,spacing:10}},"(min-width: 500px)":{slides:{perView:2,spacing:10}},"(min-width: 800px)":{slides:{perView:3,spacing:10}}}},[t=>{let e,n=!1;function o(){clearTimeout(e)}function s(){clearTimeout(e),!n&&(e=setTimeout(()=>{t.next()},2e3))}t.on("created",()=>{t.container.addEventListener("mouseover",()=>{n=!0,o()}),t.container.addEventListener("mouseout",()=>{n=!1,s()}),s()}),t.on("dragStarted",o),t.on("animationEnded",s),t.on("updated",s)}]),a.useEffect(()=>{const t=()=>{fetch("https://api.escuelajs.co/api/v1/categories").then(o=>{o.json().then(s=>{p(s),console.log(s)})})},e=()=>{fetch("https://api.escuelajs.co/api/v1/products").then(o=>{o.json().then(s=>{c(s),u(s),console.log(s)})})};t(),e()},[]),i("div",{id:"Home",children:r("div",{children:[i("div",{className:"view-S",children:i("div",{children:r("select",{name:"",id:"",onChange:t=>{let e=parseInt(t.target.value),n=[];console.log(e),e?(l.map(o=>{o.category.id==e&&n.push(o)}),c(n)):c(l)},children:[i("option",{value:"",children:" --- --- ---"}),d.map((t,e)=>i("option",{value:t.id,children:t.name}))]})})}),i("div",{className:"view-P",children:m.map(t=>{let e=t.images[0];return e=e.replaceAll("[",""),e=e.replaceAll("]",""),e=e.replaceAll('"',""),e=e.replaceAll("\\",""),i(h,{to:"/dashboard/producto/"+t.id,children:r("div",{className:"slider-producto",children:[i("div",{className:"C-img",children:i("img",{src:e,alt:""})}),i("div",{className:"C-title",children:i("p",{children:t.title})}),r("p",{children:["$",t.price]})]})})})})]})})};export{N as default};
