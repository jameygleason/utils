import emojiRegex from "emoji-regex"

type StripEmojiReturn = [string, Error | null]

export function stripEmojis(str: string): StripEmojiReturn {
  try {
    const splitStr: string[] = str.split(" ")
    const regex = emojiRegex()

    const cleanArr: string[] = []
    for (let i = 0; i < splitStr.length; i++) {
      const match = regex.exec(splitStr[i])
      if (!match) {
        cleanArr.push(splitStr[i])
      }
    }

    const cleanStr = cleanArr.join(" ")

    return [cleanStr, null]
  } catch (err) {
    return ["", err]
  }
}
