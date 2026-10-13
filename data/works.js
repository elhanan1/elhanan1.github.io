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
    id: "lamp",
    title: "Halo Desk Lamp",
    year: 2023,
    category: "Lighting",
    size: "large",
    blurb: "An articulated desk lamp with a spun-aluminium shade that rotates a full 340°.",
    intro: "Halo began as a study in counterweights: how far a shade can reach from its base before the whole fixture feels like it wants to tip. The result is a single-arm lamp that balances on a hidden steel weight, letting the shade hover wherever it's placed without a locking joint.",
    process: "Early models were built from foam core and brass rod to find the balance point by feel before any math was involved. Once the ratio of arm length to counterweight was locked, the shade went through six rounds of spinning on the lathe to get the taper right — too steep and the light pools, too shallow and it floods.",
    materials: ["Spun aluminium shade", "Powder-coated steel arm", "Brass pivot joints", "Weighted cast-iron base"],
    sketch: {
  viewBox: "0 0 400 400",
  entry: [155.4, 0],
  exit: [264.4, 400],
  path: "M155.4,0 L155.4,5.3 Q155.4,10.6 159.5,14 L180.8,32.1 Q193,42.5 190.9,58.3 L190.4,62.3 Q188.4,78.1 182.1,92.8 L177.6,103.5 Q171.3,118.2 176.7,133.2 L186.9,161.4 Q191.1,173.1 201.4,179.9 L201.4,179.9 Q211.8,186.8 200.6,192.1 L195.3,194.6 Q180.9,201.4 189.8,214.7 L193.4,219.9 Q202.3,233.2 189.6,242.9 L126.6,291.4 Q113.9,301.1 129.5,304.6 L253.4,332.4 Q269,335.9 253.3,339.2 L144,362.6 Q128.4,365.9 144,369.7 L263.7,398.4 Q264.4,398.5 264.4,399.3 L264.4,400"
},
    glow: { source: "photo" },
    images: {
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBsU7GQZrahbKCqQsAGyKvxR7VxXlys9jtHUUUVABTu1FFNAxtFFFID/9k=",
      medium: "assets/img/lamp-medium.webp",
      full: "assets/img/lamp-full.jpg"
    },
    gallery: [
    {
      type: "image",
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC6tiAKkSPyqt1XuCRXlXbO0lD8UVEgJUUUii4QKhmUZooqzMRQMUUUVBR//9k=",
      medium: "assets/img/lamp-2-medium.webp",
      full: "assets/img/lamp-2-full.jpg",
      caption: "Shade detail, 1:2 scale"
    },
    {
      type: "image",
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDcop22mMQvWvJsdotFQmdQetFFgLi9KoagxUcGiitUQZgdj3ooooKP/9k=",
      medium: "assets/img/lamp-3-medium.webp",
      full: "assets/img/lamp-3-full.jpg",
      caption: "Arm joint and counterweight study"
    }
  ]
  },
  {
    id: "chair",
    title: "Fold Lounge Chair",
    year: 2022,
    category: "Furniture",
    size: "medium",
    blurb: "A lounge chair whose backrest is a single bent plywood sheet, no upholstery needed.",
    intro: "Fold asks how much comfort a single sheet of material can offer if it's bent instead of padded. The backrest is one continuous piece of moulded plywood that flexes under load, so the chair softens exactly where a body needs it to.",
    process: "The bending profile went through over twenty plywood test shells before the curve held its flex without cracking at the veneer. Full-scale mockups in corrugate let us sit-test proportions early, long before committing to a mould.",
    materials: ["Moulded ash plywood", "Solid ash legs", "Natural oil finish"],
    sketch: {
      viewBox: "0 0 400 400",
      entry: [137.2, 0], exit: [121.9, 400],
      path: "M137.2,0 L137.2,4.2 Q137.2,8.4 139.7,11.8 L174.2,59 Q182.4,70.2 181.7,84 L181.4,89.5 Q181,97.8 175.6,104.2 L175.6,104.2 Q170.3,110.6 168.5,118.7 L165.3,133.3 Q163.1,143 157.8,151.5 L157.8,151.5 Q152.4,159.9 155.4,169.4 L156.4,172.4 Q160.3,185 170,193.8 L171.2,194.9 Q182,204.8 196.3,208.3 L202.5,209.8 Q218,213.7 221.2,229.4 L222.1,234.2 Q225.3,249.9 215.9,262.9 L204.8,278.3 Q198.1,287.7 186.5,288.2 L186.5,288.2 Q175,288.7 163.6,286.3 L144.6,282.4 Q128.9,279.1 127.7,263.1 L127.6,261 Q126.4,245 141.9,241.4 L145.1,240.6 Q160.7,236.9 174,245.8 L178.6,248.8 Q191.2,257.2 199,270.2 L199.4,271 Q206.8,283.2 207.2,297.4 L207.2,297.4 Q207.7,311.7 195.3,318.7 L193.5,319.7 Q180.2,327.3 193.4,335.1 L193.4,335.1 Q206.5,342.9 221.3,339.2 L226.8,337.8 Q242.3,333.9 247.2,318.7 L252.4,302.1 Q257.3,286.9 257.6,270.9 L257.9,254.6 Q258.1,238.6 258.5,222.7 L258.7,208.5 Q259,196.1 258.8,183.6 L258.8,183.6 Q258.6,171.2 246.2,171.2 L228.4,171.2 Q212.4,171.2 196.4,171.2 L188.7,171.2 Q172.7,171.2 156.9,173.7 L152.2,174.4 Q136.4,176.9 129.9,191.5 L124.8,202.8 Q118.3,217.4 118.9,233.4 L119.5,253.4 Q120.1,269.4 120.1,285.4 L120.1,359.1 Q120.1,372 121,384.8 L121.8,396.3 Q121.9,397.6 121.9,398.8 L121.9,400"
    },
    glow: { source: "photo" },
    images: {
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC5bSK3Sn3gBiNZFlcbTyauyT+YuAa5dju3MiVP3hoq6YcnOKKrmDkM1WIPFaFqc9aKKJCjuXcCiiiszY//2Q==",
      medium: "assets/img/chair-medium.webp",
      full: "assets/img/chair-full.jpg"
    },
    gallery: [
    {
      type: "image",
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCaSUh6uW7blrBlutz5FadlcgpXNY7m0zRxRVcz80UgscuetaFiaKKuWxMdy/RRRWRsf//Z",
      medium: "assets/img/chair-2-medium.webp",
      full: "assets/img/chair-2-full.jpg",
      caption: "Corrugate sit-test mockup"
    },
    {
      type: "image",
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwB7HmkcgLRMDt4rPlmcZFcqVz0W7CvMQxFFVSSTmirsZXN0jIqnPGvpRRWaNZEHlr6UUUVZmf/Z",
      medium: "assets/img/chair-3-medium.webp",
      full: "assets/img/chair-3-full.jpg",
      caption: "Plywood bending jig"
    }
  ]
  },
  {
    id: "headphones",
    title: "Aura Headphones",
    year: 2024,
    category: "Electronics",
    size: "small",
    blurb: "Over-ear headphones with a self-adjusting headband and no visible hinges.",
    intro: "Aura hides every adjustment mechanism inside a headband that reads as one continuous band. A spring-steel core lets the band flex to fit the wearer rather than being manually sized, so the only visible parts are the smooth outer shell and the two ear cups.",
    process: "The headband went through FEA stress testing to tune the spring-steel core's flex before it was ever built by hand. Clay models were used to resolve how the ear-cup swivel sits flush against the headband at every angle.",
    materials: ["Spring-steel headband core", "Matte-finish bio-based plastic shell", "Memory foam ear cushions"],
    sketch: {
     viewBox: "0 0 400 400",
     entry: [155.4, 0],
     exit: [264.4, 400],
     path: "M155.4,0 L155.4,5.3 Q155.4,10.6 159.5,14 L180.8,32.1 Q193,42.5 190.9,58.3 L190.4,62.3 Q188.4,78.1 182.1,92.8 L177.6,103.5 Q171.3,118.2 176.7,133.2 L186.9,161.4 Q191.1,173.1 201.4,179.9 L201.4,179.9 Q211.8,186.8 200.6,192.1 L195.3,194.6 Q180.9,201.4 189.8,214.7 L193.4,219.9 Q202.3,233.2 189.6,242.9 L126.6,291.4 Q113.9,301.1 129.5,304.6 L253.4,332.4 Q269,335.9 253.3,339.2 L144,362.6 Q128.4,365.9 144,369.7 L263.7,398.4 Q264.4,398.5 264.4,399.3 L264.4,400"
},
    glow: { source: "photo" },
    images: {
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDPaQCnxkP0rMeQk1LazFW5rs5xGkYzmigTAjNFXcDGkHNIvWiisOoy9GfkFFFFaiP/2Q==",
      medium: "assets/img/headphones-medium.webp",
      full: "assets/img/headphones-full.jpg"
    },
    gallery: [
    {
      type: "image",
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDHlkIfFTxMCtVrmNt2QKSIuDiutOzEXqKdGPlGaK0uBL5asORSLCg6Ciipe4DTwaKKKoD/2Q==",
      medium: "assets/img/headphones-2-medium.webp",
      full: "assets/img/headphones-2-full.jpg",
      caption: "Ear cup swivel detail"
    },
    {
      type: "image",
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBsLqo609pFdSM1g/aXx1p0Vy+7rXXziLM0QMhoqdVDqGNFFhmOetLH98UUVAGtEf3YooorVCP/2Q==",
      medium: "assets/img/headphones-3-medium.webp",
      full: "assets/img/headphones-3-full.jpg",
      caption: "Clay study of the headband junction"
    },
    {
      type: "video",
      src: "assets/video/headphones-process.mp4",
      caption: "Turntable study of the headband flex, early prototype"
    }
  ]
  },
  {
    id: "kettle",
    title: "Ember Kettle",
    year: 2021,
    category: "Kitchenware",
    size: "medium",
    blurb: "A stovetop kettle with a handle that stays cool by sitting outside the steam path.",
    intro: "Ember rethinks where heat actually travels on a kettle. By offsetting the handle from the body's thermal mass and venting steam well clear of the grip, the handle stays cool to the touch even after a full boil on an open flame.",
    process: "Thermal-imaging tests on early prototypes mapped exactly where the body got hottest, which pushed the handle mount further back than the first sketches suggested. The spout angle was tuned over a dozen pours to stop drips without a cap.",
    materials: ["Brushed stainless steel body", "Heat-resistant phenolic handle", "Stainless steel lid knob"],
    sketch: {
      viewBox: "0 0 400 400",
      entry: [150, 0], exit: [236, 400],
      path: "M150,0 L150,330 L150,308 Q146,294 160,290 Q148,276 150,256 Q118,258 110,236 Q104,214 118,198 Q132,184 156,196 Q150,172 162,150 Q170,136 186,128 Q186,114 200,110 Q214,114 214,128 Q226,136 234,150 Q244,164 262,160 Q276,156 274,168 Q270,180 250,186 Q232,196 224,214 Q214,234 212,256 Q232,252 228,288 Q240,292 236,308 L236,330 L236,400"
    },
    glow: { source: "photo" },
    images: {
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDKkuMnirFrddjWeykHmnRA7uKwsrHoXbZsFweaKqruxRWdjYZKi56UsSL6UUU+hPUsgDFFFFSaH//Z",
      medium: "assets/img/kettle-medium.webp",
      full: "assets/img/kettle-full.jpg"
    },
    gallery: [
    {
      type: "image",
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDHklJNWLVy3FUKu2GfMFc7Wh6ClqX/ACzRV5VG0UVma8xyorU05RkUUVrLYxRsjpRRRWJZ/9k=",
      medium: "assets/img/kettle-2-medium.webp",
      full: "assets/img/kettle-2-full.jpg",
      caption: "Handle mount, thermal study"
    },
    {
      type: "image",
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC6owKU9Kihk3VNXEemyq6fMaKsECigdynAeau9qKKYSK7uQx5ooopkH//Z",
      medium: "assets/img/kettle-3-medium.webp",
      full: "assets/img/kettle-3-full.jpg",
      caption: "Spout angle pour tests"
    }
  ]
  },
  {
    id: "vase",
    title: "Still Vase",
    year: 2023,
    category: "Homeware",
    size: "small",
    blurb: "A hand-thrown porcelain vase with a waist narrow enough to hold a single stem steady.",
    intro: "Still is built around one constraint: a single flower should stand upright without wedging or wire. The neck narrows to a precise internal diameter worked out through dozens of thrown tests, holding a stem by friction alone.",
    process: "Thrown on the wheel in batches of five to find a neck diameter that worked across stem thicknesses, from tulip to ranunculus. Glaze tests ran in parallel to land on a finish that reads matte in daylight and soft in lamp light.",
    materials: ["Thrown porcelain", "Satin matte glaze"],
    sketch: {
      viewBox: "0 0 400 400",
      entry: [160, 0], exit: [220, 400],
      path: "M160,0 L160,330 L160,312 Q158,302 168,298 Q146,270 150,236 Q154,206 176,188 Q184,180 182,164 Q180,142 186,118 Q188,104 182,94 Q180,86 190,82 Q200,86 198,94 Q192,104 194,118 Q200,142 198,164 Q196,180 204,188 Q226,206 230,236 Q234,270 212,298 Q222,302 220,312 L220,330 L220,400"
    },
    glow: { source: "photo" },
    images: {
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDPEwzVqBs1lZqxDPsqDOxrUVVW4ytFSBl0CiiqGWU+6KKKKQj/2Q==",
      medium: "assets/img/vase-medium.webp",
      full: "assets/img/vase-full.jpg"
    },
    gallery: [
    {
      type: "image",
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDNe4zTPOINQ0VBmXVuuKKqheKKQEgUbqbIoB4oopgSoo2iiiikB//Z",
      medium: "assets/img/vase-2-medium.webp",
      full: "assets/img/vase-2-full.jpg",
      caption: "Neck diameter test batch"
    },
    {
      type: "image",
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCnHGFNWTgx1EFOakbiOszIz5F+c0U12+c0UyjWwKr3LELRRUiM1jzRRRVDP//Z",
      medium: "assets/img/vase-3-medium.webp",
      full: "assets/img/vase-3-full.jpg",
      caption: "Glaze test tiles"
    }
  ]
  },
  {
    id: "stool",
    title: "Perch Stool",
    year: 2022,
    category: "Furniture",
    size: "large",
    blurb: "A three-legged stacking stool, nested five-deep for storage between uses.",
    intro: "Perch is designed around the stack as much as the seat. Three splayed legs and a dished seat let five stools nest into a column barely taller than one, for spaces that need seating to disappear between uses.",
    process: "Leg splay angle was the whole project: too narrow and the stack wobbles, too wide and stools won't nest tightly. Dozens of 3D-printed scale models got stacked and knocked over on a studio table before the angle was locked.",
    materials: ["Solid beech seat", "Turned beech legs", "Brass leg caps"],
    sketch: {
      viewBox: "0 0 400 400",
      entry: [140, 0], exit: [140, 400],
      path: "M140,0 L140,330 L 148 236 Q 150 226 162 224 Q 200 214 238 224 Q 250 226 252 236 L 260 330 L 252 236 L 210 262 L 216 330 L 210 262 L 252 236 Q 250 226 238 224 Q 200 214 162 224 Q 150 226 148 236 Q150,226 162,224 Q200,214 238,224 Q250,226 252,236 L210,262 L216,330 L210,262 L252,236 L260,330 L252,236 Q250,226 238,224 Q200,214 162,224 Q150,226 148,236 L140,330 L140,400"
    },
    glow: { source: "photo" },
    images: {
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBkcpDVowuCvNUjDgZqPzmXgVzHQaRdc9aKyy7nnNFAi6fuVQf71FFAyRRxRRRSA//Z",
      medium: "assets/img/stool-medium.webp",
      full: "assets/img/stool-full.jpg"
    },
    gallery: [
    {
      type: "image",
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC4kPrUV5ADGaungVUnfcCK5joOekTDkUVptahjmiquKxsP0qlJ96iioGhtFFFAz//Z",
      medium: "assets/img/stool-2-medium.webp",
      full: "assets/img/stool-2-full.jpg",
      caption: "Stacking test, five units"
    },
    {
      type: "image",
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCqaYBtfNOdtpwaBzXMdBZWT5RRUPNFADboAVHAcmiin0EXAoxRRRUlH//Z",
      medium: "assets/img/stool-3-medium.webp",
      full: "assets/img/stool-3-full.jpg",
      caption: "Leg-splay scale models"
    }
  ]
  },
  {
    id: "transit-lock",
    title: "Transit Hold",
    year: 2024,
    category: "Transit furniture",
    size: "large",
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
  entry: [195.8, 0],
  exit: [283.5, 400],
  path: "M195.8,0 L195.8,0.9 Q195.8,1.8 195.8,2.8 L190.1,105.8 Q189.4,119 188.1,132 L188,133.9 Q186.9,145.1 183.3,155.9 L183.3,156 Q179.7,166.6 177.4,177.5 L176.1,183.7 Q175.1,188.5 170.5,190.4 L170.5,190.4 Q165.9,192.2 161.3,193.9 L160.1,194.3 Q154.2,196.4 148.1,197.6 L147.3,197.8 Q141.1,199.1 135.2,201.4 L135.2,201.4 Q129.3,203.7 124,207.1 L123.3,207.5 Q117.8,210.9 113.2,215.6 L111.7,217.1 Q108.6,220.2 108.2,224.5 L108.2,224.5 Q107.7,228.8 111.8,230.2 L112.8,230.6 Q117,232.1 116.7,236.6 L116.7,236.6 Q116.3,241 113.8,244.7 L104.9,257.9 Q98.9,266.7 94.3,276.4 L91.7,281.9 Q89.7,286.1 94.3,286.9 L94.3,286.9 Q98.9,287.8 103.2,286 L107.8,284 Q115,280.9 117.4,273.5 L117.9,272 Q119.9,266 123.6,261 L123.6,261 Q127.4,255.9 131.7,251.4 L132.5,250.6 Q137.3,245.6 131.1,242.2 L131.1,242.2 Q125,238.9 131.2,242.2 L140.8,247.3 Q156.6,255.6 146.8,270.6 L127,300.8 Q117.1,315.9 134.8,312.4 L141.8,311.1 Q152.6,309 156.6,298.8 L156.6,298.8 Q160.6,288.7 158.2,278 L156.6,271.3 Q154.8,263.3 155.9,271.4 L155.9,271.4 Q156.9,279.5 162.1,285.7 L170.5,295.8 Q176.6,303 186,303.5 L186,303.5 Q195.4,304.1 204.8,304.1 L205.3,304.1 Q214.4,304.1 223.4,305.2 L227.1,305.6 Q232.4,306.3 231.8,300.9 L231.8,300.8 Q231.2,295.5 226,296.5 L225.7,296.6 Q220.7,297.5 220.7,292.5 L220.7,292.5 Q220.7,287.4 220.9,282.4 L220.9,280.4 Q221.2,273.3 218.8,280 L215.6,288.8 Q213.5,294.5 208,292 L207.8,291.9 Q202.5,289.5 197.6,286.2 L197.5,286.1 Q192.8,282.9 188.7,279.1 L188.7,279.1 Q184.5,275.3 181.6,270.4 L180.7,268.8 Q178.7,265.6 177.2,262.1 L177.2,262.1 Q175.7,258.7 175.7,254.9 L175.7,252.4 Q175.7,247 175.7,241.5 L175.7,241.5 Q175.7,236.1 175.9,230.7 L176.1,223.8 Q176.2,218.2 178.9,213.3 L178.9,213.3 Q181.7,208.4 187.3,208.4 L187.7,208.4 Q193.8,208.4 199.4,210.6 L199.5,210.7 Q205.3,212.9 210.7,215.9 L211.5,216.3 Q217.7,219.7 224.8,220.2 L225.4,220.2 Q233.1,220.7 240.7,219.5 L247.7,218.3 Q256.1,217 264,214 L264,214 Q271.9,210.9 277.1,204.2 L278.2,202.7 Q282.6,197 277.2,192.2 L277.2,192.1 Q271.9,187.3 264.9,186 L261.8,185.5 Q257.9,184.7 254,184.8 L254,184.8 Q250.1,184.9 251.2,181.2 L252,178.4 Q254,171.8 254.1,164.9 L254.1,160.2 Q254.2,150 255.9,140 L256.9,133.7 Q257.6,130 256.5,126.3 L256.5,126.3 Q255.5,122.7 251.7,122.4 L236.6,121.3 Q226.6,120.6 216.6,119.9 L211.4,119.5 Q206.6,119.2 201.9,119 L201.9,119 Q197.1,118.8 193.6,115.6 L192.9,115.1 Q188.8,111.4 194.3,111.9 L239,116.4 Q247.2,117.2 255.1,119.2 L255.1,119.2 Q263,121.2 261.8,129.3 L260.3,139.6 Q257.7,156.9 249.6,172.4 L249.6,172.4 Q241.4,187.9 224.4,192.1 L195.3,199.1 Q188.7,200.7 189.3,207.5 L189.3,207.5 Q189.9,214.3 196.2,216.9 L263.7,244.6 Q273.5,248.6 281.3,241.3 L283.6,239.1 Q289.1,233.9 296.1,236.6 L296.1,236.6 Q303.1,239.3 303,246.8 L303,250.2 Q302.8,261.2 296.1,269.9 L295.3,271 Q287.8,280.8 281.6,291.5 L276.8,299.8 Q272.3,307.6 265.7,313.6 L265.7,313.6 Q259,319.7 253.3,326.6 L243.1,339 Q238,345.2 230.6,348.4 L230.6,348.4 Q223.1,351.5 217.1,356.8 L214.2,359.3 Q205.3,367.1 194.1,371.2 L184.9,374.6 Q171,379.7 179,367.3 L179,367.3 Q187.1,354.9 199.7,347 L208.8,341.3 Q216.4,336.6 223.6,331.2 L223.6,331.2 Q230.7,325.8 236.9,319.2 L241.5,314.3 Q247.2,308.2 253.4,302.6 L253.4,302.6 Q259.7,297.1 264.6,290.3 L267.4,286.4 Q272.3,279.7 276.4,272.5 L277.3,270.9 Q280.4,265.3 280.4,258.9 L280.4,258.9 Q280.4,252.6 280.9,258.9 L282,271.5 Q283.5,290.4 283.5,309.3 L283.5,400"
},
    glow: { source: "photo" },
    images: {
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDXd8nFNOMVFcSpbrlzyegHU1HYic2vmXUsbFj8pUjGKq4hso+c0VM8WW5ooArXFq0p3tliBjA71EbCb92VdQEbIQngVoD7tOSk0mO47cDznJ70U3ufrRQI/9k=",
      medium: "assets/img/transit-lock-medium.webp",
      full: "assets/img/transit-lock-full.jpg"
    },
    gallery: [
    {
      type: "image",
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDcJzTHiDLSMwjjaSQ4VRkmqxvGMh8t1aM8qcdqpiGN8jEUVM0DSYfjkZopgUL+W5n2qqnYDkgHrUcUDGFm/expn7qpznHvzj6Vepyk+tKwXLalVUKudoGBk5oqrk560UwP/9k=",
      medium: "assets/img/transit-lock-2-medium.webp",
      full: "assets/img/transit-lock-2-full.jpg",
      caption: "Rear view of the chipboard study model"
    },
    {
      type: "image",
      tiny: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAHABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDrFSYSsSy+Wei+lJHHON4eRWycqcdKKKLALCk6xgSSKWHfHWiiigD/2Q==",
      medium: "assets/img/transit-lock-3-medium.webp",
      full: "assets/img/transit-lock-3-full.jpg",
      caption: "Storyboard: slide the case in, sit, the bolt locks"
    }
  ]
  }
  ]
};
