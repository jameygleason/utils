import picocolors from "picocolors"

export function extract_frontmatter(markdown) {
	if (!markdown) {
		throw new Error(picocolors.red("extract_frontmatter requires the contents of a markdown file as an argument"))
	}

	const match = /---\r?\n([\s\S]+?)\r?\n---/.exec(markdown)
	const frontMatter = match[1]
	const content = markdown.slice(match[0].length)

	const metadata = {}
	frontMatter.split("\n").forEach(pair => {
		const colonIndex = pair.indexOf(":")
		metadata[pair.slice(0, colonIndex).trim()] = pair.slice(colonIndex + 1).trim()
	})

	return { frontmatter: metadata, content }
}
