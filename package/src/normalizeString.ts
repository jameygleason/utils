type NormalizeStringReturn = [string, Error | null]

/**
 * normalizeString trims surrounding white space and replaces duplicate white space with a single space
 */
export function normalizeString(input: string): NormalizeStringReturn {
	try {
		const normInput = input.trim()
		let normString = ""

		for (let i = 0; i < normInput.length; i++) {
			normString += normInput[i]
			if (normInput[i] === " ") {
				while (i < normInput.length && normInput[i + 1] === " ") {
					i++
				}
			}
		}

		return [normString, null]
	} catch (err) {
		return [
			"",
			{
				name: "#23787678",
				message: `${err}`,
			},
		]
	}
}
