import { performance } from "perf_hooks"
import picocolors from "picocolors"

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
	console.log(
		`${picocolors.blue(msg)} ${picocolors.green("in")} ${picocolors.blue(elapsed.toFixed(1))}${picocolors.blue(unit)}`,
	)
}
