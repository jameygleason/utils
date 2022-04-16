import fs from "fs"
import path from "path"
import { readdir } from "fs/promises"

export function rewriteExports() {
	return {
		name: "rollup-plugin-rewrite-exports",
		async buildEnd() {
			try {
				const distDir = path.join(process.cwd(), "dist")
				const files = await readdir(distDir)
				for (const file of files) {
					const fsplit = file.split(".")

					if (fsplit[fsplit.length - 1] !== "cjs") {
						continue
					}

					const contents = fs.readFileSync(path.join(distDir, file), "utf8")
					const filename = file.split(".")[0]
					const re = new RegExp(`exports.${filename} = ${filename}`, "gi")
					const newContents = contents.replace(re, `module.exports = { ${filename} }`)

					fs.writeFileSync(path.join(distDir, file), newContents)
				}

				const distNodeDir = path.join(process.cwd(), "dist", "node")
				const nodeFiles = await readdir(distNodeDir)
				for (const file of nodeFiles) {
					const fsplit = file.split(".")

					if (fsplit[fsplit.length - 1] !== "cjs") {
						continue
					}

					const contents = fs.readFileSync(path.join(distNodeDir, file), "utf8")
					const filename = file.split(".")[0]
					const re = new RegExp(`exports.${filename} = ${filename}`, "gi")
					const newContents = contents.replace(re, `module.exports = { ${filename} }`)

					fs.writeFileSync(path.join(distNodeDir, file), newContents)
				}
			} catch (err) {
				console.error(err)
			}
		},
	}
}
