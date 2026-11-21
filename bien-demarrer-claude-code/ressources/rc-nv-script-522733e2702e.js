

(function () {
  var KEY = "rc-nouveautes", root = document.documentElement;
  function on() { return root.classList.contains("rc-new-only"); }
  function count() { return document.querySelectorAll("main .rc-nouveau").length; }
  function markToc() {
    var seules = on();
    document.querySelectorAll("nav.toc li").forEach(function (li) {
      var a = li.querySelector(":scope > a"), id = a ? (a.getAttribute("href") || "").slice(1) : "";
      var t = id ? document.getElementById(id) : null;
      li.classList.toggle("rc-new-off", seules && !!t && t.offsetParent === null);
    });
  }
  function set(seules) {
    root.classList.toggle("rc-new-only", seules);
    try { if (seules) localStorage.setItem(KEY, "seules"); else localStorage.removeItem(KEY); } catch (e) {}
    markToc();
  }
  function addRow() {
    markToc();
    var prev = document.querySelector("[data-rc-ex]") || document.querySelector("[data-rc-style]") || document.querySelector("[data-rc-keys]");
    var row = prev && prev.closest(".rc-row");
    if (!row || document.querySelector("[data-rc-nv]")) return;
    var r = document.createElement("div"); r.className = "rc-row";
    r.innerHTML = '<span class="rc-lbl" aria-hidden="true">Nouveautés</span><span class="rc-grp" role="group" aria-label="Nouveautés">'
      + '<button type="button" data-rc-nv="tout">Tout le guide</button><button type="button" data-rc-nv="seules">Nouveautés seulement</button>'
      + '<span class="rc-nv-note sr-only" role="status" aria-live="polite"></span></span>';  
    row.parentNode.insertBefore(r, row.nextSibling);
    var bs = r.querySelectorAll("button"), note = r.querySelector(".rc-nv-note");
    function show(say) {
      var seules = on(), n = count();
      bs.forEach(function (b) { b.setAttribute("aria-pressed", String((b.getAttribute("data-rc-nv") === "seules") === seules)); });
      if (say) note.textContent = seules ? (n ? n + " nouveautés affichées, avec la page « Quoi de neuf ». Le reste du guide est masqué." : "Aucune nouveauté dans cette version : seule la page « Quoi de neuf » reste.") : "Tout le guide est affiché.";
    }
    bs.forEach(function (b) { b.addEventListener("click", function () { set(b.getAttribute("data-rc-nv") === "seules"); show(true); }); });
    show(false);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addRow); else addRow();
})();
