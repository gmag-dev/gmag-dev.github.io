

(function () {
  "use strict";
  var root = document.documentElement, box = document.querySelector(".parallaxe"), actif = false, attente = [];
  window.rcEntree = {
    actif: function () { return actif; },
    ensuite: function (jouer, tout) { if (actif) { attente.push([jouer, tout]); } else { jouer(); } },
    partir: function () { partir(); },
    couper: function () { if (actif) { finir(true); } }
  };
  if (!root.classList) { return; }
  
  if (!box || !root.classList.contains("px-entree") || (window.pageYOffset || 0) > 0) {
    root.classList.remove("px-entree"); return;
  }
  var T = { logo: 1850, page: 2100, titre: 2550, fin: 3440 };
  var ETAPES = ["px-entree", "px-depart", "px-logo", "px-page", "px-titre"];
  var GESTES = ["scroll", "wheel", "keydown", "pointerdown", "touchstart", "beforeprint", "hashchange"], minuteurs = [],
    secours = null, plafond = null, parti = false, fini = false;
  function vider(i) { var a = attente; attente = []; a.forEach(function (f) { f[i](); }); }
  
  function finir(saut) {
    if (fini) { return; }
    fini = true; actif = false;
    minuteurs.forEach(clearTimeout); clearTimeout(secours); clearTimeout(plafond);
    GESTES.forEach(function (n) { window.removeEventListener(n, couper, true); });
    vider(saut ? 1 : 0);
    ETAPES.forEach(function (c) { root.classList.remove(c); });
  }
  function couper(e) { if (e.type !== "scroll" || (window.pageYOffset || 0) > 0) { finir(true); } }
  function poser(c) { return function () { root.classList.add(c); }; }
  var pas = [].map.call(box.querySelectorAll("[data-px-t]"), function (el) {
    return [+el.getAttribute("data-px-t") || 0, function () { el.classList.add("px-on"); }];
  });
  pas.push([T.logo, poser("px-logo")], [T.page, poser("px-page")],
    [T.titre, function () { vider(0); root.classList.add("px-titre"); }], [T.fin, function () { finir(false); }]);
  pas.sort(function (a, b) { return a[0] - b[0]; });
  
  function suite(k, avant) {
    if (fini || k >= pas.length) { return; }
    var t = pas[k][0];
    minuteurs.push(setTimeout(function () {
      while (k < pas.length && pas[k][0] === t && !fini) { pas[k++][1](); }
      suite(k, t);
    }, t - avant));
  }
  
  function partir() {
    if (!actif || parti) { return; }
    parti = true;
    clearTimeout(plafond);
    void document.body.offsetHeight;
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        if (fini) { return; }
        root.classList.add("px-depart");
        clearTimeout(secours);
        secours = setTimeout(function () { finir(false); }, 4000);
        suite(0, 0);
      });
    });
  }
  actif = true;
  box.classList.add("px-pret");
  GESTES.forEach(function (n) { window.addEventListener(n, couper, { capture: true, passive: true }); });
  secours = setTimeout(function () { finir(false); }, 4000);
  
  plafond = setTimeout(function () { finir(true); }, 1500);
})();
