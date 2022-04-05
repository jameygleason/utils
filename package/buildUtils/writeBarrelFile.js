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
			let esmNode = ""
			let mjsNode = ""
			let cjsNode = ""
			let typesNode = ""

			let i = 0
			for (let file of Object.keys(pkg.exports)) {
				if (file === "." || file === "./node") {
					continue
				}

				if (file.split("/")[1] === "node") {
					file = "./" + file.split("/").slice(2, 3)
					esmNode = esmNode + `${i > 0 ? "\n" : ""}` + `export * from "${file}.js"`
					mjsNode = mjsNode + `${i > 0 ? "\n" : ""}` + `export * from "${file}.mjs"`
					cjsNode =
						cjsNode + `${i > 0 ? "\n" : ""}` + `module.exports.${file.slice(2, file.length)} = require("${file}.cjs")`
					typesNode = typesNode + `${i > 0 ? "\n" : ""}` + `export * from "${file}.d"`
					i++
					continue
				}

				esm = esm + `${i > 0 ? "\n" : ""}` + `export * from "${file}.js"`
				mjs = mjs + `${i > 0 ? "\n" : ""}` + `export * from "${file}.mjs"`
				cjs = cjs + `${i > 0 ? "\n" : ""}` + `module.exports.${file.slice(2, file.length)} = require("${file}.cjs")`
				types = types + `${i > 0 ? "\n" : ""}` + `export * from "${file}.d"`
				i++
			}

			let distDir = path.join(process.cwd(), "dist")
			let typesDir = path.join(process.cwd(), "dist", "types")

			mkdir(distDir)
			mkdir(typesDir)

			fs.writeFileSync(path.join(distDir, "index.js"), esm)
			fs.writeFileSync(path.join(distDir, "index.mjs"), mjs)
			fs.writeFileSync(path.join(distDir, "index.cjs"), cjs)
			fs.writeFileSync(path.join(typesDir, "index.d.ts"), types)

			let distDirNode = path.join(process.cwd(), "dist", "node")
			let typesDirNode = path.join(process.cwd(), "dist", "node", "types")

			mkdir(distDirNode)
			mkdir(typesDirNode)

			fs.writeFileSync(path.join(distDirNode, "index.js"), esmNode)
			fs.writeFileSync(path.join(distDirNode, "index.mjs"), mjsNode)
			fs.writeFileSync(path.join(distDirNode, "index.cjs"), cjsNode)
			fs.writeFileSync(path.join(typesDirNode, "index.d.ts"), typesNode)
		},
	}
}
