type getFirstNameReturn = [string, Error | null]

/**
 * getFirstName capitalizes the first letter of all the words in a string
 */
export function getFirstName(str: string): getFirstNameReturn {
	try {
		let cleanStr = ""
		for (let i = 0; i < str.length; i++) {
			if (cleanStr !== "" && str[i] === " ") {
				break
			}
			if (cleanStr === "" && str[i] === " ") {
				continue
			}
			if (str[i].charCodeAt(0) >= 65 && str[i].charCodeAt(0) <= 122) {
				cleanStr = cleanStr + str[i]
			}
		}

		return [cleanStr[0].toUpperCase() + cleanStr.slice(1, cleanStr.length).toLowerCase(), null]
	} catch (err) {
		// @ts-ignore
		return ["", err]
	}
}
