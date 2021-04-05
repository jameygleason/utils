export function unsafeStripHTML(markup: string): string {
  const StrippedString = markup.replace(/(<([^>]+)>)/gi, "")
  return StrippedString
}
