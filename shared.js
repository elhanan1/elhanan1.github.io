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

      var svgNS = "http://www.w3.org/2000/svg";
      var svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("class", "sketch-svg");
      svg.setAttribute("viewBox", work.sketch.viewBox);
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      var path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", work.sketch.path);
      svg.appendChild(path);

      var tooltip = document.createElement("div");
      tooltip.className = "work-tooltip";
      tooltip.innerHTML =
        '<div class="tt-title">' + escapeHtml(work.title) + "</div>" +
        '<div class="tt-sub">' + work.year + " · " + escapeHtml(work.category) + "</div>" +
        '<div class="tt-desc">' + escapeHtml(work.blurb) + "</div>";

      visual.appendChild(svg);
      visual.appendChild(tooltip);

      visual.addEventListener("pointermove", function (e) {
        positionTooltip(e, tooltip);
      });
      visual.addEventListener("pointerenter", function (e) {
        positionTooltip(e, tooltip);
      });

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

      var len = c.path.getTotalLength();
      c.entry.length = len;
      c.path.style.strokeDasharray = len;
      if (!c.entry.drawn) c.path.style.strokeDashoffset = reduceMotion ? 0 : len;
    });
  }

  /* Keeps a work's hover tooltip glued to the cursor, offset slightly
     so it doesn't sit directly under it, and flipped inward near the
     edges of the viewport so it never runs off-screen. */
  function positionTooltip(e, tooltip) {
    var offset = 18;
    var pad = 12;
    var w = tooltip.offsetWidth || 260;
    var h = tooltip.offsetHeight || 110;

    var left = e.clientX + offset;
    var top = e.clientY + offset;

    if (left + w > window.innerWidth - pad) left = e.clientX - offset - w;
    if (top + h > window.innerHeight - pad) top = e.clientY - offset - h;

    tooltip.style.left = Math.max(pad, left) + "px";
    tooltip.style.top = Math.max(pad, top) + "px";
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function setupSketchDraw(entries) {
    entries.forEach(function (entry) {
      var len = entry.path.getTotalLength();
      entry.length = len;
      entry.path.style.strokeDasharray = len;
      entry.path.style.strokeDashoffset = reduceMotion ? 0 : len;
    });

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
      // we floor the window at a fraction of the viewport height, so it
      // shrinks gracefully (finishing in a tighter stretch near the top)
      // but never collapses into that broken behaviour.
      entries.forEach(function (entry) {
        var rect = entry.el.getBoundingClientRect();
        var span = Math.max(vh - rect.height, vh * 0.15);
        var progress = (span - rect.top) / span;
        progress = Math.max(0, Math.min(1, progress));
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
    window.addEventListener("resize", onScroll, { passive: true });
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

    var heroGlow = document.querySelector(".project-hero-visual .glow");
    var heroImg = document.querySelector(".project-hero-visual img");
    if (heroGlow) heroGlow.style.backgroundImage = "url(" + work.images.tiny + ")";
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
        fig.className = "gallery-item";
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
          img.src = item.medium;
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
    setLink("link-behance", about.behance, "Behance");
    setLink("link-linkedin", about.linkedin, "LinkedIn");

    var cv = document.getElementById("cv-button");
    if (cv) cv.href = about.cv;
  }

  function setLink(id, href, label) {
    var el = document.getElementById(id);
    if (!el) return;
    el.href = href;
    var labelEl = el.querySelector(".link-label");
    if (labelEl) labelEl.textContent = label;
  }
})();
