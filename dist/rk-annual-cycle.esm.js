//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'RkAnnualCycleEntry',
  props: {
    entry: {
      type: Object,
      required: true
    },
    editmode: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    entries() {
      return this.entry.data.replace(/\s/g, '').split('');
    }

  },
  methods: {
    chunk(arr, size) {
      return Array.from({
        length: Math.ceil(arr.length / size)
      }, (v, i) => arr.slice(i * size, i * size + size));
    },

    handleNameInput(event) {
      this.$emit('input', { ...this.entry,
        name: event.target.value
      });
    },

    handleDataInput(event, index) {
      const value = ['0', '1', '2', '3', '4'].includes(event.target.value) ? event.target.value : this.entries[index];
      const data = [...this.entries];
      data[index] = value;
      const entryData = this.chunk(data, 3).map(part => part.join('')).join(' ');
      this.$emit('input', { ...this.entry,
        data: entryData
      });
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('tr', [_c('td', {
    staticClass: "rk-annual-cycle__name"
  }, [_c('input', {
    attrs: {
      "disabled": !_vm.editmode,
      "type": "text"
    },
    domProps: {
      "value": _vm.entry.name
    },
    on: {
      "blur": _vm.handleNameInput
    }
  })]), _vm._v(" "), _vm._l(_vm.entries, function (opacity, colIndex) {
    return _c('td', {
      key: colIndex,
      staticClass: "rk-annual-cycle__entry"
    }, [_c('div', {
      staticClass: "rk-annual-cycle__color",
      style: {
        'opacity': opacity * 25 / 100,
        'backgroundColor': _vm.entry.color
      }
    }), _vm._v(" "), _vm.editmode ? _c('input', {
      attrs: {
        "type": "number",
        "min": "0",
        "max": "4"
      },
      domProps: {
        "value": _vm.entries[colIndex]
      },
      on: {
        "input": function (event) {
          return _vm.handleDataInput(event, colIndex);
        }
      }
    }) : _vm._e()]);
  })], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

//
var script$1 = {
  name: 'RkAnnualCycle',
  components: {
    RkAnnualCycleEntry: __vue_component__
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    editmode: {
      type: Boolean,
      default: () => false
    },
    monthNames: {
      type: Array,
      default: () => ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
    }
  },
  methods: {
    addEntry() {
      this.value.push({
        name: 'new',
        color: '#333',
        data: '000 000 000 000 000 000 000 000 000 000 000 000'
      });
    },

    handleInput(value, index) {
      this.$set(this.value, index, value);
    }

  }
};

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "rk-annual-cycle"
  }, [_c('table', [_c('thead', [_c('tr', [_c('th'), _vm._v(" "), _vm._l(_vm.monthNames, function (month) {
    return _c('th', {
      key: month,
      staticClass: "rk-annual-cycle__month",
      attrs: {
        "colspan": "3"
      }
    }, [_vm._v("\n          " + _vm._s(month) + "\n        ")]);
  })], 2)]), _vm._v(" "), _c('tbody', _vm._l(_vm.value, function (entry, index) {
    return _c('rk-annual-cycle-entry', {
      key: "row-" + index,
      attrs: {
        "entry": entry,
        "editmode": _vm.editmode
      },
      on: {
        "input": function (value) {
          return _vm.handleInput(value, index);
        }
      }
    });
  }), 1)])]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-565ed8ee_0", {
    source: ".rk-annual-cycle{border:1px solid #000;background-color:#fff;font-family:Arial,Helvetica,sans-serif}.rk-annual-cycle input{font-family:Arial,Helvetica,sans-serif}.rk-annual-cycle input:disabled{background:0 0}.rk-annual-cycle input::-webkit-inner-spin-button,.rk-annual-cycle input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.rk-annual-cycle input[type=number]{-moz-appearance:textfield}.rk-annual-cycle table{width:100%;border-collapse:collapse}.rk-annual-cycle table thead tr{border-bottom:2px solid #000}.rk-annual-cycle__month{padding:4px 0;text-align:center;border-left:1px solid #000;font-size:14px;font-weight:600;width:7%}.rk-annual-cycle__name{border-top:1px solid #000}.rk-annual-cycle__name input{width:99%;padding:2px 4px;background:0 0;border:0}.rk-annual-cycle__entry{position:relative;border-top:1px solid #000;border-left:1px solid #000;text-align:center}.rk-annual-cycle__entry input{position:absolute;top:0;left:0;right:0;bottom:0;-webkit-appearance:none;width:100%;background-color:transparent;border:0;text-align:center;z-index:10;outline:0}.rk-annual-cycle__color{position:absolute;top:0;left:0;right:0;bottom:0;z-index:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

// Import vue component

const install = function installRkAnnualCycle(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('RkAnnualCycle', __vue_component__$1);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$1.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__$1;
