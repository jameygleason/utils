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
			let distDir = path.join(process.cwd(), "dist")
			let distDirNode = path.join(process.cwd(), "dist", "node")

			mkdir(distDir)
			mkdir(distDirNode)

			const jsStream = fs.createWriteStream(path.join(distDir, "index.js"))
			const mjsStream = fs.createWriteStream(path.join(distDir, "index.mjs"))
			const cjsArr = []

			const jsNodeStream = fs.createWriteStream(path.join(distDirNode, "index.js"))
			const mjsNodeStream = fs.createWriteStream(path.join(distDirNode, "index.mjs"))
			const cjsNodeArr = []

			for (let file of Object.keys(pkg.exports)) {
				if (file === "." || file === "./node") {
					continue
				}

				if (file.split("/")[1] === "node") {
					file = "./" + file.split("/").slice(2, 3)

					jsNodeStream.write(`export * from "${file}.js"\n`)
					mjsNodeStream.write(`export * from "${file}.mjs"\n`)
					cjsNodeArr.push(file.slice(2, file.length))
					continue
				}

				jsStream.write(`export * from "${file}.js"\n`)
				mjsStream.write(`export * from "${file}.js"\n`)
				cjsArr.push(file.slice(2, file.length))
			}

			const cjsDist = path.join(distDir, "index.cjs")
			let cjsImport = ""
			let cjsExport = "\n"

			for (const file of cjsArr) {
				cjsImport += `\tconst { ${file} } = require("./${file}.cjs")\n`
				cjsExport += `\t${file},\n`
			}

			fs.writeFileSync(cjsDist, `${cjsImport}\nmodule.exports = {${cjsExport}}`)

			const cjsNodeDist = path.join(distDirNode, "index.cjs")
			let cjsNodeImport = ""
			let cjsNodeExport = "\n"

			for (const file of cjsNodeArr) {
				cjsNodeImport += `\tconst { ${file} } = require("./${file}.cjs")\n`
				cjsNodeExport += `\t${file},\n`
			}

			fs.writeFileSync(cjsNodeDist, `${cjsNodeImport}\nmodule.exports = {${cjsNodeExport}}`)
		},
	}
}
