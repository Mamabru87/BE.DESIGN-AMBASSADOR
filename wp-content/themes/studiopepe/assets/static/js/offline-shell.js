/*
  Offline shell injector
  Goal: give simple stub pages the same header/menu/footer structure used on the homepage,
  so theme CSS/JS can render a consistent layout across the static offline export.

  - Runs on pages that do NOT already have #header (homepage already does)
  - Wraps existing <main> content into the theme shell
  - Uses relative prefixes so links/assets work from any folder depth
*/

(function () {
  'use strict';

  function ensureTrailingSlashForDirectoryPath() {
    try {
      var p = (window.location.pathname || '');
      if (!p || p.length <= 1) return false;
      if (p.charAt(p.length - 1) === '/') return false;

      var last = p.split('/').pop();
      // If last segment doesn't look like a file, treat as directory and add slash.
      if (last && last.indexOf('.') === -1) {
        window.location.replace(p + '/' + window.location.search + window.location.hash);
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }

  function computePrefix() {
    try {
      var segments = (window.location.pathname || '').split('/').filter(Boolean);
      // If the last segment looks like a file (index.html), treat it as a file and drop it.
      if (segments.length && segments[segments.length - 1].indexOf('.') !== -1) {
        segments.pop();
      }
      var prefix = '';
      for (var i = 0; i < segments.length; i++) prefix += '../';
      return prefix;
    } catch (e) {
      return '';
    }
  }

  function getMainContentHtml() {
    var main = document.querySelector('main');
    if (main) return main.innerHTML;

    // Fall back: take body contents (rare).
    return document.body ? document.body.innerHTML : '';
  }

  function buildShellHtml(prefix, innerMainHtml, opts) {
    var home = prefix || './';

    opts = opts || {};
    var wantsHomeLayout = !!opts.homeLayout;

    // Keep links relative to this page's depth.
    var hrefHome = home;
    var hrefInteriors = home + 'interiors/';
    var hrefExhibitions = home + 'exhibitions/';
    var hrefProducts = home + 'products/';
    var hrefLimited = home + 'limited-editions/';
    var hrefCreative = home + 'creative-direction/';
    var hrefManifesto = home + 'manifesto/';
    var hrefAbout = home + 'about/';
    var hrefJa = home + 'ja/';
    var hrefContacts = home + 'contacts/';
    var hrefPress = home + 'press/';

    var srcSearch = home + 'wp-content/themes/studiopepe/assets/static/images/icons/search.svg';
    var srcArrowFooter = home + 'wp-content/themes/studiopepe/assets/static/images/icons/arrow-footer.svg';

    var outerMainClass = wantsHomeLayout ? 'main-home lg:pt-125 pt-105' : 'lg:pt-125 pt-105';
    var outerWrapClass = wantsHomeLayout
      ? 'flex flex-col w-full min-h-screen text-dark smooth-scroll blur-menu'
      : 'flex flex-col w-full min-h-screen text-dark smooth-scroll blur-menu offline-page-shell';
    var mainInnerHtml = wantsHomeLayout
      ? innerMainHtml
      : ('<div class="lg:px-50 px-20 offline-content">' + innerMainHtml + '</div>');

    return '' +
      '<div id="body-color">' +
      '  <div id="body-hider">' +
      '    <div id="body-bg-top"></div>' +
      '    <header id="header" class="blur-menu fixed lg:h-[90px] h-[55px] lg:px-50 px-20 w-full flex items-center justify-center mix-blend-difference z-4">' +
      '      <div id="logo" class="lg:w-[192px] w-[142px] absolute lg:left-50 left-20">' +
      '        <a href="' + hrefHome + '">' +
      '          <span class="top-navigation__brand">BE.DESIGN AMBASSADOR</span>' +
      '        </a>' +
      '      </div>' +
      '      <div id="menu-top" class="lg:flex hidden uppercase font-medium tracking-[.03em] gap-22 items-center">' +
      '        <div class="menu-mainmenu-container">' +
      '          <ul id="menu-mainmenu" class="menu">' +
      '            <li class="menu-item"><a href="' + hrefInteriors + '">Interiors</a></li>' +
      '            <li class="menu-item"><a href="' + hrefExhibitions + '">Exhibitions</a></li>' +
      '            <li class="menu-item"><a href="' + hrefProducts + '">Products</a></li>' +
      '            <li class="menu-item"><a href="' + hrefLimited + '">Limited Editions</a></li>' +
      '            <li class="menu-item"><a href="' + hrefCreative + '">Creative Direction</a></li>' +
      '            <li class="menu-item"><a href="' + hrefManifesto + '">Manifesto</a></li>' +
      '          </ul>' +
      '        </div>' +
      '        <div id="search" class="mix-blend-difference cursor-pointer"><img alt="search" src="' + srcSearch + '"></div>' +
      '      </div>' +
      '    </header>' +
      '    <div id="search-mobile" class="lg:hidden block mix-blend-difference cursor-pointer"><img alt="search" src="' + srcSearch + '"></div>' +
      '    <div id="burger" class="fixed mix-blend-difference z-10">' +
      '      <div class="burger burger1"></div>' +
      '      <div class="burger burger2"></div>' +
      '      <div class="burger burger3"></div>' +
      '    </div>' +
      '    <div id="menu-container" class="z-5">' +
      '      <div class="lg:hidden block text-24 leading-24 serif pl-20 pt-105">' +
      '        <div class="menu-mainmenu-container">' +
      '          <ul class="menu">' +
      '            <li class="menu-item"><a href="' + hrefInteriors + '">Interiors</a></li>' +
      '            <li class="menu-item"><a href="' + hrefExhibitions + '">Exhibitions</a></li>' +
      '            <li class="menu-item"><a href="' + hrefProducts + '">Products</a></li>' +
      '            <li class="menu-item"><a href="' + hrefLimited + '">Limited Editions</a></li>' +
      '            <li class="menu-item"><a href="' + hrefCreative + '">Creative Direction</a></li>' +
      '            <li class="menu-item"><a href="' + hrefManifesto + '">Manifesto</a></li>' +
      '          </ul>' +
      '        </div>' +
      '      </div>' +
      '      <div class="lg:text-30 text-18 lg:leading-28 leading-24 mix-blend-difference lg:pl-50 pl-20 lg:pt-100 pt-50">' +
      '        <div class="menu-mainmenu2-container">' +
      '          <ul class="menu">' +
      '            <li class="menu-item"><a href="' + hrefAbout + '">About</a></li>' +
      '            <li class="menu-item"><a href="' + hrefJa + '">日本語</a></li>' +
      '            <li class="menu-item"><a href="' + hrefContacts + '">Contacts</a></li>' +
      '            <li class="menu-item"><a href="' + hrefPress + '">Press</a></li>' +
      '          </ul>' +
      '        </div>' +
      '      </div>' +
      '      <div id="socials-menu" class="lg:text-24 lg:leading-24 text-18 leading-15 mix-blend-difference">' +
      '        <p><a href="#" data-offline-blocked="true">Instagram</a></p>' +
      '      </div>' +
      '    </div>' +
      '    <div class="z-4 fixed top-0 left-0 right-0 bottom-0 cursor-pointer" id="menu-closer"></div>' +
      '    <div id="search-container" class="fixed">' +
      '      <div class="lg:pt-135 pt-80 pb-30 lg:px-50 px-20 search-opacity">' +
      '        <div class="flex lg:gap-20 gap-5 lg:text-24 lg:leading-24 text-18 items-center">' +
      '          <div>Search: </div>' +
      '          <div><input id="search-input" type="text" value="" placeholder="Type and press enter"></div>' +
      '        </div>' +
      '      </div>' +
      '      <div id="search-values" class="hidden pt-20 lg:pb-150 pb-100 lg:px-50 px-20 search-opacity"></div>' +
      '    </div>' +
      '    <div class="fixed top-0 left-0 right-0 bottom-0 cursor-pointer" id="search-closer"></div>' +
      '    <div class="' + outerWrapClass + '">' +
      '      <main class="' + outerMainClass + '">' +
      mainInnerHtml +
      '      </main>' +
      '      <footer id="colophon" class="border-top blur-menu">' +
      '        <div class="grid grid-cols-12 gap-x-20 lg:gap-y-50 gap-y-20 lg:px-50 px-20 pt-15 pb-15 mix-blend-difference">' +
      '          <div class="serif text-14 leading-18 lg:col-span-2 col-span-6">' +
      '            <p>BE.DESIGN AMBASSADOR</p>' +
      '            <p>Viale Abruzzi 20<br /> 20131 Milano<br /> (+39) 02 36505993</p>' +
      '          </div>' +
      '          <div class="serif text-14 leading-18 lg:col-span-2 col-span-6">' +
      '            <div class="menu-footer_menu-container">' +
      '              <ul class="menu">' +
      '                <li class="menu-item"><a href="' + hrefInteriors + '">Interiors</a></li>' +
      '                <li class="menu-item"><a href="' + hrefProducts + '">Products</a></li>' +
      '                <li class="menu-item"><a href="' + hrefLimited + '">Limited Editions</a></li>' +
      '                <li class="menu-item"><a href="' + hrefCreative + '">Creative Direction</a></li>' +
      '                <li class="menu-item"><a href="' + hrefManifesto + '">Manifesto</a></li>' +
      '                <li class="menu-item"><a href="' + hrefAbout + '">About</a></li>' +
      '                <li class="menu-item"><a href="' + hrefContacts + '">Contacts</a></li>' +
      '              </ul>' +
      '            </div>' +
      '          </div>' +
      '          <div class="serif text-14 leading-18 lg:col-span-2 col-span-12 socials-footer mt-15 lg:mt-0">' +
      '            <p><a href="#" data-offline-blocked="true">Instagram</a><br />' +
      '              <a href="#" data-offline-blocked="true">Linkedin</a><br />' +
      '              <a href="#" data-offline-blocked="true">Pinterest</a></p>' +
      '          </div>' +
      '          <div class="lg:col-span-4 lg:col-start-9 col-span-12 lets-keep-in">' +
      '            <div class="serif text-14 leading-18 header-newsletter">Subscribe to our Newsletter<br/><br/>' +
      '              <div class="lg:hidden block arrow-newsletter"><img src="' + srcArrowFooter + '"></div>' +
      '            </div>' +
      '            <form method="post" action="' + home + 'newsletter/" id="newsletter" class="text-13">' +
      '              <input type="hidden" name="formId" value="offline">' +
      '              <input class="lg:mt-0 mt-20" name="email" type="email" value="" placeholder="E-mail">' +
      '              <button type="submit" class="mt-10">Submit</button>' +
      '            </form>' +
      '          </div>' +
      '        </div>' +
      '      </footer>' +
      '    </div>' +
      '  </div>' +
      '</div>';
  }

  function injectShell() {
    // Normalize directory URLs without a trailing slash so relative navigation resolves correctly.
    if (ensureTrailingSlashForDirectoryPath()) return;

    // Homepage already has the full shell.
    if (document.getElementById('header')) return;

    var prefix = computePrefix();
    var mainEl = document.querySelector('main');
    var wantsHomeLayout = !!(mainEl && mainEl.classList && mainEl.classList.contains('main-home'));
    var innerMainHtml = getMainContentHtml();

    // Replace the body with the theme shell.
    document.body.innerHTML = buildShellHtml(prefix, innerMainHtml, { homeLayout: wantsHomeLayout });

    // Ensure the body has the key classes theme JS/CSS expects.
    var cls = document.body.className || '';
    if (cls.indexOf('wp-theme-be-design-ambassador') === -1) {
      document.body.className = (cls + ' wp-theme-be-design-ambassador no-js singular no-widgets').trim();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectShell);
  } else {
    injectShell();
  }
})();
