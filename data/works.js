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
    size: "small",
    blurb: "An articulated desk lamp with a spun-aluminium shade that rotates a full 340°.",
    intro: "Halo began as a study in counterweights: how far a shade can reach from its base before the whole fixture feels like it wants to tip. The result is a single-arm lamp that balances on a hidden steel weight, letting the shade hover wherever it's placed without a locking joint.",
    process: "Early models were built from foam core and brass rod to find the balance point by feel before any math was involved. Once the ratio of arm length to counterweight was locked, the shade went through six rounds of spinning on the lathe to get the taper right — too steep and the light pools, too shallow and it floods.",
    materials: ["Spun aluminium shade", "Powder-coated steel arm", "Brass pivot joints", "Weighted cast-iron base"],
    sketch: {
  viewBox: "0 0 400 400",
  entry: [137.6, 395.4],
  exit: [216.3, 400],
  path: "M137.6,395.4 L145.2,289.9 Q146.4,273.9 134.7,263 L119.7,248.9 Q108,238 105.5,222.2 L103.3,208.7 Q101.2,195.8 101.4,182.6 L101.5,181 Q101.6,169.4 106.3,158.9 L106.3,158.9 Q111,148.4 119.6,140.7 L120.3,140.2 Q129.7,131.9 140.8,126.5 L148.6,122.8 Q160.8,116.8 174.2,115.5 L181.9,114.7 Q187.7,114.1 193.3,115.9 L193.3,115.9 Q198.9,117.6 203.4,121.4 L203.9,121.9 Q208.9,126.2 212.6,131.6 L220,142.3 Q226,151.1 229.6,161.2 L229.6,161.2 Q233.1,171.2 232.8,181.9 L232.7,184.2 Q232.5,192.5 228.2,199.6 L228.2,199.6 Q223.8,206.7 217,211.4 L217,211.4 Q210.1,216.2 202,218.3 L198.6,219.1 Q187,222.1 196.5,229.2 L200.7,232.4 Q208.9,238.7 210.5,248.9 L210.8,251.1 Q212,259.1 208.5,266.4 L208.5,266.4 Q205.1,273.8 211.5,278.8 L215.5,282 Q218.1,284 217.7,287.2 L217.7,287.2 Q217.2,290.5 214.8,292.7 L204.9,302.2 Q195.7,310.9 208.4,312 L217.4,312.7 Q221,313 223.3,315.7 L223.3,315.7 Q225.7,318.5 225.7,322.1 L226.1,353.2 Q226.2,368.6 219.9,382.8 L214.4,395 Q213.6,396.9 214.9,398.4 L216.3,400"
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
    size: "small",
    blurb: "A lounge chair whose backrest is a single bent plywood sheet, no upholstery needed.",
    intro: "Fold asks how much comfort a single sheet of material can offer if it's bent instead of padded. The backrest is one continuous piece of moulded plywood that flexes under load, so the chair softens exactly where a body needs it to.",
    process: "The bending profile went through over twenty plywood test shells before the curve held its flex without cracking at the veneer. Full-scale mockups in corrugate let us sit-test proportions early, long before committing to a mould.",
    materials: ["Moulded ash plywood", "Solid ash legs", "Natural oil finish"],
    sketch: {
  viewBox: "0 0 400 400",
  entry: [137.6, 395.4],
  exit: [216.3, 400],
  path: "M137.6,395.4 L145.2,289.9 Q146.4,273.9 134.7,263 L119.7,248.9 Q108,238 105.5,222.2 L103.3,208.7 Q101.2,195.8 101.4,182.6 L101.5,181 Q101.6,169.4 106.3,158.9 L106.3,158.9 Q111,148.4 119.6,140.7 L120.3,140.2 Q129.7,131.9 140.8,126.5 L148.6,122.8 Q160.8,116.8 174.2,115.5 L181.9,114.7 Q187.7,114.1 193.3,115.9 L193.3,115.9 Q198.9,117.6 203.4,121.4 L203.9,121.9 Q208.9,126.2 212.6,131.6 L220,142.3 Q226,151.1 229.6,161.2 L229.6,161.2 Q233.1,171.2 232.8,181.9 L232.7,184.2 Q232.5,192.5 228.2,199.6 L228.2,199.6 Q223.8,206.7 217,211.4 L217,211.4 Q210.1,216.2 202,218.3 L198.6,219.1 Q187,222.1 196.5,229.2 L200.7,232.4 Q208.9,238.7 210.5,248.9 L210.8,251.1 Q212,259.1 208.5,266.4 L208.5,266.4 Q205.1,273.8 211.5,278.8 L215.5,282 Q218.1,284 217.7,287.2 L217.7,287.2 Q217.2,290.5 214.8,292.7 L204.9,302.2 Q195.7,310.9 208.4,312 L217.4,312.7 Q221,313 223.3,315.7 L223.3,315.7 Q225.7,318.5 225.7,322.1 L226.1,353.2 Q226.2,368.6 219.9,382.8 L214.4,395 Q213.6,396.9 214.9,398.4 L216.3,400"
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
  entry: [137.6, 395.4],
  exit: [216.3, 400],
  path: "M137.6,395.4 L145.2,289.9 Q146.4,273.9 134.7,263 L119.7,248.9 Q108,238 105.5,222.2 L103.3,208.7 Q101.2,195.8 101.4,182.6 L101.5,181 Q101.6,169.4 106.3,158.9 L106.3,158.9 Q111,148.4 119.6,140.7 L120.3,140.2 Q129.7,131.9 140.8,126.5 L148.6,122.8 Q160.8,116.8 174.2,115.5 L181.9,114.7 Q187.7,114.1 193.3,115.9 L193.3,115.9 Q198.9,117.6 203.4,121.4 L203.9,121.9 Q208.9,126.2 212.6,131.6 L220,142.3 Q226,151.1 229.6,161.2 L229.6,161.2 Q233.1,171.2 232.8,181.9 L232.7,184.2 Q232.5,192.5 228.2,199.6 L228.2,199.6 Q223.8,206.7 217,211.4 L217,211.4 Q210.1,216.2 202,218.3 L198.6,219.1 Q187,222.1 196.5,229.2 L200.7,232.4 Q208.9,238.7 210.5,248.9 L210.8,251.1 Q212,259.1 208.5,266.4 L208.5,266.4 Q205.1,273.8 211.5,278.8 L215.5,282 Q218.1,284 217.7,287.2 L217.7,287.2 Q217.2,290.5 214.8,292.7 L204.9,302.2 Q195.7,310.9 208.4,312 L217.4,312.7 Q221,313 223.3,315.7 L223.3,315.7 Q225.7,318.5 225.7,322.1 L226.1,353.2 Q226.2,368.6 219.9,382.8 L214.4,395 Q213.6,396.9 214.9,398.4 L216.3,400"
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
    size: "small",
    blurb: "A stovetop kettle with a handle that stays cool by sitting outside the steam path.",
    intro: "Ember rethinks where heat actually travels on a kettle. By offsetting the handle from the body's thermal mass and venting steam well clear of the grip, the handle stays cool to the touch even after a full boil on an open flame.",
    process: "Thermal-imaging tests on early prototypes mapped exactly where the body got hottest, which pushed the handle mount further back than the first sketches suggested. The spout angle was tuned over a dozen pours to stop drips without a cap.",
    materials: ["Brushed stainless steel body", "Heat-resistant phenolic handle", "Stainless steel lid knob"],
    sketch: {
  viewBox: "0 0 400 400",
  entry: [137.6, 395.4],
  exit: [216.3, 400],
  path: "M137.6,395.4 L145.2,289.9 Q146.4,273.9 134.7,263 L119.7,248.9 Q108,238 105.5,222.2 L103.3,208.7 Q101.2,195.8 101.4,182.6 L101.5,181 Q101.6,169.4 106.3,158.9 L106.3,158.9 Q111,148.4 119.6,140.7 L120.3,140.2 Q129.7,131.9 140.8,126.5 L148.6,122.8 Q160.8,116.8 174.2,115.5 L181.9,114.7 Q187.7,114.1 193.3,115.9 L193.3,115.9 Q198.9,117.6 203.4,121.4 L203.9,121.9 Q208.9,126.2 212.6,131.6 L220,142.3 Q226,151.1 229.6,161.2 L229.6,161.2 Q233.1,171.2 232.8,181.9 L232.7,184.2 Q232.5,192.5 228.2,199.6 L228.2,199.6 Q223.8,206.7 217,211.4 L217,211.4 Q210.1,216.2 202,218.3 L198.6,219.1 Q187,222.1 196.5,229.2 L200.7,232.4 Q208.9,238.7 210.5,248.9 L210.8,251.1 Q212,259.1 208.5,266.4 L208.5,266.4 Q205.1,273.8 211.5,278.8 L215.5,282 Q218.1,284 217.7,287.2 L217.7,287.2 Q217.2,290.5 214.8,292.7 L204.9,302.2 Q195.7,310.9 208.4,312 L217.4,312.7 Q221,313 223.3,315.7 L223.3,315.7 Q225.7,318.5 225.7,322.1 L226.1,353.2 Q226.2,368.6 219.9,382.8 L214.4,395 Q213.6,396.9 214.9,398.4 L216.3,400"
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
    size: "small",
    blurb: "A three-legged stacking stool, nested five-deep for storage between uses.",
    intro: "Perch is designed around the stack as much as the seat. Three splayed legs and a dished seat let five stools nest into a column barely taller than one, for spaces that need seating to disappear between uses.",
    process: "Leg splay angle was the whole project: too narrow and the stack wobbles, too wide and stools won't nest tightly. Dozens of 3D-printed scale models got stacked and knocked over on a studio table before the angle was locked.",
    materials: ["Solid beech seat", "Turned beech legs", "Brass leg caps"],
    sketch: {
  viewBox: "0 0 400 400",
  entry: [137.6, 395.4],
  exit: [216.3, 400],
  path: "M137.6,395.4 L145.2,289.9 Q146.4,273.9 134.7,263 L119.7,248.9 Q108,238 105.5,222.2 L103.3,208.7 Q101.2,195.8 101.4,182.6 L101.5,181 Q101.6,169.4 106.3,158.9 L106.3,158.9 Q111,148.4 119.6,140.7 L120.3,140.2 Q129.7,131.9 140.8,126.5 L148.6,122.8 Q160.8,116.8 174.2,115.5 L181.9,114.7 Q187.7,114.1 193.3,115.9 L193.3,115.9 Q198.9,117.6 203.4,121.4 L203.9,121.9 Q208.9,126.2 212.6,131.6 L220,142.3 Q226,151.1 229.6,161.2 L229.6,161.2 Q233.1,171.2 232.8,181.9 L232.7,184.2 Q232.5,192.5 228.2,199.6 L228.2,199.6 Q223.8,206.7 217,211.4 L217,211.4 Q210.1,216.2 202,218.3 L198.6,219.1 Q187,222.1 196.5,229.2 L200.7,232.4 Q208.9,238.7 210.5,248.9 L210.8,251.1 Q212,259.1 208.5,266.4 L208.5,266.4 Q205.1,273.8 211.5,278.8 L215.5,282 Q218.1,284 217.7,287.2 L217.7,287.2 Q217.2,290.5 214.8,292.7 L204.9,302.2 Q195.7,310.9 208.4,312 L217.4,312.7 Q221,313 223.3,315.7 L223.3,315.7 Q225.7,318.5 225.7,322.1 L226.1,353.2 Q226.2,368.6 219.9,382.8 L214.4,395 Q213.6,396.9 214.9,398.4 L216.3,400"
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
