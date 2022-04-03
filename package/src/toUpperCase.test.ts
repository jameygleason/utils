import { describe, it, assert } from "vitest"
import { toUpperCase } from "../dist/toUpperCase.js"

const testCases = [
	{
		input: "Jimi Hendrix",
		output: "Jimi Hendrix",
	},
	{
		input: "  Lindsey Buckingham", // trim front
		output: "Lindsey Buckingham",
	},
	{
		input: "James Hetfield   ", // trim end
		output: "James Hetfield",
	},
	{
		input: "andy Summers", // lowercase first string
		output: "Andy Summers",
	},
	{
		input: "willie nelson", // lowercase all strings
		output: "Willie Nelson",
	},
	{
		input: "Jack white", // lowercase last string
		output: "Jack White",
	},
	{
		input: "   stevie    ray     vaughn    ", // egregious usage of spaces and all lowercase
		output: "Stevie Ray Vaughn",
	},
	{
		input: "break case",
		output: "break case",
	},
]

describe("toUpperCase", () => {
	it("Capitalizes the first letter of all the words in a string", () => {
		for (const { input, output } of testCases) {
			const [data, error] = toUpperCase(input)

			if (error !== null) {
				assert.strictEqual(true, false)
				return
			}

			if (data === null) {
				assert.strictEqual(true, false)
				return
			}

			const re = new RegExp(output)
			const reTest = re.test(data)

			if (input === "break case") {
				assert.strictEqual(reTest, false)
				return
			}

			assert.strictEqual(reTest, true)
		}
	})
})
