import fs from "fs"
import path from "path"
import { rimraf } from "./rimraf.js"

export function cleanDir(dir) {
	for (const item of fs.readdirSync(dir)) {
		rimraf(path.join(dir, item))
	}
}
