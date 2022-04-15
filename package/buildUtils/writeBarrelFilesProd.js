import fs from "fs"
import path from "path"
import { mkdir } from "./mkdir.js"

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"))
if (Object.keys(pkg).length === 0) {
	console.error("Failed to parse package.json")
}

export function writeBarrelFilesProd() {
	return {
		name: "rollup-plugin-write-barrel-file",
		buildStart() {
			let esm = ""
			let mjs = ""
			let cjs = ""
			let esmNode = ""
			let mjsNode = ""
			let cjsNode = ""

			let i = 0
			for (let file of Object.keys(pkg.exports)) {
				if (file === "." || file === "./node") {
					continue
				}

				if (file.split("/")[1] === "node") {
					file = "./" + file.split("/").slice(2, 3)
					esmNode = esmNode + `${i > 0 ? "\n" : ""}` + `export * from "${file}.js"`
					mjsNode = mjsNode + `${i > 0 ? "\n" : ""}` + `export * from "${file}.mjs"`

					// ++++++++++++
					cjsNode =
						cjsNode + `${i > 0 ? "\n" : ""}` + `module.exports.${file.slice(2, file.length)} = require("${file}.cjs")`
					// ++++++++++++

					i++
					continue
				}

				esm = esm + `${i > 0 ? "\n" : ""}` + `export * from "${file}.js"`
				mjs = mjs + `${i > 0 ? "\n" : ""}` + `export * from "${file}.mjs"`

				// ++++++++++++
				cjs = cjs + `${i > 0 ? "\n" : ""}` + `module.exports.${file.slice(2, file.length)} = require("${file}.cjs")`
				// ++++++++++++

				i++
			}

			let distDir = path.join(process.cwd(), "dist")
			mkdir(distDir)

			fs.writeFileSync(path.join(distDir, "index.js"), esm)
			fs.writeFileSync(path.join(distDir, "index.mjs"), mjs)
			fs.writeFileSync(path.join(distDir, "index.cjs"), cjs)

			let distDirNode = path.join(process.cwd(), "dist", "node")
			mkdir(distDirNode)

			fs.writeFileSync(path.join(distDirNode, "index.js"), esmNode)
			fs.writeFileSync(path.join(distDirNode, "index.mjs"), mjsNode)
			fs.writeFileSync(path.join(distDirNode, "index.cjs"), cjsNode)
		},
	}
}
