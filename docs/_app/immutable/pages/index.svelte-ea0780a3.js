import{S as he,i as ce,s as de,F as ve,l as C,m as D,p as O,h as m,q as c,r as me,K as mt,b as M,L as gt,G as ke,H as be,I as Ee,f as j,t as R,M as ue,n as oe,e as De,o as St,N as ie,O as re,P as vt,u as U,a as X,v as Y,c as H,Q as Pe,J as k,w as He,D as Lt,x as $,y as ee,z as te,R as q,g as $e,d as et,A as Pt,B as Ot,C as se,T as je,U as Be,V as kt,W as bt,X as Ct,Y as fe,Z as Ne,_ as Dt,$ as It}from"../chunks/index-5e2c9f62.js";function Tt(s){let e;return{c(){e=C("div"),this.h()},l(t){e=D(t,"DIV",{class:!0}),O(e).forEach(m),this.h()},h(){c(e,"class","h-16 w-16 rounded-full bg-green-500 shadow-xl z-20 select-none opacity-50")},m(t,n){M(t,e,n)},p:oe,d(t){t&&m(e)}}}function At(s){let e,t,n;const r=s[9].default,o=ve(r,s,s[8],null),l=o||Tt();return{c(){e=C("div"),l&&l.c(),this.h()},l(a){e=D(a,"DIV",{id:!0,class:!0,style:!0});var i=O(e);l&&l.l(i),i.forEach(m),this.h()},h(){c(e,"id",s[1]),c(e,"class","absolute"),me(e,"left",s[5]+"px"),me(e,"top",s[4]+"px"),mt(()=>s[11].call(e))},m(a,i){M(a,e,i),l&&l.m(e,null),s[10](e),t=gt(e,s[11].bind(e)),n=!0},p(a,[i]){o&&o.p&&(!n||i&256)&&ke(o,r,a,a[8],n?Ee(r,a[8],i,null):be(a[8]),null),(!n||i&2)&&c(e,"id",a[1]),(!n||i&32)&&me(e,"left",a[5]+"px"),(!n||i&16)&&me(e,"top",a[4]+"px")},i(a){n||(j(l,a),n=!0)},o(a){R(l,a),n=!1},d(a){a&&m(e),l&&l.d(a),s[10](null),t()}}}function zt(s,e,t){let n,r,{$$slots:o={},$$scope:l}=e,{marker:a}=e,{id:i}=e,{left:u}=e,{top:d}=e,f,h;function y(E){ue[E?"unshift":"push"](()=>{a=E,t(0,a)})}function L(){f=this.offsetWidth,h=this.offsetHeight,t(2,f),t(3,h)}return s.$$set=E=>{"marker"in E&&t(0,a=E.marker),"id"in E&&t(1,i=E.id),"left"in E&&t(6,u=E.left),"top"in E&&t(7,d=E.top),"$$scope"in E&&t(8,l=E.$$scope)},s.$$.update=()=>{s.$$.dirty&68&&t(5,n=u-f/2),s.$$.dirty&136&&t(4,r=d-h/2)},[a,i,f,h,r,n,u,d,l,o,y,L]}class Vt extends he{constructor(e){super(),ce(this,e,zt,At,de,{marker:0,id:1,left:6,top:7})}}const Ue=Math.PI,Xe=2*Ue,le=1e-6,Mt=Xe-le;function Ye(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function Et(){return new Ye}Ye.prototype=Et.prototype={constructor:Ye,moveTo:function(s,e){this._+="M"+(this._x0=this._x1=+s)+","+(this._y0=this._y1=+e)},closePath:function(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(s,e){this._+="L"+(this._x1=+s)+","+(this._y1=+e)},quadraticCurveTo:function(s,e,t,n){this._+="Q"+ +s+","+ +e+","+(this._x1=+t)+","+(this._y1=+n)},bezierCurveTo:function(s,e,t,n,r,o){this._+="C"+ +s+","+ +e+","+ +t+","+ +n+","+(this._x1=+r)+","+(this._y1=+o)},arcTo:function(s,e,t,n,r){s=+s,e=+e,t=+t,n=+n,r=+r;var o=this._x1,l=this._y1,a=t-s,i=n-e,u=o-s,d=l-e,f=u*u+d*d;if(r<0)throw new Error("negative radius: "+r);if(this._x1===null)this._+="M"+(this._x1=s)+","+(this._y1=e);else if(f>le)if(!(Math.abs(d*a-i*u)>le)||!r)this._+="L"+(this._x1=s)+","+(this._y1=e);else{var h=t-o,y=n-l,L=a*a+i*i,E=h*h+y*y,b=Math.sqrt(L),P=Math.sqrt(f),v=r*Math.tan((Ue-Math.acos((L+f-E)/(2*b*P)))/2),A=v/P,T=v/b;Math.abs(A-1)>le&&(this._+="L"+(s+A*u)+","+(e+A*d)),this._+="A"+r+","+r+",0,0,"+ +(d*h>u*y)+","+(this._x1=s+T*a)+","+(this._y1=e+T*i)}},arc:function(s,e,t,n,r,o){s=+s,e=+e,t=+t,o=!!o;var l=t*Math.cos(n),a=t*Math.sin(n),i=s+l,u=e+a,d=1^o,f=o?n-r:r-n;if(t<0)throw new Error("negative radius: "+t);this._x1===null?this._+="M"+i+","+u:(Math.abs(this._x1-i)>le||Math.abs(this._y1-u)>le)&&(this._+="L"+i+","+u),t&&(f<0&&(f=f%Xe+Xe),f>Mt?this._+="A"+t+","+t+",0,1,"+d+","+(s-l)+","+(e-a)+"A"+t+","+t+",0,1,"+d+","+(this._x1=i)+","+(this._y1=u):f>le&&(this._+="A"+t+","+t+",0,"+ +(f>=Ue)+","+d+","+(this._x1=s+t*Math.cos(r))+","+(this._y1=e+t*Math.sin(r))))},rect:function(s,e,t,n){this._+="M"+(this._x0=this._x1=+s)+","+(this._y0=this._y1=+e)+"h"+ +t+"v"+ +n+"h"+-t+"Z"},toString:function(){return this._}};function tt(s){return function(){return s}}var Nt=Array.prototype.slice;function Wt(s){return s[0]}function jt(s){return s[1]}class Bt{constructor(e,t){this._context=e,this._x=t}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(e,t){switch(e=+e,t=+t,this._point){case 0:{this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+e)/2,this._y0,this._x0,t,e,t):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+t)/2,e,this._y0,e,t);break}}this._x0=e,this._y0=t}}function Ut(s){return new Bt(s,!0)}function Xt(s){return s.source}function Yt(s){return s.target}function Ht(s){let e=Xt,t=Yt,n=Wt,r=jt,o=null,l=null;function a(){let i;const u=Nt.call(arguments),d=e.apply(this,u),f=t.apply(this,u);if(o==null&&(l=s(i=Et())),l.lineStart(),u[0]=d,l.point(+n.apply(this,u),+r.apply(this,u)),u[0]=f,l.point(+n.apply(this,u),+r.apply(this,u)),l.lineEnd(),i)return l=null,i+""||null}return a.source=function(i){return arguments.length?(e=i,a):e},a.target=function(i){return arguments.length?(t=i,a):t},a.x=function(i){return arguments.length?(n=typeof i=="function"?i:tt(+i),a):n},a.y=function(i){return arguments.length?(r=typeof i=="function"?i:tt(+i),a):r},a.context=function(i){return arguments.length?(i==null?o=l=null:l=s(o=i),a):o},a}function st(s,e,t){const n=s.slice();return n[18]=e[t],n[20]=t,n}function nt(s){let e,t=s[0],n=[];for(let r=0;r<t.length;r+=1)n[r]=rt(st(s,t,r));return{c(){e=ie("svg");for(let r=0;r<n.length;r+=1)n[r].c();this.h()},l(r){e=re(r,"svg",{style:!0,class:!0});var o=O(e);for(let l=0;l<n.length;l+=1)n[l].l(o);o.forEach(m),this.h()},h(){me(e,"pointer-events","none"),c(e,"class","svelte-1bj7yo6")},m(r,o){M(r,e,o);for(let l=0;l<n.length;l+=1)n[l].m(e,null)},p(r,o){if(o&2047){t=r[0];let l;for(l=0;l<t.length;l+=1){const a=st(r,t,l);n[l]?n[l].p(a,o):(n[l]=rt(a),n[l].c(),n[l].m(e,null))}for(;l<n.length;l+=1)n[l].d(1);n.length=t.length}},d(r){r&&m(e),vt(n,r)}}}function it(s){var P,v,A,T,g,p;let e,t,n,r,o,l,a,i=((A=(v=(P=s[18])==null?void 0:P.opts)==null?void 0:v.label)!=null&&A.enabled?(p=(g=(T=s[18])==null?void 0:T.opts)==null?void 0:g.label)==null?void 0:p.value:"")+"",u,d,f,h,y,L,E,b;return{c(){e=ie("g"),t=ie("path"),o=ie("text"),l=ie("textPath"),a=ie("tspan"),u=U(i),d=X(),y=ie("textPath"),L=U("\u27A4"),this.h()},l(_){e=re(_,"g",{stroke:!0,"stroke-opacity":!0});var w=O(e);t=re(w,"path",{d:!0,id:!0,"stroke-width":!0,stroke:!0,fill:!0,"stroke-linecap":!0,"stroke-opacity":!0}),O(t).forEach(m),o=re(w,"text",{class:!0});var V=O(o);l=re(V,"textPath",{"xlink:href":!0,startOffset:!0});var I=O(l);a=re(I,"tspan",{fill:!0,class:!0});var z=O(a);u=Y(z,i),z.forEach(m),d=H(I),I.forEach(m),y=re(V,"textPath",{"xlink:href":!0,startOffset:!0,fill:!0,opacity:!0});var N=O(y);L=Y(N,"\u27A4"),N.forEach(m),V.forEach(m),w.forEach(m),this.h()},h(){c(t,"d",n=s[10](s[18])),c(t,"id",r=s[18].id),c(t,"stroke-width",s[2]),c(t,"stroke",s[1]),c(t,"fill","none"),c(t,"stroke-linecap","round"),c(t,"stroke-opacity",s[4]),c(a,"fill","black"),c(a,"class","svelte-1bj7yo6"),Pe(l,"xlink:href",f="#"+s[18].id),c(l,"startOffset",h=s[7]+"%"),Pe(y,"xlink:href",E="#"+s[18].id),c(y,"startOffset",s[8]),c(y,"fill",s[3]),c(y,"opacity",b=s[4]*1.3),c(o,"class","svelte-1bj7yo6"),c(e,"stroke",s[6]),c(e,"stroke-opacity",s[5])},m(_,w){M(_,e,w),k(e,t),k(e,o),k(o,l),k(l,a),k(a,u),k(l,d),k(o,y),k(y,L)},p(_,w){var V,I,z,N,W,Z;w&1&&n!==(n=_[10](_[18]))&&c(t,"d",n),w&1&&r!==(r=_[18].id)&&c(t,"id",r),w&4&&c(t,"stroke-width",_[2]),w&2&&c(t,"stroke",_[1]),w&16&&c(t,"stroke-opacity",_[4]),w&1&&i!==(i=((z=(I=(V=_[18])==null?void 0:V.opts)==null?void 0:I.label)!=null&&z.enabled?(Z=(W=(N=_[18])==null?void 0:N.opts)==null?void 0:W.label)==null?void 0:Z.value:"")+"")&&He(u,i),w&1&&f!==(f="#"+_[18].id)&&Pe(l,"xlink:href",f),w&128&&h!==(h=_[7]+"%")&&c(l,"startOffset",h),w&1&&E!==(E="#"+_[18].id)&&Pe(y,"xlink:href",E),w&256&&c(y,"startOffset",_[8]),w&8&&c(y,"fill",_[3]),w&16&&b!==(b=_[4]*1.3)&&c(y,"opacity",b),w&64&&c(e,"stroke",_[6]),w&32&&c(e,"stroke-opacity",_[5])},d(_){_&&m(e)}}}function rt(s){let e,t=s[18]&&s[9]&&it(s);return{c(){t&&t.c(),e=De()},l(n){t&&t.l(n),e=De()},m(n,r){t&&t.m(n,r),M(n,e,r)},p(n,r){n[18]&&n[9]?t?t.p(n,r):(t=it(n),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},d(n){t&&t.d(n),n&&m(e)}}}function Rt(s){let e,t=s[9]&&nt(s);return{c(){t&&t.c(),e=De()},l(n){t&&t.l(n),e=De()},m(n,r){t&&t.m(n,r),M(n,e,r)},p(n,[r]){n[9]?t?t.p(n,r):(t=nt(n),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:oe,o:oe,d(n){t&&t.d(n),n&&m(e)}}}function qt(s,e,t){let{links:n}=e,{canvas:r}=e,{strokeColor:o="green"}=e,{strokeWidth:l=18}=e,{arrowColor:a="green"}=e,{strokeOpacity:i="0.3"}=e,{groupStrokeOpacity:u="0.1"}=e,{groupStrokeColor:d="white"}=e,{textStartOffset:f=40}=e,{arrowStartOffset:h="60%"}=e;const y=Ht(Ut);let L,E,b,P,v;St(()=>{t(9,L=!0)});function A(g){if(g==r)return{x:g.offsetLeft,y:g.offsetTop};let p=g.getBoundingClientRect().top,_=r.getBoundingClientRect().top,w=p-_,V=g.getBoundingClientRect().left,I=r.getBoundingClientRect().left;return{x:V-I,y:w}}function T(g){let p=document.getElementById(g.source.id),_=document.getElementById(g.target.id);const{x:w,y:V}=A(p),{x:I,y:z}=A(_);return E=w+p.offsetWidth/2-3,b=V+p.offsetHeight/2-3,P=I+_.offsetWidth/2-3,v=z+_.offsetHeight/2-3,y({source:[E,b],target:[P,v]})}return s.$$set=g=>{"links"in g&&t(0,n=g.links),"canvas"in g&&t(11,r=g.canvas),"strokeColor"in g&&t(1,o=g.strokeColor),"strokeWidth"in g&&t(2,l=g.strokeWidth),"arrowColor"in g&&t(3,a=g.arrowColor),"strokeOpacity"in g&&t(4,i=g.strokeOpacity),"groupStrokeOpacity"in g&&t(5,u=g.groupStrokeOpacity),"groupStrokeColor"in g&&t(6,d=g.groupStrokeColor),"textStartOffset"in g&&t(7,f=g.textStartOffset),"arrowStartOffset"in g&&t(8,h=g.arrowStartOffset)},[n,o,l,a,i,u,d,f,h,L,T,r]}class Ft extends he{constructor(e){super(),ce(this,e,qt,Rt,de,{links:0,canvas:11,strokeColor:1,strokeWidth:2,arrowColor:3,strokeOpacity:4,groupStrokeOpacity:5,groupStrokeColor:6,textStartOffset:7,arrowStartOffset:8})}}class x{constructor(e){this.id=-1,this.nativePointer=e,this.pageX=e.pageX,this.pageY=e.pageY,this.clientX=e.clientX,this.clientY=e.clientY,self.Touch&&e instanceof Touch?this.id=e.identifier:ge(e)&&(this.id=e.pointerId)}getCoalesced(){if("getCoalescedEvents"in this.nativePointer){const e=this.nativePointer.getCoalescedEvents().map(t=>new x(t));if(e.length>0)return e}return[this]}}const ge=s=>"pointerId"in s,We=s=>"changedTouches"in s,lt=()=>{};class Jt{constructor(e,{start:t=()=>!0,move:n=lt,end:r=lt,rawUpdates:o=!1,avoidPointerEvents:l=!1,eventListenerOptions:a={capture:!1,passive:!1,once:!1}}={}){this._element=e,this.startPointers=[],this.currentPointers=[],this._excludeFromButtonsCheck=new Set,this._pointerStart=i=>{if(ge(i)&&i.buttons===0)this._excludeFromButtonsCheck.add(i.pointerId);else if(!(i.buttons&1))return;const u=new x(i);this.currentPointers.some(d=>d.id===u.id)||!this._triggerPointerStart(u,i)||(ge(i)?((i.target&&"setPointerCapture"in i.target?i.target:this._element).setPointerCapture(i.pointerId),this._element.addEventListener(this._rawUpdates?"pointerrawupdate":"pointermove",this._move,this._eventListenerOptions),this._element.addEventListener("pointerup",this._pointerEnd,this._eventListenerOptions),this._element.addEventListener("pointercancel",this._pointerEnd,this._eventListenerOptions)):(window.addEventListener("mousemove",this._move),window.addEventListener("mouseup",this._pointerEnd)))},this._touchStart=i=>{for(const u of Array.from(i.changedTouches))this._triggerPointerStart(new x(u),i)},this._move=i=>{if(!We(i)&&(!ge(i)||!this._excludeFromButtonsCheck.has(i.pointerId))&&i.buttons===0){this._pointerEnd(i);return}const u=this.currentPointers.slice(),d=We(i)?Array.from(i.changedTouches).map(h=>new x(h)):[new x(i)],f=[];for(const h of d){const y=this.currentPointers.findIndex(L=>L.id===h.id);y!==-1&&(f.push(h),this.currentPointers[y]=h)}f.length!==0&&this._moveCallback(u,f,i)},this._triggerPointerEnd=(i,u)=>{if(!We(u)&&u.buttons&1)return!1;const d=this.currentPointers.findIndex(h=>h.id===i.id);if(d===-1)return!1;this.currentPointers.splice(d,1),this.startPointers.splice(d,1),this._excludeFromButtonsCheck.delete(i.id);const f=!(u.type==="mouseup"||u.type==="touchend"||u.type==="pointerup");return this._endCallback(i,u,f),!0},this._pointerEnd=i=>{if(!!this._triggerPointerEnd(new x(i),i))if(ge(i)){if(this.currentPointers.length)return;this._element.removeEventListener(this._rawUpdates?"pointerrawupdate":"pointermove",this._move),this._element.removeEventListener("pointerup",this._pointerEnd),this._element.removeEventListener("pointercancel",this._pointerEnd)}else window.removeEventListener("mousemove",this._move),window.removeEventListener("mouseup",this._pointerEnd)},this._touchEnd=i=>{for(const u of Array.from(i.changedTouches))this._triggerPointerEnd(new x(u),i)},this._startCallback=t,this._moveCallback=n,this._endCallback=r,this._rawUpdates=o&&"onpointerrawupdate"in window,this._eventListenerOptions=a,self.PointerEvent&&!l?this._element.addEventListener("pointerdown",this._pointerStart,this._eventListenerOptions):(this._element.addEventListener("mousedown",this._pointerStart,this._eventListenerOptions),this._element.addEventListener("touchstart",this._touchStart,this._eventListenerOptions),this._element.addEventListener("touchmove",this._move,this._eventListenerOptions),this._element.addEventListener("touchend",this._touchEnd,this._eventListenerOptions),this._element.addEventListener("touchcancel",this._touchEnd,this._eventListenerOptions))}stop(){this._element.removeEventListener("pointerdown",this._pointerStart),this._element.removeEventListener("mousedown",this._pointerStart),this._element.removeEventListener("touchstart",this._touchStart),this._element.removeEventListener("touchmove",this._move),this._element.removeEventListener("touchend",this._touchEnd),this._element.removeEventListener("touchcancel",this._touchEnd),this._element.removeEventListener(this._rawUpdates?"pointerrawupdate":"pointermove",this._move),this._element.removeEventListener("pointerup",this._pointerEnd),this._element.removeEventListener("pointercancel",this._pointerEnd),window.removeEventListener("mousemove",this._move),window.removeEventListener("mouseup",this._pointerEnd)}_triggerPointerStart(e,t){return this._startCallback(e,t)?(this.currentPointers.push(e),this.startPointers.push(e),!0):!1}}let Kt=(s=21)=>crypto.getRandomValues(new Uint8Array(s)).reduce((e,t)=>(t&=63,t<36?e+=t.toString(36):t<62?e+=(t-26).toString(36).toUpperCase():t>62?e+="-":e+="_",e),"");const Zt=s=>({}),ot=s=>({connectable:s[7]}),Gt=s=>({}),at=s=>({connectable:s[7]});function ft(s){let e,t,n;function r(l){s[10](l)}let o={left:s[5],top:s[6],id:Ce,$$slots:{default:[xt]},$$scope:{ctx:s}};return s[4]!==void 0&&(o.marker=s[4]),e=new Vt({props:o}),ue.push(()=>je(e,"marker",r)),{c(){$(e.$$.fragment)},l(l){ee(e.$$.fragment,l)},m(l,a){te(e,l,a),n=!0},p(l,a){const i={};a&32&&(i.left=l[5]),a&64&&(i.top=l[6]),a&4096&&(i.$$scope={dirty:a,ctx:l}),!t&&a&16&&(t=!0,i.marker=l[4],Be(()=>t=!1)),e.$set(i)},i(l){n||(j(e.$$.fragment,l),n=!0)},o(l){R(e.$$.fragment,l),n=!1},d(l){se(e,l)}}}function Qt(s){let e;return{c(){e=C("div"),this.h()},l(t){e=D(t,"DIV",{class:!0}),O(e).forEach(m),this.h()},h(){c(e,"class","h-16 w-16 p-8 rounded-full bg-green-500 shadow-xl opacity-50 select-none border-[2em]")},m(t,n){M(t,e,n)},p:oe,d(t){t&&m(e)}}}function xt(s){let e;const t=s[8].marker,n=ve(t,s,s[12],at),r=n||Qt();return{c(){r&&r.c()},l(o){r&&r.l(o)},m(o,l){r&&r.m(o,l),e=!0},p(o,l){n&&n.p&&(!e||l&4096)&&ke(n,t,o,o[12],e?Ee(t,o[12],l,Gt):be(o[12]),at)},i(o){e||(j(r,o),e=!0)},o(o){R(r,o),e=!1},d(o){r&&r.d(o)}}}function ut(s){let e;const t=s[8].default,n=ve(t,s,s[12],ot);return{c(){n&&n.c()},l(r){n&&n.l(r)},m(r,o){n&&n.m(r,o),e=!0},p(r,o){n&&n.p&&(!e||o&4096)&&ke(n,t,r,r[12],e?Ee(t,r[12],o,Zt):be(r[12]),ot)},i(r){e||(j(n,r),e=!0)},o(r){R(n,r),e=!1},d(r){n&&n.d(r)}}}function $t(s){var E;let e,t,n,r,o,l,a,i,u,d,f=s[3]&&ft(s),h=s[2]&&ut(s);const y=[{links:s[0].links},{canvas:s[2]},(E=s[1])==null?void 0:E.links];let L={};for(let b=0;b<y.length;b+=1)L=Lt(L,y[b]);return a=new Ft({props:L}),{c(){e=C("div"),t=C("div"),n=U("Directive is available within the slot as a slot prop"),r=X(),f&&f.c(),o=X(),h&&h.c(),l=X(),$(a.$$.fragment),this.h()},l(b){e=D(b,"DIV",{class:!0});var P=O(e);t=D(P,"DIV",{class:!0});var v=O(t);n=Y(v,"Directive is available within the slot as a slot prop"),v.forEach(m),r=H(P),f&&f.l(P),o=H(P),h&&h.l(P),l=H(P),ee(a.$$.fragment,P),P.forEach(m),this.h()},h(){c(t,"class","text-black font-bold"),c(e,"class","relative border-dashed border-2 border-sky-500 rounded-lg bg-slate-100/10 m-4 p-4 z-50")},m(b,P){M(b,e,P),k(e,t),k(t,n),k(e,r),f&&f.m(e,null),k(e,o),h&&h.m(e,null),k(e,l),te(a,e,null),s[11](e),i=!0,u||(d=q(window,"resize",s[9]),u=!0)},p(b,[P]){var A;b[3]?f?(f.p(b,P),P&8&&j(f,1)):(f=ft(b),f.c(),j(f,1),f.m(e,o)):f&&($e(),R(f,1,1,()=>{f=null}),et()),b[2]?h?(h.p(b,P),P&4&&j(h,1)):(h=ut(b),h.c(),j(h,1),h.m(e,l)):h&&($e(),R(h,1,1,()=>{h=null}),et());const v=P&7?Pt(y,[P&1&&{links:b[0].links},P&4&&{canvas:b[2]},P&2&&Ot((A=b[1])==null?void 0:A.links)]):{};a.$set(v)},i(b){i||(j(f),j(h),j(a.$$.fragment,b),i=!0)},o(b){R(f),R(h),R(a.$$.fragment,b),i=!1},d(b){b&&m(e),f&&f.d(),h&&h.d(),se(a),s[11](null),u=!1,d()}}}const Ce="marker";function es(s,e,t){let{$$slots:n={},$$scope:r}=e,{data:o}=e,{opts:l={}}=e,a,i,u,d=0,f=0;const h=(v,A=!1)=>{const T=o.nodes.find(p=>p.id==v);if(!T||!T.value)return"";if(!A)return T.value+" to";const g=o.nodes.find(p=>p.id==A);return g?`${T.value} to ${g.value}`:T.value};function y(v,A){A.stopPropagation(),A.preventDefault(),t(5,d=v.pageX-a.offsetLeft),t(6,f=v.pageY-a.offsetTop)}function L(v,A){v.id||(v.id=Kt()),v.dataset.dropzone||(v.dataset.dropzone=!0);let T,g=new Jt(v,{start(p,_){return g.currentPointers.length===1?!1:(t(3,i=!0),y(p,_),!0)},move(p,_,w){y(g.currentPointers[0],w),T={id:v.id+"-to-",source:{id:v.id},target:{id:Ce},opts:{label:{enabled:!0,value:h(v.id)}}},o.links.find(I=>I.source.id==v.id&&I.target.id==Ce)==null?t(0,o.links=[...o.links,T],o):t(0,o)},end:(p,_,w)=>{t(4,u.style.display="none",u),t(3,i=!1);let I=document.elementFromPoint(p.clientX,p.clientY).closest("[data-dropzone]");t(0,o.links=o.links.map(z=>z.source.id==v.id&&z.target.id==Ce?null:z).filter(z=>z),o),!(!I||!(I!=null&&I.id))&&t(0,o.links=[...o.links,{id:v.id+"-to-"+I.id,source:{id:v.id},target:{id:I.id},opts:{label:{enabled:!0,value:h(v.id,I.id)}}}],o)},avoidPointerEvents:!0,eventListenerOptions:{capture:!0,passive:!1}});return{update(p){},destroy(){}}}const E=v=>{t(0,o)};function b(v){u=v,t(4,u)}function P(v){ue[v?"unshift":"push"](()=>{a=v,t(2,a)})}return s.$$set=v=>{"data"in v&&t(0,o=v.data),"opts"in v&&t(1,l=v.opts),"$$scope"in v&&t(12,r=v.$$scope)},[o,l,a,i,u,d,f,L,n,E,b,P,r]}class ts extends he{constructor(e){super(),ce(this,e,es,$t,de,{data:0,opts:1})}}function ss(s){let e;return{c(){e=C("div"),this.h()},l(t){e=D(t,"DIV",{class:!0}),O(e).forEach(m),this.h()},h(){c(e,"class","flex h-4 w-4 border-2 bg-blue-500 rounded-full border-blue-300 hover:ring hover:ring-blue-800")},m(t,n){M(t,e,n)},p:oe,d(t){t&&m(e)}}}function ns(s){let e,t,n,r,o,l,a;const i=s[12].default,u=ve(i,s,s[11],null),d=u||ss();return{c(){e=C("div"),d&&d.c(),this.h()},l(f){e=D(f,"DIV",{class:!0,style:!0});var h=O(e);d&&d.l(h),h.forEach(m),this.h()},h(){c(e,"class",t="flex absolute border-["+s[2]+"em] hover:border-red-500/50 "+(s[6]?" border-red-500/50 ":"")+" border-transparent rounded-full"),c(e,"style",n="top: "+s[9]+"px; "+(s[0]=="right"?`right: ${s[8]}px;`:`left: ${s[7]}px;`)),mt(()=>s[15].call(e))},m(f,h){M(f,e,h),d&&d.m(e,null),s[14](e),r=gt(e,s[15].bind(e)),o=!0,l||(a=[q(window,"resize",s[13]),kt(s[1].call(null,e)),q(e,"dragover",s[16]),q(e,"dragleave",s[17]),q(e,"focus",s[18]),q(e,"blur",s[19])],l=!0)},p(f,[h]){u&&u.p&&(!o||h&2048)&&ke(u,i,f,f[11],o?Ee(i,f[11],h,null):be(f[11]),null),(!o||h&68&&t!==(t="flex absolute border-["+f[2]+"em] hover:border-red-500/50 "+(f[6]?" border-red-500/50 ":"")+" border-transparent rounded-full"))&&c(e,"class",t),(!o||h&897&&n!==(n="top: "+f[9]+"px; "+(f[0]=="right"?`right: ${f[8]}px;`:`left: ${f[7]}px;`)))&&c(e,"style",n)},i(f){o||(j(d,f),o=!0)},o(f){R(d,f),o=!1},d(f){f&&m(e),d&&d.d(f),s[14](null),r(),l=!1,bt(a)}}}function is(s,e,t){let n,r,o,{$$slots:l={},$$scope:a}=e,{position:i="right"}=e,{connectable:u}=e,{zoneSize:d=2}=e,f,h,y,L,E;const b=_=>{t(9,n),t(10,L),t(4,h),t(3,f),t(7,o),t(5,y),t(8,r),t(5,y)};function P(_){ue[_?"unshift":"push"](()=>{f=_,t(3,f)})}function v(){y=this.offsetWidth,h=this.offsetHeight,t(5,y),t(4,h)}const A=_=>{t(6,E=!0)},T=_=>{t(6,E=!1)},g=_=>{t(6,E=!0)},p=_=>{t(6,E=!1)};return s.$$set=_=>{"position"in _&&t(0,i=_.position),"connectable"in _&&t(1,u=_.connectable),"zoneSize"in _&&t(2,d=_.zoneSize),"$$scope"in _&&t(11,a=_.$$scope)},s.$$.update=()=>{s.$$.dirty&8&&f&&(t(3,f.parentNode.style.position="relative",f),t(10,L=f.parentNode.offsetHeight)),s.$$.dirty&1040&&t(9,n=L&&h?L/2-h/2:0),s.$$.dirty&32&&t(8,r=y?-y/2:0),s.$$.dirty&32&&t(7,o=y?-y/2:0)},[i,u,d,f,h,y,E,o,r,n,L,a,l,b,P,v,A,T,g,p]}class Oe extends he{constructor(e){super(),ce(this,e,is,ns,de,{position:0,connectable:1,zoneSize:2})}}function rs(s){let e,t,n,r;const o=s[3].default,l=ve(o,s,s[2],null);return{c(){e=C("span"),t=C("span"),l&&l.c(),this.h()},l(a){e=D(a,"SPAN",{class:!0});var i=O(e);t=D(i,"SPAN",{class:!0});var u=O(t);l&&l.l(u),u.forEach(m),i.forEach(m),this.h()},h(){c(t,"class","relative pr-1"),c(e,"class",n=(s[0]=="pink"?ht:s[1])+" before:inline-block before:absolute before:-inset-1 before:-skew-y-3 relative inline-block")},m(a,i){M(a,e,i),k(e,t),l&&l.m(t,null),r=!0},p(a,[i]){l&&l.p&&(!r||i&4)&&ke(l,o,a,a[2],r?Ee(o,a[2],i,null):be(a[2]),null),(!r||i&1&&n!==(n=(a[0]=="pink"?ht:a[1])+" before:inline-block before:absolute before:-inset-1 before:-skew-y-3 relative inline-block"))&&c(e,"class",n)},i(a){r||(j(l,a),r=!0)},o(a){R(l,a),r=!1},d(a){a&&m(e),l&&l.d(a)}}}let ht="before:bg-pink-500 text-white";function ls(s,e,t){let{$$slots:n={},$$scope:r}=e,{color:o="pink"}=e,l="before:bg-green-500/50 text-black ";return s.$$set=a=>{"color"in a&&t(0,o=a.color),"$$scope"in a&&t(2,r=a.$$scope)},[o,l,r,n]}class os extends he{constructor(e){super(),ce(this,e,ls,rs,de,{color:0})}}function ct(s,e,t){const n=s.slice();return n[10]=e[t][0],n[11]=e[t][1],n[13]=t,n}function dt(s,e,t){const n=s.slice();return n[14]=e[t],n}function _t(s,e){let t,n=e[14].value+"",r,o,l,a;return{key:s,first:null,c(){t=C("div"),r=U(n),this.h()},l(i){t=D(i,"DIV",{class:!0,id:!0});var u=O(t);r=Y(u,n),u.forEach(m),this.h()},h(){var i,u;c(t,"class","block m-2 cursor-pointer select-none w-fit"),c(t,"id",o=(i=e[14])!=null&&i.id?(u=e[14])==null?void 0:u.id:null),this.first=t},m(i,u){M(i,t,u),k(t,r),l||(a=kt(e[9].call(null,t)),l=!0)},p(i,u){var d,f;e=i,u&1&&n!==(n=e[14].value+"")&&He(r,n),u&1&&o!==(o=(d=e[14])!=null&&d.id?(f=e[14])==null?void 0:f.id:null)&&c(t,"id",o)},d(i){i&&m(t),l=!1,a()}}}function pt(s){let e,t=[],n=new Map,r;function o(...i){return s[3](s[10],...i)}let l=s[0].nodes.filter(o);const a=i=>i[14].id;for(let i=0;i<l.length;i+=1){let u=dt(s,l,i),d=a(u);n.set(d,t[i]=_t(d,u))}return{c(){e=C("div");for(let i=0;i<t.length;i+=1)t[i].c();r=X(),this.h()},l(i){e=D(i,"DIV",{class:!0});var u=O(e);for(let d=0;d<t.length;d+=1)t[d].l(u);r=H(u),u.forEach(m),this.h()},h(){c(e,"class","flex flex-col border rounded-lg m-4 p-4")},m(i,u){M(i,e,u);for(let d=0;d<t.length;d+=1)t[d].m(e,null);k(e,r)},p(i,u){s=i,u&5&&(l=s[0].nodes.filter(o),t=Dt(t,u,a,1,s,l,n,e,It,_t,r,dt))},d(i){i&&m(e);for(let u=0;u<t.length;u+=1)t[u].d()}}}function as(s){let e;return{c(){e=U("custom")},l(t){e=Y(t,"custom")},m(t,n){M(t,e,n)},d(t){t&&m(e)}}}function fs(s){let e;return{c(){e=C("div"),this.h()},l(t){e=D(t,"DIV",{class:!0}),O(e).forEach(m),this.h()},h(){c(e,"class","h-4 w-4 bg-green-500 rounded-full border-4 border-black hover:ring hover:ring-green-800")},m(t,n){M(t,e,n)},p:oe,d(t){t&&m(e)}}}function us(s){let e,t,n,r,o,l,a,i,u,d,f,h,y,L,E,b,P,v,A,T=[...Object.entries(s[2])],g=[];for(let p=0;p<T.length;p+=1)g[p]=pt(ct(s,T,p));return l=new Oe({props:{position:"right",connectable:s[9]}}),i=new Oe({props:{position:"left",connectable:s[9]}}),h=new Oe({props:{position:"left",connectable:s[9]}}),b=new os({props:{$$slots:{default:[as]},$$scope:{ctx:s}}}),v=new Oe({props:{position:"left",connectable:s[9],$$slots:{default:[fs]},$$scope:{ctx:s}}}),{c(){e=C("div");for(let p=0;p<g.length;p+=1)g[p].c();t=X(),n=C("div"),r=C("div"),o=U(`Can we also have an external endpoint?
			`),$(l.$$.fragment),a=X(),$(i.$$.fragment),u=X(),d=C("div"),f=U(`No, libraries cannot do that. Just kidding.
			`),$(h.$$.fragment),y=X(),L=C("div"),E=U("Yes, pass the connectable directive to the component. They can even be "),$(b.$$.fragment),P=U(`,
			like this one.
			`),$(v.$$.fragment),this.h()},l(p){e=D(p,"DIV",{class:!0});var _=O(e);for(let N=0;N<g.length;N+=1)g[N].l(_);_.forEach(m),t=H(p),n=D(p,"DIV",{class:!0});var w=O(n);r=D(w,"DIV",{class:!0});var V=O(r);o=Y(V,`Can we also have an external endpoint?
			`),ee(l.$$.fragment,V),a=H(V),ee(i.$$.fragment,V),V.forEach(m),u=H(w),d=D(w,"DIV",{class:!0});var I=O(d);f=Y(I,`No, libraries cannot do that. Just kidding.
			`),ee(h.$$.fragment,I),I.forEach(m),y=H(w),L=D(w,"DIV",{class:!0});var z=O(L);E=Y(z,"Yes, pass the connectable directive to the component. They can even be "),ee(b.$$.fragment,z),P=Y(z,`,
			like this one.
			`),ee(v.$$.fragment,z),z.forEach(m),w.forEach(m),this.h()},h(){c(e,"class","flex flex-row justify-around "),c(r,"class","inline-flex m-2 p-4 border rounded-lg w-1/3 bg-amber-100"),c(d,"class","relative inline-flex m-2 p-4 border rounded-lg w-1/3 bg-red-300"),c(L,"class","relative flex-0 m-2 ml-auto p-4 border rounded-lg w-1/3 bg-green-300"),c(n,"class","flex flex-row flex-wrap border rounded-lg m-4 p-4 justify-between bg-neutral-50")},m(p,_){M(p,e,_);for(let w=0;w<g.length;w+=1)g[w].m(e,null);M(p,t,_),M(p,n,_),k(n,r),k(r,o),te(l,r,null),k(r,a),te(i,r,null),k(n,u),k(n,d),k(d,f),te(h,d,null),k(n,y),k(n,L),k(L,E),te(b,L,null),k(L,P),te(v,L,null),A=!0},p(p,_){if(_&5){T=[...Object.entries(p[2])];let W;for(W=0;W<T.length;W+=1){const Z=ct(p,T,W);g[W]?g[W].p(Z,_):(g[W]=pt(Z),g[W].c(),g[W].m(e,null))}for(;W<g.length;W+=1)g[W].d(1);g.length=T.length}const w={};_&512&&(w.connectable=p[9]),l.$set(w);const V={};_&512&&(V.connectable=p[9]),i.$set(V);const I={};_&512&&(I.connectable=p[9]),h.$set(I);const z={};_&131072&&(z.$$scope={dirty:_,ctx:p}),b.$set(z);const N={};_&512&&(N.connectable=p[9]),_&131072&&(N.$$scope={dirty:_,ctx:p}),v.$set(N)},i(p){A||(j(l.$$.fragment,p),j(i.$$.fragment,p),j(h.$$.fragment,p),j(b.$$.fragment,p),j(v.$$.fragment,p),A=!0)},o(p){R(l.$$.fragment,p),R(i.$$.fragment,p),R(h.$$.fragment,p),R(b.$$.fragment,p),R(v.$$.fragment,p),A=!1},d(p){p&&m(e),vt(g,p),p&&m(t),p&&m(n),se(l),se(i),se(h),se(b),se(v)}}}function hs(s){let e;return{c(){e=C("div"),this.h()},l(t){e=D(t,"DIV",{slot:!0,class:!0}),O(e).forEach(m),this.h()},h(){c(e,"slot","marker"),c(e,"class","h-16 w-16 p-8 rounded-full bg-pink-500 shadow-xl opacity-50 select-none border-[2em]")},m(t,n){M(t,e,n)},p:oe,d(t){t&&m(e)}}}function cs(s){let e,t,n,r,o,l,a,i,u,d,f,h,y,L,E,b,P,v,A,T,g,p,_,w,V,I,z,N,W,Z,F,Ie,ae,G,ne,Te,_e=s[1].links.textStartOffset+"",we,Ae,J,pe,ze,Re;function wt(S){s[4](S)}function yt(S){s[5](S)}let Ve={$$slots:{marker:[hs,({connectable:S})=>({9:S}),({connectable:S})=>S?512:0],default:[us,({connectable:S})=>({9:S}),({connectable:S})=>S?512:0]},$$scope:{ctx:s}};return s[0]!==void 0&&(Ve.data=s[0]),s[1]!==void 0&&(Ve.opts=s[1]),f=new ts({props:Ve}),ue.push(()=>je(f,"data",wt)),ue.push(()=>je(f,"opts",yt)),{c(){e=C("link"),t=X(),n=C("div"),r=U("by "),o=C("a"),l=U("@DougAnderson444"),a=X(),i=C("a"),u=U("https://github.com/DougAnderson444/svelte-plumb"),d=U(`

Match the picture to the words:

`),$(f.$$.fragment),L=X(),E=C("div"),b=C("div"),P=U("Control Panel"),v=X(),A=C("div"),T=C("label"),g=C("span"),p=U("Stroke Width"),_=X(),w=C("input"),V=X(),I=C("div"),z=C("label"),N=C("span"),W=U("Stroke Opacity"),Z=X(),F=C("input"),Ie=X(),ae=C("div"),G=C("label"),ne=C("span"),Te=U("Start Distance "),we=U(_e),Ae=X(),J=C("input"),this.h()},l(S){const B=Ct('[data-svelte="svelte-18a4486"]',document.head);e=D(B,"LINK",{rel:!0,href:!0}),B.forEach(m),t=H(S),n=D(S,"DIV",{class:!0});var K=O(n);r=Y(K,"by "),o=D(K,"A",{href:!0,class:!0});var qe=O(o);l=Y(qe,"@DougAnderson444"),qe.forEach(m),a=H(K),i=D(K,"A",{href:!0,class:!0});var Fe=O(i);u=Y(Fe,"https://github.com/DougAnderson444/svelte-plumb"),Fe.forEach(m),K.forEach(m),d=Y(S,`

Match the picture to the words:

`),ee(f.$$.fragment,S),L=H(S),E=D(S,"DIV",{class:!0});var Q=O(E);b=D(Q,"DIV",{class:!0});var Je=O(b);P=Y(Je,"Control Panel"),Je.forEach(m),v=H(Q),A=D(Q,"DIV",{class:!0});var Ke=O(A);T=D(Ke,"LABEL",{class:!0});var ye=O(T);g=D(ye,"SPAN",{class:!0});var Ze=O(g);p=Y(Ze,"Stroke Width"),Ze.forEach(m),_=H(ye),w=D(ye,"INPUT",{type:!0,min:!0,max:!0}),ye.forEach(m),Ke.forEach(m),V=H(Q),I=D(Q,"DIV",{class:!0});var Ge=O(I);z=D(Ge,"LABEL",{class:!0});var Se=O(z);N=D(Se,"SPAN",{class:!0});var Qe=O(N);W=Y(Qe,"Stroke Opacity"),Qe.forEach(m),Z=H(Se),F=D(Se,"INPUT",{type:!0,min:!0,max:!0,step:!0}),Se.forEach(m),Ge.forEach(m),Ie=H(Q),ae=D(Q,"DIV",{class:!0});var xe=O(ae);G=D(xe,"LABEL",{class:!0});var Le=O(G);ne=D(Le,"SPAN",{class:!0});var Me=O(ne);Te=Y(Me,"Start Distance "),we=Y(Me,_e),Me.forEach(m),Ae=H(Le),J=D(Le,"INPUT",{type:!0,min:!0,max:!0,step:!0}),Le.forEach(m),xe.forEach(m),Q.forEach(m),this.h()},h(){c(e,"rel","stylesheet"),c(e,"href","https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.3.5/tailwind.min.css"),c(o,"href","https://twitter.com/DougAnderson444"),c(o,"class","font-bold m-2 underline"),c(i,"href","https://twitter.com/DougAnderson444"),c(i,"class","font-bold m-2 underline"),c(n,"class","my-2 p-2 bg-blue-100 rounded-lg w-fit"),c(b,"class","text-lg font-bold underline"),c(g,"class","p-2"),c(w,"type","range"),c(w,"min","1"),c(w,"max","50"),c(T,"class",""),c(A,"class","my-4 p-4 bg-blue-200/50 rounded-lg shadow"),c(N,"class","p-2"),c(F,"type","range"),c(F,"min","0.1"),c(F,"max","1"),c(F,"step","0.1"),c(z,"class",""),c(I,"class","my-4 p-4 bg-blue-200/50 rounded-lg shadow"),c(ne,"class","p-2"),c(J,"type","range"),c(J,"min","0%"),c(J,"max","90%"),c(J,"step","5%"),c(G,"class",""),c(ae,"class","my-4 p-4 bg-blue-200/50 rounded-lg shadow"),c(E,"class","m-4 p-4 bg-slate-100 rounded-lg shadow-lg border")},m(S,B){k(document.head,e),M(S,t,B),M(S,n,B),k(n,r),k(n,o),k(o,l),k(n,a),k(n,i),k(i,u),M(S,d,B),te(f,S,B),M(S,L,B),M(S,E,B),k(E,b),k(b,P),k(E,v),k(E,A),k(A,T),k(T,g),k(g,p),k(T,_),k(T,w),fe(w,s[1].links.strokeWidth),k(E,V),k(E,I),k(I,z),k(z,N),k(N,W),k(z,Z),k(z,F),fe(F,s[1].links.strokeOpacity),k(E,Ie),k(E,ae),k(ae,G),k(G,ne),k(ne,Te),k(ne,we),k(G,Ae),k(G,J),fe(J,s[1].links.textStartOffset),pe=!0,ze||(Re=[q(w,"change",s[6]),q(w,"input",s[6]),q(F,"change",s[7]),q(F,"input",s[7]),q(J,"change",s[8]),q(J,"input",s[8])],ze=!0)},p(S,[B]){const K={};B&131585&&(K.$$scope={dirty:B,ctx:S}),!h&&B&1&&(h=!0,K.data=S[0],Be(()=>h=!1)),!y&&B&2&&(y=!0,K.opts=S[1],Be(()=>y=!1)),f.$set(K),B&2&&fe(w,S[1].links.strokeWidth),B&2&&fe(F,S[1].links.strokeOpacity),(!pe||B&2)&&_e!==(_e=S[1].links.textStartOffset+"")&&He(we,_e),B&2&&fe(J,S[1].links.textStartOffset)},i(S){pe||(j(f.$$.fragment,S),pe=!0)},o(S){R(f.$$.fragment,S),pe=!1},d(S){m(e),S&&m(t),S&&m(n),S&&m(d),se(f,S),S&&m(L),S&&m(E),ze=!1,bt(Re)}}}function ds(s,e,t){let n={emojii:"emojii",description:"description"},r={nodes:[{id:1,type:n.emojii,value:"\u{1F431}"},{id:2,type:n.emojii,value:"\u{1F984}"},{id:3,type:n.emojii,value:"\u{1F410}"},{id:4,type:n.description,value:"GOAT"},{id:5,type:n.description,value:"Cat"},{id:6,type:n.description,value:"Unicorn"}],links:[{id:"2-to-6",source:{id:"2"},target:{id:"6"},opts:{label:{enabled:!0,value:"\u{1F984} to Unicorn"}}}]},o={links:{strokeWidth:18,textStartOffset:40}};const l=(h,y)=>y.type==h;function a(h){r=h,t(0,r)}function i(h){o=h,t(1,o)}function u(){o.links.strokeWidth=Ne(this.value),t(1,o)}function d(){o.links.strokeOpacity=Ne(this.value),t(1,o)}function f(){o.links.textStartOffset=Ne(this.value),t(1,o)}return[r,o,n,l,a,i,u,d,f]}class ps extends he{constructor(e){super(),ce(this,e,ds,cs,de,{})}}export{ps as default};