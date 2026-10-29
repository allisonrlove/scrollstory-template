/*****************************************************
STORY FEATURES

Behaviour for the optional scrollstory extras:
  - story tabs (smooth scroll, active highlight, auto-built tabs)
  - reading progress bar
  - back-to-top button
  - fade-in on scroll

Each piece only runs if its markup is on the page, so removing a feature's
include (or turning it off in _config.yml) removes it completely.
Loaded by: _includes/scrollstory/features.html
*****************************************************/
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  function slug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  // Find a heading by id, or failing that by its text, so a tab still works
  // if the student typed the heading words instead of the id.
  function findTarget(key) {
    var el = document.getElementById(key);
    if (el) return el;
    var wanted = key.trim().toLowerCase();
    var heads = document.querySelectorAll('main h1, main h2, main h3');
    for (var i = 0; i < heads.length; i++) {
      if (heads[i].textContent.trim().toLowerCase() === wanted) return heads[i];
    }
    return null;
  }

  /* ---------- Tabs ---------- */
  function initTabs() {
    var bar = document.querySelector('[data-story-tabs]');
    if (!bar) return;
    var list = bar.querySelector('.story-tabs-list');

    if (bar.getAttribute('data-auto') === 'true') {
      var used = {};
      document.querySelectorAll('main h2').forEach(function (h) {
        if (!h.id) {
          var base = slug(h.textContent) || 'section';
          var id = base, n = 2;
          while (used[id] || document.getElementById(id)) id = base + '-' + n++;
          h.id = id;
        }
        used[h.id] = true;
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.className = 'story-tab';
        a.href = '#' + h.id;
        a.setAttribute('data-section', h.id);
        a.textContent = h.textContent;
        li.appendChild(a);
        list.appendChild(li);
      });
    }

    var nav = document.querySelector('.top-nav');
    function measure() {
      var navSticky = nav && getComputedStyle(nav).position === 'sticky';
      var top = navSticky ? nav.offsetHeight : 0;
      root.style.setProperty('--story-tabs-top', top + 'px');
      root.style.setProperty('--story-tabs-h', bar.offsetHeight + 'px');
    }
    measure();
    window.addEventListener('resize', measure);
    root.classList.add('has-story-tabs');

    var items = [];
    list.querySelectorAll('.story-tab[data-section]').forEach(function (a) {
      var target = findTarget(a.getAttribute('data-section'));
      if (!target) {
        a.parentNode.style.display = 'none';
        return;
      }
      items.push({ link: a, target: target });
      a.addEventListener('click', function (e) {
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        if (history.replaceState) history.replaceState(null, '', '#' + (target.id || ''));
      });
    });

    var current = null;
    function setActive(link) {
      if (link === current) return;
      current = link;
      list.querySelectorAll('.story-tab').forEach(function (a) {
        var on = a === link;
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'location');
        else if (a.getAttribute('aria-current') === 'location') a.removeAttribute('aria-current');
      });
      if (link) {
        var l = link.offsetLeft, r = l + link.offsetWidth;
        if (l < list.scrollLeft || r > list.scrollLeft + list.clientWidth) {
          list.scrollTo({ left: l - 24, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      }
    }

    function update() {
      var line = parseFloat(getComputedStyle(root).getPropertyValue('--story-tabs-top')) +
                 bar.offsetHeight + 40;
      var active = null;
      for (var i = 0; i < items.length; i++) {
        if (items[i].target.getBoundingClientRect().top <= line) active = items[i].link;
      }
      setActive(active);
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    window.__storyTabsUpdate = update;
  }

  /* ---------- Progress bar, back to top ---------- */
  var ticking = false;
  var progress, top;
  function schedule() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var max = root.scrollHeight - window.innerHeight;
      var y = window.pageYOffset;
      if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
      if (top) top.hidden = y < window.innerHeight * 0.8;
      if (window.__storyTabsUpdate) window.__storyTabsUpdate();
    });
  }

  function initExtras() {
    progress = document.querySelector('.story-progress-bar');
    top = document.querySelector('.story-top');
    if (top) {
      top.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    }
    if (progress || top) {
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
      schedule();
    }
  }

  /* ---------- Fade in on scroll ---------- */
  function initReveal() {
    if (!window.storyFeatures || !window.storyFeatures.reveal) return;
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var sel = '.container > p, .container > h2, .container > h3, .container > ul, ' +
              '.container > ol, .container > blockquote, .container > figure, ' +
              '.container > .pullquote, .container > .alert';
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ---------- Count-up numbers (layout/stats.html) ---------- */
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    function run(el) {
      var text = el.textContent;
      var m = text.match(/[\d,]*\.?\d+/);
      if (!m || reduceMotion) return;
      var end = parseFloat(m[0].replace(/,/g, ''));
      var dec = (m[0].split('.')[1] || '').length;
      var commas = m[0].indexOf(',') !== -1;
      var start = null;
      function fmt(v) {
        var s = v.toFixed(dec);
        return commas ? Number(s).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) : s;
      }
      function step(t) {
        if (start === null) start = t;
        var p = Math.min((t - start) / 1400, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = text.replace(m[0], fmt(end * eased));
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = text;
      }
      requestAnimationFrame(step);
    }
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }

  function init() {
    initTabs();
    initExtras();
    initReveal();
    initCounters();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
