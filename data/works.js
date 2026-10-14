/**
 * All portfolio content lives here: your name and tagline, the About/Contact
 * copy, and every work with its text, images, and sketch path data.
 *
 * To add a new work: copy one of the objects in `works`, give it a unique
 * id, and drop images into assets/originals/ named <id>.jpg, <id>-2.jpg,
 * <id>-3.jpg, then run `python3 scripts/generate-images.py --update-data`.
 *
 * To reorder works on the home page and in Previous/Next navigation, just
 * reorder the objects in the `works` array below.
 *
 * sketch.path is a single continuous SVG path. It is drawn progressively as
 * the work scrolls into view. Every sketch starts at sketch.entry (200,0 —
 * top-center of the 400x400 viewBox) and ends at sketch.exit (200,400 —
 * bottom-center), so a connecting thread can be drawn from the exit point
 * of one work to the entry point of the next, regardless of how the works
 * are reordered or how they're positioned on the page. See README.md for
 * how to draw your own.
 */
window.SITE_DATA = {
  person: {
    name: "elhanan itzkovich",
    tagline: "Industrial design student"
  },
  about: {
    bio: "I'm an industrial design student interested in how everyday "
      + "objects earn their shape \u2014 the small decisions in proportion, "
      + "material and mechanism that make something feel inevitable once "
      + "it exists. This site collects project work from the last few years "
      + "of study, from early sketches through to finished prototypes.",
    email: "hello@example.com",
    instagram: "https://instagram.com/yourhandle",
    behance: "https://behance.net/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
    cv: "assets/cv-placeholder.pdf"
  },
  works: [
  {
    id: "transit-lock",
    title: "Transit Hold",
    year: 2024,
    category: "Transit furniture",
    size: "small",
    blurb: "An airport seat that locks your carry-on in place the moment you sit down.",
    intro: "Transit Hold is a waiting-area seat built around a single problem: a bag "
      + "on the floor next to you is a bag someone else can walk off with. A slot "
      + "under the front edge of the seat holds a carry-on case, and a spring "
      + "bolt in the seat frame locks onto it the instant your weight settles — "
      + "releasing again only once you stand up.",
    process: "The locking sequence was worked out first as a small paper-and-chipboard "
      + "study model, with a wooden dowel standing in for the bolt: a block "
      + "representing the case slides into the slot from the side, the seat drops "
      + "onto it, and the dowel pins it in place until the seat lifts again. The "
      + "storyboard sketch maps that same three-step sequence — slide, sit, lock — "
      + "which later became the brief for the actual spring-bolt mechanism.",
    materials: ["Moulded composite shell", "Spring-loaded steel locking bolt", "Powder-coated steel frame", "Rubber case-grip pads"],
   sketch: {
  viewBox: "0 0 400 400",
  entry: [137.6, 395.4],
  exit: [216.3, 400],
  path: "M137.6,395.4 L145.2,289.9 Q146.4,273.9 134.7,263 L119.7,248.9 Q108,238 105.5,222.2 L103.3,208.7 Q101.2,195.8 101.4,182.6 L101.5,181 Q101.6,169.4 106.3,158.9 L106.3,158.9 Q111,148.4 119.6,140.7 L120.3,140.2 Q129.7,131.9 140.8,126.5 L148.6,122.8 Q160.8,116.8 174.2,115.5 L181.9,114.7 Q187.7,114.1 193.3,115.9 L193.3,115.9 Q198.9,117.6 203.4,121.4 L203.9,121.9 Q208.9,126.2 212.6,131.6 L220,142.3 Q226,151.1 229.6,161.2 L229.6,161.2 Q233.1,171.2 232.8,181.9 L232.7,184.2 Q232.5,192.5 228.2,199.6 L228.2,199.6 Q223.8,206.7 217,211.4 L217,211.4 Q210.1,216.2 202,218.3 L198.6,219.1 Q187,222.1 196.5,229.2 L200.7,232.4 Q208.9,238.7 210.5,248.9 L210.8,251.1 Q212,259.1 208.5,266.4 L208.5,266.4 Q205.1,273.8 211.5,278.8 L215.5,282 Q218.1,284 217.7,287.2 L217.7,287.2 Q217.2,290.5 214.8,292.7 L204.9,302.2 Q195.7,310.9 208.4,312 L217.4,312.7 Q221,313 223.3,315.7 L223.3,315.7 Q225.7,318.5 225.7,322.1 L226.1,353.2 Q226.2,368.6 219.9,382.8 L214.4,395 Q213.6,396.9 214.9,398.4 L216.3,400"
},
    images: {
      medium: "assets/img/transit-lock-medium.webp",
      full: "assets/img/transit-lock-full.jpg"
    },
    gallery: [
    {
      type: "image",
      medium: "assets/img/transit-lock-2-medium.webp",
      full: "assets/img/transit-lock-2-full.jpg",
      caption: "Rear view of the chipboard study model"
    },
    {
      type: "image",
      medium: "assets/img/transit-lock-3-medium.webp",
      full: "assets/img/transit-lock-3-full.jpg",
      caption: "Storyboard: slide the case in, sit, the bolt locks"
    }
  ]
  }
  ]
};
