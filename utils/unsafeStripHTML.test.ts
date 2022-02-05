import { strictEqual, notStrictEqual } from "assert"
import { unsafeStripHTML } from "../dist/unsafeStripHTML.js"

const pass = [
	{
		input: "<h1>Hello World!</h1>",
		output: "Hello World!",
	},
	{
		input: "<div><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul></div>",
		output: "Item 1Item 2Item 3",
	},
	{
		input: `<p>
Hi
</p>`,
		output: "\nHi\n",
	},
	{
		input: '<img src="" />',
		output: "",
	},
	{
		input: '<img src="">',
		output: "",
	},
]

const fail = [
	{
		input: "<h1>Hello World!</h1>",
		output: "<h1>Hello World!</h1>",
	},
	{
		input: '<img src="" />',
		output: '<img src="" />',
	},
	{
		input: '<img src="">',
		output: '<img src="">',
	},
]

describe("unsafeStripHTML", () => {
	it("Strips HTML tags from a string", () => {
		for (const { input, output } of pass) {
			const str = unsafeStripHTML(input)
			strictEqual(str, output)
		}
	})

	it("Fails to strips HTML tags from a string", () => {
		for (const { input, output } of fail) {
			const str = unsafeStripHTML(input)
			notStrictEqual(str, output)
		}
	})
})
