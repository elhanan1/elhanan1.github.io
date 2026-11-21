# The site's content

Everything the site shows — the name, the About copy, every project and
the degree year by year — lives in one file: `data/works.js`. It sets
`window.SITE_DATA`, and `shared.js` builds every page from it.

There are two ways to edit it.

## 1. The studio (`admin.html`)

The easy way, and the one meant for everyday use: open
<https://elhanan1.github.io/admin.html>, edit, press **Publish**.

It runs entirely in the browser. It reads `data/works.js` out of the
repository through the GitHub API, gives every field a form, resizes
photos as they are dropped in, and commits the result back in one
commit. GitHub Pages rebuilds from that commit, usually inside a
minute.

### Signing in, once

The studio needs a GitHub token to write to the repository:

1. Open [fine-grained tokens](https://github.com/settings/personal-access-tokens/new).
2. **Repository access** → *Only select repositories* → `elhanan1.github.io`.
3. **Permissions → Repository permissions** → **Contents: Read and write**.
   Nothing else is needed.
4. Generate it, copy it, paste it into the studio.

The token is kept in that browser's `localStorage` and sent to
`api.github.com` and nowhere else. The page itself is public, but
without a token it can do nothing. On a shared computer, press **Sign
out** when finished. If the token expires, the studio says so and asks
for a new one.

### What it does

- **Projects** — add, delete, duplicate and reorder; the order in the
  list is the order of the home feed. Every field of a project has a
  form, and photos are dropped straight in.
- **Studies** — years, courses, and the work inside each course. A
  course can either hold a work of its own or show a project from the
  Projects list, in which case it is written once and appears in both.
- **About** — the name, tagline, bio, links, and the CV file.
- **Draft** — a project marked *draft* stays in the file but is left off
  the site: out of the feed, out of its course, out of Previous/Next.
  Its own URL answers "project could not be found". The preview shows
  drafts, so something unfinished can be looked at in place.
- **Preview** — the real pages, with the unpublished edits in them, in
  an iframe at phone or desktop width. It works by leaving the edited
  content in `sessionStorage`; the pages read it when the URL carries
  `?preview=1`. That is the only thing the wrapper at the bottom of
  `data/works.js` is for.
- **Publish** — one commit, listing exactly which files it writes. Every
  publish is ordinary git history, so anything can be undone.

Unpublished edits are kept in the browser, so a closed tab loses
nothing — except photos, which are too large to keep and need dropping
in again.

### Photos

The studio makes the same two sizes `scripts/generate-images.py` makes,
with the same names, so the two can be used side by side:

| file | width | used by |
| --- | --- | --- |
| `assets/img/<name>-medium.webp` | 600px | the feed cards and galleries |
| `assets/img/<name>-full.jpg` | 1600px | the project page |
| `assets/originals/<name>.<ext>` | untouched | the record of what it was made from |

- A cut-out photo — a PNG or WebP with transparency — keeps its alpha:
  its large size is written as `-full.webp`, since a JPEG cannot hold
  transparency.
- A GIF is committed exactly as it is, animation intact.
- An MP4 or WebM becomes a `type: "video"` gallery item.
- Names follow the project's id: `<id>`, then `<id>-2`, `<id>-3`, and so
  on. Renaming a project later does not rename its photos; they keep
  working, they are simply named after the old id.
- Photos from an iPhone: Safari can read HEIC, desktop Chrome cannot. If
  a HEIC file is refused, share it as JPEG.

## 2. By hand

`data/works.js` is ordinary JavaScript, and the studio reads whatever is
in it, so editing it by hand is still fine — in a text editor, or
straight on GitHub. Run `python3 scripts/generate-images.py` after
dropping photos into `assets/originals/`, then point the fields below at
what it made.

If the studio is open at the time, publish from it before editing by
hand: it warns when the file has changed underneath it, but the warning
is easier to avoid than to answer.

## The fields

### `person`

| field | what it is |
| --- | --- |
| `name` | the name in the hero and in every page title |
| `tagline` | the line under it |

### `about`

`bio`, `email`, `instagram`, `behance`, `linkedin`, `cv` — the About
page's copy and links. `cv` is a path inside the repository.

### A project

Projects in `works` are the home feed, in the order they are written.

| field | what it is |
| --- | --- |
| `id` | its address: `project.html?id=…`, and the base of its photos' names. Unique across the whole file. |
| `title`, `year`, `category` | the heading and the line under it |
| `size` | `small`, `medium` or `large` — how large the card sits in the feed |
| `draft` | `true` keeps it in the file and off the site |
| `blurb` | the one line under the title in the feed |
| `intro` | the opening paragraph of its own page |
| `process` | how it was made; leave empty to leave the section out |
| `materials` | a list of strings |
| `images` | the cover: `{ medium, full, w, h }`, where `w`/`h` are the medium's pixel size — the page holds that shape open so nothing jumps while the photo loads |
| `gallery` | the photos on its own page, below |
| `sketch` | the line drawn as the card scrolls into view, below |

### A gallery item

```js
{ type: "image", medium: "…-medium.webp", full: "…-full.jpg",
  w: 600, h: 800, caption: "", pos: [1, 1] }
```

- `pos: [row, column]` places an item in the gallery's two-column grid.
  The studio numbers these itself: items pair up left and right unless
  one is marked `wide`.
- `wide: true` spans both columns.
- `cutout: true` puts the page's own surface behind a cut-out photo.
- `caption` is optional; when it is there it is also the image's
  alternative text.
- `{ type: "video", src: "assets/img/….mp4", wide: true }` for a video,
  which is shown with controls, muted and looping.

### A sketch

```js
sketch: {
  viewBox: "0 0 400 400",
  entry: [200, 0],
  exit: [200, 400],
  path: "M200,0 …"
}
```

One continuous SVG path, drawn progressively as the work scrolls into
view. `entry` and `exit` are where the thread between one work and the
next is tied, so works can be reordered freely. Draw one in
`tools/sketch-editor.html`, copy its output, and paste it into the
studio's **Sketch** box (or into this file).

A project without a sketch simply shows its photo.

### `studies`

```js
studies: {
  intro: "…",                    // the line under the Studies heading
  years: [{
    id: "year-1",
    title: "Year one",
    blurb: "",                   // the line under the year; leave out for none
    courses: [{
      id: "structure-function-form",   // its address: course.html?id=…
      title: "Studio: Structure. Function. Form.",
      short: "Structure. Function. Form.",  // what a Back link says
      blurb: "",
      works: [ "looker-chair", { id: "box", title: "Box", … } ]
    }]
  }]
}
```

A course's `works` holds either the **id of a project** from `works` —
the same project shown in both places, written once — or a **whole
project** of its own, in exactly the shape above. Both can sit side by
side in the same list.
