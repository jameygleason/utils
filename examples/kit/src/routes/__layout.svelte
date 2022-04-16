<script context="module">
	// Check svelte.config for notes
	import path from "path"
	import { isNil } from "@signalchain/utils"

	console.log("__layout")
	console.log("+++++++++")
	console.log("isNil:", isNil("nope"))

	// Using node utils in the context block has to have an environment check because node utils contain node APIs and the context block runs on the browser as well as on the server
	if (typeof window === "undefined") {
		;(async function loader() {
			const { rimraf, mkdir } = await import("@signalchain/utils/node")
			const { cleanDir } = await import("@signalchain/utils/node/cleanDir")

			const dist = path.join(process.cwd(), "dist")
			rimraf(dist)
			mkdir(dist)
			cleanDir(dist)
		})()
	}
</script>

<script lang="ts">
	import { decamel } from "@signalchain/utils"

	console.log(decamel("camelCase"))
</script>

<main>
	<slot />
</main>
