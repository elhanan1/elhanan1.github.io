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
  entry: [170.3, 140.2],
  exit: [190.7, 337.4],
  path: "M170.3,140.2 L169.7,155.1 Q169.2,167.5 172.8,155.7 L172.8,155.7 Q176.3,143.8 175.5,156.2 L175.4,156.2 Q174.6,168.6 178.2,156.7 L179.7,151.9 Q184.6,135.9 184.1,152.6 L184.1,152.6 Q183.5,169.3 188.3,153.3 L188.4,153.1 Q193.2,137 191.8,153.8 L191.8,153.9 Q190.3,170.7 195.2,154.5 L196.4,150.4 Q201.1,134.9 199.8,151 L199.1,160.2 Q198.6,167.1 200.5,160.5 L200.5,160.5 Q202.5,153.9 202.5,160.8 L202.5,161.9 Q202.5,170 204.4,162.1 L207.9,147.6 Q210.4,137 218.5,129.7 L218.5,129.7 Q226.5,122.3 225.8,133.2 L224.8,148.6 Q223.3,172.1 225.4,148.7 L225.4,148.7 Q227.6,125.2 204.1,123.8 L167,121.6 Q154.1,120.9 156.5,133.6 L156.5,133.6 Q158.8,146.3 155.2,158.8 L152.8,167.1 Q148.4,182.2 136.7,192.8 L132.6,196.5 Q125.1,203.3 115.9,207.6 L112.7,209.2 Q106.8,211.9 103.8,217.7 L102.3,220.4 Q100.7,223.4 101.6,226.6 L101.6,226.6 Q102.5,229.8 105.8,230.3 L122,232.3 Q133.3,233.8 144.3,237.2 L146.8,238 Q155.2,240.6 162.5,245.4 L168.4,249.3 Q169.9,250.3 171.1,249 L171.1,249 Q172.4,247.8 172.8,246 L180,213.5 Q181,208.7 177.1,211.6 L175.4,212.7 Q173.1,214.4 173.3,211.6 L173.3,211.6 Q173.5,208.7 175.2,206.4 L178.7,201.9 Q183.9,195.1 176.9,200.1 L168.1,206.4 Q160.9,211.6 166.1,204.4 L166.1,204.4 Q171.3,197.2 163.9,202 L155,207.6 Q145.5,213.7 151.6,204.2 L151.6,204.2 Q157.7,194.7 148.6,201.3 L145.9,203.2 Q135.8,210.5 143.4,200.6 L143.4,200.6 Q150.9,190.8 140,196.8 L109.5,213.6 Q104.7,216.2 102.3,221.2 L101.4,223.2 Q100,226.3 100.9,229.5 L100.9,229.5 Q101.8,232.7 105,233.6 L105.7,233.8 Q109.7,234.9 113.4,233.2 L113.6,233.1 Q117.6,231.3 115.1,234.8 L111.1,240.4 Q104.7,249.6 101.1,260.2 L97.1,271.7 Q92.8,284.3 103.8,276.6 L106.8,274.5 Q114.7,268.9 117.2,259.6 L117.4,258.7 Q119.7,250.3 125.6,243.8 L125.6,243.8 Q131.5,237.4 140.2,238.2 L156.8,239.9 Q160.2,240.2 160.8,243.6 L160.8,243.6 Q161.3,247.1 159.9,250.2 L149.4,274.9 Q145.2,284.7 143.9,295.3 L143,303.2 Q142.7,305.8 144.8,304.2 L144.8,304.2 Q147,302.6 148.8,300.6 L154.8,294 Q162.7,285.4 165.4,274 L167.9,263.2 Q169.2,257.8 167.7,252.4 L167.7,252.4 Q166.3,247.1 171.8,248 L172.2,248.1 Q178.1,249.2 178.5,243.2 L180.3,215.2 Q181,204 191.2,199.4 L191.2,199.4 Q201.4,194.7 212.2,198 L218.6,199.9 Q230.8,203.7 241.6,196.7 L245.6,194.1 Q252.3,189.7 252.3,181.6 L252.3,181.6 Q252.3,173.6 244.5,171.8 L241.2,171.1 Q230.1,168.6 220.6,174.9 L190.8,194.6 Q185.3,198.3 191.6,200.5 L191.6,200.5 Q197.8,202.6 196.9,209.2 L196.1,215.2 Q195.3,220.2 193.4,224.8 L193.4,224.8 Q191.4,229.5 187.6,232.8 L170.8,247.6 Q167.7,250.3 166.8,254.2 L166.8,254.2 Q165.9,258.2 167.9,261.7 L168.1,262 Q169.9,265.3 172.8,267.8 L172.8,267.8 Q175.6,270.4 179.4,271.1 L192.5,273.9 Q209.3,277.5 226.4,275.3 L251.1,272 Q252.7,271.8 252.5,270.2 L252.5,270.2 Q252.3,268.6 250.7,268.3 L247.3,267.7 Q242.3,266.8 241,261.8 L239.4,255.8 Q236.6,244.9 235.6,256.2 L234.9,264.7 Q234.4,270 230.3,266.6 L229.7,266.1 Q226.2,263.2 230.5,264.8 L230.5,264.8 Q234.8,266.4 234.9,261.8 L235.1,256.9 Q235.5,248.1 235.7,256.9 L235.7,258.8 Q235.8,265.7 236.9,258.9 L237.7,254.1 Q238,252.1 236.6,250.6 L236.6,250.6 Q235.1,249.2 237.1,249 L237.9,249 Q239.4,248.8 240.3,250.1 L240.3,250.1 Q241.2,251.4 240.3,252.6 L237.9,255.6 Q234.8,259.6 236.4,264.4 L237.4,267.5 Q238,269.3 236.4,270.2 L236.4,270.2 Q234.8,271.1 233,270.6 L229.9,269.8 Q228,269.3 228,267.3 L228,267.3 Q228,265.3 226,264.9 L204.7,260.4 Q197.5,258.9 191.6,254.4 L191.6,254.4 Q185.7,249.9 186.2,242.5 L186.5,237.9 Q186.7,234.5 190.1,234.7 L190.3,234.7 Q193.5,234.9 195.3,232.2 L195.3,232.2 Q197.1,229.5 197.1,226.3 L197.1,214.9 Q197.1,209.8 201.4,206.9 L201.4,206.9 Q205.7,204 210.9,204 L223.9,203.8 Q228.7,203.7 232.3,206.9 L232.3,206.9 Q235.8,210.1 239.1,206.6 L244.4,200.6 Q245.5,199.4 247,200.1 L247,200.1 Q248.4,200.8 248.5,202.4 L251.4,246.3 Q252,254.6 248.4,262.1 L248.4,262.1 Q244.8,269.6 246.4,261.4 L251.3,235.4 Q252.7,228.1 257.9,222.7 L257.9,222.7 Q263.1,217.3 270.2,215 L270.4,215 Q277.8,212.6 279.2,220.2 L282.5,238.2 Q283.5,243.8 283.9,238.1 L283.9,238.1 Q284.2,232.4 284.3,238.1 L284.8,276.4 Q284.9,284 278,286.8 L273.3,288.8 Q271,289.7 270.1,287.4 L270.1,287.4 Q269.2,285 269.3,282.6 L269.7,273.9 Q270.3,262.8 273.5,252.2 L276.6,242 Q280.6,228.8 277.6,242.2 L277.6,242.2 Q274.6,255.7 266.9,267.1 L263.1,272.9 Q251.6,290.1 237.1,304.8 L219.2,322.8 Q211.1,330.9 200.2,334.3 L200.2,334.3 Q189.2,337.7 197.2,329.5 L235.1,290.2 Q249.8,275 259.5,256.2 L267.5,240.7 Q269.2,237.4 268.3,233.8 L268.3,233.8 Q267.4,230.2 264.2,228.4 L264.2,228.4 Q260.9,226.6 257.5,228 L255.7,228.8 Q250.5,230.9 254.9,227.4 L262.7,221.3 Q265.9,218.7 263.1,221.8 L263.1,221.8 Q260.2,224.8 263.9,222.8 L267.2,221 Q272,218.4 268.8,222.9 L268.8,222.9 Q265.6,227.3 270.3,224.4 L270.4,224.3 Q275.3,221.2 272.3,226.1 L271.4,227.6 Q268.5,232.4 273.5,229.8 L273.5,229.8 Q278.5,227.3 276.3,232.5 L273.1,239.9 Q271,244.9 274.6,240.8 L274.6,240.8 Q278.1,236.7 275.2,241.3 L265.5,256.6 Q264.5,258.2 264.2,260 L264.2,260 Q263.8,261.7 265.1,260.5 L267.9,257.6 Q272,253.5 268.7,258.2 L253.8,279 Q247.7,287.6 252.5,278.2 L254.1,275.2 Q257.3,268.9 253,274.5 L253,274.5 Q248.7,280 245.2,286.1 L237,299.8 Q234.1,304.8 235.7,299.2 L235.7,299.2 Q237.3,293.6 234.2,298.5 L225.4,312.5 Q223.3,315.9 223.5,311.9 L223.5,311.9 Q223.7,308 221.5,311.3 L212.7,325 Q210,329.1 211.1,324.3 L211.1,324.3 Q212.2,319.5 209.2,323.4 L204.2,330.1 Q201.1,334.2 200,329.1 L200,329.1 Q198.9,324.1 196.2,328.5 L190.7,337.4"
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
  ]
};
