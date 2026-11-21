

(function () {
  var d = document.getElementById("zoom"), body = document.getElementById("zoom-body"), back = null;
  var fs = document.getElementById("zoom-fs"), wrap = document.getElementById("zoom-wrap");
  if (!d || !d.showModal) { return; }
  
  var canFull = !!(wrap.requestFullscreen && document.fullscreenEnabled);
  if (!canFull) { fs.hidden = true; }
  function full(on) {
    d.classList.toggle("full", on); body.setAttribute("aria-pressed", on ? "true" : "false");
  }
  function open(fig) {
    var svg = fig.querySelector("svg");
    if (!svg) { return; }
    back = fig; body.textContent = ""; body.appendChild(svg.cloneNode(true));
    full(false); d.showModal(); body.focus();
  }
  function target(e) {
    var f = e.target && e.target.closest ? e.target.closest(".fig-zoom") : null;
    return f && !f.closest("dialog") ? f : null;
  }
  
  function inPane(x, y) {
    var panes = document.querySelectorAll(".rc-dp-pane");
    for (var i = 0; i < panes.length; i++) {
      var p = panes[i].getBoundingClientRect();
      if (x < p.left || x > p.right || y < p.top || y > p.bottom) { continue; }
      var figs = panes[i].querySelectorAll(".fig-zoom");
      for (var j = 0; j < figs.length; j++) {
        var r = figs[j].getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) { return figs[j]; }
      }
    }
    return null;
  }
  function twin(f) {  
    if (!f || !f.closest(".rc-dp-pane")) { return f; }
    var all = document.querySelectorAll(".fig-zoom");
    for (var i = 0; i < all.length; i++) {
      if (!all[i].closest(".rc-dp-pane") && all[i].getAttribute("data-zoom") === f.getAttribute("data-zoom")) { return all[i]; }
    }
    return null;
  }
  document.addEventListener("click", function (e) {
    var f = target(e) || (e.target && e.target.closest && !e.target.closest("dialog") ? inPane(e.clientX, e.clientY) : null);
    if (f) { open(f); }
  });
  var lay = null, tick = false;
  document.addEventListener("mousemove", function (e) {
    if (tick) { return; }
    tick = true;
    requestAnimationFrame(function () {
      tick = false;
      lay = lay || document.querySelector(".rc-layout");
      if (lay) { lay.style.cursor = inPane(e.clientX, e.clientY) ? "zoom-in" : ""; }
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") { return; }
    var f = target(e);
    if (f && e.target === f) { e.preventDefault(); open(f); }
  });
  body.addEventListener("click", function () { full(!d.classList.contains("full")); });
  body.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); full(!d.classList.contains("full")); }
  });
  fs.addEventListener("click", function () {
    if (!canFull) { return; }
    if (document.fullscreenElement) { document.exitFullscreen(); } else { wrap.requestFullscreen().catch(function () {}); }
  });
  document.addEventListener("fullscreenchange", function () {
    fs.textContent = document.fullscreenElement === wrap ? "Quitter le plein écran" : "Plein écran";
  });
  document.getElementById("zoom-close").addEventListener("click", function () { d.close(); });
  d.addEventListener("close", function () {
    if (document.fullscreenElement === wrap) { document.exitFullscreen(); }
    body.textContent = "";
    var b = twin(back);
    if (b) { b.focus(); }
  });
})();
