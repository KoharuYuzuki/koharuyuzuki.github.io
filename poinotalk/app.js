// node_modules/@vue/shared/dist/shared.esm-bundler.js
var makeMap = function(str, expectsLowerCase) {
  const set = new Set(str.split(","));
  return expectsLowerCase ? (val) => set.has(val.toLowerCase()) : (val) => set.has(val);
};
var normalizeStyle = function(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0;i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
};
var parseStringStyle = function(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
};
var normalizeClass = function(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0;i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
};
var includeBooleanAttr = function(value) {
  return !!value || value === "";
};
var EMPTY_OBJ = Object.freeze({});
var EMPTY_ARR = Object.freeze([]);
var NOOP = () => {
};
var NO = () => false;
var isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
var isModelListener = (key) => key.startsWith("onUpdate:");
var extend = Object.assign;
var remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isSet = (val) => toTypeString(val) === "[object Set]";
var isFunction = (val) => typeof val === "function";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
var isPlainObject = (val) => toTypeString(val) === "[object Object]";
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var isReservedProp = makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
var isBuiltInDirective = makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
var cacheStringFunction = (fn) => {
  const cache = Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
var toHandlerKey = cacheStringFunction((str) => {
  const s = str ? `on${capitalize(str)}` : ``;
  return s;
});
var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
var invokeArrayFns = (fns, arg) => {
  for (let i = 0;i < fns.length; i++) {
    fns[i](arg);
  }
};
var def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
var looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
var toNumber = (val) => {
  const n = isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
var _globalThis;
var getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
var listDelimiterRE = /;(?![^(]*\))/g;
var propertyDelimiterRE = /:([^]+)/;
var styleCommentRE = /\/\*[^]*?\*\//g;
var HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
var MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
var isHTMLTag = makeMap(HTML_TAGS);
var isSVGTag = makeMap(SVG_TAGS);
var isMathMLTag = makeMap(MATH_TAGS);
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isSpecialBooleanAttr = makeMap(specialBooleanAttrs);
var isBooleanAttr = makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);

// node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
var warn = function(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
};
var recordEffectScope = function(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
};
var getCurrentScope = function() {
  return activeEffectScope;
};
var triggerComputed = function(computed) {
  return computed.value;
};
var preCleanupEffect = function(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
};
var postCleanupEffect = function(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i = effect2._depsLength;i < effect2.deps.length; i++) {
      cleanupDepEffect(effect2.deps[i], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
};
var cleanupDepEffect = function(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== undefined && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
};
var pauseTracking = function() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
};
var resetTracking = function() {
  const last = trackStack.pop();
  shouldTrack = last === undefined ? true : last;
};
var pauseScheduling = function() {
  pauseScheduleStack++;
};
var resetScheduling = function() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
};
var trackEffect = function(effect2, dep, debuggerEventExtraInfo) {
  var _a;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
    if (true) {
      (_a = effect2.onTrack) == null || _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
  }
};
var triggerEffects = function(dep, dirtyLevel, debuggerEventExtraInfo) {
  var _a;
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      if (true) {
        (_a = effect2.onTrigger) == null || _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
      }
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
};
var track = function(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = new Map);
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(activeEffect, dep, {
      target,
      type,
      key
    });
  }
};
var trigger = function(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== undefined) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(dep, 4, {
        target,
        type,
        key,
        newValue,
        oldValue,
        oldTarget
      });
    }
  }
  resetScheduling();
};
var createArrayInstrumentations = function() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length;i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
};
var hasOwnProperty2 = function(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
};
var get = function(target, key, isReadonly = false, isShallow = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
};
var has = function(key, isReadonly = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
};
var size = function(target, isReadonly = false) {
  target = target["__v_raw"];
  !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
};
var add = function(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
};
var set = function(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
};
var deleteEntry = function(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : undefined;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, undefined, oldValue);
  }
  return result;
};
var clear = function() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", undefined, undefined, oldTarget);
  }
  return result;
};
var createForEach = function(isReadonly, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
};
var createIterableMethod = function(method, isReadonly, isShallow) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
};
var createReadonlyMethod = function(type) {
  return function(...args) {
    if (true) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : type === "clear" ? undefined : this;
  };
};
var createInstrumentations = function() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
};
var createInstrumentationGetter = function(isReadonly, shallow) {
  const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
};
var checkIdentityKeys = function(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
};
var targetTypeMap = function(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
};
var getTargetType = function(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
};
var reactive = function(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
};
var shallowReactive = function(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
};
var readonly = function(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
};
var shallowReadonly = function(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
};
var createReactiveObject = function(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (true) {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
};
var isReactive = function(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
};
var isReadonly = function(value) {
  return !!(value && value["__v_isReadonly"]);
};
var isShallow = function(value) {
  return !!(value && value["__v_isShallow"]);
};
var isProxy = function(value) {
  return isReactive(value) || isReadonly(value);
};
var toRaw = function(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
};
var markRaw = function(value) {
  if (Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
};
var computed = function(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
};
var trackRefValue = function(ref2) {
  var _a;
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(activeEffect, (_a = ref2.dep) != null ? _a : ref2.dep = createDep(() => ref2.dep = undefined, ref2 instanceof ComputedRefImpl ? ref2 : undefined), {
      target: ref2,
      type: "get",
      key: "value"
    });
  }
};
var triggerRefValue = function(ref2, dirtyLevel = 4, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(dep, dirtyLevel, {
      target: ref2,
      type: "set",
      key: "value",
      newValue: newVal
    });
  }
};
var isRef = function(r) {
  return !!(r && r.__v_isRef === true);
};
var unref = function(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
};
var proxyRefs = function(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
};
var activeEffectScope;

class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else if (true) {
      warn(`cannot run an inactive effect scope.`);
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length;i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length;i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length;i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = undefined;
      this._active = false;
    }
  }
}
var activeEffect;

class ReactiveEffect {
  constructor(fn, trigger2, scheduler, scope) {
    this.fn = fn;
    this.trigger = trigger2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this._dirtyLevel = 4;
    this._trackId = 0;
    this._runnings = 0;
    this._shouldSchedule = false;
    this._depsLength = 0;
    recordEffectScope(this, scope);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1;
      pauseTracking();
      for (let i = 0;i < this._depsLength; i++) {
        const dep = this.deps[i];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 4) {
            break;
          }
        }
      }
      if (this._dirtyLevel === 1) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(v) {
    this._dirtyLevel = v ? 4 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    var _a;
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      (_a = this.onStop) == null || _a.call(this);
      this.active = false;
    }
  }
}
var shouldTrack = true;
var pauseScheduleStack = 0;
var trackStack = [];
var queueEffectSchedulers = [];
var createDep = (cleanup, computed2) => {
  const dep = new Map;
  dep.cleanup = cleanup;
  dep.computed = computed2;
  return dep;
};
var targetMap = new WeakMap;
var ITERATE_KEY = Symbol("iterate");
var MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
var isNonTrackableKeys = makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol));
var arrayInstrumentations = createArrayInstrumentations();

class BaseReactiveHandler {
  constructor(_isReadonly = false, _shallow = false) {
    this._isReadonly = _isReadonly;
    this._shallow = _shallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, shallow = this._shallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target) || Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty2;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}

class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(shallow = false) {
    super(false, shallow);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._shallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, undefined, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
}

class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(shallow = false) {
    super(true, shallow);
  }
  set(target, key) {
    if (true) {
      warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
  deleteProperty(target, key) {
    if (true) {
      warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
}
var mutableHandlers = new MutableReactiveHandler;
var readonlyHandlers = new ReadonlyReactiveHandler;
var shallowReactiveHandlers = new MutableReactiveHandler(true);
var shallowReadonlyHandlers = new ReadonlyReactiveHandler(true);
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
var [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = createInstrumentations();
var mutableCollectionHandlers = {
  get: createInstrumentationGetter(false, false)
};
var shallowCollectionHandlers = {
  get: createInstrumentationGetter(false, true)
};
var readonlyCollectionHandlers = {
  get: createInstrumentationGetter(true, false)
};
var shallowReadonlyCollectionHandlers = {
  get: createInstrumentationGetter(true, true)
};
var reactiveMap = new WeakMap;
var shallowReactiveMap = new WeakMap;
var readonlyMap = new WeakMap;
var shallowReadonlyMap = new WeakMap;
var toReactive = (value) => isObject(value) ? reactive(value) : value;
var toReadonly = (value) => isObject(value) ? readonly(value) : value;
var COMPUTED_SIDE_EFFECT_WARN = `Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`;

class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = undefined;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect(() => getter(this._value), () => triggerRefValue(this, this.effect._dirtyLevel === 2 ? 2 : 3));
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
      triggerRefValue(self2, 4);
    }
    trackRefValue(self2);
    if (self2.effect._dirtyLevel >= 2) {
      warn(COMPUTED_SIDE_EFFECT_WARN);
      triggerRefValue(self2, 2);
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v) {
    this.effect.dirty = v;
  }
}
var shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
// node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
var pushWarningContext = function(vnode) {
  stack.push(vnode);
};
var popWarningContext = function() {
  stack.pop();
};
var warn$1 = function(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
};
var getComponentTrace = function() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
};
var formatTrace = function(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
};
var formatTraceEntry = function({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
};
var formatProps = function(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
};
var formatProp = function(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
};
var assertNumber = function(val, type) {
  if (false)
    ;
  if (val === undefined) {
    return;
  } else if (typeof val !== "number") {
    warn$1(`${type} is not a valid number - got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    warn$1(`${type} is NaN - the duration expression might be incorrect.`);
  }
};
var callWithErrorHandling = function(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
};
var callWithAsyncErrorHandling = function(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0;i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
};
var handleError = function(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings$1[type];
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0;i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
};
var logError = function(err, type, contextVNode, throwInDev = true) {
  if (true) {
    const info = ErrorTypeStrings$1[type];
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  } else {
  }
};
var nextTick = function(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
};
var findInsertionIndex = function(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
};
var queueJob = function(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
};
var queueFlush = function() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
};
var invalidateJob = function(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
};
var queuePostFlushCb = function(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
};
var flushPreFlushCbs = function(instance, seen, i = isFlushing ? flushIndex + 1 : 0) {
  if (true) {
    seen = seen || new Map;
  }
  for (;i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
};
var flushPostFlushCbs = function(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort((a, b) => getId(a) - getId(b));
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    if (true) {
      seen = seen || new Map;
    }
    for (postFlushIndex = 0;postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
};
var flushJobs = function(seen) {
  isFlushPending = false;
  isFlushing = true;
  if (true) {
    seen = seen || new Map;
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0;flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
};
var checkRecursiveUpdates = function(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      handleError(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`, null, 10);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
};
var registerHMR = function(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);
  if (!record) {
    createRecord(id, instance.type);
    record = map.get(id);
  }
  record.instances.add(instance);
};
var unregisterHMR = function(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
};
var createRecord = function(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: new Set
  });
  return true;
};
var normalizeClassComponent = function(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
};
var rerender = function(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    instance.effect.dirty = true;
    instance.update();
    isHmrUpdating = false;
  });
};
var reload = function(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.propsCache.delete(instance.type);
    instance.appContext.emitsCache.delete(instance.type);
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      instance.parent.effect.dirty = true;
      queueJob(instance.parent.update);
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
    }
  }
  queuePostFlushCb(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
    }
  });
};
var updateComponentDef = function(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
};
var tryWrap = function(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
    }
  };
};
var emit$1 = function(event, ...args) {
  if (devtools$1) {
    devtools$1.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
};
var setDevtoolsHook$1 = function(hook, target) {
  var _a, _b;
  devtools$1 = hook;
  if (devtools$1) {
    devtools$1.enabled = true;
    buffer.forEach(({ event, args }) => devtools$1.emit(event, ...args));
    buffer = [];
  } else if (typeof window !== "undefined" && window.HTMLElement && !((_b = (_a = window.navigator) == null ? undefined : _a.userAgent) == null ? undefined : _b.includes("jsdom"))) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook$1(newHook, target);
    });
    setTimeout(() => {
      if (!devtools$1) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3000);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
};
var devtoolsInitApp = function(app, version) {
  emit$1("app:init", app, version, {
    Fragment,
    Text,
    Comment,
    Static
  });
};
var devtoolsUnmountApp = function(app) {
  emit$1("app:unmount", app);
};
var createDevtoolsComponentHook = function(hook) {
  return (component) => {
    emit$1(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : undefined, component);
  };
};
var createDevtoolsPerformanceHook = function(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
};
var devtoolsComponentEmit = function(component, event, params) {
  emit$1("component:emit", component.appContext.app, component, event, params);
};
var emit = function(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  if (true) {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  if (true) {
    devtoolsComponentEmit(instance, event, args);
  }
  if (true) {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
};
var normalizeEmitsOptions = function(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== undefined) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
};
var isEmitListener = function(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
};
var setCurrentRenderingInstance = function(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
};
var withCtx = function(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    if (true) {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
};
var markAttrsAccessed = function() {
  accessedAttrs = true;
};
var renderComponentRoot = function(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  if (true) {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = setupState.__isScriptSetup ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(`Property '${String(key)}' was accessed via 'this'. Avoid using 'this' in templates.`);
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(render.call(thisProxy, proxyToUse, renderCache, props, setupState, data, ctx));
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (attrs === props) {
        markAttrsAccessed();
      }
      result = normalizeVNode(render2.length > 1 ? render2(props, {
        get attrs() {
          markAttrsAccessed();
          return attrs;
        },
        slots,
        emit: emit2
      }) : render2(props, null));
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  let setRoot = undefined;
  if (result.patchFlag > 0 && result.patchFlag & 2048) {
    [root, setRoot] = getChildRoot(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
        }
        root = cloneVNode(root, fallthroughAttrs);
      } else if (!accessedAttrs && root.type !== Comment) {
        const allAttrs = Object.keys(attrs);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i = 0, l = allAttrs.length;i < l; i++) {
          const key = allAttrs[i];
          if (isOn(key)) {
            if (!isModelListener(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn$1(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`);
        }
        if (eventAttrs.length) {
          warn$1(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
        }
      }
    }
  }
  if (vnode.dirs) {
    if (!isElementRoot(root)) {
      warn$1(`Runtime directive used on component with non-element root node. The directives will not function as intended.`);
    }
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (!isElementRoot(root)) {
      warn$1(`Component inside <Transition> renders non-element root node that cannot be animated.`);
    }
    root.transition = vnode.transition;
  }
  if (setRoot) {
    setRoot(root);
  } else {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
};
var filterSingleRoot = function(children, recurse = true) {
  let singleRoot;
  for (let i = 0;i < children.length; i++) {
    const child = children[i];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
          if (recurse && singleRoot.patchFlag > 0 && singleRoot.patchFlag & 2048) {
            return filterSingleRoot(singleRoot.children);
          }
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
};
var shouldUpdateComponent = function(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if ((prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0;i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
};
var hasPropsChanged = function(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0;i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
};
var updateHOCHostEl = function({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
};
var queueEffectWithSuspense = function(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
};
var watch = function(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
};
var doWatch = function(source, cb, {
  immediate,
  deep,
  flush,
  once,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  if (deep !== undefined && typeof deep === "number") {
    warn$1(`watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.`);
  }
  if (!cb) {
    if (immediate !== undefined) {
      warn$1(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== undefined) {
      warn$1(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (once !== undefined) {
      warn$1(`watch() "once" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s) => {
    warn$1(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : traverse(source2, deep === false ? 1 : undefined);
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else {
        warnInvalidSource(s);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect2.onStop = undefined;
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : undefined,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active || !effect2.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? undefined : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect(getter, NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect2.stop();
    if (scope) {
      remove(scope.effects, effect2);
    }
  };
  if (true) {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect2.run.bind(effect2), instance && instance.suspense);
  } else {
    effect2.run();
  }
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
};
var instanceWatch = function(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
};
var createPathGetter = function(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0;i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
};
var traverse = function(value, depth, currentDepth = 0, seen) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value;
    }
    currentDepth++;
  }
  seen = seen || new Set;
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, depth, currentDepth, seen);
  } else if (isArray(value)) {
    for (let i = 0;i < value.length; i++) {
      traverse(value[i], depth, currentDepth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, currentDepth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, currentDepth, seen);
    }
  }
  return value;
};
var validateDirectiveName = function(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
};
var invokeDirectiveHook = function(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0;i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
};
var useTransitionState = function() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: new Map
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
};
var getLeavingNodesForType = function(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
};
var resolveTransitionHooks = function(vnode, props, state, instance) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook = (hook, args) => {
    hook && callWithAsyncErrorHandling(hook, instance, 9, args);
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook(hook, args);
    if (isArray(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el[leaveCbKey]) {
        el[leaveCbKey](true);
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
        leavingVNode.el[leaveCbKey]();
      }
      callHook(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el[enterCbKey] = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook(cancelHook, [el]);
        } else {
          callHook(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el[enterCbKey] = undefined;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el[enterCbKey]) {
        el[enterCbKey](true);
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook(onBeforeLeave, [el]);
      let called = false;
      const done = el[leaveCbKey] = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook(onLeaveCancelled, [el]);
        } else {
          callHook(onAfterLeave, [el]);
        }
        el[leaveCbKey] = undefined;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
};
var emptyPlaceholder = function(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
};
var getKeepAliveChild = function(vnode) {
  return isKeepAlive(vnode) ? vnode.component ? vnode.component.subTree : vnode.children ? vnode.children[0] : undefined : vnode;
};
var setTransitionHooks = function(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
};
var getTransitionRawChildren = function(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0;i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0;i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
};
var defineComponent = function(options, extraOptions) {
  return isFunction(options) ? (() => extend({ name: options.name }, extraOptions, { setup: options }))() : options;
};
var onActivated = function(hook, target) {
  registerKeepAliveHook(hook, "a", target);
};
var onDeactivated = function(hook, target) {
  registerKeepAliveHook(hook, "da", target);
};
var registerKeepAliveHook = function(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
};
var injectToKeepAliveRoot = function(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
};
var injectHook = function(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else if (true) {
    const apiName = toHandlerKey(ErrorTypeStrings$1[type].replace(/ hook$/, ""));
    warn$1(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().` + ` If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
};
var onErrorCaptured = function(hook, target = currentInstance) {
  injectHook("ec", hook, target);
};
var createDevRenderContext = function(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      set: NOOP
    });
  });
  return target;
};
var exposePropsOnRenderContext = function(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
};
var exposeSetupStateOnRenderContext = function(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(`setup() return property ${JSON.stringify(key)} should not start with "\$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
};
var normalizePropsOrEmits = function(props) {
  return isArray(props) ? props.reduce((normalized, p) => (normalized[p] = null, normalized), {}) : props;
};
var createDuplicateChecker = function() {
  const cache = Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
};
var applyOptions = function(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  if (true) {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        if (true) {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        } else {
        }
        if (true) {
          checkDuplicateProperties("Methods", key);
        }
      } else if (true) {
        warn$1(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      if (true) {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c = computed2({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      if (true) {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
};
var resolveInjections = function(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
    if (true) {
      checkDuplicateProperties("Inject", key);
    }
  }
};
var callHook = function(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
};
var createWatcher = function(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else if (true) {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else if (true) {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else if (true) {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
};
var resolveMergedOptions = function(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
};
var mergeOptions = function(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
};
var mergeDataFn = function(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
};
var mergeInject = function(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
};
var normalizeInject = function(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0;i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
};
var mergeAsArray = function(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
};
var mergeObjectOptions = function(to, from) {
  return to ? extend(Object.create(null), to, from) : from;
};
var mergeEmitsOrPropsOptions = function(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [...new Set([...to, ...from])];
    }
    return extend(Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from != null ? from : {}));
  } else {
    return from;
  }
};
var mergeWatchOptions = function(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
};
var createAppContext = function() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: undefined,
      warnHandler: undefined,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap,
    propsCache: new WeakMap,
    emitsCache: new WeakMap
  };
};
var createAppAPI = function(render, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = new WeakSet;
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        if (true) {
          warn$1(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else if (true) {
          warn$1(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        if (__VUE_OPTIONS_API__) {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else if (true) {
            warn$1("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        } else if (true) {
          warn$1("Mixins are only available in builds supporting Options API");
        }
        return app;
      },
      component(name, component) {
        if (true) {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (true) {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          if (rootContainer.__vue_app__) {
            warn$1(`There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`);
          }
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = undefined;
          }
          if (true) {
            context.reload = () => {
              render(cloneVNode(vnode), rootContainer, namespace);
            };
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          if (true) {
            app._instance = vnode.component;
            devtoolsInitApp(app, version);
          }
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else if (true) {
          warn$1(`App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          if (true) {
            app._instance = null;
            devtoolsUnmountApp(app);
          }
          delete app._container.__vue_app__;
        } else if (true) {
          warn$1(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
};
var provide = function(key, value) {
  if (!currentInstance) {
    if (true) {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
};
var inject = function(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else if (true) {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else if (true) {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
};
var initProps = function(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = undefined;
    }
  }
  if (true) {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
};
var isInHmrContext = function(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
};
var updateProps = function(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (!isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0;i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== undefined || rawPrevProps[kebabKey] !== undefined)) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, undefined, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  if (true) {
    validateProps(rawProps || {}, props, instance);
  }
};
var setFullProps = function(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0;i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
};
var resolvePropValue = function(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === undefined) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          reset();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
};
var normalizePropsOptions = function(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0;i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn$1(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
};
var validatePropName = function(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  } else if (true) {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
};
var getType = function(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
};
var isSameType = function(a, b) {
  return getType(a) === getType(b);
};
var getTypeIndex = function(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
};
var validateProps = function(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, shallowReadonly(resolvedValues), !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
  }
};
var validateProp = function(name, value, prop, props, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0;i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, props)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
};
var assertType = function(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
};
var getInvalidTypeMessage = function(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
};
var styleValue = function(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
};
var isExplicable = function(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
};
var isBoolean = function(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
};
var setRef = function(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  if (!owner) {
    warn$1(`Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`);
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else if (true) {
          warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else if (true) {
      warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
    }
  }
};
var startMeasure = function(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  if (true) {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
};
var endMeasure = function(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  if (true) {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
};
var isSupported = function() {
  if (supported !== undefined) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
};
var initFeatureFlags = function() {
  const needWarn = [];
  if (typeof __VUE_OPTIONS_API__ !== "boolean") {
    needWarn.push(`__VUE_OPTIONS_API__`);
    getGlobalThis().__VUE_OPTIONS_API__ = true;
  }
  if (typeof __VUE_PROD_DEVTOOLS__ !== "boolean") {
    needWarn.push(`__VUE_PROD_DEVTOOLS__`);
    getGlobalThis().__VUE_PROD_DEVTOOLS__ = false;
  }
  if (typeof __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ !== "boolean") {
    needWarn.push(`__VUE_PROD_HYDRATION_MISMATCH_DETAILS__`);
    getGlobalThis().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
  }
  if (needWarn.length) {
    const multi = needWarn.length > 1;
    console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
  }
};
var createRenderer = function(options) {
  return baseCreateRenderer(options);
};
var baseCreateRenderer = function(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;
  if (true) {
    setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = undefined, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        } else if (true) {
          patchStaticNode(n1, n2, container, namespace);
        }
        break;
      case Fragment:
        processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        break;
      default:
        if (shapeFlag & 1) {
          processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        } else if (shapeFlag & 6) {
          processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        } else if (shapeFlag & 64) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
        } else if (shapeFlag & 128) {
          type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
        } else if (true) {
          warn$1("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
  };
  const patchStaticNode = (n1, n2, container, namespace) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace);
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
    } else {
      patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(vnode.type, namespace, props && props.is, props);
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], namespace, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (true) {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0;i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start;i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(null, child, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (isHmrUpdating) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (dynamicChildren) {
      patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
      if (true) {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, false);
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0;i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, n1.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0;i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, true);
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(el, key, oldProps[key], null, namespace, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, namespace, vnode.children, parentComponent, parentSuspense, unmountChildren);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (isHmrUpdating || patchFlag & 2048) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(n2.children || [], container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds);
        if (true) {
          traverseStaticChildren(n1, n2);
        } else
          ;
      } else {
        patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
      } else {
        mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized);
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
    if (instance.type.__hmrId) {
      registerHMR(instance);
    }
    if (true) {
      pushWarningContext(initialVNode);
      startMeasure(instance, `mount`);
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      if (true) {
        startMeasure(instance, `init`);
      }
      setupComponent(instance);
      if (true) {
        endMeasure(instance, `init`);
      }
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
    } else {
      setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
    }
    if (true) {
      popWarningContext();
      endMeasure(instance, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        if (true) {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        if (true) {
          popWarningContext();
        }
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.effect.dirty = true;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            if (true) {
              startMeasure(instance, `render`);
            }
            instance.subTree = renderComponentRoot(instance);
            if (true) {
              endMeasure(instance, `render`);
            }
            if (true) {
              startMeasure(instance, `hydrate`);
            }
            hydrateNode(el, instance.subTree, instance, parentSuspense, null);
            if (true) {
              endMeasure(instance, `hydrate`);
            }
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(() => !instance.isUnmounted && hydrateSubTree());
          } else {
            hydrateSubTree();
          }
        } else {
          if (true) {
            startMeasure(instance, `render`);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          if (true) {
            endMeasure(instance, `render`);
          }
          if (true) {
            startMeasure(instance, `patch`);
          }
          patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
          if (true) {
            endMeasure(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        if (true) {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        if (true) {
          pushWarningContext(next || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        if (true) {
          startMeasure(instance, `render`);
        }
        const nextTree = renderComponentRoot(instance);
        if (true) {
          endMeasure(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        if (true) {
          startMeasure(instance, `patch`);
        }
        patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, namespace);
        if (true) {
          endMeasure(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
        }
        if (true) {
          devtoolsComponentUpdated(instance);
        }
        if (true) {
          popWarningContext();
        }
      }
    };
    const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn, NOOP, () => queueJob(update), instance.scope);
    const update = instance.update = () => {
      if (effect2.dirty) {
        effect2.run();
      }
    };
    update.id = instance.uid;
    toggleRecurse(instance, true);
    if (true) {
      effect2.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : undefined;
      effect2.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : undefined;
      update.ownerInstance = instance;
    }
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0;i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
    }
    if (oldLength > newLength) {
      unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
    } else {
      mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = new Map;
      for (i = s2;i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          if (keyToNewIndexMap.has(nextChild.key)) {
            warn$1(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
          }
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0;i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1;i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2;j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === undefined) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1;i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(null, nextChild, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0;i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref2,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
      } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach((child) => {
          if (child.type === Comment) {
            hostRemove(child.el);
          } else {
            remove2(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (instance.type.__hmrId) {
      unregisterHMR(instance);
    }
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    if (true) {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start;i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  let isFlushing = false;
  const render = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, namespace);
    }
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing = false;
    }
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(internals);
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
};
var resolveChildrenNamespace = function({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? undefined : currentNamespace;
};
var toggleRecurse = function({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
};
var needTransition = function(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
};
var traverseStaticChildren = function(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0;i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
};
var getSequence = function(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0;i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
};
var locateNonHydratedAsyncRoot = function(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
};
var setBlockTracking = function(value) {
  isBlockTreeEnabled += value;
};
var isVNode = function(value) {
  return value ? value.__v_isVNode === true : false;
};
var isSameVNodeType = function(n1, n2) {
  if (n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
    n1.shapeFlag &= ~256;
    n2.shapeFlag &= ~512;
    return false;
  }
  return n1.type === n2.type && n1.key === n2.key;
};
var createBaseVNode = function(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (vnode.key !== vnode.key) {
    warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
};
var _createVNode = function(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (!type) {
      warn$1(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(type, props, true);
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  if (shapeFlag & 4 && isProxy(type)) {
    type = toRaw(type);
    warn$1(`Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
  }
  return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
};
var guardReactiveProps = function(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
};
var cloneVNode = function(vnode, extraProps, mergeRef = false) {
  const { props, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: patchFlag === -1 && isArray(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
};
var deepCloneVNode = function(vnode) {
  const cloned = cloneVNode(vnode);
  if (isArray(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
};
var createTextVNode = function(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
};
var normalizeVNode = function(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(Fragment, null, child.slice());
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
};
var cloneIfMounted = function(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
};
var normalizeChildren = function(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
};
var mergeProps = function(...args) {
  const ret = {};
  for (let i = 0;i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
};
var invokeVNodeHook = function(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
};
var createComponentInstance = function(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  if (true) {
    instance.ctx = createDevRenderContext(instance);
  } else {
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
};
var validateComponentName = function(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn$1("Do not use built-in or reserved HTML elements as component id: " + name);
  }
};
var isStatefulComponent = function(instance) {
  return instance.vnode.shapeFlag & 4;
};
var setupComponent = function(instance, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : undefined;
  isSSR && setInSSRSetupState(false);
  return setupResult;
};
var setupStatefulComponent = function(instance, isSSR) {
  var _a;
  const Component = instance.type;
  if (true) {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i = 0;i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i = 0;i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn$1(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  if (true) {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [
      shallowReadonly(instance.props),
      setupContext
    ]);
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if (!instance.suspense) {
          const name = (_a = Component.name) != null ? _a : "Anonymous";
          warn$1(`Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
        }
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
};
var handleSetupResult = function(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(`setup() should not return VNodes directly - return a render function instead.`);
    }
    if (true) {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    if (true) {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== undefined) {
    warn$1(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
};
var finishComponentSetup = function(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        if (true) {
          startMeasure(instance, `compile`);
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(extend({
          isCustomElement,
          delimiters
        }, compilerOptions), componentCompilerOptions);
        Component.render = compile(template, finalCompilerOptions);
        if (true) {
          endMeasure(instance, `compile`);
        }
      }
    }
    instance.render = Component.render || NOOP;
    if (installWithProxy) {
      installWithProxy(instance);
    }
  }
  if (__VUE_OPTIONS_API__ && true) {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (!Component.render && instance.render === NOOP && !isSSR) {
    if (!compile && Component.template) {
      warn$1(`Component provided template option but runtime compilation is not supported in this build of Vue.` + ` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
};
var getAttrsProxy = function(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(instance.attrs, {
    get(target, key) {
      markAttrsAccessed();
      track(instance, "get", "$attrs");
      return target[key];
    },
    set() {
      warn$1(`setupContext.attrs is readonly.`);
      return false;
    },
    deleteProperty() {
      warn$1(`setupContext.attrs is readonly.`);
      return false;
    }
  }));
};
var getSlotsProxy = function(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  }));
};
var createSetupContext = function(instance) {
  const expose = (exposed) => {
    if (true) {
      if (instance.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(`expose() should be passed a plain object, received ${exposedType}.`);
        }
      }
    }
    instance.exposed = exposed || {};
  };
  if (true) {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance);
      },
      get slots() {
        return getSlotsProxy(instance);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  } else {
  }
};
var getExposeProxy = function(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
};
var getComponentName = function(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
};
var formatComponentName = function(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
};
var isClassComponent = function(value) {
  return isFunction(value) && "__vccOpts" in value;
};
var h = function(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
};
var initCustomFormatter = function() {
  if (typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#1677ff" };
  const stringStyle = { style: "color:#f5222d" };
  const keywordStyle = { style: "color:#eb2f96" };
  const formatter = {
    header(obj) {
      if (!isObject(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if (isRef(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(obj.value),
          `>`
        ];
      } else if (isReactive(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${isReadonly(obj) ? ` (readonly)` : ``}`
        ];
      } else if (isReadonly(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", toRaw(instance.props)));
    }
    if (instance.setupState !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", toRaw(instance.data)));
    }
    const computed2 = extractKeys(instance, "computed");
    if (computed2) {
      blocks.push(createInstanceBlock("computed", computed2));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = extend({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v, asRaw = true) {
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if (isObject(v)) {
      return ["object", { object: asRaw ? toRaw(v) : v }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if (isFunction(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (isShallow(v)) {
      return `ShallowRef`;
    }
    if (v.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
};
var stack = [];
var ErrorTypeStrings$1 = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
var isFlushing = false;
var isFlushPending = false;
var queue = [];
var flushIndex = 0;
var pendingPostFlushCbs = [];
var activePostFlushCbs = null;
var postFlushIndex = 0;
var resolvedPromise = Promise.resolve();
var currentFlushPromise = null;
var RECURSION_LIMIT = 100;
var getId = (job) => job.id == null ? Infinity : job.id;
var comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
var isHmrUpdating = false;
var hmrDirtyComponents = new Set;
if (true) {
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
var map = new Map;
var devtools$1;
var buffer = [];
var devtoolsNotInstalled = false;
var devtoolsComponentAdded = createDevtoolsComponentHook("component:added");
var devtoolsComponentUpdated = createDevtoolsComponentHook("component:updated");
var _devtoolsComponentRemoved = createDevtoolsComponentHook("component:removed");
var devtoolsComponentRemoved = (component) => {
  if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" && !devtools$1.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
var devtoolsPerfStart = createDevtoolsPerformanceHook("perf:start");
var devtoolsPerfEnd = createDevtoolsPerformanceHook("perf:end");
var currentRenderingInstance = null;
var currentScopeId = null;
var accessedAttrs = false;
var getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren, false);
  if (!childRoot) {
    return [vnode, undefined];
  } else if (childRoot.patchFlag > 0 && childRoot.patchFlag & 2048) {
    return getChildRoot(childRoot);
  }
  const index = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
var getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
var filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
var isElementRoot = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
};
var NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
var isSuspense = (type) => type.__isSuspense;
var ssrContextKey = Symbol.for("v-scx");
var useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    if (!ctx) {
      warn$1(`Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`);
    }
    return ctx;
  }
};
var INITIAL_WATCHER_VALUE = {};
var leaveCbKey = Symbol("_leaveCb");
var enterCbKey = Symbol("_enterCb");
var TransitionHookValidator = [Function, Array];
var BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
var BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        let hasFound = false;
        for (const c of children) {
          if (c.type !== Comment) {
            if (hasFound) {
              warn$1("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            child = c;
            hasFound = true;
            if (false)
              ;
          }
        }
      }
      const rawProps = toRaw(props);
      const { mode } = rawProps;
      if (mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
        warn$1(`invalid <transition> mode: ${mode}`);
      }
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === undefined) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.effect.dirty = true;
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el[leaveCbKey] = () => {
              earlyRemove();
              el[leaveCbKey] = undefined;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
var BaseTransition = BaseTransitionImpl;
/*! #__NO_SIDE_EFFECTS__ */
var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */
var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
var createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target);
var onBeforeMount = createHook("bm");
var onMounted = createHook("m");
var onBeforeUpdate = createHook("bu");
var onUpdated = createHook("u");
var onBeforeUnmount = createHook("bum");
var onUnmounted = createHook("um");
var onServerPrefetch = createHook("sp");
var onRenderTriggered = createHook("rtg");
var onRenderTracked = createHook("rtc");
var getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
var publicPropertiesMap = extend(Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => shallowReadonly(i.props),
  $attrs: (i) => shallowReadonly(i.attrs),
  $slots: (i) => shallowReadonly(i.slots),
  $refs: (i) => shallowReadonly(i.refs),
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => __VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type,
  $forceUpdate: (i) => i.f || (i.f = () => {
    i.effect.dirty = true;
    queueJob(i.update);
  }),
  $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
  $watch: (i) => __VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP
});
var isReservedPrefix = (key) => key === "_" || key === "$";
var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
var PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== undefined) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
        markAttrsAccessed();
      } else if (key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1(`Property ${JSON.stringify(key)} must be accessed via \$data because it starts with a reserved character ("\$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn$1(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(`Attempting to mutate public property "${key}". Properties starting with \$ are reserved and readonly.`);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
if (true) {
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
var shouldCacheAccess = true;
var internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
var uid$1 = 0;
var currentApp = null;
var isSimpleType = makeMap("String,Number,Boolean,Function,Symbol,BigInt");
var isInternalKey = (key) => key[0] === "_" || key === "$stable";
var normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
var normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (currentInstance && (!ctx || ctx.root === currentInstance.root)) {
      warn$1(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
var normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      if (true) {
        warn$1(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
      }
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
var normalizeVNodeSlots = (instance, children) => {
  if (!isKeepAlive(instance.vnode) && true) {
    warn$1(`Non-function value encountered for default slot. Prefer function slots for better performance.`);
  }
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
var initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(children, instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
var updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (isHmrUpdating) {
        extend(slots, children);
        trigger(instance, "set", "$slots");
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
var supported;
var perf;
var queuePostRenderEffect = queueEffectWithSuspense;
var isTeleport = (type) => type.__isTeleport;
var Fragment = Symbol.for("v-fgt");
var Text = Symbol.for("v-txt");
var Comment = Symbol.for("v-cmt");
var Static = Symbol.for("v-stc");
var blockStack = [];
var currentBlock = null;
var isBlockTreeEnabled = 1;
var vnodeArgsTransformer;
var createVNodeWithArgsTransform = (...args) => {
  return _createVNode(...vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args);
};
var InternalObjectKey = `__vInternal`;
var normalizeKey = ({ key }) => key != null ? key : null;
var normalizeRef = ({
  ref: ref2,
  ref_key,
  ref_for
}) => {
  if (typeof ref2 === "number") {
    ref2 = "" + ref2;
  }
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
var createVNode = createVNodeWithArgsTransform;
var emptyAppContext = createAppContext();
var uid = 0;
var currentInstance = null;
var getCurrentInstance = () => currentInstance || currentRenderingInstance;
var internalSetCurrentInstance;
var setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key]))
      setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1)
        setters.forEach((set2) => set2(v));
      else
        setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(`__VUE_INSTANCE_SETTERS__`, (v) => currentInstance = v);
  setInSSRSetupState = registerGlobalSetter(`__VUE_SSR_SETTERS__`, (v) => isInSSRComponentSetup = v);
}
var setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
var unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
var isBuiltInTag = makeMap("slot,component");
var isInSSRComponentSetup = false;
var compile;
var installWithProxy;
var isRuntimeOnly = () => !compile;
var classifyRE = /(?:^|[-_])(\w)/g;
var classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
var computed2 = (getterOrOptions, debugOptions) => {
  return computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
var version = "3.4.19";
var warn2 = warn$1;
// node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var resolveTransitionProps = function(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve = () => finishEnter(el, isAppear, done);
      callHook2(hook, [el, resolve]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook2(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook2(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve);
        }
      });
      callHook2(onLeave, [el, resolve]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook2(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook2(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook2(onLeaveCancelled, [el]);
    }
  });
};
var normalizeDuration = function(duration) {
  if (duration == null) {
    return null;
  } else if (isObject(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
};
var NumberOf = function(val) {
  const res = toNumber(val);
  if (true) {
    assertNumber(res, "<transition> explicit duration");
  }
  return res;
};
var addTransitionClass = function(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el[vtcKey] || (el[vtcKey] = new Set)).add(cls);
};
var removeTransitionClass = function(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el[vtcKey] = undefined;
    }
  }
};
var nextFrame = function(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
};
var whenTransitionEnds = function(el, expectedType, explicitTimeout, resolve) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
};
var getTransitionInfo = function(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
};
var getTimeout = function(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
};
var toMs = function(s) {
  if (s === "auto")
    return 0;
  return Number(s.slice(0, -1).replace(",", ".")) * 1000;
};
var forceReflow = function() {
  return document.body.offsetHeight;
};
var patchClass = function(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
};
var setDisplay = function(el, value) {
  el.style.display = value ? el[vShowOldKey] : "none";
};
var patchStyle = function(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  const currentDisplay = style.display;
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOldKey in el) {
    el[vShowOldKey] = hasControlledDisplay ? style.display : "";
    style.display = currentDisplay;
  }
};
var setStyle = function(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (true) {
      if (semicolonRE.test(val)) {
        warn2(`Unexpected semicolon at the end of '${name}' style value: '${val}'`);
      }
    }
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
      } else {
        style[prefixed] = val;
      }
    }
  }
};
var autoPrefix = function(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0;i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
};
var patchAttr = function(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean2 = isSpecialBooleanAttr(key);
    if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean2 ? "" : value);
    }
  }
};
var patchDOMProp = function(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && !tag.includes("-")) {
    el._value = value;
    const oldValue = tag === "OPTION" ? el.getAttribute("value") : el.value;
    const newValue = value == null ? "" : value;
    if (oldValue !== newValue) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
    if (!needRemove) {
      warn2(`Failed setting prop "${key}" on <${tag.toLowerCase()}>: value ${value} is invalid.`, e);
    }
  }
  needRemove && el.removeAttribute(key);
};
var addEventListener = function(el, event, handler, options) {
  el.addEventListener(event, handler, options);
};
var removeEventListener = function(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
};
var patchEvent = function(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = undefined;
    }
  }
};
var parseName = function(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
};
var createInvoker = function(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
};
var patchStopImmediatePropagation = function(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
};
var shouldSetAsProp = function(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
};
var callPendingCbs = function(c) {
  const el = c.el;
  if (el[moveCbKey]) {
    el[moveCbKey]();
  }
  if (el[enterCbKey2]) {
    el[enterCbKey2]();
  }
};
var recordPosition = function(c) {
  newPositionMap.set(c, c.el.getBoundingClientRect());
};
var applyTranslation = function(c) {
  const oldPos = positionMap.get(c);
  const newPos = newPositionMap.get(c);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s = c.el.style;
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = "0s";
    return c;
  }
};
var hasCSSTransform = function(el, root, moveClass) {
  const clone = el.cloneNode();
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
    });
  }
  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
  clone.style.display = "none";
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
};
var ensureRenderer = function() {
  return renderer || (renderer = createRenderer(rendererOptions));
};
var resolveRootNamespace = function(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
};
var injectNativeTagCheck = function(app) {
  Object.defineProperty(app.config, "isNativeTag", {
    value: (tag) => isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
    writable: false
  });
};
var injectCompilerOptionsCheck = function(app) {
  if (isRuntimeOnly()) {
    const isCustomElement = app.config.isCustomElement;
    Object.defineProperty(app.config, "isCustomElement", {
      get() {
        return isCustomElement;
      },
      set() {
        warn2(`The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`);
      }
    });
    const compilerOptions = app.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc`;
    Object.defineProperty(app.config, "compilerOptions", {
      get() {
        warn2(msg);
        return compilerOptions;
      },
      set() {
        warn2(msg);
      }
    });
  }
};
var normalizeContainer = function(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    if (!res) {
      warn2(`Failed to mount app: mount target selector "${container}" returned null.`);
    }
    return res;
  }
  if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
    warn2(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
  }
  return container;
};
var svgNS = "http://www.w3.org/2000/svg";
var mathmlNS = "http://www.w3.org/1998/Math/MathML";
var doc = typeof document !== "undefined" ? document : null;
var templateContainer = doc && doc.createElement("template");
var nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : doc.createElement(tag, is ? { is } : undefined);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content;
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
var TRANSITION = "transition";
var ANIMATION = "animation";
var vtcKey = Symbol("_vtc");
var Transition = (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
var DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
var TransitionPropsValidators = Transition.props = extend({}, BaseTransitionPropsValidators, DOMTransitionPropsValidators);
var callHook2 = (hook, args = []) => {
  if (isArray(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
var hasExplicitCallback = (hook) => {
  return hook ? isArray(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
var endId = 0;
var vShowOldKey = Symbol("_vod");
var vShow = {
  beforeMount(el, { value }, { transition }) {
    el[vShowOldKey] = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue && (el.style.display === el[vShowOldKey] || !value))
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
if (true) {
  vShow.name = "show";
}
var CSS_VAR_TEXT = Symbol("CSS_VAR_TEXT");
var displayRE = /(^|;)\s*display\s*:/;
var semicolonRE = /[^\\];\s*$/;
var importantRE = /\s*!important$/;
var prefixes = ["Webkit", "Moz", "ms"];
var prefixCache = {};
var xlinkNS = "http://www.w3.org/1999/xlink";
var veiKey = Symbol("_vei");
var optionsModifierRE = /(?:Once|Passive|Capture)$/;
var cachedNow = 0;
var p = Promise.resolve();
var getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
var isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
var patchProp = (el, key, prevValue, nextValue, namespace, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
/*! #__NO_SIDE_EFFECTS__ */
/*! #__NO_SIDE_EFFECTS__ */
var positionMap = new WeakMap;
var newPositionMap = new WeakMap;
var moveCbKey = Symbol("_moveCb");
var enterCbKey2 = Symbol("_enterCb");
var TransitionGroupImpl = {
  name: "TransitionGroup",
  props: extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevChildren;
    let children;
    onUpdated(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || "v"}-move`;
      if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow();
      movedChildren.forEach((c) => {
        const el = c.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = "";
        const cb = el[moveCbKey] = (e) => {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener("transitionend", cb);
            el[moveCbKey] = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
    });
    return () => {
      const rawProps = toRaw(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || Fragment;
      prevChildren = children;
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (let i = 0;i < children.length; i++) {
        const child = children[i];
        if (child.key != null) {
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
        } else if (true) {
          warn2(`<TransitionGroup> children must be keyed.`);
        }
      }
      if (prevChildren) {
        for (let i = 0;i < prevChildren.length; i++) {
          const child = prevChildren[i];
          setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
          positionMap.set(child, child.el.getBoundingClientRect());
        }
      }
      return createVNode(tag, null, children);
    };
  }
};
var removeMode = (props) => delete props.mode;
TransitionGroupImpl.props;
var assignKey = Symbol("_assign");
var rendererOptions = extend({ patchProp }, nodeOps);
var renderer;
var createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  if (true) {
    injectNativeTagCheck(app);
    injectCompilerOptionsCheck(app);
  }
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};

// node_modules/vue/dist/vue.runtime.esm-bundler.js
var initDev = function() {
  {
    initCustomFormatter();
  }
};
if (true) {
  initDev();
}

// src/vue-flag.ts
window.__VUE_OPTIONS_API__ = true;
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

// src/utils.ts
var isFirefox = () => CSS.supports("-moz-transform", "none");

// node_modules/vue/jsx-runtime/index.mjs
var jsx = function(type, props, key) {
  const { children } = props;
  delete props.children;
  if (arguments.length > 2) {
    props.key = key;
  }
  return h(type, props, children);
};

// src/components/link.tsx
var link_default = defineComponent({
  props: {
    newTab: {
      type: Boolean,
      default: false
    },
    underline: {
      type: Boolean,
      default: true
    },
    href: {
      type: String,
      required: true
    }
  },
  render() {
    return jsx("a", {
      class: `${this.underline ? "underline" : ""}`,
      target: this.newTab ? "_blank" : undefined,
      rel: `
          ${this.newTab ? "noopener" : ""}
          ${this.newTab ? "noreferrer" : ""}
        `,
      href: this.href,
      children: this.$slots.default ? this.$slots.default() : undefined
    }, undefined, false, undefined, this);
  }
});

// src/components/header.tsx
var header_default = defineComponent({
  data() {
    return {
      menuIsOpen: false
    };
  },
  methods: {
    open() {
      const dialog = this.$refs.sideMenuDialog;
      const delayMs = 100;
      dialog.showModal();
      setTimeout(() => {
        this.menuIsOpen = true;
      }, delayMs);
    },
    close() {
      this.menuIsOpen = false;
      const delayMs = 200;
      setTimeout(() => {
        const dialog = this.$refs.sideMenuDialog;
        dialog.close();
      }, delayMs);
    }
  },
  render() {
    return jsx("header", {
      id: "header",
      class: "w-full h-fit flex flex-col fixed top-0 left-0 bg-gradient-to-b from-main to-transparent",
      children: jsx("div", {
        class: "h-12 m-4 rounded-2xl bg-accent flex justify-between items-center",
        children: [
          jsx("div", {
            class: "flex items-center",
            children: [
              jsx("div", {
                class: "w-12 h-12 bg-main [mask-image:url(./assets/icon.svg)]"
              }, undefined, false, undefined, this),
              jsx(link_default, {
                underline: false,
                href: "./",
                children: () => jsx("p", {
                  class: "text-light text-lg",
                  children: "PoinoTalk Official Site"
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          jsx("div", {
            class: "flex items-center gap-4 mr-4",
            children: [
              jsx("div", {
                class: "items-center gap-4 hidden min-[900px]:flex",
                children: [
                  jsx(link_default, {
                    underline: false,
                    href: "#about",
                    children: () => jsx("p", {
                      class: "text-light",
                      children: "PoinoTalk\u3068\u306F"
                    }, undefined, false, undefined, this)
                  }, undefined, false, undefined, this),
                  jsx(link_default, {
                    underline: false,
                    href: "#characters",
                    children: () => jsx("p", {
                      class: "text-light",
                      children: "\u642D\u8F09\u30AD\u30E3\u30E9\u30AF\u30BF\u30FC"
                    }, undefined, false, undefined, this)
                  }, undefined, false, undefined, this),
                  jsx(link_default, {
                    underline: false,
                    href: "#license",
                    children: () => jsx("p", {
                      class: "text-light",
                      children: "\u5229\u7528\u898F\u7D04\u306B\u3064\u3044\u3066"
                    }, undefined, false, undefined, this)
                  }, undefined, false, undefined, this),
                  jsx(link_default, {
                    newTab: true,
                    underline: false,
                    href: "https://koharuyuzuki.github.io/poinotalk/latest/",
                    children: () => jsx("div", {
                      class: "w-fit h-fit bg-main flex rounded-lg",
                      children: jsx("p", {
                        class: "text-accent text-sm mx-2 my-1",
                        children: "\u30D6\u30E9\u30A6\u30B6\u3067\u4F7F\u3063\u3066\u307F\u308B"
                      }, undefined, false, undefined, this)
                    }, undefined, false, undefined, this)
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              jsx("button", {
                class: `
                w-[24px] h-[20px] relative
                [&>*]:w-[24px]
                [&>*]:h-[2px]
                [&>*]:absolute
                [&>*]:left-0
                [&>*]:right-0
                [&>*]:m-auto
                [&>*]:bg-main
                [&>*]:rounded-[1px]
                [&>*]:transition-[top,bottom,transform,opacity]
                [&>*]:transform-gpu
              `,
                onClick: () => this.menuIsOpen ? this.close() : this.open(),
                children: [
                  jsx("div", {
                    class: `top-0 ${this.menuIsOpen ? "bottom-0 rotate-[-45deg]" : "bottom-[18px] rotate-0"}`
                  }, undefined, false, undefined, this),
                  jsx("div", {
                    class: `top-0 bottom-0 ${this.menuIsOpen ? "opacity-0" : "opacity-100"}`
                  }, undefined, false, undefined, this),
                  jsx("div", {
                    class: `bottom-0 ${this.menuIsOpen ? "top-0 rotate-[45deg]" : "top-[18px] rotate-0"}`
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this)
            ]
          }, undefined, true, undefined, this),
          jsx("div", {
            class: `w-dvw h-dvh fixed top-0 left-0 ${this.menuIsOpen ? "block" : "hidden"}`,
            onClick: this.close
          }, undefined, false, undefined, this),
          jsx("dialog", {
            ref: "sideMenuDialog",
            class: `
              w-72 h-fit max-h-[calc(100dvh-10rem)] m-auto mt-4 rounded-2xl bg-accent
              fixed top-16 flex-col transition-[margin]
              ${this.menuIsOpen ? "mr-4 flex" : "mr-[-20rem]"}
            `,
            onClick: this.close,
            onCancel: (event) => event.preventDefault(),
            children: jsx("div", {
              class: "p-4 flex flex-col grow overflow-hidden",
              onClick: (event) => event.stopPropagation(),
              children: jsx("div", {
                class: "flex flex-col gap-2 grow overflow-y-scroll overscroll-contain scrollbar-light",
                children: [
                  jsx("div", {
                    class: "flex flex-col gap-2",
                    children: [
                      jsx("p", {
                        class: "text-accent-light",
                        children: "Menu"
                      }, undefined, false, undefined, this),
                      jsx("div", {
                        class: "w-fit h-fit",
                        onClick: this.close,
                        children: jsx(link_default, {
                          underline: false,
                          href: "#about",
                          children: () => jsx("p", {
                            class: "text-light",
                            children: "PoinoTalk\u3068\u306F"
                          }, undefined, false, undefined, this)
                        }, undefined, false, undefined, this)
                      }, undefined, false, undefined, this),
                      jsx("div", {
                        class: "w-fit h-fit",
                        onClick: this.close,
                        children: jsx(link_default, {
                          underline: false,
                          href: "#characters",
                          children: () => jsx("p", {
                            class: "text-light",
                            children: "\u642D\u8F09\u30AD\u30E3\u30E9\u30AF\u30BF\u30FC"
                          }, undefined, false, undefined, this)
                        }, undefined, false, undefined, this)
                      }, undefined, false, undefined, this),
                      jsx("div", {
                        class: "w-fit h-fit",
                        onClick: this.close,
                        children: jsx(link_default, {
                          underline: false,
                          href: "#license",
                          children: () => jsx("p", {
                            class: "text-light",
                            children: "\u5229\u7528\u898F\u7D04\u306B\u3064\u3044\u3066"
                          }, undefined, false, undefined, this)
                        }, undefined, false, undefined, this)
                      }, undefined, false, undefined, this),
                      jsx("div", {
                        class: "w-fit h-fit",
                        onClick: this.close,
                        children: jsx(link_default, {
                          underline: false,
                          href: "#privacy-policy",
                          children: () => jsx("p", {
                            class: "text-light",
                            children: "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC"
                          }, undefined, false, undefined, this)
                        }, undefined, false, undefined, this)
                      }, undefined, false, undefined, this),
                      jsx("div", {
                        class: "w-fit h-fit",
                        onClick: this.close,
                        children: jsx(link_default, {
                          underline: false,
                          href: "#third-party-license",
                          children: () => jsx("p", {
                            class: "text-light",
                            children: "\u30B5\u30FC\u30C9\u30D1\u30FC\u30C6\u30A3\u30FC\u30E9\u30A4\u30BB\u30F3\u30B9"
                          }, undefined, false, undefined, this)
                        }, undefined, false, undefined, this)
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this),
                  jsx("div", {
                    class: "flex flex-col gap-2",
                    children: [
                      jsx("p", {
                        class: "text-accent-light",
                        children: "Links"
                      }, undefined, false, undefined, this),
                      jsx(link_default, {
                        newTab: true,
                        underline: false,
                        href: "https://koharuyuzuki.github.io/poinotalk/latest/",
                        children: () => jsx("p", {
                          class: "text-light",
                          children: "\u30D6\u30E9\u30A6\u30B6\u3067\u4F7F\u3063\u3066\u307F\u308B"
                        }, undefined, false, undefined, this)
                      }, undefined, false, undefined, this),
                      jsx(link_default, {
                        newTab: true,
                        underline: false,
                        href: "https://github.com/KoharuYuzuki/PoinoTalk",
                        children: () => jsx("p", {
                          class: "text-light",
                          children: "GitHub"
                        }, undefined, false, undefined, this)
                      }, undefined, false, undefined, this),
                      jsx(link_default, {
                        newTab: true,
                        underline: false,
                        href: "https://twitter.com/KoharuYuzuki25",
                        children: () => jsx("p", {
                          class: "text-light",
                          children: "\u958B\u767A\u8005Twitter"
                        }, undefined, false, undefined, this)
                      }, undefined, false, undefined, this)
                    ]
                  }, undefined, true, undefined, this)
                ]
              }, undefined, true, undefined, this)
            }, undefined, false, undefined, this)
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    }, undefined, false, undefined, this);
  }
});

// src/components/footer.tsx
var footer_default = defineComponent({
  render() {
    return jsx("footer", {
      id: "footer",
      class: "w-full h-fit p-4 flex flex-col",
      children: jsx("div", {
        class: "h-12 rounded-2xl bg-accent flex justify-center items-center",
        children: jsx("p", {
          class: "text-light",
          children: "\xA9 2024 KoharuYuzuki"
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this)
    }, undefined, false, undefined, this);
  }
});

// src/components/cover.tsx
var cover_default = defineComponent({
  render() {
    return jsx("div", {
      id: "cover",
      class: "flex flex-col items-center gap-6 mt-16",
      children: [
        jsx("h1", {
          class: "text-5xl font-medium",
          children: "PoinoTalk"
        }, undefined, false, undefined, this),
        jsx("p", {
          class: "text-lg text-center break-keep",
          children: [
            "\u306A\u304B\u306E\u4EBA\u304C\u3044\u306A\u3044",
            jsx("wbr", {}, undefined, false, undefined, this),
            "\u30C6\u30AD\u30B9\u30C8\u8AAD\u307F\u4E0A\u3052\u30BD\u30D5\u30C8"
          ]
        }, undefined, true, undefined, this),
        jsx(link_default, {
          newTab: true,
          underline: false,
          href: "https://koharuyuzuki.github.io/poinotalk/latest/",
          children: () => jsx("div", {
            class: "w-fit h-fit bg-accent px-4 py-3 rounded-xl",
            children: jsx("p", {
              class: "text-main",
              children: "\u30D6\u30E9\u30A6\u30B6\u3067\u4F7F\u3063\u3066\u307F\u308B"
            }, undefined, false, undefined, this)
          }, undefined, false, undefined, this)
        }, undefined, false, undefined, this),
        jsx("img", {
          class: "w-full max-w-[800px] h-auto",
          src: "./assets/screenshot-1100x800.png",
          alt: "\u30B9\u30AF\u30EA\u30FC\u30F3\u30B7\u30E7\u30C3\u30C8"
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this);
  }
});

// src/components/about.tsx
var about_default = defineComponent({
  render() {
    return jsx("div", {
      id: "about",
      class: "flex flex-col items-center gap-6",
      children: [
        jsx("h2", {
          class: "text-3xl",
          children: "PoinoTalk\u3068\u306F"
        }, undefined, false, undefined, this),
        jsx("div", {
          class: "flex flex-col items-center gap-4",
          children: [
            jsx("p", {
              children: "PoinoTalk\u306F\u306A\u304B\u306E\u4EBA\u304C\u3044\u306A\u3044\u30C6\u30AD\u30B9\u30C8\u8AAD\u307F\u4E0A\u3052\u30BD\u30D5\u30C8\u3067\u3059\u3002"
            }, undefined, false, undefined, this),
            jsx("p", {
              children: "\u4E00\u822C\u7684\u306A\u97F3\u58F0\u5408\u6210\u30BD\u30D5\u30C8\u306F\u3001\u58F0\u512A\u3055\u3093\u306E\u58F0\u3092\u5143\u306B\u97F3\u58F0\u3092\u5408\u6210\u3057\u3066\u3044\u307E\u3059\u304C\u3001"
            }, undefined, false, undefined, this),
            jsx("p", {
              children: "PoinoTalk\u306F\u3042\u3089\u304B\u3058\u3081\u8A2D\u5B9A\u3055\u308C\u305F\u5468\u6CE2\u6570\u9818\u57DF\u306E\u30A8\u30F3\u30D9\u30ED\u30FC\u30D7\u304B\u3089\u3001"
            }, undefined, false, undefined, this),
            jsx("p", {
              children: "\u30D5\u30FC\u30EA\u30A8\u5909\u63DB\u306A\u3069\u3092\u7528\u3044\u3066\u30BD\u30FC\u30B9\u30FB\u30D5\u30A3\u30EB\u30BF\u30E2\u30C7\u30EB\u306B\u4F3C\u305F\u65B9\u6CD5\u3067\u97F3\u58F0\u3092\u5408\u6210\u3057\u3066\u3044\u307E\u3059\u3002"
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this),
        jsx("h3", {
          class: "text-2xl",
          children: "poino\u3068\u306E\u9055\u3044"
        }, undefined, false, undefined, this),
        jsx("div", {
          class: "flex flex-col items-center gap-4",
          children: [
            jsx("p", {
              children: "PoinoTalk\u306F\u30CB\u30E5\u30FC\u30E9\u30EB\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u3092\u4F7F\u7528\u3057\u305F\u97F3\u58F0\u5408\u6210\u30A8\u30F3\u30B8\u30F3\u3092\u642D\u8F09\u3057\u3066\u3044\u307E\u3059\u3002"
            }, undefined, false, undefined, this),
            jsx("p", {
              children: "\u305D\u306E\u305F\u3081\u3001poino\u3068\u6BD4\u8F03\u3057\u3066\u6ED1\u3089\u304B\u306A\u767A\u97F3\u304C\u3067\u304D\u308B\u3088\u3046\u306B\u306A\u308A\u307E\u3057\u305F\u3002"
            }, undefined, false, undefined, this),
            jsx("p", {
              children: "\u307E\u305F\u3001\u30C6\u30AD\u30B9\u30C8\u8AAD\u307F\u4E0A\u3052\u306B\u7279\u5316\u3057\u3001\u30D6\u30E9\u30A6\u30B6\u3067\u52D5\u4F5C\u3059\u308B\u3088\u3046\u306B\u306A\u3063\u305F\u305F\u3081\u3001"
            }, undefined, false, undefined, this),
            jsx("p", {
              children: "\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u4E0D\u8981\u3067\u3059\u3050\u306B\u4F7F\u3044\u59CB\u3081\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002"
            }, undefined, false, undefined, this),
            jsx("p", {
              children: "\u4ED6\u306B\u3082poino\u306B\u306F\u306A\u304B\u3063\u305F\u8F9E\u66F8\u3084\u30D7\u30EA\u30BB\u30C3\u30C8\u6A5F\u80FD\u3082\u642D\u8F09\u3057\u3066\u3044\u307E\u3059\u3002"
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this)
      ]
    }, undefined, true, undefined, this);
  }
});

// src/components/characters.tsx
var characters_default = defineComponent({
  render() {
    return jsx("div", {
      id: "characters",
      class: "flex flex-col items-center gap-6",
      children: [
        jsx("h2", {
          class: "text-3xl",
          children: "\u642D\u8F09\u30AD\u30E3\u30E9\u30AF\u30BF\u30FC"
        }, undefined, false, undefined, this),
        jsx("h3", {
          class: "text-2xl",
          children: "\u30EC\u30A4\u30C1\u30FC"
        }, undefined, false, undefined, this),
        jsx("img", {
          class: "w-4/5 max-w-[500px] h-auto",
          src: "./assets/laychie.png",
          alt: "\u30EC\u30A4\u30C1\u30FC"
        }, undefined, false, undefined, this),
        jsx("div", {
          class: "flex flex-col items-center gap-4",
          children: [
            jsx("p", {
              children: "\u642D\u8F09\u30AD\u30E3\u30E9\u30AF\u30BF\u30FC No.01\u3001\u30EC\u30A4\u30C1\u30FC\u3067\u3059\u3002"
            }, undefined, false, undefined, this),
            jsx("p", {
              children: "01 (\u308C\u3044\u30FB\u3044\u3061) \u306A\u306E\u3067\u30EC\u30A4\u30C1\u30FC\u3067\u3059\u3002"
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this),
        jsx("h3", {
          class: "text-2xl",
          children: "\u30EC\u30A4\u30CB\u30FC"
        }, undefined, false, undefined, this),
        jsx("img", {
          class: "w-4/5 max-w-[500px] h-auto",
          src: "./assets/layney.png",
          alt: "\u30EC\u30A4\u30CB\u30FC"
        }, undefined, false, undefined, this),
        jsx("div", {
          class: "flex flex-col items-center gap-4",
          children: [
            jsx("p", {
              children: "\u642D\u8F09\u30AD\u30E3\u30E9\u30AF\u30BF\u30FC No.02\u3001\u30EC\u30A4\u30CB\u30FC\u3067\u3059\u3002"
            }, undefined, false, undefined, this),
            jsx("p", {
              children: "\u30EC\u30A4\u30C1\u30FC\u306E\u59B9\u3067\u3059\u3002"
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this)
      ]
    }, undefined, true, undefined, this);
  }
});

// src/components/license.tsx
var license_default = defineComponent({
  render() {
    return jsx("div", {
      id: "license",
      class: "flex flex-col items-center gap-6",
      children: [
        jsx("h2", {
          class: "text-3xl",
          children: "\u5229\u7528\u898F\u7D04\u306B\u3064\u3044\u3066"
        }, undefined, false, undefined, this),
        jsx("div", {
          class: "flex flex-col items-center gap-4",
          children: [
            jsx("p", {
              children: "PoinoTalk\u306F\u7121\u6599\u3067\u3059\u304C\u3001\u30E9\u30A4\u30BB\u30F3\u30B9 (\u5229\u7528\u898F\u7D04) \u306B\u6CBF\u3063\u3066\u4F7F\u7528\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002"
            }, undefined, false, undefined, this),
            jsx("p", {
              children: "\u3054\u5229\u7528\u306E\u524D\u306B\u306F\u5FC5\u305APoinoTalk\u306E\u30E1\u30CB\u30E5\u30FC\u306E\u30D8\u30EB\u30D7\u304B\u3089\u30E9\u30A4\u30BB\u30F3\u30B9\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002"
            }, undefined, false, undefined, this),
            jsx("p", {
              children: [
                "\u307E\u305F\u3001\u4E0D\u660E\u306A\u70B9\u306B\u3064\u3044\u3066\u306F",
                jsx(link_default, {
                  newTab: true,
                  href: "https://github.com/KoharuYuzuki/PoinoTalkLicence?tab=readme-ov-file#qa",
                  children: () => "\u30E9\u30A4\u30BB\u30F3\u30B9Q&A"
                }, undefined, false, undefined, this),
                "\u3084",
                jsx(link_default, {
                  newTab: true,
                  href: "https://github.com/KoharuYuzuki/PoinoTalk/blob/main/Q&A.txt",
                  children: () => "PoinoTalk Q&A"
                }, undefined, false, undefined, this),
                "\u3092\u3054\u53C2\u7167\u304F\u3060\u3055\u3044\u3002"
              ]
            }, undefined, true, undefined, this)
          ]
        }, undefined, true, undefined, this)
      ]
    }, undefined, true, undefined, this);
  }
});

// src/components/privacy-policy.tsx
var privacy_policy_default = defineComponent({
  render() {
    return jsx("div", {
      id: "privacy-policy",
      class: "flex flex-col items-center gap-6",
      children: [
        jsx("h2", {
          class: "text-3xl",
          children: "\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC"
        }, undefined, false, undefined, this),
        jsx("div", {
          class: "flex flex-col gap-2",
          children: [
            jsx("p", {
              children: "\u5F53\u30B5\u30A4\u30C8\u3067\u306F\u3001Google\u306B\u3088\u308B\u30A2\u30AF\u30BB\u30B9\u89E3\u6790\u30C4\u30FC\u30EB\u300CGoogle\u30A2\u30CA\u30EA\u30C6\u30A3\u30AF\u30B9\u300D\u3092\u4F7F\u7528\u3057\u3066\u3044\u307E\u3059\u3002"
            }, undefined, false, undefined, this),
            jsx("p", {
              children: "\u3053\u306EGoogle\u30A2\u30CA\u30EA\u30C6\u30A3\u30AF\u30B9\u306F\u30C7\u30FC\u30BF\u306E\u53CE\u96C6\u306E\u305F\u3081\u306BCookie\u3092\u4F7F\u7528\u3057\u3066\u3044\u307E\u3059\u3002"
            }, undefined, false, undefined, this),
            jsx("p", {
              children: "\u3053\u306E\u30C7\u30FC\u30BF\u306F\u533F\u540D\u3067\u53CE\u96C6\u3055\u308C\u3066\u304A\u308A\u3001\u500B\u4EBA\u3092\u7279\u5B9A\u3059\u308B\u3082\u306E\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002"
            }, undefined, false, undefined, this),
            jsx("p", {
              children: "\u3053\u306E\u6A5F\u80FD\u306FCookie\u3092\u7121\u52B9\u306B\u3059\u308B\u3053\u3068\u3067\u53CE\u96C6\u3092\u62D2\u5426\u3059\u308B\u3053\u3068\u304C\u51FA\u6765\u307E\u3059\u306E\u3067\u3001\u304A\u4F7F\u3044\u306E\u30D6\u30E9\u30A6\u30B6\u306E\u8A2D\u5B9A\u3092\u3054\u78BA\u8A8D\u304F\u3060\u3055\u3044\u3002"
            }, undefined, false, undefined, this),
            jsx("p", {
              children: [
                "\u3053\u306E\u898F\u7D04\u306B\u95A2\u3057\u3066\u306E\u8A73\u7D30\u306F",
                jsx(link_default, {
                  newTab: true,
                  href: "https://marketingplatform.google.com/about/analytics/terms/jp/",
                  children: () => "Google\u30A2\u30CA\u30EA\u30C6\u30A3\u30AF\u30B9\u30B5\u30FC\u30D3\u30B9\u5229\u7528\u898F\u7D04"
                }, undefined, false, undefined, this),
                "\u306E\u30DA\u30FC\u30B8\u3084",
                jsx(link_default, {
                  newTab: true,
                  href: "https://policies.google.com/technologies/ads?hl=ja",
                  children: () => "Google\u30DD\u30EA\u30B7\u30FC\u3068\u898F\u7D04\u30DA\u30FC\u30B8"
                }, undefined, false, undefined, this),
                "\u3092\u3054\u89A7\u304F\u3060\u3055\u3044\u3002"
              ]
            }, undefined, true, undefined, this)
          ]
        }, undefined, true, undefined, this)
      ]
    }, undefined, true, undefined, this);
  }
});

// src/components/third-party-license.tsx
var third_party_license_default = defineComponent({
  data() {
    return {
      licenseText: `=== @vue/reactivity ===
=== @vue/runtime-core ===
=== @vue/runtime-dom ===
=== @vue/shared ===
=== vue ===

The MIT License (MIT)

Copyright (c) 2018-present, Yuxi (Evan) You and Vue contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

=== tailwindcss ===

MIT License

Copyright (c) Tailwind Labs, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

=== Zen Maru Gothic ===

Open Font License
Designed by Yoshimichi Ohira
`,
      isOpen: false
    };
  },
  render() {
    return jsx("div", {
      id: "third-party-license",
      class: "flex flex-col items-center gap-6",
      children: [
        jsx("h2", {
          class: "text-3xl",
          children: "\u30B5\u30FC\u30C9\u30D1\u30FC\u30C6\u30A3\u30FC\u30E9\u30A4\u30BB\u30F3\u30B9"
        }, undefined, false, undefined, this),
        jsx("div", {
          class: "flex flex-col items-center gap-4",
          children: [
            jsx("p", {
              children: "\u5F53\u30B5\u30A4\u30C8\u3067\u306F\u3001\u4EE5\u4E0B\u306E\u30DE\u30C6\u30EA\u30A2\u30EB\u3092\u5229\u7528\u3057\u3066\u3044\u307E\u3059\u3002"
            }, undefined, false, undefined, this),
            jsx("button", {
              class: "w-fit h-fit px-4 py-2 bg-accent rounded-lg",
              onClick: () => this.isOpen = !this.isOpen,
              children: jsx("p", {
                class: "text-light",
                children: [
                  "\u30B5\u30FC\u30C9\u30D1\u30FC\u30C6\u30A3\u30FC\u30E9\u30A4\u30BB\u30F3\u30B9\u4E00\u89A7\u3092",
                  this.isOpen ? "\u9589\u3058\u308B" : "\u958B\u304F"
                ]
              }, undefined, true, undefined, this)
            }, undefined, false, undefined, this),
            this.isOpen ? jsx("div", {
              class: "w-fit h-fit flex flex-col gap-2 txt-sm",
              children: this.licenseText.split("\n").map((line) => jsx("p", {
                children: line
              }, undefined, false, undefined, this))
            }, undefined, false, undefined, this) : jsx(Fragment, {}, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this)
      ]
    }, undefined, true, undefined, this);
  }
});

// src/app.tsx
var component = defineComponent({
  render() {
    return jsx(Fragment, {
      children: [
        jsx(header_default, {}, undefined, false, undefined, this),
        jsx("main", {
          class: `
          w-[calc(100%-2rem)] h-fit max-w-[1000px] min-h-[calc(100dvh-10rem)] mx-auto mt-[5rem] mb-[4rem]
          flex flex-col justify-between gap-16 [&>*]:scroll-mt-[8rem]
        `,
          children: [
            jsx(cover_default, {}, undefined, false, undefined, this),
            jsx(about_default, {}, undefined, false, undefined, this),
            jsx(characters_default, {}, undefined, false, undefined, this),
            jsx(license_default, {}, undefined, false, undefined, this),
            jsx(privacy_policy_default, {}, undefined, false, undefined, this),
            jsx(third_party_license_default, {}, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this),
        jsx(footer_default, {}, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this);
  },
  mounted() {
    if (isFirefox()) {
      document.body.classList.add("is-firefox");
    }
  }
});
var app = createApp(component);
app.mount("#app");
