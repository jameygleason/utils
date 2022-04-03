/**
 * Adds a space character before non-consecutive capital letters
 */
export function decamel(str: string): string {
	let newStr = ""

	for (let i = 0; i < str.length; i++) {
		// If the next character is a capital letter
		if (str[i + 1] && str[i + 1].charCodeAt(0) < 97) {
			newStr = newStr + str[i] + " "
			i++

			if (i >= str.length - 1) {
				newStr = newStr + str[i]
				break
			}

			while (str[i] && str[i].charCodeAt(0) < 97) {
				if (str[i + 1] && str[i + 1].charCodeAt(0) < 97) {
					newStr = newStr + str[i]
					i++
					continue
				}

				if (i >= str.length - 1) {
					newStr = newStr + str[i]
					break
				}

				if (str[i - 1] && str[i - 1].charCodeAt(0) < 97) {
					newStr = newStr + " " + str[i]
					break
				}

				newStr = newStr + str[i]
				break
			}

			continue
		}

		newStr = newStr + str[i]
	}

	return newStr
}
