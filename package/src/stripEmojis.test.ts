import { describe, it, assert } from "vitest"
import { stripEmojis } from "../dist/stripEmojis.js"

const testCases = [
	{
		input: "๐ Emoji Test1",
		output: " Emoji Test1",
	},
	{
		input: "๐ช Emoji โค๏ธ Test2",
		output: " Emoji  Test2",
	},
	{
		input: "๐ฏ๐๐ฅ Emoji โค๏ธ Test3",
		output: " Emoji  Test3",
	},
	{
		input: "๐ฏ ๐ ๐ฅ Emoji โค๏ธ Test4",
		output: "   Emoji  Test4",
	},
	{
		input: "   ๐ฏ ๐ ๐ฅ Emoji โค๏ธ Test5   ",
		output: "      Emoji  Test5   ",
	},
	{
		input: "๐จโ๐ฉโ๐ฆโ๐ง Emoji Test6",
		output: " Emoji Test6",
	},
	{
		input: "๐จโ๐ฉโ๐ฆโ๐ง๐จโ๐ฉโ๐ฆโ๐ง Emoji Test7",
		output: " Emoji Test7",
	},
	{
		input: "Emoji Test8 ๐จโ๐ฉโ๐ฆโ๐ง",
		output: "Emoji Test8 ",
	},
	{
		input: "Emoji Test9 ๐จโ๐ฉโ๐ฆโ๐ง๐จโ๐ฉโ๐ฆโ๐ง",
		output: "Emoji Test9 ",
	},
	{
		input: "๐งโ๐ a",
		output: " a",
	},
	{
		input: "๐ง ๐งโ๐ รง a",
		output: "  รง a",
	},
	{
		input: "๐ รง ๐ a",
		output: " รง ๐ a",
	},
	{
		input: "๐ รง $ a",
		output: " รง $ a",
	},
	{
		input: "๐ break case",
		output: "๐ break case",
	},
]

describe.skip("stripEmojis", () => {
	it("Strips emojis from a text string", () => {
		for (const { input, output } of testCases) {
			const [data, err] = stripEmojis(input)
			if (err !== null) {
				console.error("Input:", input)
				throw new Error(`${err}`)
			}

			if (input === "๐ break case") {
				assert.notStrictEqual("๐ break case", data)
				return
			}

			assert.strictEqual(data, output)
		}
	})
})
