// Mobile hamburger menu: builds a full-screen panel from the nav links.
(function () {
  function init() {
    var nav = document.querySelector('nav');
    var list = nav && nav.querySelector('.nav-links');
    if (!list || nav.querySelector('.nav-burger')) return;
    var btn = document.createElement('button');
    btn.className = 'nav-burger'; btn.type = 'button';
    btn.setAttribute('aria-label', 'Open menu'); btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span>';
    nav.appendChild(btn);

    var panel = document.createElement('div');
    panel.className = 'nav-panel'; panel.hidden = true;
    var logo = nav.querySelector('.nav-logo');
    var html = '<div class="np-top">' + (logo ? logo.outerHTML : '') +
      '<button type="button" class="np-close" aria-label="Close menu"><span></span><span></span></button></div><div class="np-links">';
    var cta = null;
    list.querySelectorAll('a').forEach(function (a) {
      if (a.classList.contains('nav-cta')) { cta = a; return; }
      html += '<a href="' + a.getAttribute('href') + '">' + a.textContent + '</a>';
    });
    html += '<a href="' + (document.querySelector('a[href$="demo/"]') ? 'demo/' : '/demo/') + '">Live demo</a>';
    html += '<a href="privacy.html">Privacy</a></div><div class="np-actions">' +
      '<a class="btn btn-primary" href="/demo/">Try the live demo</a>' +
      (cta ? '<a class="btn btn-ghost np-ghost" href="' + cta.getAttribute('href') + '">Join the waitlist</a>' : '') + '</div>';
    panel.innerHTML = html;
    document.body.appendChild(panel);

    function set(open) {
      panel.hidden = !open;
      document.documentElement.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    btn.addEventListener('click', function () { set(true); });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('.np-close') || e.target.closest('a:not(.nav-logo)') ) set(false);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) set(false); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
