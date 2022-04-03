import { describe, it, assert } from "vitest"
import { stripEmojis } from "../dist/stripEmojis.js"

const testCases = [
	{
		input: "😘 Emoji Test1",
		output: " Emoji Test1",
	},
	{
		input: "👪 Emoji ❤️ Test2",
		output: " Emoji  Test2",
	},
	{
		input: "💯👍🔥 Emoji ❤️ Test3",
		output: " Emoji  Test3",
	},
	{
		input: "💯 👍 🔥 Emoji ❤️ Test4",
		output: "   Emoji  Test4",
	},
	{
		input: "   💯 👍 🔥 Emoji ❤️ Test5   ",
		output: "      Emoji  Test5   ",
	},
	{
		input: "👨‍👩‍👦‍👧 Emoji Test6",
		output: " Emoji Test6",
	},
	{
		input: "👨‍👩‍👦‍👧👨‍👩‍👦‍👧 Emoji Test7",
		output: " Emoji Test7",
	},
	{
		input: "Emoji Test8 👨‍👩‍👦‍👧",
		output: "Emoji Test8 ",
	},
	{
		input: "Emoji Test9 👨‍👩‍👦‍👧👨‍👩‍👦‍👧",
		output: "Emoji Test9 ",
	},
	{
		input: "🧑‍🚀 a",
		output: " a",
	},
	{
		input: "🧑 🧑‍🚀 ç a",
		output: "  ç a",
	},
	{
		input: "👍 ç 𝛀 a",
		output: " ç 𝛀 a",
	},
	{
		input: "👍 ç $ a",
		output: " ç $ a",
	},
	{
		input: "🛑 break case",
		output: "🛑 break case",
	},
]

describe("stripEmojis", () => {
	it("Strips emojis from a text string", () => {
		for (const { input, output } of testCases) {
			const [data, err] = stripEmojis(input)
			if (err !== null) {
				console.error("Input:", input)
				throw new Error(`${err}`)
			}

			if (input === "🛑 break case") {
				assert.notStrictEqual("🛑 break case", data)
				return
			}

			assert.strictEqual(data, output)
		}
	})
})
