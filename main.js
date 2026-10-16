/* Alfredo Café & Copas — interacción.
   Todo el contenido está en el HTML; este archivo solo lo enriquece.
   Si falla, la web se sigue leyendo entera. */
(function () {
  "use strict";

  var TZ = "Europe/Madrid";
  // Minutos desde las 00:00. Un cierre > 1440 significa "de madrugada del día siguiente".
  // Índice 0 = domingo … 6 = sábado.
  var SCHEDULE = {
    0: [900, 1320],   // domingo 15:00 – 22:00
    1: [900, 1290],   // lunes 15:00 – 21:30
    2: [930, 1320],   // martes 15:30 – 22:00
    3: [930, 1320],
    4: [930, 1320],
    5: [930, 1590],   // viernes 15:30 – 02:30
    6: [930, 1590]    // sábado 15:30 – 02:30
  };
  var DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  function fmt(min) {
    min = ((Math.round(min) % 1440) + 1440) % 1440;
    var h = Math.floor(min / 60), m = min % 60;
    return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
  }

  // Hora actual en Jerez, aunque quien visite la web esté en otro huso.
  function jerezNow() {
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: TZ, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date());
    var get = function (t) { return parts.filter(function (p) { return p.type === t; })[0].value; };
    var dayIdx = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    return { day: dayIdx, min: parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10) };
  }

  function openState(now) {
    var today = SCHEDULE[now.day];
    var yday = SCHEDULE[(now.day + 6) % 7];
    if (yday[1] > 1440 && now.min < yday[1] - 1440) return { open: true, closesAt: yday[1] };
    if (now.min >= today[0] && now.min < today[1]) return { open: true, closesAt: today[1] };
    if (now.min < today[0]) return { open: false, opensAt: today[0], when: "hoy" };
    return { open: false, opensAt: SCHEDULE[(now.day + 1) % 7][0], when: "mañana" };
  }

  /* ---------- Abierto / cerrado ahora y fila de hoy en el horario ---------- */
  function initStatus() {
    var now = jerezNow();
    if (now.day < 0) return;
    var st = openState(now);

    var box = document.querySelector("[data-status]");
    var txt = document.querySelector("[data-status-text]");
    if (box && txt) {
      if (st.open) {
        box.classList.add("is-open");
        txt.textContent = "Abierto ahora · hasta las " + fmt(st.closesAt);
      } else {
        box.classList.add("is-closed");
        txt.textContent = "Cerrado ahora · abrimos " + st.when + " a las " + fmt(st.opensAt);
      }
    }

    document.querySelectorAll("[data-hours] tr").forEach(function (tr) {
      var days = (tr.getAttribute("data-days") || "").split(" ");
      if (days.indexOf(String(now.day)) !== -1) tr.classList.add("is-today");
    });

    var note = document.querySelector("[data-status-full]");
    if (note && !st.open) {
      note.textContent = "Hoy es " + DAY_NAMES[now.day] + ". En festivos el horario puede cambiar: llámanos si tienes dudas.";
    }
  }

  /* ---------- Nav: sólida al bajar y clara/oscura según la sección ---------- */
  function initNav() {
    var nav = document.querySelector("[data-nav]");
    if (!nav) return;
    var ticking = false;
    function update() {
      ticking = false;
      nav.classList.toggle("is-solid", window.scrollY > 24);
      var probe = document.elementFromPoint(window.innerWidth / 2, nav.offsetHeight + 4);
      var themed = probe && probe.closest ? probe.closest("[data-theme]") : null;
      nav.classList.toggle("is-dark", !!themed && themed.getAttribute("data-theme") === "dark");
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("load", update);
    update();
  }

  /* ---------- Aparición al hacer scroll (con red de seguridad) ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -4% 0px" });
    items.forEach(function (el) {
      // Escalonado suave dentro de las rejillas
      var parent = el.parentElement;
      if (parent && (parent.classList.contains("events"))) {
        el.style.transitionDelay = (Array.prototype.indexOf.call(parent.children, el) * 110) + "ms";
      }
      io.observe(el);
    });
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      });
    }, 6000);
  }

  /* ---------- Las fotos de producto se desplazan un poco al hacer scroll ---------- */
  function initDrift() {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-drift]"));
    if (!items.length) return;
    var ticking = false;
    function update() {
      ticking = false;
      var vh = window.innerHeight;
      items.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        // -1 cuando entra por abajo, 1 cuando sale por arriba
        var p = ((r.top + r.height / 2) - vh / 2) / (vh / 2 + r.height / 2);
        el.style.setProperty("--drift", (p * 28).toFixed(1) + "px");
      });
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function boot() {
    document.documentElement.classList.remove("no-js");
    safe(initStatus, "initStatus");
    safe(initNav, "initNav");
    safe(initReveal, "initReveal");
    safe(initDrift, "initDrift");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
