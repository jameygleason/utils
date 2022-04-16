// @ts-check
import fs from "fs"
import path from "path"
import module from "module"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"

//! doesn't work with ts-check

// Requires "paths" field to be set (see tsconfig) in tsconfig
// Otherwise you will see a false error
// The "include" array must also include any files that you want the "path" hack to work on
import { isNil } from "@signalchain/utils"
// @ts-ignore
import { decamel } from "@signalchain/utils/decamel"
// @ts-ignore
import { rimraf, mkdir } from "@signalchain/utils/node"
// @ts-ignore
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
		include: "./**/*",
		exclude: ["node_modules", "dist", "types", "**/*.test.*"],
	},
}
