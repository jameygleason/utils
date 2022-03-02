// @ts-nocheck

export function struct(obj) {
	return Object.seal(obj)
}

export function set(props) {
	for (const [k, v] of Object.entries(props)) {
		this[k] = v
	}
}
