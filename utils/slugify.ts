// Unicode Categories -> http://www.regular-expressions.info/unicode.html

// TODO: Handle encoding accented chars
export function slugify(str: string): [string, Error | null] {
  try {
    const nonSymbolChar = /[^a-zA-Z\u00C0-\u017F\s\d]/gu

    return [
      str
        .replace(nonSymbolChar, " ") // Remove all non-letter chars
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-"), // Replace white spaces with -

      null,
    ]
  } catch (err) {
    return ["", err]
  }
}
