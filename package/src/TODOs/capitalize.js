import kleur from "kleur"

export function capitalize(str) {
	if (!str) {
		throw new Error(kleur.red("capitalize requires string as an arguments"))
	}
	const ogStr = str.split("")
	const capitalizedStr = ogStr[0].toUpperCase()
	ogStr[0] = capitalizedStr
	return ogStr.join("")
}
