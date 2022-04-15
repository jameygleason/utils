import fs from "fs"
import path from "path"
import picocolors from "picocolors"
import { rimraf } from "./rimraf.js"
import { arrays_are_equal } from "./arrays_are_equal.js"

export async function json_cacher(dir, data, { collectionName }) {
	const collections = []
	const dataDirPath = path.join(dir)

	if (typeof data !== "object") {
		console.warn("The data passed to json_cacher was not of type 'Object'. This may have unintended consequences.")
	}

	if (!collectionName) {
		throw new Error(
			picocolors.red(
				"json_cacher requires a collectionName key as a part of the options Object in the second argument",
			),
		)
	}

	const dirPath = path.join(dataDirPath, collectionName)

	// If the data dir doesn't exist, make fresh data folder
	if (!fs.existsSync(dataDirPath)) {
		fs.mkdirSync(dataDirPath)
	}

	// If the nested dir doesn't exist, make fresh folder
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath)
	}

	// Register collection for smart caching
	collections.push(collectionName)
	const nestedDirs = fs.readdirSync(dataDirPath)

	const { equal, uniqueValues } = arrays_are_equal(collections, nestedDirs)
	if (!equal) {
		uniqueValues.forEach(val => un_cache(val))
	}

	const JSONFilePath = path.join(dirPath, "index.json")
	const JSFilePath = path.join(dirPath, "index.js")

	// If you are in development, write JSON files for easy readability
	if (process.env.NODE_ENV === "development") {
		fs.writeFileSync(JSONFilePath, JSON.stringify(data, null, 2), "utf-8")
	}

	// Finally, write JS file with JSON string that gets used in the UI
	fs.writeFileSync(
		JSFilePath,
		`const ${collectionName}=\`${JSON.stringify(data)}\`;export default ${collectionName};`,
		"utf-8",
	)
}

// Delete the data directory and contents to clear stale data
function un_cache(dir) {
	const dataDirPath = path.join(dir)

	if (fs.existsSync(dataDirPath)) {
		rimraf(dataDirPath)
	}
}
