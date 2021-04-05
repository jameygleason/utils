import kleur from "kleur"

export function slugify(str, removeLeadingNumeral) {
  if (!str || typeof str !== "string") {
    throw new Error(kleur.red("slugify requires a String as an argument"))
  }

  const normalizeStr = str.toString().toLowerCase().trim()

  let slug = normalizeStr
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-letter chars
    .replace(/--+/g, "-") // Replace multiple - with single -

  if (removeLeadingNumeral) {
    slug = slug.replace(/^\d-/, "")
  }

  return slug
}
