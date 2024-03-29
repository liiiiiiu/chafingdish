module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1678787898027, function(require, module, exports) {
class Check {
  constructor() {
    this.objProto = Object.prototype;
    this.fnToString = this.objProto.toString;
  }
  getTag(value) {
    if (value == null) {
      return value === void 0 ? "[object Undefined]" : "[object Null]";
    }
    return this.fnToString.call(value);
  }
  str(value) {
    return typeof value === "string" || typeof value === "object" && !this.nul(value) && this.getTag(value) === "[object String]";
  }
  num(value) {
    return typeof value === "number" || typeof value === "object" && !this.nul(value) && this.getTag(value) === "[object Number]";
  }
  bool(value) {
    return value === true || value === false || typeof value === "object" && !this.nul(value) && this.getTag(value) === "[object Boolean]";
  }
  arr(value) {
    return Array.isArray(value);
  }
  arrLike(value) {
    return !this.nul(value) && !this.fun(value) && this.len(value.length);
  }
  obj(value) {
    return typeof value === "object";
  }
  plainObj(value) {
    return typeof value === "object" && !this.nul(value) && this.getTag(value) === "[object Object]";
  }
  objLike(value) {
    return typeof value === "object" && !this.nul(value);
  }
  symbol(value) {
    return typeof value === "symbol";
  }
  fun(value) {
    return typeof value === "function";
  }
  nan(value) {
    return value !== value;
  }
  undef(value) {
    return typeof value === "undefined";
  }
  nul(value) {
    return value === null;
  }
  len(value) {
    return typeof value === "number" && value > -1 && value % 1 === 0 && value < Number.MAX_SAFE_INTEGER;
  }
  args(value) {
    return this.objLike(value) && this.getTag(value) === "[object Arguments]";
  }
  err(value) {
    if (!this.objLike(value)) {
      return false;
    }
    const tag = this.getTag(value);
    return tag == "[object Error]" || tag == "[object DOMException]" || typeof value.message === "string" && typeof value.name === "string" && !this.plainObj(value);
  }
  exception(handle) {
    try {
      return handle && this.fun(handle) && handle();
    } catch (error) {
    }
  }
}
const check$8 = new Check();
const rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
class Cast {
  unwrap(value) {
    if (typeof value === "string") {
      if (value === +value + "") {
        return +value;
      }
      if (value === "true") {
        return true;
      }
      if (value === "false") {
        return false;
      }
      if (value === "null") {
        return null;
      }
      if (rbrace.test(value)) {
        try {
          return JSON.parse(value);
        } catch (error) {
        }
      }
    }
    return value;
  }
  str(value) {
    if (check$8.symbol(value)) {
      value = value.description || "";
    }
    return (value + "").toString() + "";
  }
  num(value) {
    let newValue = +this.unwrap(value);
    return !check$8.nan(newValue) ? newValue : 0;
  }
  bool(value) {
    return !!value;
  }
  arr(value) {
    if (check$8.arr(value)) {
      return value;
    }
    if (check$8.str(value) && value.indexOf(",") > -1) {
      return value.split(",");
    }
    return [value];
  }
  symbol(value) {
    let newValue = "";
    if (!check$8.str(value) || !check$8.num(value)) {
      newValue = this.str(value);
    }
    return Symbol(newValue || value + "");
  }
  undef() {
    return void 0;
  }
  nul() {
    return null;
  }
}
const check$7 = new Check();
const cast$2 = new Cast();
function forEach(obj, fn) {
  if (check$7.nul(obj) || check$7.undef(obj))
    return;
  if (!check$7.obj(obj)) {
    obj = cast$2.arr(obj);
  }
  if (check$7.arr(obj)) {
    for (let i = 0; i < obj.length; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
const check$6 = new Check();
const cast$1 = new Cast();
function findByIndex(target, index) {
  return Reflect.get(target, +index < 0 ? target.length + +index + "" : index);
}
function findByDist(target, dist) {
  let lists;
  let len = target.length;
  if ((lists = dist.split(":")).length > 1) {
    let start = 0, end = 0, step = 0;
    start = +(lists[0] && lists[0].trim()) || 0;
    end = +(lists[1] && lists[1].trim()) || len;
    step = +(lists[2] && lists[2].trim()) || 1;
    start = +start;
    end = +end;
    if (start < 0) {
      start = len + start;
    }
    if (end < 0) {
      end = len + end;
    }
    if (start > len - 1) {
      start = len;
    }
    if (end > len - 1) {
      end = len;
    }
    if (start > end) {
      [start, end] = [end, start];
    }
    let reverse = false;
    if (step < 0) {
      step = -step;
      reverse = true;
    }
    let i = start;
    let result = [];
    while (i < end) {
      result.push(findByIndex(target, i));
      i += step;
    }
    if (reverse) {
      let left = 0;
      let right = result.length - 1;
      while (left < right) {
        [result[left], result[right]] = [result[right], result[left]];
        left += 1;
        right -= 1;
      }
    }
    return result;
  }
}
function batchRemove(target) {
  let argLists = [];
  return function(...args) {
    let indexes = /* @__PURE__ */ new Set();
    for (let i = 0; i < args.length; i++) {
      argLists.push(args[i]);
    }
    forEach(argLists, function iteratee(indexOrFn) {
      if (check$6.num(indexOrFn) || indexOrFn === +indexOrFn + "") {
        if (+indexOrFn < 0) {
          indexOrFn = target.length + +indexOrFn;
        }
        indexOrFn = +indexOrFn;
        if (!indexes.has(indexOrFn)) {
          indexes.add(indexOrFn);
        }
      } else if (check$6.fun(indexOrFn)) {
        let fn = indexOrFn;
        forEach(target, function(val, idx) {
          if (!indexes.has(idx) && !!fn(val)) {
            indexes.add(idx);
          }
        });
      }
    });
    const temp = [];
    forEach(target, function iteratee(val, idx) {
      if (!indexes.has(idx)) {
        temp.push(val);
      }
    });
    return temp;
  };
}
function arrayShuffle([...result]) {
  let m = result.length;
  while (m) {
    let n = Math.floor(Math.random() * m--);
    [result[m], result[n]] = [result[n], result[m]];
  }
  return result;
}
function arrayNest(target) {
  return function nest(id = null, link = "parent_id") {
    const arr = target.filter((_) => Object.prototype.hasOwnProperty.call(_, "id") && Object.prototype.hasOwnProperty.call(_, link));
    return arr.filter((_) => _[link] == id).map((_) => ({ ..._, children: nest(_.id) }));
  };
}
function wow_array$1(value) {
  if (check$6.undef(value) || !check$6.arr(value)) {
    value = cast$1.arr(value);
  }
  const hander = {
    get: function(target, key) {
      if (key === +key + "") {
        return findByIndex(target, key);
      }
      if (key === "first") {
        return findByIndex(target, 0);
      }
      if (key === "last") {
        return findByIndex(target, -1);
      }
      if (key.split(":").length > 1) {
        return findByDist(target, key + "");
      }
      if (key === "min") {
        return Math.min.apply(Math, target);
      }
      if (key === "max") {
        return Math.max.apply(Math, target);
      }
      if (key === "remove") {
        return batchRemove(target);
      }
      if (key === "shuffle") {
        return arrayShuffle(target);
      }
      if (key === "nest") {
        return arrayNest(target);
      }
      return Reflect.get(target, key);
    }
  };
  return new Proxy(value, hander);
}
var wow = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  wow_array: wow_array$1
}, Symbol.toStringTag, { value: "Module" }));
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var dayjs_min = { exports: {} };
(function(module, exports) {
  !function(t, e) {
    module.exports = e();
  }(commonjsGlobal, function() {
    var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h = "quarter", c = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
      var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
      return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
    } }, m = function(t2, e2, n2) {
      var r2 = String(t2);
      return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
    }, v = { s: m, z: function(t2) {
      var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
      return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
    }, m: function t2(e2, n2) {
      if (e2.date() < n2.date())
        return -t2(n2, e2);
      var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, f), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), f);
      return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
    }, a: function(t2) {
      return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
    }, p: function(t2) {
      return { M: f, y: c, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: h }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t2) {
      return t2 === void 0;
    } }, g = "en", D = {};
    D[g] = M;
    var p = function(t2) {
      return t2 instanceof _;
    }, S = function t2(e2, n2, r2) {
      var i2;
      if (!e2)
        return g;
      if (typeof e2 == "string") {
        var s2 = e2.toLowerCase();
        D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
        var u2 = e2.split("-");
        if (!i2 && u2.length > 1)
          return t2(u2[0]);
      } else {
        var a2 = e2.name;
        D[a2] = e2, i2 = a2;
      }
      return !r2 && i2 && (g = i2), i2 || !r2 && g;
    }, w = function(t2, e2) {
      if (p(t2))
        return t2.clone();
      var n2 = typeof e2 == "object" ? e2 : {};
      return n2.date = t2, n2.args = arguments, new _(n2);
    }, O = v;
    O.l = S, O.i = p, O.w = function(t2, e2) {
      return w(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
    };
    var _ = function() {
      function M2(t2) {
        this.$L = S(t2.locale, null, true), this.parse(t2);
      }
      var m2 = M2.prototype;
      return m2.parse = function(t2) {
        this.$d = function(t3) {
          var e2 = t3.date, n2 = t3.utc;
          if (e2 === null)
            return new Date(NaN);
          if (O.u(e2))
            return new Date();
          if (e2 instanceof Date)
            return new Date(e2);
          if (typeof e2 == "string" && !/Z$/i.test(e2)) {
            var r2 = e2.match($);
            if (r2) {
              var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
              return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
            }
          }
          return new Date(e2);
        }(t2), this.$x = t2.x || {}, this.init();
      }, m2.init = function() {
        var t2 = this.$d;
        this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
      }, m2.$utils = function() {
        return O;
      }, m2.isValid = function() {
        return !(this.$d.toString() === l);
      }, m2.isSame = function(t2, e2) {
        var n2 = w(t2);
        return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
      }, m2.isAfter = function(t2, e2) {
        return w(t2) < this.startOf(e2);
      }, m2.isBefore = function(t2, e2) {
        return this.endOf(e2) < w(t2);
      }, m2.$g = function(t2, e2, n2) {
        return O.u(t2) ? this[e2] : this.set(n2, t2);
      }, m2.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, m2.valueOf = function() {
        return this.$d.getTime();
      }, m2.startOf = function(t2, e2) {
        var n2 = this, r2 = !!O.u(e2) || e2, h2 = O.p(t2), l2 = function(t3, e3) {
          var i2 = O.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
          return r2 ? i2 : i2.endOf(a);
        }, $2 = function(t3, e3) {
          return O.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
        }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
        switch (h2) {
          case c:
            return r2 ? l2(1, 0) : l2(31, 11);
          case f:
            return r2 ? l2(1, M3) : l2(0, M3 + 1);
          case o:
            var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
            return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
          case a:
          case d:
            return $2(v2 + "Hours", 0);
          case u:
            return $2(v2 + "Minutes", 1);
          case s:
            return $2(v2 + "Seconds", 2);
          case i:
            return $2(v2 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m2.endOf = function(t2) {
        return this.startOf(t2, false);
      }, m2.$set = function(t2, e2) {
        var n2, o2 = O.p(t2), h2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = h2 + "Date", n2[d] = h2 + "Date", n2[f] = h2 + "Month", n2[c] = h2 + "FullYear", n2[u] = h2 + "Hours", n2[s] = h2 + "Minutes", n2[i] = h2 + "Seconds", n2[r] = h2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
        if (o2 === f || o2 === c) {
          var y2 = this.clone().set(d, 1);
          y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
        } else
          l2 && this.$d[l2]($2);
        return this.init(), this;
      }, m2.set = function(t2, e2) {
        return this.clone().$set(t2, e2);
      }, m2.get = function(t2) {
        return this[O.p(t2)]();
      }, m2.add = function(r2, h2) {
        var d2, l2 = this;
        r2 = Number(r2);
        var $2 = O.p(h2), y2 = function(t2) {
          var e2 = w(l2);
          return O.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
        };
        if ($2 === f)
          return this.set(f, this.$M + r2);
        if ($2 === c)
          return this.set(c, this.$y + r2);
        if ($2 === a)
          return y2(1);
        if ($2 === o)
          return y2(7);
        var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
        return O.w(m3, this);
      }, m2.subtract = function(t2, e2) {
        return this.add(-1 * t2, e2);
      }, m2.format = function(t2) {
        var e2 = this, n2 = this.$locale();
        if (!this.isValid())
          return n2.invalidDate || l;
        var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = O.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, f2 = n2.months, h2 = function(t3, n3, i3, s3) {
          return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
        }, c2 = function(t3) {
          return O.s(s2 % 12 || 12, t3, "0");
        }, d2 = n2.meridiem || function(t3, e3, n3) {
          var r3 = t3 < 12 ? "AM" : "PM";
          return n3 ? r3.toLowerCase() : r3;
        }, $2 = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: a2 + 1, MM: O.s(a2 + 1, 2, "0"), MMM: h2(n2.monthsShort, a2, f2, 3), MMMM: h2(f2, a2), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: h2(n2.weekdaysMin, this.$W, o2, 2), ddd: h2(n2.weekdaysShort, this.$W, o2, 3), dddd: o2[this.$W], H: String(s2), HH: O.s(s2, 2, "0"), h: c2(1), hh: c2(2), a: d2(s2, u2, true), A: d2(s2, u2, false), m: String(u2), mm: O.s(u2, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: i2 };
        return r2.replace(y, function(t3, e3) {
          return e3 || $2[t3] || i2.replace(":", "");
        });
      }, m2.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m2.diff = function(r2, d2, l2) {
        var $2, y2 = O.p(d2), M3 = w(r2), m3 = (M3.utcOffset() - this.utcOffset()) * e, v2 = this - M3, g2 = O.m(this, M3);
        return g2 = ($2 = {}, $2[c] = g2 / 12, $2[f] = g2, $2[h] = g2 / 3, $2[o] = (v2 - m3) / 6048e5, $2[a] = (v2 - m3) / 864e5, $2[u] = v2 / n, $2[s] = v2 / e, $2[i] = v2 / t, $2)[y2] || v2, l2 ? g2 : O.a(g2);
      }, m2.daysInMonth = function() {
        return this.endOf(f).$D;
      }, m2.$locale = function() {
        return D[this.$L];
      }, m2.locale = function(t2, e2) {
        if (!t2)
          return this.$L;
        var n2 = this.clone(), r2 = S(t2, e2, true);
        return r2 && (n2.$L = r2), n2;
      }, m2.clone = function() {
        return O.w(this.$d, this);
      }, m2.toDate = function() {
        return new Date(this.valueOf());
      }, m2.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m2.toISOString = function() {
        return this.$d.toISOString();
      }, m2.toString = function() {
        return this.$d.toUTCString();
      }, M2;
    }(), T = _.prototype;
    return w.prototype = T, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", f], ["$y", c], ["$D", d]].forEach(function(t2) {
      T[t2[1]] = function(e2) {
        return this.$g(e2, t2[0], t2[1]);
      };
    }), w.extend = function(t2, e2) {
      return t2.$i || (t2(e2, _, w), t2.$i = true), w;
    }, w.locale = S, w.isDayjs = p, w.unix = function(t2) {
      return w(1e3 * t2);
    }, w.en = D[g], w.Ls = D, w.p = {}, w;
  });
})(dayjs_min);
var dayjs = dayjs_min.exports;
const check$5 = new Check();
const rint = /^-?\d+$/;
const rposInt = /^\d+$/;
const rdecimal = /^(-?\d+)([.]\d+){1}$/;
const rposDecimal = /^\d+([.]\d+){1}$/;
const rmobilephone = /^1[3456789][0-9]{9}$/;
const remail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
const rurl = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/;
const rcnIdCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
function is_string$1(value) {
  return check$5.str(value);
}
function is_number$1(value) {
  return check$5.num(value);
}
function is_integer$1(value) {
  return check$5.num(value) && rint.test(value + "");
}
function is_positive_integer$1(value) {
  return check$5.num(value) && rposInt.test(value + "");
}
function is_float$1(value) {
  return check$5.num(value) && rdecimal.test(value + "");
}
function is_positive_float$1(value) {
  return check$5.num(value) && rposDecimal.test(value + "");
}
function is_boolean$1(value) {
  return check$5.bool(value);
}
function is_array$1(value) {
  return check$5.arr(value);
}
function is_array_like$1(value) {
  return check$5.arrLike(value);
}
function is_object$1(value) {
  return check$5.obj(value);
}
function is_plain_object$1(value) {
  return check$5.plainObj(value);
}
function is_object_like$1(value) {
  return check$5.objLike(value);
}
function is_symbol$1(value) {
  return check$5.symbol(value);
}
function is_function$1(value) {
  return check$5.fun(value);
}
function is_NaN$1(value) {
  return check$5.nan(value);
}
function is_undefined$1(value) {
  return check$5.undef(value);
}
function is_null$1(value) {
  return check$5.nul(value);
}
function is_length$1(value) {
  return check$5.len(value);
}
function is_arguments$1(value) {
  return check$5.args(value);
}
function is_error$1(value) {
  return check$5.err(value);
}
function is_leap_year$1(value) {
  if (!check$5.num(value)) {
    return false;
  }
  return value % 4 === 0 && value % 100 !== 0 || value % 400 === 0;
}
function is_email$1(value) {
  if (!check$5.str(value)) {
    return false;
  }
  return remail.test(value + "");
}
function is_url$1(value) {
  if (!check$5.str(value)) {
    return false;
  }
  return rurl.test(value + "");
}
function is_cn_phone_number$1(value) {
  return rmobilephone.test(value + "");
}
function is_cn_id_card$1(value) {
  return rcnIdCard.test(value + "");
}
function is_falsy$1(value) {
  return [false, "", 0, -0, void 0, null, NaN].includes(value);
}
function is_today$1(value) {
  try {
    return dayjs().format("YYYY-MM-DD") === dayjs(value).format("YYYY-MM-DD");
  } catch (error) {
    return false;
  }
}
function is_today_before$1(value) {
  try {
    return dayjs(dayjs(value).format("YYYY-MM-DD")).diff(dayjs().format("YYYY-MM-DD"), "day") < 0;
  } catch (error) {
    return false;
  }
}
function is_today_after$1(value) {
  try {
    return dayjs(dayjs(value).format("YYYY-MM-DD")).diff(dayjs().format("YYYY-MM-DD"), "day") > 0;
  } catch (error) {
    return false;
  }
}
function is_equal$1(value1, value2, strict = true) {
  let isEqual = true;
  const equal = (val1, val2) => {
    if (!isEqual)
      return;
    if (check$5.arr(val1) && check$5.arr(val2)) {
      if (val1.length !== val2.length) {
        isEqual = false;
        return;
      }
      for (let i = 0; i < val1.length; i++) {
        equal(val1[i], val2[i]);
      }
    } else if (check$5.plainObj(val1) && check$5.plainObj(val2)) {
      const keys1 = Object.keys(val1);
      const keys2 = Object.keys(val2);
      if (keys1.length !== keys2.length) {
        isEqual = false;
        return;
      }
      for (let i = 0; i < keys1.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(val2, keys1[i])) {
          isEqual = false;
          return;
        }
        equal(val1[keys1[i]], val2[keys1[i]]);
      }
    } else {
      isEqual = strict ? val1 === val2 : val1 == val2;
    }
  };
  equal(value1, value2);
  return isEqual;
}
var is = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  is_string: is_string$1,
  is_number: is_number$1,
  is_integer: is_integer$1,
  is_positive_integer: is_positive_integer$1,
  is_float: is_float$1,
  is_positive_float: is_positive_float$1,
  is_boolean: is_boolean$1,
  is_array: is_array$1,
  is_array_like: is_array_like$1,
  is_object: is_object$1,
  is_plain_object: is_plain_object$1,
  is_object_like: is_object_like$1,
  is_symbol: is_symbol$1,
  is_function: is_function$1,
  is_NaN: is_NaN$1,
  is_undefined: is_undefined$1,
  is_null: is_null$1,
  is_length: is_length$1,
  is_arguments: is_arguments$1,
  is_error: is_error$1,
  is_leap_year: is_leap_year$1,
  is_email: is_email$1,
  is_url: is_url$1,
  is_cn_phone_number: is_cn_phone_number$1,
  is_cn_id_card: is_cn_id_card$1,
  is_falsy: is_falsy$1,
  is_today: is_today$1,
  is_today_before: is_today_before$1,
  is_today_after: is_today_after$1,
  is_equal: is_equal$1
}, Symbol.toStringTag, { value: "Module" }));
const strChineseFirstPY = "YDYQSXMWZSSXJBYMGCCZQPSSQBYCDSCDQLDYLYBSSJGYZZJJFKCCLZDHWDWZJLJPFYYNWJJTMYHZWZHFLZPPQHGSCYYYNJQYXXGJHHSDSJNKKTMOMLCRXYPSNQSECCQZGGLLYJLMYZZSECYKYYHQWJSSGGYXYZYJWWKDJHYCHMYXJTLXJYQBYXZLDWRDJRWYSRLDZJPCBZJJBRCFTLECZSTZFXXZHTRQHYBDLYCZSSYMMRFMYQZPWWJJYFCRWFDFZQPYDDWYXKYJAWJFFXYPSFTZYHHYZYSWCJYXSCLCXXWZZXNBGNNXBXLZSZSBSGPYSYZDHMDZBQBZCWDZZYYTZHBTSYYBZGNTNXQYWQSKBPHHLXGYBFMJEBJHHGQTJCYSXSTKZHLYCKGLYSMZXYALMELDCCXGZYRJXSDLTYZCQKCNNJWHJTZZCQLJSTSTBNXBTYXCEQXGKWJYFLZQLYHYXSPSFXLMPBYSXXXYDJCZYLLLSJXFHJXPJBTFFYABYXBHZZBJYZLWLCZGGBTSSMDTJZXPTHYQTGLJSCQFZKJZJQNLZWLSLHDZBWJNCJZYZSQQYCQYRZCJJWYBRTWPYFTWEXCSKDZCTBZHYZZYYJXZCFFZZMJYXXSDZZOTTBZLQWFCKSZSXFYRLNYJMBDTHJXSQQCCSBXYYTSYFBXDZTGBCNSLCYZZPSAZYZZSCJCSHZQYDXLBPJLLMQXTYDZXSQJTZPXLCGLQTZWJBHCTSYJSFXYEJJTLBGXSXJMYJQQPFZASYJNTYDJXKJCDJSZCBARTDCLYJQMWNQNCLLLKBYBZZSYHQQLTWLCCXTXLLZNTYLNEWYZYXCZXXGRKRMTCNDNJTSYYSSDQDGHSDBJGHRWRQLYBGLXHLGTGXBQJDZPYJSJYJCTMRNYMGRZJCZGJMZMGXMPRYXKJNYMSGMZJYMKMFXMLDTGFBHCJHKYLPFMDXLQJJSMTQGZSJLQDLDGJYCALCMZCSDJLLNXDJFFFFJCZFMZFFPFKHKGDPSXKTACJDHHZDDCRRCFQYJKQCCWJDXHWJLYLLZGCFCQDSMLZPBJJPLSBCJGGDCKKDEZSQCCKJGCGKDJTJDLZYCXKLQSCGJCLTFPCQCZGWPJDQYZJJBYJHSJDZWGFSJGZKQCCZLLPSPKJGQJHZZLJPLGJGJJTHJJYJZCZMLZLYQBGJWMLJKXZDZNJQSYZMLJLLJKYWXMKJLHSKJGBMCLYYMKXJQLBMLLKMDXXKWYXYSLMLPSJQQJQXYXFJTJDXMXXLLCXQBSYJBGWYMBGGBCYXPJYGPEPFGDJGBHBNSQJYZJKJKHXQFGQZKFHYGKHDKLLSDJQXPQYKYBNQSXQNSZSWHBSXWHXWBZZXDMNSJBSBKBBZKLYLXGWXDRWYQZMYWSJQLCJXXJXKJEQXSCYETLZHLYYYSDZPAQYZCMTLSHTZCFYZYXYLJSDCJQAGYSLCQLYYYSHMRQQKLDXZSCSSSYDYCJYSFSJBFRSSZQSBXXPXJYSDRCKGJLGDKZJZBDKTCSYQPYHSTCLDJDHMXMCGXYZHJDDTMHLTXZXYLYMOHYJCLTYFBQQXPFBDFHHTKSQHZYYWCNXXCRWHOWGYJLEGWDQCWGFJYCSNTMYTOLBYGWQWESJPWNMLRYDZSZTXYQPZGCWXHNGPYXSHMYQJXZTDPPBFYHZHTJYFDZWKGKZBLDNTSXHQEEGZZYLZMMZYJZGXZXKHKSTXNXXWYLYAPSTHXDWHZYMPXAGKYDXBHNHXKDPJNMYHYLPMGOCSLNZHKXXLPZZLBMLSFBHHGYGYYGGBHSCYAQTYWLXTZQCEZYDQDQMMHTKLLSZHLSJZWFYHQSWSCWLQAZYNYTLSXTHAZNKZZSZZLAXXZWWCTGQQTDDYZTCCHYQZFLXPSLZYGPZSZNGLNDQTBDLXGTCTAJDKYWNSYZLJHHZZCWNYYZYWMHYCHHYXHJKZWSXHZYXLYSKQYSPSLYZWMYPPKBYGLKZHTYXAXQSYSHXASMCHKDSCRSWJPWXSGZJLWWSCHSJHSQNHCSEGNDAQTBAALZZMSSTDQJCJKTSCJAXPLGGXHHGXXZCXPDMMHLDGTYBYSJMXHMRCPXXJZCKZXSHMLQXXTTHXWZFKHCCZDYTCJYXQHLXDHYPJQXYLSYYDZOZJNYXQEZYSQYAYXWYPDGXDDXSPPYZNDLTWRHXYDXZZJHTCXMCZLHPYYYYMHZLLHNXMYLLLMDCPPXHMXDKYCYRDLTXJCHHZZXZLCCLYLNZSHZJZZLNNRLWHYQSNJHXYNTTTKYJPYCHHYEGKCTTWLGQRLGGTGTYGYHPYHYLQYQGCWYQKPYYYTTTTLHYHLLTYTTSPLKYZXGZWGPYDSSZZDQXSKCQNMJJZZBXYQMJRTFFBTKHZKBXLJJKDXJTLBWFZPPTKQTZTGPDGNTPJYFALQMKGXBDCLZFHZCLLLLADPMXDJHLCCLGYHDZFGYDDGCYYFGYDXKSSEBDHYKDKDKHNAXXYBPBYYHXZQGAFFQYJXDMLJCSQZLLPCHBSXGJYNDYBYQSPZWJLZKSDDTACTBXZDYZYPJZQSJNKKTKNJDJGYYPGTLFYQKASDNTCYHBLWDZHBBYDWJRYGKZYHEYYFJMSDTYFZJJHGCXPLXHLDWXXJKYTCYKSSSMTWCTTQZLPBSZDZWZXGZAGYKTYWXLHLSPBCLLOQMMZSSLCMBJCSZZKYDCZJGQQDSMCYTZQQLWZQZXSSFPTTFQMDDZDSHDTDWFHTDYZJYQJQKYPBDJYYXTLJHDRQXXXHAYDHRJLKLYTWHLLRLLRCXYLBWSRSZZSYMKZZHHKYHXKSMDSYDYCJPBZBSQLFCXXXNXKXWYWSDZYQOGGQMMYHCDZTTFJYYBGSTTTYBYKJDHKYXBELHTYPJQNFXFDYKZHQKZBYJTZBXHFDXKDASWTAWAJLDYJSFHBLDNNTNQJTJNCHXFJSRFWHZFMDRYJYJWZPDJKZYJYMPCYZNYNXFBYTFYFWYGDBNZZZDNYTXZEMMQBSQEHXFZMBMFLZZSRXYMJGSXWZJSPRYDJSJGXHJJGLJJYNZZJXHGXKYMLPYYYCXYTWQZSWHWLYRJLPXSLSXMFSWWKLCTNXNYNPSJSZHDZEPTXMYYWXYYSYWLXJQZQXZDCLEEELMCPJPCLWBXSQHFWWTFFJTNQJHJQDXHWLBYZNFJLALKYYJLDXHHYCSTYYWNRJYXYWTRMDRQHWQCMFJDYZMHMYYXJWMYZQZXTLMRSPWWCHAQBXYGZYPXYYRRCLMPYMGKSJSZYSRMYJSNXTPLNBAPPYPYLXYYZKYNLDZYJZCZNNLMZHHARQMPGWQTZMXXMLLHGDZXYHXKYXYCJMFFYYHJFSBSSQLXXNDYCANNMTCJCYPRRNYTYQNYYMBMSXNDLYLYSLJRLXYSXQMLLYZLZJJJKYZZCSFBZXXMSTBJGNXYZHLXNMCWSCYZYFZLXBRNNNYLBNRTGZQYSATSWRYHYJZMZDHZGZDWYBSSCSKXSYHYTXXGCQGXZZSHYXJSCRHMKKBXCZJYJYMKQHZJFNBHMQHYSNJNZYBKNQMCLGQHWLZNZSWXKHLJHYYBQLBFCDSXDLDSPFZPSKJYZWZXZDDXJSMMEGJSCSSMGCLXXKYYYLNYPWWWGYDKZJGGGZGGSYCKNJWNJPCXBJJTQTJWDSSPJXZXNZXUMELPXFSXTLLXCLJXJJLJZXCTPSWXLYDHLYQRWHSYCSQYYBYAYWJJJQFWQCQQCJQGXALDBZZYJGKGXPLTZYFXJLTPADKYQHPMATLCPDCKBMTXYBHKLENXDLEEGQDYMSAWHZMLJTWYGXLYQZLJEEYYBQQFFNLYXRDSCTGJGXYYNKLLYQKCCTLHJLQMKKZGCYYGLLLJDZGYDHZWXPYSJBZKDZGYZZHYWYFQYTYZSZYEZZLYMHJJHTSMQWYZLKYYWZCSRKQYTLTDXWCTYJKLWSQZWBDCQYNCJSRSZJLKCDCDTLZZZACQQZZDDXYPLXZBQJYLZLLLQDDZQJYJYJZYXNYYYNYJXKXDAZWYRDLJYYYRJLXLLDYXJCYWYWNQCCLDDNYYYNYCKCZHXXCCLGZQJGKWPPCQQJYSBZZXYJSQPXJPZBSBDSFNSFPZXHDWZTDWPPTFLZZBZDMYYPQJRSDZSQZSQXBDGCPZSWDWCSQZGMDHZXMWWFYBPDGPHTMJTHZSMMBGZMBZJCFZWFZBBZMQCFMBDMCJXLGPNJBBXGYHYYJGPTZGZMQBQTCGYXJXLWZKYDPDYMGCFTPFXYZTZXDZXTGKMTYBBCLBJASKYTSSQYYMSZXFJEWLXLLSZBQJJJAKLYLXLYCCTSXMCWFKKKBSXLLLLJYXTYLTJYYTDPJHNHNNKBYQNFQYYZBYYESSESSGDYHFHWTCJBSDZZTFDMXHCNJZYMQWSRYJDZJQPDQBBSTJGGFBKJBXTGQHNGWJXJGDLLTHZHHYYYYYYSXWTYYYCCBDBPYPZYCCZYJPZYWCBDLFWZCWJDXXHYHLHWZZXJTCZLCDPXUJCZZZLYXJJTXPHFXWPYWXZPTDZZBDZCYHJHMLXBQXSBYLRDTGJRRCTTTHYTCZWMXFYTWWZCWJWXJYWCSKYBZSCCTZQNHXNWXXKHKFHTSWOCCJYBCMPZZYKBNNZPBZHHZDLSYDDYTYFJPXYNGFXBYQXCBHXCPSXTYZDMKYSNXSXLHKMZXLYHDHKWHXXSSKQYHHCJYXGLHZXCSNHEKDTGZXQYPKDHEXTYKCNYMYYYPKQYYYKXZLTHJQTBYQHXBMYHSQCKWWYLLHCYYLNNEQXQWMCFBDCCMLJGGXDQKTLXKGNQCDGZJWYJJLYHHQTTTNWCHMXCXWHWSZJYDJCCDBQCDGDNYXZTHCQRXCBHZTQCBXWGQWYYBXHMBYMYQTYEXMQKYAQYRGYZSLFYKKQHYSSQYSHJGJCNXKZYCXSBXYXHYYLSTYCXQTHYSMGSCPMMGCCCCCMTZTASMGQZJHKLOSQYLSWTMXSYQKDZLJQQYPLSYCZTCQQPBBQJZCLPKHQZYYXXDTDDTSJCXFFLLCHQXMJLWCJCXTSPYCXNDTJSHJWXDQQJSKXYAMYLSJHMLALYKXCYYDMNMDQMXMCZNNCYBZKKYFLMCHCMLHXRCJJHSYLNMTJZGZGYWJXSRXCWJGJQHQZDQJDCJJZKJKGDZQGJJYJYLXZXXCDQHHHEYTMHLFSBDJSYYSHFYSTCZQLPBDRFRZTZYKYWHSZYQKWDQZRKMSYNBCRXQBJYFAZPZZEDZCJYWBCJWHYJBQSZYWRYSZPTDKZPFPBNZTKLQYHBBZPNPPTYZZYBQNYDCPJMMCYCQMCYFZZDCMNLFPBPLNGQJTBTTNJZPZBBZNJKLJQYLNBZQHKSJZNGGQSZZKYXSHPZSNBCGZKDDZQANZHJKDRTLZLSWJLJZLYWTJNDJZJHXYAYNCBGTZCSSQMNJPJYTYSWXZFKWJQTKHTZPLBHSNJZSYZBWZZZZLSYLSBJHDWWQPSLMMFBJDWAQYZTCJTBNNWZXQXCDSLQGDSDPDZHJTQQPSWLYYJZLGYXYZLCTCBJTKTYCZJTQKBSJLGMGZDMCSGPYNJZYQYYKNXRPWSZXMTNCSZZYXYBYHYZAXYWQCJTLLCKJJTJHGDXDXYQYZZBYWDLWQCGLZGJGQRQZCZSSBCRPCSKYDZNXJSQGXSSJMYDNSTZTPBDLTKZWXQWQTZEXNQCZGWEZKSSBYBRTSSSLCCGBPSZQSZLCCGLLLZXHZQTHCZMQGYZQZNMCOCSZJMMZSQPJYGQLJYJPPLDXRGZYXCCSXHSHGTZNLZWZKJCXTCFCJXLBMQBCZZWPQDNHXLJCTHYZLGYLNLSZZPCXDSCQQHJQKSXZPBAJYEMSMJTZDXLCJYRYYNWJBNGZZTMJXLTBSLYRZPYLSSCNXPHLLHYLLQQZQLXYMRSYCXZLMMCZLTZSDWTJJLLNZGGQXPFSKYGYGHBFZPDKMWGHCXMSGDXJMCJZDYCABXJDLNBCDQYGSKYDQTXDJJYXMSZQAZDZFSLQXYJSJZYLBTXXWXQQZBJZUFBBLYLWDSLJHXJYZJWTDJCZFQZQZZDZSXZZQLZCDZFJHYSPYMPQZMLPPLFFXJJNZZYLSJEYQZFPFZKSYWJJJHRDJZZXTXXGLGHYDXCSKYSWMMZCWYBAZBJKSHFHJCXMHFQHYXXYZFTSJYZFXYXPZLCHMZMBXHZZSXYFYMNCWDABAZLXKTCSHHXKXJJZJSTHYGXSXYYHHHJWXKZXSSBZZWHHHCWTZZZPJXSNXQQJGZYZYWLLCWXZFXXYXYHXMKYYSWSQMNLNAYCYSPMJKHWCQHYLAJJMZXHMMCNZHBHXCLXTJPLTXYJHDYYLTTXFSZHYXXSJBJYAYRSMXYPLCKDUYHLXRLNLLSTYZYYQYGYHHSCCSMZCTZQXKYQFPYYRPFFLKQUNTSZLLZMWWTCQQYZWTLLMLMPWMBZSSTZRBPDDTLQJJBXZCSRZQQYGWCSXFWZLXCCRSZDZMCYGGDZQSGTJSWLJMYMMZYHFBJDGYXCCPSHXNZCSBSJYJGJMPPWAFFYFNXHYZXZYLREMZGZCYZSSZDLLJCSQFNXZKPTXZGXJJGFMYYYSNBTYLBNLHPFZDCYFBMGQRRSSSZXYSGTZRNYDZZCDGPJAFJFZKNZBLCZSZPSGCYCJSZLMLRSZBZZLDLSLLYSXSQZQLYXZLSKKBRXBRBZCYCXZZZEEYFGKLZLYYHGZSGZLFJHGTGWKRAAJYZKZQTSSHJJXDCYZUYJLZYRZDQQHGJZXSSZBYKJPBFRTJXLLFQWJHYLQTYMBLPZDXTZYGBDHZZRBGXHWNJTJXLKSCFSMWLSDQYSJTXKZSCFWJLBXFTZLLJZLLQBLSQMQQCGCZFPBPHZCZJLPYYGGDTGWDCFCZQYYYQYSSCLXZSKLZZZGFFCQNWGLHQYZJJCZLQZZYJPJZZBPDCCMHJGXDQDGDLZQMFGPSYTSDYFWWDJZJYSXYYCZCYHZWPBYKXRYLYBHKJKSFXTZJMMCKHLLTNYYMSYXYZPYJQYCSYCWMTJJKQYRHLLQXPSGTLYYCLJSCPXJYZFNMLRGJJTYZBXYZMSJYJHHFZQMSYXRSZCWTLRTQZSSTKXGQKGSPTGCZNJSJCQCXHMXGGZTQYDJKZDLBZSXJLHYQGGGTHQSZPYHJHHGYYGKGGCWJZZYLCZLXQSFTGZSLLLMLJSKCTBLLZZSZMMNYTPZSXQHJCJYQXYZXZQZCPSHKZZYSXCDFGMWQRLLQXRFZTLYSTCTMJCXJJXHJNXTNRZTZFQYHQGLLGCXSZSJDJLJCYDSJTLNYXHSZXCGJZYQPYLFHDJSBPCCZHJJJQZJQDYBSSLLCMYTTMQTBHJQNNYGKYRQYQMZGCJKPDCGMYZHQLLSLLCLMHOLZGDYYFZSLJCQZLYLZQJESHNYLLJXGJXLYSYYYXNBZLJSSZCQQCJYLLZLTJYLLZLLBNYLGQCHXYYXOXCXQKYJXXXYKLXSXXYQXCYKQXQCSGYXXYQXYGYTQOHXHXPYXXXULCYEYCHZZCBWQBBWJQZSCSZSSLZYLKDESJZWMYMCYTSDSXXSCJPQQSQYLYYZYCMDJDZYWCBTJSYDJKCYDDJLBDJJSODZYSYXQQYXDHHGQQYQHDYXWGMMMAJDYBBBPPBCMUUPLJZSMTXERXJMHQNUTPJDCBSSMSSSTKJTSSMMTRCPLZSZMLQDSDMJMQPNQDXCFYNBFSDQXYXHYAYKQYDDLQYYYSSZBYDSLNTFQTZQPZMCHDHCZCWFDXTMYQSPHQYYXSRGJCWTJTZZQMGWJJTJHTQJBBHWZPXXHYQFXXQYWYYHYSCDYDHHQMNMTMWCPBSZPPZZGLMZFOLLCFWHMMSJZTTDHZZYFFYTZZGZYSKYJXQYJZQBHMBZZLYGHGFMSHPZFZSNCLPBQSNJXZSLXXFPMTYJYGBXLLDLXPZJYZJYHHZCYWHJYLSJEXFSZZYWXKZJLUYDTMLYMQJPWXYHXSKTQJEZRPXXZHHMHWQPWQLYJJQJJZSZCPHJLCHHNXJLQWZJHBMZYXBDHHYPZLHLHLGFWLCHYYTLHJXCJMSCPXSTKPNHQXSRTYXXTESYJCTLSSLSTDLLLWWYHDHRJZSFGXTSYCZYNYHTDHWJSLHTZDQDJZXXQHGYLTZPHCSQFCLNJTCLZPFSTPDYNYLGMJLLYCQHYSSHCHYLHQYQTMZYPBYWRFQYKQSYSLZDQJMPXYYSSRHZJNYWTQDFZBWWTWWRXCWHGYHXMKMYYYQMSMZHNGCEPMLQQMTCWCTMMPXJPJJHFXYYZSXZHTYBMSTSYJTTQQQYYLHYNPYQZLCYZHZWSMYLKFJXLWGXYPJYTYSYXYMZCKTTWLKSMZSYLMPWLZWXWQZSSAQSYXYRHSSNTSRAPXCPWCMGDXHXZDZYFJHGZTTSBJHGYZSZYSMYCLLLXBTYXHBBZJKSSDMALXHYCFYGMQYPJYCQXJLLLJGSLZGQLYCJCCZOTYXMTMTTLLWTGPXYMZMKLPSZZZXHKQYSXCTYJZYHXSHYXZKXLZWPSQPYHJWPJPWXQQYLXSDHMRSLZZYZWTTCYXYSZZSHBSCCSTPLWSSCJCHNLCGCHSSPHYLHFHHXJSXYLLNYLSZDHZXYLSXLWZYKCLDYAXZCMDDYSPJTQJZLNWQPSSSWCTSTSZLBLNXSMNYYMJQBQHRZWTYYDCHQLXKPZWBGQYBKFCMZWPZLLYYLSZYDWHXPSBCMLJBSCGBHXLQHYRLJXYSWXWXZSLDFHLSLYNJLZYFLYJYCDRJLFSYZFSLLCQYQFGJYHYXZLYLMSTDJCYHBZLLNWLXXYGYYHSMGDHXXHHLZZJZXCZZZCYQZFNGWPYLCPKPYYPMCLQKDGXZGGWQBDXZZKZFBXXLZXJTPJPTTBYTSZZDWSLCHZHSLTYXHQLHYXXXYYZYSWTXZKHLXZXZPYHGCHKCFSYHUTJRLXFJXPTZTWHPLYXFCRHXSHXKYXXYHZQDXQWULHYHMJTBFLKHTXCWHJFWJCFPQRYQXCYYYQYGRPYWSGSUNGWCHKZDXYFLXXHJJBYZWTSXXNCYJJYMSWZJQRMHXZWFQSYLZJZGBHYNSLBGTTCSYBYXXWXYHXYYXNSQYXMQYWRGYQLXBBZLJSYLPSYTJZYHYZAWLRORJMKSCZJXXXYXCHDYXRYXXJDTSQFXLYLTSFFYXLMTYJMJUYYYXLTZCSXQZQHZXLYYXZHDNBRXXXJCTYHLBRLMBRLLAXKYLLLJLYXXLYCRYLCJTGJCMTLZLLCYZZPZPCYAWHJJFYBDYYZSMPCKZDQYQPBPCJPDCYZMDPBCYYDYCNNPLMTMLRMFMMGWYZBSJGYGSMZQQQZTXMKQWGXLLPJGZBQCDJJJFPKJKCXBLJMSWMDTQJXLDLPPBXCWRCQFBFQJCZAHZGMYKPHYYHZYKNDKZMBPJYXPXYHLFPNYYGXJDBKXNXHJMZJXSTRSTLDXSKZYSYBZXJLXYSLBZYSLHXJPFXPQNBYLLJQKYGZMCYZZYMCCSLCLHZFWFWYXZMWSXTYNXJHPYYMCYSPMHYSMYDYSHQYZCHMJJMZCAAGCFJBBHPLYZYLXXSDJGXDHKXXTXXNBHRMLYJSLTXMRHNLXQJXYZLLYSWQGDLBJHDCGJYQYCMHWFMJYBMBYJYJWYMDPWHXQLDYGPDFXXBCGJSPCKRSSYZJMSLBZZJFLJJJLGXZGYXYXLSZQYXBEXYXHGCXBPLDYHWETTWWCJMBTXCHXYQXLLXFLYXLLJLSSFWDPZSMYJCLMWYTCZPCHQEKCQBWLCQYDPLQPPQZQFJQDJHYMMCXTXDRMJWRHXCJZYLQXDYYNHYYHRSLSRSYWWZJYMTLTLLGTQCJZYABTCKZCJYCCQLJZQXALMZYHYWLWDXZXQDLLQSHGPJFJLJHJABCQZDJGTKHSSTCYJLPSWZLXZXRWGLDLZRLZXTGSLLLLZLYXXWGDZYGBDPHZPBRLWSXQBPFDWOFMWHLYPCBJCCLDMBZPBZZLCYQXLDOMZBLZWPDWYYGDSTTHCSQSCCRSSSYSLFYBFNTYJSZDFNDPDHDZZMBBLSLCMYFFGTJJQWFTMTPJWFNLBZCMMJTGBDZLQLPYFHYYMJYLSDCHDZJWJCCTLJCLDTLJJCPDDSQDSSZYBNDBJLGGJZXSXNLYCYBJXQYCBYLZCFZPPGKCXZDZFZTJJFJSJXZBNZYJQTTYJYHTYCZHYMDJXTTMPXSPLZCDWSLSHXYPZGTFMLCJTYCBPMGDKWYCYZCDSZZYHFLYCTYGWHKJYYLSJCXGYWJCBLLCSNDDBTZBSCLYZCZZSSQDLLMQYYHFSLQLLXFTYHABXGWNYWYYPLLSDLDLLBJCYXJZMLHLJDXYYQYTDLLLBUGBFDFBBQJZZMDPJHGCLGMJJPGAEHHBWCQXAXHHHZCHXYPHJAXHLPHJPGPZJQCQZGJJZZUZDMQYYBZZPHYHYBWHAZYJHYKFGDPFQSDLZMLJXKXGALXZDAGLMDGXMWZQYXXDXXPFDMMSSYMPFMDMMKXKSYZYSHDZKXSYSMMZZZMSYDNZZCZXFPLSTMZDNMXCKJMZTYYMZMZZMSXHHDCZJEMXXKLJSTLWLSQLYJZLLZJSSDPPMHNLZJCZYHMXXHGZCJMDHXTKGRMXFWMCGMWKDTKSXQMMMFZZYDKMSCLCMPCGMHSPXQPZDSSLCXKYXTWLWJYAHZJGZQMCSNXYYMMPMLKJXMHLMLQMXCTKZMJQYSZJSYSZHSYJZJCDAJZYBSDQJZGWZQQXFKDMSDJLFWEHKZQKJPEYPZYSZCDWYJFFMZZYLTTDZZEFMZLBNPPLPLPEPSZALLTYLKCKQZKGENQLWAGYXYDPXLHSXQQWQCQXQCLHYXXMLYCCWLYMQYSKGCHLCJNSZKPYZKCQZQLJPDMDZHLASXLBYDWQLWDNBQCRYDDZTJYBKBWSZDXDTNPJDTCTQDFXQQMGNXECLTTBKPWSLCTYQLPWYZZKLPYGZCQQPLLKCCYLPQMZCZQCLJSLQZDJXLDDHPZQDLJJXZQDXYZQKZLJCYQDYJPPYPQYKJYRMPCBYMCXKLLZLLFQPYLLLMBSGLCYSSLRSYSQTMXYXZQZFDZUYSYZTFFMZZSMZQHZSSCCMLYXWTPZGXZJGZGSJSGKDDHTQGGZLLBJDZLCBCHYXYZHZFYWXYZYMSDBZZYJGTSMTFXQYXQSTDGSLNXDLRYZZLRYYLXQHTXSRTZNGZXBNQQZFMYKMZJBZYMKBPNLYZPBLMCNQYZZZSJZHJCTZKHYZZJRDYZHNPXGLFZTLKGJTCTSSYLLGZRZBBQZZKLPKLCZYSSUYXBJFPNJZZXCDWXZYJXZZDJJKGGRSRJKMSMZJLSJYWQSKYHQJSXPJZZZLSNSHRNYPZTWCHKLPSRZLZXYJQXQKYSJYCZTLQZYBBYBWZPQDWWYZCYTJCJXCKCWDKKZXSGKDZXWWYYJQYYTCYTDLLXWKCZKKLCCLZCQQDZLQLCSFQCHQHSFSMQZZLNBJJZBSJHTSZDYSJQJPDLZCDCWJKJZZLPYCGMZWDJJBSJQZSYZYHHXJPBJYDSSXDZNCGLQMBTSFSBPDZDLZNFGFJGFSMPXJQLMBLGQCYYXBQKDJJQYRFKZTJDHCZKLBSDZCFJTPLLJGXHYXZCSSZZXSTJYGKGCKGYOQXJPLZPBPGTGYJZGHZQZZLBJLSQFZGKQQJZGYCZBZQTLDXRJXBSXXPZXHYZYCLWDXJJHXMFDZPFZHQHQMQGKSLYHTYCGFRZGNQXCLPDLBZCSCZQLLJBLHBZCYPZZPPDYMZZSGYHCKCPZJGSLJLNSCDSLDLXBMSTLDDFJMKDJDHZLZXLSZQPQPGJLLYBDSZGQLBZLSLKYYHZTTNTJYQTZZPSZQZTLLJTYYLLQLLQYZQLBDZLSLYYZYMDFSZSNHLXZNCZQZPBWSKRFBSYZMTHBLGJPMCZZLSTLXSHTCSYZLZBLFEQHLXFLCJLYLJQCBZLZJHHSSTBRMHXZHJZCLXFNBGXGTQJCZTMSFZKJMSSNXLJKBHSJXNTNLZDNTLMSJXGZJYJCZXYJYJWRWWQNZTNFJSZPZSHZJFYRDJSFSZJZBJFZQZZHZLXFYSBZQLZSGYFTZDCSZXZJBQMSZKJRHYJZCKMJKHCHGTXKXQGLXPXFXTRTYLXJXHDTSJXHJZJXZWZLCQSBTXWXGXTXXHXFTSDKFJHZYJFJXRZSDLLLTQSQQZQWZXSYQTWGWBZCGZLLYZBCLMQQTZHZXZXLJFRMYZFLXYSQXXJKXRMQDZDMMYYBSQBHGZMWFWXGMXLZPYYTGZYCCDXYZXYWGSYJYZNBHPZJSQSYXSXRTFYZGRHZTXSZZTHCBFCLSYXZLZQMZLMPLMXZJXSFLBYZMYQHXJSXRXSQZZZSSLYFRCZJRCRXHHZXQYDYHXSJJHZCXZBTYNSYSXJBQLPXZQPYMLXZKYXLXCJLCYSXXZZLXDLLLJJYHZXGYJWKJRWYHCPSGNRZLFZWFZZNSXGXFLZSXZZZBFCSYJDBRJKRDHHGXJLJJTGXJXXSTJTJXLYXQFCSGSWMSBCTLQZZWLZZKXJMLTMJYHSDDBXGZHDLBMYJFRZFSGCLYJBPMLYSMSXLSZJQQHJZFXGFQFQBPXZGYYQXGZTCQWYLTLGWSGWHRLFSFGZJMGMGBGTJFSYZZGZYZAFLSSPMLPFLCWBJZCLJJMZLPJJLYMQDMYYYFBGYGYZMLYZDXQYXRQQQHSYYYQXYLJTYXFSFSLLGNQCYHYCWFHCCCFXPYLYPLLZYXXXXXKQHHXSHJZCFZSCZJXCPZWHHHHHAPYLQALPQAFYHXDYLUKMZQGGGDDESRNNZLTZGCHYPPYSQJJHCLLJTOLNJPZLJLHYMHEYDYDSQYCDDHGZUNDZCLZYZLLZNTNYZGSLHSLPJJBDGWXPCDUTJCKLKCLWKLLCASSTKZZDNQNTTLYYZSSYSSZZRYLJQKCQDHHCRXRZYDGRGCWCGZQFFFPPJFZYNAKRGYWYQPQXXFKJTSZZXSWZDDFBBXTBGTZKZNPZZPZXZPJSZBMQHKCYXYLDKLJNYPKYGHGDZJXXEAHPNZKZTZCMXCXMMJXNKSZQNMNLWBWWXJKYHCPSTMCSQTZJYXTPCTPDTNNPGLLLZSJLSPBLPLQHDTNJNLYYRSZFFJFQWDPHZDWMRZCCLODAXNSSNYZRESTYJWJYJDBCFXNMWTTBYLWSTSZGYBLJPXGLBOCLHPCBJLTMXZLJYLZXCLTPNCLCKXTPZJSWCYXSFYSZDKNTLBYJCYJLLSTGQCBXRYZXBXKLYLHZLQZLNZCXWJZLJZJNCJHXMNZZGJZZXTZJXYCYYCXXJYYXJJXSSSJSTSSTTPPGQTCSXWZDCSYFPTFBFHFBBLZJCLZZDBXGCXLQPXKFZFLSYLTUWBMQJHSZBMDDBCYSCCLDXYCDDQLYJJWMQLLCSGLJJSYFPYYCCYLTJANTJJPWYCMMGQYYSXDXQMZHSZXPFTWWZQSWQRFKJLZJQQYFBRXJHHFWJJZYQAZMYFRHCYYBYQWLPEXCCZSTYRLTTDMQLYKMBBGMYYJPRKZNPBSXYXBHYZDJDNGHPMFSGMWFZMFQMMBCMZZCJJLCNUXYQLMLRYGQZCYXZLWJGCJCGGMCJNFYZZJHYCPRRCMTZQZXHFQGTJXCCJEAQCRJYHPLQLSZDJRBCQHQDYRHYLYXJSYMHZYDWLDFRYHBPYDTSSCNWBXGLPZMLZZTQSSCPJMXXYCSJYTYCGHYCJWYRXXLFEMWJNMKLLSWTXHYYYNCMMCWJDQDJZGLLJWJRKHPZGGFLCCSCZMCBLTBHBQJXQDSPDJZZGKGLFQYWBZYZJLTSTDHQHCTCBCHFLQMPWDSHYYTQWCNZZJTLBYMBPDYYYXSQKXWYYFLXXNCWCXYPMAELYKKJMZZZBRXYYQJFLJPFHHHYTZZXSGQQMHSPGDZQWBWPJHZJDYSCQWZKTXXSQLZYYMYSDZGRXCKKUJLWPYSYSCSYZLRMLQSYLJXBCXTLWDQZPCYCYKPPPNSXFYZJJRCEMHSZMSXLXGLRWGCSTLRSXBZGBZGZTCPLUJLSLYLYMTXMTZPALZXPXJTJWTCYYZLBLXBZLQMYLXPGHDSLSSDMXMBDZZSXWHAMLCZCPJMCNHJYSNSYGCHSKQMZZQDLLKABLWJXSFMOCDXJRRLYQZKJMYBYQLYHETFJZFRFKSRYXFJTWDSXXSYSQJYSLYXWJHSNLXYYXHBHAWHHJZXWMYLJCSSLKYDZTXBZSYFDXGXZJKHSXXYBSSXDPYNZWRPTQZCZENYGCXQFJYKJBZMLJCMQQXUOXSLYXXLYLLJDZBTYMHPFSTTQQWLHOKYBLZZALZXQLHZWRRQHLSTMYPYXJJXMQSJFNBXYXYJXXYQYLTHYLQYFMLKLJTMLLHSZWKZHLJMLHLJKLJSTLQXYLMBHHLNLZXQJHXCFXXLHYHJJGBYZZKBXSCQDJQDSUJZYYHZHHMGSXCSYMXFEBCQWWRBPYYJQTYZCYQYQQZYHMWFFHGZFRJFCDPXNTQYZPDYKHJLFRZXPPXZDBBGZQSTLGDGYLCQMLCHHMFYWLZYXKJLYPQHSYWMQQGQZMLZJNSQXJQSYJYCBEHSXFSZPXZWFLLBCYYJDYTDTHWZSFJMQQYJLMQXXLLDTTKHHYBFPWTYYSQQWNQWLGWDEBZWCMYGCULKJXTMXMYJSXHYBRWFYMWFRXYQMXYSZTZZTFYKMLDHQDXWYYNLCRYJBLPSXCXYWLSPRRJWXHQYPHTYDNXHHMMYWYTZCSQMTSSCCDALWZTCPQPYJLLQZYJSWXMZZMMYLMXCLMXCZMXMZSQTZPPQQBLPGXQZHFLJJHYTJSRXWZXSCCDLXTYJDCQJXSLQYCLZXLZZXMXQRJMHRHZJBHMFLJLMLCLQNLDXZLLLPYPSYJYSXCQQDCMQJZZXHNPNXZMEKMXHYKYQLXSXTXJYYHWDCWDZHQYYBGYBCYSCFGPSJNZDYZZJZXRZRQJJYMCANYRJTLDPPYZBSTJKXXZYPFDWFGZZRPYMTNGXZQBYXNBUFNQKRJQZMJEGRZGYCLKXZDSKKNSXKCLJSPJYYZLQQJYBZSSQLLLKJXTBKTYLCCDDBLSPPFYLGYDTZJYQGGKQTTFZXBDKTYYHYBBFYTYYBCLPDYTGDHRYRNJSPTCSNYJQHKLLLZSLYDXXWBCJQSPXBPJZJCJDZFFXXBRMLAZHCSNDLBJDSZBLPRZTSWSBXBCLLXXLZDJZSJPYLYXXYFTFFFBHJJXGBYXJPMMMPSSJZJMTLYZJXSWXTYLEDQPJMYGQZJGDJLQJWJQLLSJGJGYGMSCLJJXDTYGJQJQJCJZCJGDZZSXQGSJGGCXHQXSNQLZZBXHSGZXCXYLJXYXYYDFQQJHJFXDHCTXJYRXYSQTJXYEFYYSSYYJXNCYZXFXMSYSZXYYSCHSHXZZZGZZZGFJDLTYLNPZGYJYZYYQZPBXQBDZTZCZYXXYHHSQXSHDHGQHJHGYWSZTMZMLHYXGEBTYLZKQWYTJZRCLEKYSTDBCYKQQSAYXCJXWWGSBHJYZYDHCSJKQCXSWXFLTYNYZPZCCZJQTZWJQDZZZQZLJJXLSBHPYXXPSXSHHEZTXFPTLQYZZXHYTXNCFZYYHXGNXMYWXTZSJPTHHGYMXMXQZXTSBCZYJYXXTYYZYPCQLMMSZMJZZLLZXGXZAAJZYXJMZXWDXZSXZDZXLEYJJZQBHZWZZZQTZPSXZTDSXJJJZNYAZPHXYYSRNQDTHZHYYKYJHDZXZLSWCLYBZYECWCYCRYLCXNHZYDZYDYJDFRJJHTRSQTXYXJRJHOJYNXELXSFSFJZGHPZSXZSZDZCQZBYYKLSGSJHCZSHDGQGXYZGXCHXZJWYQWGYHKSSEQZZNDZFKWYSSTCLZSTSYMCDHJXXYWEYXCZAYDMPXMDSXYBSQMJMZJMTZQLPJYQZCGQHXJHHLXXHLHDLDJQCLDWBSXFZZYYSCHTYTYYBHECXHYKGJPXHHYZJFXHWHBDZFYZBCAPNPGNYDMSXHMMMMAMYNBYJTMPXYYMCTHJBZYFCGTYHWPHFTWZZEZSBZEGPFMTSKFTYCMHFLLHGPZJXZJGZJYXZSBBQSCZZLZCCSTPGXMJSFTCCZJZDJXCYBZLFCJSYZFGSZLYBCWZZBYZDZYPSWYJZXZBDSYUXLZZBZFYGCZXBZHZFTPBGZGEJBSTGKDMFHYZZJHZLLZZGJQZLSFDJSSCBZGPDLFZFZSZYZYZSYGCXSNXXCHCZXTZZLJFZGQSQYXZJQDCCZTQCDXZJYQJQCHXZTDLGSCXZSYQJQTZWLQDQZTQCHQQJZYEZZZPBWKDJFCJPZTYPQYQTTYNLMBDKTJZPQZQZZFPZSBNJLGYJDXJDZZKZGQKXDLPZJTCJDQBXDJQJSTCKNXBXZMSLYJCQMTJQWWCJQNJNLLLHJCWQTBZQYDZCZPZZDZYDDCYZZZCCJTTJFZDPRRTZTJDCQTQZDTJNPLZBCLLCTZSXKJZQZPZLBZRBTJDCXFCZDBCCJJLTQQPLDCGZDBBZJCQDCJWYNLLZYZCCDWLLXWZLXRXNTQQCZXKQLSGDFQTDDGLRLAJJTKUYMKQLLTZYTDYYCZGJWYXDXFRSKSTQTENQMRKQZHHQKDLDAZFKYPBGGPZREBZZYKZZSPEGJXGYKQZZZSLYSYYYZWFQZYLZZLZHWCHKYPQGNPGBLPLRRJYXCCSYYHSFZFYBZYYTGZXYLXCZWXXZJZBLFFLGSKHYJZEYJHLPLLLLCZGXDRZELRHGKLZZYHZLYQSZZJZQLJZFLNBHGWLCZCFJYSPYXZLZLXGCCPZBLLCYBBBBUBBCBPCRNNZCZYRBFSRLDCGQYYQXYGMQZWTZYTYJXYFWTEHZZJYWLCCNTZYJJZDEDPZDZTSYQJHDYMBJNYJZLXTSSTPHNDJXXBYXQTZQDDTJTDYYTGWSCSZQFLSHLGLBCZPHDLYZJYCKWTYTYLBNYTSDSYCCTYSZYYEBHEXHQDTWNYGYCLXTSZYSTQMYGZAZCCSZZDSLZCLZRQXYYELJSBYMXSXZTEMBBLLYYLLYTDQYSHYMRQWKFKBFXNXSBYCHXBWJYHTQBPBSBWDZYLKGZSKYHXQZJXHXJXGNLJKZLYYCDXLFYFGHLJGJYBXQLYBXQPQGZTZPLNCYPXDJYQYDYMRBESJYYHKXXSTMXRCZZYWXYQYBMCLLYZHQYZWQXDBXBZWZMSLPDMYSKFMZKLZCYQYCZLQXFZZYDQZPZYGYJYZMZXDZFYFYTTQTZHGSPCZMLCCYTZXJCYTJMKSLPZHYSNZLLYTPZCTZZCKTXDHXXTQCYFKSMQCCYYAZHTJPCYLZLYJBJXTPNYLJYYNRXSYLMMNXJSMYBCSYSYLZYLXJJQYLDZLPQBFZZBLFNDXQKCZFYWHGQMRDSXYCYTXNQQJZYYPFZXDYZFPRXEJDGYQBXRCNFYYQPGHYJDYZXGRHTKYLNWDZNTSMPKLBTHBPYSZBZTJZSZZJTYYXZPHSSZZBZCZPTQFZMYFLYPYBBJQXZMXXDJMTSYSKKBJZXHJCKLPSMKYJZCXTMLJYXRZZQSLXXQPYZXMKYXXXJCLJPRMYYGADYSKQLSNDHYZKQXZYZTCGHZTLMLWZYBWSYCTBHJHJFCWZTXWYTKZLXQSHLYJZJXTMPLPYCGLTBZZTLZJCYJGDTCLKLPLLQPJMZPAPXYZLKKTKDZCZZBNZDYDYQZJYJGMCTXLTGXSZLMLHBGLKFWNWZHDXUHLFMKYSLGXDTWWFRJEJZTZHYDXYKSHWFZCQSHKTMQQHTZHYMJDJSKHXZJZBZZXYMPAGQMSTPXLSKLZYNWRTSQLSZBPSPSGZWYHTLKSSSWHZZLYYTNXJGMJSZSUFWNLSOZTXGXLSAMMLBWLDSZYLAKQCQCTMYCFJBSLXCLZZCLXXKSBZQCLHJPSQPLSXXCKSLNHPSFQQYTXYJZLQLDXZQJZDYYDJNZPTUZDSKJFSLJHYLZSQZLBTXYDGTQFDBYAZXDZHZJNHHQBYKNXJJQCZMLLJZKSPLDYCLBBLXKLELXJLBQYCXJXGCNLCQPLZLZYJTZLJGYZDZPLTQCSXFDMNYCXGBTJDCZNBGBQYQJWGKFHTNPYQZQGBKPBBYZMTJDYTBLSQMPSXTBNPDXKLEMYYCJYNZCTLDYKZZXDDXHQSHDGMZSJYCCTAYRZLPYLTLKXSLZCGGEXCLFXLKJRTLQJAQZNCMBYDKKCXGLCZJZXJHPTDJJMZQYKQSECQZDSHHADMLZFMMZBGNTJNNLGBYJBRBTMLBYJDZXLCJLPLDLPCQDHLXZLYCBLCXZZJADJLNZMMSSSMYBHBSQKBHRSXXJMXSDZNZPXLGBRHWGGFCXGMSKLLTSJYYCQLTSKYWYYHYWXBXQYWPYWYKQLSQPTNTKHQCWDQKTWPXXHCPTHTWUMSSYHBWCRWXHJMKMZNGWTMLKFGHKJYLSYYCXWHYECLQHKQHTTQKHFZLDXQWYZYYDESBPKYRZPJFYYZJCEQDZZDLATZBBFJLLCXDLMJSSXEGYGSJQXCWBXSSZPDYZCXDNYXPPZYDLYJCZPLTXLSXYZYRXCYYYDYLWWNZSAHJSYQYHGYWWAXTJZDAXYSRLTDPSSYYFNEJDXYZHLXLLLZQZSJNYQYQQXYJGHZGZCYJCHZLYCDSHWSHJZYJXCLLNXZJJYYXNFXMWFPYLCYLLABWDDHWDXJMCXZTZPMLQZHSFHZYNZTLLDYWLSLXHYMMYLMBWWKYXYADTXYLLDJPYBPWUXJMWMLLSAFDLLYFLBHHHBQQLTZJCQJLDJTFFKMMMBYTHYGDCQRDDWRQJXNBYSNWZDBYYTBJHPYBYTTJXAAHGQDQTMYSTQXKBTZPKJLZRBEQQSSMJJBDJOTGTBXPGBKTLHQXJJJCTHXQDWJLWRFWQGWSHCKRYSWGFTGYGBXSDWDWRFHWYTJJXXXJYZYSLPYYYPAYXHYDQKXSHXYXGSKQHYWFDDDPPLCJLQQEEWXKSYYKDYPLTJTHKJLTCYYHHJTTPLTZZCDLTHQKZXQYSTEEYWYYZYXXYYSTTJKLLPZMCYHQGXYHSRMBXPLLNQYDQHXSXXWGDQBSHYLLPJJJTHYJKYPPTHYYKTYEZYENMDSHLCRPQFDGFXZPSFTLJXXJBSWYYSKSFLXLPPLBBBLBSFXFYZBSJSSYLPBBFFFFSSCJDSTZSXZRYYSYFFSYZYZBJTBCTSBSDHRTJJBYTCXYJEYLXCBNEBJDSYXYKGSJZBXBYTFZWGENYHHTHZHHXFWGCSTBGXKLSXYWMTMBYXJSTZSCDYQRCYTWXZFHMYMCXLZNSDJTTTXRYCFYJSBSDYERXJLJXBBDEYNJGHXGCKGSCYMBLXJMSZNSKGXFBNBPTHFJAAFXYXFPXMYPQDTZCXZZPXRSYWZDLYBBKTYQPQJPZYPZJZNJPZJLZZFYSBTTSLMPTZRTDXQSJEHBZYLZDHLJSQMLHTXTJECXSLZZSPKTLZKQQYFSYGYWPCPQFHQHYTQXZKRSGTTSQCZLPTXCDYYZXSQZSLXLZMYCPCQBZYXHBSXLZDLTCDXTYLZJYYZPZYZLTXJSJXHLPMYTXCQRBLZSSFJZZTNJYTXMYJHLHPPLCYXQJQQKZZSCPZKSWALQSBLCCZJSXGWWWYGYKTJBBZTDKHXHKGTGPBKQYSLPXPJCKBMLLXDZSTBKLGGQKQLSBKKTFXRMDKBFTPZFRTBBRFERQGXYJPZSSTLBZTPSZQZSJDHLJQLZBPMSMMSXLQQNHKNBLRDDNXXDHDDJCYYGYLXGZLXSYGMQQGKHBPMXYXLYTQWLWGCPBMQXCYZYDRJBHTDJYHQSHTMJSBYPLWHLZFFNYPMHXXHPLTBQPFBJWQDBYGPNZTPFZJGSDDTQSHZEAWZZYLLTYYBWJKXXGHLFKXDJTMSZSQYNZGGSWQSPHTLSSKMCLZXYSZQZXNCJDQGZDLFNYKLJCJLLZLMZZNHYDSSHTHZZLZZBBHQZWWYCRZHLYQQJBEYFXXXWHSRXWQHWPSLMSSKZTTYGYQQWRSLALHMJTQJSMXQBJJZJXZYZKXBYQXBJXSHZTSFJLXMXZXFGHKZSZGGYLCLSARJYHSLLLMZXELGLXYDJYTLFBHBPNLYZFBBHPTGJKWETZHKJJXZXXGLLJLSTGSHJJYQLQZFKCGNNDJSSZFDBCTWWSEQFHQJBSAQTGYPQLBXBMMYWXGSLZHGLZGQYFLZBYFZJFRYSFMBYZHQGFWZSYFYJJPHZBYYZFFWODGRLMFTWLBZGYCQXCDJYGZYYYYTYTYDWEGAZYHXJLZYYHLRMGRXXZCLHNELJJTJTPWJYBJJBXJJTJTEEKHWSLJPLPSFYZPQQBDLQJJTYYQLYZKDKSQJYYQZLDQTGJQYZJSUCMRYQTHTEJMFCTYHYPKMHYZWJDQFHYYXWSHCTXRLJHQXHCCYYYJLTKTTYTMXGTCJTZAYYOCZLYLBSZYWJYTSJYHBYSHFJLYGJXXTMZYYLTXXYPZLXYJZYZYYPNHMYMDYYLBLHLSYYQQLLNJJYMSOYQBZGDLYXYLCQYXTSZEGXHZGLHWBLJHEYXTWQMAKBPQCGYSHHEGQCMWYYWLJYJHYYZLLJJYLHZYHMGSLJLJXCJJYCLYCJPCPZJZJMMYLCQLNQLJQJSXYJMLSZLJQLYCMMHCFMMFPQQMFYLQMCFFQMMMMHMZNFHHJGTTHHKHSLNCHHYQDXTMMQDCYZYXYQMYQYLTDCYYYZAZZCYMZYDLZFFFMMYCQZWZZMABTBYZTDMNZZGGDFTYPCGQYTTSSFFWFDTZQSSYSTWXJHXYTSXXYLBYQHWWKXHZXWZNNZZJZJJQJCCCHYYXBZXZCYZTLLCQXYNJYCYYCYNZZQYYYEWYCZDCJYCCHYJLBTZYYCQWMPWPYMLGKDLDLGKQQBGYCHJXY";
const oMultiDiff = {
  "19969": "DZ",
  "19975": "WM",
  "19988": "QJ",
  "20048": "YL",
  "20056": "SC",
  "20060": "NM",
  "20094": "QG",
  "20127": "QJ",
  "20167": "QC",
  "20193": "YG",
  "20250": "KH",
  "20256": "ZC",
  "20282": "SC",
  "20285": "QJG",
  "20291": "TD",
  "20314": "YD",
  "20340": "NE",
  "20375": "TD",
  "20389": "YJ",
  "20391": "CZ",
  "20415": "PB",
  "20446": "YS",
  "20447": "SQ",
  "20504": "TC",
  "20608": "KG",
  "20854": "QJ",
  "20857": "ZC",
  "20911": "PF",
  "20985": "AW",
  "21032": "PB",
  "21048": "XQ",
  "21049": "SC",
  "21089": "YS",
  "21119": "JC",
  "21242": "SB",
  "21273": "SC",
  "21305": "YP",
  "21306": "QO",
  "21330": "ZC",
  "21333": "SDC",
  "21345": "QK",
  "21378": "CA",
  "21397": "SC",
  "21414": "XS",
  "21442": "SC",
  "21477": "JG",
  "21480": "TD",
  "21484": "ZS",
  "21494": "YX",
  "21505": "YX",
  "21512": "HG",
  "21523": "XH",
  "21537": "PB",
  "21542": "PF",
  "21549": "KH",
  "21571": "E",
  "21574": "DA",
  "21588": "TD",
  "21589": "O",
  "21618": "ZC",
  "21621": "KHA",
  "21632": "ZJ",
  "21654": "KG",
  "21679": "LKG",
  "21683": "KH",
  "21710": "A",
  "21719": "YH",
  "21734": "WOE",
  "21769": "A",
  "21780": "WN",
  "21804": "XH",
  "21834": "A",
  "21899": "ZD",
  "21903": "RN",
  "21908": "WO",
  "21939": "ZC",
  "21956": "SA",
  "21964": "YA",
  "21970": "TD",
  "22003": "A",
  "22031": "JG",
  "22040": "XS",
  "22060": "ZC",
  "22066": "ZC",
  "22079": "MH",
  "22129": "XJ",
  "22179": "XA",
  "22237": "NJ",
  "22244": "TD",
  "22280": "JQ",
  "22300": "YH",
  "22313": "XW",
  "22331": "YQ",
  "22343": "YJ",
  "22351": "PH",
  "22395": "DC",
  "22412": "TD",
  "22484": "PB",
  "22500": "PB",
  "22534": "ZD",
  "22549": "DH",
  "22561": "PB",
  "22612": "TD",
  "22771": "KQ",
  "22831": "HB",
  "22841": "JG",
  "22855": "QJ",
  "22865": "XQ",
  "23013": "ML",
  "23081": "WM",
  "23487": "SX",
  "23558": "QJ",
  "23561": "YW",
  "23586": "YW",
  "23614": "YW",
  "23615": "SN",
  "23631": "PB",
  "23646": "ZS",
  "23663": "ZT",
  "23673": "YG",
  "23762": "TD",
  "23769": "ZS",
  "23780": "QJ",
  "23884": "QK",
  "24055": "XH",
  "24113": "DC",
  "24162": "ZC",
  "24191": "GA",
  "24273": "QJ",
  "24324": "NL",
  "24377": "TD",
  "24378": "QJ",
  "24439": "PF",
  "24554": "ZS",
  "24683": "TD",
  "24694": "WE",
  "24733": "LK",
  "24925": "TN",
  "25094": "ZG",
  "25100": "XQ",
  "25103": "XH",
  "25153": "PB",
  "25170": "PB",
  "25179": "KG",
  "25203": "PB",
  "25240": "ZS",
  "25282": "FB",
  "25303": "NA",
  "25324": "KG",
  "25341": "ZY",
  "25373": "WZ",
  "25375": "XJ",
  "25384": "A",
  "25457": "A",
  "25528": "SD",
  "25530": "SC",
  "25552": "TD",
  "25774": "ZC",
  "25874": "ZC",
  "26044": "YW",
  "26080": "WM",
  "26292": "PB",
  "26333": "PB",
  "26355": "ZY",
  "26366": "CZ",
  "26397": "ZC",
  "26399": "QJ",
  "26415": "ZS",
  "26451": "SB",
  "26526": "ZC",
  "26552": "JG",
  "26561": "TD",
  "26588": "JG",
  "26597": "CZ",
  "26629": "ZS",
  "26638": "YL",
  "26646": "XQ",
  "26653": "KG",
  "26657": "XJ",
  "26727": "HG",
  "26894": "ZC",
  "26937": "ZS",
  "26946": "ZC",
  "26999": "KJ",
  "27099": "KJ",
  "27449": "YQ",
  "27481": "XS",
  "27542": "ZS",
  "27663": "ZS",
  "27748": "TS",
  "27784": "SC",
  "27788": "ZD",
  "27795": "TD",
  "27812": "O",
  "27850": "PB",
  "27852": "MB",
  "27895": "SL",
  "27898": "PL",
  "27973": "QJ",
  "27981": "KH",
  "27986": "HX",
  "27994": "XJ",
  "28044": "YC",
  "28065": "WG",
  "28177": "SM",
  "28267": "QJ",
  "28291": "KH",
  "28337": "ZQ",
  "28463": "TL",
  "28548": "DC",
  "28601": "TD",
  "28689": "PB",
  "28805": "JG",
  "28820": "QG",
  "28846": "PB",
  "28952": "TD",
  "28975": "ZC",
  "29100": "A",
  "29325": "QJ",
  "29575": "SL",
  "29602": "FB",
  "30010": "TD",
  "30044": "CX",
  "30058": "PF",
  "30091": "YSP",
  "30111": "YN",
  "30229": "XJ",
  "30427": "SC",
  "30465": "SX",
  "30631": "YQ",
  "30655": "QJ",
  "30684": "QJG",
  "30707": "SD",
  "30729": "XH",
  "30796": "LG",
  "30917": "PB",
  "31074": "NM",
  "31085": "JZ",
  "31109": "SC",
  "31181": "ZC",
  "31192": "MLB",
  "31293": "JQ",
  "31400": "YX",
  "31584": "YJ",
  "31896": "ZN",
  "31909": "ZY",
  "31995": "XJ",
  "32321": "PF",
  "32327": "ZY",
  "32418": "HG",
  "32420": "XQ",
  "32421": "HG",
  "32438": "LG",
  "32473": "GJ",
  "32488": "TD",
  "32521": "QJ",
  "32527": "PB",
  "32562": "ZSQ",
  "32564": "JZ",
  "32735": "ZD",
  "32793": "PB",
  "33071": "PF",
  "33098": "XL",
  "33100": "YA",
  "33152": "PB",
  "33261": "CX",
  "33324": "BP",
  "33333": "TD",
  "33406": "YA",
  "33426": "WM",
  "33432": "PB",
  "33445": "JG",
  "33486": "ZN",
  "33493": "TS",
  "33507": "QJ",
  "33540": "QJ",
  "33544": "ZC",
  "33564": "XQ",
  "33617": "YT",
  "33632": "QJ",
  "33636": "XH",
  "33637": "YX",
  "33694": "WG",
  "33705": "PF",
  "33728": "YW",
  "33882": "SR",
  "34067": "WM",
  "34074": "YW",
  "34121": "QJ",
  "34255": "ZC",
  "34259": "XL",
  "34425": "JH",
  "34430": "XH",
  "34485": "KH",
  "34503": "YS",
  "34532": "HG",
  "34552": "XS",
  "34558": "YE",
  "34593": "ZL",
  "34660": "YQ",
  "34892": "XH",
  "34928": "SC",
  "34999": "QJ",
  "35048": "PB",
  "35059": "SC",
  "35098": "ZC",
  "35203": "TQ",
  "35265": "JX",
  "35299": "JX",
  "35782": "SZ",
  "35828": "YS",
  "35830": "E",
  "35843": "TD",
  "35895": "YG",
  "35977": "MH",
  "36158": "JG",
  "36228": "QJ",
  "36426": "XQ",
  "36466": "DC",
  "36710": "JC",
  "36711": "ZYG",
  "36767": "PB",
  "36866": "SK",
  "36951": "YW",
  "37034": "YX",
  "37063": "XH",
  "37218": "ZC",
  "37325": "ZC",
  "38063": "PB",
  "38079": "TD",
  "38085": "QY",
  "38107": "DC",
  "38116": "TD",
  "38123": "YD",
  "38224": "HG",
  "38241": "XTC",
  "38271": "ZC",
  "38415": "YE",
  "38426": "KH",
  "38461": "YD",
  "38463": "AE",
  "38466": "PB",
  "38477": "XJ",
  "38518": "YT",
  "38551": "WK",
  "38585": "ZC",
  "38704": "XS",
  "38739": "LJ",
  "38761": "GJ",
  "38808": "SQ",
  "39048": "JG",
  "39049": "XJ",
  "39052": "HG",
  "39076": "CZ",
  "39271": "XT",
  "39534": "TD",
  "39552": "TD",
  "39584": "PB",
  "39647": "SB",
  "39730": "LG",
  "39748": "TPB",
  "40109": "ZQ",
  "40479": "ND",
  "40516": "HG",
  "40536": "HG",
  "40583": "QJ",
  "40765": "YQ",
  "40784": "QJ",
  "40840": "YK",
  "40863": "QJG"
};
function checkCh(ch) {
  var uni = ch.charCodeAt(0);
  if (uni > 40869 || uni < 19968)
    return ch;
  return oMultiDiff[uni] ? oMultiDiff[uni] : strChineseFirstPY.charAt(uni - 19968);
}
function mkRslt(arr) {
  var arrRslt = [""];
  for (var i = 0, len = arr.length; i < len; i++) {
    var str = arr[i];
    var strlen = str.length;
    if (strlen == 1) {
      for (var k = 0; k < arrRslt.length; k++) {
        arrRslt[k] += str;
      }
    } else {
      var tmpArr = arrRslt.slice(0);
      arrRslt = [];
      for (k = 0; k < strlen; k++) {
        var tmp = tmpArr.slice(0);
        for (var j = 0; j < tmp.length; j++) {
          tmp[j] += str.charAt(k);
        }
        arrRslt = arrRslt.concat(tmp);
      }
    }
  }
  return arrRslt;
}
function makePy(str) {
  if (typeof str != "string")
    throw new Error("\u51FD\u6570makePy\u9700\u8981\u5B57\u7B26\u4E32\u7C7B\u578B\u53C2\u6570!");
  var arrResult = new Array();
  str = str.replace(/\s/g, "");
  for (var i = 0, len = str.length; i < len; i++) {
    var ch = str.charAt(i);
    arrResult.push(checkCh(ch));
  }
  return mkRslt(arrResult);
}
function accMul(arg1, arg2) {
  let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {
  }
  try {
    m += s2.split(".")[1].length;
  } catch (e) {
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
const cast = new Cast();
function to_string$1(value) {
  return cast.str(value);
}
function to_number$1(value) {
  return cast.num(value);
}
function to_integer$1(value, round = false) {
  let newValue = cast.num(value);
  return !round ? parseInt(newValue + "") : Math.round(newValue);
}
function to_float$1(value, decimal = 2, round = false) {
  let newValue = cast.num(value);
  if (round) {
    return +(+newValue).toFixed(decimal);
  }
  if (decimal > 2)
    decimal = 2;
  if (decimal < 1)
    decimal = 1;
  let strValue = newValue + "";
  let index = strValue.indexOf(".");
  if (index > -1) {
    strValue = strValue.substring(0, decimal + index + 1);
  } else {
    strValue += decimal === 2 ? ".00" : ".0";
  }
  return +strValue;
}
function to_cn_cent$1(value, round = false, reverse = false, decimal = 2) {
  let newValue;
  if (!reverse) {
    newValue = +to_float$1(value, 2, round) || 0;
    return parseInt(accMul(newValue, 100) + "") || 0;
  }
  newValue = to_integer$1(value);
  const yuan = newValue / 100;
  return !decimal ? yuan : yuan.toFixed(decimal);
}
function to_boolean$1(value) {
  return cast.bool(value);
}
function to_array$1(value) {
  return cast.arr(value);
}
function to_symbol$1(value) {
  return cast.symbol(value);
}
function to_undefined$1(value) {
  return cast.undef();
}
function to_null$1(value) {
  return cast.nul();
}
function to_cn_pinyin$1(value) {
  let newValue = cast.str(value);
  return makePy(newValue) || [];
}
function to_original$1(value) {
  return cast.unwrap(value);
}
var to = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  to_string: to_string$1,
  to_number: to_number$1,
  to_integer: to_integer$1,
  to_float: to_float$1,
  to_cn_cent: to_cn_cent$1,
  to_boolean: to_boolean$1,
  to_array: to_array$1,
  to_symbol: to_symbol$1,
  to_undefined: to_undefined$1,
  to_null: to_null$1,
  to_cn_pinyin: to_cn_pinyin$1,
  to_original: to_original$1
}, Symbol.toStringTag, { value: "Module" }));
function gen_uuid$1() {
  const s = [];
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    let start2 = Math.floor(Math.random() * 16);
    s[i] = hexDigits.substring(start2, start2 + 1);
  }
  s[14] = "4";
  let start = +s[19] & 3 | 8;
  s[19] = hexDigits.substring(start, start + 1);
  s[8] = s[13] = s[18] = s[23] = "-";
  const uuid = s.join("");
  return uuid;
}
function gen_random_integer$1(start, end) {
  start = start && +start ? +start : 0;
  end = end && +end ? +end : 10;
  if (end < start) {
    [start, end] = [end, start];
  }
  return Math.floor(Math.random() * (end - start)) + Math.min(start, end);
}
var gen = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  gen_uuid: gen_uuid$1,
  gen_random_integer: gen_random_integer$1
}, Symbol.toStringTag, { value: "Module" }));
const check$4 = new Check();
function fixIos(value) {
  if (value && check$4.str(value)) {
    return value.replace(/-/g, "/");
  }
  return value;
}
const d_day$1 = dayjs;
function d_time$1(value) {
  if (!value)
    return +Date.now();
  value = fixIos(value);
  return +new Date(value);
}
function d_timestamp$1(value) {
  return d_time$1(value);
}
function d_format$1(value, separator = "-") {
  if (!value) {
    value = d_time$1();
  }
  separator = separator.trim();
  value = fixIos(value);
  let date2 = new Date(+new Date(value));
  let Y = date2.getFullYear() + separator;
  let M = (date2.getMonth() + 1 < 10 ? "0" + (date2.getMonth() + 1) : date2.getMonth() + 1) + separator;
  let D = (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate()) + " ";
  let h = (date2.getHours() < 10 ? "0" + date2.getHours() : date2.getHours()) + ":";
  let m = (date2.getMinutes() < 10 ? "0" + date2.getMinutes() : date2.getMinutes()) + ":";
  let s = date2.getSeconds() < 10 ? "0" + date2.getSeconds() : date2.getSeconds();
  return Y + M + D + h + m + s;
}
function d_format_YMD$1(value, separator = "-") {
  return d_format$1(value, separator).split(" ")[0];
}
function d_diff$1(value1, value2, unit = "day") {
  const date1 = dayjs(value1);
  return date1.diff(value2, unit);
}
function d_dates_in_month$1(value, formatter) {
  const days = dayjs(value).daysInMonth();
  const dates = [];
  let i = 1;
  while (i <= days) {
    dates.push(dayjs(value).date(i).format(formatter));
    i++;
  }
  return dates;
}
var date = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  d_day: d_day$1,
  d_time: d_time$1,
  d_timestamp: d_timestamp$1,
  d_format: d_format$1,
  d_format_YMD: d_format_YMD$1,
  d_diff: d_diff$1,
  d_dates_in_month: d_dates_in_month$1
}, Symbol.toStringTag, { value: "Module" }));
const check$3 = new Check();
function wx_clone_deep$1(value) {
  return check$3.exception(() => JSON.parse(JSON.stringify(value)));
}
function wx_dataset$1(e, key) {
  return check$3.exception(() => {
    var _a, _b;
    if ((_a = e == null ? void 0 : e.currentTarget) == null ? void 0 : _a.dataset) {
      const dataset = e.currentTarget.dataset;
      if (check$3.undef(key) || check$3.nul(key))
        return dataset;
      return (_b = dataset[key]) != null ? _b : void 0;
    }
    return null;
  });
}
function wx_promisify$1(fn) {
  return check$3.exception(() => function(obj) {
    let args = [], len = arguments.length - 1;
    while (len-- > 0) {
      args[len] = arguments[len + 1];
    }
    if (obj === void 0)
      obj = {};
    return new Promise((resolve, reject) => {
      obj.success = (res) => {
        resolve(res);
      };
      obj.fail = (err) => {
        reject(err);
      };
      fn.apply(null, [obj].concat(args));
    });
  });
}
function wx_window_width$1() {
  return check$3.exception(() => parseInt(wx.getSystemInfoSync().windowWidth || 0));
}
function wx_window_height$1() {
  return check$3.exception(() => parseInt(wx.getSystemInfoSync().windowHeight || 0));
}
function wx_window_pixel_ratio$1() {
  return check$3.exception(() => parseInt(wx.getSystemInfoSync().pixelRatio || 0));
}
function wx_image_info_sync$1(path) {
  return check$3.exception(() => wx_promisify$1(wx.getImageInfo)({ src: path }));
}
function wx_file_info_sync$1(path) {
  return check$3.exception(() => wx_promisify$1(wx.getFileInfo)({ filePath: path }));
}
async function wx_refresh_data(handler, config) {
  return check$3.exception(async () => {
    var _a, _b, _c, _d, _e, _f, _g;
    const showLoading = (_a = config == null ? void 0 : config.show_loading) != null ? _a : false;
    const loadingTitle = (_b = config == null ? void 0 : config.loading_title) != null ? _b : "\u52A0\u8F7D\u4E2D";
    const loadingMask = (_c = config == null ? void 0 : config.loading_mask) != null ? _c : false;
    const back = (_d = config == null ? void 0 : config.back) != null ? _d : false;
    const delta = (_e = config == null ? void 0 : config.delta) != null ? _e : 1;
    const sync = (_f = config == null ? void 0 : config.sync) != null ? _f : false;
    const exclude = (_g = config == null ? void 0 : config.exclude) != null ? _g : [];
    if (showLoading)
      wx.showLoading({ title: loadingTitle, mask: loadingMask });
    const pages = getCurrentPages();
    const excludeIndex = exclude.map((idx) => idx >= 0 ? idx : pages.length + idx);
    let index = pages.length - 1;
    for (index; index >= 0; index--) {
      if (excludeIndex.includes(index))
        continue;
      const page = pages[index];
      let fnName = "";
      if (check$3.str(handler)) {
        fnName = handler;
        page[fnName] && check$3.fun(page[fnName]) && (!sync ? page[fnName]() : await page[fnName]());
      } else if (check$3.plainObj(handler)) {
        const { data, value, compare } = handler;
        if (!data || check$3.fun(page[data]))
          break;
        const dataKeys = data.split(".") || [];
        const compareKeys = [];
        const compareValues = [];
        let pageDataValue = page.data;
        let setDataKey = "";
        if (compare && check$3.plainObj(compare)) {
          Object.keys(compare).forEach((key) => {
            if (key) {
              const keys = key.split(".");
              compareKeys.push(keys);
              const value2 = compare[key];
              compareValues.push(Array.isArray(value2) ? value2 : [value2]);
            }
          });
        }
        if (dataKeys.length) {
          Array.from(dataKeys, (key, index2) => {
            if (Object.prototype.hasOwnProperty.call(pageDataValue, key)) {
              pageDataValue = pageDataValue[key];
              setDataKey += `${index2 !== 0 ? "." : ""}${key}`;
              if (Array.isArray(pageDataValue)) {
                let curIndex = /* @__PURE__ */ new Set();
                for (let i = 0; i < compareKeys.length; i++) {
                  for (let j = 0; j < pageDataValue.length; j++) {
                    if (pageDataValue[j][compareKeys[i][index2]] === compareValues[i][index2]) {
                      curIndex.add(j);
                      break;
                    }
                  }
                }
                if (curIndex.size < 2) {
                  if (curIndex.size === 1) {
                    const arr = Array.from(curIndex);
                    pageDataValue = pageDataValue[arr[0]];
                    setDataKey += `[${arr[0]}]`;
                  }
                } else {
                  pageDataValue = page.data;
                  setDataKey = "";
                  throw Error(`[wx_refresh_data] \u5BF9\u6BD4\u53C2\u6570\u5931\u8D25\uFF0C\u8BF7\u586B\u5199\u6B63\u786E\u7684\u53C2\u6570\u53CA\u503C\uFF01`);
                }
              }
            }
          });
        }
        if (setDataKey) {
          page.setData({
            [setDataKey]: value
          });
        }
      }
    }
    if (showLoading)
      wx.hideLoading();
    if (back)
      wx.navigateBack({ delta });
  });
}
var wx$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  wx_clone_deep: wx_clone_deep$1,
  wx_dataset: wx_dataset$1,
  wx_promisify: wx_promisify$1,
  wx_window_width: wx_window_width$1,
  wx_window_height: wx_window_height$1,
  wx_window_pixel_ratio: wx_window_pixel_ratio$1,
  wx_image_info_sync: wx_image_info_sync$1,
  wx_file_info_sync: wx_file_info_sync$1,
  wx_refresh_data
}, Symbol.toStringTag, { value: "Module" }));
const check$2 = new Check();
class Router {
  constructor() {
    this._pages = __wxConfig && __wxConfig.pages || [];
    this._tabbars = __wxConfig && __wxConfig.tabBar && __wxConfig.tabBar.list && __wxConfig.tabBar.list.length && __wxConfig.tabBar.list.map((_) => _.pagePath) || [];
    this._routes = {};
    this._route = null;
    Router.TABBAR_TAG = "@tabbar";
    Router.RELAUNCH_TAG = "@relaunch";
    this.pages2Routes();
  }
  get routes() {
    const temp = {};
    Object.keys(this._routes).forEach((key) => {
      if (key.indexOf(Router.TABBAR_TAG) === -1) {
        temp[key] = this._routes[key];
      }
    });
    return temp;
  }
  get route() {
    return this._route;
  }
  firstUpper(value) {
    value = value + "";
    return value.length > 1 ? value[0].toUpperCase() + value.slice(1).toLowerCase() : value.toUpperCase();
  }
  path2Camel(value) {
    value = value + "";
    return value.replace(/([^_-])(?:[_-]+([^_-]))/g, (_$0, $1, $2) => $1 + $2.toUpperCase()).replace(/[_-]*/g, "");
  }
  path2Join(path) {
    if (path[0] === "/") {
      path = path.substring(1);
    }
    let arrPath = path.split("/");
    arrPath.splice(arrPath.length - 1, 1);
    arrPath = arrPath.map((_) => this.firstUpper(_));
    arrPath = arrPath.map((_) => this.path2Camel(_));
    return arrPath.join("");
  }
  path2ConcatParam(path, params) {
    if (!path || !params || !check$2.plainObj(params)) {
      return path;
    }
    if (path.indexOf("?") > 0 || path.indexOf("&") > 0 || path.indexOf("=") > 0) {
      return path;
    }
    let newPath = path + "?";
    Object.keys(params).forEach((key, index, keys) => {
      newPath += `${key}=${params[key]}${index !== keys.length - 1 ? "&" : ""}`;
    });
    return newPath;
  }
  path2Check(path) {
    path = path + "";
    let isRelaunch = path.indexOf(Router.RELAUNCH_TAG) > -1;
    if (isRelaunch) {
      path = path.replace(Router.RELAUNCH_TAG, "");
    }
    let newPath = this._routes[path] || this._routes[path + Router.TABBAR_TAG] || path;
    let isTabbar = !!this._routes[path + Router.TABBAR_TAG] || path.indexOf(Router.TABBAR_TAG) > -1;
    return { newPath: newPath.replace(Router.TABBAR_TAG, ""), isTabbar, isRelaunch };
  }
  container4Callback(successCallback, failCallback, completeCallback) {
    return {
      success: (res) => {
        successCallback && check$2.fun(successCallback) && successCallback(res);
      },
      fail: (err) => {
        failCallback && check$2.fun(failCallback) && failCallback(err);
      },
      complete: (res) => {
        completeCallback && check$2.fun(completeCallback) && completeCallback(res);
      }
    };
  }
  log4Route(path, params) {
    if (!path)
      return;
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    this._route = {
      from: page.route,
      to: typeof path === "number" ? pages[pages.length - path < 0 ? 0 : pages.length - path].route : path,
      params
    };
  }
  pages2Routes() {
    let tabbarRoutes = [];
    if (this._tabbars.length) {
      let i = -1, l = this._tabbars.length;
      while (++i < l) {
        tabbarRoutes.push(this.path2Join(this._tabbars[i]));
      }
    }
    if (this._pages.length) {
      let i = 0, l = this._pages.length;
      for (; i < l; i++) {
        let route, page;
        route = page = this._pages[i];
        route = this.path2Join(route);
        Object.assign(this._routes, {
          [route]: "/" + page
        });
        if (tabbarRoutes.includes(route)) {
          Object.assign(this._routes, {
            [route + Router.TABBAR_TAG]: "/" + page
          });
        }
      }
    } else {
      console.warn("[wx_router] Unable to get `pages` from app.json, url is needed!");
    }
  }
  push(path, params, successCallback, failCallback, completeCallback) {
    if (!path)
      return;
    const { newPath, isTabbar } = this.path2Check(path);
    this.log4Route(newPath, params);
    (!isTabbar ? wx.navigateTo : wx.switchTab)({
      url: !isTabbar ? this.path2ConcatParam(newPath, params) : newPath,
      ...this.container4Callback(successCallback, failCallback, completeCallback)
    });
  }
  replace(path, params, successCallback, failCallback, completeCallback) {
    if (!path)
      return;
    const { newPath, isTabbar, isRelaunch } = this.path2Check(path);
    this.log4Route(newPath, params);
    (!isRelaunch ? wx.redirectTo : wx.reLaunch)({
      url: !isTabbar ? this.path2ConcatParam(newPath, params) : newPath,
      ...this.container4Callback(successCallback, failCallback, completeCallback)
    });
  }
  back(delta, successCallback, failCallback, completeCallback) {
    if (!check$2.num(delta) || delta && delta < 1) {
      delta = 1;
    }
    this.log4Route(delta || 1, null);
    wx.navigateBack({
      delta,
      ...this.container4Callback(successCallback, failCallback, completeCallback)
    });
  }
}
const wx_router$1 = check$2.exception(() => new Router());
var wxRouter = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  wx_router: wx_router$1
}, Symbol.toStringTag, { value: "Module" }));
const check$1 = new Check();
const responseViewConfig = {
  view_key_prefix: "$",
  show_loading: true,
  loading_title: "\u52A0\u8F7D\u4E2D",
  loading_mask: true,
  show_success_toast: true,
  success_toast_title: "\u63D0\u4EA4\u6210\u529F",
  show_fail_toast: false,
  fail_toast_title: "\u63D0\u4EA4\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"
};
class ResponseView$1 {
  constructor(key, config) {
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    if (!page || !key) {
      throw Error(`[ResponseView] ${!page ? "Page" : "Key"} not found!`);
    }
    this.page = page;
    this.config = Object.assign(JSON.parse(JSON.stringify(responseViewConfig)), config);
    this.objKey = key;
    this.objInitialValue = this.page.data[key];
    this.viewKey = this.config.view_key_prefix + key;
    this.viewValue = this.resetViewValue();
    if (this.page.data[this.viewKey] = {}) {
      this.page.data[this.viewKey] = this.viewValue;
    }
    this.toastDuration = 1500;
  }
  resetObjValue() {
    return typeof this.objInitialValue === "object" ? JSON.parse(JSON.stringify(this.objInitialValue)) : this.objInitialValue;
  }
  resetViewValue() {
    return {
      reqPage: 1,
      reqLoading: false,
      empty: false,
      last: false,
      total: 0
    };
  }
  get showLoading() {
    return wx.showLoading({
      title: this.config.loading_title || "\u52A0\u8F7D\u4E2D",
      mask: this.config.loading_mask
    });
  }
  get hideLoading() {
    return wx.hideLoading();
  }
  get showNavigationBarLoading() {
    return wx.showNavigationBarLoading();
  }
  get hideNavigationBarLoading() {
    return wx.hideNavigationBarLoading();
  }
  get startPullDownRefresh() {
    return wx.startPullDownRefresh();
  }
  get stopPullDownRefresh() {
    return wx.stopPullDownRefresh();
  }
  get reqLoading() {
    return this.viewValue.reqLoading;
  }
  set reqLoading(state) {
    this.viewValue.reqLoading = state;
  }
  get reqPage() {
    return this.viewValue.reqPage;
  }
  set reqPage(page) {
    this.viewValue.reqPage = page;
  }
  get empty() {
    return this.viewValue.empty;
  }
  set empty(state) {
    this.viewValue.empty = state;
  }
  get last() {
    return this.viewValue.last;
  }
  set last(state) {
    this.viewValue.last = state;
  }
  get total() {
    return this.viewValue.total;
  }
  set total(num) {
    this.viewValue.total = num;
  }
  get clear() {
    this.page.data[this.objKey] = this.resetObjValue();
    this.page.data[this.viewKey] = this.viewValue = this.resetViewValue();
    return true;
  }
  async get(sendRequest, successCallback, failCallback, reachBottom = false) {
    var _a, _b, _c;
    if (reachBottom && (this.empty || this.last))
      return;
    if (this.reqLoading)
      return;
    this.reqLoading = true;
    !reachBottom ? this.clear : this.reqPage = this.reqPage + 1;
    this.config.show_loading && this.showLoading;
    const viewValueSuccessHook = (res2) => {
      var _a2, _b2, _c2, _d, _e;
      const resData = (_c2 = (_b2 = (_a2 = res2.data) == null ? void 0 : _a2.data) != null ? _b2 : res2.data) != null ? _c2 : res2;
      const isList = Array.isArray(resData);
      let total = isList ? (_e = (_d = res2.total) != null ? _d : resData == null ? void 0 : resData.length) != null ? _e : 0 : !!resData ? 1 : 0;
      let isEmpty = !total && this.reqPage === 1;
      let isLast = isList ? this.reqPage > 1 && !(resData == null ? void 0 : resData.length) : true;
      this.empty = isEmpty;
      this.last = isLast;
      this.total = total;
      this.page.setData({
        [`${this.viewKey}.empty`]: isEmpty,
        [`${this.viewKey}.last`]: isLast
      });
    };
    const viewValueFailHook = () => {
      this.empty = true;
      this.last = false;
      this.total = 0;
      this.page.setData({
        [`${this.viewKey}.empty`]: true,
        [`${this.viewKey}.last`]: false
      });
    };
    let res = null;
    try {
      sendRequest && (res = await sendRequest(this.reqPage), this.hideLoading, this.reqLoading = false);
      if (check$1.nul(res) || check$1.undef(res)) {
        viewValueFailHook();
        failCallback && failCallback(res);
      } else {
        const resData = (_c = (_b = (_a = res.data) == null ? void 0 : _a.data) != null ? _b : res.data) != null ? _c : res;
        this.page.setData({
          [this.objKey]: !reachBottom ? resData : this.page.data[this.objKey].concat(resData)
        });
        viewValueSuccessHook(res);
        successCallback && successCallback(res);
        console.log("[ResponseView] get \u{1F447}");
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        console.log(`${this.objKey} `, this.page.data[this.objKey]);
        console.log(`${this.viewKey} `, this.page.data[this.viewKey]);
        console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      }
    } catch (error) {
      console.error(`[ResponseView] ${error}`);
      this.config.show_loading && this.hideLoading;
      this.reqLoading = false;
      viewValueFailHook();
      failCallback && failCallback(error);
    }
  }
  async fetch(sendRequest, successCallback, failCallback, reachBottom = false) {
    this.get(sendRequest, successCallback, failCallback, reachBottom);
  }
  async fetchList(sendRequest, successCallback, failCallback, reachBottom = false) {
    this.get(sendRequest, successCallback, failCallback, reachBottom);
  }
  async common(sendRequest, successCallback, failCallback) {
    if (this.reqLoading)
      return;
    this.reqLoading = true;
    this.config.show_loading && this.showLoading;
    let res = null;
    try {
      sendRequest && (res = await sendRequest(), this.hideLoading, this.reqLoading = false);
      if (check$1.nul(res) || check$1.undef(res) || res === false) {
        if (this.config.show_fail_toast) {
          wx.showToast({
            title: this.config.fail_toast_title || "\u63D0\u4EA4\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",
            icon: "none",
            duration: this.toastDuration
          });
          setTimeout(() => {
            failCallback && failCallback(res);
          }, this.toastDuration);
        } else {
          failCallback && failCallback(res);
        }
      } else {
        if (this.config.show_success_toast) {
          wx.showToast({
            title: this.config.success_toast_title || "\u63D0\u4EA4\u6210\u529F",
            icon: "success",
            duration: this.toastDuration
          });
          setTimeout(() => {
            successCallback && successCallback(res);
          }, this.toastDuration);
        } else {
          successCallback && successCallback(res);
        }
      }
    } catch (error) {
      console.error(`[ResponseView] ${error}`);
      this.config.show_loading && this.hideLoading;
      this.reqLoading = false;
      if (this.config.show_fail_toast) {
        wx.showToast({
          title: this.config.fail_toast_title || "\u63D0\u4EA4\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5",
          icon: "none",
          duration: this.toastDuration
        });
        setTimeout(() => {
          failCallback && failCallback(error);
        }, this.toastDuration);
      } else {
        failCallback && failCallback(error);
      }
    }
  }
  async post(sendRequest, successCallback, failCallback) {
    this.common(sendRequest, successCallback, failCallback);
  }
  put(sendRequest, successCallback, failCallback) {
    this.common(sendRequest, successCallback, failCallback);
  }
  delete(sendRequest, successCallback, failCallback) {
    this.common(sendRequest, successCallback, failCallback);
  }
}
var wxResponsiveView = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ResponseView: ResponseView$1
}, Symbol.toStringTag, { value: "Module" }));
const check = new Check();
class Authorize {
  constructor() {
    this.scopeNames = [
      "userLocation",
      "userLocationBackground",
      "record",
      "camera",
      "bluetooth",
      "writePhotosAlbum",
      "addPhoneContact",
      "addPhoneCalendar",
      "werun"
    ];
    this.init();
  }
  get page() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
  }
  init() {
    this.scopeMap = Array.from({ length: this.scopeNames.length }, () => []);
    Array.from(this.scopeNames, (scopeName, index) => {
      this.scopeMap[index] = this.genCharCode(scopeName);
    });
  }
  genCharCode(value) {
    if (!value)
      return [];
    const tempArr = Array.from({ length: 26 }, () => 0);
    let i = -1;
    while (++i < value.length) {
      tempArr[value[i].toLowerCase().charCodeAt(0) - "a".charCodeAt(0)] += 1;
    }
    return tempArr;
  }
  compare(value) {
    if (!value) {
      throw Error(`scope "${value ? value : ""}" not found, do you mean "${this.scopeNames[0]}"?`);
    }
    if (this.scopeNames.includes(value))
      return;
    let vCharCode = this.genCharCode(value), dif = 0, minDif = 0, nearest = "";
    Array.from(this.scopeMap, (charCode, index) => {
      dif = 0;
      for (let i = 0; i < 26; i++) {
        dif += Math.abs(charCode[i] - vCharCode[i]);
      }
      let illegal = value.match(/[^a-zA-Z]*/g);
      if (illegal && illegal.length) {
        dif += illegal.join("").length;
      }
      minDif = !minDif ? dif : Math.min(dif, minDif);
      nearest = Math.min(dif, minDif) === dif ? this.scopeNames[index] : nearest;
    });
    throw Error(`scope "${value}" not found, do you mean "${nearest}"?`);
  }
  authStateSettle(scopeName, state) {
    this.page.setData({ [scopeName + "Auth"]: state });
  }
  recheck(scopeName, successCallback, failCallback) {
    this.compare(scopeName);
    const scope = "scope." + scopeName;
    wx.getSetting({
      success: (settingRes) => {
        if (settingRes.authSetting[scope]) {
          this.authStateSettle(scopeName, true);
          successCallback && successCallback(settingRes);
          return;
        }
        wx.openSetting({
          success: (authRes) => {
            this.authStateSettle(scopeName, true);
            successCallback && successCallback(authRes);
          },
          fail: (error) => {
            this.authStateSettle(scopeName, false);
            failCallback && failCallback(error);
          }
        });
      },
      fail: (settingError) => {
        this.authStateSettle(scopeName, false);
        failCallback && failCallback(settingError);
      }
    });
  }
  opensetting(e, scopeName, successCallback, failCallback) {
    this.compare(scopeName);
    const scope = "scope." + scopeName;
    if (e.detail.authSetting[scope]) {
      this.authStateSettle(scopeName, true);
      successCallback && successCallback("");
    } else {
      this.authStateSettle(scopeName, false);
      failCallback && failCallback("");
    }
  }
  check(scopeName, successCallback, failCallback) {
    this.compare(scopeName);
    const scope = "scope." + scopeName;
    wx.getSetting({
      success: (settingRes) => {
        if (settingRes.authSetting[scope]) {
          this.authStateSettle(scopeName, true);
          successCallback && successCallback(settingRes);
          return;
        }
        wx.authorize({
          scope,
          success: (authRes) => {
            this.authStateSettle(scopeName, true);
            successCallback && successCallback(authRes);
          },
          fail: (error) => {
            this.authStateSettle(scopeName, false);
            failCallback && failCallback(error);
          }
        });
      },
      fail: (settingError) => {
        this.authStateSettle(scopeName, false);
        failCallback && failCallback(settingError);
      }
    });
  }
  auth(e, scopeName, successCallback, failCallback) {
    if (check.str(e)) {
      e = null;
      scopeName = e;
      this.recheck(scopeName, successCallback, failCallback);
      return;
    }
    let _scopeName = scopeName;
    if (check.obj(e)) {
      if (!scopeName || check.fun(scopeName)) {
        _scopeName = e.currentTarget.dataset.scope;
      }
      !e.detail.authSetting ? this.recheck(_scopeName, successCallback, failCallback) : this.opensetting(e, _scopeName, successCallback, failCallback);
    }
  }
}
const wx_authorize$1 = check.exception(() => new Authorize());
var wxAuthorize = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  wx_authorize: wx_authorize$1
}, Symbol.toStringTag, { value: "Module" }));
const {
  wow_array
} = wow;
const {
  is_string,
  is_number,
  is_integer,
  is_positive_integer,
  is_float,
  is_positive_float,
  is_boolean,
  is_array,
  is_array_like,
  is_object,
  is_plain_object,
  is_object_like,
  is_symbol,
  is_function,
  is_NaN,
  is_undefined,
  is_null,
  is_length,
  is_arguments,
  is_error,
  is_falsy,
  is_equal,
  is_leap_year,
  is_email,
  is_url,
  is_cn_phone_number,
  is_cn_id_card,
  is_today,
  is_today_before,
  is_today_after
} = is;
const {
  to_string,
  to_number,
  to_integer,
  to_float,
  to_boolean,
  to_array,
  to_symbol,
  to_undefined,
  to_null,
  to_original,
  to_cn_cent,
  to_cn_pinyin
} = to;
const {
  gen_uuid,
  gen_random_integer
} = gen;
const {
  d_day,
  d_time,
  d_timestamp,
  d_format,
  d_format_YMD,
  d_diff,
  d_dates_in_month
} = date;
const {
  wx_clone_deep,
  wx_dataset,
  wx_promisify,
  wx_window_width,
  wx_window_height,
  wx_window_pixel_ratio,
  wx_image_info_sync,
  wx_file_info_sync
} = wx$1;
const {
  wx_router
} = wxRouter;
const {
  wx_authorize
} = wxAuthorize;
const {
  ResponseView
} = wxResponsiveView;
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, 'ResponseView', { enumerable: true, configurable: true, get: function() { return ResponseView; } });Object.defineProperty(exports, 'd_dates_in_month', { enumerable: true, configurable: true, get: function() { return d_dates_in_month; } });Object.defineProperty(exports, 'd_day', { enumerable: true, configurable: true, get: function() { return d_day; } });Object.defineProperty(exports, 'd_diff', { enumerable: true, configurable: true, get: function() { return d_diff; } });Object.defineProperty(exports, 'd_format', { enumerable: true, configurable: true, get: function() { return d_format; } });Object.defineProperty(exports, 'd_format_YMD', { enumerable: true, configurable: true, get: function() { return d_format_YMD; } });Object.defineProperty(exports, 'd_time', { enumerable: true, configurable: true, get: function() { return d_time; } });Object.defineProperty(exports, 'd_timestamp', { enumerable: true, configurable: true, get: function() { return d_timestamp; } });Object.defineProperty(exports, 'gen_random_integer', { enumerable: true, configurable: true, get: function() { return gen_random_integer; } });Object.defineProperty(exports, 'gen_uuid', { enumerable: true, configurable: true, get: function() { return gen_uuid; } });Object.defineProperty(exports, 'is_NaN', { enumerable: true, configurable: true, get: function() { return is_NaN; } });Object.defineProperty(exports, 'is_arguments', { enumerable: true, configurable: true, get: function() { return is_arguments; } });Object.defineProperty(exports, 'is_array', { enumerable: true, configurable: true, get: function() { return is_array; } });Object.defineProperty(exports, 'is_array_like', { enumerable: true, configurable: true, get: function() { return is_array_like; } });Object.defineProperty(exports, 'is_boolean', { enumerable: true, configurable: true, get: function() { return is_boolean; } });Object.defineProperty(exports, 'is_cn_id_card', { enumerable: true, configurable: true, get: function() { return is_cn_id_card; } });Object.defineProperty(exports, 'is_cn_phone_number', { enumerable: true, configurable: true, get: function() { return is_cn_phone_number; } });Object.defineProperty(exports, 'is_email', { enumerable: true, configurable: true, get: function() { return is_email; } });Object.defineProperty(exports, 'is_equal', { enumerable: true, configurable: true, get: function() { return is_equal; } });Object.defineProperty(exports, 'is_error', { enumerable: true, configurable: true, get: function() { return is_error; } });Object.defineProperty(exports, 'is_falsy', { enumerable: true, configurable: true, get: function() { return is_falsy; } });Object.defineProperty(exports, 'is_float', { enumerable: true, configurable: true, get: function() { return is_float; } });Object.defineProperty(exports, 'is_function', { enumerable: true, configurable: true, get: function() { return is_function; } });Object.defineProperty(exports, 'is_integer', { enumerable: true, configurable: true, get: function() { return is_integer; } });Object.defineProperty(exports, 'is_leap_year', { enumerable: true, configurable: true, get: function() { return is_leap_year; } });Object.defineProperty(exports, 'is_length', { enumerable: true, configurable: true, get: function() { return is_length; } });Object.defineProperty(exports, 'is_null', { enumerable: true, configurable: true, get: function() { return is_null; } });Object.defineProperty(exports, 'is_number', { enumerable: true, configurable: true, get: function() { return is_number; } });Object.defineProperty(exports, 'is_object', { enumerable: true, configurable: true, get: function() { return is_object; } });Object.defineProperty(exports, 'is_object_like', { enumerable: true, configurable: true, get: function() { return is_object_like; } });Object.defineProperty(exports, 'is_plain_object', { enumerable: true, configurable: true, get: function() { return is_plain_object; } });Object.defineProperty(exports, 'is_positive_float', { enumerable: true, configurable: true, get: function() { return is_positive_float; } });Object.defineProperty(exports, 'is_positive_integer', { enumerable: true, configurable: true, get: function() { return is_positive_integer; } });Object.defineProperty(exports, 'is_string', { enumerable: true, configurable: true, get: function() { return is_string; } });Object.defineProperty(exports, 'is_symbol', { enumerable: true, configurable: true, get: function() { return is_symbol; } });Object.defineProperty(exports, 'is_today', { enumerable: true, configurable: true, get: function() { return is_today; } });Object.defineProperty(exports, 'is_today_after', { enumerable: true, configurable: true, get: function() { return is_today_after; } });Object.defineProperty(exports, 'is_today_before', { enumerable: true, configurable: true, get: function() { return is_today_before; } });Object.defineProperty(exports, 'is_undefined', { enumerable: true, configurable: true, get: function() { return is_undefined; } });Object.defineProperty(exports, 'is_url', { enumerable: true, configurable: true, get: function() { return is_url; } });Object.defineProperty(exports, 'to_array', { enumerable: true, configurable: true, get: function() { return to_array; } });Object.defineProperty(exports, 'to_boolean', { enumerable: true, configurable: true, get: function() { return to_boolean; } });Object.defineProperty(exports, 'to_cn_cent', { enumerable: true, configurable: true, get: function() { return to_cn_cent; } });Object.defineProperty(exports, 'to_cn_pinyin', { enumerable: true, configurable: true, get: function() { return to_cn_pinyin; } });Object.defineProperty(exports, 'to_float', { enumerable: true, configurable: true, get: function() { return to_float; } });Object.defineProperty(exports, 'to_integer', { enumerable: true, configurable: true, get: function() { return to_integer; } });Object.defineProperty(exports, 'to_null', { enumerable: true, configurable: true, get: function() { return to_null; } });Object.defineProperty(exports, 'to_number', { enumerable: true, configurable: true, get: function() { return to_number; } });Object.defineProperty(exports, 'to_original', { enumerable: true, configurable: true, get: function() { return to_original; } });Object.defineProperty(exports, 'to_string', { enumerable: true, configurable: true, get: function() { return to_string; } });Object.defineProperty(exports, 'to_symbol', { enumerable: true, configurable: true, get: function() { return to_symbol; } });Object.defineProperty(exports, 'to_undefined', { enumerable: true, configurable: true, get: function() { return to_undefined; } });Object.defineProperty(exports, 'wow_array', { enumerable: true, configurable: true, get: function() { return wow_array; } });Object.defineProperty(exports, 'wx_authorize', { enumerable: true, configurable: true, get: function() { return wx_authorize; } });Object.defineProperty(exports, 'wx_clone_deep', { enumerable: true, configurable: true, get: function() { return wx_clone_deep; } });Object.defineProperty(exports, 'wx_dataset', { enumerable: true, configurable: true, get: function() { return wx_dataset; } });Object.defineProperty(exports, 'wx_file_info_sync', { enumerable: true, configurable: true, get: function() { return wx_file_info_sync; } });Object.defineProperty(exports, 'wx_image_info_sync', { enumerable: true, configurable: true, get: function() { return wx_image_info_sync; } });Object.defineProperty(exports, 'wx_promisify', { enumerable: true, configurable: true, get: function() { return wx_promisify; } });Object.defineProperty(exports, 'wx_router', { enumerable: true, configurable: true, get: function() { return wx_router; } });Object.defineProperty(exports, 'wx_window_height', { enumerable: true, configurable: true, get: function() { return wx_window_height; } });Object.defineProperty(exports, 'wx_window_pixel_ratio', { enumerable: true, configurable: true, get: function() { return wx_window_pixel_ratio; } });Object.defineProperty(exports, 'wx_window_width', { enumerable: true, configurable: true, get: function() { return wx_window_width; } });

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1678787898027);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map