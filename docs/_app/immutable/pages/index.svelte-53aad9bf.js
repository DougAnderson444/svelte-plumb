import{S as Q,i as Z,s as J,F as It,l as M,m as A,p as P,h as g,q as _,r as B,K as Wt,b as T,J as w,L as Ut,G as Mt,H as At,I as Dt,f as I,t as D,M as x,e as G,n as _t,o as Yt,N as V,O as X,P as zt,u as H,a as W,v as R,c as U,Q as dt,w as tt,x as nt,y as rt,z as ot,g as pt,d as mt,C as lt,R as Vt,T as Xt,U as Bt,V as qt,W as Ft,X as Nt}from"../chunks/index-82b6b277.js";function Ht(n){let e,t,s,r;const o=n[9].default,l=It(o,n,n[8],null);return{c(){e=M("div"),t=M("div"),l&&l.c(),this.h()},l(a){e=A(a,"DIV",{id:!0,class:!0,style:!0});var i=P(e);t=A(i,"DIV",{class:!0,style:!0});var h=P(t);l&&l.l(h),h.forEach(g),i.forEach(g),this.h()},h(){_(t,"class","absolute rounded-full h-32 w-32 shadow-xl z-10 select-none"),B(t,"transform","translate("+-n[2]/2+"px, "+-n[3]/2+"px)"),_(e,"id",n[1]),_(e,"class","absolute rounded-full h-16 w-16 bg-green-500 shadow-xl z-20 select-none"),B(e,"left",n[5]+"px"),B(e,"top",n[4]+"px"),Wt(()=>n[11].call(e))},m(a,i){T(a,e,i),w(e,t),l&&l.m(t,null),n[10](e),s=Ut(e,n[11].bind(e)),r=!0},p(a,[i]){l&&l.p&&(!r||i&256)&&Mt(l,o,a,a[8],r?Dt(o,a[8],i,null):At(a[8]),null),(!r||i&12)&&B(t,"transform","translate("+-a[2]/2+"px, "+-a[3]/2+"px)"),(!r||i&2)&&_(e,"id",a[1]),(!r||i&32)&&B(e,"left",a[5]+"px"),(!r||i&16)&&B(e,"top",a[4]+"px")},i(a){r||(I(l,a),r=!0)},o(a){D(l,a),r=!1},d(a){a&&g(e),l&&l.d(a),n[10](null),s()}}}function Rt(n,e,t){let s,r,{$$slots:o={},$$scope:l}=e,{marker:a}=e,{id:i}=e,{left:h}=e,{top:u}=e,c,v;function p(f){x[f?"unshift":"push"](()=>{a=f,t(0,a)})}function m(){c=this.offsetWidth,v=this.offsetHeight,t(2,c),t(3,v)}return n.$$set=f=>{"marker"in f&&t(0,a=f.marker),"id"in f&&t(1,i=f.id),"left"in f&&t(6,h=f.left),"top"in f&&t(7,u=f.top),"$$scope"in f&&t(8,l=f.$$scope)},n.$$.update=()=>{n.$$.dirty&68&&t(5,s=h-c/2),n.$$.dirty&136&&t(4,r=u-v/2)},[a,i,c,v,r,s,h,u,l,o,p,m]}class Kt extends Q{constructor(e){super(),Z(this,e,Rt,Ht,J,{marker:0,id:1,left:6,top:7})}}const et=Math.PI,it=2*et,j=1e-6,Gt=it-j;function st(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function jt(){return new st}st.prototype=jt.prototype={constructor:st,moveTo:function(n,e){this._+="M"+(this._x0=this._x1=+n)+","+(this._y0=this._y1=+e)},closePath:function(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(n,e){this._+="L"+(this._x1=+n)+","+(this._y1=+e)},quadraticCurveTo:function(n,e,t,s){this._+="Q"+ +n+","+ +e+","+(this._x1=+t)+","+(this._y1=+s)},bezierCurveTo:function(n,e,t,s,r,o){this._+="C"+ +n+","+ +e+","+ +t+","+ +s+","+(this._x1=+r)+","+(this._y1=+o)},arcTo:function(n,e,t,s,r){n=+n,e=+e,t=+t,s=+s,r=+r;var o=this._x1,l=this._y1,a=t-n,i=s-e,h=o-n,u=l-e,c=h*h+u*u;if(r<0)throw new Error("negative radius: "+r);if(this._x1===null)this._+="M"+(this._x1=n)+","+(this._y1=e);else if(c>j)if(!(Math.abs(u*a-i*h)>j)||!r)this._+="L"+(this._x1=n)+","+(this._y1=e);else{var v=t-o,p=s-l,m=a*a+i*i,f=v*v+p*p,b=Math.sqrt(m),C=Math.sqrt(c),y=r*Math.tan((et-Math.acos((m+c-f)/(2*b*C)))/2),d=y/C,L=y/b;Math.abs(d-1)>j&&(this._+="L"+(n+d*h)+","+(e+d*u)),this._+="A"+r+","+r+",0,0,"+ +(u*v>h*p)+","+(this._x1=n+L*a)+","+(this._y1=e+L*i)}},arc:function(n,e,t,s,r,o){n=+n,e=+e,t=+t,o=!!o;var l=t*Math.cos(s),a=t*Math.sin(s),i=n+l,h=e+a,u=1^o,c=o?s-r:r-s;if(t<0)throw new Error("negative radius: "+t);this._x1===null?this._+="M"+i+","+h:(Math.abs(this._x1-i)>j||Math.abs(this._y1-h)>j)&&(this._+="L"+i+","+h),t&&(c<0&&(c=c%it+it),c>Gt?this._+="A"+t+","+t+",0,1,"+u+","+(n-l)+","+(e-a)+"A"+t+","+t+",0,1,"+u+","+(this._x1=i)+","+(this._y1=h):c>j&&(this._+="A"+t+","+t+",0,"+ +(c>=et)+","+u+","+(this._x1=n+t*Math.cos(r))+","+(this._y1=e+t*Math.sin(r))))},rect:function(n,e,t,s){this._+="M"+(this._x0=this._x1=+n)+","+(this._y0=this._y1=+e)+"h"+ +t+"v"+ +s+"h"+-t+"Z"},toString:function(){return this._}};function gt(n){return function(){return n}}var Qt=Array.prototype.slice;function Zt(n){return n[0]}function Jt(n){return n[1]}class xt{constructor(e,t){this._context=e,this._x=t}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(e,t){switch(e=+e,t=+t,this._point){case 0:{this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+e)/2,this._y0,this._x0,t,e,t):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+t)/2,e,this._y0,e,t);break}}this._x0=e,this._y0=t}}function $t(n){return new xt(n,!0)}function te(n){return n.source}function ee(n){return n.target}function ie(n){let e=te,t=ee,s=Zt,r=Jt,o=null,l=null;function a(){let i;const h=Qt.call(arguments),u=e.apply(this,h),c=t.apply(this,h);if(o==null&&(l=n(i=jt())),l.lineStart(),h[0]=u,l.point(+s.apply(this,h),+r.apply(this,h)),h[0]=c,l.point(+s.apply(this,h),+r.apply(this,h)),l.lineEnd(),i)return l=null,i+""||null}return a.source=function(i){return arguments.length?(e=i,a):e},a.target=function(i){return arguments.length?(t=i,a):t},a.x=function(i){return arguments.length?(s=typeof i=="function"?i:gt(+i),a):s},a.y=function(i){return arguments.length?(r=typeof i=="function"?i:gt(+i),a):r},a.context=function(i){return arguments.length?(i==null?o=l=null:l=n(o=i),a):o},a}function vt(n,e,t){const s=n.slice();return s[16]=e[t],s[18]=t,s}function kt(n){let e,t,s=n[0],r=[];for(let o=0;o<s.length;o+=1)r[o]=Et(vt(n,s,o));return{c(){e=M("div"),t=V("svg");for(let o=0;o<r.length;o+=1)r[o].c();this.h()},l(o){e=A(o,"DIV",{class:!0});var l=P(e);t=X(l,"svg",{class:!0});var a=P(t);for(let i=0;i<r.length;i+=1)r[i].l(a);a.forEach(g),l.forEach(g),this.h()},h(){_(t,"class","svelte-2ewo7e"),_(e,"class","svg-container svelte-2ewo7e")},m(o,l){T(o,e,l),w(e,t);for(let a=0;a<r.length;a+=1)r[a].m(t,null)},p(o,l){if(l&2047){s=o[0];let a;for(a=0;a<s.length;a+=1){const i=vt(o,s,a);r[a]?r[a].p(i,l):(r[a]=Et(i),r[a].c(),r[a].m(t,null))}for(;a<r.length;a+=1)r[a].d(1);r.length=s.length}},d(o){o&&g(e),zt(r,o)}}}function bt(n){var p,m,f,b,C,y,d,L,O;let e,t,s,r,o,l,a=((f=(m=(p=n[16])==null?void 0:p.opts)==null?void 0:m.label)!=null&&f.enabled?(y=(C=(b=n[16])==null?void 0:b.opts)==null?void 0:C.label)==null?void 0:y.value:"")+"",i,h,u,c=(d=n[16])!=null&&d.opts?(O=(L=n[16])==null?void 0:L.opts)!=null&&O.arrow?"\u27A4":"":"\u27A4",v;return{c(){e=V("g"),t=V("path"),r=V("text"),o=V("textPath"),l=V("tspan"),i=H(a),h=W(),u=V("textPath"),v=H(c),this.h()},l(E){e=X(E,"g",{stroke:!0,"stroke-opacity":!0});var k=P(e);t=X(k,"path",{d:!0,id:!0,"stroke-width":!0,stroke:!0,fill:!0,"stroke-linecap":!0,"marker-mid":!0,"stroke-opacity":!0}),P(t).forEach(g),r=X(k,"text",{class:!0});var S=P(r);o=X(S,"textPath",{"xlink:href":!0,startOffset:!0});var Y=P(o);l=X(Y,"tspan",{fill:!0,class:!0});var q=P(l);i=R(q,a),q.forEach(g),h=U(Y),Y.forEach(g),u=X(S,"textPath",{"xlink:href":!0,startOffset:!0,fill:!0});var F=P(u);v=R(F,c),F.forEach(g),S.forEach(g),k.forEach(g),this.h()},h(){_(t,"d",s=n[10](n[16])),_(t,"id","link_"+n[18]),_(t,"stroke-width",n[2]),_(t,"stroke",n[1]),_(t,"fill","none"),_(t,"stroke-linecap","round"),_(t,"marker-mid","url(#triangle)"),_(t,"stroke-opacity",n[4]),_(l,"fill","black"),_(l,"class","svelte-2ewo7e"),dt(o,"xlink:href","#link_"+n[18]),_(o,"startOffset",n[7]),dt(u,"xlink:href","#link_"+n[18]),_(u,"startOffset",n[8]),_(u,"fill",n[3]),_(r,"class","svelte-2ewo7e"),_(e,"stroke",n[6]),_(e,"stroke-opacity",n[5])},m(E,k){T(E,e,k),w(e,t),w(e,r),w(r,o),w(o,l),w(l,i),w(o,h),w(r,u),w(u,v)},p(E,k){var S,Y,q,F,at,ht,ft,ut,ct;k&1&&s!==(s=E[10](E[16]))&&_(t,"d",s),k&4&&_(t,"stroke-width",E[2]),k&2&&_(t,"stroke",E[1]),k&16&&_(t,"stroke-opacity",E[4]),k&1&&a!==(a=((q=(Y=(S=E[16])==null?void 0:S.opts)==null?void 0:Y.label)!=null&&q.enabled?(ht=(at=(F=E[16])==null?void 0:F.opts)==null?void 0:at.label)==null?void 0:ht.value:"")+"")&&tt(i,a),k&128&&_(o,"startOffset",E[7]),k&1&&c!==(c=(ft=E[16])!=null&&ft.opts?(ct=(ut=E[16])==null?void 0:ut.opts)!=null&&ct.arrow?"\u27A4":"":"\u27A4")&&tt(v,c),k&256&&_(u,"startOffset",E[8]),k&8&&_(u,"fill",E[3]),k&64&&_(e,"stroke",E[6]),k&32&&_(e,"stroke-opacity",E[5])},d(E){E&&g(e)}}}function Et(n){let e,t=n[16]&&n[9]&&bt(n);return{c(){t&&t.c(),e=G()},l(s){t&&t.l(s),e=G()},m(s,r){t&&t.m(s,r),T(s,e,r)},p(s,r){s[16]&&s[9]?t?t.p(s,r):(t=bt(s),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},d(s){t&&t.d(s),s&&g(e)}}}function se(n){let e,t=n[9]&&kt(n);return{c(){t&&t.c(),e=G()},l(s){t&&t.l(s),e=G()},m(s,r){t&&t.m(s,r),T(s,e,r)},p(s,[r]){s[9]?t?t.p(s,r):(t=kt(s),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:_t,o:_t,d(s){t&&t.d(s),s&&g(e)}}}function ne(n,e,t){let{links:s}=e,{strokeColor:r="green"}=e,{strokeWidth:o=3}=e,{arrowColor:l="green"}=e,{strokeOpacity:a="0.5"}=e,{groupStrokeOpacity:i="0.1"}=e,{groupStrokeColor:h="white"}=e,{textStartOffset:u="40%"}=e,{arrowStartOffset:c="60%"}=e;const v=ie($t);let p,m,f,b,C;Yt(()=>{t(9,p=!0)});function y(d){let L=document.getElementById(d.source.id),O=document.getElementById(d.target.id);return m=(L==null?void 0:L.offsetLeft)+L.offsetWidth/2,f=(L==null?void 0:L.offsetTop)+L.offsetHeight/2,b=(O==null?void 0:O.offsetLeft)+O.offsetWidth/2,C=(O==null?void 0:O.offsetTop)+O.offsetHeight/2,v({source:[m,f],target:[b,C]})}return n.$$set=d=>{"links"in d&&t(0,s=d.links),"strokeColor"in d&&t(1,r=d.strokeColor),"strokeWidth"in d&&t(2,o=d.strokeWidth),"arrowColor"in d&&t(3,l=d.arrowColor),"strokeOpacity"in d&&t(4,a=d.strokeOpacity),"groupStrokeOpacity"in d&&t(5,i=d.groupStrokeOpacity),"groupStrokeColor"in d&&t(6,h=d.groupStrokeColor),"textStartOffset"in d&&t(7,u=d.textStartOffset),"arrowStartOffset"in d&&t(8,c=d.arrowStartOffset)},[s,r,o,l,a,i,h,u,c,p,y]}class re extends Q{constructor(e){super(),Z(this,e,ne,se,J,{links:0,strokeColor:1,strokeWidth:2,arrowColor:3,strokeOpacity:4,groupStrokeOpacity:5,groupStrokeColor:6,textStartOffset:7,arrowStartOffset:8})}}class z{constructor(e){this.id=-1,this.nativePointer=e,this.pageX=e.pageX,this.pageY=e.pageY,this.clientX=e.clientX,this.clientY=e.clientY,self.Touch&&e instanceof Touch?this.id=e.identifier:N(e)&&(this.id=e.pointerId)}getCoalesced(){if("getCoalescedEvents"in this.nativePointer){const e=this.nativePointer.getCoalescedEvents().map(t=>new z(t));if(e.length>0)return e}return[this]}}const N=n=>"pointerId"in n,$=n=>"changedTouches"in n,wt=()=>{};class oe{constructor(e,{start:t=()=>!0,move:s=wt,end:r=wt,rawUpdates:o=!1,avoidPointerEvents:l=!1,eventListenerOptions:a={capture:!1,passive:!1,once:!1}}={}){this._element=e,this.startPointers=[],this.currentPointers=[],this._excludeFromButtonsCheck=new Set,this._pointerStart=i=>{if(N(i)&&i.buttons===0)this._excludeFromButtonsCheck.add(i.pointerId);else if(!(i.buttons&1))return;const h=new z(i);this.currentPointers.some(u=>u.id===h.id)||!this._triggerPointerStart(h,i)||(N(i)?((i.target&&"setPointerCapture"in i.target?i.target:this._element).setPointerCapture(i.pointerId),this._element.addEventListener(this._rawUpdates?"pointerrawupdate":"pointermove",this._move,this._eventListenerOptions),this._element.addEventListener("pointerup",this._pointerEnd,this._eventListenerOptions),this._element.addEventListener("pointercancel",this._pointerEnd,this._eventListenerOptions)):(window.addEventListener("mousemove",this._move),window.addEventListener("mouseup",this._pointerEnd)))},this._touchStart=i=>{for(const h of Array.from(i.changedTouches))this._triggerPointerStart(new z(h),i)},this._move=i=>{if(!$(i)&&(!N(i)||!this._excludeFromButtonsCheck.has(i.pointerId))&&i.buttons===0){this._pointerEnd(i);return}const h=this.currentPointers.slice(),u=$(i)?Array.from(i.changedTouches).map(v=>new z(v)):[new z(i)],c=[];for(const v of u){const p=this.currentPointers.findIndex(m=>m.id===v.id);p!==-1&&(c.push(v),this.currentPointers[p]=v)}c.length!==0&&this._moveCallback(h,c,i)},this._triggerPointerEnd=(i,h)=>{if(!$(h)&&h.buttons&1)return!1;const u=this.currentPointers.findIndex(v=>v.id===i.id);if(u===-1)return!1;this.currentPointers.splice(u,1),this.startPointers.splice(u,1),this._excludeFromButtonsCheck.delete(i.id);const c=!(h.type==="mouseup"||h.type==="touchend"||h.type==="pointerup");return this._endCallback(i,h,c),!0},this._pointerEnd=i=>{if(!!this._triggerPointerEnd(new z(i),i))if(N(i)){if(this.currentPointers.length)return;this._element.removeEventListener(this._rawUpdates?"pointerrawupdate":"pointermove",this._move),this._element.removeEventListener("pointerup",this._pointerEnd),this._element.removeEventListener("pointercancel",this._pointerEnd)}else window.removeEventListener("mousemove",this._move),window.removeEventListener("mouseup",this._pointerEnd)},this._touchEnd=i=>{for(const h of Array.from(i.changedTouches))this._triggerPointerEnd(new z(h),i)},this._startCallback=t,this._moveCallback=s,this._endCallback=r,this._rawUpdates=o&&"onpointerrawupdate"in window,this._eventListenerOptions=a,self.PointerEvent&&!l?this._element.addEventListener("pointerdown",this._pointerStart,this._eventListenerOptions):(this._element.addEventListener("mousedown",this._pointerStart,this._eventListenerOptions),this._element.addEventListener("touchstart",this._touchStart,this._eventListenerOptions),this._element.addEventListener("touchmove",this._move,this._eventListenerOptions),this._element.addEventListener("touchend",this._touchEnd,this._eventListenerOptions),this._element.addEventListener("touchcancel",this._touchEnd,this._eventListenerOptions))}stop(){this._element.removeEventListener("pointerdown",this._pointerStart),this._element.removeEventListener("mousedown",this._pointerStart),this._element.removeEventListener("touchstart",this._touchStart),this._element.removeEventListener("touchmove",this._move),this._element.removeEventListener("touchend",this._touchEnd),this._element.removeEventListener("touchcancel",this._touchEnd),this._element.removeEventListener(this._rawUpdates?"pointerrawupdate":"pointermove",this._move),this._element.removeEventListener("pointerup",this._pointerEnd),this._element.removeEventListener("pointercancel",this._pointerEnd),window.removeEventListener("mousemove",this._move),window.removeEventListener("mouseup",this._pointerEnd)}_triggerPointerStart(e,t){return this._startCallback(e,t)?(this.currentPointers.push(e),this.startPointers.push(e),!0):!1}}let le=(n=21)=>crypto.getRandomValues(new Uint8Array(n)).reduce((e,t)=>(t&=63,t<36?e+=t.toString(36):t<62?e+=(t-26).toString(36).toUpperCase():t>62?e+="-":e+="_",e),"");const ae=n=>({}),yt=n=>({directive:n[6]});function Lt(n){let e,t,s;function r(l){n[9](l)}let o={left:n[4],top:n[5],id:K};return n[3]!==void 0&&(o.marker=n[3]),e=new Kt({props:o}),x.push(()=>Vt(e,"marker",r)),{c(){nt(e.$$.fragment)},l(l){rt(e.$$.fragment,l)},m(l,a){ot(e,l,a),s=!0},p(l,a){const i={};a&16&&(i.left=l[4]),a&32&&(i.top=l[5]),!t&&a&8&&(t=!0,i.marker=l[3],Xt(()=>t=!1)),e.$set(i)},i(l){s||(I(e.$$.fragment,l),s=!0)},o(l){D(e.$$.fragment,l),s=!1},d(l){lt(e,l)}}}function Pt(n){let e;const t=n[8].default,s=It(t,n,n[7],yt);return{c(){s&&s.c()},l(r){s&&s.l(r)},m(r,o){s&&s.m(r,o),e=!0},p(r,o){s&&s.p&&(!e||o&128)&&Mt(s,t,r,r[7],e?Dt(t,r[7],o,ae):At(r[7]),yt)},i(r){e||(I(s,r),e=!0)},o(r){D(s,r),e=!1},d(r){s&&s.d(r)}}}function he(n){let e,t,s,r,o,l,a,i,h,u,c,v,p=n[2]&&Lt(n),m=n[1]&&Pt(n);return c=new re({props:{links:n[0].links}}),{c(){e=M("div"),t=M("a"),s=H("by @DougAnderson444"),r=W(),o=M("div"),l=M("div"),a=H("Directive is available within the slot as a slot prop"),i=W(),p&&p.c(),h=W(),m&&m.c(),u=W(),nt(c.$$.fragment),this.h()},l(f){e=A(f,"DIV",{class:!0});var b=P(e);t=A(b,"A",{href:!0,class:!0});var C=P(t);s=R(C,"by @DougAnderson444"),C.forEach(g),b.forEach(g),r=U(f),o=A(f,"DIV",{"data-dropzone":!0,class:!0});var y=P(o);l=A(y,"DIV",{class:!0});var d=P(l);a=R(d,"Directive is available within the slot as a slot prop"),d.forEach(g),i=U(y),p&&p.l(y),h=U(y),m&&m.l(y),u=U(y),rt(c.$$.fragment,y),y.forEach(g),this.h()},h(){_(t,"href","https://twitter.com/DougAnderson444"),_(t,"class","font-bold m-2 underline"),_(e,"class","my-2 p-2 bg-blue-100 rounded-lg w-fit"),_(l,"class","text-black font-bold"),_(o,"data-dropzone","true"),_(o,"class","relative border-dashed border-2 border-sky-500 rounded-lg bg-slate-100 m-4 p-4")},m(f,b){T(f,e,b),w(e,t),w(t,s),T(f,r,b),T(f,o,b),w(o,l),w(l,a),w(o,i),p&&p.m(o,null),w(o,h),m&&m.m(o,null),w(o,u),ot(c,o,null),n[10](o),v=!0},p(f,[b]){f[2]?p?(p.p(f,b),b&4&&I(p,1)):(p=Lt(f),p.c(),I(p,1),p.m(o,h)):p&&(pt(),D(p,1,1,()=>{p=null}),mt()),f[1]?m?(m.p(f,b),b&2&&I(m,1)):(m=Pt(f),m.c(),I(m,1),m.m(o,u)):m&&(pt(),D(m,1,1,()=>{m=null}),mt());const C={};b&1&&(C.links=f[0].links),c.$set(C)},i(f){v||(I(p),I(m),I(c.$$.fragment,f),v=!0)},o(f){D(p),D(m),D(c.$$.fragment,f),v=!1},d(f){f&&g(e),f&&g(r),f&&g(o),p&&p.d(),m&&m.d(),lt(c),n[10](null)}}}const K="marker";function fe(n,e,t){let{$$slots:s={},$$scope:r}=e,{data:o}=e,l,a,i,h=0,u=0;function c(f,b){b.stopPropagation(),t(4,h=f.clientX-l.offsetLeft),t(5,u=f.clientY-l.offsetTop)}function v(f,b){f.id||(f.id=le()),f.dataset.dropzone||(f.dataset.dropzone=!0);const C={source:{id:f.id},target:{id:K}};let y=new oe(f,{start(d,L){return y.currentPointers.length===1?!1:(t(2,a=!0),c(d,L),!0)},move(d,L,O){c(y.currentPointers[0],O),o.links.find(k=>k.source.id==f.id&&k.target.id==K)==null?t(0,o.links=[...o.links,C],o):t(0,o)},end:(d,L,O)=>{t(3,i.style.display="none",i),t(2,a=!1);let k=document.elementFromPoint(d.clientX,d.clientY).closest("[data-dropzone]");console.log({zone:k}),t(0,o.links=o.links.map(S=>S.source.id==f.id&&S.target.id==K?null:S).filter(S=>S),o),!(!k||!(k!=null&&k.id))&&t(0,o.links=[...o.links,{source:{id:f.id},target:{id:k.id}}],o)},avoidPointerEvents:!0,eventListenerOptions:{capture:!0,passive:!1}});return{update(d){},destroy(){}}}function p(f){i=f,t(3,i)}function m(f){x[f?"unshift":"push"](()=>{l=f,t(1,l)})}return n.$$set=f=>{"data"in f&&t(0,o=f.data),"$$scope"in f&&t(7,r=f.$$scope)},[o,l,a,i,h,u,v,r,s,p,m]}class ue extends Q{constructor(e){super(),Z(this,e,fe,he,J,{data:0})}}function Ct(n,e,t){const s=n.slice();return s[5]=e[t][0],s[6]=e[t][1],s}function Ot(n,e,t){const s=n.slice();return s[9]=e[t],s}function St(n,e){let t,s=e[9].value+"",r,o,l;return{key:n,first:null,c(){t=M("div"),r=H(s),this.h()},l(a){t=A(a,"DIV",{class:!0});var i=P(t);r=R(i,s),i.forEach(g),this.h()},h(){_(t,"class","block m-2 cursor-pointer select-none"),this.first=t},m(a,i){T(a,t,i),w(t,r),o||(l=Ft(e[4].call(null,t)),o=!0)},p(a,i){e=a,i&1&&s!==(s=e[9].value+"")&&tt(r,s)},d(a){a&&g(t),o=!1,l()}}}function Tt(n){let e,t=[],s=new Map,r;function o(...i){return n[2](n[5],...i)}let l=n[0].nodes.filter(o);const a=i=>i[9].id;for(let i=0;i<l.length;i+=1){let h=Ot(n,l,i),u=a(h);s.set(u,t[i]=St(u,h))}return{c(){e=M("div");for(let i=0;i<t.length;i+=1)t[i].c();r=W(),this.h()},l(i){e=A(i,"DIV",{class:!0});var h=P(e);for(let u=0;u<t.length;u+=1)t[u].l(h);r=U(h),h.forEach(g),this.h()},h(){_(e,"class","flex flex-col border rounded-lg m-4 p-4")},m(i,h){T(i,e,h);for(let u=0;u<t.length;u+=1)t[u].m(e,null);w(e,r)},p(i,h){n=i,h&3&&(l=n[0].nodes.filter(o),t=qt(t,h,a,1,n,l,s,e,Nt,St,r,Ot))},d(i){i&&g(e);for(let h=0;h<t.length;h+=1)t[h].d()}}}function ce(n){let e,t=[...Object.entries(n[1])],s=[];for(let r=0;r<t.length;r+=1)s[r]=Tt(Ct(n,t,r));return{c(){e=M("div");for(let r=0;r<s.length;r+=1)s[r].c();this.h()},l(r){e=A(r,"DIV",{class:!0});var o=P(e);for(let l=0;l<s.length;l+=1)s[l].l(o);o.forEach(g),this.h()},h(){_(e,"class","flex flex-row")},m(r,o){T(r,e,o);for(let l=0;l<s.length;l+=1)s[l].m(e,null)},p(r,o){if(o&3){t=[...Object.entries(r[1])];let l;for(l=0;l<t.length;l+=1){const a=Ct(r,t,l);s[l]?s[l].p(a,o):(s[l]=Tt(a),s[l].c(),s[l].m(e,null))}for(;l<s.length;l+=1)s[l].d(1);s.length=t.length}},d(r){r&&g(e),zt(s,r)}}}function _e(n){let e,t,s,r,o;function l(i){n[3](i)}let a={$$slots:{default:[ce,({directive:i})=>({4:i}),({directive:i})=>i?16:0]},$$scope:{ctx:n}};return n[0]!==void 0&&(a.data=n[0]),s=new ue({props:a}),x.push(()=>Vt(s,"data",l)),{c(){e=M("link"),t=W(),nt(s.$$.fragment),this.h()},l(i){const h=Bt('[data-svelte="svelte-18a4486"]',document.head);e=A(h,"LINK",{rel:!0,href:!0}),h.forEach(g),t=U(i),rt(s.$$.fragment,i),this.h()},h(){_(e,"rel","stylesheet"),_(e,"href","https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.3.5/tailwind.min.css")},m(i,h){w(document.head,e),T(i,t,h),ot(s,i,h),o=!0},p(i,[h]){const u={};h&4097&&(u.$$scope={dirty:h,ctx:i}),!r&&h&1&&(r=!0,u.data=i[0],Xt(()=>r=!1)),s.$set(u)},i(i){o||(I(s.$$.fragment,i),o=!0)},o(i){D(s.$$.fragment,i),o=!1},d(i){g(e),i&&g(t),lt(s,i)}}}function de(n,e,t){let s={emojii:"emojii",description:"description"},r={nodes:[{id:1,type:s.emojii,value:"\u{1F431}"},{id:2,type:s.emojii,value:"\u{1F984}"},{id:3,type:s.emojii,value:"\u{1F410}"},{id:4,type:s.description,value:"GOAT"},{id:5,type:s.description,value:"Cat"},{id:6,type:s.description,value:"Unicorn"}],links:[]};const o=(a,i)=>i.type==a;function l(a){r=a,t(0,r)}return[r,s,o,l]}class me extends Q{constructor(e){super(),Z(this,e,de,_e,J,{})}}export{me as default};
