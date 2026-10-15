/**
 * Shared behaviour for every page: the collapsing nav, and whichever
 * page-specific module matches document.body.dataset.page ("home",
 * "project", "about"). Reads all content from window.SITE_DATA
 * (data/works.js), which must be loaded before this file.
 */
(function () {
  "use strict";

  var DATA = window.SITE_DATA;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Paused (not removed): the connecting thread between consecutive
  // works' sketches wasn't reading well yet. Flip to true to bring it
  // back — buildConnector/layoutConnectors/svgPointToScreen below are
  // untouched and still do exactly what they did before.
  var CONNECTORS_ENABLED = false;

  function start() {
    initNav();
    var page = document.body.dataset.page;
    // On the root element, where the view-transition pseudo-elements
    // live: the CSS needs to know which of a pair's two snapshots is the
    // project page's (the bigger, sharper one) to keep on screen.
    document.documentElement.dataset.page = page;
    // Set by a sideways swipe just before it navigates, and consumed
    // here: this arrival slides in from the side instead of lifting.
    var slide = readSlide();
    if (slide) document.documentElement.dataset.slide = slide;
    if (page === "home") initHome();
    if (page === "project") initProject();
    if (page === "about") initAbout();
  }

  /* As early as possible rather than on DOMContentLoaded: a page can get
     its first render — and with it the view transition's snapshot of
     this document — before the parser reaches the end of the body, and a
     feed that doesn't exist yet has nothing to hand the incoming text
     back to. This script tag sits after the feed's container, so the
     markup it needs is already there. */
  if (document.body) {
    start();
  } else {
    document.addEventListener("DOMContentLoaded", start);
  }

  /* -------------------------------------------------------------------
     Nav: collapses into a dot after a small scroll, expands on
     hover (desktop) or tap (mobile/touch).
     ----------------------------------------------------------------- */
  function initNav() {
    var nav = document.querySelector(".site-nav");
    if (!nav) return;
    var dot = nav.querySelector(".dot");
    var threshold = 72;
    // Where the page stood when the menu was tapped open, so scrolling
    // away can close it again. Null whenever the menu isn't open.
    var openedAt = null;

    function collapse() {
      nav.classList.remove("expanded");
      openedAt = null;
    }

    function onScroll() {
      var collapsed = window.scrollY > threshold;
      nav.classList.toggle("collapsed", collapsed);
      if (!collapsed) {
        collapse();
        return;
      }
      // Scrolling with the menu open closes it — on a touch screen it
      // otherwise sits over the work you're scrolling to, with no way
      // back but tapping exactly beside it. The few pixels of slack are
      // for the scroll a tap itself often nudges out of the page, which
      // would otherwise shut the menu the instant it opened.
      if (openedAt !== null && Math.abs(window.scrollY - openedAt) > 8) {
        collapse();
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (dot) {
      onTap(dot, function () {
        var open = nav.classList.toggle("expanded");
        openedAt = open ? window.scrollY : null;
      });
    }

    document.addEventListener("click", function (e) {
      if (nav.classList.contains("expanded") && !nav.contains(e.target)) {
        collapse();
      }
    });

    var current = document.body.dataset.page;
    nav.querySelectorAll("a[data-nav]").forEach(function (a) {
      if (a.dataset.nav === current || (current === "project" && a.dataset.nav === "work")) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* -------------------------------------------------------------------
     Home page: builds the works feed, and animates each sketch as it
     scrolls into view.
     ----------------------------------------------------------------- */
  function initHome() {
    var feed = document.getElementById("work");
    if (!feed || !DATA) return;

    var nameEl = document.querySelector(".hero .name");
    if (nameEl) nameEl.textContent = DATA.person.name;
    var tagEl = document.querySelector(".hero .tagline");
    if (tagEl) tagEl.textContent = DATA.person.tagline;

    var sizes = ["large", "medium", "small"];
    var sizePercent = { large: 72, medium: 58, small: 46 };
    // How far each work sits from the left edge, as a fraction of the
    // space left over after its own width — using close to the full
    // 0..1 range so works actually spread from edge to edge, but in a
    // deliberately uneven order (not a simple left/right/left/right
    // alternation), so the amount of drift varies from one work to the
    // next instead of ping-ponging between two fixed positions.
    var indentPattern = [0.04, 0.88, 0.30, 0.96, 0.54, 0.74, 0.14, 0.62, 0.40, 0.84];
    var entries = [];
    var connectors = [];
    var prevSvg = null;
    var prevExit = null;
    var lifts = {};

    DATA.works.forEach(function (work, i) {
      var size = work.size || sizes[i % sizes.length];
      var pendingConnector = null;

      if (CONNECTORS_ENABLED && prevSvg) {
        pendingConnector = buildConnector(prevSvg, prevExit);
        feed.appendChild(pendingConnector.el);
      }

      var article = document.createElement("article");
      article.className = "work-entry";
      article.dataset.size = size;
      var indentFrac = indentPattern[i % indentPattern.length];
      var indentPct = (100 - (sizePercent[size] || 58)) * indentFrac;
      article.style.setProperty("--indent", indentPct.toFixed(1) + "%");

      var card = document.createElement("div");
      card.className = "work-card";

      var link = document.createElement("a");
      link.className = "work-link";
      link.href = "project.html?id=" + encodeURIComponent(work.id);
      link.setAttribute("aria-label", work.title + ", " + work.year);

      var visual = document.createElement("div");
      visual.className = "work-visual";

      var svgNS = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("class", "sketch-svg");
      svg.setAttribute("viewBox", work.sketch.viewBox);
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      var path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", work.sketch.path);
      svg.appendChild(path);

      var previewSrc = (work.images && (work.images.preview || work.images.medium)) || "";

      // The work's own image, fading in behind the sketch so the drawn
      // line sits on top of the photo. It goes inside the same box, so
      // nothing below it on the page moves when it appears.
      if (previewSrc) {
        var preview = document.createElement("div");
        preview.className = "work-preview";
        var previewImg = document.createElement("img");
        previewImg.alt = "";
        previewImg.loading = "lazy";
        // If the image 404s (missing/not-yet-uploaded), drop the preview
        // rather than revealing a broken-image icon.
        previewImg.addEventListener("error", function () {
          preview.remove();
        });
        previewImg.src = previewSrc;
        preview.appendChild(previewImg);
        visual.appendChild(preview);
      }

      visual.appendChild(svg);

      var meta = document.createElement("div");
      meta.className = "work-meta";
      var titleEl = textEl("span", "work-title", work.title);
      // Same wording and separator as the project page's meta line: the
      // two ends of the lift have to be the same text, set the same way.
      var tagsEl = textEl("span", "work-tags", work.year + " — " + work.category);
      meta.appendChild(titleEl);
      meta.appendChild(tagsEl);

      var caption = document.createElement("div");
      caption.className = "work-caption";
      var descEl = textEl("div", "tt-desc", work.blurb);
      caption.appendChild(descEl);

      // The four pieces that travel to (and back from) the project page.
      // They are named only while that work is the one being opened or
      // returned to — see liftCard below.
      lifts[work.id] = {
        entry: article,
        visual: visual,
        title: titleEl,
        meta: tagsEl,
        blurb: descEl
      };

      // Anchor for coming back to this exact card rather than the top of
      // the feed, used by the project page's back links.
      article.id = "w-" + work.id;

      tapToOpen(link);
      link.appendChild(visual);
      card.appendChild(link);
      card.appendChild(meta);
      card.appendChild(caption);
      article.appendChild(card);
      feed.appendChild(article);

      if (pendingConnector) {
        pendingConnector.toSvg = svg;
        pendingConnector.toPoint = work.sketch.entry;
        connectors.push(pendingConnector);
      }
      prevSvg = svg;
      prevExit = work.sketch.exit;

      entries.push({ el: visual, path: path, progress: 0, drawn: false });
    });

    if (CONNECTORS_ENABLED) {
      layoutConnectors(feed, connectors);
      window.addEventListener("resize", function () { layoutConnectors(feed, connectors); }, { passive: true });
    }

    setupSketchDraw(entries.concat(connectors.map(function (c) { return c.entry; })));

    /* Hands the four travelling names to one work's card and takes them
       off every other one. The names are fixed rather than built from
       the work's id (which is what they were at first) so that the CSS
       can address each one by name — a rule per work can't be written
       ahead of time, and without rules of their own the text pairs got
       the browser's default crossfade, which blew the card's small grey
       title up to the size of the project page's heading and faded that
       ghost across the whole trip. */
    function liftCard(id) {
      Object.keys(lifts).forEach(function (key) {
        var card = lifts[key];
        ["visual", "title", "meta", "blurb"].forEach(function (part) {
          card[part].style.viewTransitionName = key === id ? "lift-" + part : "";
        });
      });
      return !!lifts[id];
    }

    /* Leaving for a work: name that card's pieces, so the browser has
       something to carry from here to the project page. */
    window.addEventListener("pageswap", function (e) {
      var going = e.activation && e.activation.entry && e.activation.entry.url;
      var id = workIdFromUrl(going);
      if (id) liftCard(id);
    });

    /* Arriving from a work — by its Back link, or by the phone's own
       back gesture, which is a history traversal. Name the same pieces
       again so the project page's text and photo land back on the card
       they came from, and make sure that card is on screen, since the
       transition animates to wherever it actually is.

       Done twice over, because the two ways in arrive differently: a
       fresh load may have rendered (and so been snapshotted) before
       `pagereveal` could reach a listener added down here, while a
       restore from the back/forward cache doesn't run this script again
       at all and has nothing but that event. Naming a card that is
       already named costs nothing. */
    function restoreFromWork() {
      var id = workIdFromUrl(cameFrom());
      if (!id || !liftCard(id)) return;
      bringIntoView(lifts[id].entry);
    }

    restoreFromWork();
    window.addEventListener("pagereveal", restoreFromWork);

    tapLinks(".site-nav a, .site-footer a");
  }

  function textEl(tag, className, text) {
    var el = document.createElement(tag);
    el.className = className;
    el.textContent = text;
    return el;
  }

  /* Which work a project.html URL points at, or null for anything else. */
  function workIdFromUrl(url) {
    if (!url) return null;
    try {
      var parsed = new URL(url, window.location.href);
      if (parsed.pathname.indexOf("project.html") === -1) return null;
      return parsed.searchParams.get("id");
    } catch (e) {
      return null;
    }
  }

  /* Where this page was arrived from. The Navigation API knows it for
     traversals too, which document.referrer doesn't, so it's preferred
     where it exists. */
  function cameFrom() {
    var nav = window.navigation;
    if (nav && nav.activation && nav.activation.from) return nav.activation.from.url;
    return document.referrer || null;
  }

  function bringIntoView(el) {
    var rect = el.getBoundingClientRect();
    var margin = Math.min(80, window.innerHeight * 0.1);
    var inView = rect.top >= -margin && rect.bottom <= window.innerHeight + margin;
    // A traversal restores the scroll position on its own, and the back
    // link lands on the card's own anchor — in both cases the card is
    // already where the reader left it, and moving the page would be the
    // surprise. This is for everything else.
    if (!inView) el.scrollIntoView({ block: "center" });
  }

  /* On a touch screen the first tap kept being swallowed — the link
     showed a press and nothing else, and it took a second tap to go
     anywhere. Rather than keep guessing which hover heuristic eats it,
     a tap that lands and lifts in the same spot follows the link
     outright. Mouse pointers are left alone: the link's own click still
     handles those. Every link that navigates within the site goes
     through this, not just the cards — Back to work and the
     Previous/Next pair at the foot of a project had it too. */
  function tapLinks(selector) {
    document.querySelectorAll(selector).forEach(tapToOpen);
  }

  /* The touch half of this: a tap that lands and lifts in one spot runs
     the action straight from the pointer events, without waiting for a
     click that may never come. A click is withheld whenever the browser
     decides the touch meant something else — settling a hover state, or
     stopping the page's momentum, which is why this bit anything tapped
     just after a scroll: a card, the menu dot, Back to work, the
     Previous/Next pair. The click listener still serves mouse and
     keyboard, and ignores the click the browser may send after a tap
     this already handled. */
  function onTap(el, run) {
    var start = null;
    var ranAt = 0;

    el.addEventListener("pointerdown", function (e) {
      start = e.pointerType === "mouse" ? null : { x: e.clientX, y: e.clientY };
    });
    // The browser took the gesture over to scroll with it: not a tap.
    el.addEventListener("pointercancel", function () { start = null; });

    el.addEventListener("pointerup", function (e) {
      if (!start) return;
      var slid = Math.hypot(e.clientX - start.x, e.clientY - start.y) > 10;
      start = null;
      if (slid) return;
      ranAt = Date.now();
      run(e);
    });

    el.addEventListener("click", function (e) {
      if (Date.now() - ranAt < 700) {
        e.preventDefault();
        return;
      }
      run(e);
    });
  }

  function tapToOpen(link) {
    // New-tab links and mailto:/tel: are the browser's business.
    if (link.target && link.target !== "_self") return;
    if (link.protocol !== "http:" && link.protocol !== "https:") return;
    onTap(link, function (e) {
      e.preventDefault();
      window.location.href = link.href;
    });
  }

  /* Translates a point in an SVG's own viewBox coordinates (e.g. a
     sketch's entry/exit point) into actual on-screen pixels, accounting
     for however that SVG's viewBox is scaled/letterboxed into its box —
     so a connector can start and end exactly where a sketch's line
     really does, not at an assumed edge or center of its box. */
  function svgPointToScreen(svg, point) {
    var ctm = svg.getScreenCTM();
    if (!ctm) return null;
    var pt = svg.createSVGPoint();
    pt.x = point[0];
    pt.y = point[1];
    var screenPt = pt.matrixTransform(ctm);
    return { x: screenPt.x, y: screenPt.y };
  }

  /* Builds one connector between two consecutive works: an SVG whose
     path is computed once both works are laid out, from the exact exit
     point of the work above to the exact entry point of the work below. */
  function buildConnector(fromSvg, fromPoint) {
    var el = document.createElement("div");
    el.className = "work-connector";
    el.setAttribute("aria-hidden", "true");

    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("preserveAspectRatio", "none");
    var path = document.createElementNS(svgNS, "path");
    svg.appendChild(path);
    el.appendChild(svg);

    return {
      el: el,
      svg: svg,
      path: path,
      fromSvg: fromSvg,
      fromPoint: fromPoint,
      toSvg: null,
      toPoint: null,
      entry: { el: el, path: path, progress: 0, drawn: false }
    };
  }

  /* Points each connector from the work above's exact exit point to the
     work below's exact entry point, measured on-screen (via each
     sketch's own coordinate transform) rather than assumed — works sit
     at varying indents and sizes, not stacked directly, so an assumed
     box edge or center would miss. */
  function layoutConnectors(feed, connectors) {
    var feedBox = feed.getBoundingClientRect();

    connectors.forEach(function (c) {
      var from = svgPointToScreen(c.fromSvg, c.fromPoint);
      var to = svgPointToScreen(c.toSvg, c.toPoint);
      if (!from || !to) return;

      var top = Math.min(from.y, to.y) - feedBox.top;
      var bottom = Math.max(from.y, to.y) - feedBox.top;
      var height = Math.max(1, bottom - top);
      var w = feedBox.width || 1;
      var x1 = from.x - feedBox.left;
      var x2 = to.x - feedBox.left;
      var y1 = from.y - feedBox.top - top;
      var y2 = to.y - feedBox.top - top;
      var midY = (y1 + y2) / 2;

      c.el.style.top = top + "px";
      c.el.style.height = height + "px";
      c.svg.setAttribute("viewBox", "0 0 " + w + " " + height);
      c.path.setAttribute(
        "d",
        "M" + x1 + "," + y1 + " C" + x1 + "," + midY + " " + x2 + "," + midY + " " + x2 + "," + y2
      );

      var len = strokeLength(c.path);
      c.entry.length = len;
      c.path.style.strokeDasharray = len;
      if (!c.entry.drawn) c.path.style.strokeDashoffset = reduceMotion ? 0 : len;
    });
  }

  /* How long a path's stroke actually is on screen. These lines are
     drawn with vector-effect: non-scaling-stroke, which builds the
     stroke — dashes and all — in screen pixels, while getTotalLength()
     reports the path in its own viewBox units (400 wide here). The two
     only agree when the sketch happens to render at exactly 1:1. A large
     card is 640px wide, i.e. 1.6x its viewBox, so its stroke is 1.6x
     longer than the dash we were handing it: the single gap that is
     meant to sit past the end of the line landed inside the sketch
     instead, splitting it into two pieces that were never both drawn.
     Measuring in the stroke's own space keeps it one dash and one gap at
     any card width. */
  function strokeLength(path) {
    var len = path.getTotalLength();
    var ctm = path.getScreenCTM();
    if (!ctm) return len;
    var scale = Math.sqrt(Math.abs(ctm.a * ctm.d - ctm.b * ctm.c));
    return scale ? len * scale : len;
  }

  function setupSketchDraw(entries) {
    // Re-measured whenever the layout can have changed (resize), since
    // card widths are responsive and the scale above moves with them.
    function measure() {
      entries.forEach(function (entry) {
        entry.length = strokeLength(entry.path);
        entry.path.style.strokeDasharray = entry.length;
        entry.path.style.strokeDashoffset = reduceMotion
          ? 0
          : entry.length * (1 - entry.progress);
      });
    }
    measure();

    if (reduceMotion) {
      entries.forEach(function (e) { e.drawn = true; });
      return;
    }

    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      // Progress 0 is the moment a work becomes FULLY visible (its top
      // edge reaches the bottom of the viewport minus its own height —
      // i.e. the whole thing has just finished entering), and progress 1
      // is the moment its top edge reaches the top of the viewport —
      // i.e. the instant before any part of it starts exiting the screen.
      // Drawing is spread across the entire time the work sits fully
      // inside the viewport, so it's never still mid-draw while part of
      // it has already scrolled out of view (which looked like one part
      // of the sketch vanishing while another part was still appearing).
      //
      // On a short viewport, a tall/large work may never be fully
      // visible at once (vh - rect.height goes to zero or negative) — a
      // previous version fell back to a different formula for that case
      // (finishing exactly as the work fully exits), which reintroduced
      // the same "still mid-draw while part of it is already gone" bug,
      // just only for the larger sizes on a short enough window. Instead
      // the draw ends at whichever scroll position shows the most of the
      // work — its top edge at the top of the viewport while it fits,
      // and the work sitting centered once it is taller than the window
      // — and the stretch leading up to that is floored at a fraction of
      // the viewport height, so it tightens on a short window rather
      // than collapsing into that broken behaviour.
      //
      // The last work has one more constraint: the page stops scrolling
      // while it is still some way down the screen (there is only its own
      // bottom margin, the feed's padding and the footer underneath it),
      // so its top edge never reaches the top of the viewport and a draw
      // aimed there would stop partway — on a tall window it froze around
      // three quarters drawn, with no scroll left to finish it. So the
      // end position is also clamped to the highest the work can actually
      // get: whatever its top edge reads once the page is scrolled all
      // the way down. Works that aren't last can still reach their own
      // end long before that, and are unaffected.
      var maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - vh
      );
      var scrolled = window.scrollY || window.pageYOffset || 0;

      entries.forEach(function (entry) {
        var rect = entry.el.getBoundingClientRect();
        var reachableTop = rect.top + scrolled - maxScroll;
        var end = Math.max(reachableTop, Math.min(0, (vh - rect.height) / 2));
        var start = Math.max(vh - rect.height, end + vh * 0.15);
        var progress = (start - rect.top) / (start - end);
        progress = Math.max(0, Math.min(1, progress));
        entry.progress = progress;
        entry.path.style.strokeDashoffset = entry.length * (1 - progress);
        if (progress >= 0.985) entry.drawn = true;
      });
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () {
      measure();
      onScroll();
    }, { passive: true });
    update();
  }

  /* -------------------------------------------------------------------
     Project page
     ----------------------------------------------------------------- */
  function initProject() {
    if (!DATA) return;
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    var works = DATA.works;
    var index = works.findIndex(function (w) { return w.id === id; });

    if (index === -1) {
      document.getElementById("project-root").innerHTML =
        '<div class="not-found">' +
        '<p>This project could not be found.</p>' +
        '<p><a href="index.html#work">Back to work</a></p>' +
        "</div>";
      document.title = "Not found — " + DATA.person.name;
      return;
    }

    var work = works[index];
    document.title = work.title + " — " + DATA.person.name;

    var heroVisual = document.querySelector(".project-hero-visual");

    setText("p-title", work.title);
    setText("p-year", work.year);
    setText("p-category", work.category);
    setText("p-blurb", work.blurb);
    setText("p-intro", work.intro);
    setText("p-process", work.process);

    /* The other end of the lift. The same four names as on the card, so
       each piece travels between the two — in both directions, since
       these are set whenever this page is shown, including when it is
       the page being left behind on the way back. The intro gets a name
       purely so it can have an entrance of its own (it has no twin on
       the card; see the CSS). */
    // Not when this page slid in from a swipe: there the whole page
    // travels sideways in one piece, and a title morphing into the next
    // work's title inside that would be two moves at once.
    if (!document.documentElement.dataset.slide) {
      nameForTransition("p-title", "lift-title");
      nameForTransition("p-meta", "lift-meta");
      nameForTransition("p-blurb", "lift-blurb");
      if (heroVisual) heroVisual.style.viewTransitionName = "lift-visual";
    }
    nameForTransition("p-intro", "project-intro");

    /* Back to this work's own card in the feed rather than the top of
       the page — both because that's where the reader was, and because
       the text has to have somewhere on screen to fly back to. */
    document.querySelectorAll('a[href="index.html#work"]').forEach(function (a) {
      a.href = "index.html#w-" + work.id;
    });

    if (heroVisual && work.images.cutout) heroVisual.classList.add("is-cutout");
    var heroImg = document.querySelector(".project-hero-visual img");
    if (heroImg) {
      heroImg.alt = work.title;
      heroImg.loading = "lazy";
      heroImg.src = work.images.full;
    }

    var materialsList = document.getElementById("p-materials");
    if (materialsList) {
      materialsList.innerHTML = "";
      work.materials.forEach(function (m) {
        var li = document.createElement("li");
        li.textContent = m;
        materialsList.appendChild(li);
      });
    }

    var gallery = document.getElementById("p-gallery");
    if (gallery) {
      gallery.innerHTML = "";
      work.gallery.forEach(function (item) {
        var fig = document.createElement("figure");
        fig.className = "gallery-item" + (item.wide ? " wide" : "")
          + (item.cutout ? " is-cutout" : "");
        // Optional manual placement: pos: [row, col] (1-based, matches the
        // grid's own numbering) puts an image exactly where you want it
        // instead of letting it fall wherever it lands in the array —
        // e.g. [1,1] and [1,2] for two images side by side on row 1.
        if (item.pos) {
          fig.style.gridRow = item.pos[0];
          fig.style.gridColumn = item.pos[1];
        }
        if (item.type === "video") {
          var video = document.createElement("video");
          video.src = item.src;
          video.controls = true;
          video.muted = true;
          video.loop = true;
          video.playsInline = true;
          video.preload = "none";
          fig.appendChild(video);
        } else {
          var img = document.createElement("img");
          img.src = (item.wide && item.full) || item.medium;
          img.alt = item.caption || work.title;
          img.loading = "lazy";
          fig.appendChild(img);
        }
        if (item.caption) {
          var cap = document.createElement("figcaption");
          cap.textContent = item.caption;
          fig.appendChild(cap);
        }
        gallery.appendChild(fig);
      });
    }

    var prevWork = works[(index - 1 + works.length) % works.length];
    var nextWork = works[(index + 1) % works.length];
    linkProjectNav("nav-prev", prevWork);
    linkProjectNav("nav-next", nextWork);

    tapLinks(".site-nav a, .site-footer a, .back-link, .project-nav a");
    swipeBetweenWorks(prevWork, nextWork);
  }

  /* Flicking sideways moves to the next or previous work, the way a
     gallery does: left for the next one, right for the one before. The
     page doesn't follow the finger — it's a flick, not a drag — but it
     does leave in the direction of the flick (see data-slide). */
  function swipeBetweenWorks(prevWork, nextWork) {
    var start = null;
    var last = null;
    // The edges belong to the system's own back/forward gestures.
    var EDGE = 28;
    var TRAVEL = 60;

    document.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse"
        || e.clientX < EDGE
        || e.clientX > window.innerWidth - EDGE) {
        start = null;
        return;
      }
      start = { x: e.clientX, y: e.clientY, at: Date.now() };
      last = { x: e.clientX, y: e.clientY };
    }, { passive: true });

    document.addEventListener("pointermove", function (e) {
      if (start) last = { x: e.clientX, y: e.clientY };
    }, { passive: true });

    /* Both ways a gesture can end. A phone often takes the touch over
       mid-flick and sends pointercancel instead of pointerup, and
       throwing those away was why the swipe did nothing there — so the
       same reckoning runs either way. It can afford to: the page now
       keeps only the vertical pan for itself (touch-action below), so a
       cancel during a sideways flick isn't the browser scrolling with
       it, and a gesture that really was a scroll fails the test anyway. */
    function finish(e) {
      if (!start) return;
      if (e && typeof e.clientX === "number") last = { x: e.clientX, y: e.clientY };
      var dx = last.x - start.x;
      var dy = last.y - start.y;
      var took = Date.now() - start.at;
      start = null;
      // Sideways, far enough, and not a slow drag down the page.
      if (took > 800 || Math.abs(dx) < TRAVEL || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      var going = dx < 0 ? nextWork : prevWork;
      if (!going) return;
      writeSlide(dx < 0 ? "next" : "prev");
      window.location.href = "project.html?id=" + encodeURIComponent(going.id);
    }

    document.addEventListener("pointerup", finish);
    document.addEventListener("pointercancel", finish);
  }


  /* Which way the next page should come in from. It has to survive the
     navigation, and the incoming document reads it before it paints. */
  function writeSlide(direction) {
    try { sessionStorage.setItem("slide", direction); } catch (e) {}
  }

  function readSlide() {
    try {
      var value = sessionStorage.getItem("slide");
      if (value) sessionStorage.removeItem("slide");
      return value;
    } catch (e) {
      return null;
    }
  }

  function linkProjectNav(elId, work) {
    var el = document.getElementById(elId);
    if (!el) return;
    el.href = "project.html?id=" + encodeURIComponent(work.id);
    var titleEl = el.querySelector(".nav-title");
    if (titleEl) titleEl.textContent = work.title;
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function nameForTransition(id, name) {
    var el = document.getElementById(id);
    if (el) el.style.viewTransitionName = name;
  }

  /* -------------------------------------------------------------------
     About page
     ----------------------------------------------------------------- */
  function initAbout() {
    if (!DATA) return;
    var about = DATA.about;
    tapLinks(".site-nav a, .site-footer a");
    setText("about-bio", about.bio);

    setLink("link-email", "mailto:" + about.email, about.email);
    setLink("link-instagram", about.instagram, "Instagram");

    var cv = document.getElementById("cv-button");
    if (cv) cv.href = about.cv;

    // On click, the icon+label absorb into the arrow instead of just
    // sitting there while the mail client / new tab opens. Nothing
    // reloads this page afterwards (mailto doesn't navigate away at
    // all, Instagram opens in a new tab), so revert it back on a timer
    // instead of leaving the label gone for good.
    document.querySelectorAll(".absorb-link").forEach(function (a) {
      a.addEventListener("click", function () {
        a.classList.add("clicked");
        window.setTimeout(function () {
          a.classList.remove("clicked");
        }, 1600);
      });
    });
  }

  function setLink(id, href, label) {
    var el = document.getElementById(id);
    if (!el) return;
    el.href = href;
    var labelEl = el.querySelector(".link-label");
    if (labelEl) labelEl.textContent = label;
  }
})();
