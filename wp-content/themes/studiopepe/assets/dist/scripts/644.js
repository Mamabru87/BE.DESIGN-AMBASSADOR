"use strict";
(self.webpackChunk = self.webpackChunk || []).push([
    [644], {
        644: function(t, e, r) {
            var o = r(914);
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.init = void 0;
            var n = o(r(985)),
                l = r(667),
                i = r(357);

            function c(t, e) {
                var r = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
                if (!r) {
                    if (Array.isArray(t) || (r = function(t, e) {
                            if (!t) return;
                            if ("string" == typeof t) return u(t, e);
                            var r = Object.prototype.toString.call(t).slice(8, -1);
                            "Object" === r && t.constructor && (r = t.constructor.name);
                            if ("Map" === r || "Set" === r) return Array.from(t);
                            if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return u(t, e)
                        }(t)) || e && t && "number" == typeof t.length) {
                        r && (t = r);
                        var o = 0,
                            n = function() {};
                        return {
                            s: n,
                            n: function() {
                                return o >= t.length ? {
                                    done: !0
                                } : {
                                    done: !1,
                                    value: t[o++]
                                }
                            },
                            e: function(t) {
                                throw t
                            },
                            f: n
                        }
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
                var l, i = !0,
                    c = !1;
                return {
                    s: function() {
                        r = r.call(t)
                    },
                    n: function() {
                        var t = r.next();
                        return i = t.done, t
                    },
                    e: function(t) {
                        c = !0, l = t
                    },
                    f: function() {
                        try {
                            i || null == r.return || r.return()
                        } finally {
                            if (c) throw l
                        }
                    }
                }
            }

            function u(t, e) {
                (null == e || e > t.length) && (e = t.length);
                for (var r = 0, o = new Array(e); r < e; r++) o[r] = t[r];
                return o
            }
            l.gsap.registerPlugin(i.ScrollTrigger);
            e.init = function(t) {
                var e = new n.default({
                    el: document.querySelector(".smooth-scroll"),
                    smooth: t,
                    getDirection: !0,
                    smoothMobile: 0,
                    multiplier: .5,
                    lerp: .08,
                    mobile: {
                        smooth: !1
                    },
                    tablet: {
                        smooth: !1
                    }
                });
                e.on("scroll", (function(t) {
                    var e = t.limit,
                        r = t.scroll;
                    r.y, e.y;
                    r.y > 300 ? document.body.classList.add("show-top") : document.body.classList.remove("show-top"), i.ScrollTrigger.update
                })), i.ScrollTrigger.scrollerProxy(".smooth-scroll", {
                    scrollTop: function(t) {
                        return arguments.length ? e.scrollTo(t, 0, 0) : e.scroll.instance.scroll.y
                    },
                    getBoundingClientRect: function() {
                        return {
                            top: 0,
                            left: 0,
                            width: window.innerWidth,
                            height: window.innerHeight
                        }
                    },
                    pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
                }), e.on("scroll", (function(t) {
                    document.documentElement.setAttribute("data-direction", t.direction), i.ScrollTrigger.update()
                })), i.ScrollTrigger.addEventListener("refresh", (function() {
                    return e.update()
                })), i.ScrollTrigger.refresh(), document.addEventListener("blockSmoothScroll", (function(t) {
                    t.detail ? e.stop() : e.start()
                }));
                var r = document.querySelectorAll(".StopSrollonHover");
                if (r.length > 0) {
                    var o, l = c(r);
                    try {
                        for (l.s(); !(o = l.n()).done;) {
                            var u = o.value;
                            u.onmouseover = function() {
                                e.stop()
                            }, u.onmouseout = function() {
                                e.start()
                            }
                        }
                    } catch (t) {
                        l.e(t)
                    } finally {
                        l.f()
                    }
                }
                document.addEventListener("smoothScrollTo", (function(t) {
                    e.scrollTo(t.detail.element, {
                        duration: t.detail.duration,
                        offset: t.detail.offset,
                        disableLerp: !0
                    })
                })), document.addEventListener("smoothScrollUpdate", (function() {
                    e.update(), i.ScrollTrigger.refresh()
                }))
            }
        }
    }
]);
//# sourceMappingURL=644.js.map?v=1742551320349