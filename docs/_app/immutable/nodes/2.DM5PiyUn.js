var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { run_all, safe_not_equal, create_slot, element, claim_element, children, detach, attr, set_style, add_render_callback, insert_hydration, add_iframe_resize_listener, update_slot_base, get_all_dirty_from_scope, get_slot_changes, binding_callbacks, noop as noop$2, assign, identity, empty, createEventDispatcher, onMount, svg_element, claim_svg_element, append_hydration, listen, action_destroyer, is_function, set_store_value, text, space, claim_text, claim_space, set_data, xlink_attr, get_svelte_dataset, subscribe, bubble, construct_svelte_component, destroy_each, add_flush_callback, flush, split_css_unit, set_input_value, to_number } from "../chunks/scheduler.CRCSXhcL.js";
import { transition_in, transition_out, SvelteComponent, init, now, loop, group_outros, check_outros, create_component, claim_component, mount_component, destroy_component, bind, create_bidirectional_transition } from "../chunks/index.Cfj7aiNl.js";
import { writable } from "../chunks/index.CNap3wX2.js";
const globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
function ensure_array_like(array_like_or_iterator) {
  return (array_like_or_iterator == null ? void 0 : array_like_or_iterator.length) !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function destroy_block(block, lookup) {
  block.d(1);
  lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, () => {
    lookup.delete(block.key);
  });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block2, next, get_context) {
  let o = old_blocks.length;
  let n = list.length;
  let i = o;
  const old_indexes = {};
  while (i--)
    old_indexes[old_blocks[i].key] = i;
  const new_blocks = [];
  const new_lookup = /* @__PURE__ */ new Map();
  const deltas = /* @__PURE__ */ new Map();
  const updates = [];
  i = n;
  while (i--) {
    const child_ctx = get_context(ctx, list, i);
    const key = get_key(child_ctx);
    let block = lookup.get(key);
    if (!block) {
      block = create_each_block2(key, child_ctx);
      block.c();
    } else if (dynamic) {
      updates.push(() => block.p(child_ctx, dirty));
    }
    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes)
      deltas.set(key, Math.abs(i - old_indexes[key]));
  }
  const will_move = /* @__PURE__ */ new Set();
  const did_move = /* @__PURE__ */ new Set();
  function insert(block) {
    transition_in(block, 1);
    block.m(node, next);
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }
  while (o && n) {
    const new_block = new_blocks[n - 1];
    const old_block = old_blocks[o - 1];
    const new_key = new_block.key;
    const old_key = old_block.key;
    if (new_block === old_block) {
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }
  while (o--) {
    const old_block = old_blocks[o];
    if (!new_lookup.has(old_block.key))
      destroy(old_block, lookup);
  }
  while (n)
    insert(new_blocks[n - 1]);
  run_all(updates);
  return new_blocks;
}
function get_spread_update(levels, updates) {
  const update = {};
  const to_null_out = {};
  const accounted_for = { $$scope: 1 };
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n))
          to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update))
      update[key] = void 0;
  }
  return update;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
let Pointer$1 = class Pointer {
  constructor(nativePointer) {
    this.id = -1;
    this.nativePointer = nativePointer;
    this.pageX = nativePointer.pageX;
    this.pageY = nativePointer.pageY;
    this.clientX = nativePointer.clientX;
    this.clientY = nativePointer.clientY;
    if (self.Touch && nativePointer instanceof Touch) {
      this.id = nativePointer.identifier;
    } else if (isPointerEvent$1(nativePointer)) {
      this.id = nativePointer.pointerId;
    }
  }
  /**
   * Returns an expanded set of Pointers for high-resolution inputs.
   */
  getCoalesced() {
    if ("getCoalescedEvents" in this.nativePointer) {
      const events = this.nativePointer.getCoalescedEvents().map((p) => new Pointer(p));
      if (events.length > 0)
        return events;
    }
    return [this];
  }
};
const isPointerEvent$1 = (event) => "pointerId" in event;
const isTouchEvent$1 = (event) => "changedTouches" in event;
const noop$1 = () => {
};
let PointerTracker$1 = class PointerTracker {
  /**
   * Track pointers across a particular element
   *
   * @param element Element to monitor.
   * @param options
   */
  constructor(_element, { start = () => true, move = noop$1, end = noop$1, rawUpdates = false, avoidPointerEvents = false, eventListenerOptions = { capture: false, passive: false, once: false } } = {}) {
    this._element = _element;
    this.startPointers = [];
    this.currentPointers = [];
    this._excludeFromButtonsCheck = /* @__PURE__ */ new Set();
    this._pointerStart = (event) => {
      if (isPointerEvent$1(event) && event.buttons === 0) {
        this._excludeFromButtonsCheck.add(event.pointerId);
      } else if (!(event.buttons & 1)) {
        return;
      }
      const pointer = new Pointer$1(event);
      if (this.currentPointers.some((p) => p.id === pointer.id))
        return;
      if (!this._triggerPointerStart(pointer, event))
        return;
      if (isPointerEvent$1(event)) {
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
        this._triggerPointerStart(new Pointer$1(touch), event);
      }
    };
    this._move = (event) => {
      if (!isTouchEvent$1(event) && (!isPointerEvent$1(event) || !this._excludeFromButtonsCheck.has(event.pointerId)) && event.buttons === 0) {
        this._pointerEnd(event);
        return;
      }
      const previousPointers = this.currentPointers.slice();
      const changedPointers = isTouchEvent$1(event) ? Array.from(event.changedTouches).map((t) => new Pointer$1(t)) : [new Pointer$1(event)];
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
      if (!isTouchEvent$1(event) && event.buttons & 1) {
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
      if (!this._triggerPointerEnd(new Pointer$1(event), event))
        return;
      if (isPointerEvent$1(event)) {
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
        this._triggerPointerEnd(new Pointer$1(touch), event);
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
  /**
   * Remove all listeners.
   */
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
  /**
   * Call the start callback for this pointer, and track it if the user wants.
   *
   * @param pointer Pointer
   * @param event Related event
   * @returns Whether the pointer is being tracked.
   */
  _triggerPointerStart(pointer, event) {
    if (!this._startCallback(pointer, event))
      return false;
    this.currentPointers.push(pointer);
    this.startPointers.push(pointer);
    return true;
  }
};
let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let nanoid = (size = 21) => {
  let id = "";
  let i = size;
  while (i--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};
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
    p: noop$2,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_fragment$a(ctx) {
  let div;
  let div_resize_listener;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[9].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[8],
    null
  );
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
      attr(
        div,
        "id",
        /*id*/
        ctx[1]
      );
      attr(div, "class", "absolute");
      set_style(
        div,
        "left",
        /*x*/
        ctx[5] + "px"
      );
      set_style(
        div,
        "top",
        /*y*/
        ctx[4] + "px"
      );
      add_render_callback(() => (
        /*div_elementresize_handler*/
        ctx[11].call(div)
      ));
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(div, null);
      }
      ctx[10](div);
      div_resize_listener = add_iframe_resize_listener(
        div,
        /*div_elementresize_handler*/
        ctx[11].bind(div)
      );
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        256)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[8],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[8]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[8],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*id*/
      2) {
        attr(
          div,
          "id",
          /*id*/
          ctx2[1]
        );
      }
      if (!current || dirty & /*x*/
      32) {
        set_style(
          div,
          "left",
          /*x*/
          ctx2[5] + "px"
        );
      }
      if (!current || dirty & /*y*/
      16) {
        set_style(
          div,
          "top",
          /*y*/
          ctx2[4] + "px"
        );
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
      if (detaching) {
        detach(div);
      }
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
    if ($$self.$$.dirty & /*left, offsetWidth*/
    68) {
      $$invalidate(5, x = left - offsetWidth / 2);
    }
    if ($$self.$$.dirty & /*top, offsetHeight*/
    136) {
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
function getDistance$1(x0, y0, x1, y1) {
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
  var distance = getDistance$1(cx0, cy0, cx1, cy1);
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
  var distanceBetween = getDistance$1(dix0, diy0, dix1, diy1);
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
    // a better curve here?
    [0, 1],
    [PI$1 * 0.125, 0],
    true
  );
  var distOffset = isColliding ? PI$1 * 0.5 * card : modulate(
    distEffect,
    // a better curve here?
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
    // Clamped to 2
  ), tix = _getPointBetween8[0], tiy = _getPointBetween8[1];
  var _rotatePoint = rotatePoint(tix, tiy, mx1, my1, PI$1 / 2 * rot), cixA = _rotatePoint[0], ciyA = _rotatePoint[1];
  var _rotatePoint2 = rotatePoint(tix, tiy, mx1, my1, PI$1 / 2 * -rot), cixB = _rotatePoint2[0], ciyB = _rotatePoint2[1];
  var _ref = isColliding && getDistance$1(cixA, ciyA, cx1, cy1) < getDistance$1(cixB, ciyB, cx1, cy1) ? [cixB, ciyB] : [cixA, ciyA], cix = _ref[0], ciy = _ref[1];
  var as = getAngle(cix, ciy, sx, sy);
  var ae = getAngle(cix, ciy, ex, ey);
  return [sx, sy, cix, ciy, ex, ey, ae, as, getAngle(sx, sy, ex, ey)];
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function quintOut(t) {
  return --t * t * t * t * t + 1;
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
    let {
      delay = 0,
      duration = 400,
      easing = identity,
      interpolate = get_interpolator
    } = assign(assign({}, defaults), opts);
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
      if (elapsed > /** @type {number} */
      duration) {
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
const get_deleteButton_slot_changes = (dirty) => ({});
const get_deleteButton_slot_context = (ctx) => ({});
const get_endPoint_slot_changes = (dirty) => ({
  sx: dirty[0] & /*sx*/
  8192,
  sy: dirty[0] & /*sy*/
  16384,
  ex: dirty[0] & /*ex*/
  131072,
  ey: dirty[0] & /*ey*/
  262144,
  pointer: dirty[0] & /*pointer*/
  4096
});
const get_endPoint_slot_context = (ctx) => ({
  sx: (
    /*sx*/
    ctx[13]
  ),
  sy: (
    /*sy*/
    ctx[14]
  ),
  ex: (
    /*ex*/
    ctx[17]
  ),
  ey: (
    /*ey*/
    ctx[18]
  ),
  pointer: (
    /*pointer*/
    ctx[12]
  )
});
const get_startPoint_slot_changes = (dirty) => ({
  sx: dirty[0] & /*sx*/
  8192,
  sy: dirty[0] & /*sy*/
  16384,
  ex: dirty[0] & /*ex*/
  131072,
  ey: dirty[0] & /*ey*/
  262144,
  as: dirty[0] & /*as*/
  524288
});
const get_startPoint_slot_context = (ctx) => ({
  sx: (
    /*sx*/
    ctx[13]
  ),
  sy: (
    /*sy*/
    ctx[14]
  ),
  ex: (
    /*ex*/
    ctx[17]
  ),
  ey: (
    /*ey*/
    ctx[18]
  ),
  as: (
    /*as*/
    ctx[19]
  )
});
function create_if_block$6(ctx) {
  let g;
  let path;
  let path_id_value;
  let clickOutside_action;
  let if_block0_anchor;
  let current;
  let mounted;
  let dispose;
  function select_block_type(ctx2, dirty) {
    if (
      /*sx*/
      ctx2[13] < /*ex*/
      ctx2[17]
    )
      return create_if_block_3$2;
    return create_else_block$1;
  }
  let current_block_type = select_block_type(ctx);
  let if_block0 = current_block_type(ctx);
  const startPoint_slot_template = (
    /*#slots*/
    ctx[27].startPoint
  );
  const startPoint_slot = create_slot(
    startPoint_slot_template,
    ctx,
    /*$$scope*/
    ctx[26],
    get_startPoint_slot_context
  );
  const startPoint_slot_or_fallback = startPoint_slot || fallback_block_2(ctx);
  const endPoint_slot_template = (
    /*#slots*/
    ctx[27].endPoint
  );
  const endPoint_slot = create_slot(
    endPoint_slot_template,
    ctx,
    /*$$scope*/
    ctx[26],
    get_endPoint_slot_context
  );
  const endPoint_slot_or_fallback = endPoint_slot || fallback_block_1(ctx);
  let if_block1 = (
    /*selected*/
    ctx[9] && create_if_block_1$2(ctx)
  );
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
        "stroke-opacity": true,
        "stroke-dasharray": true,
        role: true,
        tabindex: true
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
      attr(
        path,
        "d",
        /*d*/
        ctx[11]
      );
      attr(path, "id", path_id_value = /*link*/
      ctx[1].id);
      attr(
        path,
        "stroke-width",
        /*strokeWidth*/
        ctx[0]
      );
      attr(
        path,
        "stroke",
        /*strokeColor*/
        ctx[2]
      );
      attr(path, "fill", "none");
      attr(path, "stroke-linecap", "round");
      attr(
        path,
        "stroke-opacity",
        /*strokeOpacity*/
        ctx[4]
      );
      attr(path, "stroke-dasharray", "4");
      attr(path, "role", "link");
      attr(path, "tabindex", "0");
      attr(
        g,
        "stroke",
        /*groupStrokeColor*/
        ctx[6]
      );
      attr(
        g,
        "stroke-opacity",
        /*groupStrokeOpacity*/
        ctx[5]
      );
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
          listen(
            path,
            "click",
            /*click_handler*/
            ctx[28]
          ),
          listen(
            path,
            "keypress",
            /*keypress_handler*/
            ctx[29]
          ),
          listen(
            path,
            "mouseover",
            /*handleMouseOver*/
            ctx[21]
          ),
          listen(
            path,
            "mouseout",
            /*handleMouseOut*/
            ctx[22]
          ),
          listen(
            path,
            "focus",
            /*handleMouseOver*/
            ctx[21]
          ),
          listen(
            path,
            "blur",
            /*handleMouseOut*/
            ctx[22]
          ),
          action_destroyer(clickOutside_action = clickOutside.call(null, path, {
            enabled: (
              /*selected*/
              ctx[9]
            ),
            handleUnselect: (
              /*handleUnselect*/
              ctx[23]
            )
          }))
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (!current || dirty[0] & /*d*/
      2048) {
        attr(
          path,
          "d",
          /*d*/
          ctx2[11]
        );
      }
      if (!current || dirty[0] & /*link*/
      2 && path_id_value !== (path_id_value = /*link*/
      ctx2[1].id)) {
        attr(path, "id", path_id_value);
      }
      if (!current || dirty[0] & /*strokeWidth*/
      1) {
        attr(
          path,
          "stroke-width",
          /*strokeWidth*/
          ctx2[0]
        );
      }
      if (!current || dirty[0] & /*strokeColor*/
      4) {
        attr(
          path,
          "stroke",
          /*strokeColor*/
          ctx2[2]
        );
      }
      if (!current || dirty[0] & /*strokeOpacity*/
      16) {
        attr(
          path,
          "stroke-opacity",
          /*strokeOpacity*/
          ctx2[4]
        );
      }
      if (clickOutside_action && is_function(clickOutside_action.update) && dirty[0] & /*selected*/
      512)
        clickOutside_action.update.call(null, {
          enabled: (
            /*selected*/
            ctx2[9]
          ),
          handleUnselect: (
            /*handleUnselect*/
            ctx2[23]
          )
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
        if (startPoint_slot.p && (!current || dirty[0] & /*$$scope, sx, sy, ex, ey, as*/
        68050944)) {
          update_slot_base(
            startPoint_slot,
            startPoint_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[26],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[26]
            ) : get_slot_changes(
              startPoint_slot_template,
              /*$$scope*/
              ctx2[26],
              dirty,
              get_startPoint_slot_changes
            ),
            get_startPoint_slot_context
          );
        }
      } else {
        if (startPoint_slot_or_fallback && startPoint_slot_or_fallback.p && (!current || dirty[0] & /*sx, sy*/
        24576)) {
          startPoint_slot_or_fallback.p(ctx2, !current ? [-1, -1] : dirty);
        }
      }
      if (endPoint_slot) {
        if (endPoint_slot.p && (!current || dirty[0] & /*$$scope, sx, sy, ex, ey, pointer*/
        67530752)) {
          update_slot_base(
            endPoint_slot,
            endPoint_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[26],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[26]
            ) : get_slot_changes(
              endPoint_slot_template,
              /*$$scope*/
              ctx2[26],
              dirty,
              get_endPoint_slot_changes
            ),
            get_endPoint_slot_context
          );
        }
      } else {
        if (endPoint_slot_or_fallback && endPoint_slot_or_fallback.p && (!current || dirty[0] & /*pointer, arrowColor*/
        4104)) {
          endPoint_slot_or_fallback.p(ctx2, !current ? [-1, -1] : dirty);
        }
      }
      if (
        /*selected*/
        ctx2[9]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*selected*/
          512) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1$2(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(g, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (!current || dirty[0] & /*groupStrokeColor*/
      64) {
        attr(
          g,
          "stroke",
          /*groupStrokeColor*/
          ctx2[6]
        );
      }
      if (!current || dirty[0] & /*groupStrokeOpacity*/
      32) {
        attr(
          g,
          "stroke-opacity",
          /*groupStrokeOpacity*/
          ctx2[5]
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(startPoint_slot_or_fallback, local);
      transition_in(endPoint_slot_or_fallback, local);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(startPoint_slot_or_fallback, local);
      transition_out(endPoint_slot_or_fallback, local);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(g);
      }
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
  let t0_value = (
    /*link*/
    (((_c = (_b = (_a = ctx[1]) == null ? void 0 : _a.opts) == null ? void 0 : _b.label) == null ? void 0 : _c.enabled) ? (
      /*link*/
      (_f = (_e = (_d = ctx[1]) == null ? void 0 : _d.opts) == null ? void 0 : _e.label) == null ? void 0 : _f.value
    ) : "") + ""
  );
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
      attr(tspan, "class", "svelte-1suvvnl");
      attr(
        text_1,
        "x",
        /*cx*/
        ctx[15]
      );
      attr(
        text_1,
        "y",
        /*cy*/
        ctx[16]
      );
      attr(text_1, "class", "svelte-1suvvnl");
    },
    m(target, anchor) {
      insert_hydration(target, text_1, anchor);
      append_hydration(text_1, tspan);
      append_hydration(tspan, t0);
      append_hydration(text_1, t1);
    },
    p(ctx2, dirty) {
      var _a2, _b2, _c2, _d2, _e2, _f2;
      if (dirty[0] & /*link*/
      2 && t0_value !== (t0_value = /*link*/
      (((_c2 = (_b2 = (_a2 = ctx2[1]) == null ? void 0 : _a2.opts) == null ? void 0 : _b2.label) == null ? void 0 : _c2.enabled) ? (
        /*link*/
        (_f2 = (_e2 = (_d2 = ctx2[1]) == null ? void 0 : _d2.opts) == null ? void 0 : _e2.label) == null ? void 0 : _f2.value
      ) : "") + ""))
        set_data(t0, t0_value);
      if (dirty[0] & /*cx*/
      32768) {
        attr(
          text_1,
          "x",
          /*cx*/
          ctx2[15]
        );
      }
      if (dirty[0] & /*cy*/
      65536) {
        attr(
          text_1,
          "y",
          /*cy*/
          ctx2[16]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(text_1);
      }
    }
  };
}
function create_if_block_3$2(ctx) {
  var _a, _b, _c, _d, _e, _f;
  let text_1;
  let textPath;
  let tspan;
  let t0_value = (
    /*link*/
    (((_c = (_b = (_a = ctx[1]) == null ? void 0 : _a.opts) == null ? void 0 : _b.label) == null ? void 0 : _c.enabled) ? (
      /*link*/
      (_f = (_e = (_d = ctx[1]) == null ? void 0 : _d.opts) == null ? void 0 : _e.label) == null ? void 0 : _f.value
    ) : "") + ""
  );
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
      attr(tspan, "class", "svelte-1suvvnl");
      xlink_attr(textPath, "xlink:href", textPath_xlink_href_value = "#" + /*link*/
      ctx[1].id);
      attr(textPath, "startOffset", textPath_startOffset_value = /*textStartOffset*/
      ctx[7] + "%");
      attr(text_1, "class", "svelte-1suvvnl");
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
      if (dirty[0] & /*link*/
      2 && t0_value !== (t0_value = /*link*/
      (((_c2 = (_b2 = (_a2 = ctx2[1]) == null ? void 0 : _a2.opts) == null ? void 0 : _b2.label) == null ? void 0 : _c2.enabled) ? (
        /*link*/
        (_f2 = (_e2 = (_d2 = ctx2[1]) == null ? void 0 : _d2.opts) == null ? void 0 : _e2.label) == null ? void 0 : _f2.value
      ) : "") + ""))
        set_data(t0, t0_value);
      if (dirty[0] & /*link*/
      2 && textPath_xlink_href_value !== (textPath_xlink_href_value = "#" + /*link*/
      ctx2[1].id)) {
        xlink_attr(textPath, "xlink:href", textPath_xlink_href_value);
      }
      if (dirty[0] & /*textStartOffset*/
      128 && textPath_startOffset_value !== (textPath_startOffset_value = /*textStartOffset*/
      ctx2[7] + "%")) {
        attr(textPath, "startOffset", textPath_startOffset_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(text_1);
      }
    }
  };
}
function fallback_block_2(ctx) {
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
      attr(
        circle,
        "cx",
        /*sx*/
        ctx[13]
      );
      attr(
        circle,
        "cy",
        /*sy*/
        ctx[14]
      );
      attr(circle, "r", 4);
    },
    m(target, anchor) {
      insert_hydration(target, circle, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*sx*/
      8192) {
        attr(
          circle,
          "cx",
          /*sx*/
          ctx2[13]
        );
      }
      if (dirty[0] & /*sy*/
      16384) {
        attr(
          circle,
          "cy",
          /*sy*/
          ctx2[14]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(circle);
      }
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
      attr(
        polygon,
        "transform",
        /*pointer*/
        ctx[12]
      );
      attr(
        polygon,
        "fill",
        /*arrowColor*/
        ctx[3]
      );
    },
    m(target, anchor) {
      insert_hydration(target, polygon, anchor);
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*pointer*/
      4096) {
        attr(
          polygon,
          "transform",
          /*pointer*/
          ctx2[12]
        );
      }
      if (dirty[0] & /*arrowColor*/
      8) {
        attr(
          polygon,
          "fill",
          /*arrowColor*/
          ctx2[3]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(polygon);
      }
    }
  };
}
function fallback_block_1(ctx) {
  let if_block_anchor;
  let if_block = (
    /*pointer*/
    ctx[12] && create_if_block_2$2(ctx)
  );
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
      if (
        /*pointer*/
        ctx2[12]
      ) {
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
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function create_if_block_1$2(ctx) {
  let circle;
  let foreignObject;
  let current;
  const deleteButton_slot_template = (
    /*#slots*/
    ctx[27].deleteButton
  );
  const deleteButton_slot = create_slot(
    deleteButton_slot_template,
    ctx,
    /*$$scope*/
    ctx[26],
    get_deleteButton_slot_context
  );
  const deleteButton_slot_or_fallback = deleteButton_slot || fallback_block$4(ctx);
  return {
    c() {
      circle = svg_element("circle");
      foreignObject = svg_element("foreignObject");
      if (deleteButton_slot_or_fallback)
        deleteButton_slot_or_fallback.c();
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
      foreignObject = claim_svg_element(nodes, "foreignObject", {
        style: true,
        x: true,
        y: true,
        width: true,
        height: true
      });
      var foreignObject_nodes = children(foreignObject);
      if (deleteButton_slot_or_fallback)
        deleteButton_slot_or_fallback.l(foreignObject_nodes);
      foreignObject_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(
        circle,
        "cx",
        /*ex*/
        ctx[17]
      );
      attr(
        circle,
        "cy",
        /*ey*/
        ctx[18]
      );
      attr(circle, "r", 12);
      attr(circle, "fill", "none");
      attr(circle, "stroke", "blue");
      set_style(foreignObject, "overflow", "visible");
      set_style(foreignObject, "pointer-events", "auto");
      set_style(foreignObject, "position", "relative");
      attr(
        foreignObject,
        "x",
        /*cx*/
        ctx[15]
      );
      attr(
        foreignObject,
        "y",
        /*cy*/
        ctx[16]
      );
      attr(foreignObject, "width", "1");
      attr(foreignObject, "height", "1");
    },
    m(target, anchor) {
      insert_hydration(target, circle, anchor);
      insert_hydration(target, foreignObject, anchor);
      if (deleteButton_slot_or_fallback) {
        deleteButton_slot_or_fallback.m(foreignObject, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (!current || dirty[0] & /*ex*/
      131072) {
        attr(
          circle,
          "cx",
          /*ex*/
          ctx2[17]
        );
      }
      if (!current || dirty[0] & /*ey*/
      262144) {
        attr(
          circle,
          "cy",
          /*ey*/
          ctx2[18]
        );
      }
      if (deleteButton_slot) {
        if (deleteButton_slot.p && (!current || dirty[0] & /*$$scope*/
        67108864)) {
          update_slot_base(
            deleteButton_slot,
            deleteButton_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[26],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[26]
            ) : get_slot_changes(
              deleteButton_slot_template,
              /*$$scope*/
              ctx2[26],
              dirty,
              get_deleteButton_slot_changes
            ),
            get_deleteButton_slot_context
          );
        }
      } else {
        if (deleteButton_slot_or_fallback && deleteButton_slot_or_fallback.p && (!current || dirty[0] & /*link*/
        2)) {
          deleteButton_slot_or_fallback.p(ctx2, !current ? [-1, -1] : dirty);
        }
      }
      if (!current || dirty[0] & /*cx*/
      32768) {
        attr(
          foreignObject,
          "x",
          /*cx*/
          ctx2[15]
        );
      }
      if (!current || dirty[0] & /*cy*/
      65536) {
        attr(
          foreignObject,
          "y",
          /*cy*/
          ctx2[16]
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(deleteButton_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(deleteButton_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(circle);
        detach(foreignObject);
      }
      if (deleteButton_slot_or_fallback)
        deleteButton_slot_or_fallback.d(detaching);
    }
  };
}
function fallback_block$4(ctx) {
  let button;
  let textContent = "X";
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = textContent;
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { style: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(button) !== "svelte-q2js1a")
        button.textContent = textContent;
      this.h();
    },
    h() {
      set_style(button, "font-family", "'Luckiest Guy'");
      set_style(button, "width", "fit-content");
      set_style(button, "height", "fit-content");
      set_style(button, "color", "rgb(239 68 68)");
      set_style(button, "font-size", "1.5em");
      set_style(button, "user-select", "none");
      set_style(button, "outline", "none");
      set_style(button, "transform", `translate(180deg)`);
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      if (!mounted) {
        dispose = listen(
          button,
          "click",
          /*click_handler_1*/
          ctx[30]
        );
        mounted = true;
      }
    },
    p: noop$2,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$9(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*link*/
    ctx[1] && /*mounted*/
    ctx[10] && create_if_block$6(ctx)
  );
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
      if (
        /*link*/
        ctx2[1] && /*mounted*/
        ctx2[10]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*link, mounted*/
          1026) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$6(ctx2);
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
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block)
        if_block.d(detaching);
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
  let $stroke, $$unsubscribe_stroke = noop$2, $$subscribe_stroke = () => ($$unsubscribe_stroke(), $$unsubscribe_stroke = subscribe(stroke, ($$value) => $$invalidate(25, $stroke = $$value)), stroke);
  $$self.$$.on_destroy.push(() => $$unsubscribe_stroke());
  let { $$slots: slots = {}, $$scope } = $$props;
  let { link } = $$props;
  let { scale } = $$props;
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
  let options = {
    bow: 0.05,
    stretch: 0.5,
    stretchMin: 10,
    stretchMax: 200,
    padStart: 0,
    padEnd: 15,
    flip: false,
    straights: true
  };
  let x0, y0, w0, h0, x1, y1, w1, h1;
  let sx, sy, cx, cy, ex, ey, ae, as, ac;
  function genArrow(link2) {
    let sourceEl = document.getElementById(link2.source.id);
    let targetEl = document.getElementById(link2.target.id);
    let canvasEl = sourceEl.closest("[data-canvas]");
    if (!sourceEl || !targetEl)
      return;
    let source = getCoords(sourceEl);
    let target = getCoords(targetEl);
    let canvas = getCoords(canvasEl);
    x0 = (source.left - canvas.left) / scale;
    y0 = (source.top - canvas.top) / scale;
    x1 = (target.left - canvas.left) / scale;
    y1 = (target.top - canvas.top) / scale;
    w0 = (source.right - source.left) / scale;
    h0 = (source.bottom - source.top) / scale;
    w1 = (target.right - target.left) / scale;
    h1 = (target.bottom - target.top) / scale;
    const arrow = getBoxToBoxArrow(x0, y0, w0, h0, x1, y1, w1, h1, options);
    $$invalidate(13, [sx, sy, cx, cy, ex, ey, ae, as, ac] = arrow, sx, $$invalidate(14, sy), $$invalidate(15, cx), $$invalidate(16, cy), $$invalidate(17, ex), $$invalidate(18, ey), $$invalidate(19, as));
    $$invalidate(11, d = `M${sx},${sy} Q${cx},${cy} ${ex},${ey}`);
    let endAngleAsDegrees = ae * (180 / Math.PI);
    $$invalidate(12, pointer = `translate(${ex},${ey}) rotate(${endAngleAsDegrees})`);
  }
  function handleMouseOver(e) {
    $$invalidate(9, selected = true);
    $$invalidate(0, strokeWidth = initialStrokeWidth * 20);
  }
  function handleMouseOut(e) {
    $$subscribe_stroke($$invalidate(8, stroke = tweened(strokeWidth, { duration: 1e3 })));
    set_store_value(stroke, $stroke = initialStrokeWidth, $stroke);
  }
  function handleUnselect(e) {
    $$invalidate(9, selected = false);
  }
  const click_handler = () => $$invalidate(9, selected = !selected);
  const keypress_handler = () => $$invalidate(9, selected = !selected);
  const click_handler_1 = () => dispatch("removeLink", link.id);
  $$self.$$set = ($$props2) => {
    if ("link" in $$props2)
      $$invalidate(1, link = $$props2.link);
    if ("scale" in $$props2)
      $$invalidate(24, scale = $$props2.scale);
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
      $$invalidate(26, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*link*/
    2) {
      if (link)
        genArrow(link);
    }
    if ($$self.$$.dirty[0] & /*$stroke*/
    33554432) {
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
    scale,
    $stroke,
    $$scope,
    slots,
    click_handler,
    keypress_handler,
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
        scale: 24,
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
function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[11] = list[i];
  return child_ctx;
}
function create_if_block$5(ctx) {
  let svg;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let current;
  let each_value = ensure_array_like(
    /*links*/
    ctx[0]
  );
  const get_key = (ctx2) => (
    /*link*/
    ctx2[11].id
  );
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
      set_style(svg, "overflow", "visible");
      attr(svg, "class", "svelte-s6duoo");
    },
    m(target, anchor) {
      insert_hydration(target, svg, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(svg, null);
        }
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*links, strokeColor, strokeWidth, arrowColor, strokeOpacity, groupStrokeOpacity, groupStrokeColor, textStartOffset, scale, sx, sy, ex, ey, as, pointer, mounted*/
      1033215) {
        each_value = ensure_array_like(
          /*links*/
          ctx2[0]
        );
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
      if (detaching) {
        detach(svg);
      }
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
    }
  };
}
function create_if_block_1$1(ctx) {
  let link_1;
  let current;
  link_1 = new Link({
    props: {
      link: (
        /*link*/
        ctx[11]
      ),
      strokeColor: (
        /*strokeColor*/
        ctx[2]
      ),
      strokeWidth: (
        /*strokeWidth*/
        ctx[3]
      ),
      arrowColor: (
        /*arrowColor*/
        ctx[4]
      ),
      strokeOpacity: (
        /*strokeOpacity*/
        ctx[5]
      ),
      groupStrokeOpacity: (
        /*groupStrokeOpacity*/
        ctx[6]
      ),
      groupStrokeColor: (
        /*groupStrokeColor*/
        ctx[7]
      ),
      textStartOffset: (
        /*textStartOffset*/
        ctx[8]
      ),
      scale: (
        /*scale*/
        ctx[1]
      ),
      $$slots: {
        endPoint: [
          create_endPoint_slot,
          ({ sx, sy, ex, ey, as, pointer }) => ({
            14: sx,
            15: sy,
            16: ex,
            17: ey,
            18: as,
            19: pointer
          }),
          ({ sx, sy, ex, ey, as, pointer }) => (sx ? 16384 : 0) | (sy ? 32768 : 0) | (ex ? 65536 : 0) | (ey ? 131072 : 0) | (as ? 262144 : 0) | (pointer ? 524288 : 0)
        ],
        startPoint: [
          create_startPoint_slot,
          ({ sx, sy, ex, ey, as }) => ({ 14: sx, 15: sy, 16: ex, 17: ey, 18: as }),
          ({ sx, sy, ex, ey, as }) => (sx ? 16384 : 0) | (sy ? 32768 : 0) | (ex ? 65536 : 0) | (ey ? 131072 : 0) | (as ? 262144 : 0)
        ]
      },
      $$scope: { ctx }
    }
  });
  link_1.$on(
    "removeLink",
    /*removeLink_handler*/
    ctx[10]
  );
  return {
    c() {
      create_component(link_1.$$.fragment);
    },
    l(nodes) {
      claim_component(link_1.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(link_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const link_1_changes = {};
      if (dirty & /*links*/
      1)
        link_1_changes.link = /*link*/
        ctx2[11];
      if (dirty & /*strokeColor*/
      4)
        link_1_changes.strokeColor = /*strokeColor*/
        ctx2[2];
      if (dirty & /*strokeWidth*/
      8)
        link_1_changes.strokeWidth = /*strokeWidth*/
        ctx2[3];
      if (dirty & /*arrowColor*/
      16)
        link_1_changes.arrowColor = /*arrowColor*/
        ctx2[4];
      if (dirty & /*strokeOpacity*/
      32)
        link_1_changes.strokeOpacity = /*strokeOpacity*/
        ctx2[5];
      if (dirty & /*groupStrokeOpacity*/
      64)
        link_1_changes.groupStrokeOpacity = /*groupStrokeOpacity*/
        ctx2[6];
      if (dirty & /*groupStrokeColor*/
      128)
        link_1_changes.groupStrokeColor = /*groupStrokeColor*/
        ctx2[7];
      if (dirty & /*textStartOffset*/
      256)
        link_1_changes.textStartOffset = /*textStartOffset*/
        ctx2[8];
      if (dirty & /*scale*/
      2)
        link_1_changes.scale = /*scale*/
        ctx2[1];
      if (dirty & /*$$scope, sx, sy, links, ex, ey, as, pointer, arrowColor*/
      2080785) {
        link_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      link_1.$set(link_1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(link_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(link_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(link_1, detaching);
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
      attr(circle, "cx", circle_cx_value = /*sx*/
      ctx[14]);
      attr(circle, "cy", circle_cy_value = /*sy*/
      ctx[15]);
      attr(circle, "r", 4);
    },
    m(target, anchor) {
      insert_hydration(target, circle, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*sx*/
      16384 && circle_cx_value !== (circle_cx_value = /*sx*/
      ctx2[14])) {
        attr(circle, "cx", circle_cx_value);
      }
      if (dirty & /*sy*/
      32768 && circle_cy_value !== (circle_cy_value = /*sy*/
      ctx2[15])) {
        attr(circle, "cy", circle_cy_value);
      }
    },
    i: noop$2,
    o: noop$2,
    d(detaching) {
      if (detaching) {
        detach(circle);
      }
    }
  };
}
function create_if_block_4(ctx) {
  let foreignObject;
  let switch_instance;
  let foreignObject_x_value;
  let foreignObject_y_value;
  let current;
  var switch_value = (
    /*link*/
    ctx[11].source.startPoint.component
  );
  function switch_props(ctx2, dirty) {
    return {
      props: {
        sx: (
          /*sx*/
          ctx2[14]
        ),
        sy: (
          /*sy*/
          ctx2[15]
        ),
        as: (
          /*as*/
          ctx2[18]
        )
      }
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
  }
  return {
    c() {
      foreignObject = svg_element("foreignObject");
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      this.h();
    },
    l(nodes) {
      foreignObject = claim_svg_element(nodes, "foreignObject", {
        x: true,
        y: true,
        width: true,
        height: true
      });
      var foreignObject_nodes = children(foreignObject);
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, foreignObject_nodes);
      foreignObject_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(foreignObject, "x", foreignObject_x_value = /*sx*/
      ctx[14]);
      attr(foreignObject, "y", foreignObject_y_value = /*sy*/
      ctx[15]);
      attr(foreignObject, "width", "1");
      attr(foreignObject, "height", "1");
      set_style(foreignObject, "overflow", `visible`);
      set_style(foreignObject, "position", `relative`);
      set_style(foreignObject, "pointer-events", `auto`);
    },
    m(target, anchor) {
      insert_hydration(target, foreignObject, anchor);
      if (switch_instance)
        mount_component(switch_instance, foreignObject, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*links*/
      1 && switch_value !== (switch_value = /*link*/
      ctx2[11].source.startPoint.component)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, foreignObject, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = {};
        if (dirty & /*sx*/
        16384)
          switch_instance_changes.sx = /*sx*/
          ctx2[14];
        if (dirty & /*sy*/
        32768)
          switch_instance_changes.sy = /*sy*/
          ctx2[15];
        if (dirty & /*as*/
        262144)
          switch_instance_changes.as = /*as*/
          ctx2[18];
        switch_instance.$set(switch_instance_changes);
      }
      if (!current || dirty & /*sx*/
      16384 && foreignObject_x_value !== (foreignObject_x_value = /*sx*/
      ctx2[14])) {
        attr(foreignObject, "x", foreignObject_x_value);
      }
      if (!current || dirty & /*sy*/
      32768 && foreignObject_y_value !== (foreignObject_y_value = /*sy*/
      ctx2[15])) {
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
      if (detaching) {
        detach(foreignObject);
      }
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
    var _a, _b, _c;
    if (
      /*link*/
      (_c = (_b = (_a = ctx2[11]) == null ? void 0 : _a.source) == null ? void 0 : _b.startPoint) == null ? void 0 : _c.component
    )
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
      if (detaching) {
        detach(t);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function create_else_block(ctx) {
  let if_block_anchor;
  let if_block = (
    /*pointer*/
    ctx[19] && create_if_block_3$1(ctx)
  );
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
      if (
        /*pointer*/
        ctx2[19]
      ) {
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
    i: noop$2,
    o: noop$2,
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function create_if_block_2$1(ctx) {
  let foreignObject;
  let switch_instance;
  let foreignObject_x_value;
  let foreignObject_y_value;
  let current;
  var switch_value = (
    /*link*/
    ctx[11].source.endPoint.component
  );
  function switch_props(ctx2, dirty) {
    return {
      props: {
        sx: (
          /*sx*/
          ctx2[14]
        ),
        sy: (
          /*sy*/
          ctx2[15]
        ),
        ex: (
          /*ex*/
          ctx2[16]
        ),
        ey: (
          /*ey*/
          ctx2[17]
        ),
        as: (
          /*as*/
          ctx2[18]
        )
      }
    };
  }
  if (switch_value) {
    switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
  }
  return {
    c() {
      foreignObject = svg_element("foreignObject");
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      this.h();
    },
    l(nodes) {
      foreignObject = claim_svg_element(nodes, "foreignObject", {
        class: true,
        x: true,
        y: true,
        width: true,
        height: true
      });
      var foreignObject_nodes = children(foreignObject);
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, foreignObject_nodes);
      foreignObject_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(foreignObject, "class", "overflow-visible pointer-events-auto relative");
      attr(foreignObject, "x", foreignObject_x_value = /*sx*/
      ctx[14]);
      attr(foreignObject, "y", foreignObject_y_value = /*sy*/
      ctx[15]);
      attr(foreignObject, "width", "1");
      attr(foreignObject, "height", "1");
    },
    m(target, anchor) {
      insert_hydration(target, foreignObject, anchor);
      if (switch_instance)
        mount_component(switch_instance, foreignObject, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*links*/
      1 && switch_value !== (switch_value = /*link*/
      ctx2[11].source.endPoint.component)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = construct_svelte_component(switch_value, switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, foreignObject, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        const switch_instance_changes = {};
        if (dirty & /*sx*/
        16384)
          switch_instance_changes.sx = /*sx*/
          ctx2[14];
        if (dirty & /*sy*/
        32768)
          switch_instance_changes.sy = /*sy*/
          ctx2[15];
        if (dirty & /*ex*/
        65536)
          switch_instance_changes.ex = /*ex*/
          ctx2[16];
        if (dirty & /*ey*/
        131072)
          switch_instance_changes.ey = /*ey*/
          ctx2[17];
        if (dirty & /*as*/
        262144)
          switch_instance_changes.as = /*as*/
          ctx2[18];
        switch_instance.$set(switch_instance_changes);
      }
      if (!current || dirty & /*sx*/
      16384 && foreignObject_x_value !== (foreignObject_x_value = /*sx*/
      ctx2[14])) {
        attr(foreignObject, "x", foreignObject_x_value);
      }
      if (!current || dirty & /*sy*/
      32768 && foreignObject_y_value !== (foreignObject_y_value = /*sy*/
      ctx2[15])) {
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
      if (detaching) {
        detach(foreignObject);
      }
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
      attr(polygon, "transform", polygon_transform_value = /*pointer*/
      ctx[19]);
      attr(
        polygon,
        "fill",
        /*arrowColor*/
        ctx[4]
      );
    },
    m(target, anchor) {
      insert_hydration(target, polygon, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*pointer*/
      524288 && polygon_transform_value !== (polygon_transform_value = /*pointer*/
      ctx2[19])) {
        attr(polygon, "transform", polygon_transform_value);
      }
      if (dirty & /*arrowColor*/
      16) {
        attr(
          polygon,
          "fill",
          /*arrowColor*/
          ctx2[4]
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(polygon);
      }
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
    var _a, _b, _c;
    if (
      /*link*/
      (_c = (_b = (_a = ctx2[11]) == null ? void 0 : _a.source) == null ? void 0 : _b.endPoint) == null ? void 0 : _c.component
    )
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
      if (detaching) {
        detach(t);
      }
      if_blocks[current_block_type_index].d(detaching);
    }
  };
}
function create_each_block$2(key_1, ctx) {
  let first;
  let if_block_anchor;
  let current;
  let if_block = (
    /*link*/
    ctx[11] && /*mounted*/
    ctx[9] && create_if_block_1$1(ctx)
  );
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
      if (
        /*link*/
        ctx[11] && /*mounted*/
        ctx[9]
      ) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty & /*links, mounted*/
          513) {
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
      if (detaching) {
        detach(first);
        detach(if_block_anchor);
      }
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function create_fragment$8(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*mounted*/
    ctx[9] && /*links*/
    ctx[0] && /*links*/
    ctx[0].length > 0 && create_if_block$5(ctx)
  );
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
      if (
        /*mounted*/
        ctx2[9] && /*links*/
        ctx2[0] && /*links*/
        ctx2[0].length > 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*mounted, links*/
          513) {
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
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function instance$8($$self, $$props, $$invalidate) {
  let { links } = $$props;
  let { scale } = $$props;
  let { strokeColor = "currentColor" } = $$props;
  let { strokeWidth = 1 } = $$props;
  let { arrowColor = "currentColor" } = $$props;
  let { strokeOpacity = "0.3" } = $$props;
  let { groupStrokeOpacity = "0.1" } = $$props;
  let { groupStrokeColor = "white" } = $$props;
  let { textStartOffset = 20 } = $$props;
  let mounted;
  onMount(() => {
    $$invalidate(9, mounted = true);
  });
  function removeLink_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("links" in $$props2)
      $$invalidate(0, links = $$props2.links);
    if ("scale" in $$props2)
      $$invalidate(1, scale = $$props2.scale);
    if ("strokeColor" in $$props2)
      $$invalidate(2, strokeColor = $$props2.strokeColor);
    if ("strokeWidth" in $$props2)
      $$invalidate(3, strokeWidth = $$props2.strokeWidth);
    if ("arrowColor" in $$props2)
      $$invalidate(4, arrowColor = $$props2.arrowColor);
    if ("strokeOpacity" in $$props2)
      $$invalidate(5, strokeOpacity = $$props2.strokeOpacity);
    if ("groupStrokeOpacity" in $$props2)
      $$invalidate(6, groupStrokeOpacity = $$props2.groupStrokeOpacity);
    if ("groupStrokeColor" in $$props2)
      $$invalidate(7, groupStrokeColor = $$props2.groupStrokeColor);
    if ("textStartOffset" in $$props2)
      $$invalidate(8, textStartOffset = $$props2.textStartOffset);
  };
  return [
    links,
    scale,
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
      scale: 1,
      strokeColor: 2,
      strokeWidth: 3,
      arrowColor: 4,
      strokeOpacity: 5,
      groupStrokeOpacity: 6,
      groupStrokeColor: 7,
      textStartOffset: 8
    });
  }
}
function create_if_block$4(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[7].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    null
  );
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
        if (default_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              null
            ),
            null
          );
        }
      } else {
        if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*zoneSize*/
        4)) {
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
      attr(div, "class", div_class_value = "absolute border-[" + /*zoneSize*/
      (ctx[2] + "em") + "] md:border-[" + /*zoneSize*/
      (ctx[2] / 2 + "em") + "] border-yellow-200/40 ring-2 ring-black h-0 w-0 rounded-full");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*zoneSize*/
      4 && div_class_value !== (div_class_value = "absolute border-[" + /*zoneSize*/
      (ctx2[2] + "em") + "] md:border-[" + /*zoneSize*/
      (ctx2[2] / 2 + "em") + "] border-yellow-200/40 ring-2 ring-black h-0 w-0 rounded-full")) {
        attr(div, "class", div_class_value);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
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
  let if_block = (
    /*highlight*/
    ctx[0] && create_if_block$4(ctx)
  );
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
        style: true,
        role: true
      });
      var div_nodes = children(div);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "id", div_id_value = /*node*/
      ctx[1].id + "--highlighter");
      attr(div, "data-highlighter", "true");
      attr(div, "class", div_class_value = "absolute border-[" + /*zoneSize*/
      (ctx[2] + "em") + "] md:border-[" + /*zoneSize*/
      (ctx[2] / 2 + "em") + "] border-transparent rounded-full p-0 m-0");
      set_style(
        div,
        "top",
        /*top*/
        ctx[5] + "px"
      );
      set_style(
        div,
        "left",
        /*left*/
        ctx[4] + "px"
      );
      attr(div, "role", "presentation");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      ctx[9](div);
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            window,
            "resize",
            /*resize_handler*/
            ctx[8]
          ),
          listen(
            div,
            "mouseover",
            /*mouseover_handler*/
            ctx[10]
          ),
          listen(
            div,
            "mouseleave",
            /*mouseleave_handler*/
            ctx[11]
          ),
          listen(
            div,
            "focus",
            /*focus_handler*/
            ctx[12]
          ),
          listen(
            div,
            "blur",
            /*blur_handler*/
            ctx[13]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*highlight*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*highlight*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$4(ctx2);
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
      if (!current || dirty & /*node*/
      2 && div_id_value !== (div_id_value = /*node*/
      ctx2[1].id + "--highlighter")) {
        attr(div, "id", div_id_value);
      }
      if (!current || dirty & /*zoneSize*/
      4 && div_class_value !== (div_class_value = "absolute border-[" + /*zoneSize*/
      (ctx2[2] + "em") + "] md:border-[" + /*zoneSize*/
      (ctx2[2] / 2 + "em") + "] border-transparent rounded-full p-0 m-0")) {
        attr(div, "class", div_class_value);
      }
      if (!current || dirty & /*top*/
      32) {
        set_style(
          div,
          "top",
          /*top*/
          ctx2[5] + "px"
        );
      }
      if (!current || dirty & /*left*/
      16) {
        set_style(
          div,
          "left",
          /*left*/
          ctx2[4] + "px"
        );
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
      if (detaching) {
        detach(div);
      }
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
    if ($$self.$$.dirty & /*dot, node*/
    10) {
      $$invalidate(5, top = dot ? -dot.offsetHeight / 2 + node.offsetHeight / 2 : 0);
    }
    if ($$self.$$.dirty & /*dot, node*/
    10) {
      $$invalidate(4, left = dot ? -dot.offsetWidth / 2 + node.offsetWidth / 2 : 0);
    }
    if ($$self.$$.dirty & /*dot, node*/
    10) {
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
  if (!nodes)
    return "";
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
const { window: window_1 } = globals;
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[18] = list[i][0];
  child_ctx[19] = list[i][1].node;
  child_ctx[20] = list[i][1].highlight;
  return child_ctx;
}
const get_default_slot_changes$1 = (dirty) => ({});
const get_default_slot_context$1 = (ctx) => ({ connectable: (
  /*connectable*/
  ctx[10]
) });
const get_marker_slot_changes = (dirty) => ({});
const get_marker_slot_context = (ctx) => ({});
function create_if_block_3(ctx) {
  let cursormarker;
  let updating_marker;
  let current;
  function cursormarker_marker_binding(value) {
    ctx[14](value);
  }
  let cursormarker_props = {
    left: (
      /*left*/
      ctx[8]
    ),
    top: (
      /*top*/
      ctx[9]
    ),
    id: MARKER,
    $$slots: { default: [create_default_slot$2] },
    $$scope: { ctx }
  };
  if (
    /*marker*/
    ctx[6] !== void 0
  ) {
    cursormarker_props.marker = /*marker*/
    ctx[6];
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
      if (dirty & /*left*/
      256)
        cursormarker_changes.left = /*left*/
        ctx2[8];
      if (dirty & /*top*/
      512)
        cursormarker_changes.top = /*top*/
        ctx2[9];
      if (dirty & /*$$scope*/
      65536) {
        cursormarker_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_marker && dirty & /*marker*/
      64) {
        updating_marker = true;
        cursormarker_changes.marker = /*marker*/
        ctx2[6];
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
    p: noop$2,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_default_slot$2(ctx) {
  let current;
  const marker_slot_template = (
    /*#slots*/
    ctx[12].marker
  );
  const marker_slot = create_slot(
    marker_slot_template,
    ctx,
    /*$$scope*/
    ctx[16],
    get_marker_slot_context
  );
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
        if (marker_slot.p && (!current || dirty & /*$$scope*/
        65536)) {
          update_slot_base(
            marker_slot,
            marker_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[16],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[16]
            ) : get_slot_changes(
              marker_slot_template,
              /*$$scope*/
              ctx2[16],
              dirty,
              get_marker_slot_changes
            ),
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
  const default_slot_template = (
    /*#slots*/
    ctx[12].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[16],
    get_default_slot_context$1
  );
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
        if (default_slot.p && (!current || dirty & /*$$scope*/
        65536)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[16],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[16]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[16],
              dirty,
              get_default_slot_changes$1
            ),
            get_default_slot_context$1
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
  const links_spread_levels = [
    { links: [
      /*tempLink*/
      ctx[7]
    ] },
    /*opts*/
    (_a = ctx[2]) == null ? void 0 : _a.links,
    { scale: (
      /*scale*/
      ctx[1]
    ) }
  ];
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
      const links_changes = dirty & /*tempLink, opts, scale*/
      134 ? get_spread_update(links_spread_levels, [
        dirty & /*tempLink*/
        128 && { links: [
          /*tempLink*/
          ctx2[7]
        ] },
        dirty & /*opts*/
        4 && get_spread_object(
          /*opts*/
          (_a2 = ctx2[2]) == null ? void 0 : _a2.links
        ),
        dirty & /*scale*/
        2 && { scale: (
          /*scale*/
          ctx2[1]
        ) }
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
function create_if_block$3(ctx) {
  var _a;
  let links;
  let current;
  const links_spread_levels = [
    { links: (
      /*data*/
      ctx[0].links
    ) },
    /*opts*/
    (_a = ctx[2]) == null ? void 0 : _a.links,
    { scale: (
      /*scale*/
      ctx[1]
    ) }
  ];
  let links_props = {};
  for (let i = 0; i < links_spread_levels.length; i += 1) {
    links_props = assign(links_props, links_spread_levels[i]);
  }
  links = new Links({ props: links_props });
  links.$on(
    "removeLink",
    /*removeLink*/
    ctx[11]
  );
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
      const links_changes = dirty & /*data, opts, scale*/
      7 ? get_spread_update(links_spread_levels, [
        dirty & /*data*/
        1 && { links: (
          /*data*/
          ctx2[0].links
        ) },
        dirty & /*opts*/
        4 && get_spread_object(
          /*opts*/
          (_a2 = ctx2[2]) == null ? void 0 : _a2.links
        ),
        dirty & /*scale*/
        2 && { scale: (
          /*scale*/
          ctx2[1]
        ) }
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
      node: (
        /*node*/
        ctx[19]
      ),
      highlight: (
        /*highlight*/
        ctx[20]
      )
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
      if (dirty & /*highlighters*/
      8)
        highlighter_changes.node = /*node*/
        ctx2[19];
      if (dirty & /*highlighters*/
      8)
        highlighter_changes.highlight = /*highlight*/
        ctx2[20];
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
  var _a;
  let div;
  let t0;
  let t1;
  let t2;
  let t3;
  let current;
  let mounted;
  let dispose;
  let if_block0 = (
    /*connecting*/
    ctx[5] && create_if_block_3(ctx)
  );
  let if_block1 = (
    /*canvas*/
    ctx[4] && /*connectable*/
    ctx[10] && create_if_block_2(ctx)
  );
  let if_block2 = (
    /*tempLink*/
    ctx[7] && create_if_block_1(ctx)
  );
  let if_block3 = (
    /*data*/
    ((_a = ctx[0]) == null ? void 0 : _a.links) && /*data*/
    ctx[0].links.length > 0 && create_if_block$3(ctx)
  );
  let each_value = ensure_array_like([...Object.entries(
    /*highlighters*/
    ctx[3]
  )]);
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
      div = claim_element(nodes, "DIV", { "data-canvas": true });
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
      attr(div, "data-canvas", "");
      set_style(div, "position", `relative`);
      set_style(div, "height", "100%");
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
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      ctx[15](div);
      current = true;
      if (!mounted) {
        dispose = listen(
          window_1,
          "resize",
          /*resize_handler*/
          ctx[13]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      var _a2;
      if (
        /*connecting*/
        ctx2[5]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & /*connecting*/
          32) {
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
      if (
        /*canvas*/
        ctx2[4] && /*connectable*/
        ctx2[10]
      ) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & /*canvas*/
          16) {
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
      if (
        /*tempLink*/
        ctx2[7]
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty & /*tempLink*/
          128) {
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
      if (
        /*data*/
        ((_a2 = ctx2[0]) == null ? void 0 : _a2.links) && /*data*/
        ctx2[0].links.length > 0
      ) {
        if (if_block3) {
          if_block3.p(ctx2, dirty);
          if (dirty & /*data*/
          1) {
            transition_in(if_block3, 1);
          }
        } else {
          if_block3 = create_if_block$3(ctx2);
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
      if (dirty & /*Object, highlighters*/
      8) {
        each_value = ensure_array_like([...Object.entries(
          /*highlighters*/
          ctx2[3]
        )]);
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
      if (detaching) {
        detach(div);
      }
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      if (if_block2)
        if_block2.d();
      if (if_block3)
        if_block3.d();
      destroy_each(each_blocks, detaching);
      ctx[15](null);
      mounted = false;
      dispose();
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { data } = $$props;
  let { scale = 1 } = $$props;
  let { opts = {} } = $$props;
  const dispatch = createEventDispatcher();
  let highlighters = {};
  let canvas;
  let connecting;
  let marker = null;
  let tempLink = null;
  let left = 0;
  let top = 0;
  function connectable(node, options) {
    var _a, _b, _c, _d, _e;
    if (!node.id)
      node.id = nanoid();
    if (!node.dataset.noPan)
      node.dataset.noPan = true;
    let sourceid = ((_a = node == null ? void 0 : node.dataset) == null ? void 0 : _a.sourceid) ? (_b = node == null ? void 0 : node.dataset) == null ? void 0 : _b.sourceid : node.id;
    if (!node.style.position || node.style.position !== "absolute" && node.style.position !== "relative")
      node.style.position = "relative";
    let highlight = false;
    let overZone;
    $$invalidate(3, highlighters[sourceid] = { node, highlight }, highlighters);
    let pointerTracker;
    let startPoint;
    if ((_c = options == null ? void 0 : options.startPoint) == null ? void 0 : _c.component) {
      startPoint = new options.startPoint.component({
        target: node,
        props: { show: ((_d = options.startPoint) == null ? void 0 : _d.show) || true }
      });
      startPoint.$on("ready", (event) => createPointerTracker(node, event.detail.handle));
      startPoint.$set({ mounted: true });
    } else {
      createPointerTracker(node);
    }
    if (options == null ? void 0 : options.dataset)
      node.dataset.dataset = JSON.stringify(options.dataset);
    if (!((_e = options == null ? void 0 : options.restrictions) == null ? void 0 : _e.startOnly))
      node.dataset[DROPZONE] = true;
    function createPointerTracker(node2, handle = false) {
      var _a2;
      if (!((_a2 = options == null ? void 0 : options.restrictions) == null ? void 0 : _a2.dropOnly)) {
        pointerTracker = new PointerTracker$1(
          node2,
          {
            start(pointer, event) {
              if (pointerTracker.currentPointers.length >= 1)
                return false;
              if ((options == null ? void 0 : options.startPoint) && event.target !== handle && !handle.contains(event.target))
                return false;
              $$invalidate(5, connecting = true);
              event.stopPropagation();
              event.preventDefault();
              $$invalidate(8, left = (pointer.pageX - canvas.getBoundingClientRect().left - window.scrollX) / scale);
              $$invalidate(9, top = (pointer.pageY - canvas.getBoundingClientRect().top - window.scrollY) / scale);
              return true;
            },
            move(previousPointers, changedPointers, event) {
              var _a3;
              event.stopPropagation();
              event.preventDefault();
              $$invalidate(8, left = left + (pointerTracker.currentPointers[0].pageX - previousPointers[0].pageX) / scale);
              $$invalidate(9, top = top + (pointerTracker.currentPointers[0].pageY - previousPointers[0].pageY) / scale);
              $$invalidate(7, tempLink = {
                id: sourceid + "-to-",
                source: {
                  id: sourceid,
                  startPoint: (options == null ? void 0 : options.startPoint) || false
                },
                target: { id: MARKER },
                opts: {
                  label: {
                    enabled: true,
                    value: generateLinkLabel(data == null ? void 0 : data.nodes, sourceid)
                  }
                }
              });
              if (overZone)
                $$invalidate(3, highlighters[overZone.id].highlight = false, highlighters);
              overZone = ((_a3 = document.elementFromPoint(pointerTracker.currentPointers[0].clientX, pointerTracker.currentPointers[0].clientY)) == null ? void 0 : _a3.closest(`[data-${DROPZONE}]`)) || null;
              if (overZone == null ? void 0 : overZone.id) {
                $$invalidate(3, highlighters[overZone.id].highlight = true, highlighters);
              }
            },
            end: (pointer, event, cancelled) => {
              var _a3, _b2, _c2;
              $$invalidate(6, marker.style.display = "none", marker);
              $$invalidate(5, connecting = false);
              if (highlighters && overZone && overZone.id && highlighters[overZone.id].highlight) {
                $$invalidate(3, highlighters[overZone.id].highlight = false, highlighters);
              }
              overZone = null;
              let drop = document.elementFromPoint(pointer.clientX, pointer.clientY);
              let zone = drop == null ? void 0 : drop.closest(`[data-${DROPZONE}]`);
              $$invalidate(7, tempLink = null);
              if (!zone || !(zone == null ? void 0 : zone.id) || !node2 || !(node2 == null ? void 0 : node2.id))
                return;
              if ((_a3 = data == null ? void 0 : data.links) == null ? void 0 : _a3.find((link) => (link == null ? void 0 : link.id) === sourceid + "-to-" + zone.id))
                return;
              if (sourceid === zone.id)
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
                    value: generateLinkLabel(data == null ? void 0 : data.nodes, sourceid, zone.id)
                  }
                }
              };
              $$invalidate(0, data.links = [...data.links, newLink], data);
              if ((options == null ? void 0 : options.dataset) || ((_b2 = zone == null ? void 0 : zone.dataset) == null ? void 0 : _b2.dataset)) {
                const detail = {
                  source: { dataset: (options == null ? void 0 : options.dataset) || null },
                  target: {
                    dataset: ((_c2 = zone == null ? void 0 : zone.dataset) == null ? void 0 : _c2.dataset) ? JSON.parse(zone.dataset.dataset) : null
                  }
                };
                dispatch("connected", detail);
              }
            },
            avoidPointerEvents: true,
            // mkaes mobile work better
            eventListenerOptions: {
              capture: true,
              // capture the event and stop stopPropagation, so it doesn't bubble up to the parent
              passive: false
            }
            // passive: false if no need to evt.preventDefault
          }
        );
      }
    }
    return {
      update(params) {
        var _a2;
        options = params;
        if (startPoint)
          startPoint.$set({ show: ((_a2 = options == null ? void 0 : options.startPoint) == null ? void 0 : _a2.show) || true });
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
    $$invalidate(6, marker);
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      canvas = $$value;
      $$invalidate(4, canvas);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2)
      $$invalidate(0, data = $$props2.data);
    if ("scale" in $$props2)
      $$invalidate(1, scale = $$props2.scale);
    if ("opts" in $$props2)
      $$invalidate(2, opts = $$props2.opts);
    if ("$$scope" in $$props2)
      $$invalidate(16, $$scope = $$props2.$$scope);
  };
  return [
    data,
    scale,
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
    init(this, options, instance$6, create_fragment$6, safe_not_equal, { data: 0, scale: 1, opts: 2 });
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
    p: noop$2,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
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
  const default_slot_template = (
    /*#slots*/
    ctx[11].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[10],
    null
  );
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
      attr(div1, "style", div1_style_value = "top: " + /*top*/
      ctx[8] + "px; " + /*position*/
      (ctx[0] == "right" ? `right: ${/*right*/
      ctx[7]}px;` : `left: ${/*left*/
      ctx[6]}px;`));
      add_render_callback(() => (
        /*div1_elementresize_handler*/
        ctx[14].call(div1)
      ));
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, div0);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(div0, null);
      }
      ctx[13](div1);
      div1_resize_listener = add_iframe_resize_listener(
        div1,
        /*div1_elementresize_handler*/
        ctx[14].bind(div1)
      );
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            window,
            "resize",
            /*resize_handler*/
            ctx[12]
          ),
          action_destroyer(connectable_action = /*connectable*/
          ctx[1].call(
            null,
            div0,
            /*options*/
            ctx[2]
          ))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        1024)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[10],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[10]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[10],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (connectable_action && is_function(connectable_action.update) && dirty & /*options*/
      4)
        connectable_action.update.call(
          null,
          /*options*/
          ctx2[2]
        );
      if (!current || dirty & /*top, position, right, left*/
      449 && div1_style_value !== (div1_style_value = "top: " + /*top*/
      ctx2[8] + "px; " + /*position*/
      (ctx2[0] == "right" ? `right: ${/*right*/
      ctx2[7]}px;` : `left: ${/*left*/
      ctx2[6]}px;`))) {
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
      if (detaching) {
        detach(div1);
      }
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
    if ($$self.$$.dirty & /*dot*/
    8) {
      if (dot) {
        $$invalidate(3, dot.parentNode.style.position = "relative", dot);
        $$invalidate(9, parentHeight = dot.parentNode.offsetHeight);
      }
    }
    if ($$self.$$.dirty & /*parentHeight, offsetHeight*/
    528) {
      $$invalidate(8, top = parentHeight && offsetHeight ? parentHeight / 2 - offsetHeight / 2 : 0);
    }
    if ($$self.$$.dirty & /*offsetWidth*/
    32) {
      $$invalidate(7, right = offsetWidth ? -offsetWidth / 2 : 0);
    }
    if ($$self.$$.dirty & /*offsetWidth*/
    32) {
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
const get_default_slot_changes = (dirty) => ({
  sx: dirty & /*sx*/
  1,
  sy: dirty & /*sy*/
  2,
  ex: dirty & /*ex*/
  4,
  ey: dirty & /*ey*/
  8,
  as: dirty & /*as*/
  16,
  x: dirty & /*x*/
  256,
  y: dirty & /*y*/
  512
});
const get_default_slot_context = (ctx) => ({
  sx: (
    /*sx*/
    ctx[0]
  ),
  sy: (
    /*sy*/
    ctx[1]
  ),
  ex: (
    /*ex*/
    ctx[2]
  ),
  ey: (
    /*ey*/
    ctx[3]
  ),
  as: (
    /*as*/
    ctx[4]
  ),
  x: (
    /*x*/
    ctx[8]
  ),
  y: (
    /*y*/
    ctx[9]
  )
});
function create_if_block$2(ctx) {
  let div;
  let div_resize_listener;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[12].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[11],
    get_default_slot_context
  );
  const default_slot_or_fallback = default_slot || fallback_block();
  return {
    c() {
      div = element("div");
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { style: true });
      var div_nodes = children(div);
      if (default_slot_or_fallback)
        default_slot_or_fallback.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_style(div, "position", "absolute");
      set_style(div, "right", "0px");
      set_style(
        div,
        "top",
        /*y*/
        ctx[9] + "px"
      );
      set_style(div, "user-select", "none");
      set_style(div, "cursor", "pointer");
      set_style(div, "font-family", "monospace");
      set_style(div, "padding", "0.25rem");
      add_render_callback(() => (
        /*div_elementresize_handler*/
        ctx[14].call(div)
      ));
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(div, null);
      }
      ctx[13](div);
      div_resize_listener = add_iframe_resize_listener(
        div,
        /*div_elementresize_handler*/
        ctx[14].bind(div)
      );
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope, sx, sy, ex, ey, as, x, y*/
        2847)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[11],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[11]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[11],
              dirty,
              get_default_slot_changes
            ),
            get_default_slot_context
          );
        }
      }
      if (!current || dirty & /*y*/
      512) {
        set_style(
          div,
          "top",
          /*y*/
          ctx2[9] + "px"
        );
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
      if (detaching) {
        detach(div);
      }
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
      ctx[13](null);
      div_resize_listener();
    }
  };
}
function fallback_block(ctx) {
  let t;
  return {
    c() {
      t = text("Connect→");
    },
    l(nodes) {
      t = claim_text(nodes, "Connect→");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_fragment$4(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*show*/
    ctx[5] && create_if_block$2(ctx)
  );
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
      if (
        /*show*/
        ctx2[5]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*show*/
          32) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$2(ctx2);
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
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { sx = null } = $$props;
  let { sy = null } = $$props;
  let { ex = null } = $$props;
  let { ey = null } = $$props;
  let { as = null } = $$props;
  let { mounted = false } = $$props;
  let { show = true } = $$props;
  let handle;
  let offsetWidth;
  const dispatch = createEventDispatcher();
  let x = 0;
  let y = 0;
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      handle = $$value;
      $$invalidate(6, handle), $$invalidate(4, as);
    });
  }
  function div_elementresize_handler() {
    offsetWidth = this.offsetWidth;
    $$invalidate(7, offsetWidth);
  }
  $$self.$$set = ($$props2) => {
    if ("sx" in $$props2)
      $$invalidate(0, sx = $$props2.sx);
    if ("sy" in $$props2)
      $$invalidate(1, sy = $$props2.sy);
    if ("ex" in $$props2)
      $$invalidate(2, ex = $$props2.ex);
    if ("ey" in $$props2)
      $$invalidate(3, ey = $$props2.ey);
    if ("as" in $$props2)
      $$invalidate(4, as = $$props2.as);
    if ("mounted" in $$props2)
      $$invalidate(10, mounted = $$props2.mounted);
    if ("show" in $$props2)
      $$invalidate(5, show = $$props2.show);
    if ("$$scope" in $$props2)
      $$invalidate(11, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    var _a;
    if ($$self.$$.dirty & /*handle, as*/
    80) {
      if (handle && handle.style && !!as) {
        if (as < 0.6 && as > -0.6) {
          $$invalidate(6, handle.style.transform = `translate(-100%, 0)`, handle);
          $$invalidate(6, handle.style.right = null, handle);
        } else {
          $$invalidate(6, handle.style.transform = null, handle);
        }
      }
    }
    if ($$self.$$.dirty & /*mounted, handle*/
    1088) {
      if (mounted && handle && ((_a = handle == null ? void 0 : handle.parentNode) == null ? void 0 : _a.offsetWidth)) {
        $$invalidate(8, x = handle == null ? void 0 : handle.parentNode.offsetWidth);
        dispatch("ready", { handle });
      }
    }
    if ($$self.$$.dirty & /*handle, as*/
    80) {
      $$invalidate(9, y = handle && as > 0 ? -(handle == null ? void 0 : handle.offsetHeight) : 0);
    }
  };
  return [
    sx,
    sy,
    ex,
    ey,
    as,
    show,
    handle,
    offsetWidth,
    x,
    y,
    mounted,
    $$scope,
    slots,
    div_binding,
    div_elementresize_handler
  ];
}
class Delegate extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {
      sx: 0,
      sy: 1,
      ex: 2,
      ey: 3,
      as: 4,
      mounted: 10,
      show: 5
    });
  }
  get sx() {
    return this.$$.ctx[0];
  }
  set sx(sx) {
    this.$$set({ sx });
    flush();
  }
  get sy() {
    return this.$$.ctx[1];
  }
  set sy(sy) {
    this.$$set({ sy });
    flush();
  }
  get ex() {
    return this.$$.ctx[2];
  }
  set ex(ex) {
    this.$$set({ ex });
    flush();
  }
  get ey() {
    return this.$$.ctx[3];
  }
  set ey(ey) {
    this.$$set({ ey });
    flush();
  }
  get as() {
    return this.$$.ctx[4];
  }
  set as(as) {
    this.$$set({ as });
    flush();
  }
  get mounted() {
    return this.$$.ctx[10];
  }
  set mounted(mounted) {
    this.$$set({ mounted });
    flush();
  }
  get show() {
    return this.$$.ctx[5];
  }
  set show(show) {
    this.$$set({ show });
    flush();
  }
}
function create_fragment$3(ctx) {
  let span1;
  let span0;
  let span1_class_value;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[3].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[2],
    null
  );
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
      attr(span1, "class", span1_class_value = /*color*/
      (ctx[0] == "pink" ? pink : (
        /*green*/
        ctx[1]
      )) + " before:inline-block before:absolute before:-inset-1 before:-skew-y-3 relative inline-block");
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
        if (default_slot.p && (!current || dirty & /*$$scope*/
        4)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[2],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[2]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[2],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*color*/
      1 && span1_class_value !== (span1_class_value = /*color*/
      (ctx2[0] == "pink" ? pink : (
        /*green*/
        ctx2[1]
      )) + " before:inline-block before:absolute before:-inset-1 before:-skew-y-3 relative inline-block")) {
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
      if (detaching) {
        detach(span1);
      }
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
  const [xValue, xUnit] = split_css_unit(x);
  const [yValue, yUnit] = split_css_unit(y);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${(1 - t) * yValue}${yUnit});
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
  const default_slot_template = (
    /*#slots*/
    ctx[4].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[3],
    null
  );
  const extra_slot_template = (
    /*#slots*/
    ctx[4].extra
  );
  const extra_slot = create_slot(
    extra_slot_template,
    ctx,
    /*$$scope*/
    ctx[3],
    get_extra_slot_context
  );
  return {
    c() {
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      if (default_slot)
        default_slot.c();
      t0 = space();
      span = element("span");
      t1 = text(
        /*counter*/
        ctx[1]
      );
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
      t1 = claim_text(
        span_nodes,
        /*counter*/
        ctx[1]
      );
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
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        8)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[3],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[3]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[3],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*counter*/
      2)
        set_data(
          t1,
          /*counter*/
          ctx2[1]
        );
      if (extra_slot) {
        if (extra_slot.p && (!current || dirty & /*$$scope*/
        8)) {
          update_slot_base(
            extra_slot,
            extra_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[3],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[3]
            ) : get_slot_changes(
              extra_slot_template,
              /*$$scope*/
              ctx2[3],
              dirty,
              get_extra_slot_changes
            ),
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
      if (local) {
        add_render_callback(() => {
          if (!current)
            return;
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
      }
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      transition_out(extra_slot, local);
      if (local) {
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
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
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
  let if_block = (
    /*visible*/
    ctx[0] && create_if_block$1(ctx)
  );
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
      if (
        /*visible*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*visible*/
          1) {
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
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block)
        if_block.d(detaching);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { toast = true } = $$props;
  let visible = true;
  let counter = 3;
  function timeout() {
    if ($$invalidate(1, --counter) > 0)
      return setTimeout(timeout, 1e3);
    $$invalidate(0, visible = false);
  }
  $$self.$$set = ($$props2) => {
    if ("toast" in $$props2)
      $$invalidate(2, toast = $$props2.toast);
    if ("$$scope" in $$props2)
      $$invalidate(3, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*toast*/
    4) {
      if (toast) {
        $$invalidate(1, counter = 3);
        timeout();
      }
    }
  };
  return [visible, counter, toast, $$scope, slots];
}
class Toast extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { toast: 2 });
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
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_fragment$1(ctx) {
  let delegate;
  let current;
  delegate = new Delegate({
    props: {
      mounted: (
        /*mounted*/
        ctx[0]
      ),
      as: (
        /*as*/
        ctx[1]
      ),
      sx: (
        /*sx*/
        ctx[2]
      ),
      sy: (
        /*sy*/
        ctx[3]
      ),
      $$slots: { default: [create_default_slot$1] },
      $$scope: { ctx }
    }
  });
  delegate.$on(
    "ready",
    /*ready_handler*/
    ctx[4]
  );
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
      if (dirty & /*mounted*/
      1)
        delegate_changes.mounted = /*mounted*/
        ctx2[0];
      if (dirty & /*as*/
      2)
        delegate_changes.as = /*as*/
        ctx2[1];
      if (dirty & /*sx*/
      4)
        delegate_changes.sx = /*sx*/
        ctx2[2];
      if (dirty & /*sy*/
      8)
        delegate_changes.sy = /*sy*/
        ctx2[3];
      if (dirty & /*$$scope*/
      32) {
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
class Pointer2 {
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
  /**
   * Returns an expanded set of Pointers for high-resolution inputs.
   */
  getCoalesced() {
    if ("getCoalescedEvents" in this.nativePointer) {
      const events = this.nativePointer.getCoalescedEvents().map((p) => new Pointer2(p));
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
class PointerTracker2 {
  /**
   * Track pointers across a particular element
   *
   * @param element Element to monitor.
   * @param options
   */
  constructor(_element, { start = () => true, move = noop, end = noop, rawUpdates = false, avoidPointerEvents = false } = {}) {
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
      const pointer = new Pointer2(event);
      if (this.currentPointers.some((p) => p.id === pointer.id))
        return;
      if (!this._triggerPointerStart(pointer, event))
        return;
      if (isPointerEvent(event)) {
        const capturingElement = event.target && "setPointerCapture" in event.target ? event.target : this._element;
        capturingElement.setPointerCapture(event.pointerId);
        this._element.addEventListener(this._rawUpdates ? "pointerrawupdate" : "pointermove", this._move);
        this._element.addEventListener("pointerup", this._pointerEnd);
        this._element.addEventListener("pointercancel", this._pointerEnd);
      } else {
        window.addEventListener("mousemove", this._move);
        window.addEventListener("mouseup", this._pointerEnd);
      }
    };
    this._touchStart = (event) => {
      for (const touch of Array.from(event.changedTouches)) {
        this._triggerPointerStart(new Pointer2(touch), event);
      }
    };
    this._move = (event) => {
      if (!isTouchEvent(event) && (!isPointerEvent(event) || !this._excludeFromButtonsCheck.has(event.pointerId)) && event.buttons === 0) {
        this._pointerEnd(event);
        return;
      }
      const previousPointers = this.currentPointers.slice();
      const changedPointers = isTouchEvent(event) ? Array.from(event.changedTouches).map((t) => new Pointer2(t)) : [new Pointer2(event)];
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
      if (!this._triggerPointerEnd(new Pointer2(event), event))
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
        this._triggerPointerEnd(new Pointer2(touch), event);
      }
    };
    this._startCallback = start;
    this._moveCallback = move;
    this._endCallback = end;
    this._rawUpdates = rawUpdates && "onpointerrawupdate" in window;
    if (self.PointerEvent && !avoidPointerEvents) {
      this._element.addEventListener("pointerdown", this._pointerStart);
    } else {
      this._element.addEventListener("mousedown", this._pointerStart);
      this._element.addEventListener("touchstart", this._touchStart);
      this._element.addEventListener("touchmove", this._move);
      this._element.addEventListener("touchend", this._touchEnd);
      this._element.addEventListener("touchcancel", this._touchEnd);
    }
  }
  /**
   * Remove all listeners.
   */
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
  /**
   * Call the start callback for this pointer, and track it if the user wants.
   *
   * @param pointer Pointer
   * @param event Related event
   * @returns Whether the pointer is being tracked.
   */
  _triggerPointerStart(pointer, event) {
    if (!this._startCallback(pointer, event))
      return false;
    this.currentPointers.push(pointer);
    this.startPointers.push(pointer);
    return true;
  }
}
const minScaleAttr = "min-scale";
function getDistance(a, b) {
  if (!b)
    return 0;
  return Math.sqrt((b.clientX - a.clientX) ** 2 + (b.clientY - a.clientY) ** 2);
}
function getMidpoint(a, b) {
  if (!b)
    return a;
  return {
    clientX: (a.clientX + b.clientX) / 2,
    clientY: (a.clientY + b.clientY) / 2
  };
}
function getAbsoluteValue(value, max) {
  if (typeof value === "number")
    return value;
  if (value.trimRight().endsWith("%")) {
    return max * parseFloat(value) / 100;
  }
  return parseFloat(value);
}
function createMatrix() {
  return new DOMMatrix([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}
function createPoint() {
  return new DOMPoint();
}
const MIN_SCALE = 0.01;
class PinchZoom {
  /**
   * handle - an optional handle element to grab by
   */
  constructor(node, { panAnywhere, handle } = {}) {
    // The element that we'll transform.
    __publicField(this, "_node");
    // Ideally this would be shadow DOM, but we don't have the browser
    // support yet.
    __publicField(this, "_parentEl");
    // Current transform.
    __publicField(this, "_transform", createMatrix());
    __publicField(this, "_pointerTracker");
    __publicField(this, "_handle", null);
    this._node = node;
    this._parentEl = this._node.parentElement || document.body;
    this._handle = handle;
    new MutationObserver(() => this._stageElChange()).observe(this._node, { childList: true });
    this._pointerTracker = new PointerTracker2(this._parentEl, {
      eventListenerOptions: {
        capture: false
        // catch the event before it goes to child in the DOM tree ?
      },
      start: (pointer, event) => {
        if (this._pointerTracker.currentPointers.length === 0 && (event.target instanceof HTMLInputElement || event.target.isContentEditable)) {
          return false;
        }
        if (this._pointerTracker.currentPointers.length === 2 || !this._parentEl)
          return false;
        if (event.target.closest("[data-no-pan]"))
          return false;
        if (this._pointerTracker.currentPointers.length > 1) {
          return false;
        }
        event.preventDefault();
        event.stopPropagation();
        return true;
      },
      move: (previousPointers, changedPointers, event) => {
        var _a;
        if (this._pointerTracker.currentPointers.length === 0)
          return;
        if (!panAnywhere && !this._handle && this._pointerTracker.currentPointers.length === 1 && !(event.target == this._parentEl || event.target == node))
          return;
        if (this._handle && !((_a = this._handle) == null ? void 0 : _a.contains(event.target)) && this._pointerTracker.currentPointers.length == 1)
          return;
        event.preventDefault();
        event.stopPropagation();
        this._onPointerMove(previousPointers, this._pointerTracker.currentPointers);
      },
      end: (pointer, event, cancelled) => {
      }
    });
    this._parentEl.addEventListener("wheel", (event) => this._onWheel(event));
  }
  static get observedAttributes() {
    return [minScaleAttr];
  }
  destroy() {
    this._pointerTracker.stop();
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === minScaleAttr) {
      if (this.scale < this.minScale) {
        this.setTransform({ scale: this.minScale });
      }
    }
  }
  get minScale() {
    const attrValue = this._node.getAttribute(minScaleAttr);
    if (!attrValue)
      return MIN_SCALE;
    const value = parseFloat(attrValue);
    if (Number.isFinite(value))
      return Math.max(MIN_SCALE, value);
    return MIN_SCALE;
  }
  set minScale(value) {
    this._node.setAttribute(minScaleAttr, String(value));
  }
  connectedCallback() {
    this._stageElChange();
  }
  get x() {
    return this._transform.e;
  }
  get y() {
    return this._transform.f;
  }
  get scale() {
    return this._transform.a;
  }
  /**
   * Change the scale, adjusting x/y by a given transform origin.
   */
  scaleTo(scale, opts = {}) {
    let { originX = 0, originY = 0 } = opts;
    const { relativeTo = "content", allowChangeEvent = false } = opts;
    const relativeToEl = relativeTo === "content" ? this._parentEl : this._node;
    if (!relativeToEl || !this._parentEl) {
      this.setTransform({ scale, allowChangeEvent });
      return;
    }
    const rect = relativeToEl.getBoundingClientRect();
    originX = getAbsoluteValue(originX, rect.width);
    originY = getAbsoluteValue(originY, rect.height);
    if (relativeTo === "content") {
      originX += this.x;
      originY += this.y;
    } else {
      const currentRect = this._parentEl.getBoundingClientRect();
      originX -= currentRect.left;
      originY -= currentRect.top;
    }
    this._applyChange({
      allowChangeEvent,
      originX,
      originY,
      scaleDiff: scale / this.scale
    });
  }
  /**
   * Update the stage with a given scale/x/y.
   */
  setTransform(opts = {}) {
    const { scale = this.scale, allowChangeEvent = false } = opts;
    let { x = this.x, y = this.y } = opts;
    if (!this._parentEl) {
      this._updateTransform(scale, x, y, allowChangeEvent);
      return;
    }
    const thisBounds = this._node.getBoundingClientRect();
    const parentElBounds = this._parentEl.getBoundingClientRect();
    if (!thisBounds.width || !thisBounds.height) {
      this._updateTransform(scale, x, y, allowChangeEvent);
      return;
    }
    let topLeft = createPoint();
    topLeft.x = parentElBounds.left - thisBounds.left;
    topLeft.y = parentElBounds.top - thisBounds.top;
    let bottomRight = createPoint();
    bottomRight.x = parentElBounds.width + topLeft.x;
    bottomRight.y = parentElBounds.height + topLeft.y;
    const matrix = createMatrix().translate(x, y).scale(scale).multiply(this._transform.inverse());
    topLeft = topLeft.matrixTransform(matrix);
    bottomRight = bottomRight.matrixTransform(matrix);
    this._updateTransform(scale, x, y, allowChangeEvent);
  }
  /**
   * Update transform values without checking bounds. This is only called in setTransform.
   */
  _updateTransform(scale, x, y, allowChangeEvent) {
    if (scale < this.minScale) {
      scale = this.minScale;
      return;
    }
    if (scale === this.scale && x === this.x && y === this.y)
      return;
    this._transform.e = x;
    this._transform.f = y;
    this._transform.d = this._transform.a = scale;
    this._node.style.transform = `translate(${x}px,${y}px) scale(${scale})`;
    if (allowChangeEvent) {
      const event = new Event("change", { bubbles: true });
      this._node.dispatchEvent(event);
    }
  }
  /**
   * Called when the direct children of this element change.
   * Until we have have shadow dom support across the board, we
   * require a single element to be the child of <pinch-zoom>, and
   * that's the element we pan/scale.
   */
  _stageElChange() {
    this._parentEl = this._node.parentElement || document.body;
    this.setTransform({ allowChangeEvent: true });
  }
  _onWheel(event) {
    if (!this._parentEl)
      return;
    event.preventDefault();
    this._parentEl.getBoundingClientRect();
    let { deltaY } = event;
    const { ctrlKey, deltaMode } = event;
    if (deltaMode === 1) {
      deltaY *= 15;
    }
    const divisor = ctrlKey ? 200 : 600;
    const scaleDiff = 1 - deltaY / divisor;
    this._applyChange({
      scaleDiff,
      originX: event.pageX - this._parentEl.offsetLeft - this._parentEl.clientWidth / 2,
      originY: event.pageY - this._parentEl.offsetTop - this._parentEl.clientHeight / 2,
      allowChangeEvent: true
    });
  }
  _onPointerMove(previousPointers, currentPointers) {
    if (!this._parentEl)
      return;
    const currentRect = this._parentEl.getBoundingClientRect();
    const prevMidpoint = getMidpoint(previousPointers[0], previousPointers[1]);
    const newMidpoint = getMidpoint(currentPointers[0], currentPointers[1]);
    const originX = prevMidpoint.clientX - currentRect.left - currentRect.width / 2;
    const originY = prevMidpoint.clientY - currentRect.top - currentRect.height / 2;
    const prevDistance = getDistance(previousPointers[0], previousPointers[1]);
    const newDistance = getDistance(currentPointers[0], currentPointers[1]);
    const scaleDiff = prevDistance ? newDistance / prevDistance : 1;
    this._applyChange({
      originX,
      originY,
      scaleDiff,
      panX: newMidpoint.clientX - prevMidpoint.clientX,
      panY: newMidpoint.clientY - prevMidpoint.clientY,
      allowChangeEvent: true
    });
  }
  /** Transform the view & fire a change event */
  _applyChange(opts = {}) {
    const { panX = 0, panY = 0, originX = 0, originY = 0, scaleDiff = 1, allowChangeEvent = false } = opts;
    const matrix = createMatrix().translate(panX, panY).translate(originX, originY).scale(scaleDiff).translate(-originX, -originY).multiply(this._transform);
    this.setTransform({
      allowChangeEvent,
      scale: matrix.a,
      x: matrix.e,
      y: matrix.f
    });
  }
}
const pzoom = (node, params) => {
  let container = node.parentElement || document.body;
  container.style["touch-action"] = "none";
  container.style["user-select"] = "none";
  container.style["overflow"] = "hidden";
  container.style["position"] = "relative";
  node.style["touch-action"] = "none";
  node.style["user-select"] = "none";
  node.style["position"] = "absolute";
  node.style.width = "100%";
  node.style.height = "100%";
  let zoomer = new PinchZoom(node, {
    handle: params == null ? void 0 : params.handle,
    panAnywhere: params == null ? void 0 : params.panAnywhere
  });
  node.addEventListener("home", handleScaleToHome);
  node.addEventListener("scaleTo", handleScaleTo);
  node.addEventListener("change", handleScaleChange);
  node.addEventListener("setTransform", handleSetTransform);
  function handleScaleTo(val) {
    zoomer.scaleTo(val, { allowChangeEvent: true });
  }
  function handleScaleToHome(e) {
    zoomer.setTransform({ x: 0, y: 0, scale: 1, allowChangeEvent: true });
  }
  function handleSetTransform(e) {
    zoomer.setTransform({
      x: e.detail.x || 0,
      y: e.detail.y || 0,
      scale: e.detail.scale || 1,
      allowChangeEvent: true
    });
  }
  function handleScaleChange(e) {
    const scale = e.target.style.transform.match(/scale\((\d+\.?\d*)\)/)[1];
    node.dispatchEvent(new CustomEvent("scale", {
      detail: { scale }
    }));
  }
  return {
    update(params2) {
      zoomer.destroy();
      zoomer = new PinchZoom(node, {
        handle: params2 == null ? void 0 : params2.handle,
        panAnywhere: params2 == null ? void 0 : params2.panAnywhere
      });
    },
    destroy() {
      zoomer.destroy();
      node.removeEventListener("home", handleScaleToHome);
      node.removeEventListener("change", handleScaleChange);
      node.removeEventListener("scaleTo", handleScaleTo);
      node.removeEventListener("setTransform", handleSetTransform);
    }
  };
};
function grabable(nodeEl, { nodeData = {}, removeCurrentNode = () => null, scale = 1 } = {}) {
  let top = 0;
  let left = 0;
  let shiftX;
  let shiftY;
  let pointerTracker = new PointerTracker$1(nodeEl, {
    start(pointer, event) {
      left = null;
      top = null;
      if (event.target instanceof HTMLInputElement || event.target.isContentEditable)
        return false;
      event.preventDefault();
      event.stopPropagation();
      nodeEl.dispatchEvent(
        new CustomEvent("started", {
          detail: {}
        })
      );
      shiftX = event.clientX - nodeEl.getBoundingClientRect().left || 0;
      shiftY = event.clientY - nodeEl.getBoundingClientRect().top || 0;
      left = parseFloat(getComputedStyle(nodeEl)["left"].replace("px", "")) || 0;
      top = parseFloat(getComputedStyle(nodeEl)["top"].replace("px", "")) || 0;
      return true;
    },
    move(previousPointers, changedPointers, event) {
      event.preventDefault();
      event.stopPropagation();
      nodeEl.style.cursor = "grabbing";
      if (pointerTracker.currentPointers[0].clientY > document.body.clientHeight - 20)
        window.scrollBy(0, 20);
      if (pointerTracker.currentPointers[0].clientY < 20)
        window.scrollBy(0, -20);
      if (pointerTracker.currentPointers[0].clientX > document.body.clientWidth - 20)
        window.scrollBy(20, 0);
      if (pointerTracker.currentPointers[0].clientX < 20)
        window.scrollBy(-20, 0);
      left = left + (pointerTracker.currentPointers[0].pageX - previousPointers[0].pageX) / scale;
      top = top + (pointerTracker.currentPointers[0].pageY - previousPointers[0].pageY) / scale;
      nodeData.x = left;
      nodeData.y = top;
      nodeEl.dispatchEvent(
        new CustomEvent("move", {
          detail: {
            ...nodeData,
            x: left,
            y: top,
            overDropZone: overDropZone(pointerTracker.currentPointers[0])
          }
        })
      );
    },
    end(pointer, event, cancelled) {
      var _a;
      nodeEl.style.left = 0;
      nodeEl.style.top = 0;
      let zone = (_a = document.elementFromPoint(pointer.clientX, pointer.clientY)) == null ? void 0 : _a.closest("[data-dropzone]");
      nodeEl.style.cursor = "auto";
      if (!overDropZone(pointer, zone)) {
        nodeEl == null ? void 0 : nodeEl.dispatchEvent(
          new CustomEvent("end", {
            detail: {
              ...nodeData,
              // set left and top back to last position since it was cleared (above)
              x: left,
              y: top
            }
          })
        );
        return;
      }
      removeCurrentNode();
      zone.dispatchEvent(
        new CustomEvent("addChild", {
          detail: {
            nodeData: {
              ...nodeData,
              x: pointer.clientX - shiftX - zone.getBoundingClientRect().left,
              y: pointer.clientY - shiftY - zone.getBoundingClientRect().top
            }
          }
        })
      );
    },
    avoidPointerEvents: true,
    eventListenerOptions: { capture: false }
  });
  function overDropZone(pointer, zone = null) {
    var _a, _b;
    if (!zone)
      zone = (_a = document.elementFromPoint(pointer.clientX, pointer.clientY)) == null ? void 0 : _a.closest("[data-dropzone]");
    return !!zone && // dropzone exists
    zone != nodeEl && // not dropped on self
    zone.parentNode != nodeEl && // not dropped on parent
    ((_b = zone.parentNode) == null ? void 0 : _b.id) != (nodeEl == null ? void 0 : nodeEl.id) && // sometime nodeEl disappeara and is removed from the DOM
    !nodeEl.contains(zone) && zone != nodeEl.parentNode.closest("[data-dropzone]");
  }
  return {
    update(params) {
      ({ nodeData, removeCurrentNode = () => null, scale = 1 } = params);
    },
    destroy() {
      pointerTracker.stop();
    }
  };
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[18] = list[i][0];
  child_ctx[19] = list[i][1];
  child_ctx[21] = i;
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[22] = list[i];
  return child_ctx;
}
function create_each_block_1(key_1, ctx) {
  let div;
  let t_value = (
    /*node*/
    ctx[22].value + ""
  );
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
      div = claim_element(nodes, "DIV", {
        class: true,
        "data-no-pan": true,
        id: true
      });
      var div_nodes = children(div);
      t = claim_text(div_nodes, t_value);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      var _a, _b;
      attr(div, "class", "block m-2 cursor-pointer select-none w-fit");
      attr(div, "data-no-pan", "");
      attr(div, "id", div_id_value = /*node*/
      ((_a = ctx[22]) == null ? void 0 : _a.id) ? (
        /*node*/
        (_b = ctx[22]) == null ? void 0 : _b.id
      ) : null);
      this.first = div;
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t);
      if (!mounted) {
        dispose = action_destroyer(connectable_action = /*connectable*/
        ctx[17].call(null, div, {
          dataset: { value: (
            /*node*/
            ctx[22].value
          ) }
        }));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      var _a, _b;
      ctx = new_ctx;
      if (dirty & /*data*/
      1 && t_value !== (t_value = /*node*/
      ctx[22].value + ""))
        set_data(t, t_value);
      if (dirty & /*data*/
      1 && div_id_value !== (div_id_value = /*node*/
      ((_a = ctx[22]) == null ? void 0 : _a.id) ? (
        /*node*/
        (_b = ctx[22]) == null ? void 0 : _b.id
      ) : null)) {
        attr(div, "id", div_id_value);
      }
      if (connectable_action && is_function(connectable_action.update) && dirty & /*data*/
      1)
        connectable_action.update.call(null, {
          dataset: { value: (
            /*node*/
            ctx[22].value
          ) }
        });
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
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
    return (
      /*func*/
      ctx[7](
        /*type*/
        ctx[18],
        ...args
      )
    );
  }
  let each_value_1 = ensure_array_like(
    /*data*/
    ctx[0].nodes.filter(func)
  );
  const get_key = (ctx2) => (
    /*node*/
    ctx2[22].id
  );
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
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      append_hydration(div, t);
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*data, Object, types*/
      17) {
        each_value_1 = ensure_array_like(
          /*data*/
          ctx[0].nodes.filter(func)
        );
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_1, each_1_lookup, div, destroy_block, create_each_block_1, t, get_each_context_1);
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
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
      if (detaching) {
        detach(t);
      }
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
    p: noop$2,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_if_block(ctx) {
  let previous_key = (
    /*toast*/
    ctx[2]
  );
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
      if (dirty & /*toast*/
      4 && safe_not_equal(previous_key, previous_key = /*toast*/
      ctx2[2])) {
        group_outros();
        transition_out(key_block, 1, 1, noop$2);
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
      if (detaching) {
        detach(key_block_anchor);
      }
      key_block.d(detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let t;
  return {
    c() {
      t = text(
        /*toast*/
        ctx[2]
      );
    },
    l(nodes) {
      t = claim_text(
        nodes,
        /*toast*/
        ctx[2]
      );
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*toast*/
      4)
        set_data(
          t,
          /*toast*/
          ctx2[2]
        );
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_key_block(ctx) {
  let toast_1;
  let updating_toast;
  let current;
  function toast_1_toast_binding(value) {
    ctx[12](value);
  }
  let toast_1_props = {
    $$slots: { default: [create_default_slot_1] },
    $$scope: { ctx }
  };
  if (
    /*toast*/
    ctx[2] !== void 0
  ) {
    toast_1_props.toast = /*toast*/
    ctx[2];
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
      if (dirty & /*$$scope, toast*/
      33554436) {
        toast_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_toast && dirty & /*toast*/
      4) {
        updating_toast = true;
        toast_1_changes.toast = /*toast*/
        ctx2[2];
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
  let div11;
  let div0;
  let textContent = `Directive is available within the slot as a slot prop.<br/>
					Try scroll to zoom, drag to pan, and still connect!`;
  let t2;
  let div1;
  let t3;
  let div6;
  let div3;
  let div2;
  let textContent_1 = `Connect Me <br/>Drag me<br/>`;
  let grabable_action;
  let t6;
  let div5;
  let div4;
  let textContent_2 = `...Starts out fixed, then switches to<br/> movable endpoint once connected.`;
  let grabable_action_1;
  let t9;
  let div10;
  let div7;
  let t10;
  let endpoint0;
  let t11;
  let endpoint1;
  let t12;
  let div8;
  let t13;
  let endpoint2;
  let t14;
  let div9;
  let t15;
  let skew;
  let t16;
  let endpoint3;
  let t17;
  let if_block_anchor;
  let current;
  let mounted;
  let dispose;
  let each_value = ensure_array_like([...Object.entries(
    /*types*/
    ctx[4]
  )]);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  endpoint0 = new EndPoint({
    props: {
      position: "right",
      connectable: (
        /*connectable*/
        ctx[17]
      )
    }
  });
  endpoint1 = new EndPoint({
    props: {
      position: "left",
      connectable: (
        /*connectable*/
        ctx[17]
      )
    }
  });
  endpoint2 = new EndPoint({
    props: {
      position: "left",
      connectable: (
        /*connectable*/
        ctx[17]
      )
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
      connectable: (
        /*connectable*/
        ctx[17]
      ),
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  let if_block = (
    /*toast*/
    ctx[2] && create_if_block(ctx)
  );
  return {
    c() {
      div11 = element("div");
      div0 = element("div");
      div0.innerHTML = textContent;
      t2 = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t3 = space();
      div6 = element("div");
      div3 = element("div");
      div2 = element("div");
      div2.innerHTML = textContent_1;
      t6 = space();
      div5 = element("div");
      div4 = element("div");
      div4.innerHTML = textContent_2;
      t9 = space();
      div10 = element("div");
      div7 = element("div");
      t10 = text("Can we also have an external endpoint?\n						");
      create_component(endpoint0.$$.fragment);
      t11 = space();
      create_component(endpoint1.$$.fragment);
      t12 = space();
      div8 = element("div");
      t13 = text("No, libraries cannot do that. Just kidding.\n						");
      create_component(endpoint2.$$.fragment);
      t14 = space();
      div9 = element("div");
      t15 = text("Yes, pass the connectable directive to the component. They can even be ");
      create_component(skew.$$.fragment);
      t16 = text(", like this one.\n						");
      create_component(endpoint3.$$.fragment);
      t17 = space();
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
      this.h();
    },
    l(nodes) {
      div11 = claim_element(nodes, "DIV", { class: true });
      var div11_nodes = children(div11);
      div0 = claim_element(div11_nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div0) !== "svelte-m6c7by")
        div0.innerHTML = textContent;
      t2 = claim_space(div11_nodes);
      div1 = claim_element(div11_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div1_nodes);
      }
      div1_nodes.forEach(detach);
      t3 = claim_space(div11_nodes);
      div6 = claim_element(div11_nodes, "DIV", { class: true });
      var div6_nodes = children(div6);
      div3 = claim_element(div6_nodes, "DIV", { id: true, class: true, style: true });
      var div3_nodes = children(div3);
      div2 = claim_element(div3_nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div2) !== "svelte-1trvx0d")
        div2.innerHTML = textContent_1;
      div3_nodes.forEach(detach);
      t6 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", { id: true, class: true, style: true });
      var div5_nodes = children(div5);
      div4 = claim_element(div5_nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div4) !== "svelte-1y21tul")
        div4.innerHTML = textContent_2;
      div5_nodes.forEach(detach);
      div6_nodes.forEach(detach);
      t9 = claim_space(div11_nodes);
      div10 = claim_element(div11_nodes, "DIV", { class: true });
      var div10_nodes = children(div10);
      div7 = claim_element(div10_nodes, "DIV", { class: true });
      var div7_nodes = children(div7);
      t10 = claim_text(div7_nodes, "Can we also have an external endpoint?\n						");
      claim_component(endpoint0.$$.fragment, div7_nodes);
      t11 = claim_space(div7_nodes);
      claim_component(endpoint1.$$.fragment, div7_nodes);
      div7_nodes.forEach(detach);
      t12 = claim_space(div10_nodes);
      div8 = claim_element(div10_nodes, "DIV", { class: true });
      var div8_nodes = children(div8);
      t13 = claim_text(div8_nodes, "No, libraries cannot do that. Just kidding.\n						");
      claim_component(endpoint2.$$.fragment, div8_nodes);
      div8_nodes.forEach(detach);
      t14 = claim_space(div10_nodes);
      div9 = claim_element(div10_nodes, "DIV", { class: true });
      var div9_nodes = children(div9);
      t15 = claim_text(div9_nodes, "Yes, pass the connectable directive to the component. They can even be ");
      claim_component(skew.$$.fragment, div9_nodes);
      t16 = claim_text(div9_nodes, ", like this one.\n						");
      claim_component(endpoint3.$$.fragment, div9_nodes);
      div9_nodes.forEach(detach);
      div10_nodes.forEach(detach);
      div11_nodes.forEach(detach);
      t17 = claim_space(nodes);
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
      this.h();
    },
    h() {
      var _a, _b, _c, _d;
      attr(div0, "class", "text-black font-bold m-4");
      attr(div1, "class", "flex flex-row justify-around ");
      attr(div2, "class", "block m-2 select-none w-fit");
      attr(div3, "id", "absolute1");
      attr(div3, "class", "flex flex-col border rounded-lg m-4 p-4 items-center");
      set_style(div3, "position", "absolute");
      set_style(div3, "user-select", "none");
      set_style(div3, "box-shadow", "10px 5px 5px black");
      set_style(div3, "width", "250px");
      set_style(div3, "height", "100px");
      set_style(
        div3,
        "left",
        /*data*/
        (((_a = ctx[0].nodes.find(func_1)) == null ? void 0 : _a.x) || 0) + "px"
      );
      set_style(
        div3,
        "top",
        /*data*/
        (((_b = ctx[0].nodes.find(func_2)) == null ? void 0 : _b.y) || 0) + "px"
      );
      set_style(div3, "--tw-shadow", "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)");
      set_style(div3, "--tw-ring-offset-shadow", "0 0 #0000");
      set_style(div3, "--tw-ring-shadow", "0 0 #0000");
      set_style(div3, "--tw-shadow-colored", "0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color)");
      set_style(div3, "box-shadow", "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)");
      attr(div4, "class", "absolute block m-2 cursor-pointer select-none w-fit");
      attr(div5, "id", "absolute2");
      attr(div5, "class", "flex flex-col border rounded-lg m-4 p-4 items-center w-48");
      set_style(
        div5,
        "left",
        /*data*/
        (((_c = ctx[0].nodes.find(func_3)) == null ? void 0 : _c.x) || 0) + "px"
      );
      set_style(
        div5,
        "top",
        /*data*/
        (((_d = ctx[0].nodes.find(func_4)) == null ? void 0 : _d.y) || 0) + "px"
      );
      attr(div6, "class", "relative flex flex-row justify-around h-96");
      attr(div7, "class", "inline-flex m-2 p-4 border rounded-lg w-1/3 bg-amber-100");
      attr(div8, "class", "relative inline-flex m-2 p-4 border rounded-lg w-1/3 bg-red-300");
      attr(div9, "class", "relative flex-0 m-2 ml-auto p-4 border rounded-lg w-1/3 bg-green-300");
      attr(div10, "class", "flex flex-row flex-wrap border rounded-lg mt-20 m-4 p-4 justify-between bg-neutral-50");
      attr(div11, "class", "border border-red-500");
    },
    m(target, anchor) {
      insert_hydration(target, div11, anchor);
      append_hydration(div11, div0);
      append_hydration(div11, t2);
      append_hydration(div11, div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div1, null);
        }
      }
      append_hydration(div11, t3);
      append_hydration(div11, div6);
      append_hydration(div6, div3);
      append_hydration(div3, div2);
      append_hydration(div6, t6);
      append_hydration(div6, div5);
      append_hydration(div5, div4);
      append_hydration(div11, t9);
      append_hydration(div11, div10);
      append_hydration(div10, div7);
      append_hydration(div7, t10);
      mount_component(endpoint0, div7, null);
      append_hydration(div7, t11);
      mount_component(endpoint1, div7, null);
      append_hydration(div10, t12);
      append_hydration(div10, div8);
      append_hydration(div8, t13);
      mount_component(endpoint2, div8, null);
      append_hydration(div10, t14);
      append_hydration(div10, div9);
      append_hydration(div9, t15);
      mount_component(skew, div9, null);
      append_hydration(div9, t16);
      mount_component(endpoint3, div9, null);
      insert_hydration(target, t17, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(
            /*connectable*/
            ctx[17].call(null, div3, {
              startPoint: { component: DemoDelegated, show: true }
            })
          ),
          action_destroyer(grabable_action = grabable.call(null, div3, {
            nodeData: { id: "absolute1" },
            scale: (
              /*scale*/
              ctx[3]
            )
          })),
          listen(
            div3,
            "move",
            /*move_handler*/
            ctx[8]
          ),
          listen(
            div3,
            "end",
            /*end_handler*/
            ctx[9]
          ),
          action_destroyer(
            /*connectable*/
            ctx[17].call(null, div5, {
              startPoint: { component: DemoDelegated, show: true }
            })
          ),
          action_destroyer(grabable_action_1 = grabable.call(null, div5, {
            nodeData: { id: "absolute2" },
            scale: (
              /*scale*/
              ctx[3]
            )
          })),
          listen(
            div5,
            "move",
            /*move_handler_1*/
            ctx[10]
          ),
          listen(
            div5,
            "end",
            /*end_handler_1*/
            ctx[11]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      var _a, _b, _c, _d;
      if (dirty & /*data, Object, types*/
      17) {
        each_value = ensure_array_like([...Object.entries(
          /*types*/
          ctx2[4]
        )]);
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
      if (!current || dirty & /*data*/
      1) {
        set_style(
          div3,
          "left",
          /*data*/
          (((_a = ctx2[0].nodes.find(func_1)) == null ? void 0 : _a.x) || 0) + "px"
        );
      }
      if (!current || dirty & /*data*/
      1) {
        set_style(
          div3,
          "top",
          /*data*/
          (((_b = ctx2[0].nodes.find(func_2)) == null ? void 0 : _b.y) || 0) + "px"
        );
      }
      if (grabable_action && is_function(grabable_action.update) && dirty & /*scale*/
      8)
        grabable_action.update.call(null, {
          nodeData: { id: "absolute1" },
          scale: (
            /*scale*/
            ctx2[3]
          )
        });
      if (!current || dirty & /*data*/
      1) {
        set_style(
          div5,
          "left",
          /*data*/
          (((_c = ctx2[0].nodes.find(func_3)) == null ? void 0 : _c.x) || 0) + "px"
        );
      }
      if (!current || dirty & /*data*/
      1) {
        set_style(
          div5,
          "top",
          /*data*/
          (((_d = ctx2[0].nodes.find(func_4)) == null ? void 0 : _d.y) || 0) + "px"
        );
      }
      if (grabable_action_1 && is_function(grabable_action_1.update) && dirty & /*scale*/
      8)
        grabable_action_1.update.call(null, {
          nodeData: { id: "absolute2" },
          scale: (
            /*scale*/
            ctx2[3]
          )
        });
      const endpoint0_changes = {};
      if (dirty & /*connectable*/
      131072)
        endpoint0_changes.connectable = /*connectable*/
        ctx2[17];
      endpoint0.$set(endpoint0_changes);
      const endpoint1_changes = {};
      if (dirty & /*connectable*/
      131072)
        endpoint1_changes.connectable = /*connectable*/
        ctx2[17];
      endpoint1.$set(endpoint1_changes);
      const endpoint2_changes = {};
      if (dirty & /*connectable*/
      131072)
        endpoint2_changes.connectable = /*connectable*/
        ctx2[17];
      endpoint2.$set(endpoint2_changes);
      const skew_changes = {};
      if (dirty & /*$$scope*/
      33554432) {
        skew_changes.$$scope = { dirty, ctx: ctx2 };
      }
      skew.$set(skew_changes);
      const endpoint3_changes = {};
      if (dirty & /*connectable*/
      131072)
        endpoint3_changes.connectable = /*connectable*/
        ctx2[17];
      if (dirty & /*$$scope*/
      33554432) {
        endpoint3_changes.$$scope = { dirty, ctx: ctx2 };
      }
      endpoint3.$set(endpoint3_changes);
      if (
        /*toast*/
        ctx2[2]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*toast*/
          4) {
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
      if (detaching) {
        detach(div11);
        detach(t17);
        detach(if_block_anchor);
      }
      destroy_each(each_blocks, detaching);
      destroy_component(endpoint0);
      destroy_component(endpoint1);
      destroy_component(endpoint2);
      destroy_component(skew);
      destroy_component(endpoint3);
      if (if_block)
        if_block.d(detaching);
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
    p: noop$2,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_fragment(ctx) {
  let div2;
  let textContent = `<div class="my-4 p-2 bg-blue-100 rounded-lg w-fit"><a href="https://github.com/DougAnderson444/svelte-plumb" class="font-bold m-2 underline">https://github.com/DougAnderson444/svelte-plumb</a></div> <div class="my-4 p-2 bg-blue-100 rounded-lg w-fit">by <a href="https://twitter.com/DougAnderson444" class="font-bold underline">@DougAnderson444</a></div>

	Match the picture to the words:`;
  let t5;
  let div4;
  let div3;
  let canvas;
  let updating_data;
  let t6;
  let div9;
  let div5;
  let textContent_1 = "Control Panel";
  let t8;
  let div6;
  let label0;
  let span0;
  let textContent_2 = "Stroke Width";
  let t10;
  let input0;
  let t11;
  let div7;
  let label1;
  let span1;
  let textContent_3 = "Stroke Opacity";
  let t13;
  let input1;
  let t14;
  let div8;
  let label2;
  let span2;
  let t15;
  let t16_value = (
    /*opts*/
    ctx[1].links.textStartOffset + ""
  );
  let t16;
  let t17;
  let input2;
  let t18;
  let pre;
  let t19;
  let t20_value = JSON.stringify({ data: (
    /*data*/
    ctx[0]
  ) }, null, 2) + "";
  let t20;
  let t21;
  let current;
  let mounted;
  let dispose;
  function canvas_data_binding(value) {
    ctx[13](value);
  }
  let canvas_props = {
    opts: (
      /*opts*/
      ctx[1]
    ),
    scale: (
      /*scale*/
      ctx[3]
    ),
    $$slots: {
      marker: [create_marker_slot],
      default: [
        create_default_slot,
        ({ connectable }) => ({ 17: connectable }),
        ({ connectable }) => connectable ? 131072 : 0
      ]
    },
    $$scope: { ctx }
  };
  if (
    /*data*/
    ctx[0] !== void 0
  ) {
    canvas_props.data = /*data*/
    ctx[0];
  }
  canvas = new Canvas({ props: canvas_props });
  binding_callbacks.push(() => bind(canvas, "data", canvas_data_binding));
  canvas.$on(
    "connected",
    /*handleConnected*/
    ctx[5]
  );
  return {
    c() {
      div2 = element("div");
      div2.innerHTML = textContent;
      t5 = space();
      div4 = element("div");
      div3 = element("div");
      create_component(canvas.$$.fragment);
      t6 = space();
      div9 = element("div");
      div5 = element("div");
      div5.textContent = textContent_1;
      t8 = space();
      div6 = element("div");
      label0 = element("label");
      span0 = element("span");
      span0.textContent = textContent_2;
      t10 = space();
      input0 = element("input");
      t11 = space();
      div7 = element("div");
      label1 = element("label");
      span1 = element("span");
      span1.textContent = textContent_3;
      t13 = space();
      input1 = element("input");
      t14 = space();
      div8 = element("div");
      label2 = element("label");
      span2 = element("span");
      t15 = text("Start Distance ");
      t16 = text(t16_value);
      t17 = space();
      input2 = element("input");
      t18 = space();
      pre = element("pre");
      t19 = text("	");
      t20 = text(t20_value);
      t21 = text("\n");
      this.h();
    },
    l(nodes) {
      div2 = claim_element(nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div2) !== "svelte-4xqfyd")
        div2.innerHTML = textContent;
      t5 = claim_space(nodes);
      div4 = claim_element(nodes, "DIV", { class: true });
      var div4_nodes = children(div4);
      div3 = claim_element(div4_nodes, "DIV", {});
      var div3_nodes = children(div3);
      claim_component(canvas.$$.fragment, div3_nodes);
      div3_nodes.forEach(detach);
      div4_nodes.forEach(detach);
      t6 = claim_space(nodes);
      div9 = claim_element(nodes, "DIV", { class: true });
      var div9_nodes = children(div9);
      div5 = claim_element(div9_nodes, "DIV", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(div5) !== "svelte-1ci5my4")
        div5.textContent = textContent_1;
      t8 = claim_space(div9_nodes);
      div6 = claim_element(div9_nodes, "DIV", { class: true });
      var div6_nodes = children(div6);
      label0 = claim_element(div6_nodes, "LABEL", { class: true });
      var label0_nodes = children(label0);
      span0 = claim_element(label0_nodes, "SPAN", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(span0) !== "svelte-d5ohm")
        span0.textContent = textContent_2;
      t10 = claim_space(label0_nodes);
      input0 = claim_element(label0_nodes, "INPUT", { type: true, min: true, max: true });
      label0_nodes.forEach(detach);
      div6_nodes.forEach(detach);
      t11 = claim_space(div9_nodes);
      div7 = claim_element(div9_nodes, "DIV", { class: true });
      var div7_nodes = children(div7);
      label1 = claim_element(div7_nodes, "LABEL", { class: true });
      var label1_nodes = children(label1);
      span1 = claim_element(label1_nodes, "SPAN", { class: true, ["data-svelte-h"]: true });
      if (get_svelte_dataset(span1) !== "svelte-arp1zr")
        span1.textContent = textContent_3;
      t13 = claim_space(label1_nodes);
      input1 = claim_element(label1_nodes, "INPUT", {
        type: true,
        min: true,
        max: true,
        step: true
      });
      label1_nodes.forEach(detach);
      div7_nodes.forEach(detach);
      t14 = claim_space(div9_nodes);
      div8 = claim_element(div9_nodes, "DIV", { class: true });
      var div8_nodes = children(div8);
      label2 = claim_element(div8_nodes, "LABEL", { class: true });
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
      div8_nodes.forEach(detach);
      div9_nodes.forEach(detach);
      t18 = claim_space(nodes);
      pre = claim_element(nodes, "PRE", {});
      var pre_nodes = children(pre);
      t19 = claim_text(pre_nodes, "	");
      t20 = claim_text(pre_nodes, t20_value);
      t21 = claim_text(pre_nodes, "\n");
      pre_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div2, "class", "mb-4 ml-4 p-2 w-fit");
      attr(div4, "class", "relative border-dashed border-2 border-sky-500 rounded-lg bg-slate-100/10 m-4 h-full");
      attr(div5, "class", "text-lg font-bold underline");
      attr(span0, "class", "p-2");
      attr(input0, "type", "range");
      attr(input0, "min", "1");
      attr(input0, "max", "50");
      attr(label0, "class", "");
      attr(div6, "class", "my-4 p-4 bg-blue-200/50 rounded-lg shadow");
      attr(span1, "class", "p-2");
      attr(input1, "type", "range");
      attr(input1, "min", "0.1");
      attr(input1, "max", "1");
      attr(input1, "step", "0.1");
      attr(label1, "class", "");
      attr(div7, "class", "my-4 p-4 bg-blue-200/50 rounded-lg shadow");
      attr(span2, "class", "p-2");
      attr(input2, "type", "range");
      attr(input2, "min", "0%");
      attr(input2, "max", "90%");
      attr(input2, "step", "5%");
      attr(label2, "class", "");
      attr(div8, "class", "my-4 p-4 bg-blue-200/50 rounded-lg shadow");
      attr(div9, "class", "m-4 p-4 bg-slate-100 rounded-lg shadow-lg border");
    },
    m(target, anchor) {
      insert_hydration(target, div2, anchor);
      insert_hydration(target, t5, anchor);
      insert_hydration(target, div4, anchor);
      append_hydration(div4, div3);
      mount_component(canvas, div3, null);
      insert_hydration(target, t6, anchor);
      insert_hydration(target, div9, anchor);
      append_hydration(div9, div5);
      append_hydration(div9, t8);
      append_hydration(div9, div6);
      append_hydration(div6, label0);
      append_hydration(label0, span0);
      append_hydration(label0, t10);
      append_hydration(label0, input0);
      set_input_value(
        input0,
        /*opts*/
        ctx[1].links.strokeWidth
      );
      append_hydration(div9, t11);
      append_hydration(div9, div7);
      append_hydration(div7, label1);
      append_hydration(label1, span1);
      append_hydration(label1, t13);
      append_hydration(label1, input1);
      set_input_value(
        input1,
        /*opts*/
        ctx[1].links.strokeOpacity
      );
      append_hydration(div9, t14);
      append_hydration(div9, div8);
      append_hydration(div8, label2);
      append_hydration(label2, span2);
      append_hydration(span2, t15);
      append_hydration(span2, t16);
      append_hydration(label2, t17);
      append_hydration(label2, input2);
      set_input_value(
        input2,
        /*opts*/
        ctx[1].links.textStartOffset
      );
      insert_hydration(target, t18, anchor);
      insert_hydration(target, pre, anchor);
      append_hydration(pre, t19);
      append_hydration(pre, t20);
      append_hydration(pre, t21);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(pzoom.call(null, div3, { panAnywhere: true })),
          listen(
            div3,
            "scale",
            /*handleScaleChg*/
            ctx[6]
          ),
          listen(
            input0,
            "change",
            /*input0_change_input_handler*/
            ctx[14]
          ),
          listen(
            input0,
            "input",
            /*input0_change_input_handler*/
            ctx[14]
          ),
          listen(
            input1,
            "change",
            /*input1_change_input_handler*/
            ctx[15]
          ),
          listen(
            input1,
            "input",
            /*input1_change_input_handler*/
            ctx[15]
          ),
          listen(
            input2,
            "change",
            /*input2_change_input_handler*/
            ctx[16]
          ),
          listen(
            input2,
            "input",
            /*input2_change_input_handler*/
            ctx[16]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      const canvas_changes = {};
      if (dirty & /*opts*/
      2)
        canvas_changes.opts = /*opts*/
        ctx2[1];
      if (dirty & /*scale*/
      8)
        canvas_changes.scale = /*scale*/
        ctx2[3];
      if (dirty & /*$$scope, toast, connectable, data, scale*/
      33685517) {
        canvas_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_data && dirty & /*data*/
      1) {
        updating_data = true;
        canvas_changes.data = /*data*/
        ctx2[0];
        add_flush_callback(() => updating_data = false);
      }
      canvas.$set(canvas_changes);
      if (dirty & /*opts*/
      2) {
        set_input_value(
          input0,
          /*opts*/
          ctx2[1].links.strokeWidth
        );
      }
      if (dirty & /*opts*/
      2) {
        set_input_value(
          input1,
          /*opts*/
          ctx2[1].links.strokeOpacity
        );
      }
      if ((!current || dirty & /*opts*/
      2) && t16_value !== (t16_value = /*opts*/
      ctx2[1].links.textStartOffset + ""))
        set_data(t16, t16_value);
      if (dirty & /*opts*/
      2) {
        set_input_value(
          input2,
          /*opts*/
          ctx2[1].links.textStartOffset
        );
      }
      if ((!current || dirty & /*data*/
      1) && t20_value !== (t20_value = JSON.stringify({ data: (
        /*data*/
        ctx2[0]
      ) }, null, 2) + ""))
        set_data(t20, t20_value);
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
      if (detaching) {
        detach(div2);
        detach(t5);
        detach(div4);
        detach(t6);
        detach(div9);
        detach(t18);
        detach(pre);
      }
      destroy_component(canvas);
      mounted = false;
      run_all(dispose);
    }
  };
}
const func_1 = (n) => n.id == "absolute1";
const func_2 = (n) => n.id == "absolute1";
const func_3 = (n) => n.id == "absolute2";
const func_4 = (n) => n.id == "absolute2";
function instance($$self, $$props, $$invalidate) {
  let types = {
    emojii: "emojii",
    description: "description"
  };
  let data = {
    nodes: [
      { id: 1, type: types.emojii, value: "🐱" },
      { id: 2, type: types.emojii, value: "🦄" },
      { id: 3, type: types.emojii, value: "🐐" },
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
      },
      { id: "absolute1", x: 0, y: 100 },
      { id: "absolute2", x: 100, y: 100 }
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
  let scale = 1;
  function handleConnected(e) {
    var _a, _b, _c, _d;
    $$invalidate(2, toast = ((_b = (_a = e.detail.source) == null ? void 0 : _a.dataset) == null ? void 0 : _b.value) + " to " + ((_d = (_c = e.detail.target) == null ? void 0 : _c.dataset) == null ? void 0 : _d.value));
    console.log(toast);
  }
  const handleScaleChg = (e) => {
    $$invalidate(3, scale = e.detail.scale);
  };
  const func = (type, t) => t.type == type;
  const move_handler = (e) => {
    data.nodes.find((n) => n.id == "absolute1").x = e.detail.x;
    data.nodes.find((n) => n.id == "absolute1").y = e.detail.y;
    $$invalidate(0, data);
  };
  const end_handler = (e) => {
    data.nodes.find((n) => n.id == "absolute1").x = e.detail.x;
    data.nodes.find((n) => n.id == "absolute1").y = e.detail.y;
    $$invalidate(0, data);
  };
  const move_handler_1 = (e) => {
    data.nodes.find((n) => n.id == "absolute2").x = e.detail.x;
    data.nodes.find((n) => n.id == "absolute2").y = e.detail.y;
    $$invalidate(0, data);
  };
  const end_handler_1 = (e) => {
    data.nodes.find((n) => n.id == "absolute2").x = e.detail.x;
    data.nodes.find((n) => n.id == "absolute2").y = e.detail.y;
    $$invalidate(0, data);
  };
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
    scale,
    types,
    handleConnected,
    handleScaleChg,
    func,
    move_handler,
    end_handler,
    move_handler_1,
    end_handler_1,
    toast_1_toast_binding,
    canvas_data_binding,
    input0_change_input_handler,
    input1_change_input_handler,
    input2_change_input_handler
  ];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export {
  Page as component
};
//# sourceMappingURL=2.DM5PiyUn.js.map
