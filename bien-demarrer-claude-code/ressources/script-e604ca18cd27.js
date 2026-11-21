

(function () {
  var stack = [], at = null, token = 0, btn = document.createElement("button"), bar = document.getElementById("rc-bar"), ro = null;
  var NOKID = /^(OL|UL|DL|TABLE|THEAD|TBODY|TFOOT|TR|COLGROUP|SELECT|DATALIST|OPTGROUP|PICTURE|MENU|HGROUP)$/;
  btn.type = "button"; btn.className = "rc-back-jump"; btn.hidden = true;
  btn.setAttribute("aria-label", "Revenir à l’endroit précédent");
  btn.innerHTML = '<svg class="hi" focusable="false" aria-hidden="true"><use href="#ti-arrow-back-up"/></svg><span>Revenir</span>';
  document.body.appendChild(btn);
  function still() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("rc-motion-off"); }
  function barBottom() { return bar ? Math.max(0, bar.getBoundingClientRect().bottom) : 0; }
  function label() {
    btn.hidden = !stack.length;
    btn.querySelector("span").textContent = stack.length > 1 ? "Revenir (" + stack.length + ")" : "Revenir";
  }
  
  function arrival(t) {
    if (/^(SECTION|ARTICLE|ASIDE|DIV|NAV)$/.test(t.tagName)) {
      var l = t.getAttribute("aria-labelledby"), h = l && document.getElementById(l.split(/\s+/)[0]);
      if (!h || !t.contains(h)) h = t.querySelector("h1,h2,h3,h4,h5,h6");
      if (h) return h;
    }
    return t;
  }
  
  function dock(el) {
    var spot = el;
    for (var a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      var cs = getComputedStyle(a);
      if (/(auto|scroll|hidden|clip)/.test(cs.overflowX + cs.overflowY)) spot = a;
    }
    if (spot === el && /^(LI|DT|DD|TD|TH|P|FIGURE|FIGCAPTION|BLOCKQUOTE)$/.test(el.tagName)) el.insertBefore(btn, el.firstChild);
    else if (spot.parentNode && !NOKID.test(spot.parentNode.tagName)) spot.parentNode.insertBefore(btn, spot.nextSibling);
    else if (!NOKID.test(spot.tagName)) spot.insertBefore(btn, spot.firstChild);
    else document.body.appendChild(btn);
    if (ro) { ro.disconnect(); ro.observe(document.body); ro.observe(el); }
  }
  
  function place() {
    if (btn.hidden || !at || !document.contains(at)) return;
    btn.style.left = "0px"; btn.style.top = "0px";
    var o = btn.getBoundingClientRect(), r = at.getBoundingClientRect(), vw = document.documentElement.clientWidth;
    var x = Math.max(8, Math.min(r.left, vw - o.width - 8)), y = r.top - o.height - 6;
    btn.style.left = Math.round(x - o.left) + "px"; btn.style.top = Math.round(y - o.top) + "px";
  }
  function focusable(el) { return el.matches("a[href],button,input,select,textarea,summary,[tabindex]"); }
  function go(to) {
    at = to; dock(to); label(); place();
    
    var y = window.scrollY + to.getBoundingClientRect().top - barBottom() - btn.offsetHeight - 14;
    window.scrollTo({ top: Math.max(0, Math.round(y)), behavior: still() ? "auto" : "smooth" });
    if (!focusable(to)) to.setAttribute("tabindex", "-1");
    to.focus({ preventScroll: true });
    var tk = ++token, done = false;
    function settle() { if (done || tk !== token) return; done = true; window.removeEventListener("scrollend", settle); place(); }
    if ("onscrollend" in window) window.addEventListener("scrollend", settle);
    setTimeout(settle, 1200);
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href^='#']");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var href = a.getAttribute("href"), id = decodeURIComponent(href.slice(1)), t = id && document.getElementById(id);
    if (!t) return;
    if (a.closest("nav.toc, .rc-bar, .rc-opts, .rc-g-banner, .rc-g-ctx") || a.classList.contains("skip")) return;   
    e.preventDefault();
    stack.push({ y: window.scrollY, from: a, top: a.getBoundingClientRect().top, to: arrival(t) });
    if (stack.length > 20) stack.shift();
    if (history.pushState) history.pushState(null, "", href);
    go(stack[stack.length - 1].to);
  }, true);
  btn.addEventListener("click", function () {
    var s = stack.pop(); if (!s) return;
    token++;
    
    var y = (s.from && document.contains(s.from)) ? window.scrollY + s.from.getBoundingClientRect().top - s.top : s.y;
    window.scrollTo({ top: y, behavior: still() ? "auto" : "smooth" });
    if (s.from && document.contains(s.from)) s.from.focus({ preventScroll: true });
    if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    label();
    if (stack.length) { at = stack[stack.length - 1].to; dock(at); place(); } else at = null;
  });
  window.addEventListener("resize", place);
  if (window.ResizeObserver) ro = new ResizeObserver(function () { place(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  window.addEventListener("load", place);
})();
