import fs from "fs"
import path from "path"
import { mkdir } from "./mkdir.js"

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"))
if (Object.keys(pkg).length === 0) {
	console.error("Failed to parse package.json")
}

export function writeBarrelFile() {
	return {
		name: "rollup-plugin-write-barrel-file",
		buildStart() {
			let esm = ""
			let mjs = ""
			let cjs = ""
			let types = ""

			let i = 0
			for (const file of Object.keys(pkg.exports)) {
				if (file === ".") {
					continue
				}
				esm = esm + `${i > 0 ? "\n" : ""}` + `export * from "${file}.js"`
				mjs = mjs + `${i > 0 ? "\n" : ""}` + `export * from "${file}.mjs"`
				cjs = cjs + `${i > 0 ? "\n" : ""}` + `export * from "${file}.cjs"`
				types = types + `${i > 0 ? "\n" : ""}` + `export * from "${file}.d"`
				i++
			}

			const distDir = path.join(process.cwd(), "dist")
			const typesDir = path.join(process.cwd(), "types")
			mkdir(distDir)
			mkdir(typesDir)
			fs.writeFileSync(path.join(distDir, "index.js"), esm)
			fs.writeFileSync(path.join(distDir, "index.mjs"), mjs)
			fs.writeFileSync(path.join(distDir, "index.cjs"), cjs)
			fs.writeFileSync(path.join(process.cwd(), "types", "index.d.ts"), types)
		},
	}
}
