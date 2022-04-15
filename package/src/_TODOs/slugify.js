import picocolors from "picocolors"

export function slugify(str, removeLeadingNumeral) {
	if (!str) {
		throw new Error(picocolors.red("slugify requires a String as an argument"))
	}

	const normalizeStr = str.toString().toLowerCase().trim()

	let slug = normalizeStr
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/[^\w-]+/g, "") // Remove all non-word chars
		.replace(/--+/g, "-") // Replace multiple - with single -

	if (removeLeadingNumeral) {
		slug = slug.replace(/^\d-/, "")
	}

	return slug
}
