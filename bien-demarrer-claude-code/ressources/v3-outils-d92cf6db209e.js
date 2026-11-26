

(function () {
  "use strict";
  var bar = document.querySelector(".rc-bar"), root = document.documentElement;
  if (!bar) { return; }
  var ANN_MAX = 6000, RESET = /^rc-/;
  var I = {
    fs: '<svg class="rc-i v3-i-o" aria-hidden="true" focusable="false"><use href="#ti-maximize"/></svg>',
    fsx: '<svg class="rc-i v3-i-x" aria-hidden="true" focusable="false"><use href="#ti-minimize"/></svg>',
    reset: '<svg aria-hidden="true" focusable="false"><use href="#ti-refresh"/></svg>'
  };
  var optsT = bar.querySelector(".rc-opts-toggle"), opts = document.getElementById("rc-opts");
  var main = document.querySelector("main"), toc = document.getElementById("toc");
  function el(tag, attrs) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }
  var live = el("p", { "class": "v3-sr", role: "status", "aria-live": "polite" });
  bar.appendChild(live);
  function say(t) { live.textContent = ""; setTimeout(function () { live.textContent = t; }, 40); }
  function typing(e) { return !!e && (/^(INPUT|TEXTAREA|SELECT)$/.test(e.tagName) || e.isContentEditable); }

  
  var fsB = null;
  function fsSync() {
    var on = !!document.fullscreenElement;
    fsB.classList.toggle("v3-on", on);
    fsB.setAttribute("aria-pressed", String(on));
    fsB.title = (on ? "Quitter le plein écran" : "Passer en plein écran") + " (e)";
  }
  function fsToggle() {
    if (document.fullscreenElement) { document.exitFullscreen(); }
    else { root.requestFullscreen().catch(function () { say("Le navigateur refuse le plein écran."); }); }
  }
  if (document.fullscreenEnabled && root.requestFullscreen) {
    fsB = el("button", { type: "button", "class": "v3-b v3-fs", "aria-pressed": "false", "aria-label": "Plein écran",
      "aria-keyshortcuts": "e" });
    fsB.innerHTML = I.fs + I.fsx + '<span class="rc-txt" aria-hidden="true">Plein écran</span>';
    fsB.addEventListener("click", fsToggle);
    document.addEventListener("fullscreenchange", fsSync);
    bar.insertBefore(fsB, optsT);
    fsSync();
    // Touche e, avec les gardes des autres raccourcis d'une seule touche : saisie, liste ouverte, raccourcis désactivés.
    var kd = document.getElementById("rc-kd"), kl = document.querySelector(".rc-kd-list");
    document.addEventListener("keydown", function (e) {
      if (e.key !== "e" || e.defaultPrevented || e.isComposing || e.ctrlKey || e.altKey || e.metaKey || typing(document.activeElement)) { return; }
      if (kd && !kd.hidden) { return; }
      try { if (localStorage.getItem("rc-keys") === "off") { return; } } catch (x) {}
      e.preventDefault(); fsToggle();
    });
    if (kl) {
      var d = document.createElement("div"), dt = document.createElement("dt"), kb = document.createElement("kbd"), dd = document.createElement("dd");
      kb.textContent = "e"; dt.appendChild(kb); dd.textContent = "Passer en plein écran, ou en sortir"; d.appendChild(dt); d.appendChild(dd);
      kl.insertBefore(d, kl.lastElementChild);
    }
  }

  // Installer le guide (décision 32.A de l'autrice, 2026-11-21 : installer seul, sans lecture hors ligne). Forme web
  // seulement : la marque data-forme que pose l'assemblage, et une page servie en http(s). Le bouton reste toujours au
  // même endroit : une ligne « Installer » des options, après Affichage (demande de l'autrice du 2026-11-26, pour
  // faire de la place dans la barre ; il était avant Contacts) ; son panneau, déplié en place, propose l'installation en un geste quand le navigateur l'offre
  // (beforeinstallprompt), sinon dit où se trouve la commande du navigateur, ou qu'il n'y en a pas. Une fois le guide
  // installé, le bouton n'existe plus. Aucun service worker : Chromium juge la page installable sans lui (recette F49).
  (function () {
    if (root.getAttribute("data-forme") !== "web" || !/^https?:$/.test(location.protocol)) { return; }
    function mm(q) { return !!(window.matchMedia && window.matchMedia(q).matches); }
    if (navigator.standalone === true || ["standalone", "minimal-ui", "fullscreen", "window-controls-overlay"].some(function (m) {
      return mm("(display-mode: " + m + ")");
    })) { return; }
    var AIDES = [
      ["chromium", "Chrome, Edge, Samsung Internet (ordinateur, Android)", "Ouvrez le menu du navigateur (⋮), puis « Installer la page comme application » ou « Caster, enregistrer et partager », puis « Installer »."],
      ["ios", "iPhone et iPad", "Touchez le bouton Partager (un carré et une flèche vers le haut), puis « Sur l’écran d’accueil »."],
      ["safari", "Safari sur Mac", "Menu Fichier, puis « Ajouter au Dock »."],
      ["firefox-win", "Firefox sous Windows", "Cliquez sur l’icône des applications web dans la barre d’adresse, puis « Ajouter à la barre des tâches »."],
      ["firefox", "Firefox ailleurs", "Ce navigateur n’installe pas les sites. Le guide reste lisible ici, ou dans un autre navigateur."]
    ];
    // Famille du navigateur, pour choisir l'aide à montrer d'abord ; la liste « Autre navigateur » les garde toutes.
    function famille() {
      var ua = navigator.userAgent || "";
      if (/iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) { return "ios"; }
      if ("onbeforeinstallprompt" in window) { return "chromium"; }
      if (/Firefox\//.test(ua)) { return /Windows/.test(ua) ? "firefox-win" : "firefox"; }
      if (/Safari\//.test(ua) && /Macintosh/.test(ua)) { return "safari"; }
      return "chromium";
    }
    var invite = null, fam = famille();
    if (!opts) { return; }
    var w = el("div", { "class": "rc-row v3-inst" }), lbl = el("span", { "class": "rc-lbl", "aria-hidden": "true" });
    var g = el("span", { "class": "rc-grp", role: "group", "aria-label": "Installer" });
    lbl.textContent = "Installer";
    var b = el("button", { type: "button", "class": "v3-inst-b", "aria-expanded": "false", "aria-controls": "v3-inst-pan",
      "aria-label": "Installer le guide" });
    b.innerHTML = '<svg class="rc-i" aria-hidden="true" focusable="false"><use href="#ti-app-window"/></svg><span class="rc-txt" aria-hidden="true">Installer le guide</span>';
    var p = el("div", { id: "v3-inst-pan", "class": "v3-inst-pan", role: "group", "aria-label": "Installer le guide" });
    p.hidden = true;
    var note = el("p", { "class": "v3-inst-note" });
    note.textContent = "Le guide installé s’ouvre dans sa propre fenêtre. Il lui faut une connexion à internet, comme ce site.";
    var go = el("button", { type: "button", "class": "v3-inst-go" });
    go.textContent = "Installer maintenant";
    var aide = el("p", { "class": "v3-inst-aide" });
    var autres = el("details", { "class": "v3-inst-autres" }), sm = el("summary"), ul = el("ul");
    sm.textContent = "Autre navigateur";
    AIDES.forEach(function (a) {
      var li = el("li"), t = el("strong");
      t.textContent = a[1] + " : "; li.appendChild(t); li.appendChild(document.createTextNode(a[2])); ul.appendChild(li);
      if (a[0] === fam) { aide.textContent = a[2]; }
    });
    autres.appendChild(sm); autres.appendChild(ul);
    p.appendChild(note); p.appendChild(go); p.appendChild(aide); p.appendChild(autres);
    g.appendChild(b); g.appendChild(p); w.appendChild(lbl); w.appendChild(g);
    // Après la ligne Affichage ; le tri des options (20-rc-opts-order.js) garde cette place.
    var aff = opts.querySelector(".rc-fs"), apres = aff && aff.closest(".rc-row");
    opts.insertBefore(w, apres ? apres.nextSibling : null);
    // Invite disponible : le geste unique ; sinon l'aide du navigateur. Le bouton « Installer maintenant » qui disparaît
    // sous le focus le rend au bouton Installer, pour que le focus ne tombe jamais dans le vide.
    function maj() {
      var avait = document.activeElement === go;
      go.hidden = !invite; aide.hidden = !!invite;
      if (avait && go.hidden) { b.focus(); }
    }
    function ouvrir(oui) { if (oui) { maj(); } p.hidden = !oui; b.setAttribute("aria-expanded", String(oui)); }
    maj();
    b.addEventListener("click", function () { ouvrir(p.hidden); });
    window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); invite = e; maj(); });
    go.addEventListener("click", function () {
      var ev = invite;
      invite = null;
      if (!ev) { maj(); return; }
      Promise.resolve().then(function () { return ev.prompt(); }).then(function () { return ev.userChoice; }).then(function (r) {
        if (!r || r.outcome !== "accepted") { say("Installation annulée. Le bouton reste là si vous changez d’avis."); }
        maj();
      }, function () { say("Le navigateur n’a pas pu proposer l’installation. Voyez l’aide ci-dessous."); maj(); });
    });
    window.addEventListener("appinstalled", function () {
      var avait = w.contains(document.activeElement), suivant = optsT;
      w.parentNode && w.parentNode.removeChild(w);
      say("Guide installé.");
      if (avait && suivant && suivant.getClientRects().length) { suivant.focus(); }
      else if (avait) { var plus = bar.querySelector(".v3-plus"); if (plus) { plus.focus(); } }
    });
    document.addEventListener("click", function (e) { if (!p.hidden && !w.contains(e.target)) { ouvrir(false); } });
    w.addEventListener("focusout", function (e) { if (!p.hidden && e.relatedTarget && !w.contains(e.relatedTarget)) { ouvrir(false); } });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || p.hidden) { return; }
      ouvrir(false);
      // Dans le menu ≡, Échap le ferme aussi et rend le focus à son bouton : le bouton Installer, caché, ne le reprend pas.
      if (b.getClientRects().length) { e.stopPropagation(); b.focus(); }
    }, true);
  })();

  // Contacts : un bouton de la barre, juste avant Options, ouvre un petit menu de liens ; le menu ≡ des petits
  // écrans en reprend les liens dans un groupe « Contacts », en dernier. Les deux adresses se règlent à un seul
  // endroit : la clé « contacts » de scripts/11-rc-config.json. Une adresse LinkedIn vide ne rend aucune entrée.
  (function () {
    var cfg = {};
    try { cfg = (JSON.parse(document.getElementById("rc-config").textContent) || {}).contacts || {}; } catch (x) { cfg = {}; }
    var li = String(cfg.linkedin || "").trim(), mel = String(cfg.courriel || "").trim(), tip = String(cfg.tipeee || "").trim();
    if (!/^https:\/\/[^\s"<>]+$/.test(li)) { li = ""; }
    if (!/^[^\s@"<>]+@[^\s@"<>]+\.[^\s@"<>]+$/.test(mel)) { mel = ""; }
    if (!/^https:\/\/[^\s"<>]+$/.test(tip)) { tip = ""; }
    if (!li && !mel && !tip) { return; }
    // Logo décoratif devant le texte d'un lien (demande de l'autrice du 2026-11-21) : le texte porte seul le nom accessible.
    function logo(sym, cls) {
      var s = document.createElementNS("http://www.w3.org/2000/svg", "svg"), u = document.createElementNS("http://www.w3.org/2000/svg", "use");
      s.setAttribute("class", "ico-marque " + cls); s.setAttribute("aria-hidden", "true"); s.setAttribute("focusable", "false");
      u.setAttribute("href", "#" + sym); s.appendChild(u);
      return s;
    }
    function liste(cls) {
      var ul = el("ul", { "class": cls });
      if (li) {
        var a = el("a", { href: li, target: "_blank", rel: "noopener noreferrer" }), s1 = el("span", { "aria-hidden": "true" }), s2 = el("span", { "class": "sr-only" });
        a.textContent = "LinkedIn"; s1.textContent = " ↗"; s2.textContent = " (nouvel onglet)"; a.appendChild(s1); a.appendChild(s2);
        a.insertBefore(logo("ti-brand-linkedin-filled", "ico-li"), a.firstChild);
        ul.appendChild(el("li")).appendChild(a);
      }
      if (mel) {
        var m = el("a", { href: "mailto:" + mel }), t = el("span", { "class": "v3-ct-adr" });
        m.textContent = "Écrire à l’autrice "; t.textContent = mel; m.appendChild(t);
        m.insertBefore(logo("ti-mail", "ico-mel"), m.firstChild);
        ul.appendChild(el("li")).appendChild(m);
      }
      if (tip) {
        var s = el("a", { href: tip, target: "_blank", rel: "noopener noreferrer" }), s3 = el("span", { "aria-hidden": "true" }), s4 = el("span", { "class": "sr-only" });
        s.textContent = "Soutenir sur Tipeee"; s3.textContent = " ↗"; s4.textContent = " (nouvel onglet)"; s.appendChild(s3); s.appendChild(s4);
        s.insertBefore(logo("ti-heart", "ico-tip"), s.firstChild);
        ul.appendChild(el("li")).appendChild(s);
      }
      return ul;
    }
    var w = el("span", { "class": "v3-ct" }), b = el("button", { type: "button", "class": "v3-ct-b", "aria-expanded": "false", "aria-controls": "v3-ct-pan", "aria-label": "Contacts", title: "Contacts" });
    b.innerHTML = '<svg class="rc-i rc-i-contact" aria-hidden="true" focusable="false"><use href="#ti-send"/></svg><span class="rc-txt" aria-hidden="true">Contacts</span>';
    var p = liste("v3-ct-pan"); p.id = "v3-ct-pan"; p.setAttribute("aria-label", "Contacts"); p.hidden = true;
    w.appendChild(b); w.appendChild(p);
    bar.insertBefore(w, optsT && optsT.parentNode === bar ? optsT : null);
    function ouvrir(oui) { p.hidden = !oui; b.setAttribute("aria-expanded", String(oui)); }
    b.addEventListener("click", function () { ouvrir(p.hidden); });
    p.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) { ouvrir(false); } });
    document.addEventListener("click", function (e) { if (!p.hidden && !w.contains(e.target)) { ouvrir(false); } });
    w.addEventListener("focusout", function (e) { if (!p.hidden && e.relatedTarget && !w.contains(e.relatedTarget)) { ouvrir(false); } });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || p.hidden) { return; }
      e.stopPropagation(); ouvrir(false); b.focus();
    }, true);
    var pan = document.getElementById("v3-plus-pan");
    if (pan) {
      var g = el("div", { "class": "v3-ct-grp v3-fin", role: "group", "aria-labelledby": "v3-ct-t" }), h = el("p", { id: "v3-ct-t", "class": "v3-ct-t" });
      h.textContent = "Contacts"; g.appendChild(h); g.appendChild(liste("v3-ct-l"));
      pan.appendChild(g);
    }
  })();

  
  function lien(id) { return toc ? toc.querySelector(':scope > ol a[href="#' + CSS.escape(id) + '"]') : null; }
  function heads() {
    return main ? [].filter.call(main.querySelectorAll("h2[id], h3[id], section[id] > h2, section[id] > h3"), function (h) {
      return h.getClientRects().length > 0;
    }) : [];
  }
  // Le titre qui ouvre une section compte dès le début de la section : une image placée avant lui
  // (ouverture de chapitre) ne doit pas laisser la section précédente « en cours ».
  function haut(h) {
    var s = h.parentElement, debut = s && s.matches("section[id]") && s.querySelector("h2, h3") === h;
    return (debut ? s : h).getBoundingClientRect().top;
  }
  function courante() {
    var best = null, lim = window.innerHeight * 0.4;
    heads().forEach(function (h) { if (haut(h) < lim) { best = h; } });
    return best;
  }
  function cible(h) {
    var s = h.closest("section[id]"), ids = [h.id, s && s.id].filter(Boolean), i;
    for (i = 0; i < ids.length; i++) { if (lien(ids[i])) { return ids[i]; } }
    return ids[0] || null;
  }

  
  if (opts) {
    var row = el("div", { "class": "rc-row v3-reset-row" });
    row.innerHTML = '<span class="rc-lbl" aria-hidden="true">Paramètres</span><span class="rc-grp" role="group" '
      + 'aria-label="Paramètres"><button type="button" class="v3-reset" aria-expanded="false" aria-controls="v3-ask">'
      + I.reset + 'Remettre les paramètres par défaut</button></span><div class="v3-ask" id="v3-ask" role="group" '
      + 'aria-labelledby="v3-ask-q" hidden><p id="v3-ask-q">Remettre tous les paramètres par défaut ? Vos annotations '
      + 'sont gardées.</p><button type="button" class="v3-ask-ok">Remettre</button>'
      + '<button type="button" class="v3-ask-no">Annuler</button></div>';
    opts.appendChild(row);
    var rB = row.querySelector(".v3-reset"), ask = row.querySelector(".v3-ask");
    var annuler = function () { ask.hidden = true; rB.setAttribute("aria-expanded", "false"); rB.focus(); say("Paramètres gardés."); };
    rB.addEventListener("click", function () {
      ask.hidden = false; rB.setAttribute("aria-expanded", "true");
      ask.querySelector(".v3-ask-no").focus();
    });
    ask.querySelector(".v3-ask-no").addEventListener("click", annuler);
    
    if (optsT) { optsT.addEventListener("click", function () { ask.hidden = true; rB.setAttribute("aria-expanded", "false"); }); }
    ask.addEventListener("keydown", function (e) { if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); annuler(); } });
    ask.querySelector(".v3-ask-ok").addEventListener("click", function () {
      var cles = [], i, k;
      try {
        for (i = 0; i < localStorage.length; i++) { k = localStorage.key(i); if (k && RESET.test(k)) { cles.push(k); } }
        cles.forEach(function (c) { localStorage.removeItem(c); });
      } catch (x) { say("Le navigateur refuse de modifier les paramètres enregistrés."); return; }
      var h = courante(), id = h && cible(h);
      say("Paramètres remis par défaut. Annotations gardées. La page se recharge sur la section en cours.");
      setTimeout(function () {
        if (id && history.replaceState) { history.replaceState(null, "", "#" + id); }
        location.reload();
      }, 900);
    });
  }

  
  var bon = "", garde = false;
  function compteAnn(a) {
    var c = a.parentNode && a.parentNode.querySelector(".v3-compte-ann");
    if (!c && a.parentNode) { c = el("p", { "class": "v3-compte v3-compte-ann v3-x" }); a.parentNode.insertBefore(c, a.nextSibling); }
    if (c) { c.textContent = a.textContent.length + " / " + ANN_MAX; }
  }
  function refuse() { say("L'annotation tient en " + ANN_MAX + " caractères au plus : la saisie en trop est refusée."); }
  document.addEventListener("focusin", function (e) { var a = e.target; if (a && a.id === "rn-area") { bon = a.innerHTML; compteAnn(a); } }, true);
  document.addEventListener("beforeinput", function (e) {
    var a = e.target;
    if (!a || a.id !== "rn-area" || !/^insert/.test(e.inputType || "")) { return; }
    var plus = (e.data || "").length, s = window.getSelection(), sel = s && a.contains(s.anchorNode) ? s.toString().length : 0;
    if (!plus && e.dataTransfer) { plus = (e.dataTransfer.getData("text/plain") || "").length; }
    if (a.textContent.length - sel + Math.max(plus, 1) > ANN_MAX) { e.preventDefault(); refuse(); }
  }, true);
  document.addEventListener("input", function (e) {
    var a = e.target;
    if (!a || a.id !== "rn-area" || garde) { return; }
    if (a.textContent.length > ANN_MAX) {
      garde = true; a.innerHTML = bon; garde = false;
      var r = document.createRange(); r.selectNodeContents(a); r.collapse(false);
      var s = window.getSelection(); if (s) { s.removeAllRanges(); s.addRange(r); }
      refuse();
    }
    bon = a.innerHTML; compteAnn(a);
  }, true);
})();
