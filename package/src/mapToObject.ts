export type MapKey = string | number

/**
 * WARNING: TypeScript doesn't catch when a map key is a non-"MapKey" type
 */
export function mapToObject(m: Map<MapKey, unknown>): Record<string, unknown> {
	const c: Record<string, unknown> = {}
	for (const [k, v] of m) {
		if (typeof k !== "string" && typeof k !== "number") {
			console.warn(`Converting Map key of type "${typeof k}" can result in unexpected behavior`)
		}
		c[k] = v
	}
	return c
}
