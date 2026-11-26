
(function () {
  try {
    var bar = document.querySelector(".rc-bar"), optsT = bar && bar.querySelector(":scope > .rc-opts-toggle");
    var plus = bar && bar.querySelector(":scope > .v3-plus"), pan = document.getElementById("v3-plus-pan");
    if (!bar || !optsT || !plus || !pan || !window.matchMedia) { return; }
    var mq = matchMedia("screen and (max-width:32.49rem)");
    var MOBILES = [".rn-bar-b", ".rc-gallery-toggle", ".v3-fs", ".rc-opts-toggle"], places = [];
    function ouvrir(oui) { pan.hidden = !oui; plus.setAttribute("aria-expanded", String(oui)); }
    function perdu() {
      var a = document.activeElement;
      return !a || a === document.body || pan.contains(a) || !a.getClientRects().length;
    }
    function ranger() {
      if (mq.matches && !places.length) {
        ouvrir(false);
        MOBILES.forEach(function (s) {
          var b = bar.querySelector(":scope > " + s);
          if (!b) { return; }
          var m = document.createComment(s);
          bar.insertBefore(m, b);
          places.push([m, b]);
          // Une entrée marquée v3-fin (le groupe Contacts) reste la dernière du menu.
          pan.insertBefore(b, pan.querySelector(":scope > .v3-fin"));
        });
      } else if (!mq.matches && places.length) {
        ouvrir(false);
        places.forEach(function (p) { bar.insertBefore(p[1], p[0]); bar.removeChild(p[0]); });
        places = [];
      } else { return; }
      window.dispatchEvent(new Event("resize"));
    }
    plus.addEventListener("click", function () { ouvrir(pan.hidden); });
    pan.addEventListener("click", function (e) {
      // Un bouton marqué data-garde-menu déplie un panneau en place (Installer) : le menu reste ouvert.
      if (!e.target.closest || !e.target.closest("button") || e.target.closest("[data-garde-menu]")) { return; }
      ouvrir(false);
      if (perdu()) { plus.focus(); }
    });
    window.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || !places.length) { return; }
      if (!pan.hidden) { ouvrir(false); plus.focus(); return; }
      if (optsT.getAttribute("aria-expanded") === "true") {
        setTimeout(function () { if (perdu()) { plus.focus(); } }, 0);
      }
    }, true);
    document.addEventListener("click", function (e) {
      if (!pan.hidden && !pan.contains(e.target) && !plus.contains(e.target)) { ouvrir(false); }
    });
    if (mq.addEventListener) { mq.addEventListener("change", ranger); } else if (mq.addListener) { mq.addListener(ranger); }
    ranger();
  } catch (e) {}
})();
