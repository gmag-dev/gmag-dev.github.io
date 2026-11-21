
(function () {
  var nav = document.getElementById("toc"), title = document.getElementById("toc-title");
  if (!nav || !title) return;
  var items = [].slice.call(nav.querySelectorAll(":scope > ol > li")).filter(function (li) { return li.querySelector(":scope > ol"); });
  function set(li, open) {
    li.classList.toggle("toc-closed", !open);
    var b = li.querySelector(":scope > .toc-tw"), name = li.querySelector(":scope > a").textContent.trim();
    b.setAttribute("aria-expanded", String(open));
    b.setAttribute("aria-label", (open ? "Replier " : "Déplier ") + name);
    b.textContent = open ? "▾" : "▸";
  }
  items.forEach(function (li, i) {
    var sub = li.querySelector(":scope > ol"); if (!sub.id) sub.id = "toc-sub-" + (i + 1);
    var b = document.createElement("button"); b.type = "button"; b.className = "toc-tw"; b.setAttribute("aria-controls", sub.id);
    li.classList.add("toc-sub"); li.insertBefore(b, li.querySelector(":scope > a").nextSibling);
    b.addEventListener("click", function () { set(li, li.classList.contains("toc-closed")); });
    set(li, true);
  });
  var bar = document.createElement("div"); bar.className = "toc-all"; bar.setAttribute("role", "group"); bar.setAttribute("aria-label", "Replier ou déplier le sommaire");
  bar.innerHTML = '<button type="button" data-toc-all="open"><svg class="hi" focusable="false" aria-hidden="true"><use href="#ti-chevrons-down"/></svg> Tout déplier</button><button type="button" data-toc-all="close"><svg class="hi" focusable="false" aria-hidden="true"><use href="#ti-chevrons-up"/></svg> Tout replier</button>'
    + '<button type="button" data-toc-top aria-label="Haut de page, revenir au début du document"><svg class="hi" focusable="false" aria-hidden="true"><use href="#ti-arrow-bar-to-up"/></svg> Haut de page</button>';
  title.parentNode.insertBefore(bar, title.nextSibling);
  bar.addEventListener("click", function (e) {
    
    if (e.target.closest("[data-toc-top]")) {
      var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("rc-motion-off");
      window.scrollTo({ top: 0, behavior: still ? "auto" : "smooth" });
      var first = document.querySelector(".titlepage h1") || document.body;
      if (!first.hasAttribute("tabindex")) first.setAttribute("tabindex", "-1");
      first.focus({ preventScroll: true });
      if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
      return;
    }
    var b = e.target.closest("[data-toc-all]"); if (!b) return;
    var open = b.getAttribute("data-toc-all") === "open";
    folded = !open;
    items.forEach(function (li) { set(li, open); });
    if (folded) follow();
  });
  
  var folded = false;
  function follow() {
    var cur = nav.querySelector("a[aria-current]"), li = cur && cur.closest("li.toc-sub");
    items.forEach(function (x) { set(x, x === li); });
  }
  new MutationObserver(function () { if (folded) follow(); }).observe(nav, { subtree: true, attributes: true, attributeFilter: ["aria-current"] });
  
  if (window.matchMedia("(max-width:47.99rem)").matches) { folded = true; follow(); }
})();
