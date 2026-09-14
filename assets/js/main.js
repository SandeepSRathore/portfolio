/* ═══════════════════════════════════════════════════════════════════════
   Portfolio behaviour: theme toggle, scroll reveals, active nav section.
   No dependencies. Everything degrades to a readable page without JS.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Theme ─────────────────────────────────────────────────────────── */
  // The initial theme is applied by the inline script in <head> so the page
  // never flashes the wrong colours. Here we only wire up the toggle.
  var toggle = document.getElementById('themetoggle');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        // Private browsing, blocked storage — the toggle still works for this visit.
      }
    });
  }

  // Follow the OS if the visitor has never made an explicit choice.
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  var onSystemChange = function (e) {
    var stored = null;
    try { stored = localStorage.getItem('theme'); } catch (err) { /* ignore */ }
    if (!stored) root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  };
  if (systemDark.addEventListener) systemDark.addEventListener('change', onSystemChange);

  /* ── Reveal on scroll ──────────────────────────────────────────────── */
  var revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        // Stagger siblings slightly so a section arrives as a group, not a wall.
        var siblings = Array.prototype.slice.call(entry.target.parentNode.children);
        var index = Math.min(siblings.indexOf(entry.target), 6);
        entry.target.style.transitionDelay = (index * 60) + 'ms';
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    revealables.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ── Nav: border once scrolled, highlight the section in view ──────── */
  var nav = document.getElementById('nav');

  if (nav) {
    // A zero-height sentinel at the top of the page tells us when we've left it.
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;';
    document.body.prepend(sentinel);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        nav.classList.toggle('is-stuck', !entries[0].isIntersecting);
      }).observe(sentinel);
    }
  }

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var setActive = function (id) {
      navLinks.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
      });
    };

    var visible = {};
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target.id] = entry.isIntersecting;
      });
      // Topmost visible section wins, so the highlight matches what you're reading.
      var current = sections.filter(function (s) { return visible[s.id]; })[0];
      setActive(current ? current.id : '');
    }, { rootMargin: '-30% 0px -55% 0px' });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* ── Footer year ───────────────────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
