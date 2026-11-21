

(function () {
  var OFFICIAL_HOSTS = ["anthropic.com", "claude.com", "claude.ai"];
  var SKEY = "rc-ext-ok", dlg = null, from = null, url = "";
  function official(href) {
    var h; try { h = new URL(href).hostname.toLowerCase().replace(/\.$/, ""); } catch (e) { return false; }
    return OFFICIAL_HOSTS.some(function (o) { return h === o || h.slice(-(o.length + 1)) === "." + o; });
  }
  window.rcOfficialHost = official;                         
  function quiet() { try { return sessionStorage.getItem(SKEY) === "1"; } catch (e) { return false; } }
  function build() {
    dlg = document.createElement("dialog");
    dlg.className = "rc-ext"; dlg.setAttribute("aria-labelledby", "rc-ext-t"); dlg.setAttribute("aria-describedby", "rc-ext-d");
    dlg.innerHTML = '<div class="rc-ext-title" id="rc-ext-t" role="heading" aria-level="2">Vous quittez le guide</div>'
      + '<p id="rc-ext-d">Ce lien ouvre un site externe : <strong class="rc-ext-host"></strong>.</p>'
      + '<p class="rc-ext-u"><code class="rc-ext-url"></code></p>'
      + '<p class="rc-ext-q"><label><input type="checkbox" class="rc-ext-box"> Ne plus m’avertir pendant cette visite</label></p>'
      + '<div class="rc-ext-btns"><button type="button" class="rc-ext-go">Ouvrir le site</button>'
      + '<button type="button" class="rc-ext-stay">Rester sur le guide</button></div>';
    document.body.appendChild(dlg);
    dlg.querySelector(".rc-ext-stay").addEventListener("click", function () { dlg.close(); });
    dlg.querySelector(".rc-ext-go").addEventListener("click", function () { window.open(url, "_blank", "noopener,noreferrer"); dlg.close(); });
    dlg.querySelector(".rc-ext-box").addEventListener("change", function (e) {
      try { if (e.target.checked) sessionStorage.setItem(SKEY, "1"); else sessionStorage.removeItem(SKEY); } catch (x) {}
    });
    dlg.addEventListener("close", function () { var f = from; from = null; if (f && document.contains(f)) f.focus(); });
  }
  function warn(a) {
    if (!dlg) build();
    url = a.href; from = a;
    dlg.querySelector(".rc-ext-host").textContent = a.hostname;
    dlg.querySelector(".rc-ext-url").textContent = url;
    dlg.querySelector(".rc-ext-box").checked = quiet();
    dlg.showModal();
    dlg.querySelector(".rc-ext-stay").focus();
  }
  function handle(e) {
    if (e.type === "auxclick" && e.button !== 1) return;
    var a = e.target.closest && e.target.closest('a[href^="http"]');
    if (!a || (dlg && dlg.contains(a)) || a.host === location.host) return;
    if (official(a.href)) {                                 
      if (e.type === "click" && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey && a.target !== "_blank") {
        e.preventDefault(); window.open(a.href, "_blank", "noopener,noreferrer");
      }
      return;
    }
    if (quiet()) return;
    e.preventDefault(); e.stopPropagation();
    if (!dlg || !dlg.open) warn(a);
  }
  document.addEventListener("click", handle, true);
  document.addEventListener("auxclick", handle, true);
})();
