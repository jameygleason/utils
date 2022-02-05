import { describe, it, assert } from "vitest"
import { instanceOfBuiltin } from "../dist/instanceOfBuiltin.js"

describe("instanceOfBuiltin", () => {
	it("Detects Date instance", () => {
		const [type, mm] = instanceOfBuiltin(new Date())
		assert.strictEqual(type, "Date")
		assert.strictEqual(mm, "HAS_MUTABLE_METHODS")
	})

	it("Detects Set instance", () => {
		const [type, mm] = instanceOfBuiltin(new Set())
		assert.strictEqual(type, "Set")
		assert.strictEqual(mm, "HAS_MUTABLE_METHODS")
	})

	it("Detects Map instance", () => {
		const [type, mm] = instanceOfBuiltin(new Map())
		assert.strictEqual(type, "Map")
		assert.strictEqual(mm, "HAS_MUTABLE_METHODS")
	})

	it("Detects WeakSet instance", () => {
		const [type, mm] = instanceOfBuiltin(new WeakSet())
		assert.strictEqual(type, "WeakSet")
		assert.strictEqual(mm, "HAS_MUTABLE_METHODS")
	})

	it("Detects WeakMap instance", () => {
		const [type, mm] = instanceOfBuiltin(new WeakMap())
		assert.strictEqual(type, "WeakMap")
		assert.strictEqual(mm, "HAS_MUTABLE_METHODS")
	})

	it("Detects Null instance", () => {
		const [type, mm] = instanceOfBuiltin(null)
		assert.strictEqual(type, "Null")
		assert.strictEqual(mm, "NO_MUTABLE_METHODS")
	})

	function test() {
		// noop
	}

	it("Detects Function instance", () => {
		const [type, mm] = instanceOfBuiltin(test)
		assert.strictEqual(type, "Function")
		assert.strictEqual(mm, "NO_MUTABLE_METHODS")
	})

	const lit = /hi/g
	let re = new RegExp(lit)
	let handRolled = new RegExp(lit)
	const arr = [lit, re, handRolled]

	it("Detects RegEx instance", () => {
		for (const r of arr) {
			const [type, mm] = instanceOfBuiltin(r)
			assert.strictEqual(type, "RegExp")
			assert.strictEqual(mm, "NO_MUTABLE_METHODS")
		}
	})
})
