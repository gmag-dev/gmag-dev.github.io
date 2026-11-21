

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
    function liste(cls) {
      var ul = el("ul", { "class": cls });
      if (li) {
        var a = el("a", { href: li, target: "_blank", rel: "noopener noreferrer" }), s1 = el("span", { "aria-hidden": "true" }), s2 = el("span", { "class": "sr-only" });
        a.textContent = "LinkedIn"; s1.textContent = " ↗"; s2.textContent = " (nouvel onglet)"; a.appendChild(s1); a.appendChild(s2);
        ul.appendChild(el("li")).appendChild(a);
      }
      if (mel) {
        var m = el("a", { href: "mailto:" + mel }), t = el("span", { "class": "v3-ct-adr" });
        m.textContent = "Écrire à l’autrice "; t.textContent = mel; m.appendChild(t);
        ul.appendChild(el("li")).appendChild(m);
      }
      if (tip) {
        var s = el("a", { href: tip, target: "_blank", rel: "noopener noreferrer" }), s3 = el("span", { "aria-hidden": "true" }), s4 = el("span", { "class": "sr-only" });
        s.textContent = "Soutenir sur Tipeee"; s3.textContent = " ↗"; s4.textContent = " (nouvel onglet)"; s.appendChild(s3); s.appendChild(s4);
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
