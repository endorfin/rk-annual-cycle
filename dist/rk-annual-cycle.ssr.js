'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
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
    entries: function entries() {
      return this.entry.data.replace(/\s/g, '').split('');
    }
  },
  methods: {
    chunk: function chunk(arr, size) {
      return Array.from({
        length: Math.ceil(arr.length / size)
      }, function (v, i) {
        return arr.slice(i * size, i * size + size);
      });
    },
    handleNameInput: function handleNameInput(event) {
      this.$emit('input', _objectSpread2(_objectSpread2({}, this.entry), {}, {
        name: event.target.value
      }));
    },
    handleDataInput: function handleDataInput(event, index) {
      var value = ['0', '1', '2', '3', '4'].includes(event.target.value) ? event.target.value : this.entries[index];

      var data = _toConsumableArray(this.entries);

      data[index] = value;
      var entryData = this.chunk(data, 3).map(function (part) {
        return part.join('');
      }).join(' ');
      this.$emit('input', _objectSpread2(_objectSpread2({}, this.entry), {}, {
        data: entryData
      }));
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('tr', [_vm._ssrNode("<td class=\"rk-annual-cycle__name\"><input" + _vm._ssrAttr("disabled", !_vm.editmode) + " type=\"text\"" + _vm._ssrAttr("value", _vm.entry.name) + "></td> " + _vm._ssrList(_vm.entries, function (opacity, colIndex) {
    return "<td class=\"rk-annual-cycle__entry\"><div class=\"rk-annual-cycle__color\"" + _vm._ssrStyle(null, {
      'opacity': opacity * 25 / 100,
      'backgroundColor': _vm.entry.color
    }, null) + "></div> " + (_vm.editmode ? "<input type=\"number\" min=\"0\" max=\"4\"" + _vm._ssrAttr("value", _vm.entries[colIndex]) + ">" : "<!---->") + "</td>";
  }))]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-24dae800";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);//
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
      default: function _default() {
        return false;
      }
    },
    monthNames: {
      type: Array,
      default: function _default() {
        return ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
      }
    }
  },
  methods: {
    addEntry: function addEntry() {
      this.value.push({
        name: 'new',
        color: '#333',
        data: '000 000 000 000 000 000 000 000 000 000 000 000'
      });
    },
    handleInput: function handleInput(value, index) {
      this.$set(this.value, index, value);
    }
  }
};function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "rk-annual-cycle"
  }, [_vm._ssrNode("<table>", "</table>", [_vm._ssrNode("<thead><tr><th></th> " + _vm._ssrList(_vm.monthNames, function (month) {
    return "<th colspan=\"3\" class=\"rk-annual-cycle__month\">" + _vm._ssrEscape("\n          " + _vm._s(month) + "\n        ") + "</th>";
  }) + "</tr></thead> "), _vm._ssrNode("<tbody>", "</tbody>", _vm._l(_vm.value, function (entry, index) {
    return _c('rk-annual-cycle-entry', {
      key: "row-" + index,
      attrs: {
        "entry": entry,
        "editmode": _vm.editmode
      },
      on: {
        "input": function input(value) {
          return _vm.handleInput(value, index);
        }
      }
    });
  }), 1)], 2)]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-565ed8ee_0", {
    source: ".rk-annual-cycle{border:1px solid #000;background-color:#fff;font-family:Arial,Helvetica,sans-serif}.rk-annual-cycle input{font-family:Arial,Helvetica,sans-serif}.rk-annual-cycle input:disabled{background:0 0}.rk-annual-cycle input::-webkit-inner-spin-button,.rk-annual-cycle input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.rk-annual-cycle input[type=number]{-moz-appearance:textfield}.rk-annual-cycle table{width:100%;border-collapse:collapse}.rk-annual-cycle table thead tr{border-bottom:2px solid #000}.rk-annual-cycle__month{padding:4px 0;text-align:center;border-left:1px solid #000;font-size:14px;font-weight:600;width:7%}.rk-annual-cycle__name{border-top:1px solid #000}.rk-annual-cycle__name input{width:99%;padding:2px 4px;background:0 0;border:0}.rk-annual-cycle__entry{position:relative;border-top:1px solid #000;border-left:1px solid #000;text-align:center}.rk-annual-cycle__entry input{position:absolute;top:0;left:0;right:0;bottom:0;-webkit-appearance:none;width:100%;background-color:transparent;border:0;text-align:center;z-index:10;outline:0}.rk-annual-cycle__color{position:absolute;top:0;left:0;right:0;bottom:0;z-index:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-565ed8ee";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installRkAnnualCycle(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('RkAnnualCycle', __vue_component__$1);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$1.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__$1;