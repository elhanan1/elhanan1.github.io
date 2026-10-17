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


  function start() {
    initNav();
    // A page coming back from the back/forward cache carries whatever
    // state it was frozen with; an arming that never fired is part of
    // that, and would be spent on the wrong navigation.
    window.addEventListener("pageshow", disarmSkip);
    var page = document.body.dataset.page;
    // On the root element, where the view-transition pseudo-elements
    // live: the CSS needs to know which of a pair's two snapshots is the
    // project page's (the bigger, sharper one) to keep on screen.
    document.documentElement.dataset.page = page;
    // Set by a sideways swipe just before it navigates, and consumed
    // here: this arrival slides in from the side instead of lifting.
    /* Read on every page so a direction left over from a move that
       never happened is cleared rather than kept, but acted on only
       where a sideways move can land: the feed wearing data-slide sent
       the whole page sliding out on its next navigation instead of
       lifting a card. */
    var slide = readSlide();
    if (slide && page === "project") {
      document.documentElement.dataset.slide = slide;
    }
    /* The logo asks for the site itself, and says so the same way: read
       on every page so a mark left by a tap that never travelled is
       cleared rather than kept, and acted on only where that tap can
       land, which is the feed. */
    var entering = readEnter();
    if (entering && page === "home") {
      document.documentElement.dataset.enter = entering;
      // Taken off once it has been spent, or the next move out of the
      // feed would read it as its own and send the page back up.
      afterArrival(function () {
        delete document.documentElement.dataset.enter;
      });
    }
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

    /* One handler for every way out through the menu, doing both jobs.
       The logo had kept a second one of its own for the mark, which is
       the arrangement that leaves a tap half done: one listener writes
       the mark while the other decides the finger moved, and the link
       goes nowhere.

       The jobs: a work's page names five of its pieces when it loads
       and the stylesheet names three more, and those names stay on
       until something takes them off — so any way out through the menu
       would otherwise carry them into a transition with nothing to pair
       them with. And the logo asks for the site itself rather than a
       card, which is the arrival the feed comes down for. */
    nav.querySelectorAll("a").forEach(function (a) {
      var isLogo = a.classList.contains("menu-logo");
      tapToOpen(a, function () {
        if (isLogo) writeEnter("push");
        unnameEverything();
      });
    });

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

    /* The feed is the works page: "home" and "work" are two names for
       the same place, one the body's and one the link's, so the mark
       has to be told they match. */
    var current = document.body.dataset.page;
    if (current === "home") current = "work";
    nav.querySelectorAll("a[data-nav]").forEach(function (a) {
      // A work's own page is not the works page: marking Work as the
      // current one drew it the same underline hovering does, so every
      // project looked like the link was being held down.
      if (a.dataset.nav === current) {
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
    if (nameEl) {
      // The full stop is the hero's own, not part of the name the
      // page titles are built from.
      writeAsWave(nameEl, DATA.person.name + ".");
      waveOnScroll(nameEl);
    }
    var tagEl = document.querySelector(".hero .tagline");
    if (tagEl) tagEl.textContent = DATA.person.tagline;

    /* Only the load that has a photo on its way in: arriving from a
       work. A visit that starts at the feed has nothing to wait for. */
    if (workIdFromUrl(cameFrom())) holdTheLines();
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) showTheLines();
    });

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
    var lifts = {};
    var approaching = [];

    DATA.works.forEach(function (work, i) {
      var size = work.size || sizes[i % sizes.length];

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
      var previewImg = null;

      // The work's own image, fading in behind the sketch so the drawn
      // line sits on top of the photo. It goes inside the same box, so
      // nothing below it on the page moves when it appears.
      if (previewSrc) {
        var preview = document.createElement("div");
        preview.className = "work-preview";
        previewImg = document.createElement("img");
        previewImg.alt = "";
        /* Eager, but at the back of the queue. The image is sized by
           the photo rather than by its box now, so until it loads it
           has no size at all — and the lift would have nothing to
           carry if a card were opened before then. They are a few tens
           of kilobytes each, and nothing waits on them. */
        previewImg.loading = "eager";
        previewImg.fetchPriority = "low";
        // If the image 404s (missing/not-yet-uploaded), drop the preview
        // rather than revealing a broken-image icon.
        previewImg.addEventListener("error", function () {
          preview.remove();
          if (lifts[work.id]) lifts[work.id].visual = visual;
        });
        reserveShape(previewImg, work.images);
        previewImg.src = previewSrc;
        // The card is the full width of the screen on a phone, and up to
        // 640px of a desktop one.
        sizedSources(previewImg, work.images.medium, work.images.full,
          "(max-width: 720px) 100vw, 640px");
        preview.appendChild(previewImg);
        visual.appendChild(preview);
      }

      /* The photo is a link, and a card with no chrome around it has
         nothing that says so. An arrow rests in its bottom corner:
         under a mouse it comes in with the photo, and on a touch
         screen, where there is no hover to find anything with, it is
         simply always there. */
      var cue = document.createElement("span");
      cue.className = "work-cue";
      cue.setAttribute("aria-hidden", "true");
      // Drawn rather than set: a glyph is as long as the face makes it,
      // and this one wants to be a long reach into the corner. Same
      // stroke as the sketches above it.
      cue.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true">' +
        '<path d="M26 6 L6 26 M6 13 L6 26 L19 26"/></svg>';
      visual.appendChild(cue);
      if (previewImg) tintCue(previewImg, cue);

      visual.appendChild(svg);

      var meta = document.createElement("div");
      meta.className = "work-meta";
      var titleEl = textEl("span", "work-title", work.title);
      // Same wording and separator as the project page's meta line: the
      // two ends of the lift have to be the same text, set the same way.
      var tagsEl = textEl("span", "work-tags", work.year + " · " + work.category);
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
        // The <img> itself, not the box it sits in: a box is padded out
        // to the card's shape, and a photo letterboxed inside one can't
        // scale cleanly into a photo letterboxed inside another. The
        // image's own edges are the same shape at both ends, whatever
        // shape the photo is.
        visual: previewImg || visual,
        title: titleEl,
        meta: tagsEl,
        blurb: descEl
      };

      // Anchor for coming back to this exact card rather than the top of
      // the feed, used by the project page's back links.
      article.id = "w-" + work.id;

      /* Out on the tap that navigates, so the photo lifts away from a
         card that is already bare rather than leaving its drawing
         standing there. One handler, not two: see tapToOpen. */
      tapToOpen(link, function () {
        document.documentElement.dataset.settling = "";
      });
      link.appendChild(visual);
      card.appendChild(link);
      card.appendChild(meta);
      card.appendChild(caption);
      article.appendChild(card);
      feed.appendChild(article);

      entries.push({ el: visual, path: path, progress: 0, drawn: false });
      approaching.push({ el: article, work: work });
    });

    setupSketchDraw(entries);
    warmOnApproach(approaching);

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
    /* The anchor this page was asked for, read once and kept: the hash
       is taken off the URL as soon as it has been acted on (see
       bringIntoView), so a second look at location.hash would say the
       feed had been asked for nothing in particular. */
    var askedFor = window.location.hash;

    function restoreFromWork() {
      var id = workIdFromUrl(cameFrom());
      if (!id) return;

      /* Only a way back that actually asks for the work returns you to
         its card: its Back link and the drag back both carry the card's
         own anchor, and the browser's back restores where you were. The
         logo asks for the site, so it lands at the top of the feed like
         any other visit. */
      var asked = askedFor === "#w-" + id;
      var nav = window.navigation;
      var traversal = !!(nav && nav.activation
        && nav.activation.navigationType === "traverse");
      if (!asked && !traversal) return;

      if (!liftCard(id)) return;
      // Both ends exist: the project page's text and photo have a card
      // to come back to, and the CSS can carry one snapshot across
      // rather than cross-fading two.
      document.documentElement.dataset.lift = "pair";

      /* How dim the photo should be by the time it lands. The single
         snapshot that travels is the project page's, at full strength,
         while the card's own photo rests at --preview-dim on a touch
         screen and at nothing at all under a pointer that isn't
         hovering it — so the photo used to arrive bright and drop to
         its resting state in one frame, at the end. Reading it off the
         card this trip is actually going back to is the only way to
         know which of the two it is; the CSS fades to it along the way.
         */
      var photo = lifts[id].visual;
      var preview = photo && photo.closest && photo.closest(".work-preview");
      if (preview) {
        document.documentElement.style.setProperty(
          "--lift-photo-end", getComputedStyle(preview).opacity);
      }

      bringIntoView(lifts[id].entry, asked && !traversal);
    }

    restoreFromWork();
    window.addEventListener("pagereveal", restoreFromWork);


    tapLinks(".site-nav a, .site-footer a");
  }

  /* The name, letter by letter, each one told how far it stands from
     the middle. The CSS turns that distance into a delay, so the middle
     drops first and draws the rest down after it. */
  function writeAsWave(el, text) {
    el.textContent = "";

    // Word by word, because a letter in a box of its own is something
    // the line can be broken after, and a name that wraps in the middle
    // of itself is worse than one that doesn't move at all.
    text.split(" ").forEach(function (word, w, words) {
      var wordEl = document.createElement("span");
      wordEl.className = "wave-word";

      word.split("").forEach(function (letter) {
        var span = document.createElement("span");
        span.className = "wave-letter";
        span.textContent = letter;
        wordEl.appendChild(span);
      });

      el.appendChild(wordEl);
      if (w < words.length - 1) {
        el.appendChild(textEl("span", "wave-space", "\u00a0"));
      }
    });
  }

  /* The wave, driven by the scroll rather than played once on arrival:
     as the name goes up off the screen its letters lift away in turn,
     the outermost leaving first and the middle last — the order the
     wave would run in backwards — and scrolling back up lays them down
     again the same way. Nothing moves until the page does. */
  function waveOnScroll(nameEl) {
    var words = [].slice.call(nameEl.querySelectorAll(".wave-word"));
    var letters = [].slice.call(nameEl.querySelectorAll(".wave-letter"));
    if (!letters.length || reduceMotion) return;

    /* How far each letter stands from a middle — which is what decides
       the order they leave in, outermost first. There are two answers
       and the layout picks between them: on one line the middle is the
       middle of the whole name, so the wave runs in from both ends of
       the line. Once it has broken into a word above a word that reading
       is wrong — the first letter of the top word and the last of the
       bottom one are diagonally opposite corners, not two ends of
       anything — so each word is measured from its own middle and both
       of its ends lift together. */
    var fromNameMiddle = [];
    var fromWordMiddle = [];
    var nameMiddle = (letters.length - 1) / 2;
    letters.forEach(function (letter, i) {
      fromNameMiddle.push(Math.abs(i - nameMiddle));
    });
    words.forEach(function (word) {
      var own = word.querySelectorAll(".wave-letter");
      var wordMiddle = (own.length - 1) / 2;
      own.forEach(function (letter, i) {
        fromWordMiddle.push(Math.abs(i - wordMiddle));
      });
    });

    var spread = fromNameMiddle;
    var furthest = 0;

    function measure() {
      var broken = words.length > 1 &&
        words[words.length - 1].getBoundingClientRect().top >
          words[0].getBoundingClientRect().top + 1;
      spread = broken && fromWordMiddle.length === letters.length
        ? fromWordMiddle
        : fromNameMiddle;
      furthest = spread.reduce(function (most, one) {
        return Math.max(most, one);
      }, 0);
    }
    measure();

    // How much of the whole gesture each letter waits through before it
    // starts, and how long it then takes: together they stay inside 1,
    // so the last letter is away by the time the name is gone.
    var LEAD = .5;
    var TAKES = .5;
    var ticking = false;

    function update() {
      var rect = nameEl.getBoundingClientRect();
      var scrolled = window.scrollY || window.pageYOffset || 0;
      /* The gesture is spent by the time the name reaches the top of
         the screen, and it starts with the first pixel of scroll — it
         used to begin only once the name had already gone past the top,
         which is to say where nobody could see any of it. The distance
         to the top of the screen is the name's own, so this follows the
         hero whatever height it has. */
      var travel = Math.max(window.innerHeight * .25, rect.top + scrolled);
      var gone = Math.min(1, Math.max(0, scrolled / travel));

      letters.forEach(function (letter, i) {
        var waits = furthest ? (furthest - spread[i]) / furthest * LEAD : 0;
        var p = Math.min(1, Math.max(0, (gone - waits) / TAKES));
        letter.style.transform = "translateY(" + (p * -.55).toFixed(3) + "em)";
        letter.style.opacity = (1 - p).toFixed(3);
      });
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener("resize", function () {
      measure();
      update();
    }, { passive: true });
    update();
  }

  function textEl(tag, className, text) {
    var el = document.createElement(tag);
    el.className = className;
    el.textContent = text;
    return el;
  }

  /* Whether a URL is the works feed. */
  function isFeedUrl(url) {
    if (!url) return false;
    try {
      var path = new URL(url, window.location.href).pathname;
      return path === "/" || path.indexOf("index.html") !== -1;
    } catch (e) {
      return false;
    }
  }

  /* Whether this page was arrived at from the works feed. */
  function cameFromFeed() {
    return isFeedUrl(cameFrom());
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

  /* `ours` is a return that came in on the card's own anchor — its Back
     link, or the drag back. There the browser has a scroll of its own
     to do, to the top of that anchor, and it does it in its own time:
     after the page has been handed over for the transition. So the trip
     was captured with the feed still at the top and the card only
     arrived once the transition was over and the pseudo-elements had
     gone, which is the page appearing to jump into place with nothing
     having travelled. On a tall window it was the only scroll that
     happened at all, because a card near the top of the feed counts as
     already in view and the check below left it alone.

     Taking the hash off the URL the moment it has been read leaves the
     scrolling here, where it happens before anything is captured. The
     entry is rewritten rather than added to, so Back still goes back to
     the work.

     Everything else — a traversal, which restores the reader's own
     position, or an arrival with no anchor at all — is only nudged if
     the card isn't on screen, as before. */
  function bringIntoView(el, ours) {
    if (ours) {
      try {
        window.history.replaceState(window.history.state, "",
          window.location.pathname + window.location.search);
      } catch (e) {}
      /* Not the middle of the screen but the point the sketch is
         finished at: the work you came back to is the whole drawing,
         rather than a line caught partway with the rest of it waiting
         on a scroll you haven't made yet. */
      var visual = el.querySelector(".work-visual");
      if (visual) window.scrollTo(0, drawnScrollTop(visual));
      else el.scrollIntoView({ block: "center" });
      return;
    }
    var rect = el.getBoundingClientRect();
    var margin = Math.min(80, window.innerHeight * 0.1);
    var inView = rect.top >= -margin && rect.bottom <= window.innerHeight + margin;
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
    // Not forEach(tapToOpen): forEach would hand it the index as its
    // second argument, and the second argument is a function to run.
    document.querySelectorAll(selector).forEach(function (a) {
      tapToOpen(a);
    });
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

  /* Both files the image script makes, handed to the browser at their
     own widths so it can pick by how wide the photo actually lands.
     A photo now runs the full width of its card and the full width of
     the screen on a phone, where the 600px medium on its own is short
     of the pixels the screen has. The widths are the two the script is
     set to (MEDIUM_WIDTH / FULL_WIDTH in scripts/generate-images.py);
     an original narrower than 1600px is simply left at its own size by
     that script, and claiming the full width here only ever makes the
     browser reach for the larger of the two files sooner. */
  function sizedSources(img, medium, full, sizes) {
    if (!medium || !full) return;
    img.srcset = medium + " 600w, " + full + " 1600w";
    img.sizes = sizes;
  }

  /* A work's photo in two steps, for the one image a page is judged on
     before it has even finished arriving: the hero the lift lands.

     Step one is the small file — a few tens of kilobytes, and the same
     one the feed warms while the card is on screen, so on the way in
     from the feed it is already in the browser and paints with this
     page's first frame. Step two is the full one, put on only once it
     has arrived and decoded: two copies of the same picture, both in
     memory by then, so the swap itself has nothing to see.

     What this is for: the hero used to be the full file and nothing
     else, which on a first visit was a fetch that started as the page
     did and landed well after it. The lift had an empty frame to carry
     and the photo appeared a moment later — and the same work was
     smooth the second time round, because by then it was cached. */
  function paintThenSharpen(img, images) {
    if (!images) return;
    var light = images.medium || images.full;
    if (light) {
      /* Decoded before the frame it belongs to is shown, rather than
         whenever the browser gets round to it: a cached photo is a few
         tens of kilobytes to unpack, and the frame it misses is the one
         the lift starts from. */
      img.decoding = "sync";
      img.src = light;
    }
    if (!images.full || images.full === light) return;

    var sharp = new Image();
    sharp.fetchPriority = "high";
    sharp.addEventListener("load", function () {
      function wear() { img.src = images.full; }
      // Decoded first: the swap is then a frame the browser already
      // holds, rather than one it has to stop and make.
      if (sharp.decode) sharp.decode().then(wear, wear);
      else wear();
    });
    sharp.src = images.full;
  }

  /* Everything opening a work needs, fetched while its card is on
     screen rather than when it is tapped: the page itself, and the
     small copy of the photo that page paints first (see
     paintThenSharpen). The words need nothing — data/works.js carries
     every work's text and is already here, as are the stylesheet and
     this script, so a warmed work has nothing left to wait for when it
     is opened. */
  var warmed = {};

  function warmWork(work) {
    if (!work || warmed[work.id]) return;
    warmed[work.id] = true;

    var page = document.createElement("link");
    page.rel = "prefetch";
    page.as = "document";
    page.href = "project.html?id=" + encodeURIComponent(work.id);
    document.head.appendChild(page);

    var light = work.images && (work.images.medium || work.images.full);
    if (!light) return;
    var photo = new Image();
    // Behind the feed's own photos, which are what is actually on
    // screen. Nothing waits on this one.
    photo.fetchPriority = "low";
    photo.src = light;
  }

  /* Warmed a little before the card is reached rather than as it is
     passed, so a work scrolled to and tapped straight away has had its
     head start too. Each card is warmed once and then let go of. */
  function warmOnApproach(cards) {
    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (card) { warmWork(card.work); });
      return;
    }

    var watch = new IntersectionObserver(function (seen) {
      seen.forEach(function (card) {
        if (!card.isIntersecting) return;
        watch.unobserve(card.target);
        cards.forEach(function (one) {
          if (one.el === card.target) warmWork(one.work);
        });
      });
    }, { rootMargin: "50% 0px" });

    cards.forEach(function (card) { watch.observe(card.el); });
  }

  /* The shape of a photo that hasn't arrived yet. Without it a card is
     laid out at the sketch's proportions and then resized the moment the
     photo loads, which moves everything below it — and a return to the
     feed that has already scrolled to a card lands beside it instead of
     on it. w and h are the photo's own pixel size, from data/works.js;
     the image script prints them for each file it makes. */
  /* Black or white, whichever the corner it lands in is not. A line of
     one fixed colour is legible over about half the photos a feed like
     this will ever hold, and invisible over the rest; the honest answer
     is to look.

     What it looks at is not the photo but what the photo actually
     paints: these sit at --preview-dim over the page's own background,
     so a pale picture on the dark theme is not pale by the time it
     reaches the screen. The corner is read once, the background is
     mixed in at the same strength the card shows it, and the arrow
     takes the opposite. Re-read when the theme flips, since that moves
     the half it is mixed with.

     A photo the canvas will not hand back — none here, but a drawing
     this far from its source should not throw — leaves the arrow at the
     page's own ink, which is the sane default either way. */
  function tintCue(img, cue) {
    var ink = null;
    var cover = null;

    function sample() {
      if (ink !== null) return true;
      var w = img.naturalWidth;
      var h = img.naturalHeight;
      if (!w || !h) return false;
      try {
        var box = 8;
        var canvas = document.createElement("canvas");
        canvas.width = box;
        canvas.height = box;
        var ctx = canvas.getContext("2d");
        // The bottom left of the photo, where the arrow sits.
        var sw = Math.max(1, Math.round(w * .3));
        var sh = Math.max(1, Math.round(h * .25));
        ctx.drawImage(img, 0, h - sh, sw, sh, 0, 0, box, box);
        var px = ctx.getImageData(0, 0, box, box).data;
        var lit = 0;
        var alpha = 0;
        for (var i = 0; i < px.length; i += 4) {
          /* Carrying the alpha, because one of these is a cut-out: its
             corner is not black, it is nothing at all, and what shows
             there is the page. Counting it as black would paint a white
             arrow onto white. */
          var a = px[i + 3] / 255;
          lit += luminance(px[i], px[i + 1], px[i + 2]) * a;
          alpha += a;
        }
        var n = px.length / 4;
        ink = lit / n;
        cover = alpha / n;
      } catch (e) {
        ink = null;
      }
      return ink !== null;
    }

    function decide() {
      if (!sample()) return;
      var root = getComputedStyle(document.documentElement);
      var dim = parseFloat(root.getPropertyValue("--preview-dim"));
      if (!(dim >= 0 && dim <= 1)) dim = 1;
      var behind = rgbLuminance(getComputedStyle(document.body).backgroundColor);
      if (behind === null) behind = 0;
      // What that corner actually ends up being: the photo at the
      // strength the card shows it, over however much of the page is
      // still visible through it.
      var shown = ink * dim + behind * (1 - cover * dim);
      cue.classList.toggle("on-light", shown > 140);
      cue.classList.toggle("on-dark", shown <= 140);
    }

    if (img.complete && img.naturalWidth) decide();
    else img.addEventListener("load", decide);

    var dark = window.matchMedia("(prefers-color-scheme: dark)");
    if (dark.addEventListener) dark.addEventListener("change", decide);
    else if (dark.addListener) dark.addListener(decide);
  }

  function luminance(r, g, b) {
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  function rgbLuminance(colour) {
    var parts = /rgba?\(([^)]+)\)/.exec(colour || "");
    if (!parts) return null;
    var n = parts[1].split(",").map(parseFloat);
    if (n.length < 3 || n.some(isNaN)) return null;
    return luminance(n[0], n[1], n[2]);
  }

  function reserveShape(img, source) {
    if (source && source.w && source.h) {
      img.width = source.w;
      img.height = source.h;
    }
  }

  /* `before` runs on the tap that navigates, in the same handler, so
     whatever it does is done by the time the page leaves.

     One handler per link, ever. Two of these on the same anchor each
     keep their own idea of whether the gesture was a tap, and a second
     one that decides it wasn't leaves the first having already done its
     half — the sketch gone, the page still there. A tap that goes
     nowhere is the worst of both. */
  function tapToOpen(link, before) {
    if (link.dataset.tapWired) return;
    // New-tab links and mailto:/tel: are the browser's business.
    if (link.target && link.target !== "_self") return;
    if (link.protocol !== "http:" && link.protocol !== "https:") return;
    link.dataset.tapWired = "1";
    onTap(link, function (e) {
      e.preventDefault();
      if (before) before();
      window.location.href = link.href;
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

  /* Where a sketch's own box has to sit for its line to be finished:
     the end of the stretch the draw is spread across, which is its top
     edge at the top of the viewport while the work fits in one, the
     work centred once it is taller than that, and never higher than the
     page can actually scroll (the last work can't reach either of the
     first two). Shared with the draw loop below so the two can't drift:
     a return to the feed aims at exactly the position the loop calls
     fully drawn. */
  function drawnTop(rect, vh, maxScroll, scrolled) {
    var reachableTop = rect.top + scrolled - maxScroll;
    return Math.max(reachableTop, Math.min(0, (vh - rect.height) / 2));
  }

  /* The scroll position that leaves a work's sketch drawn to the end. */
  function drawnScrollTop(visual) {
    var vh = window.innerHeight;
    var scrolled = window.scrollY || window.pageYOffset || 0;
    var maxScroll = Math.max(
      0, document.documentElement.scrollHeight - vh);
    var rect = visual.getBoundingClientRect();
    var end = drawnTop(rect, vh, maxScroll, scrolled);
    return Math.max(0, Math.min(maxScroll, scrolled + rect.top - end));
  }

  /* The line and the arrow keep off a photo that is still travelling,
     and come back the instant it has landed — not a moment after it,
     which is what a fade here would be. The transition's own promise
     says when that instant is. It is not worth trusting on its own
     though: a transition the browser drops can leave `finished` sitting
     there unresolved, and a line that never comes back is worse than
     one that comes back early, so the trip's own length caps it. */
  function holdTheLines() {
    var root = document.documentElement;
    var done = false;
    root.dataset.settling = "";

    function settled() {
      if (done) return;
      done = true;
      delete root.dataset.settling;
    }

    window.addEventListener("pagereveal", function (e) {
      if (e.viewTransition) e.viewTransition.finished.then(settled, settled);
      else settled();
    });

    // Just past the trip itself (--dur-lift, 1.15s at its longest).
    window.setTimeout(settled, 1300);
  }

  /* A document frozen on its way out comes back from the back/forward
     cache still wearing the hold, and nothing re-runs on a restore. */
  function showTheLines() {
    delete document.documentElement.dataset.settling;
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
        var end = drawnTop(rect, vh, maxScroll, scrolled);
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
    var heroImg = document.querySelector(".project-hero-visual img");
    if (heroVisual && work.images.cutout) heroVisual.classList.add("is-cutout");
    if (heroImg) {
      heroImg.alt = work.title;
      // Eager, and first in the queue: it's the top of the page, and
      // lazily fetching it left a gap where the photo had been during
      // the transition in.
      heroImg.loading = "eager";
      heroImg.fetchPriority = "high";
      reserveShape(heroImg, work.images);
      paintThenSharpen(heroImg, work.images);
    }

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
    function nameTheTravellers() {
      nameForTransition("p-title", "lift-title");
      nameForTransition("p-meta", "lift-meta");
      nameForTransition("p-blurb", "lift-blurb");
      nameForTransition("p-intro", "project-intro");
      if (heroImg) heroImg.style.viewTransitionName = "lift-visual";
    }

    /* Nothing is named while a sideways move is arriving: a flick
       between works carries the whole page in one piece, and a title
       morphing into the next work's title — or the intro climbing up
       from below — inside a page that is itself sliding is two moves at
       once. Once it has arrived, the names go back on, so that leaving
       for the feed lifts them as usual. */
    if (document.documentElement.dataset.slide) {
      afterArrival(function () {
        delete document.documentElement.dataset.slide;
        nameTheTravellers();
      });
    } else {
      nameTheTravellers();
      /* Only when there is a card on the other side of this arrival —
         that is, when it came from the feed — does a pair of snapshots
         exist to carry one of across. Arriving from anywhere else (the
         About page, a bookmark, a reload) leaves the project page's
         text and photo with no twin, and telling the browser to hold
         one of them on screen for the whole transition would mean
         holding something that has nowhere to go: the work's words sat
         over the page you were heading to until the clock ran out. */
      if (cameFromFeed()) document.documentElement.dataset.lift = "pair";
    }

    /* Named for the way out as well. A move between works leaves them
       unnamed until that arrival is over (above), and a Back to work
       inside that window left for the feed with nothing to carry: the
       card there is told to hold its own text and photo back for the
       whole trip, so with no travelling pair to show in their place it
       sat empty and then snapped in. pageswap runs before the snapshot
       is taken, so naming here is in time; a move to another work is
       left unnamed, as it was. */
    window.addEventListener("pageswap", function (e) {
      var to = e.activation && e.activation.entry && e.activation.entry.url;
      /* Only when the feed is being asked for this card. A named element
         is lifted out of the page's own snapshot into a layer of its
         own, painted above it — so on a move that is not a lift they
         are not pieces travelling anywhere, just this page's words left
         hovering over whatever is arriving and dissolving on their own
         clock. That is what showed through the card coming down from
         the logo, and why the about page, which names nothing, was
         fine. The anchor is the same thing the feed checks before it
         sets a lift up at the other end. */
      if (isFeedUrl(to) && to.indexOf("#w-") !== -1) nameTheTravellers();
    });

    /* Back out of the browser's own back/forward cache, this document is
       restored exactly as it was frozen — and it was frozen on its way
       out, with every name taken off it (see goToWork) and a slide
       direction possibly still on the root. Nothing re-runs by itself,
       so both are put right by hand. */
    window.addEventListener("pageshow", function (e) {
      if (!e.persisted) return;
      delete document.documentElement.dataset.slide;
      nameTheTravellers();
    });

    /* Back to this work's own card in the feed rather than the top of
       the page — both because that's where the reader was, and because
       the text has to have somewhere on screen to fly back to. */
    document.querySelectorAll('a[href="index.html#work"]').forEach(function (a) {
      a.href = "index.html#w-" + work.id;
    });

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
          reserveShape(img, item);
          img.src = (item.wide && item.full) || item.medium;
          img.alt = item.caption || work.title;
          img.loading = "lazy";
          /* One column of full-width photos on a phone; on a desktop
             half the gallery's 52em, or all of it for a wide one. */
          sizedSources(img, item.medium, item.full, item.wide
            ? "(max-width: 720px) 100vw, 52em"
            : "(max-width: 720px) 100vw, 25em");
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

    // No wrapping around: the first work has nothing before it and the
    // last has nothing after it, and an arrow that only brings you back
    // to where you started says the collection is a loop when it isn't.
    var prevWork = index > 0 ? works[index - 1] : null;
    var nextWork = index < works.length - 1 ? works[index + 1] : null;
    linkProjectNav("nav-prev", prevWork);
    linkProjectNav("nav-next", nextWork);

    tapLinks(".site-nav a, .site-footer a, .back-link, .project-nav a");
    slideDeck(prevWork, nextWork);
    edgeSwipeBack("index.html#w-" + work.id);
    addSideArrows(prevWork, nextWork);
  }

  /* What the swipe is on a phone, a mouse gets as a chevron resting in
     the margin on either side. */
  function addSideArrows(prevWork, nextWork) {
    [["prev", prevWork, "Previous work"], ["next", nextWork, "Next work"]]
      .forEach(function (side) {
        var where = side[0];
        var work = side[1];
        if (!work) return;

        var arrow = document.createElement("a");
        arrow.className = "work-arrow " + where;
        arrow.href = "project.html?id=" + encodeURIComponent(work.id);
        arrow.setAttribute("aria-label", side[2] + ": " + work.title);
        arrow.innerHTML = where === "prev"
          ? '<svg viewBox="0 0 20 44" aria-hidden="true"><path d="M15 4 L5 22 L15 40"/></svg>'
          : '<svg viewBox="0 0 20 44" aria-hidden="true"><path d="M5 4 L15 22 L5 40"/></svg>';

        onTap(arrow, function (e) {
          e.preventDefault();
          goToWork(work, where === "prev" ? "prev" : "next");
        });

        document.body.appendChild(arrow);
      });
  }

  /* On a phone, dragging in from the left edge is how you go back, and
     the browser answers it itself — on an iPhone (in any browser there,
     since they all run WebKit) with a plain system swap that no page
     transition can take part in. Where the browser will let the page
     have that gesture instead — by preventing a touchmove it hasn't
     claimed yet — we take it and leave the same way the Back link does,
     so the work's text and photo travel back to its card. Where it
     won't, nothing is prevented and the browser's own back works as it
     always did.

     It only ever takes over once the drag is clearly sideways, so a
     scroll that happens to start at the edge still scrolls. */
  function edgeSwipeBack(href) {
    var SIDEWAYS = 12;
    var TRAVEL = 64;
    var from = null;
    var mine = false;

    /* Its own strip down the left edge rather than the whole document:
       the listener below has to be able to prevent the browser's own
       gesture, and a listener that might do that, bound to everything,
       makes every scroll on the page wait for it first. A touch is
       delivered to the element it began on for the whole of its life,
       so the drag is still followed once the finger leaves the strip. */
    var strip = document.createElement("div");
    strip.className = "edge-back";
    strip.setAttribute("aria-hidden", "true");
    document.body.appendChild(strip);

    strip.addEventListener("touchstart", function (e) {
      var touch = e.touches[0];
      from = touch ? { x: touch.clientX, y: touch.clientY } : null;
      mine = false;
    }, { passive: true });

    strip.addEventListener("touchmove", function (e) {
      if (!from) return;
      var touch = e.touches[0];
      if (!touch) return;
      var dx = touch.clientX - from.x;
      var dy = touch.clientY - from.y;
      if (!mine && dx > SIDEWAYS && Math.abs(dx) > Math.abs(dy)) mine = true;
      if (mine && e.cancelable) e.preventDefault();
    }, { passive: false });

    strip.addEventListener("touchend", function (e) {
      var took = mine;
      var touch = e.changedTouches && e.changedTouches[0];
      var dx = from && touch ? touch.clientX - from.x : 0;
      from = null;
      mine = false;
      if (took && dx > TRAVEL) window.location.href = href;
    });
  }

  /* Flicking sideways moves to the next or previous work, the way a
     gallery does: left for the next one, right for the one before. The
     page doesn't follow the finger — it's a flick, not a drag — but it
     does leave in the direction of the flick (see data-slide). */
  /* Sliding between works, as a deck of slides rather than a gesture
     with a hidden threshold: the work either side is built and parked
     just off screen, and a sideways drag brings it in with the finger.
     Let go halfway and both fall back into place; carry it far enough
     and the move finishes on its own. Before, nothing moved but the
     page you were on, so there was no telling how far was far enough —
     and then the next work simply appeared. */
  function slideDeck(prevWork, nextWork) {
    var surface = document.getElementById("project-root");
    var backLink = document.querySelector(".project-header .back-link");
    var peeks = { prev: buildPeek(prevWork, "prev"), next: buildPeek(nextWork, "next") };
    var from = null;
    var last = null;
    var sideways = false;
    var leaving = false;
    // The edges belong to the system's gestures and to the drag back
    // to the feed.
    var EDGE = 28;

    function travelNeeded() {
      return Math.max(50, window.innerWidth * 0.22);
    }

    function place(el, value, animate) {
      if (!el) return;
      el.style.transition = animate
        ? "transform var(--dur-swipe) var(--ease)"
        : "none";
      el.style.transform = value;
    }

    /* The work moves; Back to work doesn't. It sits inside the page, so
       holding it still means moving it back by exactly as much as the
       page goes forward. */
    function moveSurface(offset, animate) {
      place(surface, offset ? "translateX(" + offset + ")" : "", animate);
      place(backLink, offset ? "translateX(calc(-1 * " + offset + "))" : "", animate);
    }

    function show(side, dx) {
      ["prev", "next"].forEach(function (other) {
        if (peeks[other]) peeks[other].classList.toggle("is-showing", other === side);
      });
      var peek = peeks[side];
      if (!peek) return;
      var parked = side === "next" ? "100%" : "-100%";
      place(peek, "translateX(calc(" + parked + " + " + Math.round(dx) + "px))", false);
    }

    function rest(animate) {
      moveSurface("", animate);
      ["prev", "next"].forEach(function (side) {
        var peek = peeks[side];
        if (!peek) return;
        place(peek, "", animate);
        window.setTimeout(function () { peek.classList.remove("is-showing"); }, 700);
      });
    }

    document.addEventListener("touchstart", function (e) {
      if (leaving) return;
      var touch = e.touches.length === 1 && e.touches[0];
      sideways = false;
      if (!touch || touch.clientX < EDGE || touch.clientX > window.innerWidth - EDGE) {
        from = null;
        return;
      }
      from = { x: touch.clientX, y: touch.clientY };
      last = { x: touch.clientX, y: touch.clientY };
    }, { passive: true });

    document.addEventListener("touchmove", function (e) {
      if (!from || leaving) return;
      if (e.touches.length > 1) {
        from = null;
        if (sideways) rest(true);
        sideways = false;
        return;
      }
      var touch = e.touches[0];
      if (!touch) return;
      last = { x: touch.clientX, y: touch.clientY };
      var dx = last.x - from.x;
      var dy = last.y - from.y;
      if (!sideways && Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) sideways = true;
      if (!sideways) return;
      // Nothing to pull in from that side: the page itself gives a
      // little and springs back, rather than pretending.
      var side = dx < 0 ? "next" : "prev";
      var pull = peeks[side] ? dx : dx * 0.25;
      moveSurface(Math.round(pull) + "px", false);
      show(side, pull);
    }, { passive: true });

    document.addEventListener("touchcancel", function () {
      if (sideways) rest(true);
      from = null;
      sideways = false;
    });

    document.addEventListener("touchend", function (e) {
      if (!from || leaving) return;
      var touch = e.changedTouches && e.changedTouches[0];
      if (touch) last = { x: touch.clientX, y: touch.clientY };
      var dx = last.x - from.x;
      var dy = last.y - from.y;
      var wasSideways = sideways;
      from = null;
      sideways = false;
      if (!wasSideways) return;

      var side = dx < 0 ? "next" : "prev";
      var going = side === "next" ? nextWork : prevWork;
      if (!going || Math.abs(dx) < travelNeeded() || Math.abs(dx) < Math.abs(dy) * 1.5) {
        rest(true);
        return;
      }

      // Carry both the rest of the way, then step across to the real
      // page underneath what is already on screen.
      leaving = true;
      moveSurface(side === "next" ? "-100vw" : "100vw", true);
      place(peeks[side], "translateX(0)", true);
      window.setTimeout(function () { goToWork(going, side, true); }, 320);
    });
  }

  /* The next or previous work, built just far enough to be the thing
     you see coming: its header and its photo, in the same markup as the
     real page, so that when the real one takes over there is nothing to
     notice. */
  function buildPeek(work, side) {
    if (!work) return null;

    var peek = document.createElement("div");
    peek.className = "work-peek " + side;
    peek.setAttribute("aria-hidden", "true");

    var header = document.createElement("header");
    header.className = "project-header";
    header.appendChild(textEl("span", "back-link", "\u2190 Back to work"));
    header.appendChild(textEl("h1", "p-title", work.title));

    var meta = document.createElement("div");
    meta.className = "p-meta";
    meta.appendChild(textEl("span", "", String(work.year)));
    meta.appendChild(textEl("span", "", work.category));
    header.appendChild(meta);

    header.appendChild(textEl("p", "p-blurb", work.blurb));
    header.appendChild(textEl("p", "p-intro", work.intro));
    peek.appendChild(header);

    var visual = document.createElement("div");
    visual.className = "project-hero-visual"
      + (work.images && work.images.cutout ? " is-cutout" : "");
    var img = document.createElement("img");
    img.alt = "";
    // The same file the real page's hero paints first, fetched quietly
    // in the background: when the real page takes over it is already
    // cached and paints at once, instead of the photo blinking out and
    // back.
    img.fetchPriority = "low";
    reserveShape(img, work.images);
    img.src = (work.images && (work.images.medium || work.images.full)) || "";
    visual.appendChild(img);
    peek.appendChild(visual);

    document.body.appendChild(peek);
    return peek;
  }



  function goToWork(work, direction, alreadyMoved) {
    if (!work) return;
    writeSlide(direction);
    // The drag has already carried both pages across, so the browser's
    // own transition would only play the same move a second time.
    if (alreadyMoved) skipNextTransition();
    // And nothing is named on the way out either, for the same reason.
    unnameTheTravellers();
    window.location.href = "project.html?id=" + encodeURIComponent(work.id);
  }

  /* Armed for exactly one navigation. It used to be armed for good: the
     listener stayed on the document, and a document that is restored
     from the back/forward cache comes back with it still on — so every
     later move out of that page had its transition thrown away too,
     which is why the animations stopped after a few trips back and
     forth. `once` takes it off the moment it has done its job, and a
     restore clears an arming that never fired. */
  function skipNextTransition() {
    window.addEventListener("pageswap", skipOnce, { once: true });
  }

  function disarmSkip(e) {
    if (!e || e.persisted) window.removeEventListener("pageswap", skipOnce);
  }

  function skipOnce(e) {
    if (!e.viewTransition) return;
    // Skipping rejects the transition's own promises. Nothing is
    // waiting on them, but an unhandled rejection still lands in the
    // console as an error that looks like a fault.
    ["ready", "finished", "updateCallbackDone"].forEach(function (name) {
      var promise = e.viewTransition[name];
      if (promise && promise.catch) promise.catch(function () {});
    });
    e.viewTransition.skipTransition();
  }

  /* Runs once this page's arrival is over and the stage is clear. The
     transition's own promise says so exactly, but pagereveal can fire
     before a script at the end of the body is reached, so a timer backs
     it up — whichever comes first. */
  function afterArrival(run) {
    var done = false;
    function once() {
      if (done) return;
      done = true;
      run();
    }
    window.addEventListener("pagereveal", function (e) {
      if (e.viewTransition) e.viewTransition.finished.then(once, once);
      else once();
    });
    window.setTimeout(once, 2200);
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

  /* The same hand-off as the slide above, for the one navigation that
     isn't a work: whichever page the logo was tapped on, the feed is
     what arrives. */
  function writeEnter(kind) {
    try { sessionStorage.setItem("enter", kind); } catch (e) {}
  }

  function readEnter() {
    try {
      var value = sessionStorage.getItem("enter");
      if (value) sessionStorage.removeItem("enter");
      return value;
    } catch (e) {
      return null;
    }
  }

  function linkProjectNav(elId, work) {
    var el = document.getElementById(elId);
    if (!el) return;
    if (!work) {
      el.remove();
      return;
    }
    el.href = "project.html?id=" + encodeURIComponent(work.id);
    var titleEl = el.querySelector(".nav-title");
    if (titleEl) titleEl.textContent = work.title;
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  /* Takes the travelling names off a work's pieces, so the page leaves
     as one picture of itself rather than as a page plus five layers
     above it. Safe anywhere: the feed and the about page have none of
     these to begin with. */
  function unnameTheTravellers() {
    ["p-title", "p-meta", "p-blurb", "p-intro"].forEach(function (id) {
      nameForTransition(id, "");
    });
    var hero = document.querySelector(".project-hero-visual img");
    if (hero) hero.style.viewTransitionName = "";
  }

  /* Leaving a work for somewhere that is neither another work nor its
     own card in the feed. Then nothing on this page is travelling, so
     nothing on it keeps a name — not the pieces above, and not the
     furniture a work carries that the feed has no answer for: its Back
     to work and the two arrows in the margins, which are named in the
     stylesheet and so have to be told "none" rather than emptied.

     A name with nothing to pair it is still a layer of its own, lifted
     out of the page and painted above it on its own clock. That is what
     the words were doing over the card coming down from the logo, and
     these three are the rest of the same list: they are the reason a
     work behaves differently from the about page, which has none. */
  function unnameEverything() {
    unnameTheTravellers();
    document.querySelectorAll(".project-header .back-link, .work-arrow")
      .forEach(function (el) { el.style.viewTransitionName = "none"; });
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
