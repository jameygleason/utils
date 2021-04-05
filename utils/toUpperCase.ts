type ToUpperCaseReturn = [string | null, Error | null]

/**
 * toUpperCase capitalizes the first letter of all the words in a string
 */
export function toUpperCase(input: string): ToUpperCaseReturn {
  try {
    const inputStr = input.trim().replace(/\s{2,}/g, " ")
    const splitStr = inputStr.split(" ")
    const upperCaseStr = splitStr
      .map(n => {
        let str: string = ""
        const letters: string[] = n.split("")
        letters[0] = letters[0].toUpperCase()
        str = letters.join("")
        return str
      })
      .join(" ")
    if (upperCaseStr === null) {
      return [
        null,
        { name: "#653487289", message: "upperCaseStr cannot be null" },
      ]
    }
    return [upperCaseStr, null]
  } catch (err) {
    return [
      null,
      {
        name: "#489357729",
        message: err,
      },
    ]
  }
}
