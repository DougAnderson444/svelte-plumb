import{S as x,i as $,s as ee,F as Se,l as I,m as M,p as S,h as b,q as m,r as H,K as Te,b as T,J as O,L as De,G as Ie,H as Me,I as Ae,f as A,t as z,M as te,e as se,N as We,n as re,o as Xe,O as Ye,P as R,Q as U,R as ze,u as V,a as N,v as j,c as B,T as ne,w as ce,x as F,y as J,z as K,g as de,d as _e,C as Z,U as Ve,V as je,W as Ne,X as He,Y as Re,Z as Ue}from"../chunks/index-e287faae.js";function qe(n){let e,t,s,r;const a=n[9].default,o=Se(a,n,n[8],null);return{c(){e=I("div"),t=I("div"),o&&o.c(),this.h()},l(f){e=M(f,"DIV",{id:!0,class:!0,style:!0});var i=S(e);t=M(i,"DIV",{class:!0,style:!0});var l=S(t);o&&o.l(l),l.forEach(b),i.forEach(b),this.h()},h(){m(t,"class","absolute rounded-full h-32 w-32 shadow-xl z-10 select-none"),H(t,"transform","translate("+-n[2]/2+"px, "+-n[3]/2+"px)"),m(e,"id",n[1]),m(e,"class","absolute rounded-full h-16 w-16 bg-green-500 shadow-xl z-20 select-none opacity-50"),H(e,"left",n[5]+"px"),H(e,"top",n[4]+"px"),Te(()=>n[11].call(e))},m(f,i){T(f,e,i),O(e,t),o&&o.m(t,null),n[10](e),s=De(e,n[11].bind(e)),r=!0},p(f,[i]){o&&o.p&&(!r||i&256)&&Ie(o,a,f,f[8],r?Ae(a,f[8],i,null):Me(f[8]),null),(!r||i&12)&&H(t,"transform","translate("+-f[2]/2+"px, "+-f[3]/2+"px)"),(!r||i&2)&&m(e,"id",f[1]),(!r||i&32)&&H(e,"left",f[5]+"px"),(!r||i&16)&&H(e,"top",f[4]+"px")},i(f){r||(A(o,f),r=!0)},o(f){z(o,f),r=!1},d(f){f&&b(e),o&&o.d(f),n[10](null),s()}}}function Fe(n,e,t){let s,r,{$$slots:a={},$$scope:o}=e,{marker:f}=e,{id:i}=e,{left:l}=e,{top:u}=e,h,c;function y(w){te[w?"unshift":"push"](()=>{f=w,t(0,f)})}function E(){h=this.offsetWidth,c=this.offsetHeight,t(2,h),t(3,c)}return n.$$set=w=>{"marker"in w&&t(0,f=w.marker),"id"in w&&t(1,i=w.id),"left"in w&&t(6,l=w.left),"top"in w&&t(7,u=w.top),"$$scope"in w&&t(8,o=w.$$scope)},n.$$.update=()=>{n.$$.dirty&68&&t(5,s=l-h/2),n.$$.dirty&136&&t(4,r=u-c/2)},[f,i,h,c,r,s,l,u,o,a,y,E]}class Je extends x{constructor(e){super(),$(this,e,Fe,qe,ee,{marker:0,id:1,left:6,top:7})}}const fe=Math.PI,ue=2*fe,q=1e-6,Ke=ue-q;function he(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function Be(){return new he}he.prototype=Be.prototype={constructor:he,moveTo:function(n,e){this._+="M"+(this._x0=this._x1=+n)+","+(this._y0=this._y1=+e)},closePath:function(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(n,e){this._+="L"+(this._x1=+n)+","+(this._y1=+e)},quadraticCurveTo:function(n,e,t,s){this._+="Q"+ +n+","+ +e+","+(this._x1=+t)+","+(this._y1=+s)},bezierCurveTo:function(n,e,t,s,r,a){this._+="C"+ +n+","+ +e+","+ +t+","+ +s+","+(this._x1=+r)+","+(this._y1=+a)},arcTo:function(n,e,t,s,r){n=+n,e=+e,t=+t,s=+s,r=+r;var a=this._x1,o=this._y1,f=t-n,i=s-e,l=a-n,u=o-e,h=l*l+u*u;if(r<0)throw new Error("negative radius: "+r);if(this._x1===null)this._+="M"+(this._x1=n)+","+(this._y1=e);else if(h>q)if(!(Math.abs(u*f-i*l)>q)||!r)this._+="L"+(this._x1=n)+","+(this._y1=e);else{var c=t-a,y=s-o,E=f*f+i*i,w=c*c+y*y,g=Math.sqrt(E),L=Math.sqrt(h),p=r*Math.tan((fe-Math.acos((E+h-w)/(2*g*L)))/2),_=p/L,k=p/g;Math.abs(_-1)>q&&(this._+="L"+(n+_*l)+","+(e+_*u)),this._+="A"+r+","+r+",0,0,"+ +(u*c>l*y)+","+(this._x1=n+k*f)+","+(this._y1=e+k*i)}},arc:function(n,e,t,s,r,a){n=+n,e=+e,t=+t,a=!!a;var o=t*Math.cos(s),f=t*Math.sin(s),i=n+o,l=e+f,u=1^a,h=a?s-r:r-s;if(t<0)throw new Error("negative radius: "+t);this._x1===null?this._+="M"+i+","+l:(Math.abs(this._x1-i)>q||Math.abs(this._y1-l)>q)&&(this._+="L"+i+","+l),t&&(h<0&&(h=h%ue+ue),h>Ke?this._+="A"+t+","+t+",0,1,"+u+","+(n-o)+","+(e-f)+"A"+t+","+t+",0,1,"+u+","+(this._x1=i)+","+(this._y1=l):h>q&&(this._+="A"+t+","+t+",0,"+ +(h>=fe)+","+u+","+(this._x1=n+t*Math.cos(r))+","+(this._y1=e+t*Math.sin(r))))},rect:function(n,e,t,s){this._+="M"+(this._x0=this._x1=+n)+","+(this._y0=this._y1=+e)+"h"+ +t+"v"+ +s+"h"+-t+"Z"},toString:function(){return this._}};function pe(n){return function(){return n}}var Ze=Array.prototype.slice;function Ge(n){return n[0]}function Qe(n){return n[1]}class xe{constructor(e,t){this._context=e,this._x=t}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(e,t){switch(e=+e,t=+t,this._point){case 0:{this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+e)/2,this._y0,this._x0,t,e,t):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+t)/2,e,this._y0,e,t);break}}this._x0=e,this._y0=t}}function $e(n){return new xe(n,!0)}function et(n){return n.source}function tt(n){return n.target}function nt(n){let e=et,t=tt,s=Ge,r=Qe,a=null,o=null;function f(){let i;const l=Ze.call(arguments),u=e.apply(this,l),h=t.apply(this,l);if(a==null&&(o=n(i=Be())),o.lineStart(),l[0]=u,o.point(+s.apply(this,l),+r.apply(this,l)),l[0]=h,o.point(+s.apply(this,l),+r.apply(this,l)),o.lineEnd(),i)return o=null,i+""||null}return f.source=function(i){return arguments.length?(e=i,f):e},f.target=function(i){return arguments.length?(t=i,f):t},f.x=function(i){return arguments.length?(s=typeof i=="function"?i:pe(+i),f):s},f.y=function(i){return arguments.length?(r=typeof i=="function"?i:pe(+i),f):r},f.context=function(i){return arguments.length?(i==null?a=o=null:o=n(a=i),f):a},f}const{window:it}=Ye;function me(n,e,t){const s=n.slice();return s[19]=e[t],s[21]=t,s}function ge(n){let e,t=n[0],s=[];for(let r=0;r<t.length;r+=1)s[r]=ke(me(n,t,r));return{c(){e=R("svg");for(let r=0;r<s.length;r+=1)s[r].c();this.h()},l(r){e=U(r,"svg",{style:!0,class:!0});var a=S(e);for(let o=0;o<s.length;o+=1)s[o].l(a);a.forEach(b),this.h()},h(){H(e,"pointer-events","none"),m(e,"class","svelte-1bj7yo6")},m(r,a){T(r,e,a);for(let o=0;o<s.length;o+=1)s[o].m(e,null)},p(r,a){if(a&2047){t=r[0];let o;for(o=0;o<t.length;o+=1){const f=me(r,t,o);s[o]?s[o].p(f,a):(s[o]=ke(f),s[o].c(),s[o].m(e,null))}for(;o<s.length;o+=1)s[o].d(1);s.length=t.length}},d(r){r&&b(e),ze(s,r)}}}function ve(n){var g,L,p,_,k,C;let e,t,s,r,a,o,f,i=((p=(L=(g=n[19])==null?void 0:g.opts)==null?void 0:L.label)!=null&&p.enabled?(C=(k=(_=n[19])==null?void 0:_.opts)==null?void 0:k.label)==null?void 0:C.value:"")+"",l,u,h,c,y,E,w;return{c(){e=R("g"),t=R("path"),a=R("text"),o=R("textPath"),f=R("tspan"),l=V(i),u=N(),c=R("textPath"),y=V("\u27A4"),this.h()},l(d){e=U(d,"g",{stroke:!0,"stroke-opacity":!0});var v=S(e);t=U(v,"path",{d:!0,id:!0,"stroke-width":!0,stroke:!0,fill:!0,"stroke-linecap":!0,"stroke-opacity":!0}),S(t).forEach(b),a=U(v,"text",{class:!0});var P=S(a);o=U(P,"textPath",{"xlink:href":!0,startOffset:!0});var D=S(o);f=U(D,"tspan",{fill:!0,class:!0});var W=S(f);l=j(W,i),W.forEach(b),u=B(D),D.forEach(b),c=U(P,"textPath",{"xlink:href":!0,startOffset:!0,fill:!0,opacity:!0});var X=S(c);y=j(X,"\u27A4"),X.forEach(b),P.forEach(b),v.forEach(b),this.h()},h(){m(t,"d",s=n[10](n[19])),m(t,"id",r=n[19].id),m(t,"stroke-width",n[2]),m(t,"stroke",n[1]),m(t,"fill","none"),m(t,"stroke-linecap","round"),m(t,"stroke-opacity",n[4]),m(f,"fill","black"),m(f,"class","svelte-1bj7yo6"),ne(o,"xlink:href",h="#"+n[19].id),m(o,"startOffset",n[7]),ne(c,"xlink:href",E="#"+n[19].id),m(c,"startOffset",n[8]),m(c,"fill",n[3]),m(c,"opacity",w=n[4]*1.3),m(a,"class","svelte-1bj7yo6"),m(e,"stroke",n[6]),m(e,"stroke-opacity",n[5])},m(d,v){T(d,e,v),O(e,t),O(e,a),O(a,o),O(o,f),O(f,l),O(o,u),O(a,c),O(c,y)},p(d,v){var P,D,W,X,G,oe;v&1&&s!==(s=d[10](d[19]))&&m(t,"d",s),v&1&&r!==(r=d[19].id)&&m(t,"id",r),v&4&&m(t,"stroke-width",d[2]),v&2&&m(t,"stroke",d[1]),v&16&&m(t,"stroke-opacity",d[4]),v&1&&i!==(i=((W=(D=(P=d[19])==null?void 0:P.opts)==null?void 0:D.label)!=null&&W.enabled?(oe=(G=(X=d[19])==null?void 0:X.opts)==null?void 0:G.label)==null?void 0:oe.value:"")+"")&&ce(l,i),v&1&&h!==(h="#"+d[19].id)&&ne(o,"xlink:href",h),v&128&&m(o,"startOffset",d[7]),v&1&&E!==(E="#"+d[19].id)&&ne(c,"xlink:href",E),v&256&&m(c,"startOffset",d[8]),v&8&&m(c,"fill",d[3]),v&16&&w!==(w=d[4]*1.3)&&m(c,"opacity",w),v&64&&m(e,"stroke",d[6]),v&32&&m(e,"stroke-opacity",d[5])},d(d){d&&b(e)}}}function ke(n){let e,t=n[19]&&n[9]&&ve(n);return{c(){t&&t.c(),e=se()},l(s){t&&t.l(s),e=se()},m(s,r){t&&t.m(s,r),T(s,e,r)},p(s,r){s[19]&&s[9]?t?t.p(s,r):(t=ve(s),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},d(s){t&&t.d(s),s&&b(e)}}}function st(n){let e,t,s,r=n[9]&&ge(n);return{c(){r&&r.c(),e=se()},l(a){r&&r.l(a),e=se()},m(a,o){r&&r.m(a,o),T(a,e,o),t||(s=We(it,"resize",n[12]),t=!0)},p(a,[o]){a[9]?r?r.p(a,o):(r=ge(a),r.c(),r.m(e.parentNode,e)):r&&(r.d(1),r=null)},i:re,o:re,d(a){r&&r.d(a),a&&b(e),t=!1,s()}}}function rt(n,e,t){let{links:s}=e,{canvas:r}=e,{strokeColor:a="green"}=e,{strokeWidth:o=18}=e,{arrowColor:f="green"}=e,{strokeOpacity:i="0.3"}=e,{groupStrokeOpacity:l="0.1"}=e,{groupStrokeColor:u="white"}=e,{textStartOffset:h="40%"}=e,{arrowStartOffset:c="60%"}=e;const y=nt($e);let E,w,g,L,p;Xe(()=>{t(9,E=!0)});function _(d){if(d==r)return{x:d.offsetLeft,y:d.offsetTop};let v=d.getBoundingClientRect().top,P=r.getBoundingClientRect().top,D=v-P,W=d.getBoundingClientRect().left,X=r.getBoundingClientRect().left;return{x:W-X,y:D}}function k(d){let v=document.getElementById(d.source.id),P=document.getElementById(d.target.id);const{x:D,y:W}=_(v),{x:X,y:G}=_(P);return w=D+v.offsetWidth/2-3,g=W+v.offsetHeight/2-3,L=X+P.offsetWidth/2-3,p=G+P.offsetHeight/2-3,y({source:[w,g],target:[L,p]})}const C=d=>{t(0,s)};return n.$$set=d=>{"links"in d&&t(0,s=d.links),"canvas"in d&&t(11,r=d.canvas),"strokeColor"in d&&t(1,a=d.strokeColor),"strokeWidth"in d&&t(2,o=d.strokeWidth),"arrowColor"in d&&t(3,f=d.arrowColor),"strokeOpacity"in d&&t(4,i=d.strokeOpacity),"groupStrokeOpacity"in d&&t(5,l=d.groupStrokeOpacity),"groupStrokeColor"in d&&t(6,u=d.groupStrokeColor),"textStartOffset"in d&&t(7,h=d.textStartOffset),"arrowStartOffset"in d&&t(8,c=d.arrowStartOffset)},[s,a,o,f,i,l,u,h,c,E,k,r,C]}class ot extends x{constructor(e){super(),$(this,e,rt,st,ee,{links:0,canvas:11,strokeColor:1,strokeWidth:2,arrowColor:3,strokeOpacity:4,groupStrokeOpacity:5,groupStrokeColor:6,textStartOffset:7,arrowStartOffset:8})}}class Y{constructor(e){this.id=-1,this.nativePointer=e,this.pageX=e.pageX,this.pageY=e.pageY,this.clientX=e.clientX,this.clientY=e.clientY,self.Touch&&e instanceof Touch?this.id=e.identifier:Q(e)&&(this.id=e.pointerId)}getCoalesced(){if("getCoalescedEvents"in this.nativePointer){const e=this.nativePointer.getCoalescedEvents().map(t=>new Y(t));if(e.length>0)return e}return[this]}}const Q=n=>"pointerId"in n,le=n=>"changedTouches"in n,be=()=>{};class lt{constructor(e,{start:t=()=>!0,move:s=be,end:r=be,rawUpdates:a=!1,avoidPointerEvents:o=!1,eventListenerOptions:f={capture:!1,passive:!1,once:!1}}={}){this._element=e,this.startPointers=[],this.currentPointers=[],this._excludeFromButtonsCheck=new Set,this._pointerStart=i=>{if(Q(i)&&i.buttons===0)this._excludeFromButtonsCheck.add(i.pointerId);else if(!(i.buttons&1))return;const l=new Y(i);this.currentPointers.some(u=>u.id===l.id)||!this._triggerPointerStart(l,i)||(Q(i)?((i.target&&"setPointerCapture"in i.target?i.target:this._element).setPointerCapture(i.pointerId),this._element.addEventListener(this._rawUpdates?"pointerrawupdate":"pointermove",this._move,this._eventListenerOptions),this._element.addEventListener("pointerup",this._pointerEnd,this._eventListenerOptions),this._element.addEventListener("pointercancel",this._pointerEnd,this._eventListenerOptions)):(window.addEventListener("mousemove",this._move),window.addEventListener("mouseup",this._pointerEnd)))},this._touchStart=i=>{for(const l of Array.from(i.changedTouches))this._triggerPointerStart(new Y(l),i)},this._move=i=>{if(!le(i)&&(!Q(i)||!this._excludeFromButtonsCheck.has(i.pointerId))&&i.buttons===0){this._pointerEnd(i);return}const l=this.currentPointers.slice(),u=le(i)?Array.from(i.changedTouches).map(c=>new Y(c)):[new Y(i)],h=[];for(const c of u){const y=this.currentPointers.findIndex(E=>E.id===c.id);y!==-1&&(h.push(c),this.currentPointers[y]=c)}h.length!==0&&this._moveCallback(l,h,i)},this._triggerPointerEnd=(i,l)=>{if(!le(l)&&l.buttons&1)return!1;const u=this.currentPointers.findIndex(c=>c.id===i.id);if(u===-1)return!1;this.currentPointers.splice(u,1),this.startPointers.splice(u,1),this._excludeFromButtonsCheck.delete(i.id);const h=!(l.type==="mouseup"||l.type==="touchend"||l.type==="pointerup");return this._endCallback(i,l,h),!0},this._pointerEnd=i=>{if(!!this._triggerPointerEnd(new Y(i),i))if(Q(i)){if(this.currentPointers.length)return;this._element.removeEventListener(this._rawUpdates?"pointerrawupdate":"pointermove",this._move),this._element.removeEventListener("pointerup",this._pointerEnd),this._element.removeEventListener("pointercancel",this._pointerEnd)}else window.removeEventListener("mousemove",this._move),window.removeEventListener("mouseup",this._pointerEnd)},this._touchEnd=i=>{for(const l of Array.from(i.changedTouches))this._triggerPointerEnd(new Y(l),i)},this._startCallback=t,this._moveCallback=s,this._endCallback=r,this._rawUpdates=a&&"onpointerrawupdate"in window,this._eventListenerOptions=f,self.PointerEvent&&!o?this._element.addEventListener("pointerdown",this._pointerStart,this._eventListenerOptions):(this._element.addEventListener("mousedown",this._pointerStart,this._eventListenerOptions),this._element.addEventListener("touchstart",this._touchStart,this._eventListenerOptions),this._element.addEventListener("touchmove",this._move,this._eventListenerOptions),this._element.addEventListener("touchend",this._touchEnd,this._eventListenerOptions),this._element.addEventListener("touchcancel",this._touchEnd,this._eventListenerOptions))}stop(){this._element.removeEventListener("pointerdown",this._pointerStart),this._element.removeEventListener("mousedown",this._pointerStart),this._element.removeEventListener("touchstart",this._touchStart),this._element.removeEventListener("touchmove",this._move),this._element.removeEventListener("touchend",this._touchEnd),this._element.removeEventListener("touchcancel",this._touchEnd),this._element.removeEventListener(this._rawUpdates?"pointerrawupdate":"pointermove",this._move),this._element.removeEventListener("pointerup",this._pointerEnd),this._element.removeEventListener("pointercancel",this._pointerEnd),window.removeEventListener("mousemove",this._move),window.removeEventListener("mouseup",this._pointerEnd)}_triggerPointerStart(e,t){return this._startCallback(e,t)?(this.currentPointers.push(e),this.startPointers.push(e),!0):!1}}let at=(n=21)=>crypto.getRandomValues(new Uint8Array(n)).reduce((e,t)=>(t&=63,t<36?e+=t.toString(36):t<62?e+=(t-26).toString(36).toUpperCase():t>62?e+="-":e+="_",e),"");const ft=n=>({}),Ee=n=>({connectable:n[6]});function we(n){let e,t,s;function r(o){n[9](o)}let a={left:n[4],top:n[5],id:ie};return n[3]!==void 0&&(a.marker=n[3]),e=new Je({props:a}),te.push(()=>Ve(e,"marker",r)),{c(){F(e.$$.fragment)},l(o){J(e.$$.fragment,o)},m(o,f){K(e,o,f),s=!0},p(o,f){const i={};f&16&&(i.left=o[4]),f&32&&(i.top=o[5]),!t&&f&8&&(t=!0,i.marker=o[3],je(()=>t=!1)),e.$set(i)},i(o){s||(A(e.$$.fragment,o),s=!0)},o(o){z(e.$$.fragment,o),s=!1},d(o){Z(e,o)}}}function ye(n){let e;const t=n[8].default,s=Se(t,n,n[7],Ee);return{c(){s&&s.c()},l(r){s&&s.l(r)},m(r,a){s&&s.m(r,a),e=!0},p(r,a){s&&s.p&&(!e||a&128)&&Ie(s,t,r,r[7],e?Ae(t,r[7],a,ft):Me(r[7]),Ee)},i(r){e||(A(s,r),e=!0)},o(r){z(s,r),e=!1},d(r){s&&s.d(r)}}}function ut(n){let e,t,s,r,a,o,f,i,l=n[2]&&we(n),u=n[1]&&ye(n);return f=new ot({props:{links:n[0].links,canvas:n[1]}}),{c(){e=I("div"),t=I("div"),s=V("Directive is available within the slot as a slot prop"),r=N(),l&&l.c(),a=N(),u&&u.c(),o=N(),F(f.$$.fragment),this.h()},l(h){e=M(h,"DIV",{class:!0});var c=S(e);t=M(c,"DIV",{class:!0});var y=S(t);s=j(y,"Directive is available within the slot as a slot prop"),y.forEach(b),r=B(c),l&&l.l(c),a=B(c),u&&u.l(c),o=B(c),J(f.$$.fragment,c),c.forEach(b),this.h()},h(){m(t,"class","text-black font-bold"),m(e,"class","relative border-dashed border-2 border-sky-500 rounded-lg bg-slate-100/10 m-4 p-4 z-50")},m(h,c){T(h,e,c),O(e,t),O(t,s),O(e,r),l&&l.m(e,null),O(e,a),u&&u.m(e,null),O(e,o),K(f,e,null),n[10](e),i=!0},p(h,[c]){h[2]?l?(l.p(h,c),c&4&&A(l,1)):(l=we(h),l.c(),A(l,1),l.m(e,a)):l&&(de(),z(l,1,1,()=>{l=null}),_e()),h[1]?u?(u.p(h,c),c&2&&A(u,1)):(u=ye(h),u.c(),A(u,1),u.m(e,o)):u&&(de(),z(u,1,1,()=>{u=null}),_e());const y={};c&1&&(y.links=h[0].links),c&2&&(y.canvas=h[1]),f.$set(y)},i(h){i||(A(l),A(u),A(f.$$.fragment,h),i=!0)},o(h){z(l),z(u),z(f.$$.fragment,h),i=!1},d(h){h&&b(e),l&&l.d(),u&&u.d(),Z(f),n[10](null)}}}const ie="marker";function ht(n,e,t){let{$$slots:s={},$$scope:r}=e,{data:a}=e,o,f,i,l=0,u=0;const h=(g,L=!1)=>{const p=a.nodes.find(k=>k.id==g);if(!p||!p.value)return"";if(!L)return p.value+" to";const _=a.nodes.find(k=>k.id==L);return _?`${p.value} to ${_.value}`:p.value};function c(g,L){L.stopPropagation(),t(4,l=g.clientX-o.offsetLeft),t(5,u=g.clientY-o.offsetTop)}function y(g,L){g.id||(g.id=at()),g.dataset.dropzone||(g.dataset.dropzone=!0);let p,_=new lt(g,{start(k,C){return _.currentPointers.length===1?!1:(t(2,f=!0),c(k,C),!0)},move(k,C,d){c(_.currentPointers[0],d),p={id:g.id+"-to-",source:{id:g.id},target:{id:ie},opts:{label:{enabled:!0,value:h(g.id)}}},console.log({link:p}),a.links.find(P=>P.source.id==g.id&&P.target.id==ie)==null?t(0,a.links=[...a.links,p],a):t(0,a)},end:(k,C,d)=>{t(3,i.style.display="none",i),t(2,f=!1);let P=document.elementFromPoint(k.clientX,k.clientY).closest("[data-dropzone]");t(0,a.links=a.links.map(D=>D.source.id==g.id&&D.target.id==ie?null:D).filter(D=>D),a),!(!P||!(P!=null&&P.id))&&t(0,a.links=[...a.links,{id:g.id+"-to-"+P.id,source:{id:g.id},target:{id:P.id},opts:{label:{enabled:!0,value:h(g.id,P.id)}}}],a)},avoidPointerEvents:!0,eventListenerOptions:{capture:!0,passive:!1}});return{update(k){},destroy(){}}}function E(g){i=g,t(3,i)}function w(g){te[g?"unshift":"push"](()=>{o=g,t(1,o)})}return n.$$set=g=>{"data"in g&&t(0,a=g.data),"$$scope"in g&&t(7,r=g.$$scope)},[a,o,f,i,l,u,y,r,s,E,w]}class ct extends x{constructor(e){super(),$(this,e,ht,ut,ee,{data:0})}}function dt(n){let e,t,s,r,a;return{c(){e=I("div"),this.h()},l(o){e=M(o,"DIV",{class:!0,style:!0}),S(e).forEach(b),this.h()},h(){m(e,"class","flex absolute h-4 w-4 bg-blue-500 rounded-full border-blue-300 hover:ring hover:ring-blue-800"),m(e,"style",t="top: "+n[7]+"px; "+(n[0]=="right"?`right: ${n[6]}px;`:`left: ${n[5]}px;`)),Te(()=>n[10].call(e))},m(o,f){T(o,e,f),n[9](e),s=De(e,n[10].bind(e)),r||(a=Ne(n[1].call(null,e)),r=!0)},p(o,[f]){f&225&&t!==(t="top: "+o[7]+"px; "+(o[0]=="right"?`right: ${o[6]}px;`:`left: ${o[5]}px;`))&&m(e,"style",t)},i:re,o:re,d(o){o&&b(e),n[9](null),s(),r=!1,a()}}}function _t(n,e,t){let s,r,a,{position:o="right"}=e,{connectable:f}=e,i,l,u,h;function c(E){te[E?"unshift":"push"](()=>{i=E,t(2,i)})}function y(){u=this.offsetWidth,l=this.offsetHeight,t(4,u),t(3,l)}return n.$$set=E=>{"position"in E&&t(0,o=E.position),"connectable"in E&&t(1,f=E.connectable)},n.$$.update=()=>{n.$$.dirty&4&&i&&t(8,h=i.parentNode.offsetHeight),n.$$.dirty&264&&t(7,s=h&&l?h/2-l/2:0),n.$$.dirty&16&&t(6,r=u?-u/2:0),n.$$.dirty&16&&t(5,a=u?-u/2:0)},[o,f,i,l,u,a,r,s,h,c,y]}class ae extends x{constructor(e){super(),$(this,e,_t,dt,ee,{position:0,connectable:1})}}function Le(n,e,t){const s=n.slice();return s[5]=e[t][0],s[6]=e[t][1],s[8]=t,s}function Oe(n,e,t){const s=n.slice();return s[9]=e[t],s}function Pe(n,e){let t,s=e[9].value+"",r,a,o,f;return{key:n,first:null,c(){t=I("div"),r=V(s),this.h()},l(i){t=M(i,"DIV",{class:!0,id:!0});var l=S(t);r=j(l,s),l.forEach(b),this.h()},h(){var i,l;m(t,"class","block m-2 cursor-pointer select-none w-fit"),m(t,"id",a=(i=e[9])!=null&&i.id?(l=e[9])==null?void 0:l.id:null),this.first=t},m(i,l){T(i,t,l),O(t,r),o||(f=Ne(e[4].call(null,t)),o=!0)},p(i,l){var u,h;e=i,l&1&&s!==(s=e[9].value+"")&&ce(r,s),l&1&&a!==(a=(u=e[9])!=null&&u.id?(h=e[9])==null?void 0:h.id:null)&&m(t,"id",a)},d(i){i&&b(t),o=!1,f()}}}function Ce(n){let e,t=[],s=new Map,r;function a(...i){return n[2](n[5],...i)}let o=n[0].nodes.filter(a);const f=i=>i[9].id;for(let i=0;i<o.length;i+=1){let l=Oe(n,o,i),u=f(l);s.set(u,t[i]=Pe(u,l))}return{c(){e=I("div");for(let i=0;i<t.length;i+=1)t[i].c();r=N(),this.h()},l(i){e=M(i,"DIV",{class:!0});var l=S(e);for(let u=0;u<t.length;u+=1)t[u].l(l);r=B(l),l.forEach(b),this.h()},h(){m(e,"class","flex flex-col border rounded-lg m-4 p-4")},m(i,l){T(i,e,l);for(let u=0;u<t.length;u+=1)t[u].m(e,null);O(e,r)},p(i,l){n=i,l&3&&(o=n[0].nodes.filter(a),t=Re(t,l,f,1,n,o,s,e,Ue,Pe,r,Oe))},d(i){i&&b(e);for(let l=0;l<t.length;l+=1)t[l].d()}}}function pt(n){let e,t,s,r,a,o,f,i,l,u,h,c,y,E,w,g=[...Object.entries(n[1])],L=[];for(let p=0;p<g.length;p+=1)L[p]=Ce(Le(n,g,p));return o=new ae({props:{position:"right",connectable:n[4]}}),u=new ae({props:{position:"left",connectable:n[4]}}),E=new ae({props:{position:"left",connectable:n[4]}}),{c(){e=I("div");for(let p=0;p<L.length;p+=1)L[p].c();t=N(),s=I("div"),r=I("div"),a=V(`Can we also have an external endpoint?
			`),F(o.$$.fragment),f=N(),i=I("div"),l=V(`No, libraries cannot do that.
			`),F(u.$$.fragment),h=N(),c=I("div"),y=V(`Yes, pass the connectable directive to the component.
			`),F(E.$$.fragment),this.h()},l(p){e=M(p,"DIV",{class:!0});var _=S(e);for(let P=0;P<L.length;P+=1)L[P].l(_);_.forEach(b),t=B(p),s=M(p,"DIV",{class:!0});var k=S(s);r=M(k,"DIV",{class:!0});var C=S(r);a=j(C,`Can we also have an external endpoint?
			`),J(o.$$.fragment,C),C.forEach(b),f=B(k),i=M(k,"DIV",{class:!0});var d=S(i);l=j(d,`No, libraries cannot do that.
			`),J(u.$$.fragment,d),d.forEach(b),h=B(k),c=M(k,"DIV",{class:!0});var v=S(c);y=j(v,`Yes, pass the connectable directive to the component.
			`),J(E.$$.fragment,v),v.forEach(b),k.forEach(b),this.h()},h(){m(e,"class","flex flex-row justify-around "),m(r,"class","relative inline-flex m-2 p-4 border rounded-lg w-1/3 bg-amber-100"),m(i,"class","relative inline-flex m-2 p-4 border rounded-lg w-1/3 bg-red-300"),m(c,"class","relative inline-flex m-2 ml-auto p-4 border rounded-lg w-1/3 bg-green-300"),m(s,"class","flex flex-row flex-wrap border rounded-lg m-4 p-4 justify-between bg-neutral-50")},m(p,_){T(p,e,_);for(let k=0;k<L.length;k+=1)L[k].m(e,null);T(p,t,_),T(p,s,_),O(s,r),O(r,a),K(o,r,null),O(s,f),O(s,i),O(i,l),K(u,i,null),O(s,h),O(s,c),O(c,y),K(E,c,null),w=!0},p(p,_){if(_&3){g=[...Object.entries(p[1])];let v;for(v=0;v<g.length;v+=1){const P=Le(p,g,v);L[v]?L[v].p(P,_):(L[v]=Ce(P),L[v].c(),L[v].m(e,null))}for(;v<L.length;v+=1)L[v].d(1);L.length=g.length}const k={};_&16&&(k.connectable=p[4]),o.$set(k);const C={};_&16&&(C.connectable=p[4]),u.$set(C);const d={};_&16&&(d.connectable=p[4]),E.$set(d)},i(p){w||(A(o.$$.fragment,p),A(u.$$.fragment,p),A(E.$$.fragment,p),w=!0)},o(p){z(o.$$.fragment,p),z(u.$$.fragment,p),z(E.$$.fragment,p),w=!1},d(p){p&&b(e),ze(L,p),p&&b(t),p&&b(s),Z(o),Z(u),Z(E)}}}function mt(n){let e,t,s,r,a,o,f,i,l,u,h,c,y,E=JSON.stringify(n[0])+"",w,g;function L(_){n[3](_)}let p={$$slots:{default:[pt,({connectable:_})=>({4:_}),({connectable:_})=>_?16:0]},$$scope:{ctx:n}};return n[0]!==void 0&&(p.data=n[0]),h=new ct({props:p}),te.push(()=>Ve(h,"data",L)),{c(){e=I("link"),t=N(),s=I("div"),r=V("by "),a=I("a"),o=V("@DougAnderson444"),f=N(),i=I("a"),l=V("https://github.com/DougAnderson444/svelte-plumb"),u=V(`

Match the picture to the words:

`),F(h.$$.fragment),y=N(),w=V(E),this.h()},l(_){const k=He('[data-svelte="svelte-18a4486"]',document.head);e=M(k,"LINK",{rel:!0,href:!0}),k.forEach(b),t=B(_),s=M(_,"DIV",{class:!0});var C=S(s);r=j(C,"by "),a=M(C,"A",{href:!0,class:!0});var d=S(a);o=j(d,"@DougAnderson444"),d.forEach(b),f=B(C),i=M(C,"A",{href:!0,class:!0});var v=S(i);l=j(v,"https://github.com/DougAnderson444/svelte-plumb"),v.forEach(b),C.forEach(b),u=j(_,`

Match the picture to the words:

`),J(h.$$.fragment,_),y=B(_),w=j(_,E),this.h()},h(){m(e,"rel","stylesheet"),m(e,"href","https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.3.5/tailwind.min.css"),m(a,"href","https://twitter.com/DougAnderson444"),m(a,"class","font-bold m-2 underline"),m(i,"href","https://twitter.com/DougAnderson444"),m(i,"class","font-bold m-2 underline"),m(s,"class","my-2 p-2 bg-blue-100 rounded-lg w-fit")},m(_,k){O(document.head,e),T(_,t,k),T(_,s,k),O(s,r),O(s,a),O(a,o),O(s,f),O(s,i),O(i,l),T(_,u,k),K(h,_,k),T(_,y,k),T(_,w,k),g=!0},p(_,[k]){const C={};k&4113&&(C.$$scope={dirty:k,ctx:_}),!c&&k&1&&(c=!0,C.data=_[0],je(()=>c=!1)),h.$set(C),(!g||k&1)&&E!==(E=JSON.stringify(_[0])+"")&&ce(w,E)},i(_){g||(A(h.$$.fragment,_),g=!0)},o(_){z(h.$$.fragment,_),g=!1},d(_){b(e),_&&b(t),_&&b(s),_&&b(u),Z(h,_),_&&b(y),_&&b(w)}}}function gt(n,e,t){let s={emojii:"emojii",description:"description"},r={nodes:[{id:1,type:s.emojii,value:"\u{1F431}"},{id:2,type:s.emojii,value:"\u{1F984}"},{id:3,type:s.emojii,value:"\u{1F410}"},{id:4,type:s.description,value:"GOAT"},{id:5,type:s.description,value:"Cat"},{id:6,type:s.description,value:"Unicorn"}],links:[]};const a=(f,i)=>i.type==f;function o(f){r=f,t(0,r)}return[r,s,a,o]}class kt extends x{constructor(e){super(),$(this,e,gt,mt,ee,{})}}export{kt as default};