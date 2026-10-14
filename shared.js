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

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    var page = document.body.dataset.page;
    if (page === "home") initHome();
    if (page === "project") initProject();
    if (page === "about") initAbout();
  });

  /* -------------------------------------------------------------------
     Nav: collapses into a dot after a small scroll, expands on
     hover (desktop) or tap (mobile/touch).
     ----------------------------------------------------------------- */
  function initNav() {
    var nav = document.querySelector(".site-nav");
    if (!nav) return;
    var dot = nav.querySelector(".dot");
    var threshold = 72;

    function onScroll() {
      var collapsed = window.scrollY > threshold;
      nav.classList.toggle("collapsed", collapsed);
      if (!collapsed) nav.classList.remove("expanded");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (dot) {
      dot.addEventListener("click", function () {
        nav.classList.toggle("expanded");
      });
    }

    document.addEventListener("click", function (e) {
      if (nav.classList.contains("expanded") && !nav.contains(e.target)) {
        nav.classList.remove("expanded");
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
      // Named so the browser can morph this exact box into the project
      // page's hero photo on click, instead of a plain crossfade.
      visual.style.viewTransitionName = "work-" + work.id;

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
      meta.innerHTML =
        '<span class="work-title">' + escapeHtml(work.title) + "</span>" +
        '<span class="work-tags">' + work.year + " · " + escapeHtml(work.category) + "</span>";

      var mobileCaption = document.createElement("div");
      mobileCaption.className = "mobile-caption";
      mobileCaption.innerHTML =
        '<div class="tt-desc">' + escapeHtml(work.blurb) + "</div>";

      link.appendChild(visual);
      card.appendChild(link);
      card.appendChild(meta);
      card.appendChild(mobileCaption);
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

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
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
      entries.forEach(function (entry) {
        var rect = entry.el.getBoundingClientRect();
        var end = Math.min(0, (vh - rect.height) / 2);
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

    setText("p-title", work.title);
    setText("p-year", work.year);
    setText("p-category", work.category);
    setText("p-intro", work.intro);
    setText("p-process", work.process);

    var heroVisual = document.querySelector(".project-hero-visual");
    var heroImg = document.querySelector(".project-hero-visual img");
    if (heroVisual) {
      heroVisual.style.viewTransitionName = "work-" + work.id;
      if (work.images.cutout) heroVisual.classList.add("is-cutout");
    }
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

  /* -------------------------------------------------------------------
     About page
     ----------------------------------------------------------------- */
  function initAbout() {
    if (!DATA) return;
    var about = DATA.about;
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
