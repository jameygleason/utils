import fs from "fs"
import path from "path"
import module from "module"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"

// Requires "paths" field in tsconfig to ignore false error
import { isNil } from "@signalchain/utils"
import { decamel } from "@signalchain/utils/decamel"
import { rimraf, mkdir } from "@signalchain/utils/node"
import { cleanDir } from "@signalchain/utils/node/cleanDir"

console.log("isNil:", isNil("nope"))
console.log("decamel:", decamel("camelCase"))

const dist = path.join(process.cwd(), "dist")
rimraf(dist)
mkdir(dist)
cleanDir(dist)

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"))
if (Object.keys(pkg).length === 0) {
	console.error("Failed to parse package.json")
}

export default {
	input: "index.js",
	output: [
		{
			file: path.join(process.cwd(), "dist", "index.js"),
			format: "es",
			sourcemap: true,
			exports: "named",
		},
	],
	external: [].concat(Object.keys(pkg.peerDependencies || {}), module.builtinModules),
	plugins: [
		resolve({
			extensions: ["js", ".ts"],
		}),
		commonjs(),
	],
	onwarn: (warning, onwarn) => onwarn(warning),
	watch: {
		clearScreen: false,
		include: "src/**/*",
		exclude: ["node_modules", "dist", "types", "**/*.test.*"],
	},
}
