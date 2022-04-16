import { performance } from "perf_hooks"
import clr from "picocolors"

/**
 * Usage:
 * const start = performance.now()
 * <YOUR CODE>
 * printElapsed(start, "Build complete")
 */
export function printElapsed(start: number, msg: string): void {
	const end = performance.now()
	let elapsed = end - start
	let unit = "ms"
	if (elapsed >= 1000) {
		elapsed = elapsed * 0.001
		unit = "s"
	}
	console.log(`${clr.blue(msg)} ${clr.green("in")} ${clr.blue(elapsed.toFixed(1))}${clr.blue(unit)}`)
}
