
  (function () {
    var h = document.querySelector(".titlepage h1");
    if (!h) return;
    var KEY = "rc-motion", SKEY = "rc-style", root = document.documentElement, full = h.getAttribute("data-text") || h.textContent, timer = null, t2 = null, step = null, wait = null;
    var calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    function classic() { return root.dataset.style === "classic"; }
    function off() { try { return localStorage.getItem(KEY) === "off" || localStorage.getItem("rc-title-fx") === "off"; } catch (e) { return false; } }
    function remember(v) { try { localStorage.removeItem("rc-title-fx"); if (v) localStorage.setItem(KEY, "off"); else localStorage.removeItem(KEY); } catch (e) {} }
    function cursor() { var c = document.createElement("span"); c.className = "tw-cur"; c.setAttribute("aria-hidden", "true"); return c; }
    function burst() { h.classList.remove("gl-on"); void h.offsetWidth; h.classList.add("gl-on"); }
    function rnd(a, b) { return a + Math.random() * (b - a); }
    
    function next() {
      timer = setTimeout(function () {
        burst(); if (Math.random() < 0.5) t2 = setTimeout(burst, 1250);   
        next();
      }, rnd(3000, 7000));
    }
    function loop(on) { clearTimeout(timer); clearTimeout(t2); timer = t2 = null; if (on && !calm.matches) next(); }
    function apply() { var o = off() || calm.matches || classic(); root.classList.toggle("rc-motion-off", off()); h.classList.toggle("fx-off", o); if (o) h.classList.remove("gl-on"); loop(!o); }
    function render() { clearTimeout(step); clearTimeout(wait); step = wait = null; h.classList.remove("tw-run"); h.textContent = full; if (!classic()) h.appendChild(cursor()); }
    function finish() { render(); h.classList.add("tw-done"); if (!off() && !classic()) burst(); apply(); }
    
    window.addEventListener("beforeprint", function () { if (h.classList.contains("tw-run")) { render(); h.classList.add("tw-done"); } });
    function type() {
      var sr = document.createElement("span"), shown = document.createElement("span"), rest = document.createElement("span");
      sr.className = "sr-only"; sr.textContent = full;
      shown.setAttribute("aria-hidden", "true"); rest.setAttribute("aria-hidden", "true"); rest.className = "tw-rest";
      h.textContent = ""; h.append(sr, shown, cursor(), rest); h.classList.add("tw-run");
      var ops = keys(), k = 0;
      (function go() {
        if (k >= ops.length) { step = null; wait = setTimeout(finish, 900); return; }
        var o = ops[k++]; step = setTimeout(function () { shown.textContent = o.s; rest.textContent = full.slice(o.s.length); go(); }, o.d);
      })();
    }
    
    var NEAR = { a: "zqs", z: "aes", e: "zrd", r: "etf", t: "ryg", y: "tuh", u: "yij", i: "uok", o: "ipl", p: "om", q: "asw", s: "qdz",
      d: "sfe", f: "dgr", g: "fht", h: "gjy", j: "hku", k: "jli", l: "kmo", m: "lp", w: "xq", x: "wcs", c: "xvd", v: "cbf", b: "vng", n: "bh" };
    function wrong(ch) { var lo = ch.toLowerCase(), n = NEAR[lo]; if (!n) return ""; var w = n.charAt(Math.floor(Math.random() * n.length)); return ch === lo ? w : w.toUpperCase(); }
    function keys() {
      var cand = [], typos = {}, ops = [], i, n;
      for (i = 3; i < full.length - 2; i++) if (NEAR[full.charAt(i).toLowerCase()]) cand.push(i);
      n = Math.min(cand.length, Math.random() < 0.5 ? 1 : 2);
      while (Object.keys(typos).length < n) typos[cand[Math.floor(Math.random() * cand.length)]] = 1;
      for (i = 0; i < full.length; i++) {
        var d = rnd(45, 150) + (full.charAt(i - 1) === " " ? rnd(60, 180) : 0), w = typos[i] ? wrong(full.charAt(i)) : "";
        if (!w) { ops.push({ s: full.slice(0, i + 1), d: d }); continue; }
        ops.push({ s: full.slice(0, i) + w, d: d });
        if (Math.random() < 0.5) {
          ops.push({ s: full.slice(0, i) + w + full.charAt(i + 1), d: rnd(70, 150) });
          ops.push({ s: full.slice(0, i) + w, d: rnd(280, 520) });
          ops.push({ s: full.slice(0, i), d: rnd(90, 160) });
        } else ops.push({ s: full.slice(0, i), d: rnd(280, 520) });
        ops.push({ s: full.slice(0, i + 1), d: rnd(120, 230) });
      }
      return ops;
    }
    function addOption() {
      var keys = document.querySelector("[data-rc-keys]"), row = keys && keys.closest(".rc-row");
      if (!row || document.querySelector("[data-rc-motion]")) return;
      var r = document.createElement("div"); r.className = "rc-row";
      r.innerHTML = '<span class="rc-lbl" aria-hidden="true">Animations</span><span class="rc-grp" role="group" aria-label="Animations">'
        + '<button type="button" data-rc-motion="on">Activées</button><button type="button" data-rc-motion="off">Désactivées</button></span>';
      row.parentNode.insertBefore(r, row.nextSibling);
      var bs = r.querySelectorAll("button");
      function show() { var o = off(); bs.forEach(function (b) { b.setAttribute("aria-pressed", String((b.getAttribute("data-rc-motion") === "off") === o)); }); }
      bs.forEach(function (b) { b.addEventListener("click", function () { remember(b.getAttribute("data-rc-motion") === "off"); show(); apply(); if (!off()) burst(); }); });
      show();
    }
    function setStyle(v) {
      try { localStorage.setItem(SKEY, v); } catch (e) {}
      if (v === "classic") root.setAttribute("data-style", "classic"); else root.removeAttribute("data-style");
      if (classic()) { render(); apply(); } else finish();
    }
    function addStyleOption() {
      var prev = document.querySelector("[data-rc-motion]") || document.querySelector("[data-rc-keys]"), row = prev && prev.closest(".rc-row");
      if (!row || document.querySelector("[data-rc-style]")) return;
      var r = document.createElement("div"); r.className = "rc-row";
      r.innerHTML = '<span class="rc-lbl" aria-hidden="true">Style</span><span class="rc-grp" role="group" aria-label="Style">'
        + '<button type="button" data-rc-style="cyber">Cyberpunk</button><button type="button" data-rc-style="classic">Classique</button></span>';
      row.parentNode.insertBefore(r, row.nextSibling);
      var bs = r.querySelectorAll("button");
      function show() { var c = classic(); bs.forEach(function (b) { b.setAttribute("aria-pressed", String((b.getAttribute("data-rc-style") === "classic") === c)); }); }
      bs.forEach(function (b) { b.addEventListener("click", function () { var v = b.getAttribute("data-rc-style"); if ((v === "classic") !== classic()) setStyle(v); show(); }); });
      show();
    }
    function addOptions() { addOption(); addStyleOption(); }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addOptions); else addOptions();
    if (calm.matches || off() || classic()) { render(); apply(); return; }
    function start() { type(); var r = h.querySelector(".tw-rest"); if (r && !r.textContent) { r.textContent = full; } }
    function poise() { var sr = document.createElement("span"), shown = document.createElement("span"), rest = document.createElement("span"); sr.className = "sr-only"; sr.textContent = full; shown.setAttribute("aria-hidden", "true"); rest.setAttribute("aria-hidden", "true"); rest.className = "tw-rest"; rest.textContent = full; h.textContent = ""; h.append(sr, shown, cursor(), rest); h.classList.add("tw-run"); clearTimeout(wait); wait = setTimeout(start, 2000); }
    if (window.rcEntree) { window.rcEntree.ensuite(poise, function () { render(); apply(); }); } else { start(); }
  })();
  