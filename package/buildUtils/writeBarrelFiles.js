import fs from "fs"
import path from "path"

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"))
if (Object.keys(pkg).length === 0) {
	console.error("Failed to parse package.json")
}

export function writeBarrelFiles() {
	return {
		name: "rollup-plugin-write-barrel-file",
		buildStart() {
			let header = "// Generated file. Edit package.json exports.\n"
			let esm = header
			let esmNode = header

			let i = 0
			for (let file of Object.keys(pkg.exports)) {
				if (file === "." || file === "./node") {
					continue
				}

				if (file.split("/")[1] === "node") {
					file = "./" + file.split("/").slice(2, 3)
					esmNode = esmNode + `${i > 0 ? "\n" : ""}` + `export * from "${file}"`
					i++
					continue
				}

				esm = esm + `${i > 0 ? "\n" : ""}` + `export * from "${file}"`
				i++
			}

			let outputDir = path.join(process.cwd(), "src")
			fs.writeFileSync(path.join(outputDir, "index.ts"), esm + "\n")

			let outputDirNode = path.join(process.cwd(), "src", "node")
			fs.writeFileSync(path.join(outputDirNode, "index.ts"), esmNode + "\n")
		},
	}
}
