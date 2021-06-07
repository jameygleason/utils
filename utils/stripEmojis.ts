import emojiRegex from "emoji-regex"

type StripEmojiReturn = [string, Error | null]

export function stripEmojis(input: string): StripEmojiReturn {
  try {
    // https://mathiasbynens.be/notes/javascript-unicode#accounting-for-astral-symbols
    const regex = emojiRegex()
    const extLatinCharsRegex = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s\d]*)$/
    const encoder = new TextEncoder()
    const str = input.replace(regex, "")

    let cleanStr = ""
    for (let i = 0; i < str.length; i++) {
      if (!!UTF8toStr(encoder.encode(str[i])) !== false || extLatinCharsRegex.exec(str[i])) {
        cleanStr = cleanStr + str[i]
      }
    }

    return [cleanStr, null]
  } catch (err) {
    return ["", err]
  }
}

function UTF8toStr(ba) {
  return decodeURIComponent(
    ba.reduce((p, c) => {
      return p + "%" + c.toString(16), ""
    }),
  )
}
