/*
  Offline blocker
  - Prevents any navigation to external URLs (http/https, protocol-relative //)
  - Rewrites remote image URLs to a local placeholder

  This keeps the exported site usable completely offline.
*/

(function () {
  'use strict';

  var PLACEHOLDER = '/wp-content/themes/studiopepe/assets/static/images/offline-placeholder.svg';
  var OFFICIAL_HOSTS = null;

  function addHostVariants(map, host) {
    if (!host) return;
    var h = (host || '').toLowerCase();
    if (!h) return;
    map[h] = true;
    if (h.indexOf('www.') === 0) {
      map[h.substring(4)] = true;
    } else {
      map['www.' + h] = true;
    }
  }

  function toFirstExternalUrl(val) {
    if (!val) return null;
    // srcset-like values can contain multiple URLs separated by commas.
    var first = String(val).split(',')[0] || '';
    var trimmed = first.trim().split(/\s+/)[0];
    return trimmed || null;
  }

  function computeOfficialHosts() {
    var hosts = {};

    // Always treat the current host (when present) as official.
    addHostVariants(hosts, (window.location.hostname || '').toLowerCase());

    // Also infer an “official” host from the most common external URLs found in the document.
    // This keeps offline rewriting working even if the exported HTML contains absolute links.
    var counts = {};
    var attrs = ['href', 'src', 'data-src', 'data-flickity-lazyload', 'data-srcset', 'srcset', 'action'];
    for (var a = 0; a < attrs.length; a++) {
      var attr = attrs[a];
      var nodes = document.querySelectorAll('[' + attr + ']');
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        var raw = el.getAttribute(attr);
        if (!raw) continue;
        var candidate = toFirstExternalUrl(raw);
        if (!candidate) continue;
        if (!isExternalUrl(candidate)) continue;

        var u = toAbsoluteUrl(candidate);
        if (!u) continue;
        var host = (u.hostname || '').toLowerCase();
        if (!host) continue;
        counts[host] = (counts[host] || 0) + 1;
      }
    }

    var topHost = null;
    var topCount = 0;
    for (var h in counts) {
      if (!Object.prototype.hasOwnProperty.call(counts, h)) continue;
      if (counts[h] > topCount) {
        topHost = h;
        topCount = counts[h];
      }
    }
    addHostVariants(hosts, topHost);

    return hosts;
  }

  function getOfficialHosts() {
    if (OFFICIAL_HOSTS) return OFFICIAL_HOSTS;
    OFFICIAL_HOSTS = computeOfficialHosts();
    return OFFICIAL_HOSTS;
  }

  function isExternalUrl(url) {
    if (!url) return false;
    // protocol-relative (//example.com)
    if (url.indexOf('//') === 0) return true;
    return /^https?:\/\//i.test(url);
  }

  function toAbsoluteUrl(url) {
    if (!url) return null;
    try {
      // Support protocol-relative URLs.
      if (url.indexOf('//') === 0) {
        return new URL(window.location.protocol + url);
      }
      return new URL(url, window.location.href);
    } catch (e) {
      return null;
    }
  }

  function isOfficialHost(url) {
    var u = toAbsoluteUrl(url);
    if (!u) return false;
    var host = (u.hostname || '').toLowerCase();
    return !!getOfficialHosts()[host];
  }

  function toLocalPath(url) {
    var u = toAbsoluteUrl(url);
    if (!u) return null;
    var host = (u.hostname || '').toLowerCase();
    if (!getOfficialHosts()[host]) return null;
    return (u.pathname || '/') + (u.search || '') + (u.hash || '');
  }

  function blockExternalClicks(ev) {
    var target = ev.target;
    if (!target) return;

    var a = target.closest ? target.closest('a') : null;
    if (!a) return;

    var href = a.getAttribute('href') || '';
    // Allow in-page anchors and local relative paths.
    if (!href || href === '#' || href.indexOf('#') === 0) return;

    if (isExternalUrl(href)) {
      var localPath = toLocalPath(href);
      if (localPath) {
        // Same-site link exported as absolute; rewrite to local and allow.
        a.setAttribute('data-original-href', href);
        a.setAttribute('href', localPath);
        a.removeAttribute('data-offline-blocked');
        return;
      }

      ev.preventDefault();
      ev.stopPropagation();
      a.setAttribute('data-offline-blocked', 'true');
    }
  }

  function rewriteExternalHrefAttributes() {
    // Remove external URLs from obvious attributes.
    var hrefNodes = document.querySelectorAll('[href]');
    for (var i = 0; i < hrefNodes.length; i++) {
      var el = hrefNodes[i];
      var href = el.getAttribute('href');
      if (isExternalUrl(href)) {
        var localHref = toLocalPath(href);
        el.setAttribute('data-original-href', href);
        if (localHref) {
          el.setAttribute('href', localHref);
          el.removeAttribute('data-offline-blocked');
        } else {
          el.setAttribute('href', '#');
          el.setAttribute('data-offline-blocked', 'true');
        }
      }
    }

    var srcNodes = document.querySelectorAll('[src]');
    for (var j = 0; j < srcNodes.length; j++) {
      var el2 = srcNodes[j];
      var src = el2.getAttribute('src');
      if (isExternalUrl(src)) {
        el2.setAttribute('data-original-src', src);
        var localSrc = toLocalPath(src);
        // For images, prefer local path (if it exists) and fall back to placeholder.
        if (el2.tagName && el2.tagName.toLowerCase() === 'img') {
          if (localSrc) {
            el2.setAttribute('src', localSrc);
          } else {
            el2.setAttribute('src', PLACEHOLDER);
          }
          // Always fall back to placeholder if the local asset is missing.
          el2.addEventListener('error', function onImgError() {
            try {
              if (this && this.getAttribute('src') !== PLACEHOLDER) {
                this.setAttribute('src', PLACEHOLDER);
              }
            } catch (e) {
              // ignore
            }
          }, { once: true });
        } else {
          // For other tags, strip to avoid any accidental fetch.
          el2.removeAttribute('src');
        }
      }
    }

    // Handle common lazyload attributes used in the exported homepage.
    var lazyAttrs = ['data-src', 'data-srcset', 'data-flickity-lazyload'];
    for (var k = 0; k < lazyAttrs.length; k++) {
      var attr = lazyAttrs[k];
      var nodes = document.querySelectorAll('[' + attr + ']');
      for (var n = 0; n < nodes.length; n++) {
        var el3 = nodes[n];
        var val = el3.getAttribute(attr);
        if (!val) continue;

        // srcset may contain multiple URLs; always strip it to avoid remote references.
        if (attr === 'data-srcset' && /https?:\/\//i.test(val)) {
          el3.setAttribute('data-original-' + attr, val);
          el3.removeAttribute(attr);
          continue;
        }

        if (isExternalUrl(val)) {
          var localVal = toLocalPath(val);
          el3.setAttribute('data-original-' + attr, val);
          if (localVal) {
            el3.setAttribute(attr, localVal);
          } else {
            el3.setAttribute(attr, PLACEHOLDER);
          }
        }
      }
    }
  }

  function rewriteExternalFormActions() {
    var forms = document.querySelectorAll('form[action]');
    for (var i = 0; i < forms.length; i++) {
      var f = forms[i];
      var action = f.getAttribute('action') || '';
      if (!isExternalUrl(action)) continue;

      var localAction = toLocalPath(action);
      f.setAttribute('data-original-action', action);

      if (localAction) {
        f.setAttribute('action', localAction);
        continue;
      }

      // Fully external form action (e.g. newsletter service): keep offline by preventing submit.
      f.setAttribute('action', '#');
      f.setAttribute('data-offline-blocked', 'true');
    }

    var newsletter = document.getElementById('newsletter');
    if (newsletter) {
      newsletter.addEventListener('submit', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        // Redirect to a local placeholder page instead of sending any request.
        window.location.href = '/newsletter/';
      });
    }
  }

  function removeExternalResourcesFromHead() {
    // Strip external <script src="https://..."> and <link href="https://..."> to avoid any accidental fetch.
    var headScripts = document.querySelectorAll('head script[src]');
    for (var i = 0; i < headScripts.length; i++) {
      var s = headScripts[i];
      var src = s.getAttribute('src');
      if (isExternalUrl(src)) s.parentNode.removeChild(s);
    }

    var headLinks = document.querySelectorAll('head link[href]');
    for (var j = 0; j < headLinks.length; j++) {
      var l = headLinks[j];
      var href = l.getAttribute('href');
      if (isExternalUrl(href)) l.parentNode.removeChild(l);
    }
  }

  function addOfflineStyles() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = '' +
      'a[data-offline-blocked="true"] {' +
      '  cursor: not-allowed;' +
      '  text-decoration: line-through;' +
      '}' +
      'a[data-offline-blocked="true"]:hover {' +
      '  text-decoration: line-through;' +
      '}';
    document.head.appendChild(style);
  }

  function initOfflineGuards() {
    removeExternalResourcesFromHead();
    rewriteExternalHrefAttributes();
    rewriteExternalFormActions();
    addOfflineStyles();
  }

  document.addEventListener('click', blockExternalClicks, true);

  // If this script is loaded with `defer`, the DOM is already parsed when it runs.
  // Apply rewrites immediately so other deferred scripts don't get a chance to
  // initialize remote lazy-loading before we neutralize URLs.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOfflineGuards);
  } else {
    initOfflineGuards();
  }
})();
