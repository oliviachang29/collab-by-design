// unveil2.js - 2.0.7 - https://nabble.github.io/unveil2/
!(function (a) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : "undefined" != typeof exports
    ? (module.exports = a(require("jquery")))
    : a(jQuery);
})(function (a) {
  "use strict";
  var b = "unveil",
    c = "." + b,
    d = "src",
    e = "placeholder";
  a.fn.unveil = function (f) {
    function g(a) {
      a.removeClass(b + "-" + e + " " + b + "-loading"), a.addClass(b + "-loaded");
    }
    function h() {
      var b = a(this);
      if (!b.is(":hidden")) {
        var c = { top: 0 - q.offset, bottom: n.height() + q.offset },
          d = q.container[0] !== n[0],
          e = this.getBoundingClientRect();
        if (d) {
          var f = q.container[0].getBoundingClientRect();
          if (i(c, f)) {
            var g = f.top - q.offset,
              h = f.bottom + q.offset,
              j = { top: g > c.top ? g : c.top, bottom: h < c.bottom ? h : c.bottom };
            return i(j, e);
          }
          return !1;
        }
        return i(c, e);
      }
    }
    function i(a, b) {
      return b.bottom >= a.top && b.top <= a.bottom;
    }
    function j() {
      (o = n.height()), l();
    }
    function k(a) {
      var b = !1;
      return function () {
        b ||
          ((b = !0),
          setTimeout(function () {
            a(), (b = !1);
          }, q.throttle));
      };
    }
    function l() {
      if ((q.debug, r.images)) {
        var a = r.images.filter(h);
        a.trigger(b + c), (r.images = r.images.not(a)), a.length && q.debug;
      }
    }
    function m() {
      q.container.off(c), r.images.off(c), q.container.data(b, null), (r.initialized = !1), (r.images = null);
    }
    f = f || {};
    var n = a(window),
      o = n.height(),
      p = {
        placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        offset: 0,
        breakpoints: [],
        throttle: 250,
        debug: !1,
        attribute: d,
        container: n,
        retina: window.devicePixelRatio > 1,
        loading: null,
        loaded: null,
      },
      q = a.extend(!0, {}, p, f);
    q.debug,
      q.breakpoints.sort(function (a, b) {
        return b.minWidth - a.minWidth;
      });
    var r = q.container.data(b);
    return (
      r || ((r = { images: a(), initialized: !1 }), q.container.data(b, r)),
      this.one(b + c, function () {
        var e,
          f,
          h,
          i,
          j = a(this),
          k = n.width(),
          m = q.attribute;
        for (e = 0; e < q.breakpoints.length; e++) {
          var o = q.breakpoints[e].attribute.replace(/^data-/, "");
          if (k >= q.breakpoints[e].minWidth && j.data(o)) {
            m = o;
            break;
          }
        }
        (h = i = j.data(m)),
          h && -1 !== h.indexOf("|") && ((i = h.split("|")[1]), (h = h.split("|")[0])),
          h &&
            ((f = q.retina && i ? i : h),
            q.debug,
            j.addClass(b + "-loading"),
            "function" == typeof q.loading && q.loading.call(this),
            j.trigger("loading" + c),
            j.one("load" + c, function () {
              g(j), "function" == typeof q.loaded && q.loaded.call(this), j.trigger("loaded" + c), l();
            }),
            "IMG" === this.nodeName
              ? j.prop(d, f)
              : a("<img/>")
                  .attr(d, f)
                  .one("load" + c, function () {
                    a(this).remove(), j.css("backgroundImage", "url(" + f + ")").trigger("load" + c);
                  }),
            this.complete && g(j));
      }),
      this.one("destroy" + c, function () {
        a(this).off(c), r.images && ((r.images = r.images.not(this)), r.images.length || m());
      }),
      this.each(function () {
        var f = a(this),
          g = f.data(d + "-" + e) || q.placeholder;
        (r.images = a(r.images).add(this)),
          f.data(b) ||
            (f.data(b, !0),
            f.data(q.attribute) || f.data(q.attribute, f.prop(q.attribute)),
            f
              .one("load" + c, function () {
                var c = a(this);
                c.hasClass(b + "-loaded") || (c.addClass(b + "-" + e), l());
              })
              .prop(d, "")
              .prop(d, g));
      }),
      q.debug,
      r.initialized ||
        (q.container
          .on("resize" + c, k(j))
          .on("scroll" + c, k(l))
          .on("lookup" + c, l)
          .on("destroy" + c, m),
        (r.initialized = !0)),
      setTimeout(l, 0),
      this
    );
  };
});
