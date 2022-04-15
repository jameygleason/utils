import fs from "fs"
import path from "path"
import { rimraf } from "./rimraf"

export function cleanDir(dir: string): void {
	for (const item of fs.readdirSync(dir)) {
		rimraf(path.join(dir, item))
	}
}
