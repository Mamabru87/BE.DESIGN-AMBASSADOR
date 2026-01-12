(self.webpackChunk = self.webpackChunk || []).push([
    [608], {
        608: function(e, t, n) {
            "use strict";
            var o = n(914);
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.homepage = void 0;
            var a = n(667),
                r = n(357),
                i = o(n(108));
            a.gsap.registerPlugin(r.ScrollTrigger);
            var s = function() {
                    return n.e(603).then(n.bind(n, 603))
                },
                c = function() {
                    return n.e(338).then(n.bind(n, 338))
                },
                l = document.querySelector(".smooth-scroll");
            t.homepage = function() {
                function e() {
                    r.ScrollTrigger.refresh(), s().then((function(e) {
                        return e.smoothScrollUpdate()
                    }))
                }
                var t;

                function o() {
                    $(".intro-image.active").next(".intro-image").length ? $(".intro-image.active").removeClass("active").next(".intro-image").addClass("active") : ($(".intro-image.active").removeClass("active"), $(".intro-image:first-of-type").addClass("active")), t = setTimeout((function() {
                        o()
                    }), 1200)
                }

                function u() {
                    $(".category-to-select.button--active").length ? ($(".wall-element").addClass("hidden"), $(".category-to-select.button--active").each((function(e) {
                        var t = $(this).attr("data-id");
                        $(".wall-element").each((function(e) {
                            var n = $(this).attr("data-id");
                            console.log(n, t), n.includes(t) && $(this).removeClass("hidden")
                        }))
                    }))) : $(".wall-element").removeClass("hidden"), e();
                    Promise.resolve().then(n.t.bind(n, 108, 23)).then((function() {
                        new i.default({
                            elements_selector: ".lazy",
                            threshold: 600,
                            thresholds: "800px 15%"
                        })
                    }))
                }
                $("#search,#search-mobile").click((function() {
                    $("html").toggleClass("searchout"), $("html").hasClass("searchout") && $("#search-input").focus()
                })), window.addEventListener("pageshow", (function(e) {
                    e.persisted && $("#body-hider").removeClass("link-clicked")
                })), $("select[name='profession']").change((function() {
                    var e = $(this).val(),
                        t = ($("option:selected", this).attr("data-url"), $(".lets-keep-in form").attr("action")),
                        n = t.split("/"),
                        o = n[n.length - 1],
                        a = t.replace(o, e);
                    $("input[name='formId']").val(e), $(".lets-keep-in form").attr("action", a)
                })), $(window).width() < 769 && $(".header-newsletter").click((function() {
                    $(".lets-keep-in").toggleClass("open");
                    var t = $(".lets-keep-in").hasClass("open");
                    a.gsap.to($("#newsletter"), {
                        height: t ? "auto" : 0,
                        duration: .7,
                        ease: "ease.out",
                        onComplete: function() {
                            return e()
                        }
                    })
                })), $("#search-input").keyup((function(e) {
                    if (13 === e.keyCode) {
                        $("#search-values").html(""), $("#search-values").removeClass("hidden").addClass("loading");
                        var t = $(this).val();
                        jQuery.ajax({
                            url: ajaxurl,
                            method: "POST",
                            data: {
                                action: "functions",
                                function: "get_filter",
                                data: {
                                    searchText: t
                                }
                            },
                            success: function(e) {
                                console.log(t, e), $("#search-values").html(e), setTimeout((function() {
                                    $("#search-values").removeClass("loading")
                                }), 10)
                            },
                            error: function(e, t, n) {
                                consoel.log("Status: " + t, "Error: " + n)
                            }
                        })
                    }
                })), $(".filter-list").click((function() {
                    var e = $(this).attr("data-id"),
                        t = $(".row-col-f[data-id='" + e + "']");
                    $(this).hasClass("active") ? ("desc", $(".filter-list").removeClass("active"), t.sort((function(e, t) {
                        var n = $(e).text().trim();
                        return $(t).text().trim().localeCompare(n)
                    }))) : ($(".filter-list").removeClass("active"), $(this).addClass("active"), t.sort((function(e, t) {
                        var n = $(e).text().trim(),
                            o = $(t).text().trim();
                        return n.localeCompare(o)
                    }))), $("#temp-list").html(""), t.each((function(e, t) {
                        console.log(t), $("#temp-list").append($(t).closest(".row-press")[0].outerHTML)
                    })), $(".row-press-container").html($("#temp-list").html()), $("#temp-list").html("");
                    Promise.resolve().then(n.t.bind(n, 108, 23)).then((function() {
                        new i.default({
                            elements_selector: ".lazy",
                            threshold: 600,
                            thresholds: "800px 15%"
                        })
                    }))
                })), $(document).on("mousemove", ".flickity-prev-next-button.next", (function(e) {
                    var t = $(this).offset(),
                        n = $(".gallery-container").width() / 2;
                    $(".next-gallery", $(this).closest(".gallery-container")).css({
                        display: "block",
                        left: e.pageX - t.left + n,
                        top: e.pageY - t.top,
                        "z-index": 1000003
                    })
                })), $(document).on("mousemove", ".flickity-prev-next-button.previous", (function(e) {
                    var t = $(this).offset();
                    $(".gallery-container").width();
                    $(".prev-gallery", $(this).closest(".gallery-container")).css({
                        display: "block",
                        left: e.pageX - t.left,
                        top: e.pageY - t.top,
                        "z-index": 1000003
                    })
                })), $(document).on("mouseenter", ".flickity-prev-next-button.previous", (function(e) {
                    $(".prev-gallery", $(this).closest(".gallery-container")).css("display", "block")
                })), $(document).on("mouseleave", ".flickity-prev-next-button.previous", (function(e) {
                    $(".prev-gallery", $(this).closest(".gallery-container")).css("display", "none")
                })), $(document).on("mouseenter", ".flickity-prev-next-button.next", (function(e) {
                    $(".next-gallery", $(this).closest(".gallery-container")).css("display", "block")
                })), $(document).on("mouseleave", ".flickity-prev-next-button.next", (function(e) {
                    $(".next-gallery", $(this).closest(".gallery-container")).css("display", "none")
                })), a.gsap.utils.toArray(".element").forEach((function(e) {
                    a.gsap.to(e, {
                        opacity: 1,
                        delay: .3,
                        y: 0,
                        duration: 1.8,
                        ease: "power3",
                        scrollTrigger: {
                            scroller: l,
                            trigger: e,
                            start: "top 99%",
                            end: "center 30%",
                            markers: !1
                        }
                    })
                })), a.gsap.utils.toArray(".border-red-c").forEach((function(e) {
                    a.gsap.to(e, {
                        opacity: 1,
                        delay: .3,
                        y: 0,
                        duration: 1.8,
                        ease: "power3",
                        scrollTrigger: {
                            scroller: l,
                            trigger: e,
                            start: "top 95%",
                            end: "center 30%",
                            markers: !1
                        }
                    })
                })), a.gsap.utils.toArray(".border-animate").forEach((function(e) {
                    a.gsap.to(e, {
                        opacity: 1,
                        delay: .3,
                        y: 0,
                        duration: 1.8,
                        ease: "power3",
                        scrollTrigger: {
                            scroller: l,
                            trigger: e,
                            start: "top 95%",
                            end: "center 30%",
                            markers: !1
                        }
                    })
                })), setTimeout((function() {
                    $("#body-hider").addClass("show-body")
                }), 100), setTimeout((function() {
                    o()
                }), 1200), $("#intro").on("mousemove", (function(e) {
                    $("#mouse").css({
                        opacity: 1,
                        left: e.pageX,
                        top: e.pageY
                    })
                })), $("#intro").on("mouseleave", (function(e) {
                    $("#mouse").css({
                        opacity: 0
                    })
                })), $("#intro").on("click", (function(n) {
                    $("#intro").addClass("opacity-0 pointer-events-none"), $("body").addClass("intro-clicked"), $("#projects-container,#menu-container").removeClass("hidden"), setTimeout((function() {
                        $("#intro").addClass("hidden"), $("#projects-container,#menu-container").removeClass("opacity-0"), e()
                    }), 900), clearTimeout(t)
                })), $(document).on("click", "a", (function(e) {
                    if ("_blank" !== $(this).attr("target")) {
                        e.preventDefault(), $("#body-hider").addClass("link-clicked");
                        var t = $(this).attr("href");
                        setTimeout((function() {
                            window.location.href = t
                        }), 300)
                    }
                })), $(".category-list").click((function() {
                    $(".filter-category").toggleClass("active")
                })), $(".category-to-select").click((function() {
                    $(this).toggleClass("button--active"), u()
                })), $(".how-to-view").click((function() {
                    var t = $(this).attr("data-type");
                    $(".how-to-view").removeClass("button--active"), $(this).addClass("button--active"), $("#list,#wall").addClass("opacity-0"), "list" == t ? $(".filter-category").addClass("opacity-0 pointer-events-none") : ($(".filter-category").removeClass("opacity-0 pointer-events-none"), $(".category-to-select").removeClass("button--active"), u()), setTimeout((function() {
                        $("#list,#wall").addClass("hidden"), $("#" + t).removeClass("hidden"), setTimeout((function() {
                            $("#" + t).removeClass("opacity-0"), e()
                        }), 50)
                    }), 800)
                })), $(".dark-mode").click((function() {
                    var e;
                    $("html").toggleClass("dark"), $("html").hasClass("dark") ? ($("#body-color").css("background", "#000000"), function(e, t, n) {
                        var o = "";
                        if (n) {
                            var a = new Date;
                            a.setTime(a.getTime() + 24 * n * 60 * 60 * 1e3), o = "; expires=" + a.toUTCString()
                        }
                        document.cookie = e + "=" + (t || "") + o + "; path=/"
                    }("dark", "true", 100)) : ($("#body-color").css("background", "white"), e = "dark", document.cookie = e + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;")
                })), $("#burger,#menu-closer").click((function() {
                    $("html").toggleClass("menuout")
                })), $("#search-closer").click((function() {
                    $("html").toggleClass("searchout")
                })), $(document).on("click", ".header-press", (function() {
                    var t = $(this).closest(".row-press").hasClass("open");
                    t || a.gsap.utils.toArray(".open").forEach((function(e) {
                        e.classList.remove("open"), a.gsap.to($(".gallery-press", e), {
                            height: 0,
                            duration: .7,
                            ease: "ease.out"
                        })
                    })), $(this).closest(".row-press").toggleClass("open"), a.gsap.to($(".gallery-press", $(this).closest(".row-press")), {
                        height: t ? 0 : "auto",
                        duration: .7,
                        ease: "ease.out",
                        onComplete: function() {
                            return e()
                        }
                    })
                }));
                var d = !1,
                    f = "center";
                $(window).width() < 769 && (d = !0, f = "left"), a.gsap.utils.toArray(".gallery-post:not(.full-hh)").forEach((function(e) {
                    $(e).flickity({
                        wrapAround: !0,
                        cellAlign: f,
                        pageDots: !1,
                        friction: .7,
                        watchCSS: !0,
                        draggable: d,
                        imagesLoaded: !0,
                        on: {
                            change: function(t) {
                                $(".number", $(e).closest(".outer-gallery")).text(t + 1)
                            }
                        }
                    })
                })), a.gsap.utils.toArray(".gallery-post.full-hh").forEach((function(e) {
                    $(e).flickity({
                        wrapAround: !0,
                        cellAlign: f,
                        pageDots: !1,
                        draggable: d,
                        imagesLoaded: !0,
                        on: {
                            change: function(t) {
                                $(".number", $(e).closest(".outer-gallery")).text(t + 1)
                            }
                        }
                    })
                })), a.gsap.utils.toArray(".gallery-post-full").forEach((function(e) {
                    $(e).flickity({
                        wrapAround: !0,
                        cellAlign: "center",
                        pageDots: !1,
                        friction: .7,
                        imagesLoaded: !0,
                        lazyLoad: !0,
                        contain: !0,
                        on: {
                            change: function(t) {
                                $(".number", $(e).closest(".outer-gallery")).text(t + 1)
                            }
                        }
                    })
                })), $(".gallery").flickity({
                    wrapAround: !0,
                    cellAlign: "center",
                    pageDots: !1,
                    friction: .7,
                    imagesLoaded: !0,
                    lazyLoad: !0,
                    contain: !0,
                    on: {
                        change: function(e) {
                            $(".count").text(e + 1)
                        }
                    }
                }), setTimeout((function() {
                    $(".big-title").addClass("opacity-0")
                }), 3e3), $(".gallery").on("mousemove", (function(e) {
                    $("#counter").css({
                        opacity: 1,
                        left: e.pageX,
                        top: e.pageY
                    })
                })), $(".gallery").on("mouseleave", (function(e) {
                    $("#counter").css({
                        opacity: 0
                    })
                })), $(".top").click((function() {
                    c().then((function(e) {
                        return e.smoothScrollTo(0, 800, 0)
                    }))
                })), $(".single-post .element img").click((function() {
                    $("#gallery-full-project").addClass("show")
                })), $(".close-gallery").click((function() {
                    $("#gallery-full-project").removeClass("show")
                })), $(".read-more").click((function() {
                    $("body").addClass("show-read-more"), setTimeout((function() {
                        $("body").addClass("show-read-more-1")
                    }), 10), setTimeout((function() {
                        e()
                    }), 100)
                }));
                var g, p;
                "ontouchstart" in window || (g = document.querySelector("#gallery-full-project .counter-gallery"), p = document.querySelector("#gallery-full-project .gallery-post"), g && (p.addEventListener("mousemove", (function(e) {
                    e.target;
                    var t = e.x,
                        n = e.y;
                    a.gsap.to(g, {
                        x: t + 3,
                        opacity: 1,
                        y: n + 3,
                        duration: .7,
                        ease: "power4"
                    })
                })), p.addEventListener("mouseleave", (function(e) {
                    a.gsap.to(g, {
                        duration: .7,
                        opacity: 0
                    })
                })))), document.querySelectorAll(".grid-hover").forEach((function(e) {
                    r.ScrollTrigger.create({
                        scroller: l,
                        trigger: e,
                        toggleActions: "play reverse play reverse",
                        start: "top 170px",
                        end: "top 150px",
                        onEnter: function() {
                            $(e).addClass("active");
                            var t = $(".image-col img", e).attr("data-src");
                            $("#image-gallery").css("background-image", "url(" + t + ")")
                        },
                        onEnterBack: function() {
                            console.log("aa"), $(e).addClass("active");
                            var t = $(".image-col img", e).attr("data-src");
                            $("#image-gallery").css("background-image", "url(" + t + ")")
                        },
                        onLeave: function() {
                            $(e).removeClass("active")
                        },
                        onLeaveBack: function() {
                            $(e).removeClass("active")
                        }
                    })
                }))
            }
        },
        108: function(e) {
            e.exports = function() {
                "use strict";

                function e() {
                    return e = Object.assign || function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
                        }
                        return e
                    }, e.apply(this, arguments)
                }
                var t = "undefined" != typeof window,
                    n = t && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),
                    o = t && "IntersectionObserver" in window,
                    a = t && "classList" in document.createElement("p"),
                    r = t && window.devicePixelRatio > 1,
                    i = {
                        elements_selector: ".lazy",
                        container: n || t ? document : null,
                        threshold: 300,
                        thresholds: null,
                        data_src: "src",
                        data_srcset: "srcset",
                        data_sizes: "sizes",
                        data_bg: "bg",
                        data_bg_hidpi: "bg-hidpi",
                        data_bg_multi: "bg-multi",
                        data_bg_multi_hidpi: "bg-multi-hidpi",
                        data_bg_set: "bg-set",
                        data_poster: "poster",
                        class_applied: "applied",
                        class_loading: "loading",
                        class_loaded: "loaded",
                        class_error: "error",
                        class_entered: "entered",
                        class_exited: "exited",
                        unobserve_completed: !0,
                        unobserve_entered: !1,
                        cancel_on_exit: !0,
                        callback_enter: null,
                        callback_exit: null,
                        callback_applied: null,
                        callback_loading: null,
                        callback_loaded: null,
                        callback_error: null,
                        callback_finish: null,
                        callback_cancel: null,
                        use_native: !1,
                        restore_on_error: !1
                    },
                    s = function(t) {
                        return e({}, i, t)
                    },
                    c = function(e, t) {
                        var n, o = "LazyLoad::Initialized",
                            a = new e(t);
                        try {
                            n = new CustomEvent(o, {
                                detail: {
                                    instance: a
                                }
                            })
                        } catch (e) {
                            (n = document.createEvent("CustomEvent")).initCustomEvent(o, !1, !1, {
                                instance: a
                            })
                        }
                        window.dispatchEvent(n)
                    },
                    l = "src",
                    u = "srcset",
                    d = "sizes",
                    f = "poster",
                    g = "llOriginalAttrs",
                    p = "data",
                    m = "loading",
                    h = "loaded",
                    v = "applied",
                    $ = "error",
                    y = "native",
                    b = "data-",
                    _ = "ll-status",
                    k = function(e, t) {
                        return e.getAttribute(b + t)
                    },
                    C = function(e) {
                        return k(e, _)
                    },
                    w = function(e, t) {
                        return function(e, t, n) {
                            var o = "data-ll-status";
                            null !== n ? e.setAttribute(o, n) : e.removeAttribute(o)
                        }(e, 0, t)
                    },
                    E = function(e) {
                        return w(e, null)
                    },
                    x = function(e) {
                        return null === C(e)
                    },
                    A = function(e) {
                        return C(e) === y
                    },
                    T = [m, h, v, $],
                    I = function(e, t, n, o) {
                        e && (void 0 === o ? void 0 === n ? e(t) : e(t, n) : e(t, n, o))
                    },
                    L = function(e, t) {
                        a ? e.classList.add(t) : e.className += (e.className ? " " : "") + t
                    },
                    O = function(e, t) {
                        a ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "")
                    },
                    S = function(e) {
                        return e.llTempImage
                    },
                    z = function(e, t) {
                        if (t) {
                            var n = t._observer;
                            n && n.unobserve(e)
                        }
                    },
                    M = function(e, t) {
                        e && (e.loadingCount += t)
                    },
                    j = function(e, t) {
                        e && (e.toLoadCount = t)
                    },
                    N = function(e) {
                        for (var t, n = [], o = 0; t = e.children[o]; o += 1) "SOURCE" === t.tagName && n.push(t);
                        return n
                    },
                    D = function(e, t) {
                        var n = e.parentNode;
                        n && "PICTURE" === n.tagName && N(n).forEach(t)
                    },
                    P = function(e, t) {
                        N(e).forEach(t)
                    },
                    R = [l],
                    G = [l, f],
                    H = [l, u, d],
                    q = [p],
                    B = function(e) {
                        return !!e[g]
                    },
                    V = function(e) {
                        return e[g]
                    },
                    F = function(e) {
                        return delete e[g]
                    },
                    J = function(e, t) {
                        if (!B(e)) {
                            var n = {};
                            t.forEach((function(t) {
                                n[t] = e.getAttribute(t)
                            })), e[g] = n
                        }
                    },
                    U = function(e, t) {
                        if (B(e)) {
                            var n = V(e);
                            t.forEach((function(t) {
                                ! function(e, t, n) {
                                    n ? e.setAttribute(t, n) : e.removeAttribute(t)
                                }(e, t, n[t])
                            }))
                        }
                    },
                    X = function(e, t, n) {
                        L(e, t.class_applied), w(e, v), n && (t.unobserve_completed && z(e, t), I(t.callback_applied, e, n))
                    },
                    Y = function(e, t, n) {
                        L(e, t.class_loading), w(e, m), n && (M(n, 1), I(t.callback_loading, e, n))
                    },
                    Q = function(e, t, n) {
                        n && e.setAttribute(t, n)
                    },
                    K = function(e, t) {
                        Q(e, d, k(e, t.data_sizes)), Q(e, u, k(e, t.data_srcset)), Q(e, l, k(e, t.data_src))
                    },
                    W = {
                        IMG: function(e, t) {
                            D(e, (function(e) {
                                J(e, H), K(e, t)
                            })), J(e, H), K(e, t)
                        },
                        IFRAME: function(e, t) {
                            J(e, R), Q(e, l, k(e, t.data_src))
                        },
                        VIDEO: function(e, t) {
                            P(e, (function(e) {
                                J(e, R), Q(e, l, k(e, t.data_src))
                            })), J(e, G), Q(e, f, k(e, t.data_poster)), Q(e, l, k(e, t.data_src)), e.load()
                        },
                        OBJECT: function(e, t) {
                            J(e, q), Q(e, p, k(e, t.data_src))
                        }
                    },
                    Z = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
                    ee = function(e, t) {
                        !t || function(e) {
                            return e.loadingCount > 0
                        }(t) || function(e) {
                            return e.toLoadCount > 0
                        }(t) || I(e.callback_finish, t)
                    },
                    te = function(e, t, n) {
                        e.addEventListener(t, n), e.llEvLisnrs[t] = n
                    },
                    ne = function(e, t, n) {
                        e.removeEventListener(t, n)
                    },
                    oe = function(e) {
                        return !!e.llEvLisnrs
                    },
                    ae = function(e) {
                        if (oe(e)) {
                            var t = e.llEvLisnrs;
                            for (var n in t) {
                                var o = t[n];
                                ne(e, n, o)
                            }
                            delete e.llEvLisnrs
                        }
                    },
                    re = function(e, t, n) {
                        ! function(e) {
                            delete e.llTempImage
                        }(e), M(n, -1),
                            function(e) {
                                e && (e.toLoadCount -= 1)
                            }(n), O(e, t.class_loading), t.unobserve_completed && z(e, n)
                    },
                    ie = function(e, t, n) {
                        var o = S(e) || e;
                        oe(o) || function(e, t, n) {
                            oe(e) || (e.llEvLisnrs = {});
                            var o = "VIDEO" === e.tagName ? "loadeddata" : "load";
                            te(e, o, t), te(e, "error", n)
                        }(o, (function(a) {
                            ! function(e, t, n, o) {
                                var a = A(t);
                                re(t, n, o), L(t, n.class_loaded), w(t, h), I(n.callback_loaded, t, o), a || ee(n, o)
                            }(0, e, t, n), ae(o)
                        }), (function(a) {
                            ! function(e, t, n, o) {
                                var a = A(t);
                                re(t, n, o), L(t, n.class_error), w(t, $), I(n.callback_error, t, o), n.restore_on_error && U(t, H), a || ee(n, o)
                            }(0, e, t, n), ae(o)
                        }))
                    },
                    se = function(e, t, n) {
                        ! function(e) {
                            return Z.indexOf(e.tagName) > -1
                        }(e) ? function(e, t, n) {
                            ! function(e) {
                                e.llTempImage = document.createElement("IMG")
                            }(e), ie(e, t, n),
                                function(e) {
                                    B(e) || (e[g] = {
                                        backgroundImage: e.style.backgroundImage
                                    })
                                }(e),
                                function(e, t, n) {
                                    var o = k(e, t.data_bg),
                                        a = k(e, t.data_bg_hidpi),
                                        i = r && a ? a : o;
                                    i && (e.style.backgroundImage = 'url("'.concat(i, '")'), S(e).setAttribute(l, i), Y(e, t, n))
                                }(e, t, n),
                                function(e, t, n) {
                                    var o = k(e, t.data_bg_multi),
                                        a = k(e, t.data_bg_multi_hidpi),
                                        i = r && a ? a : o;
                                    i && (e.style.backgroundImage = i, X(e, t, n))
                                }(e, t, n),
                                function(e, t, n) {
                                    var o = k(e, t.data_bg_set);
                                    if (o) {
                                        var a = o.split("|"),
                                            r = a.map((function(e) {
                                                return "image-set(".concat(e, ")")
                                            }));
                                        e.style.backgroundImage = r.join(), "" === e.style.backgroundImage && (r = a.map((function(e) {
                                            return "-webkit-image-set(".concat(e, ")")
                                        })), e.style.backgroundImage = r.join()), X(e, t, n)
                                    }
                                }(e, t, n)
                        }(e, t, n) : function(e, t, n) {
                            ie(e, t, n),
                                function(e, t, n) {
                                    var o = W[e.tagName];
                                    o && (o(e, t), Y(e, t, n))
                                }(e, t, n)
                        }(e, t, n)
                    },
                    ce = function(e) {
                        e.removeAttribute(l), e.removeAttribute(u), e.removeAttribute(d)
                    },
                    le = function(e) {
                        D(e, (function(e) {
                            U(e, H)
                        })), U(e, H)
                    },
                    ue = {
                        IMG: le,
                        IFRAME: function(e) {
                            U(e, R)
                        },
                        VIDEO: function(e) {
                            P(e, (function(e) {
                                U(e, R)
                            })), U(e, G), e.load()
                        },
                        OBJECT: function(e) {
                            U(e, q)
                        }
                    },
                    de = function(e, t) {
                        (function(e) {
                            var t = ue[e.tagName];
                            t ? t(e) : function(e) {
                                if (B(e)) {
                                    var t = V(e);
                                    e.style.backgroundImage = t.backgroundImage
                                }
                            }(e)
                        })(e),
                        function(e, t) {
                            x(e) || A(e) || (O(e, t.class_entered), O(e, t.class_exited), O(e, t.class_applied), O(e, t.class_loading), O(e, t.class_loaded), O(e, t.class_error))
                        }(e, t), E(e), F(e)
                    },
                    fe = ["IMG", "IFRAME", "VIDEO"],
                    ge = function(e) {
                        return e.use_native && "loading" in HTMLImageElement.prototype
                    },
                    pe = function(e, t, n) {
                        e.forEach((function(e) {
                            return function(e) {
                                return e.isIntersecting || e.intersectionRatio > 0
                            }(e) ? function(e, t, n, o) {
                                var a = function(e) {
                                    return T.indexOf(C(e)) >= 0
                                }(e);
                                w(e, "entered"), L(e, n.class_entered), O(e, n.class_exited),
                                    function(e, t, n) {
                                        t.unobserve_entered && z(e, n)
                                    }(e, n, o), I(n.callback_enter, e, t, o), a || se(e, n, o)
                            }(e.target, e, t, n) : function(e, t, n, o) {
                                x(e) || (L(e, n.class_exited), function(e, t, n, o) {
                                    n.cancel_on_exit && function(e) {
                                        return C(e) === m
                                    }(e) && "IMG" === e.tagName && (ae(e), function(e) {
                                        D(e, (function(e) {
                                            ce(e)
                                        })), ce(e)
                                    }(e), le(e), O(e, n.class_loading), M(o, -1), E(e), I(n.callback_cancel, e, t, o))
                                }(e, t, n, o), I(n.callback_exit, e, t, o))
                            }(e.target, e, t, n)
                        }))
                    },
                    me = function(e) {
                        return Array.prototype.slice.call(e)
                    },
                    he = function(e) {
                        return e.container.querySelectorAll(e.elements_selector)
                    },
                    ve = function(e) {
                        return function(e) {
                            return C(e) === $
                        }(e)
                    },
                    $e = function(e, t) {
                        return function(e) {
                            return me(e).filter(x)
                        }(e || he(t))
                    },
                    ye = function(e, n) {
                        var a = s(e);
                        this._settings = a, this.loadingCount = 0,
                            function(e, t) {
                                o && !ge(e) && (t._observer = new IntersectionObserver((function(n) {
                                    pe(n, e, t)
                                }), function(e) {
                                    return {
                                        root: e.container === document ? null : e.container,
                                        rootMargin: e.thresholds || e.threshold + "px"
                                    }
                                }(e)))
                            }(a, this),
                            function(e, n) {
                                t && (n._onlineHandler = function() {
                                    ! function(e, t) {
                                        var n;
                                        (n = he(e), me(n).filter(ve)).forEach((function(t) {
                                            O(t, e.class_error), E(t)
                                        })), t.update()
                                    }(e, n)
                                }, window.addEventListener("online", n._onlineHandler))
                            }(a, this), this.update(n)
                    };
                return ye.prototype = {
                    update: function(e) {
                        var t, a, r = this._settings,
                            i = $e(e, r);
                        j(this, i.length), !n && o ? ge(r) ? function(e, t, n) {
                            e.forEach((function(e) {
                                -1 !== fe.indexOf(e.tagName) && function(e, t, n) {
                                    e.setAttribute("loading", "lazy"), ie(e, t, n),
                                        function(e, t) {
                                            var n = W[e.tagName];
                                            n && n(e, t)
                                        }(e, t), w(e, y)
                                }(e, t, n)
                            })), j(n, 0)
                        }(i, r, this) : (a = i, function(e) {
                            e.disconnect()
                        }(t = this._observer), function(e, t) {
                            t.forEach((function(t) {
                                e.observe(t)
                            }))
                        }(t, a)) : this.loadAll(i)
                    },
                    destroy: function() {
                        this._observer && this._observer.disconnect(), t && window.removeEventListener("online", this._onlineHandler), he(this._settings).forEach((function(e) {
                            F(e)
                        })), delete this._observer, delete this._settings, delete this._onlineHandler, delete this.loadingCount, delete this.toLoadCount
                    },
                    loadAll: function(e) {
                        var t = this,
                            n = this._settings;
                        $e(e, n).forEach((function(e) {
                            z(e, t), se(e, n, t)
                        }))
                    },
                    restoreAll: function() {
                        var e = this._settings;
                        he(e).forEach((function(t) {
                            de(t, e)
                        }))
                    }
                }, ye.load = function(e, t) {
                    var n = s(t);
                    se(e, n)
                }, ye.resetStatus = function(e) {
                    E(e)
                }, t && function(e, t) {
                    if (t)
                        if (t.length)
                            for (var n, o = 0; n = t[o]; o += 1) c(e, n);
                        else c(e, t)
                }(ye, window.lazyLoadOptions), ye
            }()
        }
    }
]);
//# sourceMappingURL=608.js.map?v=1742551320349