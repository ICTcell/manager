/* =========================================================================
   KINNARI MISHRA — ACADEMIC PORTFOLIO — BEHAVIOUR
   Vanilla JS only. Organized by feature so any block can be lifted out.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     1. LOADING SCREEN
     --------------------------------------------------------------------- */
  window.addEventListener("load", function () {
    var loader = document.getElementById("loader");
    if (!loader) return;
    setTimeout(function () { loader.classList.add("hidden"); }, 450);
  });

  /* ---------------------------------------------------------------------
     2. THEME TOGGLE (persists via data-theme attribute + localStorage)
     --------------------------------------------------------------------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");
  var savedTheme = null;
  try { savedTheme = localStorage.getItem("km-theme"); } catch (e) {}
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var isDark = current
        ? current === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      var next = isDark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("km-theme", next); } catch (e) {}
    });
  }

  /* ---------------------------------------------------------------------
     3. SCROLL PROGRESS BAR
     --------------------------------------------------------------------- */
  var progressBar = document.getElementById("scroll-progress");
  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + "%";
  }

  /* ---------------------------------------------------------------------
     4. STICKY NAV: hide on scroll-down, show on scroll-up, active link
     --------------------------------------------------------------------- */
  var navEl = document.getElementById("site-nav");
  var lastScroll = 0;
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".primary-nav a"));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  function handleNavVisibility() {
    var current = window.scrollY;
    if (navEl) {
      if (current > lastScroll && current > 140) {
        navEl.classList.add("nav-hidden");
      } else {
        navEl.classList.remove("nav-hidden");
      }
    }
    lastScroll = current;
  }

  function handleActiveLink() {
    var scrollPos = window.scrollY + 140;
    var activeIndex = -1;
    sections.forEach(function (sec, i) {
      if (sec && sec.offsetTop <= scrollPos) activeIndex = i;
    });
    navLinks.forEach(function (a, i) {
      a.classList.toggle("active", i === activeIndex);
    });
  }

  /* ---------------------------------------------------------------------
     5. BACK TO TOP BUTTON
     --------------------------------------------------------------------- */
  var backToTop = document.getElementById("back-to-top");
  function handleBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("show", window.scrollY > 700);
  }
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Combine scroll listeners into one rAF-throttled handler */
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateProgress();
        handleNavVisibility();
        handleActiveLink();
        handleBackToTop();
        ticking = false;
      });
      ticking = true;
    }
  });
  updateProgress();
  handleActiveLink();

  /* ---------------------------------------------------------------------
     6. MOBILE NAV TOGGLE
     --------------------------------------------------------------------- */
  var navToggle = document.getElementById("nav-toggle");
  var primaryNav = document.querySelector(".primary-nav");
  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("open");
      primaryNav.classList.toggle("open");
    });
    navLinks.forEach(function (a) {
      a.addEventListener("click", function () {
        navToggle.classList.remove("open");
        primaryNav.classList.remove("open");
      });
    });
  }

  /* ---------------------------------------------------------------------
     7. SCROLL-TRIGGERED REVEALS (IntersectionObserver)
     --------------------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(".reveal, .reveal-stagger");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach(function (t) { io.observe(t); });
  } else {
    revealTargets.forEach(function (t) { t.classList.add("in"); });
  }

  /* ---------------------------------------------------------------------
     8. ANIMATED COUNTERS
     --------------------------------------------------------------------- */
  var counters = document.querySelectorAll("[data-count]");
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && counters.length) {
    var counterIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (c) { counterIO.observe(c); });
  }

  /* ---------------------------------------------------------------------
     9. SKILL PROGRESS BARS
     --------------------------------------------------------------------- */
  var bars = document.querySelectorAll("[data-level]");
  if ("IntersectionObserver" in window && bars.length) {
    var barIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var span = entry.target.querySelector("span");
            if (span) span.style.width = entry.target.getAttribute("data-level") + "%";
            barIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    bars.forEach(function (b) { barIO.observe(b); });
  }

  /* ---------------------------------------------------------------------
     10. TYPING ANIMATION (hero role line)
     --------------------------------------------------------------------- */
  var typedEl = document.getElementById("typed-text");
  var roles = [
    "Assistant Professor, Computer Engineering",
    "Manager, ICT Cell — Parul University",
    "PhD Scholar, Artificial Intelligence",
    "Researcher — Machine Learning & Data Mining"
  ];
  if (typedEl) {
    var roleIdx = 0, charIdx = 0, deleting = false;
    function typeLoop() {
      var word = roles[roleIdx];
      if (!deleting) {
        charIdx++;
        typedEl.textContent = word.slice(0, charIdx);
        if (charIdx === word.length) {
          deleting = true;
          setTimeout(typeLoop, 1600);
          return;
        }
      } else {
        charIdx--;
        typedEl.textContent = word.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      setTimeout(typeLoop, deleting ? 35 : 55);
    }
    typeLoop();
  }

  /* ---------------------------------------------------------------------
     11. RIPPLE EFFECT ON BUTTONS
     --------------------------------------------------------------------- */
  document.querySelectorAll(".btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement("span");
      var size = Math.max(rect.width, rect.height);
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      btn.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 620);
    });
  });

  /* ---------------------------------------------------------------------
     12. HERO CANVAS — subtle animated network (research/data motif)
     --------------------------------------------------------------------- */
  var canvas = document.getElementById("hero-canvas");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var w, h, nodes = [];
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    }
    function initNodes() {
      nodes = [];
      var count = Math.min(46, Math.floor((w * h) / 60000));
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(217,169,92,0.7)";
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
        for (var j = i + 1; j < nodes.length; j++) {
          var m = nodes[j];
          var dx = n.x - m.x, dy = n.y - m.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140 * devicePixelRatio) {
            ctx.strokeStyle = "rgba(217,169,92," + (0.18 * (1 - dist / (140 * devicePixelRatio))) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }
      if (!reduceMotion) requestAnimationFrame(draw);
    }
    resize(); initNodes();
    if (!reduceMotion) draw(); else draw();
    window.addEventListener("resize", function () { resize(); initNodes(); });
  }

  /* ---------------------------------------------------------------------
     13. GALLERY LIGHTBOX
     --------------------------------------------------------------------- */
  var lightbox = document.getElementById("lightbox");
  var lbTitle = document.getElementById("lb-title");
  var lbBody = document.getElementById("lb-body");
  document.querySelectorAll(".g-item").forEach(function (item) {
    item.addEventListener("click", function () {
      if (!lightbox) return;
      lbTitle.textContent = item.getAttribute("data-title") || "";
      lbBody.textContent = item.getAttribute("data-desc") || "";
      lightbox.classList.add("open");
    });
  });
  document.querySelectorAll("[data-lb-close]").forEach(function (el) {
    el.addEventListener("click", function () { lightbox.classList.remove("open"); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox) lightbox.classList.remove("open");
  });

  /* ---------------------------------------------------------------------
     14. CONTACT FORM (front-end only — wire to a backend / Formspree later)
     --------------------------------------------------------------------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var name = form.querySelector("#cf-name").value.trim();
      if (!name) return;
      if (status) {
        status.textContent = "Thank you, " + name.split(" ")[0] + " — your message has been noted. This demo form is not yet connected to an email service; wire it to Formspree, EmailJS, or a backend endpoint to go live.";
      }
      form.reset();
    });
  }

  /* ---------------------------------------------------------------------
     15. LAZY LOADING IMAGES (native + fallback class toggle)
     --------------------------------------------------------------------- */
  document.querySelectorAll("img[loading='lazy']").forEach(function (img) {
    img.addEventListener("load", function () { img.style.opacity = 1; });
  });

  /* ---------------------------------------------------------------------
     16. FOOTER YEAR
     --------------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
