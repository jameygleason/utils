type SafeJSONParseReturn = [Object | any[], Error | null]

/**
 * Safe JSON parse
 * if param string is valid JSON, safeJSONParse returns the parsed JSON and null for the error value
 * if param string is *not* valid JSON, safeJSONParse returns the original string and an error message to let the consumer know it is not valid JSON
 */
export function safeJSONParse(str: string): SafeJSONParseReturn {
  try {
    if (str.constructor === Number) {
      return [
        500,
        {
          name: "#89754824",
          message:
            "Number was passed instead of string. may result in unexpected behavior.",
        },
      ]
    }
    return [JSON.parse(str), null]
  } catch (err) {
    return [
      str,
      {
        name: "#48975824",
        message: `String passed was not valid JSON and may result in unexpected behavior\n${err}`,
      },
    ]
  }
}
