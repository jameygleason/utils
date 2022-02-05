import { assert } from "chai"
import { formatCurrency } from "../dist/formatCurrency.js"

const defaults = [
	{
		input: 101,
		output: {
			currency: "$",
			integer: "1",
			separator: "",
			decimal: ".",
			fraction: "01",
		},
	},
	{
		input: 100,
		output: {
			currency: "$",
			integer: "1",
			separator: "",
			decimal: "",
			fraction: "",
		},
	},
	{
		input: 486153,
		output: {
			currency: "$",
			integer: "4,861",
			separator: ",",
			decimal: ".",
			fraction: "53",
		},
	},
	{
		input: "486153", // Parses string test
		output: {
			currency: "$",
			integer: "4,861",
			separator: ",",
			decimal: ".",
			fraction: "53",
		},
	},
	{
		input: 99999912345678910, // Maximum precise digits
		output: {
			currency: "$",
			integer: "999,999,123,456,789",
			separator: ",",
			decimal: ".",
			fraction: "10",
		},
	},
]

describe("formatCurrency", () => {
	it("Formats amount properly with default options", () => {
		for (const { input, output } of defaults) {
			// @ts-ignore
			const formattedCurrency = formatCurrency(input)
			assert.deepStrictEqual(formattedCurrency, output)
		}
	})
})
