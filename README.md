# elhanan itzkovich — portfolio (demo)

A minimalist portfolio site with scroll-drawn single-line sketches, each
sitting over a soft, feathered color glow, in an asymmetric scrolling work
feed. Everything here is generic placeholder content — sample products
(lamp, chair, headphones, kettle, vase, stool, and an airport-seat
concept) with invented names, descriptions and placeholder images — ready
for you to swap for your own work.

## Run it locally

No build step. Either:

- Double-click `index.html` to open it directly in a browser, or
- Serve the folder so paths behave exactly like they will on a host:

  ```bash
  python3 -m http.server 8000
  ```

  then open `http://localhost:8000`.

## Deploy it

Drag the whole folder onto [Netlify Drop](https://app.netlify.com/drop),
or push it to a GitHub repo and enable **GitHub Pages** (Settings → Pages
→ deploy from the root of your branch). No configuration needed — it's
static HTML/CSS/JS.

## File structure

```
index.html          Home page — name, tagline, scrolling work feed
project.html         Project template, loads a work by ?id= in the URL
about.html           About / contact page
style.css            All styles (design tokens at the top)
shared.js            Nav, scroll/sketch behaviour, page rendering
data/works.js        ALL content: your name, bio, links, and every work
assets/originals/    Your source photos (one per work, plus -2/-3 variants)
assets/img/          Generated medium (600px webp) + full (1600px jpg) images
assets/video/        Optional video clips for a project's gallery
scripts/
  generate-images.py Builds the medium/full images + tiny LQIP from originals
tools/
  sketch-editor.html Click-to-draw tool for making your own sketch paths
```

## Replacing content

Everything — your name, bio, social links, and every work's text — lives
in **`data/works.js`**. Open it, it's plain JavaScript with comments.

### Adding or editing a work

1. Copy one of the objects in the `works` array, give it a unique `id`
   (used in the project URL, e.g. `project.html?id=lamp`).
2. Fill in `title`, `year`, `category`, `blurb` (hover tooltip), `intro`
   (project page intro), `process`, and `materials`.
3. Set `size` to `"large"`, `"medium"` or `"small"` to control how wide
   that work's card is in the home-page feed.

### Reordering works

Just reorder the objects in the `works` array — that controls both the
home page scroll order and the Previous/Next links on the project page.

### Replacing images

1. Drop your photos into `assets/originals/`, named to match the work's
   `id`: `lamp.jpg` (main/cover image), `lamp-2.jpg`, `lamp-3.jpg`, etc.
   for extra gallery images. Any of `.jpg`, `.jpeg`, `.png`, `.webp` works.
2. Install Pillow once: `pip3 install Pillow`
3. Run the generator:

   ```bash
   python3 scripts/generate-images.py --update-data
   ```

   This creates, for every image in `assets/originals/`:
   - `assets/img/<name>-medium.webp` — 600px wide, used in project galleries
   - `assets/img/<name>-full.jpg` — 1600px wide, used on the project page
   - a tiny (~20px, under 1KB) base64 thumbnail, used as the soft color
     glow behind each sketch on the home page

   `--update-data` automatically writes the new tiny thumbnails into the
   matching `tiny:` fields in `data/works.js`. Without that flag it just
   writes `assets/img/tiny-lqip.json` so you can copy them in by hand.
4. In `data/works.js`, point each work's `images.medium` / `images.full`
   at the generated files (already done for the placeholder works — new
   works just need their `id` to match the filenames).

The color glow behind each sketch is generated automatically from the
tiny thumbnail (heavily blurred and darkened) — no extra step needed. If
a work doesn't have a photo that fits, drop a photo of the *sketch itself*
into `assets/originals/` instead; the pipeline treats it the same way.

### Replacing a sketch

Each work has a `sketch` object:

```js
sketch: {
  viewBox: "0 0 400 400",
  entry: [150, 0],
  exit: [150, 400],
  path: "M150,0 L150,330 ..."
}
```

`path` is a single continuous SVG path — it's drawn progressively as the
work scrolls into view. **Every sketch must start at `entry` (its own
x, y=0 — top edge) and end at `exit` (its own x, y=400 — bottom edge)**
of the `400x400` viewBox, with a plain vertical line from that edge point
down to wherever your drawing actually starts/ends (so there's no
diagonal stub slicing across the artwork). The home page measures each
sketch's real on-screen entry/exit position and draws a connecting
thread between consecutive works, so these edge points are what let that
thread reach correctly regardless of how the works are reordered or how
wide/positioned each card is.

#### The easy way: the built-in sketch editor

Open **`tools/sketch-editor.html`** directly in a browser (no server
needed). Click to place points — they connect in order with corners
rounded automatically, the first point becomes the top entry and the
last becomes the bottom exit (both wired up for you, so you don't have
to think about the vertical-stub rule above). Drag a point to move it,
double-click to delete it. You can load a photo of your own sketch as a
semi-transparent reference layer and trace over it. Copy the generated
`sketch: {...}` block straight into a work in `data/works.js`.

#### Drawing it by hand instead

Trace your sketch as one continuous stroke in Illustrator/Figma/Inkscape,
starting and ending with a short straight segment to the top/bottom edge
of your artboard (same x-coordinate as the point directly below/above
it, so that segment is perfectly vertical), export as SVG, and copy the
single `<path d="...">` value in here (scale/position it to roughly fill
the 400×400 box). If your tool outputs multiple `<path>` elements, either
combine them into one continuous path, or just keep the first one and
treat the rest as optional detail.

### About / Contact page

Edit `data/works.js` → `about`: `bio`, `email`, `instagram`, `behance`,
`linkedin`, and `cv` (path to your CV file — replace
`assets/cv-placeholder.pdf` with your real CV, keeping the same filename,
or update the `cv` path).

### Fonts

The display font (your name, headings) and body font are set as CSS
variables at the top of `style.css`:

```css
--font-display: 'Space Grotesk', 'Inter', ui-sans-serif, system-ui, sans-serif;
--font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;
```

Both are loaded from Google Fonts in the `@import` at the very top of
`style.css` — swap the font names there and in the `@import` URL to use
something else.

## Notes on behaviour

- **Dark mode** follows the device/OS setting automatically (no toggle).
- **Reduced motion**: if the visitor has "reduce motion" enabled, sketches
  appear fully drawn immediately and the menu animations are effectively
  instant.
- **Mobile**: there's no hover, so each work's description sits below its
  sketch instead of appearing in a hover tooltip.
- The **Work · About · Contact** menu collapses into a small dot after a
  short scroll, and expands again on hover (desktop) or tap (mobile).
