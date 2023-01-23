import { SvelteComponent, init, safe_not_equal, create_slot, element, claim_element, children, detach, attr, set_style, add_render_callback, insert_hydration, add_resize_listener, update_slot_base, get_all_dirty_from_scope, get_slot_changes, transition_in, transition_out, binding_callbacks, noop as noop$1, assign, now, loop, identity, empty, group_outros, check_outros, createEventDispatcher, onMount, svg_element, claim_svg_element, append_hydration, listen, action_destroyer, is_function, run_all, text, claim_text, set_store_value, space, claim_space, set_data, xlink_attr, subscribe, update_keyed_each, outro_and_destroy_block, bubble, create_component, claim_component, mount_component, destroy_component, destroy_each, globals, bind, add_flush_callback, get_spread_update, get_spread_object, flush, onDestroy, create_bidirectional_transition, set_input_value, to_number, destroy_block } from "../chunks/index-082b18d7.js";
import { writable } from "../chunks/index-002f4856.js";
class Pointer {
  constructor(nativePointer) {
    this.id = -1;
    this.nativePointer = nativePointer;
    this.pageX = nativePointer.pageX;
    this.pageY = nativePointer.pageY;
    this.clientX = nativePointer.clientX;
    this.clientY = nativePointer.clientY;
    if (self.Touch && nativePointer instanceof Touch) {
      this.id = nativePointer.identifier;
    } else if (isPointerEvent(nativePointer)) {
      this.id = nativePointer.pointerId;
    }
  }
  getCoalesced() {
    if ("getCoalescedEvents" in this.nativePointer) {
      const events = this.nativePointer.getCoalescedEvents().map((p) => new Pointer(p));
      if (events.length > 0)
        return events;
    }
    return [this];
  }
}
const isPointerEvent = (event) => "pointerId" in event;
const isTouchEvent = (event) => "changedTouches" in event;
const noop = () => {
};
class PointerTracker {
  constructor(_element, { start = () => true, move = noop, end = noop, rawUpdates = false, avoidPointerEvents = false, eventListenerOptions = { capture: false, passive: false, once: false } } = {}) {
    this._element = _element;
    this.startPointers = [];
    this.currentPointers = [];
    this._excludeFromButtonsCheck = /* @__PURE__ */ new Set();
    this._pointerStart = (event) => {
      if (isPointerEvent(event) && event.buttons === 0) {
        this._excludeFromButtonsCheck.add(event.pointerId);
      } else if (!(event.buttons & 1)) {
        return;
      }
      const pointer = new Pointer(event);
      if (this.currentPointers.some((p) => p.id === pointer.id))
        return;
      if (!this._triggerPointerStart(pointer, event))
        return;
      if (isPointerEvent(event)) {
        const capturingElement = event.target && "setPointerCapture" in event.target ? event.target : this._element;
        capturingElement.setPointerCapture(event.pointerId);
        this._element.addEventListener(this._rawUpdates ? "pointerrawupdate" : "pointermove", this._move, this._eventListenerOptions);
        this._element.addEventListener("pointerup", this._pointerEnd, this._eventListenerOptions);
        this._element.addEventListener("pointercancel", this._pointerEnd, this._eventListenerOptions);
      } else {
        window.addEventListener("mousemove", this._move);
        window.addEventListener("mouseup", this._pointerEnd);
      }
    };
    this._touchStart = (event) => {
      for (const touch of Array.from(event.changedTouches)) {
        this._triggerPointerStart(new Pointer(touch), event);
      }
    };
    this._move = (event) => {
      if (!isTouchEvent(event) && (!isPointerEvent(event) || !this._excludeFromButtonsCheck.has(event.pointerId)) && event.buttons === 0) {
        this._pointerEnd(event);
        return;
      }
      const previousPointers = this.currentPointers.slice();
      const changedPointers = isTouchEvent(event) ? Array.from(event.changedTouches).map((t) => new Pointer(t)) : [new Pointer(event)];
      const trackedChangedPointers = [];
      for (const pointer of changedPointers) {
        const index = this.currentPointers.findIndex((p) => p.id === pointer.id);
        if (index === -1)
          continue;
        trackedChangedPointers.push(pointer);
        this.currentPointers[index] = pointer;
      }
      if (trackedChangedPointers.length === 0)
        return;
      this._moveCallback(previousPointers, trackedChangedPointers, event);
    };
    this._triggerPointerEnd = (pointer, event) => {
      if (!isTouchEvent(event) && event.buttons & 1) {
        return false;
      }
      const index = this.currentPointers.findIndex((p) => p.id === pointer.id);
      if (index === -1)
        return false;
      this.currentPointers.splice(index, 1);
      this.startPointers.splice(index, 1);
      this._excludeFromButtonsCheck.delete(pointer.id);
      const cancelled = !(event.type === "mouseup" || event.type === "touchend" || event.type === "pointerup");
      this._endCallback(pointer, event, cancelled);
      return true;
    };
    this._pointerEnd = (event) => {
      if (!this._triggerPointerEnd(new Pointer(event), event))
        return;
      if (isPointerEvent(event)) {
        if (this.currentPointers.length)
          return;
        this._element.removeEventListener(this._rawUpdates ? "pointerrawupdate" : "pointermove", this._move);
        this._element.removeEventListener("pointerup", this._pointerEnd);
        this._element.removeEventListener("pointercancel", this._pointerEnd);
      } else {
        window.removeEventListener("mousemove", this._move);
        window.removeEventListener("mouseup", this._pointerEnd);
      }
    };
    this._touchEnd = (event) => {
      for (const touch of Array.from(event.changedTouches)) {
        this._triggerPointerEnd(new Pointer(touch), event);
      }
    };
    this._startCallback = start;
    this._moveCallback = move;
    this._endCallback = end;
    this._rawUpdates = rawUpdates && "onpointerrawupdate" in window;
    this._eventListenerOptions = eventListenerOptions;
    if (self.PointerEvent && !avoidPointerEvents) {
      this._element.addEventListener("pointerdown", this._pointerStart, this._eventListenerOptions);
    } else {
      this._element.addEventListener("mousedown", this._pointerStart, this._eventListenerOptions);
      this._element.addEventListener("touchstart", this._touchStart, this._eventListenerOptions);
      this._element.addEventListener("touchmove", this._move, this._eventListenerOptions);
      this._element.addEventListener("touchend", this._touchEnd, this._eventListenerOptions);
      this._element.addEventListener("touchcancel", this._touchEnd, this._eventListenerOptions);
    }
  }
  stop() {
    this._element.removeEventListener("pointerdown", this._pointerStart);
    this._element.removeEventListener("mousedown", this._pointerStart);
    this._element.removeEventListener("touchstart", this._touchStart);
    this._element.removeEventListener("touchmove", this._move);
    this._element.removeEventListener("touchend", this._touchEnd);
    this._element.removeEventListener("touchcancel", this._touchEnd);
    this._element.removeEventListener(this._rawUpdates ? "pointerrawupdate" : "pointermove", this._move);
    this._element.removeEventListener("pointerup", this._pointerEnd);
    this._element.removeEventListener("pointercancel", this._pointerEnd);
    window.removeEventListener("mousemove", this._move);
    window.removeEventListener("mouseup", this._pointerEnd);
  }
  _triggerPointerStart(pointer, event) {
    if (!this._startCallback(pointer, event))
      return false;
    this.currentPointers.push(pointer);
    this.startPointers.push(pointer);
    return true;
  }
}
let nanoid = (size = 21) => crypto.getRandomValues(new Uint8Array(size)).reduce((id, byte) => {
  byte &= 63;
  if (byte < 36) {
    id += byte.toString(36);
  } else if (byte < 62) {
    id += (byte - 26).toString(36).toUpperCase();
  } else if (byte > 62) {
    id += "-";
  } else {
    id += "_";
  }
  return id;
}, "");
function fallback_block$5(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "h-4 w-4 p-8 rounded-full shadow-xl opacity-80 select-none border-[2em] border-pink-500/50");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p: noop$1,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$a(ctx) {
  let div;
  let div_resize_listener;
  let current;
  const default_slot_template = ctx[9].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[8], null);
  const default_slot_or_fallback = default_slot || fallback_block$5();
  return {
    c() {
      div = element("div");
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { id: true, class: true, style: true });
      var div_nodes = children(div);
      if (default_slot_or_fallback)
        default_slot_or_fallback.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "id", ctx[1]);
      attr(div, "class", "absolute");
      set_style(div, "left", ctx[5] + "px");
      set_style(div, "top", ctx[4] + "px");
      add_render_callback(() => ctx[11].call(div));
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(div, null);
      }
      ctx[10](div);
      div_resize_listener = add_resize_listener(div, ctx[11].bind(div));
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 256)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[8],
            !current ? get_all_dirty_from_scope(ctx2[8]) : get_slot_changes(default_slot_template, ctx2[8], dirty, null),
            null
          );
        }
      }
      if (!current || dirty & 2) {
        attr(div, "id", ctx2[1]);
      }
      if (!current || dirty & 32) {
        set_style(div, "left", ctx2[5] + "px");
      }
      if (!current || dirty & 16) {
        set_style(div, "top", ctx2[4] + "px");
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
      ctx[10](null);
      div_resize_listener();
    }
  };
}
function instance$a($$self, $$props, $$invalidate) {
  let x;
  let y;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { marker } = $$props;
  let { id } = $$props;
  let { left } = $$props;
  let { top } = $$props;
  let offsetWidth;
  let offsetHeight;
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      marker = $$value;
      $$invalidate(0, marker);
    });
  }
  function div_elementresize_handler() {
    offsetWidth = this.offsetWidth;
    offsetHeight = this.offsetHeight;
    $$invalidate(2, offsetWidth);
    $$invalidate(3, offsetHeight);
  }
  $$self.$$set = ($$props2) => {
    if ("marker" in $$props2)
      $$invalidate(0, marker = $$props2.marker);
    if ("id" in $$props2)
      $$invalidate(1, id = $$props2.id);
    if ("left" in $$props2)
      $$invalidate(6, left = $$props2.left);
    if ("top" in $$props2)
      $$invalidate(7, top = $$props2.top);
    if ("$$scope" in $$props2)
      $$invalidate(8, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 68) {
      $$invalidate(5, x = left - offsetWidth / 2);
    }
    if ($$self.$$.dirty & 136) {
      $$invalidate(4, y = top - offsetHeight / 2);
    }
  };
  return [
    marker,
    id,
    offsetWidth,
    offsetHeight,
    y,
    x,
    left,
    top,
    $$scope,
    slots,
    div_binding,
    div_elementresize_handler
  ];
}
class CursorMarker extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$a, safe_not_equal, { marker: 0, id: 1, left: 6, top: 7 });
  }
}
var PI = Math.PI;
function modulate(value, rangeA, rangeB, clamp) {
  if (clamp === void 0) {
    clamp = false;
  }
  var fromLow = rangeA[0], fromHigh = rangeA[1];
  var toLow = rangeB[0], toHigh = rangeB[1];
  var result = toLow + (value - fromLow) / (fromHigh - fromLow) * (toHigh - toLow);
  if (clamp === true) {
    if (toLow < toHigh) {
      if (result < toLow) {
        return toLow;
      }
      if (result > toHigh) {
        return toHigh;
      }
    } else {
      if (result > toLow) {
        return toLow;
      }
      if (result < toHigh) {
        return toHigh;
      }
    }
  }
  return result;
}
function rotatePoint(x, y, cx, cy, angle) {
  var s = Math.sin(angle);
  var c = Math.cos(angle);
  var px = x - cx;
  var py = y - cy;
  var nx = px * c - py * s;
  var ny = px * s + py * c;
  return [nx + cx, ny + cy];
}
function getDistance(x0, y0, x1, y1) {
  return Math.hypot(y1 - y0, x1 - x0);
}
function getAngle(x0, y0, x1, y1) {
  return Math.atan2(y1 - y0, x1 - x0);
}
function getPointBetween(x0, y0, x1, y1, d) {
  if (d === void 0) {
    d = 0.5;
  }
  return [x0 + (x1 - x0) * d, y0 + (y1 - y0) * d];
}
function getSector(a, s) {
  if (s === void 0) {
    s = 8;
  }
  return Math.floor(s * (0.5 + a / (PI * 2) % s));
}
function doRectanglesCollide(x0, y0, w0, h0, x1, y1, w1, h1) {
  return !(x0 >= x1 + w1 || x1 >= x0 + w0 || y0 >= y1 + h1 || y1 >= y0 + h0);
}
function getSegmentCircleIntersections(cx, cy, r, x0, y0, x1, y1) {
  var b, c, d, u1, u2, ret, retP1, retP2, v1 = [x1 - x0, y1 - y0], v2 = [x0 - cx, y0 - cy];
  b = v1[0] * v2[0] + v1[1] * v2[1];
  c = 2 * (v1[0] * v1[0] + v1[1] * v1[1]);
  b *= -2;
  d = Math.sqrt(b * b - 2 * c * (v2[0] * v2[0] + v2[1] * v2[1] - r * r));
  if (isNaN(d)) {
    return [];
  }
  u1 = (b - d) / c;
  u2 = (b + d) / c;
  retP1 = [];
  retP2 = [];
  ret = [];
  if (u1 <= 1 && u1 >= 0) {
    retP1[0] = x0 + v1[0] * u1;
    retP1[1] = y0 + v1[1] * u1;
    ret[0] = retP1;
  }
  if (u2 <= 1 && u2 >= 0) {
    retP2[0] = x0 + v1[0] * u2;
    retP2[1] = y0 + v1[1] * u2;
    ret[ret.length] = retP2;
  }
  return ret;
}
function normalizeAngle(radians) {
  return radians - PI * 2 * Math.floor(radians / (PI * 2));
}
function getRaySegmentIntersection(x, y, dx, dy, x0, y0, x1, y1) {
  var r, s, d;
  if (dy * (x1 - x0) !== dx * (y1 - y0)) {
    d = dx * (y1 - y0) - dy * (x1 - x0);
    if (d !== 0) {
      r = ((y - y0) * (x1 - x0) - (x - x0) * (y1 - y0)) / d;
      s = ((y - y0) * dx - (x - x0) * dy) / d;
      if (r >= 0 && s >= 0 && s <= 1) {
        return [x + r * dx, y + r * dy];
      }
    }
  }
  return void 0;
}
function getDelta(angle) {
  return [Math.cos(angle), Math.sin(angle)];
}
function getIntermediate(angle) {
  return Math.abs(Math.abs(angle % (PI / 2)) - PI / 4) / (PI / 4);
}
function getLineBetweenRoundedRectangles(x0, y0, w0, h0, r0, x1, y1, w1, h1, r1) {
  var cx0 = x0 + w0 / 2, cy0 = y0 + h0 / 2, cx1 = x1 + w1 / 2, cy1 = y1 + h1 / 2, _ref3 = getRayRoundedRectangleIntersection(cx0, cy0, cx1 - cx0, cy1 - cy0, x0, y0, w0, h0, r0) || [[cx0, cy0]], _ref3$ = _ref3[0], di0x = _ref3$[0], di0y = _ref3$[1], _ref4 = getRayRoundedRectangleIntersection(cx1, cy1, cx0 - cx1, cy0 - cy1, x1, y1, w1, h1, r1) || [[cx1, cy1]], _ref4$ = _ref4[0], di1x = _ref4$[0], di1y = _ref4$[1];
  return [di0x, di0y, di1x, di1y];
}
function getRayRoundedRectangleIntersection(ox, oy, dx, dy, x, y, w, h, r) {
  var mx = x + w, my = y + h, rx = x + r - 1, ry = y + r - 1, mrx = x + w - r + 1, mry = y + h - r + 1;
  var segments = [[x, mry, x, ry], [rx, y, mrx, y], [mx, ry, mx, mry], [mrx, my, rx, my]];
  var corners = [[rx, ry, Math.PI, Math.PI * 1.5], [mrx, ry, Math.PI * 1.5, Math.PI * 2], [mrx, mry, 0, Math.PI * 0.5], [rx, mry, Math.PI * 0.5, Math.PI]];
  var points = [];
  segments.forEach(function(segment, i) {
    var px0 = segment[0], py0 = segment[1], px1 = segment[2], py1 = segment[3];
    var _corners$i2 = corners[i], cx = _corners$i2[0], cy = _corners$i2[1], as = _corners$i2[2], ae = _corners$i2[3];
    var intersections = getRayCircleIntersection(cx, cy, r, ox, oy, dx, dy);
    intersections && intersections.filter(function(pt) {
      var pointAngle = normalizeAngle(getAngle(cx, cy, pt[0], pt[1]));
      return pointAngle > as && pointAngle < ae;
    }).forEach(function(pt) {
      return points.push(pt);
    });
    var segmentInt = getRaySegmentIntersection(ox, oy, dx, dy, px0, py0, px1, py1);
    if (!!segmentInt) {
      points.push(segmentInt);
    }
  });
  return points;
}
function getRectangleSegmentIntersectedByRay(x, y, w, h, ox, oy, dx, dy) {
  return getRectangleSegments(x, y, w, h).find(function(_ref5) {
    var sx0 = _ref5[0], sy0 = _ref5[1], sx1 = _ref5[2], sy1 = _ref5[3];
    return getRaySegmentIntersection(ox, oy, dx, dy, sx0, sy0, sx1, sy1);
  });
}
function getRectangleSegments(x, y, w, h) {
  return [[x, y, x + w, y], [x + w, y, x + w, y + h], [x + w, y + h, x, y + h], [x, y + h, x, y]];
}
function getRayCircleIntersection(cx, cy, r, ox, oy, dx, dy) {
  return getSegmentCircleIntersections(cx, cy, r, ox, oy, dx * 999999, dy * 999999);
}
var PI$1 = Math.PI;
var PI2 = PI$1 * 2;
var MIN_ANGLE = PI$1 / 24;
function getBoxToBoxArrow(x0, y0, w0, h0, x1, y1, w1, h1, options) {
  if (options === void 0) {
    options = {};
  }
  var sx, sy, ex, ey;
  var _options = options, _options$bow = _options.bow, bow = _options$bow === void 0 ? 0 : _options$bow, _options$stretch = _options.stretch, stretch = _options$stretch === void 0 ? 0.25 : _options$stretch, _options$stretchMin = _options.stretchMin, stretchMin = _options$stretchMin === void 0 ? 50 : _options$stretchMin, _options$stretchMax = _options.stretchMax, stretchMax = _options$stretchMax === void 0 ? 420 : _options$stretchMax, _options$padStart = _options.padStart, padStart = _options$padStart === void 0 ? 0 : _options$padStart, _options$padEnd = _options.padEnd, padEnd = _options$padEnd === void 0 ? 20 : _options$padEnd, _options$flip = _options.flip, flip = _options$flip === void 0 ? false : _options$flip, _options$straights = _options.straights, straights = _options$straights === void 0 ? true : _options$straights;
  var px0 = x0 - padStart, py0 = y0 - padStart, pw0 = w0 + padStart * 2, ph0 = h0 + padStart * 2, px1 = x1 - padEnd, py1 = y1 - padEnd, pw1 = w1 + padEnd * 2, ph1 = h1 + padEnd * 2, cx0 = x0 + w0 / 2, cy0 = y0 + h0 / 2, cx1 = x1 + w1 / 2, cy1 = y1 + h1 / 2;
  var angle = normalizeAngle(getAngle(cx0, cy0, cx1, cy1));
  var distance = getDistance(cx0, cy0, cx1, cy1);
  if (distance === 0) {
    var _sx = cx0, _sy = py0;
    var _ex = cx1, _ey = py1;
    var _getPointBetween = getPointBetween(_sx, _sy, _ex, _ey, 0.5), cx = _getPointBetween[0], cy = _getPointBetween[1];
    var ca = getAngle(_sx, _sy, _ex, _ey);
    return [_sx, _sy, cx, cy, _ex, _ey, ca, ca, ca];
  }
  var rot = (getSector(angle) % 2 === 0 ? -1 : 1) * (flip ? -1 : 1);
  var card = getIntermediate(angle);
  if (card < 1 && card > 0.85)
    card = 0.99;
  var isColliding = doRectanglesCollide(px0, py0, pw0, ph0, px1, py1, pw1, ph1);
  var _getLineBetweenRounde = getLineBetweenRoundedRectangles(px0, py0, pw0, ph0, padStart, px1, py1, pw1, ph1, padEnd), dix0 = _getLineBetweenRounde[0], diy0 = _getLineBetweenRounde[1], dix1 = _getLineBetweenRounde[2], diy1 = _getLineBetweenRounde[3];
  var distanceBetween = getDistance(dix0, diy0, dix1, diy1);
  if (!isColliding && straights && card % 0.5 === 0) {
    var _getPointBetween2 = getPointBetween(dix0, diy0, dix1, diy1, 0.5), mpdx = _getPointBetween2[0], mpdy = _getPointBetween2[1];
    return [dix0, diy0, mpdx, mpdy, dix1, diy1, angle, angle - PI$1, angle];
  }
  var overlapEffect = isColliding ? modulate(distanceBetween, [0, distance], [0, 1], true) : 0;
  var distEffect = 1 - distanceBetween / distance;
  var stretchEffect = modulate(distanceBetween, [stretchMin, stretchMax], [1, 0], true);
  var arc = bow + stretchEffect * stretch;
  var angleOffset = modulate(
    card * card,
    [0, 1],
    [PI$1 * 0.125, 0],
    true
  );
  var distOffset = isColliding ? PI$1 * 0.5 * card : modulate(
    distEffect,
    [0.75, 1],
    [0, PI$1 * 0.5],
    true
  ) * card;
  var combinedOffset = distOffset + angleOffset * (isColliding ? 1 - overlapEffect : 1);
  var finalAngle0 = overlapEffect >= 0.5 ? angle + PI$1 * rot : angle + Math.max(MIN_ANGLE, combinedOffset) * rot;
  var _getDelta = getDelta(+(finalAngle0 % PI2).toPrecision(3)), dx0 = _getDelta[0], dy0 = _getDelta[1];
  var _getRayRoundedRectang = getRayRoundedRectangleIntersection(cx0, cy0, dx0, dy0, px0, py0, pw0, ph0, padStart), _getRayRoundedRectang2 = _getRayRoundedRectang[0], tsx = _getRayRoundedRectang2[0], tsy = _getRayRoundedRectang2[1];
  var startSeg = getRectangleSegmentIntersectedByRay(px0, py0, pw0, ph0, cx0, cy0, dx0, dy0);
  if (!startSeg)
    throw Error;
  var ssx0 = startSeg[0], ssy0 = startSeg[1], ssx1 = startSeg[2], ssy1 = startSeg[3];
  var _getPointBetween3 = getPointBetween(ssx0, ssy0, ssx1, ssy1, 0.5), smpx = _getPointBetween3[0], smpy = _getPointBetween3[1];
  var _getPointBetween4 = getPointBetween(tsx, tsy, smpx, smpy, isColliding ? Math.max(overlapEffect, 0.15) : 0.15);
  sx = _getPointBetween4[0];
  sy = _getPointBetween4[1];
  arc *= 1 + (Math.max(-2, Math.min(distEffect, 2)) * card - overlapEffect) / 2;
  if (isColliding) {
    arc = arc < 0 ? Math.min(arc, -0.5) : Math.max(arc, 0.5);
  }
  if (overlapEffect >= 0.5) {
    var rayAngle = getAngle(cx0, cy0, smpx, smpy);
    var _getDelta2 = getDelta(rayAngle), dx1 = _getDelta2[0], dy1 = _getDelta2[1];
    var _getRayRoundedRectang3 = getRayRoundedRectangleIntersection(cx1, cy1, dx1, dy1, px1, py1, pw1, ph1, padEnd);
    var _getRayRoundedRectang4 = _getRayRoundedRectang3[0];
    ex = _getRayRoundedRectang4[0];
    ey = _getRayRoundedRectang4[1];
  } else {
    var distOffset1 = modulate(distEffect, [0.75, 1], [0, 1], true);
    var overlapEffect1 = isColliding ? modulate(overlapEffect, [0, 1], [0, PI$1 / 8], true) : 0;
    var cardEffect1 = modulate(card * distOffset1, [0, 1], [0, PI$1 / 16], true);
    var _combinedOffset = distEffect * (PI$1 / 12) + (cardEffect1 + overlapEffect1) + (distOffset + angleOffset) / 2;
    var finalAngle1 = overlapEffect >= 0.5 ? angle + PI$1 * rot : angle + PI$1 - Math.max(_combinedOffset, MIN_ANGLE) * rot;
    var _getDelta3 = getDelta(+(finalAngle1 % PI2).toPrecision(3)), _dx = _getDelta3[0], _dy = _getDelta3[1];
    var _getRayRoundedRectang5 = getRayRoundedRectangleIntersection(cx1, cy1, _dx, _dy, px1, py1, pw1, ph1, padEnd), _getRayRoundedRectang6 = _getRayRoundedRectang5[0], tex = _getRayRoundedRectang6[0], tey = _getRayRoundedRectang6[1];
    var endSeg = getRectangleSegmentIntersectedByRay(px1, py1, pw1, ph1, cx1, cy1, _dx, _dy);
    if (!endSeg)
      throw Error;
    var sex0 = endSeg[0], sey0 = endSeg[1], sex1 = endSeg[2], sey1 = endSeg[3];
    var _getPointBetween5 = getPointBetween(sex0, sey0, sex1, sey1, 0.5), empx = _getPointBetween5[0], empy = _getPointBetween5[1];
    var _getPointBetween6 = getPointBetween(tex, tey, empx, empy, 0.25 + overlapEffect * 0.25);
    ex = _getPointBetween6[0];
    ey = _getPointBetween6[1];
  }
  var _getPointBetween7 = getPointBetween(sx, sy, ex, ey, 0.5), mx1 = _getPointBetween7[0], my1 = _getPointBetween7[1];
  var _getPointBetween8 = getPointBetween(
    sx,
    sy,
    ex,
    ey,
    Math.max(-1, Math.min(1, 0.5 + arc))
  ), tix = _getPointBetween8[0], tiy = _getPointBetween8[1];
  var _rotatePoint = rotatePoint(tix, tiy, mx1, my1, PI$1 / 2 * rot), cixA = _rotatePoint[0], ciyA = _rotatePoint[1];
  var _rotatePoint2 = rotatePoint(tix, tiy, mx1, my1, PI$1 / 2 * -rot), cixB = _rotatePoint2[0], ciyB = _rotatePoint2[1];
  var _ref = isColliding && getDistance(cixA, ciyA, cx1, cy1) < getDistance(cixB, ciyB, cx1, cy1) ? [cixB, ciyB] : [cixA, ciyA], cix = _ref[0], ciy = _ref[1];
  var as = getAngle(cix, ciy, sx, sy);
  var ae = getAngle(cix, ciy, ex, ey);
  return [sx, sy, cix, ciy, ex, ey, ae, as, getAngle(sx, sy, ex, ey)];
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function quintOut(t) {
  return --t * t * t * t * t + 1;
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b)
      throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t) => new Date(a + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t) => a + t * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let { delay = 0, duration = 400, easing = identity, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
function clickOutside(node, { enabled: initialEnabled, handleUnselect }) {
  const handleOutsideClick = ({ target }) => {
    if (node !== target && node.parentElement != target.parentElement && !node.contains(target)) {
      console.log("handleUnselect", node !== target, node.parentElement != target.parentElement);
      handleUnselect();
    }
  };
  function update({ enabled }) {
    if (enabled) {
      window.addEventListener("click", handleOutsideClick);
    } else {
      window.removeEventListener("click", handleOutsideClick);
    }
  }
  update({ enabled: initialEnabled });
  return {
    update,
    destroy() {
      window.removeEventListener("click", handleOutsideClick);
    }
  };
}
const Link_svelte_svelte_type_style_lang = "";
const get_endPoint_slot_changes = (dirty) => ({
  sx: dirty[0] & 8192,
  sy: dirty[0] & 16384,
  ex: dirty[0] & 131072,
  ey: dirty[0] & 262144,
  pointer: dirty[0] & 4096
});
const get_endPoint_slot_context = (ctx) => ({
  sx: ctx[13],
  sy: ctx[14],
  ex: ctx[17],
  ey: ctx[18],
  pointer: ctx[12]
});
const get_startPoint_slot_changes = (dirty) => ({
  sx: dirty[0] & 8192,
  sy: dirty[0] & 16384,
  ex: dirty[0] & 131072,
  ey: dirty[0] & 262144,
  as: dirty[0] & 524288
});
const get_startPoint_slot_context = (ctx) => ({
  sx: ctx[13],
  sy: ctx[14],
  ex: ctx[17],
  ey: ctx[18],
  as: ctx[19]
});
function create_if_block$5(ctx) {
  let g;
  let path;
  let path_id_value;
  let clickOutside_action;
  let if_block0_anchor;
  let current;
  let mounted;
  let dispose;
  function select_block_type(ctx2, dirty) {
    if (ctx2[13] < ctx2[17])
      return create_if_block_3$2;
    return create_else_block$1;
  }
  let current_block_type = select_block_type(ctx);
  let if_block0 = current_block_type(ctx);
  const startPoint_slot_template = ctx[26].startPoint;
  const startPoint_slot = create_slot(startPoint_slot_template, ctx, ctx[25], get_startPoint_slot_context);
  const startPoint_slot_or_fallback = startPoint_slot || fallback_block_1(ctx);
  const endPoint_slot_template = ctx[26].endPoint;
  const endPoint_slot = create_slot(endPoint_slot_template, ctx, ctx[25], get_endPoint_slot_context);
  const endPoint_slot_or_fallback = endPoint_slot || fallback_block$4(ctx);
  let if_block1 = ctx[9] && create_if_block_1$2(ctx);
  return {
    c() {
      g = svg_element("g");
      path = svg_element("path");
      if_block0.c();
      if_block0_anchor = empty();
      if (startPoint_slot_or_fallback)
        startPoint_slot_or_fallback.c();
      if (endPoint_slot_or_fallback)
        endPoint_slot_or_fallback.c();
      if (if_block1)
        if_block1.c();
      this.h();
    },
    l(nodes) {
      g = claim_svg_element(nodes, "g", { stroke: true, "stroke-opacity": true });
      var g_nodes = children(g);
      path = claim_svg_element(g_nodes, "path", {
        style: true,
        d: true,
        id: true,
        "stroke-width": true,
        stroke: true,
        fill: true,
        "stroke-linecap": true,
        "stroke-opacity": true
      });
      children(path).forEach(detach);
      if_block0.l(g_nodes);
      if_block0_anchor = empty();
      if (startPoint_slot_or_fallback)
        startPoint_slot_or_fallback.l(g_nodes);
      if (endPoint_slot_or_fallback)
        endPoint_slot_or_fallback.l(g_nodes);
      if (if_block1)
        if_block1.l(g_nodes);
      g_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_style(path, "pointer-events", "stroke");
      set_style(path, "user-select", "none");
      set_style(path, "outline", "none");
      attr(path, "d", ctx[11]);
      attr(path, "id", path_id_value = ctx[1].id);
      attr(path, "stroke-width", ctx[0]);
      attr(path, "stroke", ctx[2]);
      attr(path, "fill", "none");
      attr(path, "stroke-linecap", "round");
      attr(path, "stroke-opacity", ctx[4]);
      attr(g, "stroke", ctx[6]);
      attr(g, "stroke-opacity", ctx[5]);
    },
    m(target, anchor) {
      insert_hydration(target, g, anchor);
      append_hydration(g, path);
      if_block0.m(g, null);
      append_hydration(g, if_block0_anchor);
      if (startPoint_slot_or_fallback) {
        startPoint_slot_or_fallback.m(g, null);
      }
      if (endPoint_slot_or_fallback) {
        endPoint_slot_or_fallback.m(g, null);
      }
      if (if_block1)
        if_block1.m(g, null);
      current = true;
      if (!mounted) {
        dispose = [
          listen(path, "click", ctx[27]),
          listen(path, "mouseover", ctx[21]),
          listen(path, "mouseout", ctx[22]),
          listen(path, "focus", ctx[21]),
          listen(path, "blur", ctx[22]),
          action_destroyer(clickOutside_action = clickOutside.call(null, path, {
            enabled: ctx[9],
            handleUnselect: ctx[23]
          }))
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!current || dirty[0] & 2048) {
        attr(path, "d", ctx2[11]);
      }
      if (!current || dirty[0] & 2 && path_id_value !== (path_id_value = ctx2[1].id)) {
        attr(path, "id", path_id_value);
      }
      if (!current || dirty[0] & 1) {
        attr(path, "stroke-width", ctx2[0]);
      }
      if (!current || dirty[0] & 4) {
        attr(path, "stroke", ctx2[2]);
      }
      if (!current || dirty[0] & 16) {
        attr(path, "stroke-opacity", ctx2[4]);
      }
      if (clickOutside_action && is_function(clickOutside_action.update) && dirty[0] & 512)
        clickOutside_action.update.call(null, {
          enabled: ctx2[9],
          handleUnselect: ctx2[23]
        });
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block0) {
        if_block0.p(ctx2, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx2);
        if (if_block0) {
          if_block0.c();
          if_block0.m(g, if_block0_anchor);
        }
      }
      if (startPoint_slot) {
        if (startPoint_slot.p && (!current || dirty[0] & 34496512)) {
          update_slot_base(
            startPoint_slot,
            startPoint_slot_template,
            ctx2,
            ctx2[25],
            !current ? get_all_dirty_from_scope(ctx2[25]) : get_slot_changes(startPoint_slot_template, ctx2[25], dirty, get_startPoint_slot_changes),
            get_startPoint_slot_context
          );
        }
      } else {
        if (startPoint_slot_or_fallback && startPoint_slot_or_fallback.p && (!current || dirty[0] & 24576)) {
          startPoint_slot_or_fallback.p(ctx2, !current ? [-1, -1] : dirty);
        }
      }
      if (endPoint_slot) {
        if (endPoint_slot.p && (!current || dirty[0] & 33976320)) {
          update_slot_base(
            endPoint_slot,
            endPoint_slot_template,
            ctx2,
            ctx2[25],
            !current ? get_all_dirty_from_scope(ctx2[25]) : get_slot_changes(endPoint_slot_template, ctx2[25], dirty, get_endPoint_slot_changes),
            get_endPoint_slot_context
          );
        }
      } else {
        if (endPoint_slot_or_fallback && endPoint_slot_or_fallback.p && (!current || dirty[0] & 4104)) {
          endPoint_slot_or_fallback.p(ctx2, !current ? [-1, -1] : dirty);
        }
      }
      if (ctx2[9]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block_1$2(ctx2);
          if_block1.c();
          if_block1.m(g, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (!current || dirty[0] & 64) {
        attr(g, "stroke", ctx2[6]);
      }
      if (!current || dirty[0] & 32) {
        attr(g, "stroke-opacity", ctx2[5]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(startPoint_slot_or_fallback, local);
      transition_in(endPoint_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(startPoint_slot_or_fallback, local);
      transition_out(endPoint_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(g);
      if_block0.d();
      if (startPoint_slot_or_fallback)
        startPoint_slot_or_fallback.d(detaching);
      if (endPoint_slot_or_fallback)
        endPoint_slot_or_fallback.d(detaching);
      if (if_block1)
        if_block1.d();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_else_block$1(ctx) {
  var _a, _b, _c, _d, _e, _f;
  let text_1;
  let tspan;
  let t0_value = (((_c = (_b = (_a = ctx[1]) == null ? void 0 : _a.opts) == null ? void 0 : _b.label) == null ? void 0 : _c.enabled) ? (_f = (_e = (_d = ctx[1]) == null ? void 0 : _d.opts) == null ? void 0 : _e.label) == null ? void 0 : _f.value : "") + "";
  let t0;
  let t1;
  return {
    c() {
      text_1 = svg_element("text");
      tspan = svg_element("tspan");
      t0 = text(t0_value);
      t1 = space();
      this.h();
    },
    l(nodes) {
      text_1 = claim_svg_element(nodes, "text", { x: true, y: true, class: true });
      var text_1_nodes = children(text_1);
      tspan = claim_svg_element(text_1_nodes, "tspan", { fill: true, class: true });
      var tspan_nodes = children(tspan);
      t0 = claim_text(tspan_nodes, t0_value);
      tspan_nodes.forEach(detach);
      t1 = claim_space(text_1_nodes);
      text_1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(tspan, "fill", "black");
      attr(tspan, "class", "svelte-1fj6p42");
      attr(text_1, "x", ctx[15]);
      attr(text_1, "y", ctx[16]);
      attr(text_1, "class", "svelte-1fj6p42");
    },
    m(target, anchor) {
      insert_hydration(target, text_1, anchor);
      append_hydration(text_1, tspan);
      append_hydration(tspan, t0);
      append_hydration(text_1, t1);
    },
    p(ctx2, dirty) {
      var _a2, _b2, _c2, _d2, _e2, _f2;
      if (dirty[0] & 2 && t0_value !== (t0_value = (((_c2 = (_b2 = (_a2 = ctx2[1]) == null ? void 0 : _a2.opts) == null ? void 0 : _b2.label) == null ? void 0 : _c2.enabled) ? (_f2 = (_e2 = (_d2 = ctx2[1]) == null ? void 0 : _d2.opts) == null ? void 0 : _e2.label) == null ? void 0 : _f2.value : "") + ""))
        set_data(t0, t0_value);
      if (dirty[0] & 32768) {
        attr(text_1, "x", ctx2[15]);
      }
      if (dirty[0] & 65536) {
        attr(text_1, "y", ctx2[16]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(text_1);
    }
  };
}
function create_if_block_3$2(ctx) {
  var _a, _b, _c, _d, _e, _f;
  let text_1;
  let textPath;
  let tspan;
  let t0_value = (((_c = (_b = (_a = ctx[1]) == null ? void 0 : _a.opts) == null ? void 0 : _b.label) == null ? void 0 : _c.enabled) ? (_f = (_e = (_d = ctx[1]) == null ? void 0 : _d.opts) == null ? void 0 : _e.label) == null ? void 0 : _f.value : "") + "";
  let t0;
  let t1;
  let textPath_xlink_href_value;
  let textPath_startOffset_value;
  return {
    c() {
      text_1 = svg_element("text");
      textPath = svg_element("textPath");
      tspan = svg_element("tspan");
      t0 = text(t0_value);
      t1 = space();
      this.h();
    },
    l(nodes) {
      text_1 = claim_svg_element(nodes, "text", { class: true });
      var text_1_nodes = children(text_1);
      textPath = claim_svg_element(text_1_nodes, "textPath", { "xlink:href": true, startOffset: true });
      var textPath_nodes = children(textPath);
      tspan = claim_svg_element(textPath_nodes, "tspan", { fill: true, class: true });
      var tspan_nodes = children(tspan);
      t0 = claim_text(tspan_nodes, t0_value);
      tspan_nodes.forEach(detach);
      t1 = claim_space(textPath_nodes);
      textPath_nodes.forEach(detach);
      text_1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(tspan, "fill", "black");
      attr(tspan, "class", "svelte-1fj6p42");
      xlink_attr(textPath, "xlink:href", textPath_xlink_href_value = "#" + ctx[1].id);
      attr(textPath, "startOffset", textPath_startOffset_value = ctx[7] + "%");
      attr(text_1, "class", "svelte-1fj6p42");
    },
    m(target, anchor) {
      insert_hydration(target, text_1, anchor);
      append_hydration(text_1, textPath);
      append_hydration(textPath, tspan);
      append_hydration(tspan, t0);
      append_hydration(textPath, t1);
    },
    p(ctx2, dirty) {
      var _a2, _b2, _c2, _d2, _e2, _f2;
      if (dirty[0] & 2 && t0_value !== (t0_value = (((_c2 = (_b2 = (_a2 = ctx2[1]) == null ? void 0 : _a2.opts) == null ? void 0 : _b2.label) == null ? void 0 : _c2.enabled) ? (_f2 = (_e2 = (_d2 = ctx2[1]) == null ? void 0 : _d2.opts) == null ? void 0 : _e2.label) == null ? void 0 : _f2.value : "") + ""))
        set_data(t0, t0_value);
      if (dirty[0] & 2 && textPath_xlink_href_value !== (textPath_xlink_href_value = "#" + ctx2[1].id)) {
        xlink_attr(textPath, "xlink:href", textPath_xlink_href_value);
      }
      if (dirty[0] & 128 && textPath_startOffset_value !== (textPath_startOffset_value = ctx2[7] + "%")) {
        attr(textPath, "startOffset", textPath_startOffset_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(text_1);
    }
  };
}
function fallback_block_1(ctx) {
  let circle;
  return {
    c() {
      circle = svg_element("circle");
      this.h();
    },
    l(nodes) {
      circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
      children(circle).forEach(detach);
      this.h();
    },
    h() {
      attr(circle, "cx", ctx[13]);
      attr(circle, "cy", ctx[14]);
      attr(circle, "r", 4);
    },
    m(target, anchor) {
      insert_hydration(target, circle, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 8192) {
        attr(circle, "cx", ctx2[13]);
      }
      if (dirty[0] & 16384) {
        attr(circle, "cy", ctx2[14]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(circle);
    }
  };
}
function create_if_block_2$2(ctx) {
  let polygon;
  return {
    c() {
      polygon = svg_element("polygon");
      this.h();
    },
    l(nodes) {
      polygon = claim_svg_element(nodes, "polygon", {
        points: true,
        transform: true,
        fill: true
      });
      children(polygon).forEach(detach);
      this.h();
    },
    h() {
      attr(polygon, "points", "0,-6 12,0, 0,6");
      attr(polygon, "transform", ctx[12]);
      attr(polygon, "fill", ctx[3]);
    },
    m(target, anchor) {
      insert_hydration(target, polygon, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & 4096) {
        attr(polygon, "transform", ctx2[12]);
      }
      if (dirty[0] & 8) {
        attr(polygon, "fill", ctx2[3]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(polygon);
    }
  };
}
function fallback_block$4(ctx) {
  let if_block_anchor;
  let if_block = ctx[12] && create_if_block_2$2(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (ctx2[12]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_2$2(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block_1$2(ctx) {
  let circle;
  let foreignObject;
  let div;
  let t;
  let mounted;
  let dispose;
  return {
    c() {
      circle = svg_element("circle");
      foreignObject = svg_element("foreignObject");
      div = element("div");
      t = text("X");
      this.h();
    },
    l(nodes) {
      circle = claim_svg_element(nodes, "circle", {
        cx: true,
        cy: true,
        r: true,
        fill: true,
        stroke: true
      });
      children(circle).forEach(detach);
      foreignObject = claim_svg_element(nodes, "foreignObject", { class: true, x: true, y: true });
      var foreignObject_nodes = children(foreignObject);
      div = claim_element(foreignObject_nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      t = claim_text(div_nodes, "X");
      div_nodes.forEach(detach);
      foreignObject_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(circle, "cx", ctx[17]);
      attr(circle, "cy", ctx[18]);
      attr(circle, "r", 12);
      attr(circle, "fill", "none");
      attr(circle, "stroke", "blue");
      attr(div, "class", "w-24 h-24 font-mono text-red-500 text-2xl cursor-pointer");
      set_style(div, "font-family", "'Luckiest Guy'");
      attr(foreignObject, "class", "overflow-visible pointer-events-auto relative");
      attr(foreignObject, "x", ctx[15]);
      attr(foreignObject, "y", ctx[16]);
    },
    m(target, anchor) {
      insert_hydration(target, circle, anchor);
      insert_hydration(target, foreignObject, anchor);
      append_hydration(foreignObject, div);
      append_hydration(div, t);
      if (!mounted) {
        dispose = listen(div, "click", ctx[28]);
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & 131072) {
        attr(circle, "cx", ctx2[17]);
      }
      if (dirty[0] & 262144) {
        attr(circle, "cy", ctx2[18]);
      }
      if (dirty[0] & 32768) {
        attr(foreignObject, "x", ctx2[15]);
      }
      if (dirty[0] & 65536) {
        attr(foreignObject, "y", ctx2[16]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(circle);
      if (detaching)
        detach(foreignObject);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$9(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[1] && ctx[10] && create_if_block$5(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (ctx2[1] && ctx2[10]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & 1026) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$5(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function getCoords(elem) {
  let box = elem.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}
function instance$9($$self, $$props, $$invalidate) {
  let $stroke, $$unsubscribe_stroke = noop$1, $$subscribe_stroke = () => ($$unsubscribe_stroke(), $$unsubscribe_stroke = subscribe(stroke, ($$value) => $$invalidate(24, $stroke = $$value)), stroke);
  $$self.$$.on_destroy.push(() => $$unsubscribe_stroke());
  let { $$slots: slots = {}, $$scope } = $$props;
  let { link } = $$props;
  let { strokeColor = link == null ? void 0 : link.strokeColor } = $$props;
  let { strokeWidth = 1 } = $$props;
  let { arrowColor = "green" } = $$props;
  let { strokeOpacity = "0.3" } = $$props;
  let { groupStrokeOpacity = "0.1" } = $$props;
  let { groupStrokeColor = "white" } = $$props;
  let { textStartOffset = 20 } = $$props;
  const dispatch = createEventDispatcher();
  let initialStrokeWidth = strokeWidth;
  let stroke;
  let selected = false;
  let mounted = false;
  onMount(() => {
    $$invalidate(10, mounted = true);
  });
  let d, pointer;
  let options = {};
  let x0, y0, w0, h0, x1, y1, w1, h1;
  let sx, sy, cx, cy, ex, ey, ae, as, ac;
  function genArrow(link2) {
    let sourceEl = document.getElementById(link2.source.id);
    let targetEl = document.getElementById(link2.target.id);
    let canvasEl = document.querySelector(`[data-canvas]`);
    if (!sourceEl || !targetEl)
      return;
    x0 = getCoords(sourceEl).left - (canvasEl.offsetLeft || 0);
    y0 = getCoords(sourceEl).top - (canvasEl.offsetTop || 0);
    x1 = getCoords(targetEl).left - (canvasEl.offsetLeft || 0);
    y1 = getCoords(targetEl).top - (canvasEl.offsetTop || 0);
    w0 = sourceEl.offsetWidth;
    h0 = sourceEl.offsetHeight;
    w1 = targetEl.offsetWidth;
    h1 = targetEl.offsetHeight;
    const arrow = getBoxToBoxArrow(x0, y0, w0, h0, x1, y1, w1, h1, options);
    $$invalidate(13, [sx, sy, cx, cy, ex, ey, ae, as, ac] = arrow, sx, $$invalidate(14, sy), $$invalidate(15, cx), $$invalidate(16, cy), $$invalidate(17, ex), $$invalidate(18, ey), $$invalidate(19, as));
    $$invalidate(11, d = `M${sx},${sy} Q${cx},${cy} ${ex},${ey}`);
    let endAngleAsDegrees = ae * (180 / Math.PI);
    $$invalidate(12, pointer = `translate(${ex},${ey}) rotate(${endAngleAsDegrees})`);
  }
  function handleMouseOver(e) {
    console.log("over", strokeWidth);
    $$invalidate(0, strokeWidth = initialStrokeWidth * 20);
  }
  function handleMouseOut(e) {
    $$subscribe_stroke($$invalidate(8, stroke = tweened(strokeWidth, { duration: 1750 })));
    set_store_value(stroke, $stroke = initialStrokeWidth, $stroke);
  }
  function handleUnselect(e) {
    $$invalidate(9, selected = false);
  }
  const click_handler = () => $$invalidate(9, selected = !selected);
  const click_handler_1 = () => dispatch("removeLink", link.id);
  $$self.$$set = ($$props2) => {
    if ("link" in $$props2)
      $$invalidate(1, link = $$props2.link);
    if ("strokeColor" in $$props2)
      $$invalidate(2, strokeColor = $$props2.strokeColor);
    if ("strokeWidth" in $$props2)
      $$invalidate(0, strokeWidth = $$props2.strokeWidth);
    if ("arrowColor" in $$props2)
      $$invalidate(3, arrowColor = $$props2.arrowColor);
    if ("strokeOpacity" in $$props2)
      $$invalidate(4, strokeOpacity = $$props2.strokeOpacity);
    if ("groupStrokeOpacity" in $$props2)
      $$invalidate(5, groupStrokeOpacity = $$props2.groupStrokeOpacity);
    if ("groupStrokeColor" in $$props2)
      $$invalidate(6, groupStrokeColor = $$props2.groupStrokeColor);
    if ("textStartOffset" in $$props2)
      $$invalidate(7, textStartOffset = $$props2.textStartOffset);
    if ("$$scope" in $$props2)
      $$invalidate(25, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & 2) {
      if (link)
        genArrow(link);
    }
    if ($$self.$$.dirty[0] & 16777216) {
      if ($stroke > initialStrokeWidth) {
        $$invalidate(0, strokeWidth = $stroke);
      }
    }
  };
  return [
    strokeWidth,
    link,
    strokeColor,
    arrowColor,
    strokeOpacity,
    groupStrokeOpacity,
    groupStrokeColor,
    textStartOffset,
    stroke,
    selected,
    mounted,
    d,
    pointer,
    sx,
    sy,
    cx,
    cy,
    ex,
    ey,
    as,
    dispatch,
    handleMouseOver,
    handleMouseOut,
    handleUnselect,
    $stroke,
    $$scope,
    slots,
    click_handler,
    click_handler_1
  ];
}
class Link extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$9,
      create_fragment$9,
      safe_not_equal,
      {
        link: 1,
        strokeColor: 2,
        strokeWidth: 0,
        arrowColor: 3,
        strokeOpacity: 4,
        groupStrokeOpacity: 5,
        groupStrokeColor: 6,
        textStartOffset: 7
      },
      null,
      [-1, -1]
    );
  }
}
const Links_svelte_svelte_type_style_lang = "";
function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  return child_ctx;
}
function create_if_block$4(ctx) {
  let svg;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let current;
  let each_value = ctx[0];
  const get_key = (ctx2) => ctx2[10].id;
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context$2(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
  }
  return {
    c() {
      svg = svg_element("svg");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      svg = claim_svg_element(nodes, "svg", { style: true, class: true });
      var svg_nodes = children(svg);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(svg_nodes);
      }
      svg_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_style(svg, "pointer-events", "none");
      attr(svg, "class", "svelte-s6duoo");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(svg, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & 516607) {
        each_value = ctx2[0];
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, svg, outro_and_destroy_block, create_each_block$2, null, get_each_context$2);
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(svg);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
    }
  };
}
function create_if_block_1$1(ctx) {
  let link;
  let current;
  link = new Link({
    props: {
      link: ctx[10],
      strokeColor: ctx[1],
      strokeWidth: ctx[2],
      arrowColor: ctx[3],
      strokeOpacity: ctx[4],
      groupStrokeOpacity: ctx[5],
      groupStrokeColor: ctx[6],
      textStartOffset: ctx[7],
      $$slots: {
        endPoint: [
          create_endPoint_slot,
          ({ sx, sy, ex, ey, as, pointer }) => ({
            13: sx,
            14: sy,
            15: ex,
            16: ey,
            17: as,
            18: pointer
          }),
          ({ sx, sy, ex, ey, as, pointer }) => (sx ? 8192 : 0) | (sy ? 16384 : 0) | (ex ? 32768 : 0) | (ey ? 65536 : 0) | (as ? 131072 : 0) | (pointer ? 262144 : 0)
        ],
        startPoint: [
          create_startPoint_slot,
          ({ sx, sy, ex, ey, as }) => ({ 13: sx, 14: sy, 15: ex, 16: ey, 17: as }),
          ({ sx, sy, ex, ey, as }) => (sx ? 8192 : 0) | (sy ? 16384 : 0) | (ex ? 32768 : 0) | (ey ? 65536 : 0) | (as ? 131072 : 0)
        ]
      },
      $$scope: { ctx }
    }
  });
  link.$on("removeLink", ctx[9]);
  return {
    c() {
      create_component(link.$$.fragment);
    },
    l(nodes) {
      claim_component(link.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(link, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const link_changes = {};
      if (dirty & 1)
        link_changes.link = ctx2[10];
      if (dirty & 2)
        link_changes.strokeColor = ctx2[1];
      if (dirty & 4)
        link_changes.strokeWidth = ctx2[2];
      if (dirty & 8)
        link_changes.arrowColor = ctx2[3];
      if (dirty & 16)
        link_changes.strokeOpacity = ctx2[4];
      if (dirty & 32)
        link_changes.groupStrokeOpacity = ctx2[5];
      if (dirty & 64)
        link_changes.groupStrokeColor = ctx2[6];
      if (dirty & 128)
        link_changes.textStartOffset = ctx2[7];
      if (dirty & 1040393) {
        link_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link.$set(link_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(link.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(link.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(link, detaching);
    }
  };
}
function create_else_block_1(ctx) {
  let circle;
  let circle_cx_value;
  let circle_cy_value;
  return {
    c() {
      circle = svg_element("circle");
      this.h();
    },
    l(nodes) {
      circle = claim_svg_element(nodes, "circle", { cx: true, cy: true, r: true });
      children(circle).forEach(detach);
      this.h();
    },
    h() {
      attr(circle, "cx", circle_cx_value = ctx[13]);
      attr(circle, "cy", circle_cy_value = ctx[14]);
      attr(circle, "r", 4);
    },
    m(target, anchor) {
      insert_hydration(target, circle, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 8192 && circle_cx_value !== (circle_cx_value = ctx2[13])) {
        attr(circle, "cx", circle_cx_value);
      }
      if (dirty & 16384 && circle_cy_value !== (circle_cy_value = ctx2[14])) {
        attr(circle, "cy", circle_cy_value);
      }
    },
    i: noop$1,
    o: noop$1,
    d(detaching) {
      if (detaching)
        detach(circle);
    }
  };
}
function create_if_block_4(ctx) {
  let foreignObject;
  let switch_instance;
  let foreignObject_x_value;
  let foreignObject_y_value;
  let current;
  var switch_value = ctx[10].source.startPoint;
  function switch_props(ctx2) {
    return {
      props: {
        sx: ctx2[13],
        sy: ctx2[14],
        ex: ctx2[15],
        ey: ctx2[16],
        as: ctx2[17]
      }
    };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      foreignObject = svg_element("foreignObject");
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      this.h();
    },
    l(nodes) {
      foreignObject = claim_svg_element(nodes, "foreignObject", { class: true, x: true, y: true });
      var foreignObject_nodes = children(foreignObject);
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, foreignObject_nodes);
      foreignObject_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(foreignObject, "class", "overflow-visible pointer-events-auto relative");
      attr(foreignObject, "x", foreignObject_x_value = ctx[13]);
      attr(foreignObject, "y", foreignObject_y_value = ctx[14]);
    },
    m(target, anchor) {
      insert_hydration(target, foreignObject, anchor);
      if (switch_instance) {
        mount_component(switch_instance, foreignObject, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = {};
      if (dirty & 8192)
        switch_instance_changes.sx = ctx2[13];
      if (dirty & 16384)
        switch_instance_changes.sy = ctx2[14];
      if (dirty & 32768)
        switch_instance_changes.ex = ctx2[15];
      if (dirty & 65536)
        switch_instance_changes.ey = ctx2[16];
      if (dirty & 131072)
        switch_instance_changes.as = ctx2[17];
      if (switch_value !== (switch_value = ctx2[10].source.startPoint)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, foreignObject, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
      if (!current || dirty & 8192 && foreignObject_x_value !== (foreignObject_x_value = ctx2[13])) {
        attr(foreignObject, "x", foreignObject_x_value);
      }
      if (!current || dirty & 16384 && foreignObject_y_value !== (foreignObject_y_value = ctx2[14])) {
        attr(foreignObject, "y", foreignObject_y_value);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(foreignObject);
      if (switch_instance)
        destroy_component(switch_instance);
    }
  };
}
function create_startPoint_slot(ctx) {
  let current_block_type_index;
  let if_block;
  let t;
  let current;
  const if_block_creators = [create_if_block_4, create_else_block_1];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    var _a, _b;
    if ((_b = (_a = ctx2[10]) == null ? void 0 : _a.source) == null ? void 0 : _b.startPoint)
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      t = space();
    },
    l(nodes) {
      if_block.l(nodes);
      t = claim_space(nodes);
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, t, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(t.parentNode, t);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(t);
    }
  };
}
function create_else_block(ctx) {
  let if_block_anchor;
  let if_block = ctx[18] && create_if_block_3$1(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (ctx2[18]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_3$1(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop$1,
    o: noop$1,
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block_2$1(ctx) {
  let foreignObject;
  let switch_instance;
  let foreignObject_x_value;
  let foreignObject_y_value;
  let current;
  var switch_value = ctx[10].source.startPoint;
  function switch_props(ctx2) {
    return {
      props: {
        sx: ctx2[13],
        sy: ctx2[14],
        ex: ctx2[15],
        ey: ctx2[16],
        as: ctx2[17]
      }
    };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      foreignObject = svg_element("foreignObject");
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      this.h();
    },
    l(nodes) {
      foreignObject = claim_svg_element(nodes, "foreignObject", { class: true, x: true, y: true });
      var foreignObject_nodes = children(foreignObject);
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, foreignObject_nodes);
      foreignObject_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(foreignObject, "class", "overflow-visible pointer-events-auto relative");
      attr(foreignObject, "x", foreignObject_x_value = ctx[13]);
      attr(foreignObject, "y", foreignObject_y_value = ctx[14]);
    },
    m(target, anchor) {
      insert_hydration(target, foreignObject, anchor);
      if (switch_instance) {
        mount_component(switch_instance, foreignObject, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = {};
      if (dirty & 8192)
        switch_instance_changes.sx = ctx2[13];
      if (dirty & 16384)
        switch_instance_changes.sy = ctx2[14];
      if (dirty & 32768)
        switch_instance_changes.ex = ctx2[15];
      if (dirty & 65536)
        switch_instance_changes.ey = ctx2[16];
      if (dirty & 131072)
        switch_instance_changes.as = ctx2[17];
      if (switch_value !== (switch_value = ctx2[10].source.startPoint)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, foreignObject, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
      if (!current || dirty & 8192 && foreignObject_x_value !== (foreignObject_x_value = ctx2[13])) {
        attr(foreignObject, "x", foreignObject_x_value);
      }
      if (!current || dirty & 16384 && foreignObject_y_value !== (foreignObject_y_value = ctx2[14])) {
        attr(foreignObject, "y", foreignObject_y_value);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(foreignObject);
      if (switch_instance)
        destroy_component(switch_instance);
    }
  };
}
function create_if_block_3$1(ctx) {
  let polygon;
  let polygon_transform_value;
  return {
    c() {
      polygon = svg_element("polygon");
      this.h();
    },
    l(nodes) {
      polygon = claim_svg_element(nodes, "polygon", {
        points: true,
        transform: true,
        fill: true
      });
      children(polygon).forEach(detach);
      this.h();
    },
    h() {
      attr(polygon, "points", "0,-6 12,0, 0,6");
      attr(polygon, "transform", polygon_transform_value = ctx[18]);
      attr(polygon, "fill", ctx[3]);
    },
    m(target, anchor) {
      insert_hydration(target, polygon, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 262144 && polygon_transform_value !== (polygon_transform_value = ctx2[18])) {
        attr(polygon, "transform", polygon_transform_value);
      }
      if (dirty & 8) {
        attr(polygon, "fill", ctx2[3]);
      }
    },
    d(detaching) {
      if (detaching)
        detach(polygon);
    }
  };
}
function create_endPoint_slot(ctx) {
  let current_block_type_index;
  let if_block;
  let t;
  let current;
  const if_block_creators = [create_if_block_2$1, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    var _a, _b;
    if ((_b = (_a = ctx2[10]) == null ? void 0 : _a.source) == null ? void 0 : _b.endPoint)
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      t = space();
    },
    l(nodes) {
      if_block.l(nodes);
      t = claim_space(nodes);
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, t, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(t.parentNode, t);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(t);
    }
  };
}
function create_each_block$2(key_1, ctx) {
  let first;
  let if_block_anchor;
  let current;
  let if_block = ctx[10] && ctx[8] && create_if_block_1$1(ctx);
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l(nodes) {
      first = empty();
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      this.first = first;
    },
    m(target, anchor) {
      insert_hydration(target, first, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (ctx[10] && ctx[8]) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty & 257) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$1(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(first);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_fragment$8(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[8] && ctx[0] && ctx[0].length > 0 && create_if_block$4(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[8] && ctx2[0] && ctx2[0].length > 0) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 257) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$4(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$8($$self, $$props, $$invalidate) {
  let { links } = $$props;
  let { strokeColor = "currentColor" } = $$props;
  let { strokeWidth = 1 } = $$props;
  let { arrowColor = "currentColor" } = $$props;
  let { strokeOpacity = "0.3" } = $$props;
  let { groupStrokeOpacity = "0.1" } = $$props;
  let { groupStrokeColor = "white" } = $$props;
  let { textStartOffset = 20 } = $$props;
  let mounted;
  onMount(() => {
    $$invalidate(8, mounted = true);
  });
  console.log("links", { links });
  function removeLink_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("links" in $$props2)
      $$invalidate(0, links = $$props2.links);
    if ("strokeColor" in $$props2)
      $$invalidate(1, strokeColor = $$props2.strokeColor);
    if ("strokeWidth" in $$props2)
      $$invalidate(2, strokeWidth = $$props2.strokeWidth);
    if ("arrowColor" in $$props2)
      $$invalidate(3, arrowColor = $$props2.arrowColor);
    if ("strokeOpacity" in $$props2)
      $$invalidate(4, strokeOpacity = $$props2.strokeOpacity);
    if ("groupStrokeOpacity" in $$props2)
      $$invalidate(5, groupStrokeOpacity = $$props2.groupStrokeOpacity);
    if ("groupStrokeColor" in $$props2)
      $$invalidate(6, groupStrokeColor = $$props2.groupStrokeColor);
    if ("textStartOffset" in $$props2)
      $$invalidate(7, textStartOffset = $$props2.textStartOffset);
  };
  return [
    links,
    strokeColor,
    strokeWidth,
    arrowColor,
    strokeOpacity,
    groupStrokeOpacity,
    groupStrokeColor,
    textStartOffset,
    mounted,
    removeLink_handler
  ];
}
class Links extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, {
      links: 0,
      strokeColor: 1,
      strokeWidth: 2,
      arrowColor: 3,
      strokeOpacity: 4,
      groupStrokeOpacity: 5,
      groupStrokeColor: 6,
      textStartOffset: 7
    });
  }
}
function create_if_block$3(ctx) {
  let current;
  const default_slot_template = ctx[7].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[6], null);
  const default_slot_or_fallback = default_slot || fallback_block$3(ctx);
  return {
    c() {
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
    },
    l(nodes) {
      if (default_slot_or_fallback)
        default_slot_or_fallback.l(nodes);
    },
    m(target, anchor) {
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 64)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[6],
            !current ? get_all_dirty_from_scope(ctx2[6]) : get_slot_changes(default_slot_template, ctx2[6], dirty, null),
            null
          );
        }
      } else {
        if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & 4)) {
          default_slot_or_fallback.p(ctx2, !current ? -1 : dirty);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
    }
  };
}
function fallback_block$3(ctx) {
  let div;
  let div_class_value;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { style: true, class: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      set_style(div, "transform", "translate(-50%, -50%)");
      attr(div, "class", div_class_value = "absolute border-[" + (ctx[2] + "em") + "] md:border-[" + (ctx[2] / 2 + "em") + "] border-yellow-200/40 ring-2 ring-black h-0 w-0 rounded-full");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 4 && div_class_value !== (div_class_value = "absolute border-[" + (ctx2[2] + "em") + "] md:border-[" + (ctx2[2] / 2 + "em") + "] border-yellow-200/40 ring-2 ring-black h-0 w-0 rounded-full")) {
        attr(div, "class", div_class_value);
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$7(ctx) {
  let div;
  let div_id_value;
  let div_class_value;
  let current;
  let mounted;
  let dispose;
  let if_block = ctx[0] && create_if_block$3(ctx);
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {
        id: true,
        "data-highlighter": true,
        class: true,
        style: true
      });
      var div_nodes = children(div);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "id", div_id_value = ctx[1].id + "--highlighter");
      attr(div, "data-highlighter", "true");
      attr(div, "class", div_class_value = "absolute border-[" + (ctx[2] + "em") + "] md:border-[" + (ctx[2] / 2 + "em") + "] border-transparent rounded-full p-0 m-0");
      set_style(div, "top", ctx[5] + "px");
      set_style(div, "left", ctx[4] + "px");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      ctx[9](div);
      current = true;
      if (!mounted) {
        dispose = [
          listen(window, "resize", ctx[8]),
          listen(div, "mouseover", ctx[10]),
          listen(div, "mouseleave", ctx[11]),
          listen(div, "focus", ctx[12]),
          listen(div, "blur", ctx[13])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$3(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (!current || dirty & 2 && div_id_value !== (div_id_value = ctx2[1].id + "--highlighter")) {
        attr(div, "id", div_id_value);
      }
      if (!current || dirty & 4 && div_class_value !== (div_class_value = "absolute border-[" + (ctx2[2] + "em") + "] md:border-[" + (ctx2[2] / 2 + "em") + "] border-transparent rounded-full p-0 m-0")) {
        attr(div, "class", div_class_value);
      }
      if (!current || dirty & 32) {
        set_style(div, "top", ctx2[5] + "px");
      }
      if (!current || dirty & 16) {
        set_style(div, "left", ctx2[4] + "px");
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
      ctx[9](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  let top;
  let left;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { node } = $$props;
  let { zoneSize = 2 } = $$props;
  let { highlight = false } = $$props;
  let dot;
  const resize_handler = (e) => {
    $$invalidate(5, top), $$invalidate(3, dot), $$invalidate(1, node);
    $$invalidate(4, left), $$invalidate(3, dot), $$invalidate(1, node);
  };
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dot = $$value;
      $$invalidate(3, dot);
    });
  }
  const mouseover_handler = (e) => {
    $$invalidate(0, highlight = true);
  };
  const mouseleave_handler = (e) => {
    $$invalidate(0, highlight = false);
  };
  const focus_handler = (e) => {
    $$invalidate(0, highlight = true);
  };
  const blur_handler = (e) => {
    $$invalidate(0, highlight = false);
  };
  $$self.$$set = ($$props2) => {
    if ("node" in $$props2)
      $$invalidate(1, node = $$props2.node);
    if ("zoneSize" in $$props2)
      $$invalidate(2, zoneSize = $$props2.zoneSize);
    if ("highlight" in $$props2)
      $$invalidate(0, highlight = $$props2.highlight);
    if ("$$scope" in $$props2)
      $$invalidate(6, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 10) {
      $$invalidate(5, top = dot ? -dot.offsetHeight / 2 + node.offsetHeight / 2 : 0);
    }
    if ($$self.$$.dirty & 10) {
      $$invalidate(4, left = dot ? -dot.offsetWidth / 2 + node.offsetWidth / 2 : 0);
    }
    if ($$self.$$.dirty & 10) {
      if (dot)
        node.insertAdjacentElement("beforeend", dot);
    }
  };
  return [
    highlight,
    node,
    zoneSize,
    dot,
    left,
    top,
    $$scope,
    slots,
    resize_handler,
    div_binding,
    mouseover_handler,
    mouseleave_handler,
    focus_handler,
    blur_handler
  ];
}
class Highlighter extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, { node: 1, zoneSize: 2, highlight: 0 });
  }
}
const generateLinkLabel = (nodes, sourceID, targetID = false) => {
  const match = nodes.find((el) => el.id == sourceID);
  if (!match || !match.value)
    return "";
  if (!targetID)
    return match.value + " to";
  const match2 = nodes.find((el) => el.id == targetID);
  if (!match2)
    return match.value;
  return `${match.value} to ${match2.value}`;
};
const MARKER = "marker";
const DROPZONE = "connectabledropzone";
const DELEGATOR = "connectdelegator";
const { window: window_1 } = globals;
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[19] = list[i][0];
  child_ctx[20] = list[i][1].node;
  child_ctx[21] = list[i][1].highlight;
  return child_ctx;
}
const get_default_slot_changes = (dirty) => ({});
const get_default_slot_context = (ctx) => ({ connectable: ctx[9] });
const get_marker_slot_changes = (dirty) => ({});
const get_marker_slot_context = (ctx) => ({ connectable: ctx[9] });
function create_if_block_3(ctx) {
  let cursormarker;
  let updating_marker;
  let current;
  function cursormarker_marker_binding(value) {
    ctx[13](value);
  }
  let cursormarker_props = {
    left: ctx[7],
    top: ctx[8],
    id: MARKER,
    $$slots: { default: [create_default_slot$2] },
    $$scope: { ctx }
  };
  if (ctx[5] !== void 0) {
    cursormarker_props.marker = ctx[5];
  }
  cursormarker = new CursorMarker({ props: cursormarker_props });
  binding_callbacks.push(() => bind(cursormarker, "marker", cursormarker_marker_binding));
  return {
    c() {
      create_component(cursormarker.$$.fragment);
    },
    l(nodes) {
      claim_component(cursormarker.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(cursormarker, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const cursormarker_changes = {};
      if (dirty & 128)
        cursormarker_changes.left = ctx2[7];
      if (dirty & 256)
        cursormarker_changes.top = ctx2[8];
      if (dirty & 32768) {
        cursormarker_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_marker && dirty & 32) {
        updating_marker = true;
        cursormarker_changes.marker = ctx2[5];
        add_flush_callback(() => updating_marker = false);
      }
      cursormarker.$set(cursormarker_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(cursormarker.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(cursormarker.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(cursormarker, detaching);
    }
  };
}
function fallback_block$2(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "h-4 w-4 md:h-16 md:w-16 p-8 rounded-full shadow-xl opacity-80 select-none border-[1em] md:border-[1em]");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p: noop$1,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_default_slot$2(ctx) {
  let current;
  const marker_slot_template = ctx[11].marker;
  const marker_slot = create_slot(marker_slot_template, ctx, ctx[15], get_marker_slot_context);
  const marker_slot_or_fallback = marker_slot || fallback_block$2();
  return {
    c() {
      if (marker_slot_or_fallback)
        marker_slot_or_fallback.c();
    },
    l(nodes) {
      if (marker_slot_or_fallback)
        marker_slot_or_fallback.l(nodes);
    },
    m(target, anchor) {
      if (marker_slot_or_fallback) {
        marker_slot_or_fallback.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (marker_slot) {
        if (marker_slot.p && (!current || dirty & 32768)) {
          update_slot_base(
            marker_slot,
            marker_slot_template,
            ctx2,
            ctx2[15],
            !current ? get_all_dirty_from_scope(ctx2[15]) : get_slot_changes(marker_slot_template, ctx2[15], dirty, get_marker_slot_changes),
            get_marker_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(marker_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(marker_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (marker_slot_or_fallback)
        marker_slot_or_fallback.d(detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let current;
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[15], get_default_slot_context);
  return {
    c() {
      if (default_slot)
        default_slot.c();
    },
    l(nodes) {
      if (default_slot)
        default_slot.l(nodes);
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32768)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[15],
            !current ? get_all_dirty_from_scope(ctx2[15]) : get_slot_changes(default_slot_template, ctx2[15], dirty, get_default_slot_changes),
            get_default_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
function create_if_block_1(ctx) {
  var _a;
  let links;
  let current;
  const links_spread_levels = [{ links: [ctx[6]] }, (_a = ctx[1]) == null ? void 0 : _a.links];
  let links_props = {};
  for (let i = 0; i < links_spread_levels.length; i += 1) {
    links_props = assign(links_props, links_spread_levels[i]);
  }
  links = new Links({ props: links_props });
  return {
    c() {
      create_component(links.$$.fragment);
    },
    l(nodes) {
      claim_component(links.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(links, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      var _a2;
      const links_changes = dirty & 66 ? get_spread_update(links_spread_levels, [
        dirty & 64 && { links: [ctx2[6]] },
        dirty & 2 && get_spread_object((_a2 = ctx2[1]) == null ? void 0 : _a2.links)
      ]) : {};
      links.$set(links_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(links.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(links.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(links, detaching);
    }
  };
}
function create_if_block$2(ctx) {
  var _a;
  let links;
  let current;
  const links_spread_levels = [{ links: ctx[0].links }, (_a = ctx[1]) == null ? void 0 : _a.links];
  let links_props = {};
  for (let i = 0; i < links_spread_levels.length; i += 1) {
    links_props = assign(links_props, links_spread_levels[i]);
  }
  links = new Links({ props: links_props });
  links.$on("removeLink", ctx[10]);
  return {
    c() {
      create_component(links.$$.fragment);
    },
    l(nodes) {
      claim_component(links.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(links, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      var _a2;
      const links_changes = dirty & 3 ? get_spread_update(links_spread_levels, [
        dirty & 1 && { links: ctx2[0].links },
        dirty & 2 && get_spread_object((_a2 = ctx2[1]) == null ? void 0 : _a2.links)
      ]) : {};
      links.$set(links_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(links.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(links.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(links, detaching);
    }
  };
}
function create_each_block$1(ctx) {
  let highlighter;
  let current;
  highlighter = new Highlighter({
    props: {
      node: ctx[20],
      highlight: ctx[21]
    }
  });
  return {
    c() {
      create_component(highlighter.$$.fragment);
    },
    l(nodes) {
      claim_component(highlighter.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(highlighter, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const highlighter_changes = {};
      if (dirty & 4)
        highlighter_changes.node = ctx2[20];
      if (dirty & 4)
        highlighter_changes.highlight = ctx2[21];
      highlighter.$set(highlighter_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(highlighter.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(highlighter.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(highlighter, detaching);
    }
  };
}
function create_fragment$6(ctx) {
  let div;
  let t0;
  let t1;
  let t2;
  let t3;
  let current;
  let mounted;
  let dispose;
  let if_block0 = ctx[4] && create_if_block_3(ctx);
  let if_block1 = ctx[3] && create_if_block_2(ctx);
  let if_block2 = ctx[6] && create_if_block_1(ctx);
  let if_block3 = ctx[0].links && ctx[0].links.length > 0 && create_if_block$2(ctx);
  let each_value = [...Object.entries(ctx[2])];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      div = element("div");
      if (if_block0)
        if_block0.c();
      t0 = space();
      if (if_block1)
        if_block1.c();
      t1 = space();
      if (if_block2)
        if_block2.c();
      t2 = space();
      if (if_block3)
        if_block3.c();
      t3 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, "data-canvas": true });
      var div_nodes = children(div);
      if (if_block0)
        if_block0.l(div_nodes);
      t0 = claim_space(div_nodes);
      if (if_block1)
        if_block1.l(div_nodes);
      t1 = claim_space(div_nodes);
      if (if_block2)
        if_block2.l(div_nodes);
      t2 = claim_space(div_nodes);
      if (if_block3)
        if_block3.l(div_nodes);
      t3 = claim_space(div_nodes);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div_nodes);
      }
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "relative");
      attr(div, "data-canvas", "");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (if_block0)
        if_block0.m(div, null);
      append_hydration(div, t0);
      if (if_block1)
        if_block1.m(div, null);
      append_hydration(div, t1);
      if (if_block2)
        if_block2.m(div, null);
      append_hydration(div, t2);
      if (if_block3)
        if_block3.m(div, null);
      append_hydration(div, t3);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
      ctx[14](div);
      current = true;
      if (!mounted) {
        dispose = listen(window_1, "resize", ctx[12]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (ctx2[4]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & 16) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_3(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (ctx2[3]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & 8) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_2(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (ctx2[6]) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty & 64) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block_1(ctx2);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div, t2);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
      if (ctx2[0].links && ctx2[0].links.length > 0) {
        if (if_block3) {
          if_block3.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block3, 1);
          }
        } else {
          if_block3 = create_if_block$2(ctx2);
          if_block3.c();
          transition_in(if_block3, 1);
          if_block3.m(div, t3);
        }
      } else if (if_block3) {
        group_outros();
        transition_out(if_block3, 1, 1, () => {
          if_block3 = null;
        });
        check_outros();
      }
      if (dirty & 4) {
        each_value = [...Object.entries(ctx2[2])];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      transition_in(if_block3);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      transition_out(if_block3);
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      if (if_block3)
        if_block3.d();
      destroy_each(each_blocks, detaching);
      ctx[14](null);
      mounted = false;
      dispose();
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { data } = $$props;
  let { opts = {} } = $$props;
  const dispatch = createEventDispatcher();
  let highlighters = {};
  let canvas;
  let connecting;
  let marker = null;
  let tempLink = null;
  let left = 0;
  let top = 0;
  function handler(p, e) {
    e.stopPropagation();
    e.preventDefault();
    $$invalidate(7, left = p.pageX - canvas.offsetLeft);
    $$invalidate(8, top = p.pageY - canvas.offsetTop);
  }
  function connectable(node, options) {
    var _a, _b, _c;
    if (!node.id)
      node.id = nanoid();
    let sourceid = ((_a = node == null ? void 0 : node.dataset) == null ? void 0 : _a.sourceid) ? (_b = node == null ? void 0 : node.dataset) == null ? void 0 : _b.sourceid : node.id;
    if (!node.style.position || node.style.position !== "absolute" && node.style.position !== "relative")
      node.style.position = "relative";
    let highlight = false;
    let overZone;
    $$invalidate(2, highlighters[sourceid] = { node, highlight }, highlighters);
    let pointerTracker;
    let startPoint;
    if (options == null ? void 0 : options.startPoint) {
      node.dataset[DELEGATOR] = true;
      startPoint = new options.startPoint({ target: node });
      startPoint.$on("ready", (event) => createHandleTracker(node, event.detail.handle));
      startPoint.$set({ mounted: true });
    } else {
      createHandleTracker(node);
    }
    if (options == null ? void 0 : options.dataset)
      node.dataset.dataset = JSON.stringify(options.dataset);
    if (!((_c = options == null ? void 0 : options.restrictions) == null ? void 0 : _c.startOnly))
      node.dataset[DROPZONE] = true;
    function createHandleTracker(node2, handle = false) {
      var _a2;
      if (!((_a2 = options == null ? void 0 : options.restrictions) == null ? void 0 : _a2.dropOnly)) {
        pointerTracker = new PointerTracker(
          node2,
          {
            start(pointer, event) {
              if (pointerTracker.currentPointers.length === 1)
                return false;
              if ((options == null ? void 0 : options.startPoint) && event.target !== handle)
                return false;
              $$invalidate(4, connecting = true);
              handler(pointer, event);
              return true;
            },
            move(previousPointers, changedPointers, event) {
              var _a3;
              handler(pointerTracker.currentPointers[0], event);
              $$invalidate(6, tempLink = {
                id: sourceid + "-to-",
                source: {
                  id: sourceid,
                  startPoint: (options == null ? void 0 : options.startPoint) || false
                },
                target: { id: MARKER },
                opts: {
                  label: {
                    enabled: true,
                    value: generateLinkLabel(data.nodes, sourceid)
                  }
                }
              });
              if (overZone)
                $$invalidate(2, highlighters[overZone.id].highlight = false, highlighters);
              overZone = ((_a3 = document.elementFromPoint(pointerTracker.currentPointers[0].clientX, pointerTracker.currentPointers[0].clientY)) == null ? void 0 : _a3.closest(`[data-${DROPZONE}]`)) || null;
              if (overZone == null ? void 0 : overZone.id) {
                $$invalidate(2, highlighters[overZone.id].highlight = true, highlighters);
              }
            },
            end: (pointer, event, cancelled) => {
              var _a3, _b2;
              $$invalidate(5, marker.style.display = "none", marker);
              $$invalidate(4, connecting = false);
              if (highlighters && overZone && overZone.id && highlighters[overZone.id].highlight) {
                $$invalidate(2, highlighters[overZone.id].highlight = false, highlighters);
              }
              overZone = null;
              let drop = document.elementFromPoint(pointer.clientX, pointer.clientY);
              let zone = drop == null ? void 0 : drop.closest(`[data-${DROPZONE}]`);
              $$invalidate(6, tempLink = null);
              if (!zone || !(zone == null ? void 0 : zone.id) || !node2 || !(node2 == null ? void 0 : node2.id))
                return;
              const newLink = {
                id: sourceid + "-to-" + zone.id,
                source: {
                  id: sourceid,
                  startPoint: (options == null ? void 0 : options.startPoint) || false
                },
                target: { id: zone.id },
                opts: {
                  label: {
                    enabled: true,
                    value: generateLinkLabel(data.nodes, sourceid, zone.id)
                  }
                }
              };
              $$invalidate(0, data.links = [...data.links, newLink], data);
              if ((options == null ? void 0 : options.dataset) || ((_a3 = zone == null ? void 0 : zone.dataset) == null ? void 0 : _a3.dataset)) {
                const detail = {
                  source: { dataset: (options == null ? void 0 : options.dataset) || null },
                  target: {
                    dataset: ((_b2 = zone == null ? void 0 : zone.dataset) == null ? void 0 : _b2.dataset) ? JSON.parse(zone.dataset.dataset) : null
                  }
                };
                dispatch("connected", detail);
              }
            },
            avoidPointerEvents: true,
            eventListenerOptions: { capture: true, passive: false }
          }
        );
      }
    }
    return {
      update(params) {
        options = params;
      },
      destroy() {
        pointerTracker == null ? void 0 : pointerTracker.stop();
        if (startPoint)
          startPoint.$destroy();
      }
    };
  }
  const removeLink = (e) => $$invalidate(0, data.links = data.links.filter((l) => l.id !== e.detail), data);
  const resize_handler = (e) => {
    $$invalidate(0, data);
  };
  function cursormarker_marker_binding(value) {
    marker = value;
    $$invalidate(5, marker);
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      canvas = $$value;
      $$invalidate(3, canvas);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2)
      $$invalidate(0, data = $$props2.data);
    if ("opts" in $$props2)
      $$invalidate(1, opts = $$props2.opts);
    if ("$$scope" in $$props2)
      $$invalidate(15, $$scope = $$props2.$$scope);
  };
  return [
    data,
    opts,
    highlighters,
    canvas,
    connecting,
    marker,
    tempLink,
    left,
    top,
    connectable,
    removeLink,
    slots,
    resize_handler,
    cursormarker_marker_binding,
    div_binding,
    $$scope
  ];
}
class Canvas extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, { data: 0, opts: 1 });
  }
}
function fallback_block$1(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex h-4 w-4 border-2 bg-blue-500 rounded-full border-blue-300 hover:ring hover:ring-blue-800");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p: noop$1,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$5(ctx) {
  let div1;
  let div0;
  let connectable_action;
  let div1_style_value;
  let div1_resize_listener;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[10], null);
  const default_slot_or_fallback = default_slot || fallback_block$1();
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true, style: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      if (default_slot_or_fallback)
        default_slot_or_fallback.l(div0_nodes);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "relative");
      attr(div1, "class", "flex absolute EndPoint");
      attr(div1, "style", div1_style_value = "top: " + ctx[8] + "px; " + (ctx[0] == "right" ? `right: ${ctx[7]}px;` : `left: ${ctx[6]}px;`));
      add_render_callback(() => ctx[14].call(div1));
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, div0);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(div0, null);
      }
      ctx[13](div1);
      div1_resize_listener = add_resize_listener(div1, ctx[14].bind(div1));
      current = true;
      if (!mounted) {
        dispose = [
          listen(window, "resize", ctx[12]),
          action_destroyer(connectable_action = ctx[1].call(null, div0, ctx[2]))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 1024)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[10],
            !current ? get_all_dirty_from_scope(ctx2[10]) : get_slot_changes(default_slot_template, ctx2[10], dirty, null),
            null
          );
        }
      }
      if (connectable_action && is_function(connectable_action.update) && dirty & 4)
        connectable_action.update.call(null, ctx2[2]);
      if (!current || dirty & 449 && div1_style_value !== (div1_style_value = "top: " + ctx2[8] + "px; " + (ctx2[0] == "right" ? `right: ${ctx2[7]}px;` : `left: ${ctx2[6]}px;`))) {
        attr(div1, "style", div1_style_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
      ctx[13](null);
      div1_resize_listener();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let top;
  let right;
  let left;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { position = "right" } = $$props;
  let { connectable } = $$props;
  let { options = {} } = $$props;
  let dot;
  let offsetHeight, offsetWidth, parentHeight;
  const resize_handler = (e) => {
    $$invalidate(8, top), $$invalidate(9, parentHeight), $$invalidate(4, offsetHeight), $$invalidate(3, dot);
    $$invalidate(6, left), $$invalidate(5, offsetWidth);
    $$invalidate(7, right), $$invalidate(5, offsetWidth);
  };
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dot = $$value;
      $$invalidate(3, dot);
    });
  }
  function div1_elementresize_handler() {
    offsetWidth = this.offsetWidth;
    offsetHeight = this.offsetHeight;
    $$invalidate(5, offsetWidth);
    $$invalidate(4, offsetHeight);
  }
  $$self.$$set = ($$props2) => {
    if ("position" in $$props2)
      $$invalidate(0, position = $$props2.position);
    if ("connectable" in $$props2)
      $$invalidate(1, connectable = $$props2.connectable);
    if ("options" in $$props2)
      $$invalidate(2, options = $$props2.options);
    if ("$$scope" in $$props2)
      $$invalidate(10, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 8) {
      if (dot) {
        $$invalidate(3, dot.parentNode.style.position = "relative", dot);
        $$invalidate(9, parentHeight = dot.parentNode.offsetHeight);
      }
    }
    if ($$self.$$.dirty & 528) {
      $$invalidate(8, top = parentHeight && offsetHeight ? parentHeight / 2 - offsetHeight / 2 : 0);
    }
    if ($$self.$$.dirty & 32) {
      $$invalidate(7, right = offsetWidth ? -offsetWidth / 2 : 0);
    }
    if ($$self.$$.dirty & 32) {
      $$invalidate(6, left = offsetWidth ? -offsetWidth / 2 : 0);
    }
  };
  return [
    position,
    connectable,
    options,
    dot,
    offsetHeight,
    offsetWidth,
    left,
    right,
    top,
    parentHeight,
    $$scope,
    slots,
    resize_handler,
    div1_binding,
    div1_elementresize_handler
  ];
}
class EndPoint extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, { position: 0, connectable: 1, options: 2 });
  }
}
function fallback_block(ctx) {
  let t;
  return {
    c() {
      t = text("Connect");
    },
    l(nodes) {
      t = claim_text(nodes, "Connect");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment$4(ctx) {
  let div;
  let current;
  const default_slot_template = ctx[11].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[10], null);
  const default_slot_or_fallback = default_slot || fallback_block();
  return {
    c() {
      div = element("div");
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      if (default_slot_or_fallback)
        default_slot_or_fallback.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "cursor-pointer select-none font-mono p-1 text-neutral-400 text-sm bg-white/50 z-50");
      set_style(div, "position", "absolute");
      set_style(div, "left", ctx[1] + "px");
      set_style(div, "top", ctx[2] + "px");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(div, null);
      }
      ctx[12](div);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 1024)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[10],
            !current ? get_all_dirty_from_scope(ctx2[10]) : get_slot_changes(default_slot_template, ctx2[10], dirty, null),
            null
          );
        }
      }
      if (!current || dirty & 2) {
        set_style(div, "left", ctx2[1] + "px");
      }
      if (!current || dirty & 4) {
        set_style(div, "top", ctx2[2] + "px");
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
      ctx[12](null);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { sx = 0 } = $$props;
  let { sy = 0 } = $$props;
  let { ex = 0 } = $$props;
  let { ey = 0 } = $$props;
  let { as = 0 } = $$props;
  let { mounted = false } = $$props;
  let handle;
  const dispatch = createEventDispatcher();
  let x = 0;
  let y = 0;
  let tracker;
  let width;
  onDestroy(() => {
    tracker == null ? void 0 : tracker.stop();
  });
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      handle = $$value;
      $$invalidate(0, handle);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("sx" in $$props2)
      $$invalidate(3, sx = $$props2.sx);
    if ("sy" in $$props2)
      $$invalidate(4, sy = $$props2.sy);
    if ("ex" in $$props2)
      $$invalidate(5, ex = $$props2.ex);
    if ("ey" in $$props2)
      $$invalidate(6, ey = $$props2.ey);
    if ("as" in $$props2)
      $$invalidate(7, as = $$props2.as);
    if ("mounted" in $$props2)
      $$invalidate(8, mounted = $$props2.mounted);
    if ("$$scope" in $$props2)
      $$invalidate(10, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 769) {
      if (mounted && handle && (handle == null ? void 0 : handle.parentNode)) {
        $$invalidate(9, { width } = handle.parentNode.getBoundingClientRect(), width);
        $$invalidate(1, x = width);
        dispatch("ready", { handle });
      }
    }
    if ($$self.$$.dirty & 129) {
      if (handle && as > 0) {
        $$invalidate(2, y = -(handle == null ? void 0 : handle.offsetHeight));
      } else {
        $$invalidate(2, y = 0);
      }
    }
    if ($$self.$$.dirty & 153) {
      if (handle && (!!sy || !!sx) && as < 0.6 && as > -0.6) {
        $$invalidate(1, x = -(handle == null ? void 0 : handle.offsetWidth));
      } else if (!!sy || !!sx) {
        $$invalidate(1, x = 0);
      }
    }
  };
  return [handle, x, y, sx, sy, ex, ey, as, mounted, width, $$scope, slots, div_binding];
}
class Delegate extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {
      sx: 3,
      sy: 4,
      ex: 5,
      ey: 6,
      as: 7,
      mounted: 8
    });
  }
  get sx() {
    return this.$$.ctx[3];
  }
  set sx(sx) {
    this.$$set({ sx });
    flush();
  }
  get sy() {
    return this.$$.ctx[4];
  }
  set sy(sy) {
    this.$$set({ sy });
    flush();
  }
  get ex() {
    return this.$$.ctx[5];
  }
  set ex(ex) {
    this.$$set({ ex });
    flush();
  }
  get ey() {
    return this.$$.ctx[6];
  }
  set ey(ey) {
    this.$$set({ ey });
    flush();
  }
  get as() {
    return this.$$.ctx[7];
  }
  set as(as) {
    this.$$set({ as });
    flush();
  }
  get mounted() {
    return this.$$.ctx[8];
  }
  set mounted(mounted) {
    this.$$set({ mounted });
    flush();
  }
}
function create_fragment$3(ctx) {
  let span1;
  let span0;
  let span1_class_value;
  let current;
  const default_slot_template = ctx[3].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[2], null);
  return {
    c() {
      span1 = element("span");
      span0 = element("span");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      span1 = claim_element(nodes, "SPAN", { class: true });
      var span1_nodes = children(span1);
      span0 = claim_element(span1_nodes, "SPAN", { class: true });
      var span0_nodes = children(span0);
      if (default_slot)
        default_slot.l(span0_nodes);
      span0_nodes.forEach(detach);
      span1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span0, "class", "relative pr-1");
      attr(span1, "class", span1_class_value = (ctx[0] == "pink" ? pink : ctx[1]) + " before:inline-block before:absolute before:-inset-1 before:-skew-y-3 relative inline-block");
    },
    m(target, anchor) {
      insert_hydration(target, span1, anchor);
      append_hydration(span1, span0);
      if (default_slot) {
        default_slot.m(span0, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 4)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            ctx2[2],
            !current ? get_all_dirty_from_scope(ctx2[2]) : get_slot_changes(default_slot_template, ctx2[2], dirty, null),
            null
          );
        }
      }
      if (!current || dirty & 1 && span1_class_value !== (span1_class_value = (ctx2[0] == "pink" ? pink : ctx2[1]) + " before:inline-block before:absolute before:-inset-1 before:-skew-y-3 relative inline-block")) {
        attr(span1, "class", span1_class_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(span1);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
let pink = "before:bg-pink-500 text-white";
function instance$3($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { color = "pink" } = $$props;
  let green = `before:bg-green-500/50 text-black `;
  $$self.$$set = ($$props2) => {
    if ("color" in $$props2)
      $$invalidate(0, color = $$props2.color);
    if ("$$scope" in $$props2)
      $$invalidate(2, $$scope = $$props2.$$scope);
  };
  return [color, green, $$scope, slots];
}
class Skew extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { color: 0 });
  }
}
function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - od * u}`
  };
}
const get_extra_slot_changes = (dirty) => ({});
const get_extra_slot_context = (ctx) => ({});
function create_if_block$1(ctx) {
  let div2;
  let div1;
  let div0;
  let t0;
  let span;
  let t1;
  let t2;
  let t3;
  let div2_transition;
  let current;
  const default_slot_template = ctx[5].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[4], null);
  const extra_slot_template = ctx[5].extra;
  const extra_slot = create_slot(extra_slot_template, ctx, ctx[4], get_extra_slot_context);
  return {
    c() {
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      if (default_slot)
        default_slot.c();
      t0 = space();
      span = element("span");
      t1 = text(ctx[1]);
      t2 = text("s");
      t3 = space();
      if (extra_slot)
        extra_slot.c();
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      if (default_slot)
        default_slot.l(div0_nodes);
      t0 = claim_space(div0_nodes);
      span = claim_element(div0_nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t1 = claim_text(span_nodes, ctx[1]);
      t2 = claim_text(span_nodes, "s");
      span_nodes.forEach(detach);
      t3 = claim_space(div0_nodes);
      if (extra_slot)
        extra_slot.l(div0_nodes);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "opacity-40");
      attr(div0, "class", "text-lg font-normal w-full");
      attr(div1, "class", "flex-1 flex max-w-fit items-center py-4 px-8 bg-yellow-300/90 rounded-lg shadow-2xl drop-shadow-2xl");
      attr(div2, "class", "flex flex-col items-center fixed top-0 left-0 m-4 w-5/6 p-4 text-neutral-800 bg-transparent");
    },
    m(target, anchor) {
      insert_hydration(target, div2, anchor);
      append_hydration(div2, div1);
      append_hydration(div1, div0);
      if (default_slot) {
        default_slot.m(div0, null);
      }
      append_hydration(div0, t0);
      append_hydration(div0, span);
      append_hydration(span, t1);
      append_hydration(span, t2);
      append_hydration(div0, t3);
      if (extra_slot) {
        extra_slot.m(div0, null);
      }
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 16)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            ctx[4],
            !current ? get_all_dirty_from_scope(ctx[4]) : get_slot_changes(default_slot_template, ctx[4], dirty, null),
            null
          );
        }
      }
      if (!current || dirty & 2)
        set_data(t1, ctx[1]);
      if (extra_slot) {
        if (extra_slot.p && (!current || dirty & 16)) {
          update_slot_base(
            extra_slot,
            extra_slot_template,
            ctx,
            ctx[4],
            !current ? get_all_dirty_from_scope(ctx[4]) : get_slot_changes(extra_slot_template, ctx[4], dirty, get_extra_slot_changes),
            get_extra_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      transition_in(extra_slot, local);
      add_render_callback(() => {
        if (!div2_transition)
          div2_transition = create_bidirectional_transition(
            div2,
            fly,
            {
              delay: 100,
              duration: 800,
              x: 0,
              y: -200,
              opacity: 0.1,
              easing: quintOut
            },
            true
          );
        div2_transition.run(1);
      });
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      transition_out(extra_slot, local);
      if (!div2_transition)
        div2_transition = create_bidirectional_transition(
          div2,
          fly,
          {
            delay: 100,
            duration: 800,
            x: 0,
            y: -200,
            opacity: 0.1,
            easing: quintOut
          },
          false
        );
      div2_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div2);
      if (default_slot)
        default_slot.d(detaching);
      if (extra_slot)
        extra_slot.d(detaching);
      if (detaching && div2_transition)
        div2_transition.end();
    }
  };
}
function create_fragment$2(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[0] && create_if_block$1(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { transition = "fade" } = $$props;
  let { toast = true } = $$props;
  let visible = true;
  let counter = 3;
  function timeout() {
    if ($$invalidate(1, --counter) > 0)
      return setTimeout(timeout, 1e3);
    $$invalidate(0, visible = false);
  }
  $$self.$$set = ($$props2) => {
    if ("transition" in $$props2)
      $$invalidate(2, transition = $$props2.transition);
    if ("toast" in $$props2)
      $$invalidate(3, toast = $$props2.toast);
    if ("$$scope" in $$props2)
      $$invalidate(4, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 8) {
      if (toast) {
        $$invalidate(1, counter = 3);
        timeout();
      }
    }
  };
  return [visible, counter, transition, toast, $$scope, slots];
}
class Toast extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { transition: 2, toast: 3 });
  }
}
function create_default_slot$1(ctx) {
  let t;
  return {
    c() {
      t = text("Connect Me");
    },
    l(nodes) {
      t = claim_text(nodes, "Connect Me");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment$1(ctx) {
  let delegate;
  let current;
  delegate = new Delegate({
    props: {
      mounted: ctx[0],
      as: ctx[1],
      sx: ctx[2],
      sy: ctx[3],
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx }
    }
  });
  delegate.$on("ready", ctx[4]);
  return {
    c() {
      create_component(delegate.$$.fragment);
    },
    l(nodes) {
      claim_component(delegate.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(delegate, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const delegate_changes = {};
      if (dirty & 1)
        delegate_changes.mounted = ctx2[0];
      if (dirty & 2)
        delegate_changes.as = ctx2[1];
      if (dirty & 4)
        delegate_changes.sx = ctx2[2];
      if (dirty & 8)
        delegate_changes.sy = ctx2[3];
      if (dirty & 32) {
        delegate_changes.$$scope = { dirty, ctx: ctx2 };
      }
      delegate.$set(delegate_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(delegate.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(delegate.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(delegate, detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { mounted = false } = $$props;
  let { as = 0 } = $$props;
  let { sx = 0 } = $$props;
  let { sy = 0 } = $$props;
  function ready_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("mounted" in $$props2)
      $$invalidate(0, mounted = $$props2.mounted);
    if ("as" in $$props2)
      $$invalidate(1, as = $$props2.as);
    if ("sx" in $$props2)
      $$invalidate(2, sx = $$props2.sx);
    if ("sy" in $$props2)
      $$invalidate(3, sy = $$props2.sy);
  };
  return [mounted, as, sx, sy, ready_handler];
}
class DemoDelegated extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { mounted: 0, as: 1, sx: 2, sy: 3 });
  }
  get mounted() {
    return this.$$.ctx[0];
  }
  set mounted(mounted) {
    this.$$set({ mounted });
    flush();
  }
  get as() {
    return this.$$.ctx[1];
  }
  set as(as) {
    this.$$set({ as });
    flush();
  }
  get sx() {
    return this.$$.ctx[2];
  }
  set sx(sx) {
    this.$$set({ sx });
    flush();
  }
  get sy() {
    return this.$$.ctx[3];
  }
  set sy(sy) {
    this.$$set({ sy });
    flush();
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i][0];
  child_ctx[13] = list[i][1];
  child_ctx[15] = i;
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[16] = list[i];
  return child_ctx;
}
function create_each_block_1(key_1, ctx) {
  let div;
  let t_value = ctx[16].value + "";
  let t;
  let div_id_value;
  let connectable_action;
  let mounted;
  let dispose;
  return {
    key: key_1,
    first: null,
    c() {
      div = element("div");
      t = text(t_value);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, id: true });
      var div_nodes = children(div);
      t = claim_text(div_nodes, t_value);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      var _a, _b;
      attr(div, "class", "block m-2 cursor-pointer select-none w-fit");
      attr(div, "id", div_id_value = ((_a = ctx[16]) == null ? void 0 : _a.id) ? (_b = ctx[16]) == null ? void 0 : _b.id : null);
      this.first = div;
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t);
      if (!mounted) {
        dispose = action_destroyer(connectable_action = ctx[11].call(null, div, {
          dataset: { value: ctx[16].value }
        }));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      var _a, _b;
      ctx = new_ctx;
      if (dirty & 1 && t_value !== (t_value = ctx[16].value + ""))
        set_data(t, t_value);
      if (dirty & 1 && div_id_value !== (div_id_value = ((_a = ctx[16]) == null ? void 0 : _a.id) ? (_b = ctx[16]) == null ? void 0 : _b.id : null)) {
        attr(div, "id", div_id_value);
      }
      if (connectable_action && is_function(connectable_action.update) && dirty & 1)
        connectable_action.update.call(null, {
          dataset: { value: ctx[16].value }
        });
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block(ctx) {
  let div;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let t;
  function func(...args) {
    return ctx[5](ctx[12], ...args);
  }
  let each_value_1 = ctx[0].nodes.filter(func);
  const get_key = (ctx2) => ctx2[16].id;
  for (let i = 0; i < each_value_1.length; i += 1) {
    let child_ctx = get_each_context_1(ctx, each_value_1, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block_1(key, child_ctx));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div_nodes);
      }
      t = claim_space(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "flex flex-col border rounded-lg m-4 p-4 items-center");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
      append_hydration(div, t);
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & 9) {
        each_value_1 = ctx[0].nodes.filter(func);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_1, each_1_lookup, div, destroy_block, create_each_block_1, t, get_each_context_1);
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
    }
  };
}
function create_default_slot_3(ctx) {
  let t;
  return {
    c() {
      t = text("custom");
    },
    l(nodes) {
      t = claim_text(nodes, "custom");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_2(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "h-4 w-4 bg-white rounded-full border-4 border-black hover:ring hover:ring-green-800");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p: noop$1,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block(ctx) {
  let previous_key = ctx[2];
  let key_block_anchor;
  let current;
  let key_block = create_key_block(ctx);
  return {
    c() {
      key_block.c();
      key_block_anchor = empty();
    },
    l(nodes) {
      key_block.l(nodes);
      key_block_anchor = empty();
    },
    m(target, anchor) {
      key_block.m(target, anchor);
      insert_hydration(target, key_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & 4 && safe_not_equal(previous_key, previous_key = ctx2[2])) {
        group_outros();
        transition_out(key_block, 1, 1, noop$1);
        check_outros();
        key_block = create_key_block(ctx2);
        key_block.c();
        transition_in(key_block, 1);
        key_block.m(key_block_anchor.parentNode, key_block_anchor);
      } else {
        key_block.p(ctx2, dirty);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(key_block);
      current = true;
    },
    o(local) {
      transition_out(key_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(key_block_anchor);
      key_block.d(detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let t;
  return {
    c() {
      t = text(ctx[2]);
    },
    l(nodes) {
      t = claim_text(nodes, ctx[2]);
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 4)
        set_data(t, ctx2[2]);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_key_block(ctx) {
  let toast_1;
  let updating_toast;
  let current;
  function toast_1_toast_binding(value) {
    ctx[6](value);
  }
  let toast_1_props = {
    $$slots: { default: [create_default_slot_1] },
    $$scope: { ctx }
  };
  if (ctx[2] !== void 0) {
    toast_1_props.toast = ctx[2];
  }
  toast_1 = new Toast({ props: toast_1_props });
  binding_callbacks.push(() => bind(toast_1, "toast", toast_1_toast_binding));
  return {
    c() {
      create_component(toast_1.$$.fragment);
    },
    l(nodes) {
      claim_component(toast_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(toast_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const toast_1_changes = {};
      if (dirty & 524292) {
        toast_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_toast && dirty & 4) {
        updating_toast = true;
        toast_1_changes.toast = ctx2[2];
        add_flush_callback(() => updating_toast = false);
      }
      toast_1.$set(toast_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(toast_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(toast_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(toast_1, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let div0;
  let t0;
  let t1;
  let div1;
  let t2;
  let div6;
  let div3;
  let div2;
  let t3;
  let br0;
  let t4;
  let t5;
  let div5;
  let div4;
  let t6;
  let br1;
  let t7;
  let t8;
  let div10;
  let div7;
  let t9;
  let endpoint0;
  let t10;
  let endpoint1;
  let t11;
  let div8;
  let t12;
  let endpoint2;
  let t13;
  let div9;
  let t14;
  let skew;
  let t15;
  let endpoint3;
  let t16;
  let if_block_anchor;
  let current;
  let mounted;
  let dispose;
  let each_value = [...Object.entries(ctx[3])];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  endpoint0 = new EndPoint({
    props: {
      position: "right",
      connectable: ctx[11]
    }
  });
  endpoint1 = new EndPoint({
    props: {
      position: "left",
      connectable: ctx[11]
    }
  });
  endpoint2 = new EndPoint({
    props: {
      position: "left",
      connectable: ctx[11]
    }
  });
  skew = new Skew({
    props: {
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  endpoint3 = new EndPoint({
    props: {
      position: "left",
      connectable: ctx[11],
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  let if_block = ctx[2] && create_if_block(ctx);
  return {
    c() {
      div0 = element("div");
      t0 = text("Directive is available within the slot as a slot prop");
      t1 = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t2 = space();
      div6 = element("div");
      div3 = element("div");
      div2 = element("div");
      t3 = text("Delegated Floating ");
      br0 = element("br");
      t4 = text("Label Components");
      t5 = space();
      div5 = element("div");
      div4 = element("div");
      t6 = text("...Starts out fixed, then switches to");
      br1 = element("br");
      t7 = text(" movable endpoint once connected.");
      t8 = space();
      div10 = element("div");
      div7 = element("div");
      t9 = text("Can we also have an external endpoint?\n				");
      create_component(endpoint0.$$.fragment);
      t10 = space();
      create_component(endpoint1.$$.fragment);
      t11 = space();
      div8 = element("div");
      t12 = text("No, libraries cannot do that. Just kidding.\n				");
      create_component(endpoint2.$$.fragment);
      t13 = space();
      div9 = element("div");
      t14 = text("Yes, pass the connectable directive to the component. They can even be ");
      create_component(skew.$$.fragment);
      t15 = text(",\n				like this one.\n				");
      create_component(endpoint3.$$.fragment);
      t16 = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l(nodes) {
      div0 = claim_element(nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      t0 = claim_text(div0_nodes, "Directive is available within the slot as a slot prop");
      div0_nodes.forEach(detach);
      t1 = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div1_nodes);
      }
      div1_nodes.forEach(detach);
      t2 = claim_space(nodes);
      div6 = claim_element(nodes, "DIV", { class: true });
      var div6_nodes = children(div6);
      div3 = claim_element(div6_nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      div2 = claim_element(div3_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      t3 = claim_text(div2_nodes, "Delegated Floating ");
      br0 = claim_element(div2_nodes, "BR", {});
      t4 = claim_text(div2_nodes, "Label Components");
      div2_nodes.forEach(detach);
      div3_nodes.forEach(detach);
      t5 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", { class: true, id: true });
      var div5_nodes = children(div5);
      div4 = claim_element(div5_nodes, "DIV", { class: true });
      var div4_nodes = children(div4);
      t6 = claim_text(div4_nodes, "...Starts out fixed, then switches to");
      br1 = claim_element(div4_nodes, "BR", {});
      t7 = claim_text(div4_nodes, " movable endpoint once connected.");
      div4_nodes.forEach(detach);
      div5_nodes.forEach(detach);
      div6_nodes.forEach(detach);
      t8 = claim_space(nodes);
      div10 = claim_element(nodes, "DIV", { class: true });
      var div10_nodes = children(div10);
      div7 = claim_element(div10_nodes, "DIV", { class: true });
      var div7_nodes = children(div7);
      t9 = claim_text(div7_nodes, "Can we also have an external endpoint?\n				");
      claim_component(endpoint0.$$.fragment, div7_nodes);
      t10 = claim_space(div7_nodes);
      claim_component(endpoint1.$$.fragment, div7_nodes);
      div7_nodes.forEach(detach);
      t11 = claim_space(div10_nodes);
      div8 = claim_element(div10_nodes, "DIV", { class: true });
      var div8_nodes = children(div8);
      t12 = claim_text(div8_nodes, "No, libraries cannot do that. Just kidding.\n				");
      claim_component(endpoint2.$$.fragment, div8_nodes);
      div8_nodes.forEach(detach);
      t13 = claim_space(div10_nodes);
      div9 = claim_element(div10_nodes, "DIV", { class: true });
      var div9_nodes = children(div9);
      t14 = claim_text(div9_nodes, "Yes, pass the connectable directive to the component. They can even be ");
      claim_component(skew.$$.fragment, div9_nodes);
      t15 = claim_text(div9_nodes, ",\n				like this one.\n				");
      claim_component(endpoint3.$$.fragment, div9_nodes);
      div9_nodes.forEach(detach);
      div10_nodes.forEach(detach);
      t16 = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      attr(div0, "class", "text-black font-bold m-4");
      attr(div1, "class", "flex flex-row justify-around ");
      attr(div2, "class", "block m-2 select-none w-fit");
      attr(div3, "class", "flex flex-col border rounded-lg m-4 p-4 items-center");
      attr(div4, "class", "block m-2 cursor-pointer select-none w-fit");
      attr(div5, "class", "flex flex-col border rounded-lg m-4 p-4 items-center");
      attr(div5, "id", "To");
      attr(div6, "class", "flex flex-row justify-around ");
      attr(div7, "class", "inline-flex m-2 p-4 border rounded-lg w-1/3 bg-amber-100");
      attr(div8, "class", "relative inline-flex m-2 p-4 border rounded-lg w-1/3 bg-red-300");
      attr(div9, "class", "relative flex-0 m-2 ml-auto p-4 border rounded-lg w-1/3 bg-green-300");
      attr(div10, "class", "flex flex-row flex-wrap border rounded-lg m-4 p-4 justify-between bg-neutral-50");
    },
    m(target, anchor) {
      insert_hydration(target, div0, anchor);
      append_hydration(div0, t0);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, div1, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div1, null);
      }
      insert_hydration(target, t2, anchor);
      insert_hydration(target, div6, anchor);
      append_hydration(div6, div3);
      append_hydration(div3, div2);
      append_hydration(div2, t3);
      append_hydration(div2, br0);
      append_hydration(div2, t4);
      append_hydration(div6, t5);
      append_hydration(div6, div5);
      append_hydration(div5, div4);
      append_hydration(div4, t6);
      append_hydration(div4, br1);
      append_hydration(div4, t7);
      insert_hydration(target, t8, anchor);
      insert_hydration(target, div10, anchor);
      append_hydration(div10, div7);
      append_hydration(div7, t9);
      mount_component(endpoint0, div7, null);
      append_hydration(div7, t10);
      mount_component(endpoint1, div7, null);
      append_hydration(div10, t11);
      append_hydration(div10, div8);
      append_hydration(div8, t12);
      mount_component(endpoint2, div8, null);
      append_hydration(div10, t13);
      append_hydration(div10, div9);
      append_hydration(div9, t14);
      mount_component(skew, div9, null);
      append_hydration(div9, t15);
      mount_component(endpoint3, div9, null);
      insert_hydration(target, t16, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(ctx[11].call(null, div3, { startPoint: DemoDelegated })),
          action_destroyer(ctx[11].call(null, div5))
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & 9) {
        each_value = [...Object.entries(ctx2[3])];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div1, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      const endpoint0_changes = {};
      if (dirty & 2048)
        endpoint0_changes.connectable = ctx2[11];
      endpoint0.$set(endpoint0_changes);
      const endpoint1_changes = {};
      if (dirty & 2048)
        endpoint1_changes.connectable = ctx2[11];
      endpoint1.$set(endpoint1_changes);
      const endpoint2_changes = {};
      if (dirty & 2048)
        endpoint2_changes.connectable = ctx2[11];
      endpoint2.$set(endpoint2_changes);
      const skew_changes = {};
      if (dirty & 524288) {
        skew_changes.$$scope = { dirty, ctx: ctx2 };
      }
      skew.$set(skew_changes);
      const endpoint3_changes = {};
      if (dirty & 2048)
        endpoint3_changes.connectable = ctx2[11];
      if (dirty & 524288) {
        endpoint3_changes.$$scope = { dirty, ctx: ctx2 };
      }
      endpoint3.$set(endpoint3_changes);
      if (ctx2[2]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 4) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(endpoint0.$$.fragment, local);
      transition_in(endpoint1.$$.fragment, local);
      transition_in(endpoint2.$$.fragment, local);
      transition_in(skew.$$.fragment, local);
      transition_in(endpoint3.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(endpoint0.$$.fragment, local);
      transition_out(endpoint1.$$.fragment, local);
      transition_out(endpoint2.$$.fragment, local);
      transition_out(skew.$$.fragment, local);
      transition_out(endpoint3.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div1);
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(div6);
      if (detaching)
        detach(t8);
      if (detaching)
        detach(div10);
      destroy_component(endpoint0);
      destroy_component(endpoint1);
      destroy_component(endpoint2);
      destroy_component(skew);
      destroy_component(endpoint3);
      if (detaching)
        detach(t16);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_marker_slot(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { slot: true, class: true });
      children(div).forEach(detach);
      this.h();
    },
    h() {
      attr(div, "slot", "marker");
      attr(div, "class", "h-4 w-4 md:h-16 md:w-16 p-8 rounded-full shadow-xl opacity-80 select-none border-[1em] md:border-[1em]");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p: noop$1,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment(ctx) {
  let div2;
  let div0;
  let a0;
  let t0;
  let t1;
  let div1;
  let t2;
  let a1;
  let t3;
  let t4;
  let t5;
  let div3;
  let canvas;
  let updating_data;
  let t6;
  let div8;
  let div4;
  let t7;
  let t8;
  let div5;
  let label0;
  let span0;
  let t9;
  let t10;
  let input0;
  let t11;
  let div6;
  let label1;
  let span1;
  let t12;
  let t13;
  let input1;
  let t14;
  let div7;
  let label2;
  let span2;
  let t15;
  let t16_value = ctx[1].links.textStartOffset + "";
  let t16;
  let t17;
  let input2;
  let current;
  let mounted;
  let dispose;
  function canvas_data_binding(value) {
    ctx[7](value);
  }
  let canvas_props = {
    opts: ctx[1],
    $$slots: {
      marker: [
        create_marker_slot,
        ({ connectable }) => ({ 11: connectable }),
        ({ connectable }) => connectable ? 2048 : 0
      ],
      default: [
        create_default_slot,
        ({ connectable }) => ({ 11: connectable }),
        ({ connectable }) => connectable ? 2048 : 0
      ]
    },
    $$scope: { ctx }
  };
  if (ctx[0] !== void 0) {
    canvas_props.data = ctx[0];
  }
  canvas = new Canvas({ props: canvas_props });
  binding_callbacks.push(() => bind(canvas, "data", canvas_data_binding));
  canvas.$on("connected", ctx[4]);
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      a0 = element("a");
      t0 = text("https://github.com/DougAnderson444/svelte-plumb");
      t1 = space();
      div1 = element("div");
      t2 = text("by ");
      a1 = element("a");
      t3 = text("@DougAnderson444");
      t4 = text("\n\n	Match the picture to the words:");
      t5 = space();
      div3 = element("div");
      create_component(canvas.$$.fragment);
      t6 = space();
      div8 = element("div");
      div4 = element("div");
      t7 = text("Control Panel");
      t8 = space();
      div5 = element("div");
      label0 = element("label");
      span0 = element("span");
      t9 = text("Stroke Width");
      t10 = space();
      input0 = element("input");
      t11 = space();
      div6 = element("div");
      label1 = element("label");
      span1 = element("span");
      t12 = text("Stroke Opacity");
      t13 = space();
      input1 = element("input");
      t14 = space();
      div7 = element("div");
      label2 = element("label");
      span2 = element("span");
      t15 = text("Start Distance ");
      t16 = text(t16_value);
      t17 = space();
      input2 = element("input");
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      a0 = claim_element(div0_nodes, "A", { href: true, class: true });
      var a0_nodes = children(a0);
      t0 = claim_text(a0_nodes, "https://github.com/DougAnderson444/svelte-plumb");
      a0_nodes.forEach(detach);
      div0_nodes.forEach(detach);
      t1 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      t2 = claim_text(div1_nodes, "by ");
      a1 = claim_element(div1_nodes, "A", { href: true, class: true });
      var a1_nodes = children(a1);
      t3 = claim_text(a1_nodes, "@DougAnderson444");
      a1_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      t4 = claim_text(div2_nodes, "\n\n	Match the picture to the words:");
      div2_nodes.forEach(detach);
      t5 = claim_space(nodes);
      div3 = claim_element(nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      claim_component(canvas.$$.fragment, div3_nodes);
      div3_nodes.forEach(detach);
      t6 = claim_space(nodes);
      div8 = claim_element(nodes, "DIV", { class: true });
      var div8_nodes = children(div8);
      div4 = claim_element(div8_nodes, "DIV", { class: true });
      var div4_nodes = children(div4);
      t7 = claim_text(div4_nodes, "Control Panel");
      div4_nodes.forEach(detach);
      t8 = claim_space(div8_nodes);
      div5 = claim_element(div8_nodes, "DIV", { class: true });
      var div5_nodes = children(div5);
      label0 = claim_element(div5_nodes, "LABEL", { class: true });
      var label0_nodes = children(label0);
      span0 = claim_element(label0_nodes, "SPAN", { class: true });
      var span0_nodes = children(span0);
      t9 = claim_text(span0_nodes, "Stroke Width");
      span0_nodes.forEach(detach);
      t10 = claim_space(label0_nodes);
      input0 = claim_element(label0_nodes, "INPUT", { type: true, min: true, max: true });
      label0_nodes.forEach(detach);
      div5_nodes.forEach(detach);
      t11 = claim_space(div8_nodes);
      div6 = claim_element(div8_nodes, "DIV", { class: true });
      var div6_nodes = children(div6);
      label1 = claim_element(div6_nodes, "LABEL", { class: true });
      var label1_nodes = children(label1);
      span1 = claim_element(label1_nodes, "SPAN", { class: true });
      var span1_nodes = children(span1);
      t12 = claim_text(span1_nodes, "Stroke Opacity");
      span1_nodes.forEach(detach);
      t13 = claim_space(label1_nodes);
      input1 = claim_element(label1_nodes, "INPUT", {
        type: true,
        min: true,
        max: true,
        step: true
      });
      label1_nodes.forEach(detach);
      div6_nodes.forEach(detach);
      t14 = claim_space(div8_nodes);
      div7 = claim_element(div8_nodes, "DIV", { class: true });
      var div7_nodes = children(div7);
      label2 = claim_element(div7_nodes, "LABEL", { class: true });
      var label2_nodes = children(label2);
      span2 = claim_element(label2_nodes, "SPAN", { class: true });
      var span2_nodes = children(span2);
      t15 = claim_text(span2_nodes, "Start Distance ");
      t16 = claim_text(span2_nodes, t16_value);
      span2_nodes.forEach(detach);
      t17 = claim_space(label2_nodes);
      input2 = claim_element(label2_nodes, "INPUT", {
        type: true,
        min: true,
        max: true,
        step: true
      });
      label2_nodes.forEach(detach);
      div7_nodes.forEach(detach);
      div8_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(a0, "href", "https://github.com/DougAnderson444/svelte-plumb");
      attr(a0, "class", "font-bold m-2 underline");
      attr(div0, "class", "my-4 p-2 bg-blue-100 rounded-lg w-fit");
      attr(a1, "href", "https://twitter.com/DougAnderson444");
      attr(a1, "class", "font-bold underline");
      attr(div1, "class", "my-4 p-2 bg-blue-100 rounded-lg w-fit");
      attr(div2, "class", "mb-4 ml-4 p-2 w-fit");
      attr(div3, "class", "border-dashed border-2 border-sky-500 rounded-lg bg-slate-100/10 m-4");
      attr(div4, "class", "text-lg font-bold underline");
      attr(span0, "class", "p-2");
      attr(input0, "type", "range");
      attr(input0, "min", "1");
      attr(input0, "max", "50");
      attr(label0, "class", "");
      attr(div5, "class", "my-4 p-4 bg-blue-200/50 rounded-lg shadow");
      attr(span1, "class", "p-2");
      attr(input1, "type", "range");
      attr(input1, "min", "0.1");
      attr(input1, "max", "1");
      attr(input1, "step", "0.1");
      attr(label1, "class", "");
      attr(div6, "class", "my-4 p-4 bg-blue-200/50 rounded-lg shadow");
      attr(span2, "class", "p-2");
      attr(input2, "type", "range");
      attr(input2, "min", "0%");
      attr(input2, "max", "90%");
      attr(input2, "step", "5%");
      attr(label2, "class", "");
      attr(div7, "class", "my-4 p-4 bg-blue-200/50 rounded-lg shadow");
      attr(div8, "class", "m-4 p-4 bg-slate-100 rounded-lg shadow-lg border");
    },
    m(target, anchor) {
      insert_hydration(target, div2, anchor);
      append_hydration(div2, div0);
      append_hydration(div0, a0);
      append_hydration(a0, t0);
      append_hydration(div2, t1);
      append_hydration(div2, div1);
      append_hydration(div1, t2);
      append_hydration(div1, a1);
      append_hydration(a1, t3);
      append_hydration(div2, t4);
      insert_hydration(target, t5, anchor);
      insert_hydration(target, div3, anchor);
      mount_component(canvas, div3, null);
      insert_hydration(target, t6, anchor);
      insert_hydration(target, div8, anchor);
      append_hydration(div8, div4);
      append_hydration(div4, t7);
      append_hydration(div8, t8);
      append_hydration(div8, div5);
      append_hydration(div5, label0);
      append_hydration(label0, span0);
      append_hydration(span0, t9);
      append_hydration(label0, t10);
      append_hydration(label0, input0);
      set_input_value(input0, ctx[1].links.strokeWidth);
      append_hydration(div8, t11);
      append_hydration(div8, div6);
      append_hydration(div6, label1);
      append_hydration(label1, span1);
      append_hydration(span1, t12);
      append_hydration(label1, t13);
      append_hydration(label1, input1);
      set_input_value(input1, ctx[1].links.strokeOpacity);
      append_hydration(div8, t14);
      append_hydration(div8, div7);
      append_hydration(div7, label2);
      append_hydration(label2, span2);
      append_hydration(span2, t15);
      append_hydration(span2, t16);
      append_hydration(label2, t17);
      append_hydration(label2, input2);
      set_input_value(input2, ctx[1].links.textStartOffset);
      current = true;
      if (!mounted) {
        dispose = [
          listen(input0, "change", ctx[8]),
          listen(input0, "input", ctx[8]),
          listen(input1, "change", ctx[9]),
          listen(input1, "input", ctx[9]),
          listen(input2, "change", ctx[10]),
          listen(input2, "input", ctx[10])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      const canvas_changes = {};
      if (dirty & 2)
        canvas_changes.opts = ctx2[1];
      if (dirty & 526341) {
        canvas_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_data && dirty & 1) {
        updating_data = true;
        canvas_changes.data = ctx2[0];
        add_flush_callback(() => updating_data = false);
      }
      canvas.$set(canvas_changes);
      if (dirty & 2) {
        set_input_value(input0, ctx2[1].links.strokeWidth);
      }
      if (dirty & 2) {
        set_input_value(input1, ctx2[1].links.strokeOpacity);
      }
      if ((!current || dirty & 2) && t16_value !== (t16_value = ctx2[1].links.textStartOffset + ""))
        set_data(t16, t16_value);
      if (dirty & 2) {
        set_input_value(input2, ctx2[1].links.textStartOffset);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(canvas.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(canvas.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div2);
      if (detaching)
        detach(t5);
      if (detaching)
        detach(div3);
      destroy_component(canvas);
      if (detaching)
        detach(t6);
      if (detaching)
        detach(div8);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let types = {
    emojii: "emojii",
    description: "description"
  };
  let data = {
    nodes: [
      { id: 1, type: types.emojii, value: "\u{1F431}" },
      { id: 2, type: types.emojii, value: "\u{1F984}" },
      { id: 3, type: types.emojii, value: "\u{1F410}" },
      {
        id: 4,
        type: types.description,
        value: "GOAT"
      },
      {
        id: 5,
        type: types.description,
        value: "Cat"
      },
      {
        id: 6,
        type: types.description,
        value: "A very nice Unicorn"
      }
    ],
    links: []
  };
  data.links = [
    {
      id: "2-to-6",
      source: { id: "2" },
      target: { id: "6" },
      opts: {
        label: {
          enabled: true,
          value: generateLinkLabel(data.nodes, "2", "6")
        }
      }
    }
  ];
  let opts = {
    links: { strokeWidth: 1, textStartOffset: 20 }
  };
  let toast = false;
  function handleConnected(e) {
    var _a, _b, _c, _d;
    $$invalidate(2, toast = ((_b = (_a = e.detail.source) == null ? void 0 : _a.dataset) == null ? void 0 : _b.value) + " to " + ((_d = (_c = e.detail.target) == null ? void 0 : _c.dataset) == null ? void 0 : _d.value));
    console.log(toast);
  }
  const func = (type, t) => t.type == type;
  function toast_1_toast_binding(value) {
    toast = value;
    $$invalidate(2, toast);
  }
  function canvas_data_binding(value) {
    data = value;
    $$invalidate(0, data);
  }
  function input0_change_input_handler() {
    opts.links.strokeWidth = to_number(this.value);
    $$invalidate(1, opts);
  }
  function input1_change_input_handler() {
    opts.links.strokeOpacity = to_number(this.value);
    $$invalidate(1, opts);
  }
  function input2_change_input_handler() {
    opts.links.textStartOffset = to_number(this.value);
    $$invalidate(1, opts);
  }
  return [
    data,
    opts,
    toast,
    types,
    handleConnected,
    func,
    toast_1_toast_binding,
    canvas_data_binding,
    input0_change_input_handler,
    input1_change_input_handler,
    input2_change_input_handler
  ];
}
class Routes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export {
  Routes as default
};
//# sourceMappingURL=index.svelte-54752021.js.map
