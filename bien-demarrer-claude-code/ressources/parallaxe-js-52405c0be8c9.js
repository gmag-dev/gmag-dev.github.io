

// Décor du guide complet (3.5.0) : dérivé de scripts/28-parallaxe-js.js (3.4.2), que le guide
// débutant garde inchangé tant qu'une décision n'a pas étendu ce comportement à son décor. Feuille
// associée : styles/13-parallaxe-complet.css.
(function () {
  "use strict";
  var box = document.querySelector(".parallaxe"), titre = document.getElementById("titre");
  if (!box) { return; }
  if (!window.requestAnimationFrame) { box.parentNode.removeChild(box); return; }
  // 3.5.0 : trois façons de tenir le décor. « page » (page unique, sommaire : une page de titre,
  // puis le texte) : le décor s'atténue quand le texte arrive. « lecture » (page de chapitre, sans
  // page de titre) : le décor est d'emblée à son opacité de lecture. « decor » (accueil, dont la
  // grille de tuiles se pose sur le décor) : il garde sa pleine opacité.
  var mode = !titre ? "lecture" : titre.classList.contains("titlepage") ? "page" : "decor";
  // MIN : une gouttière plus étroite ne montre pas le décor (24 px : l'anneau du panneau en prend 16).
  var root = document.documentElement, P = 4, MIN = 24;
  var calm = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  var plans = [].map.call(box.querySelectorAll(".px-plan"), function (el) {
    return { el: el, v: +el.getAttribute("data-px-vitesse") || 0, base: +el.getAttribute("data-px-base") || 0,
      mode: el.getAttribute("data-px-mode"), h: +el.getAttribute("data-px-hauteur") || 0,
      crete: +el.getAttribute("data-px-crete") || 0, periode: +el.getAttribute("data-px-periode") || 0,
      retour: +el.getAttribute("data-px-retour") || 0, top: 0, A: 0, R: 0, dy: null };
  });
  var rue = null, lune = box.querySelector(".px-lune"), docH = 0, vh = 0, pied = 0, revu = false, VIDE = 368;
  plans.forEach(function (pl) { if (pl.mode === "rue") { rue = pl; } });
  var sec = null, all = document.querySelectorAll("section"), i;
  for (i = 0; titre && i < all.length; i++) { if (titre.compareDocumentPosition(all[i]) & 4) { sec = all[i]; break; } }
  var debut = 0, fin = 1, marge = 0.35, still = true, attente = false, dernier = "", minuteur = null;
  function off() {
    try { return localStorage.getItem("rc-motion") === "off" || localStorage.getItem("rc-title-fx") === "off"; }
    catch (e) { return false; }
  }
  function image() {
    attente = false;
    var y = window.pageYOffset || 0, p = mode === "decor" ? 0 : fin > debut ? (y - debut) / (fin - debut) : 1;
    p = p < 0 ? 0 : p > 1 ? 1 : p;
    p = p * p * (3 - 2 * p);

    var ft = pied - y, bh = Math.max(0, Math.min(vh, ft - VIDE)), bb = Math.max(0, Math.min(vh, ft)), b = bb - bh;
    var st = rue ? Math.max(-rue.h, Math.min(vh, ft - rue.h)) : 0;
    var vis = rue ? Math.max(0, Math.min(vh, st + rue.h) - Math.max(0, st)) : 0;
    if (b > 0 && !revu) { revu = true; plusTard(); } else if (b <= 0) { revu = false; }
    // 3.5.0 : le texte a son panneau opaque ; le décor prend la même opacité au centre et dans les
    // marges (--px-c = --px-m), et la rue du bas entre par un fondu de 128 px au plus (--px-bf),
    // jamais par un bord dur.
    var m = (1 - p * (1 - marge)).toFixed(3), c = m, bf = bh - Math.min(128, b), cle = c + "|" + m + "|" + bh + "|" + bb;
    if (cle !== dernier) {
      dernier = cle;
      box.style.setProperty("--px-c", c);
      box.style.setProperty("--px-m", m);
      box.style.setProperty("--px-bf", bf + "px");
      box.style.setProperty("--px-bh", bh + "px");
      box.style.setProperty("--px-bb", bb + "px");
      box.classList.toggle("px-calme", still && p >= 1);
      box.classList.toggle("px-vide", p >= 1 && b <= 0 && box.classList.contains("px-sans-marge"));
      if (rue) { rue.el.style.transform = "translate3d(0," + st + "px,0)"; rue.el.style.opacity = (vis / rue.h).toFixed(3); }
    }
    if (still) { return; }
    var t = y < 0 ? 0 : y;
    plans.forEach(function (pl) {
      if (pl === rue) { return; }
      var d = Math.round(pl.v * t / P) * P;
      if (pl.periode && d > pl.A) { d = pl.A + (d - pl.A) % pl.periode; }
      else if (pl.R) { d = pl.top + pl.h - (((pl.top - d + pl.h) % pl.R + pl.R) % pl.R); }
      if (d !== pl.dy) { pl.dy = d; pl.el.style.transform = "translate3d(0," + (-d) + "px,0)"; }
    });
  }
  function demander() { if (!attente) { attente = true; window.requestAnimationFrame(image); } }
  function mesurer() {
    minuteur = null;
    vh = root.clientHeight; docH = root.scrollHeight;
    var vw = root.clientWidth, y = window.pageYOffset || 0, pp = document.querySelector("body > footer");
    pied = pp ? pp.getBoundingClientRect().top + y : docH;   
    if (mode === "page") {
      var haut = sec ? sec.getBoundingClientRect().top + y : titre.getBoundingClientRect().bottom + y;
      debut = Math.max(0, haut - vh);
      fin = Math.max(debut + vh * 0.3, haut - vh * 0.35);
    } else { debut = fin = 0; }
    
    var L = vw, R = 0, lay = document.querySelector(".rc-layout");
    var zone = (lay ? [].slice.call(lay.children) : []).concat([document.querySelector("main"), document.getElementById("toc")]);
    zone.forEach(function (e) {
      if (!e) { return; }
      var r = e.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) { return; }
      L = Math.min(L, r.left); R = Math.max(R, r.right);
    });
    if (R <= L) { L = 0; R = vw; }
    if (L < MIN) { L = 0; }
    if (vw - R < MIN) { R = vw; }
    box.style.setProperty("--px-l", Math.round(L) + "px");
    box.style.setProperty("--px-r", Math.round(R) + "px");
    box.classList.toggle("px-sans-marge", L === 0 && R === vw);
    
    var centre = vw / 2 + 25 * (parseFloat(window.getComputedStyle(root).fontSize) || 16) + 16;
    [].forEach.call(box.querySelectorAll(".px-vie-d"), function (e) {
      var x = +e.getAttribute("data-px-x"), k = Math.floor((vw - 24 - P * (57 + x + 2)) / (P * 184));
      var g = P * (57 + 184 * k + x);
      e.style.left = g + "px";
      e.classList.toggle("px-cache", g < centre);
    });
    marge = parseFloat(window.getComputedStyle(box).getPropertyValue("--px-marge")) || 0;
    still = calm.matches || off() || root.classList.contains("rc-motion-off");
    plans.forEach(function (pl) {
      var top = pl.mode === "rue" ? 0 : Math.round(pl.base * vh / P) * P, crete = pl.crete, h;
      if (lune && pl.el.contains(lune)) { crete = Math.ceil((lune.offsetTop + lune.offsetHeight) / P) * P; }
      pl.top = top; pl.A = top + crete;
      pl.R = pl.retour ? Math.round((vh + pl.h + pl.retour * vh) / P) * P : 0;
      h = pl.mode === "bande" || pl.mode === "rue" ? pl.h : pl.periode ? crete + pl.periode + vh + 64 : vh - top + 64;
      pl.el.style.top = top + "px";
      pl.el.style.height = Math.ceil(h) + "px";
      if (still && pl !== rue) { pl.el.style.transform = ""; pl.dy = null; }
    });
    dernier = "";
    image();
  }
  function plusTard() { if (!minuteur) { minuteur = setTimeout(mesurer, 120); } }
  window.addEventListener("scroll", demander, { passive: true });
  window.addEventListener("resize", plusTard);
  window.addEventListener("load", mesurer);
  if (calm.addEventListener) { calm.addEventListener("change", mesurer); }
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(plusTard);
    [titre, document.querySelector("main"), document.getElementById("toc"), document.querySelector(".rc-layout")].forEach(function (e) {
      if (e) { ro.observe(e); }
    });
  }
  if (window.MutationObserver) {
    new MutationObserver(plusTard).observe(root, { attributes: true, attributeFilter: ["class", "style", "data-theme", "data-style"] });
    if (document.querySelector(".rc-layout")) {
      new MutationObserver(plusTard).observe(document.querySelector(".rc-layout"), { childList: true });
    }
  }
  mesurer();
  box.classList.add("px-pret");
  
  if (window.rcEntree) { window.rcEntree.partir(); }
})();
