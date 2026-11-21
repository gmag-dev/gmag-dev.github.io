

(function () {
  "use strict";
  var main = document.querySelector("main"); if (!main) return;
  var root = document.documentElement, G = window.RC_GUIDE || { version: "", base: "guide" };
  var KEY = "guide-v3-notes-v1", OLD = "guide-v3-notes-v0", DB = "guide-v3-notes", STORE = "keys", KID = "device";
  var subtle = window.crypto && window.crypto.subtle, enc = new TextEncoder(), dec = new TextDecoder();
  var AAD = enc.encode(KEY);
  var CATS = [
    { id: "note", name: "Note", icon: "ti-notes" }, { id: "suggestion", name: "Suggestion", icon: "ti-bulb" },
    { id: "erreur", name: "Erreur", icon: "ti-alert-triangle" }, { id: "bug", name: "Bug", icon: "rn-i-bug" },
    { id: "question", name: "Question", icon: "rn-i-help" }, { id: "autre", name: "Autre", icon: "ti-tag" }];
  var notes = [], ready = false, key = null, broken = false, filter = "", draft = null, origin = null;

  
  var parser = new DOMParser();
  var KEEP = { B: "b", STRONG: "strong", I: "i", EM: "em", UL: "ul", OL: "ol", LI: "li", P: "p", BR: "br", A: "a" };
  var DROP = /^(SCRIPT|STYLE|TEMPLATE|IFRAME|FRAME|FRAMESET|OBJECT|EMBED|APPLET|SVG|MATH|NOSCRIPT|NOEMBED|NOFRAMES|HEAD|TITLE|META|LINK|BASE|TEXTAREA|SELECT|OPTION|BUTTON|INPUT|IMG|IMAGE|PICTURE|SOURCE|VIDEO|AUDIO|TRACK|CANVAS|FORM|DIALOG|XMP|PLAINTEXT)$/;
  var BLOCK = /^(DIV|H[1-6]|BLOCKQUOTE|PRE|SECTION|ARTICLE|HEADER|FOOTER|ASIDE|NAV|MAIN|FIGURE|FIGCAPTION|TABLE|THEAD|TBODY|TR|DL|DT|DD|ADDRESS|DETAILS|SUMMARY|HR)$/;
  function safeHref(h) {
    h = String(h || "").trim();
    if (!/^https?:\/\//i.test(h)) return "";
    try { var u = new URL(h); return (u.protocol === "http:" || u.protocol === "https:") ? u.href : ""; } catch (e) { return ""; }
  }
  function clean(html) {
    var src = parser.parseFromString("<!doctype html><body>" + String(html || "").slice(0, 400000), "text/html").body;
    var doc = src.ownerDocument, out = doc.createElement("div");
    (function walk(from, to) {
      Array.prototype.forEach.call(from.childNodes, function (n) {
        if (n.nodeType === 3) { to.appendChild(doc.createTextNode(n.nodeValue)); return; }
        if (n.nodeType !== 1) return;
        var t = n.nodeName.toUpperCase(), e;
        if (DROP.test(t)) return;
        var container = to === out || to.nodeName === "LI";
        if (KEEP[t] && (t !== "P" || container)) {
          if (t === "A") {
            var h = safeHref(n.getAttribute("href"));
            if (!h || to.closest && to.closest("a")) { walk(n, to); return; }
            e = doc.createElement("a"); e.setAttribute("href", h); e.setAttribute("rel", "noopener noreferrer"); e.setAttribute("target", "_blank");
          } else e = doc.createElement(KEEP[t]);
          to.appendChild(e); if (t !== "BR") walk(n, e); return;
        }
        if (BLOCK.test(t) || t === "P") {
          if (container) { e = doc.createElement("p"); to.appendChild(e); walk(n, e); if (!e.childNodes.length) e.remove(); }
          else { if (to.childNodes.length) to.appendChild(doc.createElement("br")); walk(n, to); }
          return;
        }
        walk(n, to);                       
      });
    })(src, out);
    return out.innerHTML;
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function textOf(html) { return parser.parseFromString("<!doctype html><body>" + clean(html), "text/html").body.textContent.replace(/\s+/g, " ").trim(); }

  
  function uid() { return (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2)); }
  function iso(v) { var d = typeof v === "string" ? new Date(v) : null; return d && !isNaN(d) ? d.toISOString() : ""; }
  function str(v, n) { return typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, n) : ""; }
  function norm(n) {
    if (!n || typeof n !== "object") return null;
    var created = iso(n.created) || new Date().toISOString();
    return {
      id: typeof n.id === "string" && /^[\w-]{1,64}$/.test(n.id) ? n.id : uid(),
      cat: CATS.some(function (c) { return c.id === n.cat; }) ? n.cat : "note",
      html: clean(n.html), quote: str(n.quote, 4000),
      sectionId: typeof n.sectionId === "string" && /^[\w:.-]{1,200}$/.test(n.sectionId) ? n.sectionId : "",
      sectionTitle: str(n.sectionTitle, 300), prefix: str(n.prefix, 80), suffix: str(n.suffix, 80),
      created: created, updated: iso(n.updated) || created };
  }
  function sortNotes() { notes.sort(function (a, b) { return a.created < b.created ? 1 : a.created > b.created ? -1 : 0; }); }
  function cat(id) { for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i]; return CATS[0]; }

  
  function b64(buf) { var s = "", a = new Uint8Array(buf); for (var i = 0; i < a.length; i += 0x8000) s += String.fromCharCode.apply(null, a.subarray(i, i + 0x8000)); return btoa(s); }
  function unb64(s) { var b = atob(s), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
  function idb(mode, fn) {
    return new Promise(function (ok, ko) {
      var rq; try { rq = indexedDB.open(DB, 1); } catch (e) { ko(e); return; }
      rq.onupgradeneeded = function () { rq.result.createObjectStore(STORE); };
      rq.onerror = function () { ko(rq.error); };
      rq.onsuccess = function () {
        var db = rq.result, tx, r;
        try { tx = db.transaction(STORE, mode); r = fn(tx.objectStore(STORE)); } catch (e) { db.close(); ko(e); return; }
        tx.oncomplete = function () { db.close(); ok(r ? r.result : undefined); };
        tx.onerror = tx.onabort = function () { db.close(); ko(tx.error); };
      };
    });
  }
  function readKey() { return key ? Promise.resolve(key) : idb("readonly", function (st) { return st.get(KID); }).then(function (k) { key = k || null; return key; }); }
  function ensureKey() {
    return readKey().then(function (k) {
      if (k) return k;
      return subtle.generateKey({ name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]).then(function (nk) {
        return idb("readwrite", function (st) { return st.put(nk, KID); }).then(function () { key = nk; return nk; });
      });
    });
  }
  function why(e) {
    var n = e && e.name;
    if (n === "QuotaExceededError" || n === "NS_ERROR_DOM_QUOTA_REACHED") return "Le stockage du navigateur est plein. Vos dernières modifications ne sont pas enregistrées. Exportez vos annotations pour ne rien perdre.";
    if (e && e.message === "nocrypto") return "Ce navigateur ne propose pas le chiffrement. Vos annotations ne sont pas enregistrées. Exportez-les avant de fermer la page.";
    if (e && e.message === "broken") return "Vos annotations enregistrées ne peuvent pas être déchiffrées, et rien n’est écrit par-dessus. « Tout effacer » permet de repartir de zéro.";
    return "Le navigateur bloque le stockage (navigation privée ou réglage). Vos annotations vivent seulement dans cet onglet. Exportez-les avant de fermer la page.";
  }
  var chain = Promise.resolve();
  function write() {
    var snap = JSON.stringify(notes);
    return Promise.resolve().then(function () {
      if (broken) throw new Error("broken");
      if (!subtle) throw new Error("nocrypto");
      return ensureKey().then(function (k) {
        var iv = crypto.getRandomValues(new Uint8Array(12));
        return subtle.encrypt({ name: "AES-GCM", iv: iv, additionalData: AAD }, k, enc.encode(snap)).then(function (ct) {
          localStorage.setItem(KEY, "rn2." + b64(iv) + "." + b64(ct));
          localStorage.removeItem(OLD);
        });
      });
    });
  }
  
  function persist() {
    repaint();                                              
    chain = chain.then(write).then(function () { warn(""); return true; }, function (e) { warn(why(e)); return false; });
    return chain;
  }
  function load(first) {
    var raw, old, pre = notes;
    try { raw = localStorage.getItem(KEY); old = localStorage.getItem(OLD); } catch (e) { warn(why(e)); return Promise.resolve(); }
    var list = [];
    if (old) { try { var a = JSON.parse(old); if (Array.isArray(a)) list = a; } catch (e) {} }
    if (!subtle) { notes = list.map(norm).filter(Boolean); warn(why(new Error("nocrypto"))); return Promise.resolve(); }
    var p = Promise.resolve([]);
    if (raw) {
      var m = /^rn2\.([A-Za-z0-9+/=]+)\.([A-Za-z0-9+/=]+)$/.exec(raw);
      p = m ? readKey().then(function (k) {
        if (!k) throw new Error("nokey");
        return subtle.decrypt({ name: "AES-GCM", iv: unb64(m[1]), additionalData: AAD }, k, unb64(m[2]));
      }).then(function (pt) { var a = JSON.parse(dec.decode(pt)); return Array.isArray(a) ? a : []; }) : Promise.reject(new Error("bad"));
    }
    return p.then(function (stored) {
      broken = false;
      notes = stored.map(norm).filter(Boolean);
      if (first) pre.forEach(function (n) { if (!notes.some(function (x) { return x.id === n.id; })) notes.push(n); });
      if (list.length || (first && pre.length)) {                    
        list.map(norm).filter(Boolean).forEach(function (n) { if (!notes.some(function (x) { return x.id === n.id; })) notes.push(n); });
        sortNotes();
        return write().then(function () { warn(""); }, function (e) { warn(why(e)); });
      }
      sortNotes(); warn("");
    }, function (e) {
      broken = true; notes = first ? pre : [];
      warn(why(new Error("broken")));
    });
  }

  
  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { if (attrs[k] !== null && attrs[k] !== undefined) e.setAttribute(k, attrs[k]); });
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function icon(id) { var s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); s.setAttribute("class", "hi"); s.setAttribute("aria-hidden", "true"); s.setAttribute("focusable", "false");
    var u = document.createElementNS("http://www.w3.org/2000/svg", "use"); u.setAttribute("href", "#" + id); s.appendChild(u); return s; }
  function chip(c) { var s = el("span", { "class": "rn-chip rn-c-" + c.id }); s.appendChild(el("span", { "class": "rn-sw", "aria-hidden": "true" })); s.appendChild(icon(c.icon)); s.appendChild(document.createTextNode(c.name)); return s; }
  function btn(text, attrs) { var b = el("button", Object.assign({ type: "button" }, attrs || {}), text); return b; }
  var sprite = document.createElement("div");
  sprite.innerHTML = '<svg aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">'
    + '<symbol id="rn-i-bug" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M9 9v-1a3 3 0 0 1 6 0v1"/><path d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3"/><path d="M3 13l4 0"/><path d="M17 13l4 0"/>'
    + '<path d="M12 20l0 -6"/><path d="M4 19l3.35 -2"/><path d="M20 19l-3.35 -2"/><path d="M4 7l3.75 2.4"/><path d="M20 7l-3.75 2.4"/></symbol>'
    + '<symbol id="rn-i-help" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M12 17l0 .01"/><path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4"/></symbol>'
    /*! Tabler Icons « highlight », MIT licence */
    + '<symbol id="rn-i-highlight" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M3 19h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"/><path d="M12.5 5.5l4 4"/><path d="M4.5 13.5l4 4"/><path d="M21 15v4h-8l4 -4z"/></symbol></svg>';
  document.body.appendChild(sprite.firstChild);

  var live = el("div", { "class": "rn-live sr-only", "aria-live": "polite" });
  function say(t) { live.textContent = ""; setTimeout(function () { live.textContent = t; }, 30); }

  // Seul point d'entrée : le bouton « Annotations » de la barre ouvre le panneau, qui offre l'affichage dans le texte, puis la liste.
  var entry = btn("", { "class": "rn-bar-b", "aria-controls": "rn-panel", "aria-expanded": "false", "aria-label": "Annotations", title: "Annotations" });
  (function () {
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); s.setAttribute("class", "rc-i rn-i-hl"); s.setAttribute("aria-hidden", "true"); s.setAttribute("focusable", "false");
    var u = document.createElementNS("http://www.w3.org/2000/svg", "use"); u.setAttribute("href", "#rn-i-highlight"); s.appendChild(u); entry.appendChild(s);
  })();
  entry.appendChild(el("span", { "class": "rc-txt", "aria-hidden": "true" }, "Annotations"));
  var entryN = el("span", { "class": "rn-n", "aria-hidden": "true", hidden: "" }); entry.appendChild(entryN);
  // Bouton visible pour rendre le focus : celui de la barre, ou le menu ≡ des petits écrans qui le range.
  function entryVisible() {
    if (entry.getClientRects().length) return entry;
    var p = document.querySelector(".rc-bar .v3-plus"); return p && p.getClientRects().length ? p : null;
  }
  function focusEntry() { var e = entryVisible(); if (e) e.focus({ preventScroll: true }); }

  var ann = btn("", { "class": "rn-ann", hidden: "" });
  ann.appendChild(icon("ti-writing")); ann.appendChild(document.createTextNode("Annoter"));

  var panel = el("div", { id: "rn-panel", "class": "rn-panel", role: "dialog", "aria-modal": "false", "aria-labelledby": "rn-title", hidden: "" });
  var head = el("div", { "class": "rn-head" });
  var title = el("div", { id: "rn-title", "class": "rn-title", role: "heading", "aria-level": "2", tabindex: "-1" }, "Mes annotations");
  var closeB = btn("Fermer", { "aria-label": "Fermer la liste des annotations" });
  head.appendChild(title); head.appendChild(closeB);
  var warnP = el("p", { "class": "rn-warn", role: "alert", hidden: "" });
  var msgP = el("p", { "class": "rn-msg", role: "status" });
  var body = el("div", { "class": "rn-body" });
  panel.appendChild(head); panel.appendChild(warnP); panel.appendChild(msgP); panel.appendChild(body);
  var fileIn = el("input", { type: "file", accept: ".json,application/json", hidden: "", "aria-hidden": "true", tabindex: "-1" });
  [panel, ann, live, fileIn].forEach(function (x) { document.body.appendChild(x); });
  (function () {
    var bar = document.getElementById("rc-bar");
    if (!bar) { document.body.insertBefore(entry, document.body.firstChild); return; }
    var ref = bar.querySelector(":scope > .rc-gallery-toggle") || bar.querySelector(":scope > .rc-opts-toggle");
    bar.insertBefore(entry, ref || null);
  })();

  function warn(t) { warnP.textContent = t; warnP.hidden = !t; }
  function note(t) { msgP.textContent = ""; if (t) setTimeout(function () { msgP.textContent = t; }, 30); }
  function narrow() { return window.matchMedia("(max-width: 47.99rem)").matches; }
  function count() {
    var n = notes.length;
    entry.setAttribute("aria-label", n ? "Annotations (" + n + ")" : "Annotations");
    entryN.textContent = n ? String(n) : ""; entryN.hidden = !n;
    var o = document.querySelector('[data-rc-notes="open"]'); if (o) o.textContent = n ? "Ouvrir (" + n + ")" : "Ouvrir";
  }

  
  function heads() { return main.querySelectorAll("h2[id],h3[id],h4[id]"); }
  function headText(h) { var c = h.cloneNode(true); c.querySelectorAll(".rc-anchor,.rc-back-jump,.sr-only").forEach(function (x) { x.remove(); }); return c.textContent.replace(/\s+/g, " ").trim(); }
  function sectionOf(node) {
    var hs = heads(), best = null;
    for (var i = 0; i < hs.length; i++) {
      var h = hs[i];
      if (h === node || h.contains(node) || (h.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_FOLLOWING)) best = h; else break;
    }
    return best;
  }
  function currentSection() {
    var bar = document.getElementById("rc-bar"), limit = (bar ? bar.getBoundingClientRect().bottom : 0) + 80, hs = heads(), best = hs[0] || null;
    for (var i = 0; i < hs.length; i++) { if (hs[i].getBoundingClientRect().top <= limit) best = hs[i]; else break; }
    return best;
  }
  function selectionPick() {
    var s = window.getSelection();
    if (!s || !s.rangeCount || s.isCollapsed) return null;
    var r = s.getRangeAt(0), c = r.commonAncestorContainer;
    if (!main.contains(c.nodeType === 1 ? c : c.parentNode)) return null;
    var q = rangeText(r).replace(/\s+/g, " ").trim();
    if (q.length < 2) return null;
    var h = sectionOf(r.startContainer), blk = blockOf(r.startContainer), blkEnd = blockOf(r.endContainer);
    var pre = document.createRange(), post = document.createRange();
    pre.setStart(blk, 0); pre.setEnd(r.startContainer, r.startOffset);
    post.setStart(r.endContainer, r.endOffset); post.setEnd(blkEnd, blkEnd.childNodes.length);
    return { quote: q.slice(0, 4000), sectionId: h ? h.id : "", sectionTitle: h ? headText(h) : "", range: r.cloneRange(),
      prefix: rangeText(pre).replace(/\s+/g, " ").slice(-40).trim(), suffix: rangeText(post).replace(/\s+/g, " ").slice(0, 40).trim() };
  }

  
  var BLOCKS = "p,li,dd,dt,td,th,blockquote,figcaption,caption,h2,h3,h4,pre";
  function blockOf(n) { var e = n.nodeType === 1 ? n : n.parentNode, b = e.closest(BLOCKS); return b && main.contains(b) ? b : main; }
  function skip(n) { return n.parentNode && n.parentNode.closest(".rc-back-jump,script,style,.rn-ann"); }
  function rangeText(r) {
    var c = r.commonAncestorContainer, out = "";
    if (c.nodeType === 3) return skip(c) ? "" : c.nodeValue.slice(r.startOffset, r.endOffset);
    var w = document.createTreeWalker(c, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) {
      if (!r.intersectsNode(n) || skip(n)) continue;
      var a = n === r.startContainer ? r.startOffset : 0, b = n === r.endContainer ? r.endOffset : n.nodeValue.length;
      out += n.nodeValue.slice(a, b);
    }
    return out;
  }
  
  function textMap(h) {
    var hs = heads(), i = h ? Array.prototype.indexOf.call(hs, h) : -1, end = h ? hs[i + 1] || null : null;
    var w = document.createTreeWalker(main, NodeFilter.SHOW_TEXT), s = "", map = [], n, sp = true;
    if (h) w.currentNode = h;
    while ((n = w.nextNode())) {
      if (end && (end === n || (end.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING))) break;
      if (skip(n)) continue;
      var v = n.nodeValue;
      for (var k = 0; k < v.length; k++) { var ch = v[k]; if (/\s/.test(ch)) { if (sp) continue; ch = " "; sp = true; } else sp = false; s += ch; map.push([n, k]); }
    }
    return { s: s, map: map };
  }
  
  function locate(n, cache) {
    var q = (n.quote || "").replace(/\s+/g, " ").trim(); if (!q) return null;
    var h = n.sectionId && document.getElementById(n.sectionId), scopes = h && main.contains(h) ? [h, null] : [null];
    var pf = (n.prefix || "").trim(), sf = (n.suffix || "").trim(), want = (pf ? 1 : 0) + (sf ? 1 : 0);
    for (var z = 0; z < scopes.length; z++) {
      var tm = cache ? cache.get(scopes[z]) : null;          
      if (!tm) { tm = textMap(scopes[z]); if (cache) cache.set(scopes[z], tm); }
      var hits = [], at = tm.s.indexOf(q);
      while (at >= 0 && hits.length < 50) { hits.push(at); at = tm.s.indexOf(q, at + 1); }
      if (!hits.length) continue;
      var scored = hits.map(function (x) {
        var sc = 0;
        if (pf && tm.s.slice(Math.max(0, x - pf.length - 2), x).trim().slice(-pf.length) === pf) sc++;
        if (sf && tm.s.slice(x + q.length, x + q.length + sf.length + 2).trim().slice(0, sf.length) === sf) sc++;
        return { x: x, sc: sc };
      });
      var top = Math.max.apply(null, scored.map(function (o) { return o.sc; })), best = scored.filter(function (o) { return o.sc === top; });
      var pickAt = null;
      if (best.length === 1 && (top === want || top > 0)) pickAt = best[0].x;
      else if (hits.length === 1 && scopes[z]) pickAt = hits[0];
      if (pickAt === null) return null;
      var r = document.createRange(), a = tm.map[pickAt], b = tm.map[pickAt + q.length - 1];
      r.setStart(a[0], a[1]); r.setEnd(b[0], b[1] + 1);
      return r;
    }
    return null;
  }
  
  var lit = null, litCat = "", marks = [], layer = [], lostIds = {}, lostN = 0;
  var HLKEY = "rc-notes-hl", hlOn = (function () { try { return localStorage.getItem(HLKEY) !== "off"; } catch (e) { return true; } })();
  function hasHL() { return !!(window.CSS && CSS.highlights && typeof Highlight !== "undefined"); }
  function render() {
    if (!hasHL()) return;
    var by = {}, skipId = lit && draft ? draft.id : null;
    CATS.forEach(function (c) { by[c.id] = []; });
    if (hlOn) layer.forEach(function (x) { if (x.n.id !== skipId && by[x.n.cat]) by[x.n.cat].push(x.r); });
    if (lit && by[litCat]) by[litCat].push(lit);
    CATS.forEach(function (c) {
      var name = "rc-hl-" + c.id, rs = by[c.id];
      if (!rs.length) { CSS.highlights.delete(name); return; }
      var hl = new Highlight(); rs.forEach(function (r) { hl.add(r); }); CSS.highlights.set(name, hl);
    });
  }
  function paint() {
    var cache = new Map(); layer = []; lostIds = {}; lostN = 0;
    notes.forEach(function (n) {
      if (!n.quote) return;                                 
      var r = locate(n, cache);
      if (r) layer.push({ n: n, r: r }); else { lostIds[n.id] = 1; lostN++; }
    });
    hideTip(); render(); markLost();
  }
  var paintT = 0;
  function repaint() { clearTimeout(paintT); paintT = setTimeout(paint, 0); }
  function unlight() {
    marks.forEach(function (m) { var p = m.parentNode; if (!p) return; while (m.firstChild) p.insertBefore(m.firstChild, m); p.removeChild(m); p.normalize(); });
    marks = []; lit = null; litCat = ""; render();
  }
  function light(r, catId) {
    unlight(); if (!r) return;
    if (hasHL()) { lit = r; litCat = catId; render(); return; }
    
    var c = r.commonAncestorContainer, nodes = [], w, n;
    if (c.nodeType === 3) nodes = [c]; else { w = document.createTreeWalker(c, NodeFilter.SHOW_TEXT); while ((n = w.nextNode())) if (r.intersectsNode(n) && !skip(n)) nodes.push(n); }
    var sc = r.startContainer, so = r.startOffset, ec = r.endContainer, eo = r.endOffset;
    nodes.forEach(function (t) {
      var a = t === sc ? so : 0, b = t === ec ? eo : t.nodeValue.length; if (b <= a) return;
      if (b < t.nodeValue.length) t.splitText(b);
      if (a > 0) t = t.splitText(a);
      var m = document.createElement("mark"); m.className = "rn-mark rn-c-" + catId; t.parentNode.insertBefore(m, t); m.appendChild(t); marks.push(m);
    });
  }
  function relight(catId) {
    if (lit && hasHL()) light(lit, catId);
    else marks.forEach(function (m) { m.className = "rn-mark rn-c-" + catId; });
  }
  function still() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches || root.classList.contains("rc-motion-off"); }
  function bringIntoView(r) {
    var bar = document.getElementById("rc-bar"), b = bar ? bar.getBoundingClientRect().bottom : 0, rc = r.getBoundingClientRect();
    var bottom = narrow() && !panel.hidden ? window.innerHeight - panel.offsetHeight : window.innerHeight;
    if (rc.top >= b + 16 && rc.bottom <= bottom - 16) return;
    window.scrollTo({ top: window.scrollY + rc.top - b - 80, behavior: still() ? "auto" : "smooth" });
  }

  
  var pick = null, selT = 0;
  function hideAnn() { ann.hidden = true; pick = null; }
  function showAnn() {
    pick = selectionPick();
    if (!pick) { ann.hidden = true; return; }
    var rects = pick.range.getClientRects(); if (!rects.length) { ann.hidden = true; return; }
    ann.hidden = false;
    var first = rects[0], last = rects[rects.length - 1], mr = main.getBoundingClientRect(), vw = document.documentElement.clientWidth;
    var w = ann.offsetWidth, h = ann.offsetHeight, x, y;
    if (mr.right + 12 + w <= vw - 8) { x = mr.right + 12; y = first.top; }
    else { x = Math.max(8, Math.min(last.right - w, vw - w - 8)); y = last.bottom + 6; }
    ann.style.left = Math.round(x + window.scrollX) + "px"; ann.style.top = Math.round(y + window.scrollY) + "px";
  }
  document.addEventListener("selectionchange", function () { clearTimeout(selT); selT = setTimeout(showAnn, 180); });
  ann.addEventListener("mousedown", function (e) { e.preventDefault(); });
  ann.addEventListener("click", function () {
    var p = pick || selectionPick(); if (!p) return;
    origin = entry; hideAnn(); openEditor(null, p);
  });
  window.addEventListener("resize", function () { if (!ann.hidden) showAnn(); });

  
  function open(view) {
    if (panel.hidden) {
      var a = document.activeElement;
      origin = origin || (a && a !== document.body && !panel.contains(a) && a !== ann ? a : entry);
      panel.hidden = false; entry.setAttribute("aria-expanded", "true"); unlight();
    }
    if (view === "list") showList(true);
  }
  function close(restore, keepLight) {
    if (panel.hidden) return;
    panel.hidden = true; entry.setAttribute("aria-expanded", "false"); note("");
    if (!keepLight) unlight();
    var o = origin; origin = null;
    if (restore !== false) { if (o && document.contains(o) && o.getClientRects().length) o.focus(); else focusEntry(); }
  }
  entry.addEventListener("click", function () {
    if (!panel.hidden) { close(); return; }
    origin = entry; open(); if (draft) showEditor(); else showList(true);
  });
  closeB.addEventListener("click", function () { close(); });
  panel.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    e.preventDefault(); e.stopPropagation();
    var lk = panel.querySelector(".rn-link:not([hidden])");
    if (lk) { lk.hidden = true; var ar = panel.querySelector(".rn-area"); if (ar) ar.focus(); return; }
    close();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !ann.hidden) hideAnn(); });

  
  function fmtDate(v) { try { return new Date(v).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" }); } catch (e) { return v; } }
  function showList(focusTitle, focusId) {
    draft = null; unlight();
    body.textContent = "";
    body.appendChild(hlRow());
    var top = el("div", { "class": "rn-row" });
    var add = btn("Annoter la section", { "class": "rn-primary" });
    add.addEventListener("click", function () { annotateHere(); });
    top.appendChild(add); body.appendChild(top);

    var fr = el("div", { "class": "rn-row" }), lab = el("label", { "for": "rn-filter" }, "Afficher"), sel = el("select", { id: "rn-filter" });
    sel.appendChild(el("option", { value: "" }, "Toutes les catégories (" + notes.length + ")"));
    CATS.forEach(function (c) { var n = notes.filter(function (x) { return x.cat === c.id; }).length; sel.appendChild(el("option", { value: c.id }, c.name + " (" + n + ")")); });
    sel.value = filter;
    sel.addEventListener("change", function () { filter = sel.value; showList(false); var s = document.getElementById("rn-filter"); if (s) s.focus(); say(shown().length + " notes affichées"); });
    fr.appendChild(lab); fr.appendChild(sel); body.appendChild(fr);
    body.appendChild(el("p", { "class": "rn-lost-n", role: "status", hidden: "" }));

    var list = shown();
    if (!ready) body.appendChild(el("p", { "class": "rn-empty" }, "Chargement des notes…"));
    else if (!list.length) body.appendChild(el("p", { "class": "rn-empty" }, notes.length ? "Aucune note dans cette catégorie." :
      "Aucune note pour l’instant. Sélectionnez un passage du guide puis choisissez « Annoter », ou utilisez « Annoter la section »."));
    else {
      var ol = el("ol", { "class": "rn-list", "aria-label": "Notes, de la plus récente à la plus ancienne" });
      list.forEach(function (n) { ol.appendChild(card(n)); });
      body.appendChild(ol);
    }
    body.appendChild(tools());
    body.appendChild(security());
    count(); markLost();
    if (focusId) { var f = body.querySelector('[data-rn-id="' + focusId + '"] button'); if (f) { f.focus(); return; } }
    if (focusTitle) title.focus();
  }
  function shown() { return notes.filter(function (n) { return !filter || n.cat === filter; }); }
  function card(n) {
    var c = cat(n.cat), li = el("li", { "class": "rn-card rn-c-" + c.id, "data-rn-id": n.id });
    var meta = el("p", { "class": "rn-meta" }); meta.appendChild(chip(c));
    var where = n.sectionTitle || "Section inconnue";
    meta.appendChild(el("span", { "class": "rn-where" }, "Section : " + where)); li.appendChild(meta);
    if (n.quote) li.appendChild(el("blockquote", { "class": "rn-q" }, n.quote));
    if (n.html) { var t = el("div", { "class": "rn-text" }); t.innerHTML = clean(n.html); li.appendChild(t); }
    li.appendChild(el("p", { "class": "rn-date" }, "Créée le " + fmtDate(n.created) + (n.updated !== n.created ? ". Modifiée le " + fmtDate(n.updated) + "." : ".")));
    var row = el("div", { "class": "rn-row" });
    var go = btn("Aller", { "aria-label": "Aller au passage, section " + where }), ed = btn("Modifier", { "aria-label": "Modifier la note, section " + where }),
      del = btn("Supprimer", { "class": "rn-danger", "aria-label": "Supprimer la note, section " + where });
    row.appendChild(go); row.appendChild(ed); row.appendChild(del); li.appendChild(row);
    go.addEventListener("click", function () { jump(n, go); });
    ed.addEventListener("click", function () { openEditor(n); });
    del.addEventListener("click", function () {
      if (li.querySelector(".rn-ask")) return;
      var ask = el("div", { "class": "rn-ask", role: "group", "aria-label": "Confirmer la suppression" });
      ask.appendChild(el("p", null, "Supprimer cette note ? Ce choix est définitif."));
      var yes = btn("Oui, supprimer", { "class": "rn-danger" }), no = btn("Annuler");
      var r2 = el("div", { "class": "rn-row" }); r2.appendChild(yes); r2.appendChild(no); ask.appendChild(r2); li.appendChild(ask);
      no.addEventListener("click", function () { ask.remove(); del.focus(); });
      yes.addEventListener("click", function () {
        notes = notes.filter(function (x) { return x.id !== n.id; });
        persist(); showList(true); say("Note supprimée"); note("Note supprimée.");
      });
      no.focus();
    });
    return li;
  }

  
  function jump(n, from) {
    var h = n.sectionId && document.getElementById(n.sectionId), r = locate(n), dest = r ? blockOf(r.startContainer) : null;
    if (dest === main) dest = null;
    if (!dest && (!h || !main.contains(h))) { note("La section de cette note n’existe plus dans cette version du guide."); return; }
    dest = dest || h;
    var tmp = !dest.id;
    if (tmp) { var old = document.getElementById("rn-here"); if (old) old.removeAttribute("id"); dest.id = "rn-here"; }
    var a = el("a", { href: "#" + dest.id, "class": "sr-only", tabindex: "-1" }, n.sectionTitle || dest.id);
    main.appendChild(a); a.click(); a.remove();
    if (tmp) {                                            
      if (h && history.replaceState) history.replaceState(null, "", "#" + h.id);
      setTimeout(function () { if (dest.id === "rn-here") dest.removeAttribute("id"); }, 0);
    }
    light(r, n.cat);
    note(n.quote && !r ? "Passage introuvable dans cette version du guide : la section s’affiche à la place." : "");
    if (narrow()) close(false, true);                     
    else if (from && document.contains(from)) from.focus({ preventScroll: true });   
    say("Passage affiché : " + (n.sectionTitle || ""));
  }
  function annotateHere() {
    var p = selectionPick();
    if (!p) { var h = currentSection(); p = { quote: "", sectionId: h ? h.id : "", sectionTitle: h ? headText(h) : "", prefix: "", suffix: "" }; }
    hideAnn(); openEditor(null, p);
  }

  
  function openEditor(n, p) {
    open();
    draft = n ? { id: n.id, cat: n.cat, html: n.html, quote: n.quote, sectionId: n.sectionId, sectionTitle: n.sectionTitle, prefix: n.prefix, suffix: n.suffix, range: null, scroll: true }
      : { id: null, cat: "note", html: "", quote: p ? p.quote : "", sectionId: p ? p.sectionId : "", sectionTitle: p ? p.sectionTitle : "",
          prefix: p ? p.prefix : "", suffix: p ? p.suffix : "", range: p && p.range ? p.range : null, scroll: false };
    showEditor();
  }
  function cmd(c, v) { try { document.execCommand(c, false, v === undefined ? null : v); } catch (e) {} }
  function showEditor() {
    var d = draft; body.textContent = "";
    var form = el("form", { "class": "rn-ed", "aria-label": d.id ? "Modifier la note" : "Nouvelle note", novalidate: "" });
    form.appendChild(el("p", { "class": "rn-where" }, "Section : " + (d.sectionTitle || "aucune")));
    
    var r = null;
    if (d.quote) r = d.range && document.contains(d.range.startContainer) && rangeText(d.range).replace(/\s+/g, " ").trim() === d.quote ? d.range : locate(d);
    d.range = r;
    if (d.quote) {
      form.appendChild(el("p", { "class": "rn-lbl", id: "rn-q-l" }, "Passage cité"));
      form.appendChild(el("blockquote", { "class": "rn-q", "aria-labelledby": "rn-q-l" }, d.quote));
      if (!r) form.appendChild(el("p", { "class": "rn-lost", role: "status" }, "Passage introuvable dans cette version du guide. La note reste intacte."));
    }
    
    var cr = el("div", { "class": "rn-row" }), cl = el("span", { "class": "rn-lbl-inline", id: "rn-cat-l" }, "Catégorie"),
      cs = el("div", { "class": "rn-cats", role: "radiogroup", "aria-labelledby": "rn-cat-l", id: "rn-cat" });
    var opts = CATS.map(function (c) {
      var b = el("button", { type: "button", role: "radio", "class": "rn-cat-opt", "data-cat": c.id });
      b.appendChild(chip(c)); cs.appendChild(b); return b;
    });
    function showCat() {
      opts.forEach(function (b) { var on = b.getAttribute("data-cat") === d.cat; b.setAttribute("aria-checked", on ? "true" : "false"); b.tabIndex = on ? 0 : -1; });
    }
    function pick(b, focus) { d.cat = b.getAttribute("data-cat"); showCat(); relight(d.cat); if (focus) b.focus(); }
    cs.addEventListener("click", function (e) { var b = e.target.closest(".rn-cat-opt"); if (b) pick(b, false); });
    cs.addEventListener("keydown", function (e) {
      var i = opts.indexOf(document.activeElement); if (i < 0) return;
      var k = e.key, j = k === "ArrowRight" || k === "ArrowDown" ? (i + 1) % opts.length : k === "ArrowLeft" || k === "ArrowUp" ? (i - 1 + opts.length) % opts.length : k === "Home" ? 0 : k === "End" ? opts.length - 1 : -1;
      if (j < 0) return; e.preventDefault(); pick(opts[j], true);
    });
    showCat();
    cr.appendChild(cl); cr.appendChild(cs); form.appendChild(cr);

    form.appendChild(el("p", { "class": "rn-lbl", id: "rn-area-l" }, "Texte de la note"));
    var bar = el("div", { "class": "rn-tools", role: "toolbar", "aria-label": "Mise en forme", "aria-controls": "rn-area" });
    var B = [["Gras", "bold", "font-weight:700"], ["Italique", "italic", "font-style:italic"], ["Puces", "insertUnorderedList"],
      ["Numéros", "insertOrderedList"], ["Lien", "link"], ["Sans mise en forme", "clear"]];
    var tb = {};
    B.forEach(function (x) {
      var b = btn(x[0], { "data-cmd": x[1], style: x[2] || null, "aria-label": x[1] === "insertUnorderedList" ? "Liste à puces" : x[1] === "insertOrderedList" ? "Liste numérotée" : null });
      if (x[1] === "bold" || x[1] === "italic") b.setAttribute("aria-pressed", "false");
      b.addEventListener("mousedown", function (e) { e.preventDefault(); });
      bar.appendChild(b); tb[x[1]] = b;
    });
    form.appendChild(bar);
    var lk = el("div", { "class": "rn-row rn-link", hidden: "" }), ll = el("label", { "for": "rn-url" }, "Adresse du lien"),
      li = el("input", { id: "rn-url", type: "url", placeholder: "https://", autocomplete: "url", spellcheck: "false" }), lok = btn("Insérer le lien"), lno = btn("Annuler");
    lk.appendChild(ll); lk.appendChild(li); lk.appendChild(lok); lk.appendChild(lno); form.appendChild(lk);
    var area = el("div", { id: "rn-area", "class": "rn-area", contenteditable: "true", role: "textbox", "aria-multiline": "true",
      "aria-labelledby": "rn-area-l", "aria-describedby": "rn-hint", "data-ph": "Écrivez votre note ici.", spellcheck: "true", lang: "fr" });
    area.innerHTML = clean(d.html);
    form.appendChild(area);
    form.appendChild(el("p", { "class": "rn-hint", id: "rn-hint" }, "Raccourcis : Ctrl+B pour le gras, Ctrl+I pour l’italique, Ctrl+K pour un lien."));
    var row = el("div", { "class": "rn-row" }), ok = el("button", { type: "submit", "class": "rn-primary" }, "Enregistrer"), no = btn("Annuler");
    row.appendChild(ok); row.appendChild(no); form.appendChild(row);
    body.appendChild(form);
    light(r, d.cat);
    if (r && d.scroll) { d.scroll = false; bringIntoView(r); }

    var saved = null;
    function keep() { var s = window.getSelection(); if (s.rangeCount && area.contains(s.getRangeAt(0).commonAncestorContainer)) saved = s.getRangeAt(0).cloneRange(); }
    function back() { area.focus(); if (saved) { var s = window.getSelection(); s.removeAllRanges(); s.addRange(saved); } }
    function states() {
      if (!document.contains(area)) return;
      ["bold", "italic"].forEach(function (c) { var on = false; try { on = document.activeElement === area && document.queryCommandState(c); } catch (e) {} tb[c].setAttribute("aria-pressed", String(!!on)); });
    }
    function linkOpen() { keep(); lk.hidden = false; li.value = ""; li.focus(); }
    function linkDo() {
      var h = safeHref(li.value);
      if (!h) { note("Adresse refusée : seules les adresses qui commencent par http:// ou https:// sont acceptées."); li.focus(); return; }
      lk.hidden = true; back();
      var s = window.getSelection();
      if (!s.rangeCount || s.isCollapsed) cmd("insertHTML", '<a href="' + esc(h) + '">' + esc(h) + "</a>"); else cmd("createLink", h);
      d.html = area.innerHTML; note("");
    }
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var c = b.getAttribute("data-cmd");
      if (c === "link") { linkOpen(); return; }
      area.focus();
      if (c === "clear") { cmd("removeFormat"); cmd("unlink"); } else cmd(c);
      d.html = area.innerHTML; states();
    });
    bar.addEventListener("keydown", function (e) {           
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var bs = Array.prototype.slice.call(bar.querySelectorAll("button")), i = bs.indexOf(document.activeElement);
      if (i < 0) return; e.preventDefault(); bs[(i + (e.key === "ArrowRight" ? 1 : bs.length - 1)) % bs.length].focus();
    });
    lok.addEventListener("click", linkDo);
    lno.addEventListener("click", function () { lk.hidden = true; back(); });
    li.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); linkDo(); } });
    try { document.execCommand("defaultParagraphSeparator", false, "p"); } catch (e) {}
    area.addEventListener("keydown", function (e) {
      if (!(e.ctrlKey || e.metaKey) || e.altKey) return;
      var k = e.key.toLowerCase();
      if (k === "b" || k === "i") { e.preventDefault(); e.stopPropagation(); cmd(k === "b" ? "bold" : "italic"); d.html = area.innerHTML; states(); }
      else if (k === "k") { e.preventDefault(); e.stopPropagation(); linkOpen(); }
    });
    area.addEventListener("keyup", states); area.addEventListener("mouseup", states); area.addEventListener("focus", states);
    area.addEventListener("input", function () { d.html = area.innerHTML; });
    area.addEventListener("blur", keep);
    
    area.addEventListener("paste", function (e) {
      var cd = e.clipboardData; if (!cd) return;
      e.preventDefault();
      var h = cd.getData("text/html"), t = cd.getData("text/plain");
      cmd("insertHTML", h ? clean(h) : esc(t).replace(/\r?\n/g, "<br>"));
      d.html = area.innerHTML;
    });
    area.addEventListener("drop", function (e) {
      e.preventDefault();
      var t = e.dataTransfer && e.dataTransfer.getData("text/plain");
      if (t) { area.focus(); cmd("insertText", t); d.html = area.innerHTML; }
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var html = clean(area.innerHTML);
      if (!textOf(html) && !d.quote) { note("La note est vide. Écrivez un texte ou partez d’un passage sélectionné."); area.focus(); return; }
      if (!textOf(html)) html = "";
      var now = new Date().toISOString(), id = d.id;
      if (id) notes.forEach(function (x) { if (x.id === id) { x.cat = d.cat; x.html = html; x.updated = now; } });
      else { id = uid(); notes.unshift({ id: id, cat: d.cat, html: html, quote: d.quote, sectionId: d.sectionId, sectionTitle: d.sectionTitle, prefix: d.prefix || "", suffix: d.suffix || "", created: now, updated: now }); }
      draft = null; filter = filter && filter !== d.cat ? "" : filter;
      persist().then(function (okd) { say(okd ? "Note enregistrée" : "Note gardée dans cet onglet seulement"); });
      showList(false, id); note("Note enregistrée.");
    });
    no.addEventListener("click", function () {
      draft = null;
      if (origin === entry && !notes.length) { close(); return; }
      showList(true);
    });
    area.focus();
    var r = document.createRange(); r.selectNodeContents(area); r.collapse(false);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }

  
  
  function stamp() {
    var d = new Date(), p = function (n) { return String(n).padStart(2, "0"); }, o = -d.getTimezoneOffset(), a = Math.abs(o);
    return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + "T" + p(d.getHours()) + p(d.getMinutes()) + p(d.getSeconds())
      + (o < 0 ? "-" : "+") + p(Math.floor(a / 60)) + p(a % 60);
  }
  function fileName(ext) { return G.base + "-annotations-" + stamp() + "." + ext; }
  function download(text, type, name) {
    var b = new Blob([text], { type: type }), u = URL.createObjectURL(b), a = el("a", { href: u, download: name });
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 4000);
  }
  function toMd(html) {
    var doc = parser.parseFromString("<!doctype html><body>" + clean(html), "text/html"), bd = doc.body;
    function inl(n) {
      var s = "";
      n.childNodes.forEach(function (c) {
        if (c.nodeType === 3) { s += c.nodeValue.replace(/\s+/g, " "); return; }
        if (c.nodeType !== 1) return;
        var t = c.nodeName, x;
        if (t === "BR") s += "  \n";
        else if (t === "B" || t === "STRONG") { x = inl(c).trim(); if (x) s += "**" + x + "**"; }
        else if (t === "I" || t === "EM") { x = inl(c).trim(); if (x) s += "*" + x + "*"; }
        else if (t === "A") s += "[" + (inl(c).trim() || c.getAttribute("href")) + "](" + c.getAttribute("href") + ")";
        else if (t === "UL" || t === "OL") s += "\n" + list(c, 0) + "\n";
        else s += inl(c);
      });
      return s;
    }
    function list(l, depth) {
      var out = [], i = 1;
      Array.prototype.forEach.call(l.children, function (item) {
        if (item.nodeName !== "LI") return;
        var mark = l.nodeName === "OL" ? (i++) + ". " : "- ", pad = "   ".repeat(depth), txt = "", subs = [];
        item.childNodes.forEach(function (c) {
          if (c.nodeName === "UL" || c.nodeName === "OL") subs.push(list(c, depth + 1));
          else { var w = doc.createElement("span"); w.appendChild(c.cloneNode(true)); txt += inl(w) + (c.nodeName === "P" ? " " : ""); }
        });
        out.push(pad + mark + txt.replace(/\s+/g, " ").trim()); subs.forEach(function (x) { out.push(x); });
      });
      return out.join("\n");
    }
    var blocks = [], run = doc.createElement("span");
    function flush() { var t = inl(run).trim(); if (t) blocks.push(t); run = doc.createElement("span"); }
    Array.prototype.slice.call(bd.childNodes).forEach(function (c) {
      if (c.nodeName === "P") { flush(); var t = inl(c).trim(); if (t) blocks.push(t); }
      else if (c.nodeName === "UL" || c.nodeName === "OL") { flush(); blocks.push(list(c, 0)); }
      else run.appendChild(c);
    });
    flush();
    return blocks.join("\n\n");
  }
  function markdown() {
    var out = ["# Mes notes sur « Bien démarrer avec Claude Code » (version " + G.version + ")", "",
      "Exportées le " + fmtDate(new Date().toISOString()) + ". " + notes.length + (notes.length > 1 ? " notes." : " note.") + " Ce fichier est en clair : toute personne qui l’obtient peut le lire.", ""];
    CATS.forEach(function (c) {
      var ns = notes.filter(function (n) { return n.cat === c.id; }); if (!ns.length) return;
      out.push("## " + c.name + " (" + ns.length + ")", "");
      ns.forEach(function (n) {
        out.push("### " + (n.sectionTitle || "Section inconnue"), "");
        if (n.quote) { out.push("> " + n.quote, ""); }
        var t = toMd(n.html); if (t) out.push(t, "");
        out.push("*" + "Créée le " + fmtDate(n.created) + (n.updated !== n.created ? ", modifiée le " + fmtDate(n.updated) : "") + (n.sectionId ? ". Ancre : #" + n.sectionId : "") + ".*", "");
      });
    });
    return out.join("\n");
  }
  function json() {
    return JSON.stringify({ format: "rc-notes", formatVersion: 1, guide: "Bien démarrer avec Claude Code", guideVersion: G.version,
      exported: new Date().toISOString(), notes: notes }, null, 2);
  }
  function copyAll() {
    var t = markdown();
    function fallback() {
      var ta = el("textarea", { readonly: "", "aria-hidden": "true", style: "position:fixed;left:-9999px;top:0" }); ta.value = t;
      document.body.appendChild(ta); ta.select(); var ok = false; try { ok = document.execCommand("copy"); } catch (e) {} ta.remove();
      note(ok ? "Toutes les notes sont copiées, au format Markdown." : "Copie refusée par le navigateur. Utilisez « Exporter (Markdown) ».");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function () { note("Toutes les notes sont copiées, au format Markdown."); }, fallback);
    else fallback();
  }
  function importFile(f) {
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { note("Fichier trop gros pour un export de notes (plus de 5 Mo)."); return; }
    f.text().then(function (t) {
      var d = JSON.parse(t), arr = Array.isArray(d) ? d : d && Array.isArray(d.notes) ? d.notes : null;
      if (!arr) throw new Error("shape");
      var added = 0, upd = 0;
      arr.map(norm).filter(Boolean).forEach(function (n) {
        var i = -1; notes.forEach(function (x, k) { if (x.id === n.id) i = k; });
        if (i < 0) { notes.push(n); added++; } else if (n.updated > notes[i].updated) { notes[i] = n; upd++; }
      });
      sortNotes(); persist(); filter = ""; showList(false);
      var m = added + (added > 1 ? " notes importées" : " note importée") + ", " + upd + (upd > 1 ? " mises à jour." : " mise à jour.");
      note(m); say(m);
    }).catch(function () { note("Ce fichier n’est pas un export de notes au format JSON."); });
  }
  fileIn.addEventListener("change", function () { importFile(fileIn.files[0]); fileIn.value = ""; });
  function eraseAll() {
    notes = []; key = null; broken = false; draft = null;
    try { localStorage.removeItem(KEY); localStorage.removeItem(OLD); } catch (e) {}
    chain = chain.then(function () {
      return new Promise(function (ok) { var rq; try { rq = indexedDB.deleteDatabase(DB); } catch (e) { ok(); return; } rq.onsuccess = rq.onerror = rq.onblocked = function () { ok(); }; });
    });
    repaint(); warn(""); showList(true); note("Toutes les notes et la clé de chiffrement sont effacées."); say("Toutes les notes sont effacées");
  }
  function tools() {
    var dt = el("details", { "class": "rn-more" }); dt.appendChild(el("summary", null, "Exporter, importer, tout effacer"));
    dt.appendChild(el("p", { "class": "rn-clear" }, "Les exports Markdown et JSON sont en clair : toute personne qui obtient le fichier peut lire vos annotations."));
    var r = el("div", { "class": "rn-row" });
    var em = btn("Exporter (Markdown)"), ej = btn("Exporter (JSON)"), cp = btn("Copier tout"), im = btn("Importer (JSON)"), er = btn("Tout effacer", { "class": "rn-danger" });
    [em, ej, cp, im, er].forEach(function (b) { r.appendChild(b); }); dt.appendChild(r);
    em.addEventListener("click", function () { download(markdown(), "text/markdown;charset=utf-8", fileName("md")); note("Export Markdown téléchargé."); });
    ej.addEventListener("click", function () { download(json(), "application/json;charset=utf-8", fileName("json")); note("Export JSON téléchargé."); });
    cp.addEventListener("click", copyAll);
    im.addEventListener("click", function () { fileIn.click(); });
    er.addEventListener("click", function () {
      if (dt.querySelector(".rn-ask")) return;
      var ask = el("div", { "class": "rn-ask", role: "group", "aria-label": "Confirmer l’effacement" });
      ask.appendChild(el("p", null, "Effacer toutes les notes et la clé de chiffrement de ce navigateur ? Ce choix est définitif. Exportez d’abord si vous voulez les garder."));
      var yes = btn("Oui, tout effacer", { "class": "rn-danger" }), no = btn("Annuler"), r2 = el("div", { "class": "rn-row" });
      r2.appendChild(yes); r2.appendChild(no); ask.appendChild(r2); dt.appendChild(ask);
      no.addEventListener("click", function () { ask.remove(); er.focus(); });
      yes.addEventListener("click", eraseAll);
      no.focus();
    });
    return dt;
  }
  function security() {
    var dt = el("details", { "class": "rn-sec" }); dt.appendChild(el("summary", null, "Ce qui protège vos annotations, et ce qui ne les protège pas"));
    ["Vos annotations restent dans ce navigateur. Elles ne partent nulle part, sauf par un export que vous faites.",
      "Elles sont chiffrées dans le stockage du navigateur (AES-GCM 256). La clé est créée dans ce navigateur, rangée à part et impossible à extraire.",
      "Ce chiffrement empêche une lecture rapide du stockage ou une copie de son texte.",
      "Il ne protège pas contre un script qui tourne dans la page, ni contre une personne qui a un accès complet à votre profil de navigateur : la clé est rangée dans ce même profil.",
      "La page interdit toute connexion vers un autre site. Le texte des notes est nettoyé : aucun code collé ne peut s’exécuter.",
      "Les exports Markdown et JSON sont en clair. « Tout effacer » supprime les notes et la clé."].forEach(function (t) { dt.appendChild(el("p", null, t)); });
    return dt;
  }

  
  function markLost() {
    var s = body.querySelector(".rn-lost-n");
    if (s) { s.textContent = lostN === 1 ? "1 passage introuvable : sa note reste dans la liste, sans surlignage."
      : lostN + " passages introuvables : leurs notes restent dans la liste, sans surlignage."; s.hidden = !lostN; }
    body.querySelectorAll(".rn-card[data-rn-id]").forEach(function (li) {
      var m = li.querySelector(".rn-lost"), gone = !!lostIds[li.getAttribute("data-rn-id")];
      if (gone && !m) { var p = el("p", { "class": "rn-lost" }, "Passage introuvable dans cette version du guide : pas de surlignage.");
        var q = li.querySelector(".rn-q"); li.insertBefore(p, q ? q.nextSibling : li.children[1] || null); }
      else if (!gone && m) m.remove();
    });
  }

  
  // Affichage des annotations dans le texte : première ligne du panneau, avant la liste. Il règle le surlignage, jamais les annotations.
  function showHlToggle() { var c = document.getElementById("rn-hl"); if (c) c.checked = hlOn; }
  function setHl(v) {
    hlOn = !!v; try { localStorage.setItem(HLKEY, hlOn ? "on" : "off"); } catch (e) {}
    showHlToggle(); if (!hlOn) hideTip(); render();
    say(hlOn ? "Annotations affichées dans le texte" : "Annotations masquées dans le texte");
  }
  function hlRow() {
    var r = el("div", { "class": "rn-row rn-hl-row" });
    if (!hasHL()) { r.appendChild(el("p", { "class": "rn-hl-none" }, "Ce navigateur ne sait pas surligner un passage sans toucher à la page : vos annotations restent dans la liste.")); return r; }
    var lab = el("label", { "class": "rn-hl-opt", "for": "rn-hl" }), cb = el("input", { type: "checkbox", id: "rn-hl" });
    cb.checked = hlOn;
    cb.addEventListener("change", function () { setHl(cb.checked); });
    lab.appendChild(cb); lab.appendChild(document.createTextNode("Afficher les annotations dans le texte"));
    r.appendChild(lab); return r;
  }

  
  var tip = el("div", { id: "rn-tip", "class": "rn-tip", role: "tooltip", hidden: "" });
  document.body.appendChild(tip);
  var tipHits = [], tipT = 0, tipMode = "", tipPrev = null, lastPT = "mouse";
  function caretAt(x, y) {
    try {
      if (document.caretPositionFromPoint) { var p = document.caretPositionFromPoint(x, y); return p ? { node: p.offsetNode, off: p.offset } : null; }
      if (document.caretRangeFromPoint) { var r = document.caretRangeFromPoint(x, y); return r ? { node: r.startContainer, off: r.startOffset } : null; }
    } catch (e) {}
    return null;
  }
  function liveLayer() { var skipId = lit && draft ? draft.id : null; return hlOn ? layer.filter(function (x) { return x.n.id !== skipId && document.contains(x.r.startContainer); }) : []; }
  function inRect(q, x, y) { return q.width > 0 && q.height > 0 && x >= q.left - 1 && x <= q.right + 1 && y >= q.top - 1 && y <= q.bottom + 1; }
  function hitsAt(x, y) {
    var L = liveLayer(); if (!L.length) return [];
    var c = caretAt(x, y), out = [];
    if (c && !(c.node && main.contains(c.node))) c = null;
    L.forEach(function (it) {
      if (!inRect(it.r.getBoundingClientRect(), x, y)) return;
      var rs = it.r.getClientRects(), inside = false;
      for (var i = 0; i < rs.length && !inside; i++) inside = inRect(rs[i], x, y);
      if (!inside) return;
      if (c) { try { if (it.r.comparePoint(c.node, c.off) !== 0) return; } catch (e) {} }
      out.push(it);
    });
    return out;
  }
  function sameHits(a) { return a.length === tipHits.length && a.every(function (x, i) { return x.n.id === tipHits[i].n.id; }); }
  function placeTip(px, py) {
    tip.style.maxHeight = ""; tip.style.left = "0px"; tip.style.top = "0px";
    var vw = document.documentElement.clientWidth, vh = window.innerHeight, bar = document.getElementById("rc-bar");
    var lo = (bar ? Math.max(0, bar.getBoundingClientRect().bottom) : 0) + 6, hi = vh - 6, gap = 6;
    var R = null, line = null;
    tipHits.forEach(function (it) {
      var b = it.r.getBoundingClientRect();
      R = R ? { top: Math.min(R.top, b.top), bottom: Math.max(R.bottom, b.bottom) } : { top: b.top, bottom: b.bottom };
      Array.prototype.forEach.call(it.r.getClientRects(), function (q) { if (!line && inRect(q, px, py)) line = q; });
    });
    if (!R) return;
    line = line || { top: py - 10, bottom: py + 10 };
    var w = tip.offsetWidth, h = tip.offsetHeight, y;
    
    if (R.bottom + gap + h <= hi) y = R.bottom + gap;
    else if (R.top - gap - h >= lo) y = R.top - gap - h;
    else if (line.bottom + gap + h <= hi) y = line.bottom + gap;
    else if (line.top - gap - h >= lo) y = line.top - gap - h;
    else {
      var below = hi - line.bottom - gap, above = line.top - gap - lo;
      tip.style.maxHeight = Math.max(80, Math.max(below, above)) + "px"; h = tip.offsetHeight;
      y = below >= above ? line.bottom + gap : line.top - gap - h;
    }
    var x = Math.min(Math.max(6, px - w / 2), vw - w - 6);
    tip.style.left = Math.round(Math.max(6, x)) + "px"; tip.style.top = Math.round(y) + "px";
  }
  function showTip(hits, px, py, mode) {
    clearTimeout(tipT); tipT = 0;
    if (!tip.hidden && sameHits(hits)) { if (mode === "tap") tipMode = mode; return; }
    var a = document.activeElement;                       
    if (!tip.contains(a)) tipPrev = a && a !== document.body ? a : null;
    tipHits = hits; tipMode = mode; tip.textContent = "";
    hits.forEach(function (it) {
      var n = it.n, c = cat(n.cat), box = el("div", { "class": "rn-tip-it rn-c-" + c.id });
      var meta = el("p", { "class": "rn-meta" }); meta.appendChild(chip(c)); box.appendChild(meta);
      if (n.html && textOf(n.html)) { var t = el("div", { "class": "rn-text" }); t.innerHTML = clean(n.html); box.appendChild(t); }
      else box.appendChild(el("p", { "class": "rn-text rn-empty" }, "Note sans texte."));
      box.appendChild(el("p", { "class": "rn-date" }, n.updated !== n.created ? "Modifiée le " + fmtDate(n.updated) + "." : "Créée le " + fmtDate(n.created) + "."));
      var row = el("div", { "class": "rn-row" }), ed = btn("Modifier", { "class": "rn-primary", "aria-label": "Modifier la note " + c.name + (n.sectionTitle ? ", section " + n.sectionTitle : "") });
      ed.addEventListener("click", function () {
        var o = tipPrev && document.contains(tipPrev) ? tipPrev : entry; tipPrev = null;
        hideTip("none"); if (panel.hidden) origin = o; openEditor(n);
      });
      row.appendChild(ed); box.appendChild(row); tip.appendChild(box);
    });
    var end = el("div", { "class": "rn-tip-end" }), cl = btn("Fermer", { "aria-label": "Fermer l’aperçu de la note" });
    cl.addEventListener("click", function () { hideTip("restore"); });
    end.appendChild(cl); tip.appendChild(end);
    tip.hidden = false; tip.scrollTop = 0;
    placeTip(px, py);
  }
  
  function hideTip(how) {
    clearTimeout(tipT); tipT = 0;
    if (tip.hidden) return;
    var had = tip.contains(document.activeElement);
    tip.hidden = true; tip.textContent = ""; tipHits = []; tipMode = ""; tip.style.maxHeight = "";
    if (had && how !== "none") { var p = tipPrev; if (p && document.contains(p) && p.getClientRects().length) p.focus({ preventScroll: true }); else focusEntry(); }
    tipPrev = null;
  }
  function leave() {
    if (tip.hidden || tipMode === "tap" || tip.contains(document.activeElement) || tipT) return;
    tipT = setTimeout(function () { tipT = 0; hideTip("none"); }, 350);            
  }
  var mvT = 0, mvE = null;
  function onMove() {
    var e = mvE; mvT = 0; if (!e) return;
    if (tip.contains(e.target)) { clearTimeout(tipT); tipT = 0; return; }
    if (!hlOn || e.buttons || !ann.hidden || !main.contains(e.target)) { leave(); return; }
    var hits = hitsAt(e.clientX, e.clientY);
    if (hits.length) showTip(hits, e.clientX, e.clientY, tipMode === "tap" ? "tap" : "hover"); else leave();
  }
  document.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch") return;                  
    mvE = e; if (!mvT) mvT = setTimeout(onMove, 60);
  }, { passive: true });
  document.documentElement.addEventListener("mouseleave", leave);
  tip.addEventListener("pointerleave", function (e) { if (e.pointerType !== "touch") leave(); });
  document.addEventListener("pointerdown", function (e) {
    lastPT = e.pointerType || "mouse";
    if (!tip.hidden && !tip.contains(e.target)) hideTip("none");   
  }, true);
  
  main.addEventListener("click", function (e) {
    if (!hlOn || e.target.closest("a,button,input,select,textarea,summary,label,[contenteditable]")) return;
    var s = window.getSelection(); if (s && !s.isCollapsed) return;
    var hits = hitsAt(e.clientX, e.clientY); if (!hits.length) return;
    showTip(hits, e.clientX, e.clientY, lastPT === "touch" ? "tap" : "hover");
  });
  
  main.addEventListener("focusin", function (e) {
    var t = e.target;
    if (!hlOn || t === main || !t.matches || !t.matches("a[href],button,input,select,textarea,summary,[tabindex]:not([tabindex='-1'])")) return;
    var hits = liveLayer().filter(function (it) { try { return it.r.intersectsNode(t); } catch (x) { return false; } });
    if (!hits.length) return;
    var b = t.getBoundingClientRect();
    showTip(hits, b.left + b.width / 2, b.top + b.height / 2, "focus");
  });
  main.addEventListener("focusout", function (e) { if (tipMode === "focus" && !(e.relatedTarget && tip.contains(e.relatedTarget))) { tipMode = "hover"; leave(); } });
  tip.addEventListener("focusin", function (e) { if (e.relatedTarget && !tip.contains(e.relatedTarget)) tipPrev = e.relatedTarget; clearTimeout(tipT); tipT = 0; });
  tip.addEventListener("focusout", function (e) { if (!(e.relatedTarget && tip.contains(e.relatedTarget)) && tipMode !== "tap") leave(); });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape" || tip.hidden) return;
    e.preventDefault(); e.stopPropagation();                
    hideTip("restore");
  }, true);
  window.addEventListener("scroll", function () { if (!tip.hidden) hideTip("restore"); }, { passive: true });
  var rsT = 0;
  window.addEventListener("resize", function () { hideTip(); clearTimeout(rsT); rsT = setTimeout(function () { if (ready) paint(); }, 250); });
  if (window.ResizeObserver) new ResizeObserver(function () { if (!tip.hidden) hideTip(); }).observe(main);

  
  function addOption() {
    if (document.querySelector("[data-rc-notes]")) return;
    var prev = document.querySelector("[data-rc-install]") || document.querySelector("[data-rc-download]") || document.querySelector("[data-rc-motion]") || document.querySelector("[data-rc-keys]");
    var row = prev && prev.closest(".rc-row"); if (!row) return;
    var r = el("div", { "class": "rc-row" });
    r.innerHTML = '<span class="rc-lbl" aria-hidden="true">Annotations</span><span class="rc-grp" role="group" aria-label="Vos annotations">'
      + '<button type="button" data-rc-notes="open">Ouvrir</button><button type="button" data-rc-notes="annotate">Annoter la section</button></span>';
    row.parentNode.insertBefore(r, row.nextSibling);
    r.addEventListener("click", function (e) {
      var b = e.target.closest("[data-rc-notes]"); if (!b) return;
      var ot = document.querySelector(".rc-opts-toggle");
      if (root.classList.contains("rc-opts-open") && ot) ot.click();
      origin = ot || entry;
      if (b.getAttribute("data-rc-notes") === "open") { open(); if (draft) showEditor(); else showList(true); } else annotateHere();
    });
    count();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addOption); else addOption();
  window.addEventListener("storage", function (e) {                 
    if (e.key === HLKEY) { hlOn = e.newValue !== "off"; showHlToggle(); if (!hlOn) hideTip(); render(); return; }
    if (e.key !== KEY && e.key !== null) return;
    chain = chain.then(function () { return load(false); }).then(function () { count(); paint(); if (!panel.hidden && !draft) showList(false); });
  });
  chain = load(true).then(function () { ready = true; count(); paint(); if (!panel.hidden && !draft) showList(false); });
})();
