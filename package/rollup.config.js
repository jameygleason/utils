import fs from "fs"
import path from "path"
import module from "module"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import dts from "rollup-plugin-dts"
import { cleanDir } from "./buildUtils/cleanDir.js"
import { rewriteExports } from "./buildUtils/rewriteExports.js"
import { writeBarrelFiles } from "./buildUtils/writeBarrelFiles.js"
import { writeBarrelFilesProd } from "./buildUtils/writeBarrelFilesProd.js"

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"))
if (Object.keys(pkg).length === 0) {
	console.error("Failed to parse package.json")
}

cleanDir(path.join(process.cwd(), "dist"))

const config = [
	{
		input: "src/noop.js",
		output: [
			{
				file: "dist/noop.js",
				format: "es",
				sourcemap: true,
				exports: "named",
			},
		],
		plugins: [writeBarrelFiles()],
	},
]

// Handles individual file exports
const typesPlugins = [typescript(), dts()]

const filePlugins = [
	typescript(),
	resolve({
		extensions: ["js", ".ts"],
	}),
	commonjs(),
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

	let typesPath = `dist/${filename}.d.ts`
	if (filename.split("/")[0] === "node") {
		typesPath = `dist/node/${filename.split("/").slice(1, 2)}.d.ts`
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
	input: "src/index.ts",
	output: [
		{
			file: "dist/index.d.ts",
			format: "es",
			sourcemap: true,
			exports: "named",
		},
	],
	plugins: [dts()],
})

config.push({
	input: "src/node/index.ts",
	output: [
		{
			file: "dist/node/index.d.ts",
			format: "es",
			sourcemap: true,
			exports: "named",
		},
	],
	plugins: [dts()],
})

config.push({
	input: "src/noop.js",
	output: [
		{
			file: "dist/noop.js",
			format: "es",
			sourcemap: true,
			exports: "named",
		},
	],
	plugins: [writeBarrelFilesProd()],
})

config.push({
	input: "src/noop.js",
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
