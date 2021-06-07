import { stripEmojis } from "./stripEmojis" // .ts

export function slugify(str: string): [string, Error | null] {
  try {
    const [data, err] = stripEmojis(str)
    if (err !== null) {
      return ["", err]
    }
    return [
      data
        .replace(/[^\w-]+/g, " ") // Remove all non-letter chars
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-"), // Replace white spaces with -
      null,
    ]
  } catch (err) {
    return ["", err]
  }
}
