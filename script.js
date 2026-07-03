/* Chosen Cuts — interactions */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");

  /* Scrim behind the dropdown — tap to close (created + placed on <body>) */
  var scrim = document.createElement("div");
  scrim.className = "nav-scrim";
  document.body.appendChild(scrim);

  /* Relocate the dropdown to <body> so it escapes the fixed/backdrop-filtered
     header's containing block (which otherwise collapses it). */
  if (mobileMenu) {
    document.body.appendChild(mobileMenu);
    mobileMenu.hidden = false;
  }

  /* Mobile menu */
  var menuOpen = false;
  if (toggle && mobileMenu) {
    var mainEl = document.getElementById("main");
    var footerEl = document.querySelector(".site-footer");

    var getMenuFocusables = function () {
      return Array.prototype.slice.call(
        mobileMenu.querySelectorAll('a[href], button:not([disabled])')
      );
    };

    /* Remove off-canvas links from the tab order while the drawer is closed. */
    var setMenuTabbable = function (tabbable) {
      getMenuFocusables().forEach(function (el) {
        if (tabbable) el.removeAttribute("tabindex");
        else el.setAttribute("tabindex", "-1");
      });
    };

    var setInert = function (on) {
      [mainEl, footerEl].forEach(function (el) {
        if (!el) return;
        if (on) {
          el.setAttribute("aria-hidden", "true");
          try { el.inert = true; } catch (e) {}
        } else {
          el.removeAttribute("aria-hidden");
          try { el.inert = false; } catch (e) {}
        }
      });
    };

    var setMenu = function (open) {
      menuOpen = open;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      mobileMenu.classList.toggle("open", open);
      scrim.classList.toggle("open", open);
      document.body.classList.toggle("nav-open", open);
      mobileMenu.setAttribute("aria-hidden", String(!open));
      setMenuTabbable(open);
      setInert(open);

      if (open) {
        var f = getMenuFocusables();
        if (f.length) f[0].focus();
      } else {
        toggle.focus();
      }
    };

    /* Start closed: links out of the tab order, drawer hidden from AT. */
    mobileMenu.setAttribute("aria-hidden", "true");
    setMenuTabbable(false);

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    scrim.addEventListener("click", function () { setMenu(false); });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (!menuOpen) return;
      if (e.key === "Escape") { setMenu(false); return; }
      if (e.key === "Tab") {
        var f = getMenuFocusables();
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        } else if (!mobileMenu.contains(document.activeElement)) {
          e.preventDefault(); first.focus();
        }
      }
    });

    /* Reset drawer + toggle state when crossing the desktop breakpoint. */
    var desktopMq = window.matchMedia("(min-width: 721px)");
    var onBreakpoint = function () {
      if (desktopMq.matches && menuOpen) setMenu(false);
    };
    if (desktopMq.addEventListener) desktopMq.addEventListener("change", onBreakpoint);
    else if (desktopMq.addListener) desktopMq.addListener(onBreakpoint);
  }

  /* Sticky / shrinking header + reveal on ANY upward scroll */
  var lastY = window.scrollY;
  var onScroll = function () {
    var y = window.scrollY;
    if (y > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");

    /* Hide on scroll-down, reveal instantly on any upward scroll. Never hide while menu is open or near top. */
    if (menuOpen || y <= 80) {
      header.classList.remove("nav-hidden");
    } else if (y > lastY + 2) {
      header.classList.add("nav-hidden");
    } else if (y < lastY) {
      header.classList.remove("nav-hidden");
    }
    lastY = y;
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Scroll-reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* Lightbox (GLightbox, loaded via CDN) */
  if (window.GLightbox) {
    GLightbox({ selector: ".glightbox", touchNavigation: true, loop: true, openEffect: "fade", closeEffect: "fade" });
  }

  /* Year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
