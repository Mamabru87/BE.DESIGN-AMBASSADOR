/*
  Offline image + project population
  - Replaces placeholder images via [data-offline-img]
  - Renders simple project pages via [data-offline-project]

  Data source:
    {prefix}/wp-content/themes/studiopepe/assets/static/data/offline-images.json

  The JSON uses repo-root relative paths (e.g. "foto/pdf_extracted_images/page4_img1.jpeg").
  This script computes the correct prefix from its own <script src>.
*/

(function () {
  'use strict';

  function computePrefix() {
    try {
      var script = document.querySelector('script[src*="offline-images.js"]');
      if (script) {
        var srcAttr = script.getAttribute('src') || '';
        var idx = srcAttr.indexOf('wp-content/');
        if (idx !== -1) return srcAttr.slice(0, idx);
      }

      // Fallback (best-effort)
      var segments = (window.location.pathname || '').split('/').filter(Boolean);
      if (segments.length && segments[segments.length - 1].indexOf('.') !== -1) segments.pop();
      var prefix = '';
      for (var i = 0; i < segments.length; i++) prefix += '../';
      return prefix;
    } catch (e) {
      return '';
    }
  }

  function joinPrefix(prefix, relPath) {
    if (!relPath) return relPath;
    if (/^(https?:)?\/\//i.test(relPath)) return relPath;
    return (prefix || '') + relPath.replace(/^\/+/, '');
  }

  function setImg(img, src, alt) {
    if (!img || !src) return;
    img.loading = img.loading || 'lazy';
    img.decoding = img.decoding || 'async';
    if (alt && (!img.getAttribute('alt') || img.getAttribute('alt') === '')) img.setAttribute('alt', alt);
    img.setAttribute('src', src);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function renderProject(container, prefix, projectKey, project) {
    if (!container || !project) return;

    // Clear existing placeholder content.
    container.innerHTML = '';

    var header = el('div', 'lg:px-50 px-20 mb-40 element');
    header.appendChild(el('div', 'serif lg:text-18 lg:leading-24 mb-10', project.section || ''));
    header.appendChild(el('h1', 'serif lg:text-48 text-30 lg:leading-[1.05] leading-[1.1] mb-10', project.title || projectKey));

    if (project.meta && project.meta.length) {
      header.appendChild(el('div', 'text-12 leading-15 opacity-70 uppercase tracking-[.08em]', project.meta.join(' • ')));
    }

    var heroWrap = el('div', 'lg:px-50 px-20 mb-60 element');
    if (project.hero) {
      var hero = el('img', 'offline-project__hero');
      setImg(hero, joinPrefix(prefix, project.hero), project.title || '');
      heroWrap.appendChild(hero);
    }

    var gridWrap = el('div', 'lg:px-50 px-20 mb-150 element');
    var grid = el('div', 'offline-project__grid');

    var imgs = Array.isArray(project.images) ? project.images : [];
    for (var i = 0; i < imgs.length; i++) {
      var fig = el('figure', 'offline-project__item');
      var im = el('img', 'offline-project__img');
      setImg(im, joinPrefix(prefix, imgs[i]), (project.title ? (project.title + ' — ' + (i + 1)) : ''));
      fig.appendChild(im);
      if (project.captions && project.captions[i]) {
        fig.appendChild(el('figcaption', 'text-12 leading-15 mt-8 opacity-70', project.captions[i]));
      }
      grid.appendChild(fig);
    }

    gridWrap.appendChild(grid);

    // Back link
    if (project.backHref && project.backLabel) {
      var back = el('div', 'lg:px-50 px-20 mb-80 element');
      var a = document.createElement('a');
      a.href = joinPrefix(prefix, project.backHref);
      a.textContent = project.backLabel;
      a.className = 'text-14 underline';
      back.appendChild(a);
      container.appendChild(back);
    }

    container.appendChild(header);
    container.appendChild(heroWrap);
    container.appendChild(gridWrap);
  }

  function applyAll(data) {
    var prefix = computePrefix();
    var slots = (data && data.slots) ? data.slots : {};
    var projects = (data && data.projects) ? data.projects : {};

    // Replace individual images.
    var imgs = document.querySelectorAll('[data-offline-img]');
    for (var i = 0; i < imgs.length; i++) {
      var key = imgs[i].getAttribute('data-offline-img');
      if (!key) continue;
      if (!slots[key]) continue;
      setImg(imgs[i], joinPrefix(prefix, slots[key]), imgs[i].getAttribute('alt') || '');
    }

    // Render project pages.
    var projectHosts = document.querySelectorAll('[data-offline-project]');
    for (var j = 0; j < projectHosts.length; j++) {
      var pKey = projectHosts[j].getAttribute('data-offline-project');
      if (!pKey || !projects[pKey]) continue;
      renderProject(projectHosts[j], prefix, pKey, projects[pKey]);
    }
  }

  function init() {
    var prefix = computePrefix();
    var url = joinPrefix(prefix, 'wp-content/themes/studiopepe/assets/static/data/offline-images.json');

    // If fetch is not available (older browsers), do nothing.
    if (!window.fetch) return;

    fetch(url, { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(applyAll)
      .catch(function () {
        // Silent fail: page still works with placeholders.
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
