// @ts-check
import path from "path"
/* eslint-disable */
// @ts-ignore
import { rimraf } from "@signalchain/utils/node"

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
