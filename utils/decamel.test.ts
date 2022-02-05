import { assert } from "chai"
import { decamel } from "../dist/decamel.js"

const tests = [
	{
		input: "aB",
		output: "a B",
	},
	{
		input: "aBC",
		output: "a BC",
	},
	{
		input: "aBc",
		output: "a Bc",
	},
	{
		input: "encodeURI",
		output: "encode URI",
	},
	{
		input: "encodeURIComponent",
		output: "encode URI Component",
	},
	{
		input: "FinalizationRegistry",
		output: "Finalization Registry",
	},
	{
		input: "isNaN",
		output: "is Na N",
	},
	{
		input: "SharedArrayBuffer",
		output: "Shared Array Buffer",
	},
	{
		input: "Uint32Array",
		output: "Uint 32 Array",
	},
	{
		input: "Uint8ClampedArray",
		output: "Uint 8 Clamped Array",
	},
]

describe("decamel", () => {
	it("Adds a space character before non-consecutive capital letters", () => {
		for (const { input, output } of tests) {
			const str = decamel(input)
			assert.strictEqual(str, output)
		}
	})
})
