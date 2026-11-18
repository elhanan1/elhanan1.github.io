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
  entry: [113.5, 247.2],
  exit: [280.7, 266.1],
  path: "M113.5,247.2 L108.1,254.1 Q102.7,261 100.6,269.5 L99.2,275.2 Q95.6,289.4 82.9,296.8 L82.6,297.1 Q69.6,304.7 72.1,289.9 L73.3,283 Q76.1,266.9 83,252 L87.2,242.9 Q89.8,237.2 84.2,234.3 L81.5,232.9 Q78.6,231.4 77.5,228.4 L77.5,228.4 Q76.4,225.3 77.2,222.2 L77.9,219.5 Q79.4,213.6 83.2,208.9 L83.9,207.9 Q88.4,202.2 94,197.6 L97.3,194.9 Q106.3,187.6 117,183.3 L117.6,183 Q129,178.5 131.7,166.6 L132.5,162.9 Q136.1,147.3 136.1,131.4 L136.1,126.3 Q136.2,105.3 157.2,105.1 L205.8,104.6 Q214.1,104.6 221.8,107.9 L221.8,107.9 Q229.4,111.2 229.6,119.5 L230.5,156.6 Q230.7,167 220.7,169.8 L215.6,171.1 Q210.7,172.5 207.3,168.6 L207.3,168.6 Q204,164.6 198.9,164.6 L184.6,164.6 Q177.1,164.5 170,162.3 L170,162.3 Q163,160 158.9,153.7 L152.4,143.9 Q149.6,139.4 150.3,134.2 L150.3,134.2 Q151.1,129 155.3,126 L155.7,125.7 Q160.4,122.3 166.1,122 L191.7,120.7 Q197.4,120.4 202.7,122.8 L202.7,122.8 Q207.9,125.1 209.6,130.6 L211.1,135.8 Q214.3,146.6 208.4,156.1 L208.2,156.3 Q202.1,166 202,177.5 L201.9,183.9 Q201.8,189.5 197.4,193 L196.9,193.4 Q193.1,196.5 188.2,196.8 L188.2,196.8 Q183.3,197.1 178.5,196.1 L140.4,188.5 Q131.9,186.7 124.7,191.7 L120.2,194.8 Q117.5,196.6 117.6,199.9 L117.6,199.9 Q117.7,203.2 120,205.4 L126.1,211.3 Q133.3,218.3 142.8,221.4 L144.2,221.9 Q152.2,224.5 160.4,222.2 L160.4,222.2 Q168.6,220 172.5,212.5 L172.8,212.1 Q176.9,204.2 176.7,213.1 L176.7,213.8 Q176.4,223.5 178.7,214.1 L180.1,208 Q181.1,204 184.4,201.4 L184.4,201.4 Q187.6,198.8 191.8,198.7 L196.6,198.5 Q201.6,198.3 205.4,201.5 L205.4,201.5 Q209.3,204.7 214.1,206 L218.4,207.2 Q227.5,209.6 235.3,204.5 L251.5,193.9 Q258.9,189.1 264.3,182 L265.3,180.6 Q269.6,174.9 269.1,167.9 L269.1,167.5 Q268.7,160.8 262.2,159 L262.2,159 Q255.7,157.2 249.5,160 L247.3,160.9 Q239,164.7 231.6,170.1 L199.4,193.8 Q187.6,202.5 181.4,215.8 L180.4,218.2 Q175.3,229.2 173.2,241.1 L172.3,246 Q171.1,253 164.8,256.5 L164.8,256.5 Q158.5,260 151.9,257.4 L94.7,235.4 Q91.9,234.3 88.9,233.8 L87.5,233.6 Q86,233.4 85.8,234.9 L85.8,234.9 Q85.7,236.4 87.1,236.8 L146.4,253.5 Q150,254.6 150.4,258.3 L150.4,258.3 Q150.7,262 149.1,265.4 L145.5,272.9 Q140.2,283.7 137.4,295.4 L131.5,319.4 Q128.3,333 139.3,324.5 L139.3,324.5 Q150.4,316.1 152.2,302.2 L153.4,292 Q154.2,286.2 158.3,282.1 L158.3,282.1 Q162.4,277.9 159.9,272.7 L158.1,268.9 Q153.8,259.9 159.4,268.1 L165.8,277.6 Q169.2,282.6 174.9,285 L174.9,285 Q180.5,287.3 186.7,287.9 L194.2,288.6 Q207.8,289.9 221.5,288.9 L259.8,286.1 Q264.6,285.8 260.5,283.2 L260.5,283.2 Q256.5,280.6 252.6,283.3 L252.3,283.5 Q248.1,286.3 248.8,281.3 L250.1,271.4 Q250.8,266.8 247.8,263.2 L247.8,263.2 Q244.8,259.6 243.5,264.1 L243.2,265.1 Q241.6,270.7 244.8,275.6 L245.5,276.6 Q249.3,282.6 242.4,280.9 L204.9,271.9 Q194.5,269.4 188.1,260.9 L185.4,257.2 Q181.7,252.3 180.9,246.3 L180.6,243.6 Q180.1,240.2 181.6,237.1 L181.7,236.9 Q183.1,234 186.4,233.5 L186.4,233.5 Q189.6,233 191.3,235.8 L194.2,240.9 Q198.3,248 205.9,251 L205.9,251 Q213.5,253.9 221.4,251.7 L231.2,249.1 Q245.3,245.2 258.5,239 L267.3,234.8 Q271.7,232.8 275.5,235.8 L275.5,235.8 Q279.3,238.8 278.8,243.7 L278.7,245.3 Q278,251.8 274,256.9 L257.2,277.9 Q248.5,288.7 241.7,301 L241.7,301 Q235,313.2 223.5,321 L200,336.7 Q192.7,341.6 191.2,350.2 L191,351.7 Q189.7,358.9 186.1,365.2 L186.1,365.2 Q182.5,371.6 188.9,368.1 L196.2,364.2 Q210,356.8 221.6,346.5 L227.2,341.4 Q244.5,326 257.4,306.8 L280.9,271.9 Q289.4,259.2 291.8,244.1 L293.5,233.7 Q294.3,229 292.3,224.8 L292.3,224.8 Q290.3,220.5 286.2,218 L285.9,217.8 Q281.4,215.1 278.5,219.4 L274.4,225.4 Q267.4,235.8 278.2,229.3 L294.1,219.7 Q298.5,217.1 301.4,221.3 L301.4,221.3 Q304.3,225.6 304.5,230.8 L307.6,284.4 Q307.9,290.6 306.5,296.7 L306.5,296.7 Q305.1,302.8 299.1,304.5 L298.9,304.6 Q292.6,306.4 287.9,310.8 L286.1,312.5 Q279.6,318.5 279,309.6 L278.2,294.6 Q277.6,285 279.2,275.5 L280.7,266.1"
},
    images: {
      medium: "assets/img/looker-chair-medium.webp",
      w: 600, h: 800,
      full: "assets/img/looker-chair-full.jpg"
    },
    gallery: [
    {
      type: "image",
      pos: [1, 1],
      medium: "assets/img/looker-chair-2-medium.webp",
      w: 600, h: 800,
      full: "assets/img/looker-chair-2-full.jpg",
    },
    {
      type: "image",
      pos: [1, 2],
      medium: "assets/img/looker-chair-3-medium.webp",
      w: 600, h: 800,
      full: "assets/img/looker-chair-3-full.jpg",
    },
    {
      type: "image",
      wide: true,
      medium: "assets/img/looker-chair-4-medium.webp",
      w: 600, h: 222,
      full: "assets/img/looker-chair-4-full.jpg",
      wide: true
    }
  ]
  },
  {
    id: "bottle-fifo",
    title: "Fast FIFO",
    year: 2026,
    category: "Retail tool",
    size: "small",
    blurb: "A caf\u00e9 restocking tool that draws a whole row of bottles forward at once, so new stock goes in behind.",
    intro: "While working in a caf\u00e9 I kept running into the same "
      + "awkwardness in restocking: to put new bottles in behind the ones "
      + "already on the shelf \u2014 which is what FIFO asks for \u2014 you "
      + "first have to take every bottle out. I designed a device that draws "
      + "the whole row forward in one movement and lets a new bottle be fed "
      + "in from behind, which makes refilling far quicker.",
    process: "This is the first study model: a body cut from corrugated "
      + "plastic, a strip of sheet metal for the rail and a ball of "
      + "plasticine standing in for a bottle, tried in place on a working "
      + "caf\u00e9 fridge rather than on the desk. The storyboard at the end "
      + "of the page sets out the sequence it has to carry out, from taking "
      + "hold of the row to feeding the new bottle in behind it.",
    materials: ["Corrugated plastic", "Sheet metal", "Plasticine"],
    sketch: {
  viewBox: "0 0 400 400",
  entry: [139.5, 259.3],
  exit: [399.6, 129.1],
  path: "M139.5,259.3 L126.1,256.6 Q112.8,253.9 108,241.1 L107.8,240.5 Q102.8,227.1 101.7,212.9 L97.5,156.9 Q96.9,148.3 100.2,140.4 L102.1,135.8 Q103.5,132.5 107.1,131.9 L107.1,131.9 Q110.6,131.4 113.5,133.6 L113.8,133.8 Q116.9,136.3 119,139.7 L143.3,178.6 Q145,181.3 147.4,183.4 L147.4,183.4 Q149.8,185.5 153,185.7 L155.6,185.8 Q161.3,186.2 166.9,184.9 L202.8,176.6 Q218.4,173 234.4,172.2 L274.1,170.1 Q290.1,169.2 305.8,172.1 L325.5,175.7 Q341.3,178.6 350.1,165.2 L352.2,162.1 Q361.1,148.7 374.6,140.2 L385.1,133.6 Q398.6,125 382.6,125.6 L376.1,125.9 Q360.1,126.5 349.7,138.6 L342.3,147.2 Q334.4,156.3 324,162.4 L321,164.1 Q313.5,168.5 304.9,168.4 L304.9,168.4 Q296.2,168.4 288.5,164.6 L278.9,159.9 Q272.7,156.8 265.8,156 L265.8,156 Q259,155.2 252.1,155.8 L204.4,160.3 Q189.8,161.6 175.7,166 L170,167.8 Q161.7,170.3 154.5,165.4 L154.5,165.4 Q147.4,160.5 143,153 L129.4,129.9 Q127.1,126 122.9,124.3 L122.9,124.3 Q118.7,122.7 116.8,126.7 L115.4,129.6 Q112.1,136.6 110.9,144.2 L102.2,198.5 Q99.7,214.3 83.9,217.1 L63.7,220.8 Q48,223.7 34,231.5 L13.8,242.8 Q8.1,246 5.3,252 L4.6,253.7 Q2.6,258 7.2,259.3 L7.2,259.3 Q11.9,260.5 16.4,258.9 L41.3,250.4 Q56.5,245.2 72.3,242.9 L154.4,231 Q164.1,229.6 172.1,224.1 L178.5,219.7 Q180.1,218.6 179.3,216.8 L179.3,216.8 Q178.5,215 176.6,214.8 L173.2,214.4 Q168.2,213.7 165,217.6 L164.1,218.7 Q161.7,221.5 162.7,225 L162.7,225 Q163.7,228.5 167.4,228.6 L173.1,228.7 Q180.6,228.9 187.1,225.2 L190,223.5 Q193.6,221.4 195.5,217.7 L195.5,217.7 Q197.4,214 193.5,212.6 L189.8,211.3 Q184.2,209.4 179.2,212.7 L178.6,213 Q174.2,215.9 172.4,220.9 L172.4,220.9 Q170.7,225.8 175.8,226.8 L181.5,227.9 Q186.2,228.9 190.2,226.2 L190.6,225.9 Q194.2,223.5 195.5,219.4 L196.2,217.2 Q196.9,215.2 196.4,213.2 L196.4,213.2 Q196,211.2 194.1,210.4 L191.6,209.4 Q187.1,207.6 183.3,210.4 L181.8,211.5 Q176.5,215.4 174.4,221.6 L173,226 Q171.5,230.6 175,233.7 L175,233.7 Q178.6,236.9 183.4,237.5 L183.6,237.5 Q188.5,238.1 191.5,234.1 L193.3,231.6 Q196.6,227.3 196.5,221.9 L196.5,220.8 Q196.4,216.5 193.8,213.2 L193.8,213.2 Q191.2,209.8 187,209.1 L184.7,208.7 Q180.2,208 177.5,211.6 L177.5,211.6 Q174.9,215.3 174.7,219.8 L174.5,222.6 Q174.2,229.9 179.5,235 L187.9,243 Q191.4,246.3 195.4,243.5 L195.4,243.5 Q199.3,240.6 200.2,235.8 L201.1,231.4 Q202.1,226.1 200.1,221 L199.8,220.1 Q198.2,215.9 194.2,214 L194.2,214 Q190.2,212.1 193.9,214.5 L199.1,217.9 Q203.4,220.6 208.5,221.2 L208.5,221.2 Q213.5,221.7 217.4,218.4 L218.9,217.1 Q224.3,212.5 231.1,210.7 L272,199.7 Q278.4,198 279.3,204.5 L279.3,204.5 Q280.2,211.1 273.6,211.4 L268.9,211.6 Q257.7,212.2 246.9,215.5 L224.7,222.4 Q209.4,227.2 193.6,229.6 L155.7,235.4 Q139.9,237.9 124.4,242.1 L101.3,248.3 Q85.9,252.5 69.9,253.9 L42.8,256.1 Q31.7,257 21.2,260.4 L21.2,260.4 Q10.7,263.8 21.6,262 L85.5,251.2 Q101.3,248.5 116.3,254.1 L126.1,257.8 Q133,260.4 136.7,266.9 L136.7,266.9 Q140.4,273.3 147.8,274 L222.7,280.8 Q238.7,282.3 254.6,280.8 L297.4,276.8 Q313.4,275.3 329.4,275.1 L360.3,274.6 Q376.3,274.4 379.7,258.8 L394.2,192.3 Q397.6,176.7 398.3,160.7 L399.6,129.1"
},
    //sketch: {
      //viewBox: "0 0 400 400",
      //entry: [48, 292],
      //exit: [330, 196],
      //path: "M48,292 L344,292 Q352,292 352,284 L352,158 Q352,150 344,152 Q312,158 296,186 Q282,210 262,196 Q242,182 226,204 Q210,226 190,210 Q170,194 142,206 Q112,219 96,240 Q78,264 62,276 L48,292 L56,286 L167,249 Q165,220 193,215 Q221,211 219,241 Q217,268 190,266 Q164,264 167,249 L330,196"
    //},
    images: {
      // Transparent background — the page puts the plate behind it.
      cutout: true,
      medium: "assets/img/bottle-fifo-medium.webp",
      w: 600, h: 233,
      full: "assets/img/bottle-fifo-full.webp"
    },
    gallery: [
    {
      type: "image",
      pos: [1, 1],
      medium: "assets/img/bottle-fifo-2-medium.webp",
      w: 600, h: 800,
      full: "assets/img/bottle-fifo-2-full.jpg",
    },
    {
      type: "image",
      pos: [1, 2],
      medium: "assets/img/bottle-fifo-3-medium.webp",
      w: 600, h: 450,
      full: "assets/img/bottle-fifo-3-full.jpg",
    },
    {
      type: "image",
      wide: true,
      medium: "assets/img/bottle-fifo-4-medium.webp",
      w: 600, h: 417,
      full: "assets/img/bottle-fifo-4-full.jpg",
    }
  ]
  },
  {

    id: "looker-chair2",
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
  entry: [142.8, 103.9],
  exit: [293.3, 251.1],
  path: "M142.8,103.9 L216.8,107.6 Q232.8,108.4 232,124.3 L230.8,147.4 Q230,163.4 244.5,170.1 L250.5,172.8 Q265,179.5 252.9,190 L246.5,195.6 Q234.4,206.1 218.6,204.3 L197.6,201.9 Q181.7,200 178.1,215.6 L171.9,242.8 Q168.3,258.4 152.7,255 L95.1,242.8 Q79.4,239.5 84.8,224.4 L88.5,214 Q93.9,198.9 108.5,192.4 L119.3,187.6 Q133.9,181.1 136.3,165.3 L142,127.6 Q143.9,115 156.4,117.3 L156.4,117.3 Q168.9,119.5 170.6,132.1 L172.9,149.2 Q175,165 181.7,150.5 L186.6,140.1 Q193.3,125.6 197.4,141.1 L200.4,152.9 Q204.4,168.4 207.1,152.6 L209.2,140.8 Q211.7,126.1 197.2,122.5 L197.2,122.5 Q182.8,118.9 170.7,127.6 L167.4,130 Q157.2,137.3 158.1,149.8 L158.1,149.8 Q158.9,162.3 171,165.3 L180.2,167.7 Q191.7,170.6 201.7,164.2 L201.7,164.2 Q211.7,157.8 206.1,168.3 L198.1,183.2 Q190.6,197.3 178.3,207.6 L171.1,213.6 Q158.9,223.9 143.9,218.3 L126.9,211.8 Q117.8,208.4 121.1,199.2 L121.1,199.2 Q124.4,190 134.2,189.2 L137.2,188.9 Q149.4,187.8 160.6,193.1 L160.6,193.1 Q171.7,198.4 161.4,205.1 L153.9,210.1 Q140.6,218.9 149.5,205.7 L150.2,204.6 Q158.9,191.7 144.7,198.1 L138,201.1 Q130.6,204.5 134.4,197.3 L134.4,197.3 Q138.3,190 140.1,198 L149.9,242.7 Q153.3,258.4 148.4,273.6 L132.7,322.6 Q127.8,337.8 140.2,327.8 L146.4,322.8 Q158.9,312.8 164.7,297.9 L165.3,296.1 Q171.1,281.1 157.1,273.5 L127.4,257.2 Q113.3,249.5 106.3,263.8 L97.2,282.1 Q91.7,293.4 80,298.1 L80,298.1 Q68.3,302.8 72.6,291 L84,259 Q89.4,243.9 104.2,250.2 L197.5,289.9 Q212.2,296.1 228.2,295.4 L246.2,294.6 Q262.2,293.9 256.3,279.1 L253.7,272.7 Q247.8,257.8 245.2,273.6 L243.2,285.5 Q242.2,291.7 237.8,287.3 L237.8,287.3 Q233.3,282.8 227.3,281 L223.1,279.8 Q212.8,276.7 204.2,270.3 L194.5,263 Q181.7,253.4 195.3,244.9 L248.3,211.9 Q259.4,205 262.2,217.8 L262.9,221 Q265,230.6 273.3,225.3 L273.3,225.3 Q281.7,220 290.2,225 L291.7,225.9 Q301.7,231.7 300.1,243.2 L299.4,247.5 Q297.2,263.4 288.5,276.8 L280.4,289.4 Q271.7,302.8 260.4,314.1 L248,326.5 Q236.7,337.8 223.1,346.3 L204.5,358 Q193.3,365 199.4,353.4 L199.4,353.4 Q205.6,341.7 215.8,333.4 L225.3,325.7 Q237.8,315.6 247.9,303.2 L269.8,276.7 Q276.7,268.4 278.9,257.8 L279.5,255.1 Q281.1,247.3 279.2,239.5 L279.2,239.5 Q277.2,231.7 278.6,239.6 L288.3,293.3 Q290,302.8 296.7,295.9 L296.7,295.9 Q303.3,288.9 298.4,280.7 L298.3,280.6 Q293.3,272.3 293.3,262.5 L293.3,251.1"
},
    images: {
      medium: "assets/img/looker-chair-medium.webp",
      w: 600, h: 800,
      full: "assets/img/looker-chair-full.jpg"
    },
    gallery: [
    {
      type: "image",
      pos: [1, 1],
      medium: "assets/img/looker-chair-2-medium.webp",
      w: 600, h: 800,
      full: "assets/img/looker-chair-2-full.jpg",
    },
    {
      type: "image",
      pos: [1, 2],
      medium: "assets/img/looker-chair-3-medium.webp",
      w: 600, h: 800,
      full: "assets/img/looker-chair-3-full.jpg",
    },
    {
      type: "image",
      wide: true,
      medium: "assets/img/looker-chair-4-medium.webp",
      w: 600, h: 222,
      full: "assets/img/looker-chair-4-full.jpg",
      wide: true
    }
  ]
  
  }
  ],

  /* The degree, course by course.

     Each year holds its courses, and every course is a works page of its
     own: the same feed of cards, the same sketches, the same project
     pages behind them. A course's `works` list takes either the id of a
     work from the `works` array above — so a work can show in both
     places without being written out twice — or a whole work object
     of its own, in exactly the shape used above (id, title, year,
     category, size, blurb, intro, process, materials, sketch, images,
     gallery).

     So both of these are fine, side by side:

       works: [
         "looker-chair",          // the work above, shown here too
         { id: "sketch-studies", title: "Sketch studies", ... }
       ]

     `short` is what the Back link on a work says when it was opened
     from that course, for a title too long to sit in one; leave it out
     and the full title is used. `blurb` on a year or a course is the
     line under its heading — leave it out and nothing is drawn.
     Adding a year is copying the whole year object and changing its id,
     title and courses. */
  studies: {
    // Under the Studies heading. Leave it empty and the line is left out.
    intro: "Course work from my industrial design degree, year by year.",
    years: [
      {
        id: "year-1",
        title: "Year one",
        blurb: "",
        courses: [
          {
            id: "structure-function-form",
            title: "Studio: Structure. Function. Form.",
            short: "Structure. Function. Form.",
            blurb: "",
            works: [
              {
                id: "box",
                title: "Box",
                year: 2026,
                category: "Studio exercise",
                size: "medium",
                blurb: "One box, with a different pattern cut into each of "
                  + "its faces.",
                intro: "The first exercise is a single volume: one box, and "
                  + "what happens to it when its faces are worked on. Each "
                  + "side carries a pattern of its own \u2014 parallel "
                  + "diagonals on one, a woven zigzag on another \u2014 cut "
                  + "into the board rather than drawn onto it, so the face "
                  + "keeps one colour and the pattern shows only where an "
                  + "edge stands up off it.",
                process: "The lines are scored and the strip beside each one "
                  + "lifted, which leaves the surface its own colour and "
                  + "gives it a shadow. The inside of the box is cut the "
                  + "same way as the outside, so the pattern carries on "
                  + "across the fold rather than stopping at the corner.",
                materials: ["Cardboard"],
                images: {
                  medium: "assets/img/box-medium.webp",
                  w: 600, h: 800,
                  full: "assets/img/box-full.jpg"
                },
                gallery: [
                  {
                    type: "image",
                    medium: "assets/img/box-2-medium.webp",
                    w: 600, h: 800,
                    full: "assets/img/box-2-full.jpg"
                  }
                ]
              },
              {
                id: "many-boxes",
                title: "Many boxes",
                year: 2026,
                category: "Studio exercise",
                size: "large",
                blurb: "Several boxes in one body, set around a curve the "
                  + "whole thing rocks on.",
                intro: "The second exercise takes the single box and "
                  + "multiplies it. The volumes share their walls, and where "
                  + "those walls meet they cross into the X frames that hold "
                  + "the piece open; the openings between them are the boxes "
                  + "themselves. The outer edges are curved, so it stands on "
                  + "an arc and rocks rather than sitting flat.",
                process: "Cut from the same board as the first exercise, "
                  + "white on the outside and left as it is within, so each "
                  + "opening reads darker than the frame around it. A bamboo "
                  + "skewer runs through the top edge, where the upper "
                  + "panels meet.",
                materials: ["Cardboard", "Bamboo skewer"],
                images: {
                  medium: "assets/img/many-boxes-medium.webp",
                  w: 600, h: 800,
                  full: "assets/img/many-boxes-full.jpg"
                },
                gallery: [
                  {
                    type: "image",
                    pos: [1, 1],
                    medium: "assets/img/many-boxes-2-medium.webp",
                    w: 600, h: 800,
                    full: "assets/img/many-boxes-2-full.jpg"
                  },
                  {
                    type: "image",
                    pos: [1, 2],
                    medium: "assets/img/many-boxes-3-medium.webp",
                    w: 600, h: 800,
                    full: "assets/img/many-boxes-3-full.jpg"
                  },
                  {
                    type: "image",
                    medium: "assets/img/many-boxes-4-medium.webp",
                    w: 600, h: 800,
                    full: "assets/img/many-boxes-4-full.jpg"
                  }
                ]
              }
            ]
          },
          {
            id: "studio-a",
            title: "Studio A",
            blurb: "",
            works: []
          },
          {
            id: "technology",
            title: "Technology",
            blurb: "",
            works: []
          },
          {
            id: "drawing",
            title: "Drawing",
            blurb: "",
            works: [
              {
                id: "milo-study",
                title: "Milo of Croton",
                year: 2026,
                category: "Drawing exercise",
                size: "medium",
                blurb: "A copy after Puget's Milo of Croton: straight "
                  + "lines first, tone last.",
                intro: "The course draws from printed plates. The plate goes "
                  + "up on the board beside an empty sheet and the figure is "
                  + "measured across onto it by eye, at the same size. This "
                  + "one is after Pierre Puget's Milo of Croton, taken as far "
                  + "as the chest, the near arm and the turn of the head.",
                process: "Everything is laid in straight first \u2014 the "
                  + "blocked-in sheet below is that stage: the outline of the "
                  + "whole figure as a run of flat angles, then the longer "
                  + "ones inside it, the shoulder, the ribs, the line of the "
                  + "thigh, each one a straight line standing in for the "
                  + "curve it will become. The faint horizontal and vertical "
                  + "across the sheet are carried over from the plate, and "
                  + "everything is measured against them. Only once a shape "
                  + "is boxed in does it get its curve, and the tone goes on "
                  + "last, over a drawing whose edges are already decided.",
                materials: ["Graphite on paper"],
                images: {
                  medium: "assets/img/milo-study-medium.webp",
                  w: 600, h: 800,
                  full: "assets/img/milo-study-full.jpg"
                },
                gallery: [
                  {
                    type: "image",
                    pos: [1, 1],
                    caption: "The same sheet, blocked in.",
                    medium: "assets/img/milo-study-2-medium.webp",
                    w: 600, h: 799,
                    full: "assets/img/milo-study-2-full.jpg"
                  },
                  {
                    type: "image",
                    pos: [1, 2],
                    caption: "The plate it was drawn from.",
                    medium: "assets/img/milo-study-3-medium.webp",
                    w: 600, h: 894,
                    full: "assets/img/milo-study-3-full.jpg"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
