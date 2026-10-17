# elhanan itzkovich — portfolio (demo)

A minimalist portfolio site with scroll-drawn single-line sketches in an
asymmetric scrolling work feed. 

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
  generate-images.py Builds the medium/full images from your originals
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
   python3 scripts/generate-images.py
   ```

   This creates, for every image in `assets/originals/`:
   - `assets/img/<name>-medium.webp` — 600px wide, used in project galleries
     and the home-page hover preview
   - `assets/img/<name>-full.jpg` — 1600px wide, used on the project page
4. In `data/works.js`, point each work's `images.medium` / `images.full`
   at the generated files (already done for the placeholder works — new
   works just need their `id` to match the filenames).

Hovering a sketch on the home page shows a preview photo. It uses
`images.preview` if you set one (any path, doesn't have to be generated —
useful for picking a different shot than the cover image), and otherwise
falls back to `images.medium` — the work's first/main image.

Every gallery image shows in full, at its own real proportions (no
cropping) — a 2-column grid by default, each image as wide as its column
and however tall it naturally is. Two ways to control where things land:

- `wide: true` on a gallery item makes it span both columns, full width.
- `pos: [row, col]` (1-based) puts an item in an exact cell — e.g. `[1, 1]`
  and `[1, 2]` for two images side by side on the first row, `[2, 1]` for
  the next one below the first. Leave it off and the item just falls next
  in the grid's normal flow.

### Replacing a sketch

Each work has a `sketch` object:

```js
sketch: {
  viewBox: "0 0 400 400",
  entry: [150, 40],
  exit: [220, 360],
  path: "M150,40 L..."
}
```

`path` is a single continuous SVG path — it's drawn progressively as the
work scrolls into view, roughly within a `400×400` box. `entry`/`exit`
just record where the line starts/ends (its first and last point) —
they're not used for anything on the home page right now (each sketch
draws on its own, not connected to its neighbors), but are kept in case
that comes back. There's no need to start at the top edge or end at the
bottom edge, or add any padding — just draw the thing.

#### The easy way: the built-in sketch editor

Open **`tools/sketch-editor.html`** directly in a browser (no server
needed). Click to place points — they connect in order with corners
rounded automatically, and the line starts/ends exactly at your first
and last click (nothing added before or after). Drag a point to move it,
double-click to delete it. You can also draw freehand (click and drag),
or load a photo of your own sketch as a semi-transparent reference layer
and trace over it. Copy the generated `sketch: {...}` block straight
into a work in `data/works.js`.

#### Drawing it by hand instead

Trace your sketch as one continuous stroke in Illustrator/Figma/Inkscape,
export as SVG, and copy the single `<path d="...">` value in here
(scale/position it to roughly fill the 400×400 box). If your tool
outputs multiple `<path>` elements, either combine them into one
continuous path, or just keep the first one and treat the rest as
optional detail.

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
  short scroll, and expands again on hover (desktop) or tap (mobile). The
  menu item for the page you are on is underlined — **Work** on the feed,
  **About** on the about page (a work's own page marks neither).
- **Opening a work** is meant to feel like one continuous move: the card's
  photo and words travel to the project page rather than being replaced by
  it. So each work is warmed while its card is coming up the screen — its
  page is prefetched, and the 600px `-medium.webp` copy of its cover photo
  is fetched ahead. The project page paints that small copy first and
  swaps in the 1600px `-full` one once it has arrived, so the photo is
  there from the first frame instead of landing part-way through the
  animation on a first visit.
