var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { SvelteComponent, init, safe_not_equal, create_slot, element, claim_element, children, detach, attr, add_render_callback, insert_hydration, append_hydration, add_resize_listener, listen, action_destroyer, update_slot_base, get_all_dirty_from_scope, get_slot_changes, is_function, transition_in, transition_out, run_all, binding_callbacks, noop as noop$1, empty, group_outros, check_outros, space, text, claim_space, claim_text, set_data, create_bidirectional_transition, bind, create_component, claim_component, mount_component, set_input_value, add_flush_callback, destroy_component, set_style, destroy_each, to_number, update_keyed_each, destroy_block } from "../../chunks/index-04c364fb.js";
import { Canvas, generateLinkLabel, DemoDelegated, grabable } from "../../chunks/grabable-c450c91e.js";
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function quintOut(t) {
  return --t * t * t * t * t + 1;
}
function fallback_block(ctx) {
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
function create_fragment$3(ctx) {
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
  const default_slot_or_fallback = default_slot || fallback_block();
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
      div1_resize_listener = add_resize_listener(
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
function instance$3($$self, $$props, $$invalidate) {
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
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { position: 0, connectable: 1, options: 2 });
  }
}
function create_fragment$2(ctx) {
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
      if (detaching)
        detach(span1);
      if (default_slot)
        default_slot.d(detaching);
    }
  };
}
let pink = "before:bg-pink-500 text-white";
function instance$2($$self, $$props, $$invalidate) {
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
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { color: 0 });
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
  const default_slot_template = (
    /*#slots*/
    ctx[5].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[4],
    null
  );
  const extra_slot_template = (
    /*#slots*/
    ctx[5].extra
  );
  const extra_slot = create_slot(
    extra_slot_template,
    ctx,
    /*$$scope*/
    ctx[4],
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
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        16)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx,
            /*$$scope*/
            ctx[4],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[4]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx[4],
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
          ctx[1]
        );
      if (extra_slot) {
        if (extra_slot.p && (!current || dirty & /*$$scope*/
        16)) {
          update_slot_base(
            extra_slot,
            extra_slot_template,
            ctx,
            /*$$scope*/
            ctx[4],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[4]
            ) : get_slot_changes(
              extra_slot_template,
              /*$$scope*/
              ctx[4],
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
function create_fragment$1(ctx) {
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
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
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
    if ($$self.$$.dirty & /*toast*/
    8) {
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
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { transition: 2, toast: 3 });
  }
}
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
}
const isPointerEvent = (event) => "pointerId" in event;
const isTouchEvent = (event) => "changedTouches" in event;
const noop = () => {
};
class PointerTracker {
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
      const pointer = new Pointer(event);
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
    this._pointerTracker = new PointerTracker(this._parentEl, {
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
    if (scale < this.minScale)
      return;
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
    return (
      /*func*/
      ctx[7](
        /*type*/
        ctx[18],
        ...args
      )
    );
  }
  let each_value_1 = (
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
        each_blocks[i].m(div, null);
      }
      append_hydration(div, t);
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*data, Object, types*/
      17) {
        each_value_1 = /*data*/
        ctx[0].nodes.filter(func);
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
  let t0;
  let br0;
  let t1;
  let t2;
  let div1;
  let t3;
  let div6;
  let div3;
  let div2;
  let t4;
  let br1;
  let t5;
  let br2;
  let grabable_action;
  let t6;
  let div5;
  let div4;
  let t7;
  let br3;
  let t8;
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
  let each_value = [...Object.entries(
    /*types*/
    ctx[4]
  )];
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
      t0 = text("Directive is available within the slot as a slot prop.");
      br0 = element("br");
      t1 = text("\n					Try scroll to zoom, drag to pan, and still connect!");
      t2 = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t3 = space();
      div6 = element("div");
      div3 = element("div");
      div2 = element("div");
      t4 = text("Connect Me ");
      br1 = element("br");
      t5 = text("Drag me");
      br2 = element("br");
      t6 = space();
      div5 = element("div");
      div4 = element("div");
      t7 = text("...Starts out fixed, then switches to");
      br3 = element("br");
      t8 = text(" movable endpoint once connected.");
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
      div0 = claim_element(div11_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      t0 = claim_text(div0_nodes, "Directive is available within the slot as a slot prop.");
      br0 = claim_element(div0_nodes, "BR", {});
      t1 = claim_text(div0_nodes, "\n					Try scroll to zoom, drag to pan, and still connect!");
      div0_nodes.forEach(detach);
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
      div2 = claim_element(div3_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      t4 = claim_text(div2_nodes, "Connect Me ");
      br1 = claim_element(div2_nodes, "BR", {});
      t5 = claim_text(div2_nodes, "Drag me");
      br2 = claim_element(div2_nodes, "BR", {});
      div2_nodes.forEach(detach);
      div3_nodes.forEach(detach);
      t6 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", { id: true, class: true, style: true });
      var div5_nodes = children(div5);
      div4 = claim_element(div5_nodes, "DIV", { class: true });
      var div4_nodes = children(div4);
      t7 = claim_text(div4_nodes, "...Starts out fixed, then switches to");
      br3 = claim_element(div4_nodes, "BR", {});
      t8 = claim_text(div4_nodes, " movable endpoint once connected.");
      div4_nodes.forEach(detach);
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
      append_hydration(div0, t0);
      append_hydration(div0, br0);
      append_hydration(div0, t1);
      append_hydration(div11, t2);
      append_hydration(div11, div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div1, null);
      }
      append_hydration(div11, t3);
      append_hydration(div11, div6);
      append_hydration(div6, div3);
      append_hydration(div3, div2);
      append_hydration(div2, t4);
      append_hydration(div2, br1);
      append_hydration(div2, t5);
      append_hydration(div2, br2);
      append_hydration(div6, t6);
      append_hydration(div6, div5);
      append_hydration(div5, div4);
      append_hydration(div4, t7);
      append_hydration(div4, br3);
      append_hydration(div4, t8);
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
        each_value = [...Object.entries(
          /*types*/
          ctx2[4]
        )];
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
      if (detaching)
        detach(div11);
      destroy_each(each_blocks, detaching);
      destroy_component(endpoint0);
      destroy_component(endpoint1);
      destroy_component(endpoint2);
      destroy_component(skew);
      destroy_component(endpoint3);
      if (detaching)
        detach(t17);
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
  let div4;
  let div3;
  let canvas;
  let updating_data;
  let t6;
  let div9;
  let div5;
  let t7;
  let t8;
  let div6;
  let label0;
  let span0;
  let t9;
  let t10;
  let input0;
  let t11;
  let div7;
  let label1;
  let span1;
  let t12;
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
      marker: [
        create_marker_slot,
        ({ connectable }) => ({ 17: connectable }),
        ({ connectable }) => connectable ? 131072 : 0
      ],
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
      div4 = element("div");
      div3 = element("div");
      create_component(canvas.$$.fragment);
      t6 = space();
      div9 = element("div");
      div5 = element("div");
      t7 = text("Control Panel");
      t8 = space();
      div6 = element("div");
      label0 = element("label");
      span0 = element("span");
      t9 = text("Stroke Width");
      t10 = space();
      input0 = element("input");
      t11 = space();
      div7 = element("div");
      label1 = element("label");
      span1 = element("span");
      t12 = text("Stroke Opacity");
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
      div5 = claim_element(div9_nodes, "DIV", { class: true });
      var div5_nodes = children(div5);
      t7 = claim_text(div5_nodes, "Control Panel");
      div5_nodes.forEach(detach);
      t8 = claim_space(div9_nodes);
      div6 = claim_element(div9_nodes, "DIV", { class: true });
      var div6_nodes = children(div6);
      label0 = claim_element(div6_nodes, "LABEL", { class: true });
      var label0_nodes = children(label0);
      span0 = claim_element(label0_nodes, "SPAN", { class: true });
      var span0_nodes = children(span0);
      t9 = claim_text(span0_nodes, "Stroke Width");
      span0_nodes.forEach(detach);
      t10 = claim_space(label0_nodes);
      input0 = claim_element(label0_nodes, "INPUT", { type: true, min: true, max: true });
      label0_nodes.forEach(detach);
      div6_nodes.forEach(detach);
      t11 = claim_space(div9_nodes);
      div7 = claim_element(div9_nodes, "DIV", { class: true });
      var div7_nodes = children(div7);
      label1 = claim_element(div7_nodes, "LABEL", { class: true });
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
      attr(a0, "href", "https://github.com/DougAnderson444/svelte-plumb");
      attr(a0, "class", "font-bold m-2 underline");
      attr(div0, "class", "my-4 p-2 bg-blue-100 rounded-lg w-fit");
      attr(a1, "href", "https://twitter.com/DougAnderson444");
      attr(a1, "class", "font-bold underline");
      attr(div1, "class", "my-4 p-2 bg-blue-100 rounded-lg w-fit");
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
      insert_hydration(target, div4, anchor);
      append_hydration(div4, div3);
      mount_component(canvas, div3, null);
      insert_hydration(target, t6, anchor);
      insert_hydration(target, div9, anchor);
      append_hydration(div9, div5);
      append_hydration(div5, t7);
      append_hydration(div9, t8);
      append_hydration(div9, div6);
      append_hydration(div6, label0);
      append_hydration(label0, span0);
      append_hydration(span0, t9);
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
      append_hydration(span1, t12);
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
      if (detaching)
        detach(div2);
      if (detaching)
        detach(t5);
      if (detaching)
        detach(div4);
      destroy_component(canvas);
      if (detaching)
        detach(t6);
      if (detaching)
        detach(div9);
      if (detaching)
        detach(t18);
      if (detaching)
        detach(pre);
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
  Page as default
};
//# sourceMappingURL=_page.svelte-2c75774d.js.map
