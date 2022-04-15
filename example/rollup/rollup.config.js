// // @ts-check
/* eslint-disable */
import path from "path"
import { rimraf } from "@signalchain/utils/node/rimraf"

rimraf(path.join(process.cwd(), "dist"))

export default {
	input: "src/index.ts",
	output: [
		{
			file: path.join(process.cwd(), "dist"),
			format: "es",
			sourcemap: true,
			exports: "named",
		},
	],
}
