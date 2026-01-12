/*
  Offline UI helpers: filter pills + simple client-side filtering for section galleries.

  Goals (offline build):
  - Make the "Category" pill open a lightweight dropdown.
  - Make "Selected / All" pills toggle and optionally filter gallery items.

  Markup conventions (added to section index pages):
  - Container: .offline-section
  - Gallery items: .gallery .scheda
      - data-category="..." (optional)
      - data-selected="true" (optional)
*/

(function () {
  'use strict';

  function uniq(arr) {
    var out = [];
    for (var i = 0; i < arr.length; i++) {
      if (out.indexOf(arr[i]) === -1) out.push(arr[i]);
    }
    return out;
  }

  function closest(el, selector) {
    while (el && el.nodeType === 1) {
      if (el.matches(selector)) return el;
      el = el.parentElement;
    }
    return null;
  }

  function refreshFlickity(galleryEl) {
    try {
      if (!window.jQuery) return;
      var $g = window.jQuery(galleryEl);
      // If Flickity isn't attached yet, this may throw.
      if ($g && typeof $g.flickity === 'function' && $g.data('flickity')) {
        $g.flickity('reloadCells');
        $g.flickity('resize');
        $g.flickity('select', 0);
      }
    } catch (e) {
      // Silent on purpose for offline robustness.
    }
  }

  function getAllCellsForGallery(galleryEl) {
    if (!galleryEl) return [];
    if (galleryEl.__offlineAllCells && galleryEl.__offlineAllCells.length) return galleryEl.__offlineAllCells;
    var cells = Array.prototype.slice.call(galleryEl.querySelectorAll('.scheda'));
    // Store original order for stable filtering.
    galleryEl.__offlineAllCells = cells;
    return cells;
  }

  function rebuildFlickityCells(galleryEl, desiredCells) {
    try {
      if (!window.jQuery) return false;
      var $g = window.jQuery(galleryEl);
      if (!$g || typeof $g.flickity !== 'function') return false;
      var flkty = $g.data('flickity');
      if (!flkty) return false;

      var current = [];
      if (flkty.cells && flkty.cells.length) {
        for (var i = 0; i < flkty.cells.length; i++) {
          if (flkty.cells[i] && flkty.cells[i].element) current.push(flkty.cells[i].element);
        }
      }

      // Flickity gets unhappy with 0 cells; keep at least 1.
      if (!desiredCells || !desiredCells.length) {
        desiredCells = getAllCellsForGallery(galleryEl);
      }

      if (current.length) $g.flickity('remove', current);
      if (desiredCells.length) $g.flickity('append', desiredCells);

      $g.flickity('reloadCells');
      $g.flickity('resize');
      $g.flickity('select', 0);
      return true;
    } catch (e) {
      return false;
    }
  }

  function applyFilters(sectionEl) {
    var mode = (sectionEl.getAttribute('data-filter-mode') || 'all').toLowerCase();
    var category = sectionEl.getAttribute('data-filter-category') || 'All';

    var galleries = Array.prototype.slice.call(sectionEl.querySelectorAll('.gallery'));
    for (var g = 0; g < galleries.length; g++) {
      var galleryEl = galleries[g];
      var allCells = getAllCellsForGallery(galleryEl);
      var desired = [];

      for (var i = 0; i < allCells.length; i++) {
        var it = allCells[i];
        var itCat = it.getAttribute('data-category') || 'All';
        var itSel = (it.getAttribute('data-selected') || '').toLowerCase() === 'true';

        var show = true;
        if (mode === 'selected' && !itSel) show = false;
        if (category && category !== 'All' && itCat !== category) show = false;

        it.classList.toggle('offline-hidden', !show);
        if (show) desired.push(it);
      }

      // Prefer rebuilding Flickity so hidden slides don't remain navigable.
      if (!rebuildFlickityCells(galleryEl, desired)) {
        refreshFlickity(galleryEl);
      }
    }
  }

  function initCategoryDropdown(sectionEl, filterbarEl) {
    var btn = filterbarEl.querySelector('[data-offline-filter="category"]');
    if (!btn) return;

    var menu = document.createElement('div');
    menu.className = 'offline-dropdown';
    menu.innerHTML = '<div class="offline-dropdown__menu" role="menu" aria-label="Category"></div>';

    var menuInner = menu.firstChild;

    function buildOptions() {
      var cats = [];
      var items = Array.prototype.slice.call(sectionEl.querySelectorAll('.gallery .scheda[data-category]'));
      for (var i = 0; i < items.length; i++) {
        var c = items[i].getAttribute('data-category');
        if (c) cats.push(c);
      }
      cats = uniq(cats);
      cats.unshift('All');

      menuInner.innerHTML = '';
      for (var k = 0; k < cats.length; k++) {
        (function (cat) {
          var opt = document.createElement('button');
          opt.type = 'button';
          opt.className = 'offline-dropdown__item';
          opt.textContent = cat;
          opt.addEventListener('click', function () {
            sectionEl.setAttribute('data-filter-category', cat);
            btn.textContent = cat === 'All' ? 'Category ↓' : ('Category: ' + cat + ' ↓');
            menu.classList.remove('is-open');
            setExpanded(false);
            applyFilters(sectionEl);
          });
          menuInner.appendChild(opt);
        })(cats[k]);
      }
    }

    buildOptions();
    filterbarEl.appendChild(menu);

    // Sync initial label with current section state.
    (function () {
      var current = sectionEl.getAttribute('data-filter-category') || 'All';
      btn.textContent = current === 'All' ? 'Category ↓' : ('Category: ' + current + ' ↓');
    })();

    function setExpanded(isOpen) {
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    btn.addEventListener('click', function () {
      buildOptions();
      menu.classList.toggle('is-open');
      setExpanded(menu.classList.contains('is-open'));
    });

    // Close on click outside.
    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (e.target === btn || menu.contains(e.target)) return;
      menu.classList.remove('is-open');
      setExpanded(false);
    });
  }

  function initModePills(sectionEl, filterbarEl) {
    var btnSelected = filterbarEl.querySelector('[data-offline-filter="mode"][data-mode="selected"]');
    var btnAll = filterbarEl.querySelector('[data-offline-filter="mode"][data-mode="all"]');
    if (!btnSelected || !btnAll) return;

    function setMode(mode) {
      sectionEl.setAttribute('data-filter-mode', mode);
      btnSelected.classList.toggle('offline-pill--active', mode === 'selected');
      btnAll.classList.toggle('offline-pill--active', mode === 'all');
      btnSelected.setAttribute('aria-pressed', mode === 'selected' ? 'true' : 'false');
      btnAll.setAttribute('aria-pressed', mode === 'all' ? 'true' : 'false');
      applyFilters(sectionEl);
    }

    btnSelected.addEventListener('click', function () { setMode('selected'); });
    btnAll.addEventListener('click', function () { setMode('all'); });

    // initial
    setMode((sectionEl.getAttribute('data-filter-mode') || 'selected').toLowerCase());
  }

  function init() {
    var filterbars = Array.prototype.slice.call(document.querySelectorAll('.offline-filterbar'));
    for (var i = 0; i < filterbars.length; i++) {
      var bar = filterbars[i];
      var section = closest(bar, '.offline-section');
      if (!section) continue;

      // Defaults
      if (!section.getAttribute('data-filter-mode')) section.setAttribute('data-filter-mode', 'selected');
      if (!section.getAttribute('data-filter-category')) section.setAttribute('data-filter-category', 'All');

      initCategoryDropdown(section, bar);
      initModePills(section, bar);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
