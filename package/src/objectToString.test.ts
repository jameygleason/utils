import { describe, it, assert } from "vitest"
import { objectToString } from "../dist/objectToString.js"

const tests = [
	{
		input: { hi: true },
		output: "{\n\thi: true,\n}",
	},
	{
		input: ["item1", "item1"],
		output: '[\n\t"item1",\n\t"item1",\n]',
	},
	{
		input: { l1: { l2: [{ key: "value" }] } },
		output: '{\n\tl1: {\n\t\tl2: [\n\t\t\t{\n\t\t\t\tkey: "value",\n\t\t\t},\n\t\t],\n\t},\n}',
	},
	{
		input: [{ l1: { l2: [{ key: "value" }] } }],
		output: '[\n\t{\n\t\tl1: {\n\t\t\tl2: [\n\t\t\t\t{\n\t\t\t\t\tkey: "value",\n\t\t\t\t},\n\t\t\t],\n\t\t},\n\t},\n]',
	},
	{
		input: { test: { test_us: { "test-dash": { "test/slash": "value" } } } },
		output:
			'{\n\ttest: {\n\t\ttest_us: {\n\t\t\t"test-dash": {\n\t\t\t\t"test/slash": "value",\n\t\t\t},\n\t\t},\n\t},\n}',
	},
]

describe("objectToString", () => {
	it("Prints objects to string", () => {
		for (const { input, output } of tests) {
			const res = objectToString(input)
			assert.strictEqual(res, output)
		}
	})
})
