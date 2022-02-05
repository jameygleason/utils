import { assert } from "chai"
import { objectToString } from "../dist/objectToString.js"

const tests = [
	{
		input: { hi: true },
		output: "{\n  hi: true,\n}",
	},
	{
		input: ["item1", "item1"],
		output: '[\n  "item1",\n  "item1",\n]',
	},
	{
		input: { l1: { l2: [{ key: "value" }] } },
		output: '{\n  l1: {\n    l2: [\n      {\n        key: "value",\n      },\n    ],\n  },\n}',
	},
	{
		input: [{ l1: { l2: [{ key: "value" }] } }],
		output: '[\n  {\n    l1: {\n      l2: [\n        {\n          key: "value",\n        },\n      ],\n    },\n  },\n]',
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
