/* Página de la carta: pinta las dos cartas de carta-data.js (Carta y Heladería). */
(function () {
  "use strict";

  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Un producto: nombre, descripción y uno o dos precios
  function item(p, cols) {
    var prices = "";
    if (cols && p.precios) {
      prices = '<span class="menu-item-prices">' + p.precios.map(function (v, i) {
        return "<span><small>" + esc(cols[i] || "") + "</small>" + (v ? esc(v) + " €" : "–") + "</span>";
      }).join("") + "</span>";
    } else if (p.precio) {
      prices = '<span class="menu-item-price">' + esc(p.precio) + " €</span>";
    }
    return '<li class="menu-item">' +
      '<span class="menu-item-name">' + esc(p.nombre) + "</span>" + prices +
      (p.desc ? '<span class="menu-item-desc">' + esc(p.desc) + "</span>" : "") +
      "</li>";
  }

  function itemList(list, cols) {
    if (!list || !list.length) return "";
    return '<ul class="menu-items">' + list.map(function (p) { return item(p, cols); }).join("") + "</ul>";
  }

  function allItems(c) {
    var all = (c.productos || []).slice();
    (c.grupos || []).forEach(function (g) { all = all.concat(g.productos || []); });
    return all;
  }
  function priced(list) {
    return list.some(function (p) { return p.precio || (p.precios && p.precios.some(Boolean)); });
  }

  // Cambiar al sustituir fotos de sabores, para que el móvil no enseñe las antiguas
  var FOTOS_V = "20261016m";

  // Sabores de helado: los que tienen foto van en cuadrícula; el resto, en una línea debajo
  function gallery(g) {
    var con = g.sabores.filter(function (s) { return s.foto; });
    var sin = g.sabores.filter(function (s) { return !s.foto; });
    return '<div class="menu-flavours-block"><h3 class="menu-group">' + esc(g.titulo) + "</h3>" +
      '<ul class="menu-flavours">' + con.map(function (s) {
        return '<li><img src="assets/img/sabores/' + esc(s.foto) + '.webp?v=' + FOTOS_V + '" alt="" width="240" height="150" loading="lazy" decoding="async" />' +
          "<span>" + esc(s.nombre) + "</span></li>";
      }).join("") + "</ul>" +
      (sin.length ? '<div class="menu-extra"><p class="menu-flavours-more"><em>Y también</em> ' +
        sin.map(function (s) { return esc(s.nombre); }).join(' <span aria-hidden="true">·</span> ') + "</p></div>" : "") +
      "</div>";
  }

  function category(c) {
    var body = itemList(c.productos, c.columnas);
    (c.grupos || []).forEach(function (g) {
      var cols = g.columnas || c.columnas;
      body += '<div class="menu-block"><h3 class="menu-group">' + esc(g.titulo) + "</h3>" +
        (g.nota ? '<p class="menu-note">' + esc(g.nota) + "</p>" : "") +
        itemList(g.productos, cols) + "</div>";
    });
    var extras = (c.extras || []).map(function (x) {
      return '<div class="menu-extra"><h3 class="menu-group">' + esc(x.titulo) + "</h3><p>" +
        x.items.map(esc).join(' <span aria-hidden="true">·</span> ') + "</p></div>";
    }).join("");
    return '<section class="menu-cat" id="' + esc(c.id) + '" aria-labelledby="t-' + esc(c.id) + '">' +
      '<header class="menu-cat-head"><h2 id="t-' + esc(c.id) + '">' + esc(c.nombre) + "</h2>" +
        (c.texto ? '<p class="menu-cat-text">' + esc(c.texto) + "</p>" : "") + "</header>" +
      (body ? '<div class="menu-body">' + body + "</div>" : "") +
      (c.galerias || []).map(gallery).join("") +
      (extras ? '<div class="menu-extras">' + extras + "</div>" : "") +
      (c.nota ? '<p class="menu-note">' + esc(c.nota) + "</p>" : "") +
      "</section>";
  }

  var data, cartas, observer;

  // Qué carta abrir: la del enlace (#heladeria o #una-seccion) o la primera
  function cartaFromHash() {
    var h = decodeURIComponent((location.hash || "").slice(1));
    if (!h) return cartas[0];
    for (var i = 0; i < cartas.length; i++) {
      if (cartas[i].id === h) return cartas[i];
      if ((cartas[i].categorias || []).some(function (c) { return c.id === h; })) return cartas[i];
    }
    return cartas[0];
  }

  function show(carta, opts) {
    var list = document.querySelector("[data-menu-list]");
    var tabs = document.querySelector("[data-menu-tabs]");
    var cats = carta.categorias || [];

    document.querySelectorAll("[data-menu-switch] button").forEach(function (b) {
      var on = b.getAttribute("data-carta") === carta.id;
      b.setAttribute("aria-selected", on ? "true" : "false");
      b.tabIndex = on ? 0 : -1;
    });
    var title = document.querySelector("[data-menu-title]");
    if (title) title.textContent = carta.id === cartas[0].id ? "La carta" : carta.nombre;

    tabs.setAttribute("aria-label", "Secciones de " + carta.nombre.toLowerCase());
    tabs.innerHTML = cats.map(function (c) {
      return '<a href="#' + esc(c.id) + '">' + esc(c.nombre) + "</a>";
    }).join("");
    list.innerHTML = cats.map(category).join("");
    list.setAttribute("aria-label", carta.nombre);

    var notice = document.querySelector("[data-menu-notice]");
    var total = cats.reduce(function (n, c) { return n + allItems(c).length + (c.extras || []).length + (c.galerias || []).length; }, 0);
    if (!total) { notice.hidden = false; }
    else if (data.aviso) { notice.textContent = data.aviso; notice.hidden = false; }
    else { notice.hidden = true; }

    if (opts && opts.updateHash) {
      history.replaceState(null, "", carta.id === cartas[0].id ? location.pathname : "#" + carta.id);
    }
    if (opts && opts.scroll) {
      var top = document.querySelector("[data-menu-switch]").getBoundingClientRect().top + scrollY - 80;
      if (scrollY > top) window.scrollTo({ top: top });
    }
    safe(initTabs, "initTabs");
  }

  function render() {
    data = window.__CARTA__;
    if (!data) return;
    cartas = data.cartas || [{ id: "carta", nombre: "Carta", categorias: data.categorias || [] }];

    var sw = document.querySelector("[data-menu-switch]");
    if (sw && cartas.length > 1) {
      sw.innerHTML = cartas.map(function (c) {
        return '<button type="button" role="tab" data-carta="' + esc(c.id) + '">' + esc(c.nombre) + "</button>";
      }).join("");
      sw.hidden = false;
      sw.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-carta]");
        if (!b) return;
        var c = cartas.filter(function (x) { return x.id === b.getAttribute("data-carta"); })[0];
        if (c) show(c, { updateHash: true, scroll: true });
      });
      // Flechas izquierda/derecha entre las dos cartas
      sw.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        var btns = Array.prototype.slice.call(sw.querySelectorAll("button"));
        var i = btns.indexOf(document.activeElement);
        if (i < 0) return;
        var next = btns[(i + (e.key === "ArrowRight" ? 1 : btns.length - 1)) % btns.length];
        next.focus(); next.click();
      });
    }

    var first = cartaFromHash();
    show(first, {});
    var h = (location.hash || "").slice(1);
    if (h && h !== first.id) {
      var target = document.getElementById(h);
      // Espera a que la carta esté pintada y las fuentes cargadas antes de bajar a la sección
      if (target) {
        var go = function () { target.scrollIntoView({ behavior: "instant", block: "start" }); };
        (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () { setTimeout(go, 60); });
      }
    }
    window.addEventListener("hashchange", function () {
      var c = cartaFromHash();
      var current = document.querySelector('[data-menu-switch] button[aria-selected="true"]');
      if (current && current.getAttribute("data-carta") !== c.id) show(c, {});
    });

    var actions = document.querySelector("[data-menu-actions]");
    var anyPrice = cartas.some(function (c) { return (c.categorias || []).some(function (k) { return priced(allItems(k)); }); });
    if (data.pdf) {
      var pdf = document.querySelector("[data-menu-pdf]");
      pdf.href = data.pdf; pdf.hidden = false; actions.hidden = false;
    } else if (anyPrice) {
      var print = document.querySelector("[data-menu-print]");
      print.hidden = false; actions.hidden = false;
      print.addEventListener("click", function () { window.print(); });
    }
    if (data.actualizada) {
      document.querySelector("[data-menu-updated]").textContent = "Precios actualizados en " + data.actualizada + ".";
    }
  }

  // Resalta en las pestañas la sección que se está viendo
  function initTabs() {
    var tabs = document.querySelector("[data-menu-tabs]");
    if (!tabs || !("IntersectionObserver" in window)) return;
    if (observer) observer.disconnect();
    var links = {};
    tabs.querySelectorAll("a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle("is-active", k === e.target.id); });
        var a = links[e.target.id];
        if (a) tabs.scrollTo({ left: a.offsetLeft - 16, behavior: "smooth" });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll(".menu-cat").forEach(function (s) { observer.observe(s); });
  }

  function boot() {
    document.documentElement.classList.remove("no-js");
    safe(render, "render");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
