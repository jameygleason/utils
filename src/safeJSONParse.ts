/**
 * Safe JSON parse
 * If the param string is valid JSON, safeJSONParse returns the parsed JSON and null for the error value
 *
 * If the param string is *not* valid JSON, safeJSONParse returns the original string and an error message to let the consumer know it is not valid JSON
 */
type SafeJSONParseReturn = [Record<any, any> | any[] | string, Error | null]

export function safeJSONParse(str: string): SafeJSONParseReturn {
	try {
		if (str.constructor === Number) {
			return [
				str,
				{
					name: "#89754824",
					message: 'Input type "number" is not valid JSON',
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
