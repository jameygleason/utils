import fs from "fs"
import picocolors from "picocolors"
import { rimraf } from "./rimraf.js"

export function reset_directory(dest) {
	if (!dest) {
		throw new Error(picocolors.red("reset_directory requires a directory path argument"))
	}

	// If "dest" exist, delete it
	if (fs.existsSync(dest)) {
		rimraf(dest)
	}

	// If "dest" doesn't exist, create it
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest)
	}
}
