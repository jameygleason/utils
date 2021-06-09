type ToUpperCaseReturn = [string, Error | null]

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

    return [upperCaseStr, null]
  } catch (err) {
    return ["", err]
  }
}
