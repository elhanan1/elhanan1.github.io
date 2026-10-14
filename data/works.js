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
    email: "elhananitzkovich@gmail.com",
    instagram: "https://instagram.com/elhanan_itzkovich",
    behance: "https://behance.net/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
    cv: "assets/cv-placeholder.pdf"
  },
  works: [
  {
    id: "bottle-fifo",
    title: "First Out",
    year: 2026,
    category: "Retail fixture",
    size: "small",
    blurb: "A fridge rack filled from the back, so the oldest bottle is always the one in front.",
    intro: "First Out is an early concept for a chilled-display rack that is "
      + "loaded from behind and emptied from the front. The bottles sit in a "
      + "channel that falls towards the customer, so lifting the front bottle "
      + "lets the next one run down into the space it leaves, and whatever is "
      + "restocked behind it has no way of jumping the queue. The shelf keeps "
      + "its own rotation, instead of depending on whoever happens to be "
      + "refilling it to pull the older stock forward first.",
    process: "This is the first study model: a body cut from corrugated "
      + "plastic, a strip of sheet metal through it standing in for the rail "
      + "the bottles run on, and a ball of plasticine standing in for a "
      + "bottle. At this stage the only question is the angle \u2014 shallow "
      + "enough that a bottle stays where it is put, steep enough that it "
      + "moves forward on its own the moment the one ahead of it is lifted "
      + "away. It was photographed in place on a caf\u00e9 display fridge, "
      + "against the shelf heights and the bottles it would have to work with.",
    materials: ["Corrugated plastic", "Sheet metal", "Plasticine"],
    sketch: {
      viewBox: "0 0 400 400",
      entry: [48, 292],
      exit: [330, 196],
      path: "M48,292 L344,292 Q352,292 352,284 L352,158 Q352,150 344,152 Q312,158 296,186 Q282,210 262,196 Q242,182 226,204 Q210,226 190,210 Q170,194 142,206 Q112,219 96,240 Q78,264 62,276 L48,292 L56,286 L167,249 Q165,220 193,215 Q221,211 219,241 Q217,268 190,266 Q164,264 167,249 L330,196"
    },
    images: {
      // Transparent background — the page puts the plate behind it.
      cutout: true,
      medium: "assets/img/bottle-fifo-medium.webp",
      full: "assets/img/bottle-fifo-full.webp"
    },
    gallery: [
    {
      type: "image",
      medium: "assets/img/bottle-fifo-2-medium.webp",
      full: "assets/img/bottle-fifo-2-full.jpg",
      caption: "The model tried in place on a caf\u00e9 display fridge"
    },
    {
      type: "image",
      medium: "assets/img/bottle-fifo-3-medium.webp",
      full: "assets/img/bottle-fifo-3-full.jpg",
      caption: "Side view: the rail and the bottle's resting position"
    }
  ]
  },
  {
    id: "looker-chair",
    title: "Looker-Chair",
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
    materials: ["carton"],
   sketch: {
  viewBox: "0 0 400 400",
  entry: [85.2, 390.6],
  exit: [256.5, 159.6],
  path: "M85.2,390.6 L93.9,360.8 Q99.1,342.7 116.9,336.6 L121,335.2 Q134.8,330.5 149.4,330.9 L155.6,331.1 Q164,331.3 171.4,335.1 L171.4,335.1 Q178.8,338.9 184.7,344.8 L190.3,350.3 Q200.3,360.1 203.2,373.9 L205,382.6 Q206.1,387.7 204.3,392.6 L204.3,392.6 Q202.6,397.5 201.6,392.4 L195.4,361.3 Q192.9,348.6 186.8,337.2 L186.8,337.2 Q180.7,325.8 182.5,313.1 L183,309.3 Q185.2,292.7 191,277 L194.4,267.9 Q197.6,259.2 204.2,252.7 L204.2,252.7 Q210.9,246.2 206.5,254.4 L175.5,313.3 Q172.3,319.3 165.5,319.3 L165.5,319.3 Q158.7,319.3 151.9,318.7 L144.5,318.1 Q134.9,317.3 125.7,320.1 L121.7,321.3 Q116.5,322.8 112.5,326.5 L112.4,326.6 Q108.5,330.2 112.3,333.8 L112.3,333.8 Q116.1,337.4 121.3,336.4 L131.4,334.3 Q146.7,331.2 160.6,324 L163.6,322.4 Q180.5,313.6 186.9,295.7 L191.2,283.6 Q201.9,253.6 176.4,234.6 L141.6,208.5 Q136.7,204.9 132.6,200.3 L131.8,199.4 Q128.5,195.7 129.4,190.9 L129.4,190.9 Q130.3,186.1 135.1,185.1 L141.4,183.8 Q152.5,181.6 163.4,178.6 L163.5,178.5 Q174.5,175.4 185.8,174.3 L192.5,173.7 Q210.4,172 228,168.5 L228,168.5 Q245.6,165.1 263.4,162.5 L274.3,161 Q284.9,159.4 292.3,151.6 L293.4,150.4 Q299.7,143.7 299.7,134.5 L299.7,133.2 Q299.7,125.4 300.4,117.6 L300.4,117.6 Q301.2,109.7 303.6,117.2 L308.7,133 Q310.4,138.4 312.9,143.4 L312.9,143.4 Q315.3,148.5 320.6,150.5 L322.1,151.1 Q328.9,153.7 323.6,158.7 L321.7,160.5 Q314.4,167.3 306.9,173.7 L302.1,177.6 Q296.2,182.6 288.6,183.5 L287.2,183.7 Q281,184.4 276.9,179.7 L276.9,179.7 Q272.8,174.9 277.2,179.4 L281.3,183.7 Q289.7,192.6 299,200.4 L308.5,208.3 Q315.6,214.3 321,221.8 L321,221.8 Q326.3,229.4 317.6,226.4 L307.6,223 Q294.1,218.4 283.3,209.1 L281.9,207.9 Q272.5,199.7 263.5,191.1 L259.8,187.6 Q254.4,182.5 247.1,183.1 L247.1,183.1 Q239.7,183.7 232.5,185 L216.6,187.8 Q208.8,189.2 202.5,193.7 L202.5,193.7 Q196.1,198.3 188.2,198.6 L187.6,198.7 Q179.1,199 170.7,199.9 L157.6,201.3 Q146.3,202.5 155.3,195.6 L160.1,191.9 Q164.3,188.8 169.3,187.4 L170,187.2 Q174.3,186.1 178.7,185.4 L178.7,185.4 Q183.2,184.7 187,182.4 L187.1,182.3 Q191,180 195.1,182.1 L195.5,182.3 Q200,184.6 201.3,179.7 L201.5,178.8 Q203,173 207.9,176.5 L212.4,179.6 Q217.5,183.2 220.6,177.9 L220.8,177.6 Q223.8,172.7 229.4,173.9 L229.4,173.9 Q235.1,175.1 240.9,175 L241.5,175 Q248,174.9 243.7,170 L242.7,168.8 Q237.8,163.3 232.4,158.4 L232.4,158.4 Q226.9,153.5 220.6,149.7 L219.1,148.8 Q211.3,144.1 203.8,138.8 L202.7,138 Q194.2,131.9 204.6,133.4 L212.4,134.5 Q222.2,135.8 229.6,142.3 L229.6,142.3 Q237.1,148.7 245.7,153.5 L256.5,159.6"
},
    images: {
      medium: "assets/img/looker-chair-medium.webp",
      full: "assets/img/looker-chair-full.jpg"
    },
    gallery: [
    {
      type: "image",
      medium: "assets/img/looker-chair-2-medium.webp",
      full: "assets/img/looker-chair-2-full.jpg",
      caption: "Front view"
    },
    {
      type: "image",
      medium: "assets/img/looker-chair-3-medium.webp",
      full: "assets/img/looker-chair-3-full.jpg",
      caption: "Rear detail, leg assembly"
    },
    {
      type: "image",
      medium: "assets/img/looker-chair-4-medium.webp",
      full: "assets/img/looker-chair-4-full.jpg",
      caption: "Rear view",
      wide: true
    }
  ]
  },
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
  entry: [94.7, 398.1],
  exit: [337.6, 128.8],
  path: "M94.7,398.1 L97.3,384 Q99.8,369.8 105.4,356.6 L110.4,344.6 Q114.7,334.5 122.9,327.4 L122.9,327.4 Q131.1,320.2 142,319 L145.2,318.6 Q156.3,317.4 167.3,320 L167.3,320 Q178.2,322.7 187.8,328.6 L191.4,330.9 Q204.7,339.2 213.4,352.1 L222.7,365.8 Q229.7,376.1 233,388.1 L234.4,393.2 Q236.3,400 235.8,393 L235.8,393 Q235.3,385.9 231.7,379.8 L219.2,358.3 Q214.9,351 212.4,343 L212.4,343 Q209.8,335 209.8,326.6 L209.8,320.6 Q209.8,306.3 211.8,292.1 L219.2,240.5 Q219.9,235.7 224.6,236.8 L224.6,236.8 Q229.3,237.8 233.4,235.4 L238.2,232.7 Q247.1,227.6 253.5,219.5 L269,200 Q273.9,193.9 275.8,186.3 L275.8,186.3 Q277.8,178.7 284.6,174.8 L308.6,160.9 Q322.4,152.9 332.7,140.7 L339.5,132.5 Q343.4,127.7 337.6,125.7 L337.6,125.7 Q331.7,123.7 325.5,124.5 L286.3,129.8 Q270.4,131.9 254.5,132.4 L202.3,134.1 Q186.3,134.6 170.6,137.6 L167.3,138.3 Q153.8,140.8 141.8,147.5 L137.2,150.1 Q129.8,154.2 126.8,162.1 L125.9,164.5 Q123.8,170 127.7,174.5 L127.7,174.5 Q131.6,179 137.1,181.1 L141.5,182.7 Q151.5,186.4 162.1,186.4 L162.9,186.4 Q174.2,186.5 185.2,183.6 L195.3,181 Q210.8,176.9 226.7,176 L239.4,175.2 Q255.4,174.3 270.3,168.6 L333.1,144.8 Q348.1,139.1 332.1,138.6 L330.8,138.6 Q314.8,138.1 299,140.1 L253.1,146 Q242.4,147.3 249.1,155.8 L249.1,155.8 Q255.8,164.3 264.2,171.3 L294.3,196.3 Q305.6,205.7 319.1,211.5 L324.1,213.6 Q332.6,217.3 333.6,208.1 L333.6,208.1 Q334.5,198.9 329.9,191 L329,189.5 Q323.4,180.1 313.4,175.7 L287.2,164.3 Q276.5,159.7 268.1,151.5 L268.1,151.5 Q259.7,143.3 248.9,138.6 L241,135.2 Q234,132.2 228.6,126.9 L228.2,126.5 Q223.2,121.6 219.9,115.5 L219.9,115.5 Q216.7,109.3 216.4,102.3 L215.7,85.3 Q215.5,80.8 217.2,76.6 L217.3,76.1 Q218.8,72.3 222.9,72.2 L222.9,72.2 Q227,72.1 229.7,75.1 L238,84.2 Q246.3,93.4 249.9,105.1 L252,111.8 Q253.6,116.9 253,122.3 L253,122.3 Q252.5,127.7 247.6,129.9 L233.8,136.1 Q226.1,139.6 217.6,140 L212.4,140.3 Q209.1,140.5 211.8,142.3 L213.3,143.3 Q214.6,144.2 216.1,143.7 L216.1,143.7 Q217.5,143.2 216.9,141.8 L216.7,141.5 Q215.8,139.7 214,138.9 L211.5,137.8 Q207.1,136 205.5,140.4 L204.9,141.9 Q203,147 198.5,143.7 L196.4,142.1 Q194.1,140.4 194,143.3 L194,143.3 Q193.8,146.2 196.6,147 L197.2,147.1 Q200.6,148.1 197.3,146.8 L196,146.3 Q191.3,144.6 189,149 L188.2,150.5 Q186.6,153.7 186.6,150.1 L186.7,149.7 Q186.7,146.4 183.7,145.3 L182.9,145 Q180.6,144.1 181.5,146.4 L181.5,146.4 Q182.4,148.6 180,148.4 L171.4,147.4 Q169.8,147.3 169.5,148.8 L169.5,148.8 Q169.1,150.4 170.6,151 L172.2,151.6 Q175.4,152.9 172.1,152 L169.3,151.2 Q165.9,150.3 164,153.2 L163.2,154.5 Q162.1,156.2 164.2,156.2 L164.3,156.2 Q166.2,156.3 167.9,155.5 L167.9,155.5 Q169.5,154.6 168.5,153.1 L168.4,153.1 Q167.3,151.5 165.4,151.7 L162,152.1 Q156.7,152.7 162,151.8 L248,137.1 Q263.8,134.4 279.8,133.3 L323.2,130.2 Q326.2,130 328.7,128.2 L328.7,128.2 Q331.2,126.5 331.9,123.6 L334.1,113.8 Q336,105.5 340.6,98.4 L340.6,98.4 Q345.2,91.3 343.5,99.6 L337.6,128.8"
},
    images: {
      medium: "assets/img/transit-lock-medium.webp",
      full: "assets/img/transit-lock-full.jpg"
    },
    gallery: [
    {
      type: "image",
      pos: [1, 1],
      medium: "assets/img/transit-lock-medium.webp",
      full: "assets/img/transit-lock-full.jpg",
      caption: "The finished study model"
    },
    {
      type: "image",
      pos: [1, 2],
      medium: "assets/img/transit-lock-2-medium.webp",
      full: "assets/img/transit-lock-2-full.jpg",
      caption: "Rear view of the chipboard study model"
    },
    {
      type: "image",
      wide: true,
      medium: "assets/img/transit-lock-3-medium.webp",
      full: "assets/img/transit-lock-3-full.jpg",
      caption: "Storyboard: slide the case in, sit, the bolt locks"
    }
  ]
  }
  ]
};
