// @ts-check
import path from "path"
import adapter from "@sveltejs/adapter-node"
import preprocess from "svelte-preprocess"

// Requires "paths" field to be set (see tsconfig) in tsconfig
// Otherwise you will see a false error
// The "include" array must also include any files that you want the "path" hack to work on
import { isNil } from "@signalchain/utils"
import { decamel } from "@signalchain/utils/decamel"
import { rimraf, mkdir } from "@signalchain/utils/node"
import { cleanDir } from "@signalchain/utils/node/cleanDir"

console.log("svelte.config")
console.log("++++++++++++++")
console.log("isNil:", isNil("nope"))
console.log("decamel:", decamel("camelCase"))

const dist = path.join(process.cwd(), "dist")
rimraf(dist)
mkdir(dist)
cleanDir(dist)

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ["PATCH", "DELETE"],
		},
		vite: () => ({
			clearScreen: false,
		}),
	},
}

export default config
