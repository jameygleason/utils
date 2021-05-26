export function slugify(str: string): string {
  return str
    .replace(/[^\w-]+/g, " ") // Remove all non-letter chars
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace white spaces with -
}
