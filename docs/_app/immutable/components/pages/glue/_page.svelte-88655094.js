import { SvelteComponent, init, safe_not_equal, create_slot, element, text, space, claim_element, children, claim_text, claim_space, detach, attr, set_style, insert_hydration, append_hydration, action_destroyer, listen, set_data, update_slot_base, get_all_dirty_from_scope, get_slot_changes, is_function, transition_in, transition_out, run_all, create_component, claim_component, mount_component, destroy_component, binding_callbacks, bind, add_flush_callback } from "../../../chunks/index-04c364fb.js";
import { grabable, DemoDelegated, Canvas } from "../../../chunks/grabable-c450c91e.js";
const Box_svelte_svelte_type_style_lang = "";
function create_fragment$1(ctx) {
  var _a, _b;
  let div;
  let t0_value = (
    /*node*/
    ((_a = ctx[0]) == null ? void 0 : _a.x) + ""
  );
  let t0;
  let t1;
  let t2_value = (
    /*node*/
    ((_b = ctx[0]) == null ? void 0 : _b.y) + ""
  );
  let t2;
  let t3;
  let grabable_action;
  let current;
  let mounted;
  let dispose;
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
  return {
    c() {
      div = element("div");
      t0 = text(t0_value);
      t1 = text(", ");
      t2 = text(t2_value);
      t3 = space();
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true, style: true });
      var div_nodes = children(div);
      t0 = claim_text(div_nodes, t0_value);
      t1 = claim_text(div_nodes, ", ");
      t2 = claim_text(div_nodes, t2_value);
      t3 = claim_space(div_nodes);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "box svelte-i8i9lp");
      set_style(div, "position", "absolute");
      set_style(
        div,
        "top",
        /*node*/
        ctx[0].y + "px"
      );
      set_style(
        div,
        "left",
        /*node*/
        ctx[0].x + "px"
      );
      set_style(div, "user-select", "none");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t0);
      append_hydration(div, t1);
      append_hydration(div, t2);
      append_hydration(div, t3);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(grabable_action = grabable.call(null, div, { nodeData: (
            /*node*/
            ctx[0]
          ) })),
          action_destroyer(
            /*connectable*/
            ctx[1].call(null, div, {
              startPoint: { component: DemoDelegated, show: true },
              source: { glue: false }
            })
          ),
          listen(
            div,
            "move",
            /*handleMove*/
            ctx[2]
          ),
          listen(
            div,
            "end",
            /*handleMove*/
            ctx[2]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      var _a2, _b2;
      if ((!current || dirty & /*node*/
      1) && t0_value !== (t0_value = /*node*/
      ((_a2 = ctx2[0]) == null ? void 0 : _a2.x) + ""))
        set_data(t0, t0_value);
      if ((!current || dirty & /*node*/
      1) && t2_value !== (t2_value = /*node*/
      ((_b2 = ctx2[0]) == null ? void 0 : _b2.y) + ""))
        set_data(t2, t2_value);
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
      if (!current || dirty & /*node*/
      1) {
        set_style(
          div,
          "top",
          /*node*/
          ctx2[0].y + "px"
        );
      }
      if (!current || dirty & /*node*/
      1) {
        set_style(
          div,
          "left",
          /*node*/
          ctx2[0].x + "px"
        );
      }
      if (grabable_action && is_function(grabable_action.update) && dirty & /*node*/
      1)
        grabable_action.update.call(null, { nodeData: (
          /*node*/
          ctx2[0]
        ) });
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
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { node } = $$props;
  let { connectable } = $$props;
  function handleMove(e) {
    $$invalidate(0, node.x = e.detail.x, node);
    $$invalidate(0, node.y = e.detail.y, node);
  }
  $$self.$$set = ($$props2) => {
    if ("node" in $$props2)
      $$invalidate(0, node = $$props2.node);
    if ("connectable" in $$props2)
      $$invalidate(1, connectable = $$props2.connectable);
    if ("$$scope" in $$props2)
      $$invalidate(3, $$scope = $$props2.$$scope);
  };
  return [node, connectable, handleMove, $$scope, slots];
}
class Box extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { node: 0, connectable: 1 });
  }
}
function create_default_slot_2(ctx) {
  let t;
  return {
    c() {
      t = text("Rect 1");
    },
    l(nodes) {
      t = claim_text(nodes, "Rect 1");
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
function create_default_slot_1(ctx) {
  let t;
  return {
    c() {
      t = text("Rect 2");
    },
    l(nodes) {
      t = claim_text(nodes, "Rect 2");
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
function create_default_slot(ctx) {
  let div;
  let box0;
  let updating_node;
  let t;
  let box1;
  let updating_node_1;
  let current;
  function box0_node_binding(value) {
    ctx[1](value);
  }
  let box0_props = {
    connectable: (
      /*connectable*/
      ctx[3]
    ),
    $$slots: { default: [create_default_slot_2] },
    $$scope: { ctx }
  };
  if (
    /*nodeData*/
    ctx[0].nodes[0] !== void 0
  ) {
    box0_props.node = /*nodeData*/
    ctx[0].nodes[0];
  }
  box0 = new Box({ props: box0_props });
  binding_callbacks.push(() => bind(box0, "node", box0_node_binding));
  function box1_node_binding(value) {
    ctx[2](value);
  }
  let box1_props = {
    connectable: (
      /*connectable*/
      ctx[3]
    ),
    $$slots: { default: [create_default_slot_1] },
    $$scope: { ctx }
  };
  if (
    /*nodeData*/
    ctx[0].nodes[1] !== void 0
  ) {
    box1_props.node = /*nodeData*/
    ctx[0].nodes[1];
  }
  box1 = new Box({ props: box1_props });
  binding_callbacks.push(() => bind(box1, "node", box1_node_binding));
  return {
    c() {
      div = element("div");
      create_component(box0.$$.fragment);
      t = space();
      create_component(box1.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { style: true });
      var div_nodes = children(div);
      claim_component(box0.$$.fragment, div_nodes);
      t = claim_space(div_nodes);
      claim_component(box1.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_style(div, "position", "relative");
      set_style(div, "width", "100%");
      set_style(div, "height", "100%");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(box0, div, null);
      append_hydration(div, t);
      mount_component(box1, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const box0_changes = {};
      if (dirty & /*connectable*/
      8)
        box0_changes.connectable = /*connectable*/
        ctx2[3];
      if (dirty & /*$$scope*/
      16) {
        box0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_node && dirty & /*nodeData*/
      1) {
        updating_node = true;
        box0_changes.node = /*nodeData*/
        ctx2[0].nodes[0];
        add_flush_callback(() => updating_node = false);
      }
      box0.$set(box0_changes);
      const box1_changes = {};
      if (dirty & /*connectable*/
      8)
        box1_changes.connectable = /*connectable*/
        ctx2[3];
      if (dirty & /*$$scope*/
      16) {
        box1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_node_1 && dirty & /*nodeData*/
      1) {
        updating_node_1 = true;
        box1_changes.node = /*nodeData*/
        ctx2[0].nodes[1];
        add_flush_callback(() => updating_node_1 = false);
      }
      box1.$set(box1_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(box0.$$.fragment, local);
      transition_in(box1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(box0.$$.fragment, local);
      transition_out(box1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(box0);
      destroy_component(box1);
    }
  };
}
function create_fragment(ctx) {
  let canvas;
  let current;
  canvas = new Canvas({
    props: {
      data: (
        /*nodeData*/
        ctx[0]
      ),
      $$slots: {
        default: [
          create_default_slot,
          ({ connectable }) => ({ 3: connectable }),
          ({ connectable }) => connectable ? 8 : 0
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(canvas.$$.fragment);
    },
    l(nodes) {
      claim_component(canvas.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(canvas, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const canvas_changes = {};
      if (dirty & /*nodeData*/
      1)
        canvas_changes.data = /*nodeData*/
        ctx2[0];
      if (dirty & /*$$scope, connectable, nodeData*/
      25) {
        canvas_changes.$$scope = { dirty, ctx: ctx2 };
      }
      canvas.$set(canvas_changes);
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
      destroy_component(canvas, detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let nodeData = {
    nodes: [{ id: 1, x: 0, y: 0 }, { id: 2, x: 320, y: 130 }],
    links: []
  };
  function box0_node_binding(value) {
    if ($$self.$$.not_equal(nodeData.nodes[0], value)) {
      nodeData.nodes[0] = value;
      $$invalidate(0, nodeData);
    }
  }
  function box1_node_binding(value) {
    if ($$self.$$.not_equal(nodeData.nodes[1], value)) {
      nodeData.nodes[1] = value;
      $$invalidate(0, nodeData);
    }
  }
  return [nodeData, box0_node_binding, box1_node_binding];
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
//# sourceMappingURL=_page.svelte-88655094.js.map
