import fs from "fs"
import path from "path"
import { mkdir } from "./mkdir"

export function copyRecursiveSync(src: string, dest: string): void {
	let isDirectory = false
	if (fs.existsSync(src)) {
		let stats = fs.statSync(src)
		isDirectory = stats.isDirectory()
	}

	if (isDirectory) {
		if (!fs.existsSync(dest)) {
			mkdir(dest)
		}
		fs.readdirSync(src).forEach(childItemName => {
			copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName))
		})
		return
	}

	fs.copyFileSync(src, dest)
}
