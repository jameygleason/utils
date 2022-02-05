import { describe, it, assert } from "vitest"
import { normalizeString } from "../dist/normalizeString.js"

const pass = [
	{
		input: "",
		output: "",
	},
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
		input: "   Stevie    Ray     Vaughn    ", // egregious usage of spaces
		output: "Stevie Ray Vaughn",
	},
	{
		input:
			"    Lorem      ipsum,         dolor       sit          amet  consectetur  adipisicing elit.  Illum quidem expedita    numquam    architecto    laudantium  placeat debitis ipsa doloribus unde veritatis, necessitatibus, repudiandae praesentium, ullam dolor optio vel asperiores? Dolore, dolor.    ", // egregious usage of spaces
		output:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum quidem expedita numquam architecto laudantium placeat debitis ipsa doloribus unde veritatis, necessitatibus, repudiandae praesentium, ullam dolor optio vel asperiores? Dolore, dolor.",
	},
]

describe("normalizeString", () => {
	it("Returns a normalized string", () => {
		for (const { input, output } of pass) {
			const [data, err] = normalizeString(input)

			if (err !== null) {
				// @ts-expect-error
				assert.strictEqual("Unexpected error", err)
				return
			}

			assert.strictEqual(output, data)
		}
	})
})
