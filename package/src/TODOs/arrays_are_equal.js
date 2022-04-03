import kleur from "kleur"
import { unique_array_values } from "./unique_array_values.js"

export function arrays_are_equal(a, b) {
	if (!a) {
		throw new Error(kleur.red("arrays_are_equal requires two arrays as arguments"))
	}
	if (!b) {
		throw new Error(kleur.red("arrays_are_equal requires two arrays as arguments"))
	}

	let equal = true
	let uniqueValues = []

	if (a === b) {
		equal = true
		return { equal, uniqueValues }
	}

	if (a == null || b == null) {
		uniqueValues = unique_array_values(a, b)
		equal = false
		return { equal, uniqueValues }
	}

	if (a.length !== b.length) {
		uniqueValues = unique_array_values(a, b)
		equal = false
		return { equal, uniqueValues }
	}

	// TODO: Setup sort functionality
	// If you don't care about the order of the elements inside
	// the array, you should sort both arrays here.
	// Please note that calling sort on an array will modify that array.
	// you might want to clone your array first.

	for (let i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) {
			equal = false
			uniqueValues = unique_array_values(a, b)
			return { equal, uniqueValues }
		}
	}

	return { equal, uniqueValues }
}
