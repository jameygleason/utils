// https://en.wikipedia.org/wiki/Title_case
// https://capitalizemytitle.com/

export function titleCase(str: string): string {
	try {
		console.error("!!!!!!!!!!!!This function has not been implemented yet!!!!!!!!!!!!!!!")

		let tcStr = ""
		for (let i = 0; i < str.length; i++) {
			tcStr = tcStr.trim()
		}

		return tcStr
	} catch (err) {
		console.error(err)
		return ""
	}
}
