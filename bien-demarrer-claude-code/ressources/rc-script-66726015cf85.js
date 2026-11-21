
(function () {
  
  var root = document.documentElement, bar = document.getElementById("rc-bar");
  var cfgEl = document.getElementById("rc-config"), vBox = document.getElementById("rc-ver");
  if (!bar || !cfgEl) return;
  var C = JSON.parse(cfgEl.textContent), L = C.labels;
  var live = bar.querySelector(".rc-live[aria-live]");
  function fmt(s, o) { return s.replace(/\{(\w+)\}/g, function (m, k) { return o[k]; }); }
  function store(k, v) { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function say(t) { live.textContent = ""; setTimeout(function () { live.textContent = t; }, 30); }
  
  
  function idle(f) {
    if (window.requestIdleCallback) requestIdleCallback(f, { timeout: 1500 });
    else setTimeout(function () { f({ timeRemaining: function () { return 8; } }); }, 30);
  }
  function slices(list, each, done) {
    var i = 0;
    idle(function step(dl) {
      var end = performance.now() + Math.max(4, Math.min(12, dl.timeRemaining()));
      while (i < list.length) { each(list[i++]); if (performance.now() >= end) break; }
      if (i < list.length) idle(step); else if (done) done();
    });
  }
  
  function headText(h) {
    var c = h.cloneNode(true);
    c.querySelectorAll(".rc-anchor").forEach(function (x) { x.remove(); });
    return c.textContent.replace(/\s+/g, " ").trim();
  }

  
  
  
  
  var cvMain = document.querySelector(".rc-main"), cvList = [], cvH = [], cvI = 0, cvK = "";
  var dpSecs = [];  
  function cvCopies(n, h) { dpSecs.forEach(function (s) { if (s[n]) s[n].style.containIntrinsicBlockSize = h + "px"; }); }
  if (cvMain && window.CSS && CSS.supports && CSS.supports("content-visibility", "auto")) cvList = Array.prototype.slice.call(cvMain.querySelectorAll(".rc-cv"));
  function cvKey() {
    return [location.pathname, document.lastModified, cvList.length, window.innerWidth, cvMain.clientWidth,
      getComputedStyle(root).fontSize, root.getAttribute("data-style") || "", root.className.indexOf("rc-no-ex") >= 0].join("|");
  }
  function cvLearn(dl) {
    var end = performance.now() + Math.max(4, Math.min(10, dl.timeRemaining()));
    while (cvI < cvList.length) {
      var sec = cvList[cvI];
      if (!cvH[cvI]) {
        sec.classList.add("rc-cv-learn");
        var h = Math.round(sec.getBoundingClientRect().height);
        sec.classList.remove("rc-cv-learn");
        if (h > 0) { cvH[cvI] = h; sec.style.containIntrinsicBlockSize = h + "px"; cvCopies(cvI, h); }
      }
      cvI++;
      if (performance.now() >= end) break;
    }
    if (cvI < cvList.length) idle(cvLearn);
    else try { localStorage.setItem("rc-cv", JSON.stringify({ k: cvK, h: cvH })); } catch (e) {}
  }
  function cvStart() {
    var k = cvKey();
    if (k === cvK) return;
    cvK = k; cvH = []; cvI = 0;
    try {
      var sv = JSON.parse(localStorage.getItem("rc-cv") || "null");
      if (sv && sv.k === k && sv.h && sv.h.length === cvList.length) {
        cvH = sv.h;
        cvList.forEach(function (sec, n) { if (cvH[n]) { sec.style.containIntrinsicBlockSize = cvH[n] + "px"; cvCopies(n, cvH[n]); } });
        cvI = cvList.length;
        return;
      }
    } catch (e) {}
    idle(cvLearn);
  }
  if (cvList.length) {
    var cvT;
    var cvLater = function () { clearTimeout(cvT); cvT = setTimeout(cvStart, 400); };
    window.addEventListener("resize", cvLater);
    
    
    var cvAgain = function () { cvK = ""; cvLater(); };
    window.addEventListener("afterprint", cvAgain);
    var cvPrint = window.matchMedia && window.matchMedia("print");
    if (cvPrint && cvPrint.addEventListener) cvPrint.addEventListener("change", function (e) { if (!e.matches) cvAgain(); });
    if (window.MutationObserver) new MutationObserver(cvLater).observe(root, { attributes: true, attributeFilter: ["class", "style", "data-style"] });
  }

  // Saut vers l'ancre de l'adresse (lien ouvert dans un nouvel onglet, ancre changée).
  // Le navigateur saute quand les sections n'ont encore que leur hauteur estimée ; la
  // cible s'éloigne dès que cvLearn mesure les hauteurs réelles. On rejoue donc le saut :
  // d'abord pour amener la cible en haut (arrivée), puis chaque fois qu'un changement de
  // mise en page la déplace dans le document (tenue). Si c'est la page qui défile alors que
  // la cible n'a pas bougé (geste, aide technique, script de la page), on s'arrête : on ne
  // dispute jamais la position à la lectrice. Arrêt aussi quand les hauteurs sont connues
  // et stables, au premier geste, ou au bout de hjMax millisecondes.
  var hjEl = null, hjT = 0, hjEnd = 0, hjCalm = 0, hjWait = false, hjHold = false, hjDoc = 0, hjWant = 0;
  var hjSelf = -1, hjSeen = 0, hjRo = null, hjTrav = false;
  var hjMax = 20000, HJ_GESTES = ["wheel", "touchstart", "pointerdown", "keydown"];
  function hjFind() {
    var h = location.hash.slice(1);
    if (!h) return null;
    try { h = decodeURIComponent(h); } catch (e) {}
    return document.getElementById(h) || document.getElementsByName(h)[0] || null;
  }
  function hjReady() { return cvI >= cvList.length; }
  function hjStop() {
    hjEl = null; clearTimeout(hjT);
    if (hjRo) hjRo.disconnect();
    HJ_GESTES.forEach(function (t) { window.removeEventListener(t, hjStop, true); });
  }
  // Écart voulu entre le haut de la fenêtre et la cible : marge sous la barre.
  function hjMargin() {
    return (parseFloat(getComputedStyle(hjEl).scrollMarginTop) || 0) + (parseFloat(getComputedStyle(root).scrollPaddingTop) || 0);
  }
  function hjPlaced(top, want) {
    var bottom = window.scrollY + window.innerHeight >= root.scrollHeight - 1;
    return Math.abs(top - want) <= 2 || (bottom && top > want);
  }
  function hjPut() {
    if (!hjEl) return;
    if (!document.contains(hjEl) || performance.now() > hjEnd) { hjStop(); return; }
    // Un défilement doux encore en cours (clic dans le sommaire) : attendre qu'il finisse.
    if (hjWait && performance.now() - hjSeen < 150) return;
    var top = hjEl.getBoundingClientRect().top, want = hjMargin(), doc = top + window.scrollY;
    if (hjHold && Math.abs(doc - hjDoc) < 1 && Math.abs(want - hjWant) < 1) {
      if (!hjPlaced(top, want)) hjStop();
      return;
    }
    if (!hjPlaced(top, want)) {
      hjEl.scrollIntoView({ block: "start", behavior: "instant" });
      hjSelf = window.scrollY; hjCalm = performance.now();
    }
    hjDoc = hjEl.getBoundingClientRect().top + window.scrollY; hjWant = want;
    hjHold = true; hjWait = false;
  }
  function hjTick() {
    clearTimeout(hjT);
    if (!hjEl) return;
    hjPut();
    if (!hjEl) return;
    if (hjReady() && hjHold && performance.now() - hjCalm > 1500) { hjStop(); return; }
    hjT = setTimeout(hjTick, 250);
  }
  function hjStart(wait) {
    hjStop();
    hjEl = hjFind();
    if (!hjEl) return;
    hjWait = wait; hjHold = false; hjEnd = performance.now() + hjMax; hjCalm = performance.now(); hjSeen = wait ? performance.now() : 0;
    HJ_GESTES.forEach(function (t) { window.addEventListener(t, hjStop, { capture: true, passive: true }); });
    if (window.ResizeObserver) {
      if (!hjRo) hjRo = new ResizeObserver(function () { if (hjEl) { hjCalm = performance.now(); hjPut(); } });
      hjRo.observe(document.body);
      if (cvMain) hjRo.observe(cvMain);
    }
    if (wait) hjT = setTimeout(hjTick, 200); else hjTick();
  }
  window.addEventListener("scroll", function () {
    if (hjEl && Math.abs(window.scrollY - hjSelf) >= 1) hjSeen = performance.now();
  }, { passive: true });
  // Un retour arrière rend la position mémorisée par le navigateur : ne pas la déplacer.
  if (window.navigation && navigation.addEventListener) {
    navigation.addEventListener("navigate", function (e) { hjTrav = e.navigationType === "traverse"; });
  }
  window.addEventListener("hashchange", function () {
    var trav = hjTrav; hjTrav = false;
    if (!trav) hjStart(true);
  });

  
  var themeBtns = bar.querySelectorAll("[data-rc-theme]");
  function setTheme(t, announce) {
    if (t === "light" || t === "dark") root.setAttribute("data-theme", t); else { root.removeAttribute("data-theme"); t = "auto"; }
    themeBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-rc-theme") === t)); });
    store("rc-theme", t === "auto" ? null : t);
    if (announce) say(fmt(L.theme_say, { x: L.theme_names[t] }));
  }
  themeBtns.forEach(function (b) { b.addEventListener("click", function () { setTheme(b.getAttribute("data-rc-theme"), true); }); });
  if (themeBtns.length) setTheme(root.getAttribute("data-theme") || "auto", false);

  
  var STEPS = [80, 90, 100, 110, 120, 135, 150, 160], valBtn = bar.querySelector(".rc-zoom-val");
  function current() { var z = parseInt(root.style.fontSize, 10); return STEPS.indexOf(z) >= 0 ? z : 100; }
  function setZoom(z, announce) {
    root.style.fontSize = z === 100 ? "" : z + "%";
    valBtn.textContent = z + " %";
    valBtn.setAttribute("aria-label", fmt(L.size_val, { z: z }));
    bar.querySelector('[data-rc-zoom="-1"]').disabled = z === STEPS[0];
    bar.querySelector('[data-rc-zoom="1"]').disabled = z === STEPS[STEPS.length - 1];
    store("rc-zoom", z === 100 ? null : String(z));
    if (announce) say(fmt(L.size_say, { z: z }));
    if (pgWant === "auto") dpPlace();  
    // Le texte agrandi élargit les boutons : refaire la mesure de la barre, qui replie ses libellés au besoin (WCAG 1.4.10).
    if (typeof plierPlusTard === "function") plierPlusTard();
    // La borne de largeur du texte suit la taille du texte : recaler la place du sommaire et le cadre qui centre le texte.
    if (typeof setSide === "function") setSide();
    if (typeof fitLayout === "function" && root.classList.contains("rc-tocw")) fitLayout(parseInt(tr.value, 10));

  }
  function zoomBy(d) { var i = STEPS.indexOf(current()); setZoom(d === 0 ? 100 : STEPS[Math.max(0, Math.min(STEPS.length - 1, i + d))], true); }
  bar.querySelectorAll("[data-rc-zoom]").forEach(function (b) {
    b.addEventListener("click", function () { zoomBy(parseInt(b.getAttribute("data-rc-zoom"), 10)); });
  });
  setZoom(current(), false);

  
  var wr = document.getElementById("rc-width"), wv = bar.querySelector(".rc-width-val"), wreset = bar.querySelector(".rc-width-reset");
  if (wr) {
    var mainEl = document.querySelector(".rc-main") || document.querySelector("main");
    var remPx = function () { return parseFloat(getComputedStyle(root).fontSize) || 16; };
    var natural = function () {
      var had = root.classList.contains("rc-measured");
      root.classList.remove("rc-measured");
      var mw = getComputedStyle(mainEl).maxWidth, v = mw.endsWith("px") ? Math.round(parseFloat(mw) / remPx()) : 100;
      if (had) root.classList.add("rc-measured");
      return Math.max(34, Math.min(100, v - (v % 2)));
    };
    var widthLabel = function (v, custom) { return !custom ? L.width_default : v >= 100 ? L.width_full : v + " rem"; };
    
    
    var layEl = document.querySelector(".rc-layout");
    var setSide = function () {
      if (!layEl || !mainEl) return;
      var lr = layEl.getBoundingClientRect(), side = mainEl.getBoundingClientRect().left - lr.left;
      side += parseFloat(getComputedStyle(layEl).paddingRight) || 0;
      root.style.setProperty("--rc-side", Math.max(0, Math.round(side)) + "px");
    };
    window.addEventListener("resize", setSide);
    
    if (window.MutationObserver) new MutationObserver(function () { requestAnimationFrame(setSide); })
      .observe(root, { attributes: true, attributeFilter: ["class"] });
    var setWidth = function (v, custom, announce) {
      setSide();
      if (custom) {
        root.classList.add("rc-measured");
        root.style.setProperty("--rc-measure", v >= 100 ? "none" : v + "rem");
        store("rc-measure", String(v));
      } else {
        root.classList.remove("rc-measured");
        root.style.removeProperty("--rc-measure");
        store("rc-measure", null);
        v = natural();
      }
      wr.value = v;
      wv.textContent = widthLabel(v, custom);
      wr.setAttribute("aria-valuetext", widthLabel(v, custom));
      wreset.disabled = !custom;
      setBarH();
      if (announce) say(fmt(L.width_say, { w: widthLabel(v, custom) }));
    };
    var saved = parseInt((function () { try { return localStorage.getItem("rc-measure"); } catch (e) { return null; } })(), 10);
    setWidth(saved >= 34 && saved <= 100 ? saved : natural(), saved >= 34 && saved <= 100, false);
    wr.addEventListener("input", function () { setWidth(parseInt(wr.value, 10), true, false); });
    wr.addEventListener("change", function () { setWidth(parseInt(wr.value, 10), true, true); });
    wreset.addEventListener("click", function () { setWidth(0, false, true); });
  }

  
  
  var tr = document.getElementById("rc-tocw"), tv = bar.querySelector(".rc-tocw-val"), treset = bar.querySelector(".rc-tocw-reset");
  if (tr) {
    var tocEl = document.querySelector(".rc-toc"), lay2 = document.querySelector(".rc-layout"), main2 = document.querySelector(".rc-main") || document.querySelector("main");
    var autoWidth = function () {
      var had = root.classList.contains("rc-tocw");
      root.classList.remove("rc-tocw");
      var w = tocEl ? tocEl.getBoundingClientRect().width / (parseFloat(getComputedStyle(root).fontSize) || 16) : 20;
      if (had) root.classList.add("rc-tocw");
      return Math.max(12, Math.min(40, Math.round(w)));
    };
    
    var fitLayout = function (v) {
      if (!lay2 || !main2) return;
      var cs = getComputedStyle(lay2), rem = parseFloat(getComputedStyle(root).fontSize) || 16;
      var mm = getComputedStyle(main2).maxWidth;
      
      if (!mm.endsWith("px")) { root.style.setProperty("--rc-layw", "none"); return; }
      var pad = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0), gap = parseFloat(cs.columnGap) || 0;
      root.style.setProperty("--rc-layw", Math.round(v * rem + gap + parseFloat(mm) + pad) + "px");
    };
    var setTocW = function (v, custom, announce) {
      if (custom) {
        root.classList.add("rc-tocw");
        root.style.setProperty("--rc-tocw", v + "rem");
        fitLayout(v);
        store("rc-tocw", String(v));
      } else {
        root.classList.remove("rc-tocw");
        root.style.removeProperty("--rc-tocw");
        root.style.removeProperty("--rc-layw");
        store("rc-tocw", null);
        v = autoWidth();
      }
      tr.value = v;
      var label = custom ? v + " rem" : L.tocw_auto;
      tv.textContent = label;
      tr.setAttribute("aria-valuetext", label);
      treset.disabled = !custom;
      if (announce) say(fmt(L.tocw_say, { w: label }));
    };
    var savedT = parseInt((function () { try { return localStorage.getItem("rc-tocw"); } catch (e) { return null; } })(), 10);
    setTocW(savedT >= 12 && savedT <= 40 ? savedT : autoWidth(), savedT >= 12 && savedT <= 40, false);
    tr.addEventListener("input", function () { setTocW(parseInt(tr.value, 10), true, false); });
    tr.addEventListener("change", function () { setTocW(parseInt(tr.value, 10), true, true); });
    treset.addEventListener("click", function () { setTocW(0, false, true); });
    window.addEventListener("resize", function () { if (root.classList.contains("rc-tocw")) fitLayout(parseInt(tr.value, 10)); });
  }

  
  var jb = bar.querySelector(".rc-justify");
  if (jb) {
    var jSync = function () { jb.setAttribute("aria-pressed", String(!root.classList.contains("rc-ragged"))); };
    jb.addEventListener("click", function () {
      var ragged = root.classList.toggle("rc-ragged");
      store("rc-justify", ragged ? "off" : null);
      jSync();
      say(ragged ? L.justify_off : L.justify_on);
    });
    jSync();
  }

  
  var fs = bar.querySelector(".rc-fs");
  if (fs && !(document.fullscreenEnabled && root.requestFullscreen) && fs.closest(".rc-row") && !fs.closest(".rc-row").querySelector(".rc-pages")) fs.closest(".rc-row").hidden = true;
  if (fs && document.fullscreenEnabled && root.requestFullscreen) {
    fs.hidden = false;
    var fsSync = function () { var on = !!document.fullscreenElement; fs.querySelector(".rc-t").textContent = on ? L.fs_exit : L.fs; fs.classList.toggle("rc-on", on); };
    fs.addEventListener("click", function () {
      if (document.fullscreenElement) document.exitFullscreen(); else root.requestFullscreen().catch(function () { say(L.fs_refused); });
    });
    document.addEventListener("fullscreenchange", fsSync);
    fsSync();
  }

  
  
  function setBarH() {
    var h = bar.offsetHeight;
    root.style.setProperty("--rc-bar0", h + "px");
    root.style.setProperty("--rc-barh", (h + (vBox && vBox.classList.contains("rc-ver-on") ? vBox.offsetHeight : 0)) + "px");
  }
  setBarH();
  if (window.ResizeObserver) { var barRo = new ResizeObserver(setBarH); barRo.observe(bar); if (vBox) barRo.observe(vBox); }
  else window.addEventListener("resize", setBarH);

  
  var toc = C.toc ? document.getElementById(C.toc) : null, tg = bar.querySelector(".rc-toc-toggle");
  var wide = window.matchMedia("(min-width:48rem)");
  function navOpen() { return wide.matches ? !root.classList.contains("rc-nav-collapsed") : root.classList.contains("rc-nav-open"); }
  function navSync() { if (tg) tg.setAttribute("aria-expanded", String(navOpen())); }
  function setNav(open) {
    if (!toc) return;
    if (wide.matches) { root.classList.toggle("rc-nav-collapsed", !open); store("rc-nav", open ? null : "collapsed"); }
    else root.classList.toggle("rc-nav-open", open);
    navSync();
  }
  if (toc && tg) {
    tg.addEventListener("click", function () {
      setNav(!navOpen());
      if (navOpen() && !wide.matches) { var a = toc.querySelector("a[aria-current]") || toc.querySelector("a"); if (a) a.focus(); }
    });
    toc.addEventListener("click", function (e) {
      if (e.target.closest("a")) { if (root.classList.contains("rc-gallery")) setGallery(false); if (!wide.matches) setNav(false); }
    });
    document.addEventListener("click", function (e) { if (e.target.closest('a[href="#' + C.toc + '"]')) setNav(true); });
    if (wide.addEventListener) wide.addEventListener("change", navSync); else wide.addListener(navSync);
    navSync();
  }

  
  var ot = bar.querySelector(".rc-opts-toggle"), opts = bar.querySelector(".rc-opts");
  function setOpts(open) { root.classList.toggle("rc-opts-open", open); ot.setAttribute("aria-expanded", String(open)); }
  // Replie les libellés quand la barre déborde. Seul fit(), appelé au redimensionnement, ferme aussi les Options ;
  // un changement de taille du texte, fait depuis ce panneau, le laisse ouvert.
  function plier() {
    root.classList.remove("rc-fold");
    var over = bar.scrollWidth > bar.clientWidth + 1;
    root.classList.toggle("rc-fold", over);
    setBarH();
    return over;
  }
  var plierT;
  function plierPlusTard() { clearTimeout(plierT); plierT = setTimeout(plier, 80); }
  function fit() {
    if (!plier()) setOpts(false);
  }
  ot.addEventListener("click", function () { setOpts(!root.classList.contains("rc-opts-open")); });
  document.addEventListener("click", function (e) {
    if (root.classList.contains("rc-opts-open") && !opts.contains(e.target) && !ot.contains(e.target) && !(kd && kd.contains(e.target)) &&
        !(kback && kback.contains(e.target))) setOpts(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && root.classList.contains("rc-opts-open")) { setOpts(false); ot.focus(); }
  });
  var fitT;
  function fitLater() { clearTimeout(fitT); fitT = setTimeout(fit, 80); }
  window.addEventListener("resize", fitLater);
  // Les scripts chargés après celui-ci ajoutent des boutons à la barre (annotations,
  // plein écran) : refaire la mesure quand ses enfants changent.
  if (window.MutationObserver) new MutationObserver(fitLater).observe(bar, { childList: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  fit();

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (toc && !wide.matches && navOpen()) { setNav(false); if (tg) tg.focus(); }
    else if (root.classList.contains("rc-gallery") && document.activeElement !== inp) setGallery(false);
  });

  
  
  
  
  // Repère de position et chapitre en cours dans le sommaire (aria-current).
  // L'unité suivie est la section qui porte le titre, pas le titre lui-même : une bannière
  // précède le titre d'un chapitre, et un saut place le haut de la section, pas le titre,
  // sous la barre. Une unité est « commencée » quand son haut passe la ligne d'arrivée d'un
  // saut (marge sous la barre, plus 8 px) : le repère dit donc ce qu'un saut vient d'atteindre.
  var here = document.getElementById(C.here_id || "rc-here");
  if (C.here && here && window.IntersectionObserver) {
    var hereStart = here.textContent, hereUnits = [], hereHead = new Map(), hereAbove = new Map(), hereIo = null, hereKey = "";
    var hereLinks = {}, hereLink = null, hereProbe = document.getElementById("contenu") || document.querySelector("main");
    Array.prototype.forEach.call(document.querySelectorAll("main h2[id], main h3[id], main section[id] > h2, main section[id] > h3"), function (h) {
      var s = h.parentElement, u = s && s.matches("section[id]") && s.querySelector(":scope > h2, :scope > h3") === h ? s : h;
      if (!hereHead.has(u)) { hereHead.set(u, h); hereUnits.push(u); }
    });
    if (toc) toc.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      try { id = decodeURIComponent(id); } catch (e) {}
      if (id && !hereLinks[id]) hereLinks[id] = a;
    });
    var hereShow = function () {
      var best = null, ch = null, s;
      hereUnits.forEach(function (u) { if (hereAbove.get(u)) best = u; });
      here.textContent = best ? headText(hereHead.get(best)) : hereStart;
      // Chapitre : la section la plus englobante qui a son lien dans le sommaire.
      for (s = best && best.closest("section[id]"); s; s = s.parentElement && s.parentElement.closest("section[id]")) {
        if (hereLinks[s.id]) ch = s;
      }
      var link = ch ? hereLinks[ch.id] : null;
      if (link === hereLink) return;
      if (hereLink) hereLink.removeAttribute("aria-current");
      if (link) link.setAttribute("aria-current", "true");
      hereLink = link;
    };
    var hereWatch = function () {
      var line = Math.round((parseFloat(getComputedStyle(hereProbe).scrollMarginTop) || 0) + (parseFloat(getComputedStyle(root).scrollPaddingTop) || 0) + 8);
      if (line + "|" + window.innerHeight === hereKey) return;
      hereKey = line + "|" + window.innerHeight;
      if (hereIo) hereIo.disconnect();
      hereAbove = new Map();
      hereIo = new IntersectionObserver(function (es) {
        es.forEach(function (e) { hereAbove.set(e.target, e.isIntersecting); });
        hereShow();
      }, { rootMargin: "1000000px 0px " + (line - window.innerHeight) + "px 0px" });
      hereUnits.forEach(function (u) { hereIo.observe(u); });
    };
    hereWatch();
    window.addEventListener("resize", hereWatch);
    if (window.ResizeObserver) new ResizeObserver(hereWatch).observe(bar);
  }

  
  var main = document.querySelector("main") || document.body, demote = new RegExp("^(" + (C.demote.join("|") || "\\b\\B") + ")$");
  var gItems = [], gBanner = null;
  function inDemoted(el) { var s = el.closest("section[id]"); while (s) { if (demote.test(s.id)) return true; s = s.parentElement && s.parentElement.closest("section[id]"); } return false; }
  function sectionLabel(el) {
    var s = el.closest("section[id]");
    while (s) { var h = s.querySelector(":scope > h2, :scope > h3, :scope > h4"); if (h) return headText(h); s = s.parentElement && s.parentElement.closest("section[id]"); }
    return "";
  }
  function gPrepare() {
    if (gBanner) return;
    main.querySelectorAll("figure:not(.banner), table").forEach(function (el) {  
      var item = el.tagName === "TABLE" ? (el.closest(".table-wrap") || el) : el;
      if (item.closest("figure") && item.tagName !== "FIGURE") return;
      if (gItems.indexOf(item) >= 0 || inDemoted(item)) return;
      if (!item.id) item.id = "rc-g-" + gItems.length;
      item.classList.add("rc-g-item", el.tagName === "TABLE" ? "rc-g-tab" : "rc-g-fig");
      var a = document.createElement("a");
      a.className = "rc-g-ctx"; a.href = "#" + item.id;
      var lab = sectionLabel(item);
      a.textContent = "↩ " + L.g_ctx + (lab ? " (" + lab + ")" : "");
      a.addEventListener("click", function (e) { e.preventDefault(); setGallery(false); item.scrollIntoView({ block: "start" }); history.replaceState(null, "", "#" + item.id); });
      item.appendChild(a);
      gItems.push(item);
      var p = item.parentElement;
      while (p && p !== main) { p.classList.add("rc-g-path"); p = p.parentElement; }
    });
    var nf = main.querySelectorAll(".rc-g-fig").length, nt = main.querySelectorAll(".rc-g-tab").length;
    gBanner = document.createElement("div");
    gBanner.className = "rc-g-banner"; gBanner.setAttribute("role", "region"); gBanner.setAttribute("aria-label", L.gallery);
    gBanner.innerHTML = '<p class="rc-g-count"></p><span class="rc-g-filters" role="group" aria-label="' + L.gallery + '">' +
      '<button type="button" data-rc-g="all" aria-pressed="true"></button><button type="button" data-rc-g="fig" aria-pressed="false"></button>' +
      '<button type="button" data-rc-g="tab" aria-pressed="false"></button></span><button type="button" class="rc-g-exit"></button>';
    gBanner.querySelector(".rc-g-count").textContent = fmt(L.g_banner, { f: nf, t: nt });
    gBanner.querySelector('[data-rc-g="all"]').textContent = L.g_all;
    gBanner.querySelector('[data-rc-g="fig"]').textContent = L.g_fig + " (" + nf + ")";
    gBanner.querySelector('[data-rc-g="tab"]').textContent = L.g_tab + " (" + nt + ")";
    gBanner.querySelector(".rc-g-exit").textContent = L.g_exit;
    gBanner.querySelectorAll("[data-rc-g]").forEach(function (b) {
      b.addEventListener("click", function () {
        var f = b.getAttribute("data-rc-g");
        root.classList.toggle("rc-g-only-fig", f === "fig"); root.classList.toggle("rc-g-only-tab", f === "tab");
        gBanner.querySelectorAll("[data-rc-g]").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      });
    });
    gBanner.querySelector(".rc-g-exit").addEventListener("click", function () { setGallery(false); });
    main.insertBefore(gBanner, main.firstChild);
  }
  var gBtn = bar.querySelector(".rc-gallery-toggle");
  function setGallery(on) {
    if (on) gPrepare();
    root.classList.toggle("rc-gallery", on);
    if (!on) root.classList.remove("rc-g-only-fig", "rc-g-only-tab");
    gBtn.setAttribute("aria-pressed", String(on));
    say(on ? L.g_on : L.g_off);
    if (on) { window.scrollTo(0, main.getBoundingClientRect().top + window.scrollY - bar.offsetHeight); gBanner.querySelector(".rc-g-exit").focus({ preventScroll: true }); }
  }
  gBtn.addEventListener("click", function () { setGallery(!root.classList.contains("rc-gallery")); });

  
  
  var gl = C.glossary ? document.getElementById(C.glossary) : null;
  if (gl) {
    var entries = [], tip = document.createElement("div"), tipFor = null, hideT;
    tip.id = "rc-gl-tip"; tip.className = "rc-gl-tip"; tip.setAttribute("role", "tooltip"); tip.hidden = true;
    document.body.appendChild(tip);
    gl.querySelectorAll("dt").forEach(function (dt, i) {
      var dd = dt.nextElementSibling;
      if (!dd || dd.tagName !== "DD") return;
      if (!dt.id) dt.id = "rc-gl-" + i;
      var label = dt.textContent.replace(/\s+/g, " ").trim(), base = label.replace(/\s*\(.*\)\s*$/, "");
      var paren = (label.match(/\(([^)]*)\)/) || [])[1];
      var names = base.split(/,\s*/).concat(paren && /^[A-Za-z][\w.-]*$/.test(paren) ? [paren] : []);
      names.forEach(function (n) {
        n = n.trim();
        if (n.length < 2) return;
        var exact = /[A-Z].*[A-Z]|[a-z][A-Z]|[._/]/.test(n) || n.length <= 3;
        entries.push({ name: n, exact: exact, id: dt.id, term: label, def: dd.textContent.replace(/\s+/g, " ").trim() });
      });
    });
    entries.sort(function (a, b) { return b.name.length - a.name.length; });
    function rx(list, flags) {
      if (!list.length) return null;
      var alt = list.map(function (e) { return e.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|");
      return new RegExp("(?<![\\p{L}\\p{N}_])(" + alt + ")(?:s|x)?(?![\\p{L}\\p{N}_])", flags);
    }
    var exactList = entries.filter(function (e) { return e.exact; }), looseList = entries.filter(function (e) { return !e.exact; });
    var rxE = rx(exactList, "gu"), rxL = rx(looseList, "giu");
    var byExact = {}, byLoose = {};
    exactList.forEach(function (e) { byExact[e.name] = byExact[e.name] || e; });
    looseList.forEach(function (e) { var k = norm(e.name); byLoose[k] = byLoose[k] || e; });
    var SKIP = "a, code, pre, kbd, h1, h2, h3, h4, h5, h6, figure, button, label, .rc-bar, .rc-g-banner, .rc-g-ctx, .back, nav, dl.gloss, #" + C.glossary;
    var seen = new Map();
    var walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue.trim() || !n.parentElement || n.parentElement.closest(SKIP)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    
    var nodes = [];
    idle(function walk(dl) {
      var end = performance.now() + Math.max(4, Math.min(12, dl.timeRemaining()));
      while (walker.nextNode()) { nodes.push(walker.currentNode); if (performance.now() >= end) { idle(walk); return; } }
      slices(nodes, link);
    });
    function link(node) {
      if (!node.isConnected || !node.parentElement || node.parentElement.closest(SKIP)) return;
      var sec = node.parentElement.closest("section[id]") || main, used = seen.get(sec);
      if (!used) { used = new Set(); seen.set(sec, used); }
      var text = node.nodeValue, hits = [];
      [[rxE, function (m) { return byExact[m]; }], [rxL, function (m) { return byLoose[norm(m)]; }]].forEach(function (p) {
        if (!p[0]) return;
        p[0].lastIndex = 0;
        var m;
        while ((m = p[0].exec(text))) { var e = p[1](m[1]); if (e) hits.push({ i: m.index, len: m[0].length, e: e }); }
      });
      hits.sort(function (a, b) { return a.i - b.i || b.len - a.len; });
      var out = [], last = 0;
      hits.forEach(function (h) {
        if (h.i < last || used.has(h.e.id)) return;
        used.add(h.e.id);
        out.push(h); last = h.i + h.len;
      });
      if (!out.length) return;
      var frag = document.createDocumentFragment(), pos = 0;
      out.forEach(function (h) {
        frag.appendChild(document.createTextNode(text.slice(pos, h.i)));
        var a = document.createElement("a");
        a.className = "rc-gl"; a.href = "#" + h.e.id; a.textContent = text.slice(h.i, h.i + h.len);
        a.setAttribute("data-rc-gl", h.e.id);
        a.setAttribute("aria-describedby", "rc-gl-tip");
        frag.appendChild(a);
        pos = h.i + h.len;
      });
      frag.appendChild(document.createTextNode(text.slice(pos)));
      node.parentNode.replaceChild(frag, node);
    }
    var byId = {};
    entries.forEach(function (e) { byId[e.id] = byId[e.id] || e; });
    function showTip(a) {
      clearTimeout(hideT);
      var e = byId[a.getAttribute("data-rc-gl")];
      if (!e) return;
      tipFor = a;
      tip.innerHTML = "";
      var b = document.createElement("strong"); b.textContent = e.term;
      var p = document.createElement("span"); p.textContent = " " + e.def;
      tip.appendChild(b); tip.appendChild(p);
      tip.hidden = false;
      var r = a.getBoundingClientRect(), w = Math.min(380, window.innerWidth - 24);
      tip.style.width = w + "px";
      var left = Math.max(12, Math.min(window.scrollX + r.left, window.scrollX + window.innerWidth - w - 12));
      var top = window.scrollY + r.bottom + 6;
      tip.style.left = left + "px"; tip.style.top = top + "px";
      if (r.bottom + tip.offsetHeight + 12 > window.innerHeight) tip.style.top = (window.scrollY + r.top - tip.offsetHeight - 6) + "px";
    }
    function hideTip(now) {
      clearTimeout(hideT);
      hideT = setTimeout(function () { tip.hidden = true; tipFor = null; }, now ? 0 : 180);
    }
    main.addEventListener("mouseover", function (ev) { var a = ev.target.closest && ev.target.closest(".rc-gl"); if (a) showTip(a); });
    main.addEventListener("mouseout", function (ev) { if (ev.target.closest && ev.target.closest(".rc-gl")) hideTip(false); });
    main.addEventListener("focusin", function (ev) { if (ev.target.classList && ev.target.classList.contains("rc-gl")) showTip(ev.target); });
    main.addEventListener("focusout", function (ev) { if (ev.target.classList && ev.target.classList.contains("rc-gl")) hideTip(true); });
    tip.addEventListener("mouseover", function () { clearTimeout(hideT); });
    tip.addEventListener("mouseout", function () { hideTip(false); });
    document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && !tip.hidden) { hideTip(true); if (tipFor) tipFor.focus(); } });
    window.addEventListener("scroll", function () { if (!tip.hidden && tipFor && document.activeElement !== tipFor) hideTip(true); }, { passive: true });
  }

  
  var inp = document.getElementById("rc-q"), res = document.getElementById("rc-q-res"), cnt = document.getElementById("rc-q-count");
  var docs = null, vocab = null, items = [], active = -1, timer;
  function norm(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/’/g, "'"); }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function addDoc(id, title, text) {
    var d = { id: id, title: title, text: text, nt: norm(title), nx: norm(text) };
    d.words = new Set(d.nx.match(/[a-z0-9][a-z0-9'_-]*/g) || []);
    d.words.forEach(function (w) { if (w.length > 3) vocab.add(w); });
    docs.push(d);
  }
  
  
  var bList = null, bI = 0;
  function build(end) {
    if (docs && !bList) return true;
    if (!docs) {
      docs = []; vocab = new Set();
      var pre = document.getElementById("rc-index");
      if (pre) { JSON.parse(pre.textContent).forEach(function (r) { addDoc(r[0], r[1], r[2]); }); return true; }
      bList = main.querySelectorAll("section[id]"); bI = 0;
    }
    while (bI < bList.length) {
      var sec = bList[bI++], h = sec.querySelector(":scope > h2, :scope > h3, :scope > h4");
      if (h) {
        var c = sec.cloneNode(true);
        c.querySelectorAll("section, .back, .cb-copy, .cb-status, .rc-g-ctx, .rc-anchor").forEach(function (x) { x.remove(); });
        addDoc(sec.id, headText(h), c.textContent.replace(/\s+/g, " ").trim());
      }
      if (end && performance.now() >= end) return false;
    }
    bList = null;
    return true;
  }
  function near(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return false;
    var prev = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      var cur = [i], best = i;
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (cur[j] < best) best = cur[j];
      }
      if (best > max) return false;
      prev = cur;
    }
    return prev[b.length] <= max;
  }
  
  
  var sTerms = [];
  function search(q) {
    if (!docs || bList) build();
    sTerms = [];
    var toks = norm(q).split(/[^a-z0-9'_-]+/).filter(function (t) { return t.length > 1; });
    if (!toks.length) return [];
    var alts = toks.map(function (t) {
      var max = t.length >= 8 ? 2 : t.length >= 4 ? 1 : 0, a = [];
      if (max) vocab.forEach(function (w) { if (a.length < 25 && w.indexOf(t) < 0 && near(t, w, max)) a.push(w); });
      return a;
    });
    var out = [], kept = {};
    docs.forEach(function (d) {
      var score = 0, hit = null, used = [];
      for (var k = 0; k < toks.length; k++) {
        var t = toks[k], s = 0, p = d.nx.indexOf(t);
        if (d.nt.indexOf(t) >= 0) s += 10;
        if (p >= 0) { s += 3 + Math.min(5, d.nx.split(t).length - 2); if (!hit) hit = { pos: p, len: t.length }; }
        if (!s) {
          for (var m = 0; m < alts[k].length; m++) {
            var w = alts[k][m];
            if (d.words.has(w)) {
              s = (d.nt.indexOf(w) >= 0 ? 8 : 2) + Math.min(4, d.nx.split(w).length - 2);
              if (!hit) hit = { pos: d.nx.indexOf(w), len: w.length };
              used.push(w);
              break;
            }
          }
        }
        if (!s) return;
        score += s;
      }
      used.forEach(function (w) { kept[w] = 1; });
      if (demote.test(d.id)) score = score / 3;
      out.push({ d: d, score: score, hit: hit });
    });
    out.sort(function (a, b) { return b.score - a.score; });
    if (out.length) sTerms = toks.map(function (t) { return { t: t, w: false }; })
      .concat(Object.keys(kept).map(function (w) { return { t: w, w: true }; }));
    return out.slice(0, 12);
  }
  function snip(r) {
    var t = r.d.text;
    if (!r.hit || r.hit.pos < 0) return esc(t.slice(0, 110)) + "…";
    var p = r.hit.pos, e = p + r.hit.len, a = Math.max(0, p - 50), b = Math.min(t.length, e + 60);
    return (a ? "…" : "") + esc(t.slice(a, p)) + "<mark>" + esc(t.slice(p, e)) + "</mark>" + esc(t.slice(e, b)) + (b < t.length ? "…" : "");
  }
  function closeRes() { res.hidden = true; inp.setAttribute("aria-expanded", "false"); inp.removeAttribute("aria-activedescendant"); active = -1; }
  
  function render(q, quiet) {
    clearTimeout(timer); timer = 0;
    items = q.trim() ? search(q) : []; active = -1; inp.removeAttribute("aria-activedescendant");
    if (!q.trim()) { res.innerHTML = ""; closeRes(); cnt.textContent = ""; fClear(); return; }
    fSet(sTerms);
    if (quiet) return;
    res.innerHTML = items.length
      ? items.map(function (r, i) { return '<li role="option" id="rc-q-o' + i + '" aria-selected="false"><span class="rc-q-t">' + esc(r.d.title) + '</span><span class="rc-q-s">' + snip(r) + "</span></li>"; }).join("")
      : '<li class="rc-q-none" role="presentation">' + esc(L.none) + "</li>";
    res.hidden = false; inp.setAttribute("aria-expanded", "true");
    cnt.textContent = items.length ? fmt(items.length > 1 ? L.n_res_pl : L.n_res, { n: items.length }) + ", " + fTotal() : L.none;
  }
  function setActive(i) {
    var opts = res.querySelectorAll('[role="option"]');
    if (!opts.length) return;
    active = (i + opts.length) % opts.length;
    opts.forEach(function (o, k) { o.setAttribute("aria-selected", String(k === active)); });
    inp.setAttribute("aria-activedescendant", opts[active].id);
    opts[active].scrollIntoView({ block: "nearest" });
  }
  function go(i) {
    var r = items[i];
    if (!r) return;
    closeRes();
    if (root.classList.contains("rc-gallery")) setGallery(false);
    var el = document.getElementById(r.d.id), h = el.querySelector("h2, h3, h4");
    history.replaceState(null, "", "#" + r.d.id);
    el.scrollIntoView({ block: "start" });
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    fFirstIn(el);  
  }
  inp.addEventListener("input", function () { clearTimeout(timer); timer = setTimeout(function () { render(inp.value); }, 120); });
  inp.addEventListener("focus", function () { if (inp.value.trim()) render(inp.value); });
  inp.addEventListener("blur", function () { setTimeout(closeRes, 150); });
  
  
  
  inp.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); if (res.hidden) render(inp.value); setActive(active + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
    else if (e.key === "Enter") {
      if (e.isComposing || !inp.value.trim()) return;
      e.preventDefault();
      if (active >= 0 && !res.hidden) go(active);
      else {
        if (timer || !fOn) render(inp.value, true);
        if (fHits.length) fStep(e.shiftKey ? -1 : 1); else if (items.length) go(0);
      }
    }
    else if (e.key === "Escape") {
      e.preventDefault();
      if (!res.hidden || fOn) { closeRes(); fClear(); } else { inp.value = ""; render(""); }
    }
  });
  res.addEventListener("mousedown", function (e) { var li = e.target.closest('[role="option"]'); if (li) { e.preventDefault(); go(parseInt(li.id.slice(6), 10)); } });

  
  
  
  
  
  
  var fBox = bar.querySelector(".rc-find"), fN = bar.querySelector(".rc-find-n"), fLive = document.getElementById("rc-find-say");
  var fApi = !!(window.CSS && CSS.highlights && window.Highlight && window.StaticRange);
  var fTop = cvMain || main, fMap = null, fDirty = true, fKey = "", fTerms = [], fHits = [], fRanges = [], fCur = -1, fOn = false;
  var fSec = null, fRange = null, fRing = null, fRaf = 0, fMoT, fCopyMaps = new WeakMap();
  var FIND_SKIP = "script, style, noscript, template, svg, button, input, select, textarea, nav, [hidden], [aria-hidden='true'], " +
    ".sr-only, .rc-live, .back, .cb-copy, .cb-status, .rc-g-ctx, .rc-anchor, .rc-g-banner, .rc-gl-tip, .rc-dp-pane";
  var INLINE = /^(A|ABBR|B|BDI|BDO|CITE|CODE|DATA|DEL|DFN|EM|I|INS|KBD|MARK|Q|S|SAMP|SMALL|SPAN|STRONG|SUB|SUP|TIME|U|VAR)$/;
  
  
  function findNorm(v) {
    if (!/[^\x00-\x7f]/.test(v)) return [v.toLowerCase(), null];
    var n = norm(v);
    if (n.length === v.length) return [n, null];
    var out = "", map = [], i = 0;
    Array.from(v).forEach(function (ch) {
      var c = norm(ch);
      for (var k = 0; k < c.length; k++) map.push(i);
      out += c; i += ch.length;
    });
    map.push(i);
    return [out, map];
  }
  
  
  function findHits(s, terms) {
    var W = /[a-z0-9'_-]/, out = [], merged = [];
    terms.forEach(function (t) {
      var p = 0, n = t.t.length;
      while ((p = s.indexOf(t.t, p)) >= 0) {
        if (!t.w || (!W.test(s.charAt(p - 1)) && !W.test(s.charAt(p + n)))) { out.push([p, p + n]); p += n; } else p += 1;
      }
    });
    out.sort(function (a, b) { return a[0] - b[0] || b[1] - a[1]; });
    out.forEach(function (h) {
      var last = merged[merged.length - 1];
      if (last && h[0] < last[1]) { if (h[1] > last[1]) last[1] = h[1]; } else merged.push(h);
    });
    return merged;
  }
  
  function findAt(at, pos) {
    var lo = 0, hi = at.length - 1;
    while (lo < hi) { var mid = (lo + hi + 1) >> 1; if (at[mid] <= pos) lo = mid; else hi = mid - 1; }
    return lo;
  }
  
  
  
  
  function fBuilder(top) {
    var w = document.createTreeWalker(top, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, { acceptNode: function (n) {
      if (n.nodeType === 3) return NodeFilter.FILTER_ACCEPT;
      return n.matches(FIND_SKIP) || n === toc ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
    } });
    var parts = [], nodes = [], at = [], maps = [], len = 0, last = null;
    return {
      run: function (end) {
        var n, k = 0;
        while ((n = w.nextNode())) {
          var r = findNorm(n.nodeValue);
          if (r[0]) {
            var b = n.parentElement;
            while (b && b !== top && INLINE.test(b.tagName)) b = b.parentElement;
            if (last && b !== last) { parts.push("\n"); len++; }
            last = b;
            nodes.push(n); at.push(len); maps.push(r[1]); parts.push(r[0]); len += r[0].length;
          }
          if ((++k & 63) === 0 && performance.now() >= end) return false;
        }
        return true;
      },
      map: function () { return { s: parts.join(""), nodes: nodes, at: at, maps: maps }; }
    };
  }
  function findMap(top) { var b = fBuilder(top); b.run(Infinity); return b.map(); }
  var fB = null, bRun = false;
  function fPrep() {
    if (!bRun && (!docs || bList)) {
      bRun = true;
      idle(function step(dl) { if (!build(performance.now() + Math.max(4, Math.min(10, dl.timeRemaining())))) idle(step); else bRun = false; });
    }
    if (!fApi || !fTop || fB || (fMap && !fDirty)) return;
    fB = fBuilder(fTop); fDirty = false;
    idle(function step(dl) {
      if (!fB) return;
      if (fB.run(performance.now() + Math.max(4, Math.min(10, dl.timeRemaining())))) { fMap = fB.map(); fB = null; } else idle(step);
    });
  }
  function fHit(m, h) {
    var a = findAt(m.at, h[0]), b = findAt(m.at, h[1] - 1), o = h[0] - m.at[a], eo = h[1] - m.at[b];
    return { a: a, o: m.maps[a] ? m.maps[a][o] : o, b: b, eo: m.maps[b] ? m.maps[b][eo] : eo };
  }
  function fStatic(m, x) {
    return new StaticRange({ startContainer: m.nodes[x.a], startOffset: x.o, endContainer: m.nodes[x.b], endOffset: x.eo });
  }
  function fNum(n) { return n.toLocaleString(root.lang || undefined); }
  function fTotal() { var n = fHits.length; return !n ? L.find_none : fmt(n > 1 ? L.find_n_pl : L.find_n, { n: fNum(n) }); }
  function fSay(t) { if (!fLive) return; fLive.textContent = ""; setTimeout(function () { fLive.textContent = t; }, 30); }
  function fBarH() { return parseFloat(root.style.getPropertyValue("--rc-barh")) || bar.offsetHeight; }
  function fUi() {
    if (!fBox) return;
    var show = fOn && !!inp.value.trim(), n = fHits.length;
    if (fBox.hidden === show) { fBox.hidden = !show; fit(); }
    if (!show) return;
    fN.textContent = n && fCur >= 0 ? fmt(L.find_of, { i: fNum(fCur + 1), n: fNum(n) }) : fTotal();
    fBox.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-disabled", String(!n)); });
  }
  
  
  function fPaint() {
    if (!fApi) return;
    if (!fRanges.length) { CSS.highlights.delete("rc-find"); return; }
    var hl = new Highlight();
    fRanges.forEach(function (r) { hl.add(r); });
    dpPanes.forEach(function (p) {
      var m = fCopyMaps.get(p);  
      if (!m) { m = findMap(p.firstChild); fCopyMaps.set(p, m); }
      findHits(m.s, fTerms).forEach(function (h) { hl.add(fStatic(m, fHit(m, h))); });
    });
    hl.priority = 1;
    CSS.highlights.set("rc-find", hl);
  }
  
  function fMark() {
    for (var k = fHits.length - 1; k >= 0; k--) {
      var x = fHits[k];
      x.m = [];
      for (var j = x.b; j >= x.a; j--) {
        var t = fMap.nodes[j], s = j === x.a ? x.o : 0, e = j === x.b ? x.eo : t.nodeValue.length;
        if (e <= s) continue;
        if (e < t.nodeValue.length) t.splitText(e);
        if (s > 0) t = t.splitText(s);
        var mk = document.createElement("mark");
        mk.className = "rc-find";
        t.parentNode.insertBefore(mk, t); mk.appendChild(t);
        x.m.unshift(mk);
      }
    }
  }
  function fUnpaint() {
    if (fApi) { CSS.highlights.delete("rc-find"); CSS.highlights.delete("rc-find-cur"); }
    else {
      fTop.querySelectorAll("mark.rc-find").forEach(function (mk) {
        var p = mk.parentNode;
        while (mk.firstChild) p.insertBefore(mk.firstChild, mk);
        p.removeChild(mk); p.normalize();
      });
      if (fMo) fMo.takeRecords();
    }
    fRange = null;
    if (fRing) fRing.hidden = true;
    if (fSec) { fSec.classList.remove("rc-cv-find"); fSec = null; }
  }
  function fClear() { fUnpaint(); fKey = ""; fTerms = []; fHits = []; fRanges = []; fCur = -1; fOn = false; fUi(); }
  function fSet(terms) {
    var key = terms.map(function (t) { return (t.w ? "=" : "~") + t.t; }).sort().join(" ");
    fOn = true;
    if (key === fKey && !fDirty) { fUi(); return; }
    var keep = key === fKey ? fCur : -1;
    fUnpaint();
    fKey = key; fTerms = terms; fCur = -1; fHits = []; fRanges = [];
    if (terms.length && fTop) {
      if (fB) { fB.run(Infinity); fMap = fB.map(); fB = null; }
      else if (!fMap || fDirty || !fApi) { fMap = findMap(fTop); fDirty = false; }
      fHits = findHits(fMap.s, terms).map(function (h) { return fHit(fMap, h); });
      if (fApi) { fRanges = fHits.map(function (x) { return fStatic(fMap, x); }); fPaint(); } else fMark();
      if (fMo) fMo.takeRecords();
      if (keep >= 0 && keep < fHits.length) fCurPaint(keep);
    }
    fUi();
  }
  function fRangeOf(x) {
    var r = document.createRange();
    if (x.m) { r.setStartBefore(x.m[0]); r.setEndAfter(x.m[x.m.length - 1]); }
    else { r.setStart(fMap.nodes[x.a], x.o); r.setEnd(fMap.nodes[x.b], x.eo); }
    return r;
  }
  
  function fCurPaint(i, ring) {
    fCur = i;
    var x = fHits[i], el = x.m ? x.m[0] : fMap.nodes[x.a].parentElement, sec = el.closest(".rc-cv");
    if (sec !== fSec) { if (fSec) fSec.classList.remove("rc-cv-find"); fSec = sec; if (sec) sec.classList.add("rc-cv-find"); }
    fRange = fRangeOf(x);
    if (fApi) { var hl = new Highlight(fRange); hl.priority = 2; CSS.highlights.set("rc-find-cur", hl); }
    else {
      fTop.querySelectorAll("mark.rc-find-cur").forEach(function (m) { m.classList.remove("rc-find-cur"); });
      x.m.forEach(function (m) { m.classList.add("rc-find-cur"); });
    }
    if (ring !== false) fRingLater();
    return el;
  }
  
  
  function fRingNow() {
    fRaf = 0;
    if (!fApi || !fRange) { if (fRing) fRing.hidden = true; return; }
    if (!fRing) {
      fRing = document.createElement("div");
      fRing.className = "rc-find-ring no-print"; fRing.setAttribute("aria-hidden", "true");
      document.body.appendChild(fRing);
    }
    fRing.hidden = false;
    while (fRing.firstChild) fRing.removeChild(fRing.firstChild);
    var o = fRing.getBoundingClientRect(), rs = fRange.getClientRects();
    for (var k = 0; k < rs.length && k < 6; k++) {
      var q = rs[k];
      if (!q.width) continue;
      var sp = document.createElement("span");
      sp.style.left = (q.left - o.left - 1) + "px"; sp.style.top = (q.top - o.top - 1) + "px";
      sp.style.width = (q.width + 2) + "px"; sp.style.height = (q.height + 2) + "px";
      fRing.appendChild(sp);
    }
    if (!fRing.firstChild) fRing.hidden = true;
  }
  function fRingLater() { if (fApi && fRange && !fRaf) fRaf = requestAnimationFrame(fRingNow); }
  
  
  function fScroll(r, el) {
    var b = r.getBoundingClientRect();
    if (!b.width && !b.height) { el.scrollIntoView({ block: "center", behavior: "instant" }); return; }
    for (var p = el; p && p !== fTop; p = p.parentElement) {
      if (p.scrollWidth <= p.clientWidth + 1 && p.scrollHeight <= p.clientHeight + 1) continue;
      var cs = getComputedStyle(p);
      if (!/auto|scroll/.test(cs.overflowX + " " + cs.overflowY)) continue;
      var pr = p.getBoundingClientRect(), dx = 0, dy = 0;
      if (b.left < pr.left || b.right > pr.right) dx = b.left - pr.left - (pr.width - b.width) / 2;
      if (b.top < pr.top || b.bottom > pr.bottom) dy = b.top - pr.top - (pr.height - b.height) / 2;
      if (dx || dy) { p.scrollBy({ left: dx, top: dy, behavior: "instant" }); b = r.getBoundingClientRect(); }
    }
    var top = fBarH(), want = top + Math.max(0, (window.innerHeight - top - b.height) / 2);
    if (Math.abs(b.top - want) > 1) window.scrollBy({ top: b.top - want, left: 0, behavior: "instant" });
  }
  function fShow(i) {
    if (root.classList.contains("rc-gallery")) setGallery(false);
    var x = fHits[i], first = x.m ? x.m[0] : fMap.nodes[x.a];
    for (var p = first.parentElement; p && p !== fTop; p = p.parentElement) if (p.tagName === "DETAILS" && !p.open) p.open = true;
    var el = fCurPaint(i, false), r = fRange;
    closeRes();
    fScroll(r, el);
    fRingNow();
    requestAnimationFrame(function () { requestAnimationFrame(function () { if (fRange === r) { fScroll(r, el); fRingNow(); } }); });
    fUi();
    var s = sectionLabel(el);
    fSay(fmt(s ? L.find_say : L.find_say_nosec, { i: fNum(i + 1), n: fNum(fHits.length), s: s }));
  }
  
  
  function fFrom(d) {
    var n = fHits.length, y = fBarH() + 4, lo = 0, hi = n;
    function before(x) {
      var el = x.m ? x.m[0] : fMap.nodes[x.a].parentElement, sec = el.closest(".rc-cv"), b = (sec || el).getBoundingClientRect();
      if (b.bottom <= y) return true;
      if (b.top > y) return false;
      return fRangeOf(x).getBoundingClientRect().top < y;
    }
    while (lo < hi) { var mid = (lo + hi) >> 1; if (before(fHits[mid])) lo = mid + 1; else hi = mid; }
    return d > 0 ? lo % n : (lo - 1 + n) % n;
  }
  function fStep(d) {
    var n = fHits.length;
    if (!n) { fSay(L.find_none); return; }
    fShow(fCur < 0 ? fFrom(d) : (fCur + d + n) % n);
  }
  function fFirstIn(el) {
    for (var k = 0; k < fHits.length; k++) {
      var x = fHits[k];
      if (el.contains(x.m ? x.m[0] : fMap.nodes[x.a])) { fCurPaint(k); fUi(); return; }
    }
  }
  if (fBox) {
    var fGo = function (d) { if (!inp.value.trim()) return; if (timer || !fOn) render(inp.value, true); fStep(d); };
    fBox.querySelector(".rc-find-prev").addEventListener("click", function () { fGo(-1); });
    fBox.querySelector(".rc-find-next").addEventListener("click", function () { fGo(1); });
  }
  
  document.addEventListener("keydown", function (e) {
    if (e.key === "F3" && !e.ctrlKey && !e.altKey && !e.metaKey && inp.value.trim()) {
      e.preventDefault();
      if (timer || !fOn) render(inp.value, true);
      fStep(e.shiftKey ? -1 : 1);
    } else if (e.key === "Escape" && fOn && e.target !== inp) fClear();
  });
  
  var fMo = window.MutationObserver && fTop ? new MutationObserver(function () {
    fDirty = true; fB = null;  
    if (!fOn || !fKey) return;
    clearTimeout(fMoT);
    fMoT = setTimeout(function () { if (fOn && fKey) fSet(fTerms); }, 400);
  }) : null;
  if (fMo) fMo.observe(fTop, { childList: true, subtree: true, characterData: true });
  inp.addEventListener("focus", fPrep);
  inp.addEventListener("pointerenter", fPrep);
  window.addEventListener("resize", fRingLater);
  document.addEventListener("scroll", function (e) { if (e.target !== document) fRingLater(); }, { capture: true, passive: true });
  if (window.ResizeObserver && fTop) new ResizeObserver(fRingLater).observe(fTop);

  
  
  function anchorTarget(el) {
    var p = el.parentElement;
    if (/^H[234]$/.test(el.tagName) && p && p.tagName === "SECTION" && p.id && p.getAttribute("aria-labelledby") === el.id) return p.id;
    return el.id;
  }
  
  function spoken(el) {
    var c = el.cloneNode(true);
    c.querySelectorAll('.rc-anchor, [aria-hidden="true"]').forEach(function (x) { x.remove(); });
    return c.textContent.replace(/\s+/g, " ").trim();
  }
  function anchorTitle(el) {
    var cap = el.tagName === "FIGURE" ? el.querySelector("figcaption") : el.tagName === "TABLE" ? el.querySelector("caption") : el;
    var t = (cap ? spoken(cap) : "") || el.id;
    return t.length > 90 ? t.slice(0, 88) + "…" : t;
  }
  function copyText(t, ok, ko) {
    function fallback() {
      var back = document.activeElement, tmp = document.createElement("input"), done = false;
      tmp.value = t; tmp.setAttribute("readonly", ""); tmp.setAttribute("aria-hidden", "true"); tmp.tabIndex = -1;
      tmp.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none";
      document.body.appendChild(tmp);
      tmp.focus({ preventScroll: true }); tmp.select();
      try { done = document.execCommand("copy"); } catch (e) {}
      tmp.remove();
      if (back && back.focus) back.focus({ preventScroll: true });
      (done ? ok : ko)();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, fallback); else fallback();
  }
  function permalink(btn) {
    var id = btn.getAttribute("data-rc-anchor"), url = location.href.split("#")[0] + "#" + id;
    copyText(url, function () {
      history.replaceState(null, "", "#" + id);
      btn.setAttribute("data-rc-copied", L.copied);
      clearTimeout(btn.rcT);
      btn.rcT = setTimeout(function () { btn.removeAttribute("data-rc-copied"); }, 1500);
      say(fmt(L.copied_say, { t: btn.getAttribute("data-rc-title") }));
    }, function () { history.replaceState(null, "", "#" + id); say(L.copy_fail); });
  }
  var NOT_CONTENT = "nav, .rc-bar, .rc-g-banner, .rc-gl-tip, .rc-kd";
  
  slices(Array.prototype.slice.call(main.querySelectorAll("h2[id], h3[id], h4[id], figure[id], table[id]")), function (el) {
    if (el.hasAttribute("data-rc-anchored") || el.closest(NOT_CONTENT) || (toc && toc.contains(el))) return;
    el.setAttribute("data-rc-anchored", "");
    var t = anchorTitle(el), b = document.createElement("button");
    b.type = "button"; b.className = "rc-anchor"; b.innerHTML = C.link_icon;
    b.setAttribute("data-rc-anchor", anchorTarget(el)); b.setAttribute("data-rc-title", t);
    b.setAttribute("aria-label", fmt(L.anchor, { t: t }));
    b.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); permalink(b); });
    var cap = el.tagName === "FIGURE" ? el.querySelector("figcaption") : el.tagName === "TABLE" ? el.querySelector("caption") : null;
    if (/^H[234]$/.test(el.tagName)) { el.appendChild(b); el.classList.add("rc-anchor-host"); }
    else if (cap) { cap.appendChild(b); (el.tagName === "TABLE" ? (el.closest(".table-wrap") || el) : el).classList.add("rc-anchor-host"); }
    else if (el.tagName === "FIGURE") { el.insertBefore(b, el.firstChild); el.classList.add("rc-anchor-host"); }
    else { el.parentNode.insertBefore(b, el); el.parentNode.classList.add("rc-anchor-host"); }
  });

  
  function navHeads() {
    return Array.prototype.filter.call(main.querySelectorAll("h2, h3"), function (h) {
      return !h.closest(NOT_CONTENT) && !(toc && toc.contains(h)) && h.getClientRects().length > 0;
    });
  }
  function jump(d) {
    var hs = navHeads(), i = hs.indexOf(document.activeElement), lim = bar.offsetHeight + 24, target = null, k;
    if (i >= 0) target = hs[i + d] || null;
    else if (d > 0) { for (k = 0; k < hs.length; k++) if (hs[k].getBoundingClientRect().top > lim) { target = hs[k]; break; } }
    else { for (k = hs.length - 1; k >= 0; k--) if (hs[k].getBoundingClientRect().top < bar.offsetHeight) { target = hs[k]; break; } }
    if (!target) { say(d > 0 ? L.k_last : L.k_first); return; }
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.scrollIntoView({ block: "start" });
    target.focus({ preventScroll: true });
    say(spoken(target));
  }
  function copyCurrent() {
    var lim = window.innerHeight * 0.4, best = null;
    main.querySelectorAll(".rc-anchor-host > .rc-anchor").forEach(function (b) {
      var h = b.parentElement;
      if (/^H[234]$/.test(h.tagName) && h.getClientRects().length && h.getBoundingClientRect().top < lim) best = b;
    });
    if (best) permalink(best); else say(L.no_section);
  }

  
  
  var keysOn = (function () { try { return localStorage.getItem("rc-keys") !== "off"; } catch (e) { return true; } })();
  var keyBtns = bar.querySelectorAll("[data-rc-keys]");
  function setKeys(on, announce) {
    keysOn = on;
    keyBtns.forEach(function (b) { b.setAttribute("aria-pressed", String((b.getAttribute("data-rc-keys") === "on") === on)); });
    store("rc-keys", on ? null : "off");
    if (announce) say(on ? L.keys_say_on : L.keys_say_off);
  }
  keyBtns.forEach(function (b) { b.addEventListener("click", function () { setKeys(b.getAttribute("data-rc-keys") === "on", true); }); });
  setKeys(keysOn, false);

  
  var kd = document.getElementById("rc-kd"), kback = document.getElementById("rc-kd-back"), kReturn = null;
  function kdOpen() {
    if (!kd || !kd.hidden) return;
    kReturn = document.activeElement;
    kd.hidden = false; kback.hidden = false;
    kd.focus();
  }
  function kdClose() {
    if (!kd || kd.hidden) return;
    kd.hidden = true; kback.hidden = true;
    var r = kReturn; kReturn = null;
    if (r && r.focus && r !== document.body && r.getClientRects().length) r.focus(); else ot.focus();
  }
  if (kd) {
    kd.querySelector(".rc-kd-close").addEventListener("click", kdClose);
    kback.addEventListener("click", kdClose);
    var kl = bar.querySelector(".rc-keys-list");
    if (kl) kl.addEventListener("click", kdOpen);
    document.addEventListener("keydown", function (e) {
      if (kd.hidden) return;
      if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); kdClose(); return; }
      if (e.key !== "Tab") return;
      var f = kd.querySelectorAll("button, [href], input, [tabindex]:not([tabindex='-1'])"), a = document.activeElement;
      if (!f.length) { e.preventDefault(); kd.focus(); return; }
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (a === first || a === kd || !kd.contains(a))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (a === last || !kd.contains(a))) { e.preventDefault(); first.focus(); }
    }, true);
    document.addEventListener("focusin", function (e) { if (!kd.hidden && !kd.contains(e.target)) kd.focus(); });
  }

  var THEMES = ["auto", "light", "dark"];
  var KEYS = {
    "/": function () { inp.focus(); inp.select(); },
    "?": kdOpen,
    "+": function () { zoomBy(1); }, "-": function () { zoomBy(-1); }, "=": function () { zoomBy(0); },
    "f": function () { gBtn.click(); },
    "o": function () {
      var open = !root.classList.contains("rc-opts-open");
      setOpts(open);
      var first = open && opts.querySelector("button:not(:disabled), input");
      if (first) first.focus(); else ot.focus();
    },
    "n": function () { jump(1); }, "p": function () { jump(-1); }, "l": copyCurrent
  };
  if (themeBtns.length) KEYS.t = function () { setTheme(THEMES[(THEMES.indexOf(root.getAttribute("data-theme") || "auto") + 1) % 3], true); };
  if (toc && tg) KEYS.m = function () { tg.click(); };
  function typingIn(el) { return !!el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable); }
  document.addEventListener("keydown", function (e) {
    if (e.defaultPrevented || e.isComposing) return;
    var k = e.key || "";
    if ((e.ctrlKey || e.metaKey) && !e.altKey && k.toLowerCase() === "k") { e.preventDefault(); kdClose(); inp.focus(); inp.select(); return; }
    if (!keysOn || e.ctrlKey || e.altKey || e.metaKey || k.length !== 1 || typingIn(document.activeElement) || (kd && !kd.hidden)) return;
    var act = KEYS[/^[A-Z]$/.test(k) && !e.shiftKey ? k.toLowerCase() : k];
    if (!act) return;
    e.preventDefault();
    act();
  });

  
  
  
  
  
  
  var pgBtns = bar.querySelectorAll("[data-rc-pages]"), pgAuto = bar.querySelector('[data-rc-pages="auto"]');
  var dpWide = window.matchMedia("(min-width:87.5rem)"), dpPanes = [], dpTop = 0, dpRaf = 0, pgWant = "1", pgT;
  
  
  function autoPages(w, rem) {
    if (w < 87.5 * 16) return 1;
    return Math.max(1, Math.min(3, Math.floor(w / rem / 42)));
  }
  function pgRem() { return parseFloat(getComputedStyle(root).fontSize) || 16; }
  
  
  function pgCount() {
    return pgWant === "auto" ? autoPages(window.innerWidth, pgRem()) : parseInt(pgWant, 10) || 1;
  }
  function pgWord(n) { return n === 1 ? L.pages_one : fmt(L.pages_n, { n: n }); }
  function dpMeasure() { if (dpPanes.length && cvMain) dpTop = cvMain.getBoundingClientRect().top + window.scrollY; }
  // Dernière section de la liste qui commence à la ligne y ou au-dessus (coordonnées de fenêtre), ou -1.
  function dpCut(secs, y) {
    var lo = 0, hi = secs.length - 1, n = -1;
    while (lo <= hi) {
      var mid = (lo + hi) >> 1;
      if (secs[mid].getBoundingClientRect().top <= y) { n = mid; lo = mid + 1; } else hi = mid - 1;
    }
    return n;
  }
  function dpSync() {
    dpRaf = 0;
    if (!dpPanes.length) return;
    // Chaque panneau reprend le texte là où la colonne précédente le coupe. On s'aligne sur la
    // section coupée elle-même, pas sur une distance depuis le haut du document : une section hors
    // écran n'a qu'une hauteur estimée, qui diffère d'une colonne à l'autre tant qu'elle n'est pas
    // réapprise (changement de largeur, plein écran). Sans section au-dessus, on garde la distance.
    var base = window.scrollY + window.innerHeight - dpTop, step = dpPanes[0].clientHeight;
    var secs = cvList, cut = window.innerHeight;
    for (var k = 0; k < dpPanes.length; k++) {
      var pane = dpPanes[k], mine = dpSecs[k], n = mine && secs.length === mine.length ? dpCut(secs, cut) : -1;
      if (n < 0) pane.scrollTop = Math.max(0, base + k * step);
      else {
        var off = cut - secs[n].getBoundingClientRect().top, box = pane.getBoundingClientRect().top;
        // Deux passes : la section visée n'est mise en page qu'une fois arrivée dans le panneau.
        for (var pass = 0; pass < 2; pass++) {
          var d = mine[n].getBoundingClientRect().top + off - box;
          if (Math.abs(d) < 0.5) break;
          pane.scrollTop += d;
        }
      }
      secs = mine || secs; cut = pane.getBoundingClientRect().bottom;
    }
  }
  function dpLater() { if (dpPanes.length && !dpRaf) dpRaf = requestAnimationFrame(dpSync); }
  
  function dpPane(src) {
    var copy = src.cloneNode(true);
    copy.removeAttribute("id");
    copy.querySelectorAll("[id]").forEach(function (el) { el.removeAttribute("id"); });
    var refs = ["name", "for", "aria-labelledby", "aria-describedby", "aria-controls", "aria-owns", "aria-activedescendant"];
    copy.querySelectorAll("[name], [for], [aria-labelledby], [aria-describedby], [aria-controls], [aria-owns], [aria-activedescendant]").forEach(function (el) {
      refs.forEach(function (a) { el.removeAttribute(a); });
    });
    copy.querySelectorAll(".rc-g-banner").forEach(function (el) { el.remove(); });
    copy.classList.add("rc-dp-copy");
    var pane = document.createElement("div");
    pane.className = "rc-dp-pane no-print";
    pane.setAttribute("aria-hidden", "true");
    pane.inert = true;
    pane.appendChild(copy);
    return pane;
  }
  
  
  
  // Les hauteurs changent sans défilement (sections apprises, polices, plein écran) : on recale alors.
  var dpRo = window.ResizeObserver ? new ResizeObserver(function () { dpLater(); }) : null;
  function dpDrop() { var p = dpPanes.pop(); if (dpRo) { dpRo.unobserve(p); if (p.firstChild) dpRo.unobserve(p.firstChild); } p.remove(); dpSecs.pop(); }
  function dpPlace(fresh) {
    if (!cvMain || !pgBtns.length) return 1;
    if (fresh === true) while (dpPanes.length) dpDrop();
    var n = pgCount();
    while (dpPanes.length > n - 1) dpDrop();
    while (dpPanes.length < n - 1) {
      var p = dpPane(dpPanes.length ? dpPanes[0].firstChild : cvMain), after = dpPanes.length ? dpPanes[dpPanes.length - 1] : cvMain;
      after.parentNode.insertBefore(p, after.nextSibling);
      dpPanes.push(p);
      if (dpRo) { dpRo.observe(p.firstChild); dpRo.observe(p); }
      dpSecs.push(Array.prototype.slice.call(p.querySelectorAll(".rc-cv")));
    }
    if (n > 1) { root.style.setProperty("--rc-pages", String(n)); root.classList.add("rc-dp-on"); }
    else { root.classList.remove("rc-dp-on"); root.style.removeProperty("--rc-pages"); }
    if (pgAuto) pgAuto.setAttribute("aria-label", fmt(L.pages_auto_now, { p: pgWord(autoPages(window.innerWidth, pgRem())) }));
    dpMeasure(); dpSync();
    if (fRanges && fRanges.length) fPaint();  
    return n;
  }
  function setPages(v, announce) {
    v = v === "2" || v === "3" || v === "auto" ? v : "1";
    pgWant = v;
    pgBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-rc-pages") === v)); });
    var n = dpPlace();
    if (announce) { store("rc-pages", v === "1" ? null : v); say(fmt(v === "auto" ? L.pages_say_auto : L.pages_say, { p: pgWord(n) })); }
  }
  if (pgBtns.length && cvMain) {
    pgBtns.forEach(function (b) { b.addEventListener("click", function () { setPages(b.getAttribute("data-rc-pages"), true); }); });
    window.addEventListener("scroll", dpLater, { passive: true });
    if (dpRo) dpRo.observe(cvMain);
    document.addEventListener("fullscreenchange", function () { dpMeasure(); dpLater(); });
    window.addEventListener("resize", function () {
      dpMeasure(); dpLater();
      clearTimeout(pgT); pgT = setTimeout(function () { if (pgWant !== "1") dpPlace(true); }, 150);
    });
    
    
    var pgM;
    if (window.MutationObserver) new MutationObserver(function () {
      if (!dpPanes.length) return;
      clearTimeout(pgM); pgM = setTimeout(function () { idle(function () { if (dpPanes.length) dpPlace(true); }); }, 500);
    }).observe(cvMain, { childList: true, subtree: true, characterData: true });
    if (dpWide.addEventListener) dpWide.addEventListener("change", function () { if (pgWant !== "1") dpPlace(); });
    
    if (window.MutationObserver) new MutationObserver(function () { if (dpPanes.length) { dpMeasure(); dpLater(); } })
      .observe(root, { attributes: true, attributeFilter: ["class"] });
    
    var pgSaved = (function () { try { return localStorage.getItem("rc-pages"); } catch (e) { return null; } })();
    if (pgSaved === "2" || pgSaved === "3" || pgSaved === "auto") {
      pgWant = pgSaved;
      pgBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-rc-pages") === pgSaved)); });
      idle(dpPlace);
    }
  }

  
  
  
  
  
  
  var vMeta = document.querySelector('meta[name="rc-build"]');
  if (vBox && vMeta && /^https?:$/.test(location.protocol) && window.fetch && window.Promise) {
    var vSw = navigator.serviceWorker, vMsg = vBox.querySelector(".rc-ver-msg"), vGo = vBox.querySelector(".rc-ver-go"),
      vX = vBox.querySelector(".rc-ver-x"), vBusy = false;
    var vSet = function (state, text) {
      var on = state === "new" || state === "offline";
      vBox.setAttribute("data-state", state);
      if (!on && vBox.contains(document.activeElement)) ot.focus();
      vBox.classList.toggle("rc-ver-on", on);
      vGo.hidden = state !== "new"; vGo.disabled = false; vX.hidden = !on;
      vMsg.textContent = on ? text : "";
      setBarH();
    };
    var vWhen = function (t) {
      var d = new Date(t);
      return t && !isNaN(d) ? d.toLocaleString(root.lang || undefined, { dateStyle: "long", timeStyle: "short" }) : "";
    };
    
    var vAsk = function () {
      return new Promise(function (ok) {
        var ctl = vSw && vSw.controller;
        if (!ctl || !window.MessageChannel) { ok(null); return; }
        var ch = new MessageChannel(), t = setTimeout(function () { ok(null); }, 1500);
        ch.port1.onmessage = function (e) { clearTimeout(t); ch.port1.close(); ok(e.data || null); };
        try { ctl.postMessage({ type: "rc-status" }, [ch.port2]); } catch (e) { clearTimeout(t); ok(null); }
      });
    };
    var vBuildIn = function (txt) {
      var m = txt.match(/\bBUILD\s*=\s*["']([^"']+)["']/);
      return m ? m[1] : txt.length <= 128 ? txt.trim() : "";
    };
    var vCheck = function () {
      var src = vMeta.getAttribute("data-src") || (vSw && vSw.controller ? vSw.controller.scriptURL : "");
      if (vBusy || !src) return;
      vBusy = true;
      var ab = window.AbortController ? new AbortController() : null, t = ab && setTimeout(function () { ab.abort(); }, 8000);
      var done = function () { clearTimeout(t); vBusy = false; };
      fetch(src, { cache: "no-store", credentials: "same-origin", signal: ab ? ab.signal : undefined })
        .then(function (r) { return r.ok ? r.text() : ""; }, function () { return null; })
        .then(function (txt) {
          if (txt !== null) {
            var b = vBuildIn(txt);
            vSet(!b ? "unknown" : b === vMeta.content ? "current" : "new", L.ver_new);
            return;
          }
          
          return vAsk().then(function (st) {
            if (st && st.fromCache === false) { vSet("unknown"); return; }
            var when = vWhen(st && st.keptAt);
            vSet("offline", when ? fmt(L.ver_off_at, { d: when }) : L.ver_off);
          });
        })
        .then(done, done);
    };
    
    vGo.addEventListener("click", function () {
      vGo.disabled = true;
      var go = function () { location.reload(); };
      if (!vSw || !vSw.getRegistration) { go(); return; }
      vSw.getRegistration().then(function (reg) {
        if (!reg || !(reg.waiting || reg.installing)) { go(); return; }
        vSw.addEventListener("controllerchange", go, { once: true });
        if (reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
        setTimeout(go, 5000);
      }, go);
    });
    vX.addEventListener("click", function () { vSet("dismissed"); });
    window.addEventListener("pageshow", function (e) {
      if (!e.persisted) return;
      vCheck();
      if (vSw && vSw.getRegistration) vSw.getRegistration().then(function (r) { if (r) r.update().catch(function () {}); }, function () {});
    });
    window.addEventListener("online", vCheck);
    vCheck();
  }

  
  if (cvList.length) { if (document.fonts && document.fonts.ready) document.fonts.ready.then(cvStart); else cvStart(); }
  if (location.hash.length > 1) hjStart(false);
})();
