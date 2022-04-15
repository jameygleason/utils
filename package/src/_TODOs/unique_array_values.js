import picocolors from "picocolors"

export function unique_array_values(first, second) {
	if (!first) {
		throw new Error(picocolors.red("unique_array_values requires two arrays as arguments"))
	}
	if (!second) {
		throw new Error(picocolors.red("unique_array_values requires two arrays as arguments"))
	}

	let arr1 = first
	let arr2 = second

	// Switch arrays if arr1 is shorter than arr2
	if (arr1.length < arr2.length) {
		;[arr1, arr2] = [arr2, arr1] // eslint-disable-line
	}

	arr1.forEach(val => {
		if (arr2.includes(val)) {
			const idx = arr1.indexOf(val)
			arr1.splice(idx, 1, "")
		}
	})

	const set = [...new Set(arr1)]

	set.forEach(val => {
		if (val === "") {
			const idx = set.indexOf(val)
			set.splice(idx, 1)
		}
	})

	return set
}
