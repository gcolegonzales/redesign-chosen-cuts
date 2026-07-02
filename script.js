/* Chosen Cuts — interactions */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");

  /* Sticky / shrinking header */
  var onScroll = function () {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile menu */
  if (toggle && mobileMenu) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      mobileMenu.hidden = !open;
    };
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
  }

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
