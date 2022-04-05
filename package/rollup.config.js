import fs from "fs"
import path from "path"
import module from "module"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"
import { writeBarrelFile } from "./buildUtils/writeBarrelFile.js"
import { rewriteExports } from "./buildUtils/rewriteExports.js"
import { rimraf } from "./buildUtils/rimraf.js"

rimraf(path.join(process.cwd(), "dist"))

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"))
if (Object.keys(pkg).length === 0) {
	console.error("Failed to parse package.json")
}

const filePlugins = [
	typescript(),
	resolve({
		extensions: ["js", ".ts"],
	}),
	commonjs(),
]

const typesPlugins = [typescript(), dts()]

const config = [
	{
		input: "src/index.js",
		output: [
			{
				file: "dist/noop.js",
				format: "es",
				sourcemap: true,
				exports: "named",
			},
		],
		plugins: [writeBarrelFile()],
	},
]

for (const k of Object.keys(pkg.exports)) {
	if (k === "." || k === "./node") {
		continue
	}

	const filename = k.slice(2, k.length)

	config.push({
		input: `src/${filename}.ts`,
		output: [
			{
				file: `dist/${filename}.js`,
				format: "es",
				sourcemap: true,
				exports: "named",
			},
			{
				file: `dist/${filename}.mjs`,
				format: "es",
				sourcemap: true,
				exports: "named",
			},
			{
				file: `dist/${filename}.cjs`,
				format: "cjs",
				sourcemap: true,
				exports: "named",
			},
		],
		plugins: filePlugins,
		external: [].concat(
			Object.keys(pkg.dependencies || {}),
			Object.keys(pkg.devDependencies || {}),
			Object.keys(pkg.peerDependencies || {}),
			module.builtinModules,
		),
		onwarn: (warning, onwarn) => onwarn(warning),
		watch: {
			clearScreen: false,
			include: "src/**/*",
			exclude: ["node_modules", "dist", "types", "**/*.test.*"],
		},
	})

	let typesPath = `dist/types/${filename}.d.ts`
	if (filename.split("/")[0] === "node") {
		typesPath = `dist/node/types/${filename.split("/").slice(1, 2)}.d.ts`
	}

	config.push({
		input: `src/${filename}.ts`,
		output: {
			file: typesPath,
			format: "es",
			sourcemap: true,
			exports: "named",
		},
		plugins: typesPlugins,
	})
}

config.push({
	input: "src/index.js",
	output: [
		{
			file: "dist/noop.js",
			format: "es",
			sourcemap: true,
			exports: "named",
		},
	],
	plugins: [rewriteExports()],
})

export default config
