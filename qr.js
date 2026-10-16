/* Dibuja el QR de la carta en cada elemento [data-qr].
   La dirección se calcula desde donde esté publicada la web,
   así que no hay que cambiar nada al poner el dominio. */
(function () {
  "use strict";

  function cartaUrl() {
    var u = new URL("carta.html", window.location.href);
    u.search = ""; u.hash = "";
    return u.href;
  }

  function draw() {
    if (typeof window.qrcode !== "function") return;
    var url = cartaUrl();
    var qr = window.qrcode(0, "M");
    qr.addData(url);
    qr.make();
    var svg = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });

    document.querySelectorAll("[data-qr]").forEach(function (el) {
      if (el.children.length) return;
      el.innerHTML = svg;
      el.setAttribute("role", "img");
      el.setAttribute("aria-label", "Código QR que abre la carta en el móvil");
    });
    document.querySelectorAll("[data-qr-url]").forEach(function (el) { el.textContent = url; });

    var local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname) || window.location.protocol === "file:";
    var warn = document.querySelector("[data-qr-warning]");
    if (warn && local) warn.hidden = false;

    var print = document.querySelector("[data-print]");
    if (print) print.addEventListener("click", function () { window.print(); });
  }

  try {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", draw);
    else draw();
  } catch (e) { console.warn("[qr]", e); }
})();
