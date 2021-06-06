import { strictEqual } from "assert"
import { stripEmojis } from "./stripEmojis" // .ts

const testCases = [
  {
    input: "😘 Emoji Test",
    output: "Emoji",
  },
  {
    input: "😘 Emoji ❤️ Test",
    output: "Emoji",
  },
  {
    input: "💯👍🔥 Emoji ❤️ Test",
    output: "Emoji",
  },
  {
    input: "💯 👍 🔥 Emoji ❤️ Test",
    output: "Emoji",
  },
  {
    input: "       💯 👍 🔥 Emoji ❤️ Test         ",
    output: "Emoji",
  },
]

describe("stripEmojis", () => {
  it("Strips emojis from a text string", () => {
    for (const { input, output } of testCases) {
      const [data, error] = stripEmojis(input)

      if (error !== null) {
        strictEqual(true, false)
        return
      }

      if (data === null) {
        strictEqual(true, false)
        return
      }

      const re = new RegExp(output)
      const reTest = re.test(data)

      if (input === "break case") {
        strictEqual(reTest, false)
        return
      }

      strictEqual(reTest, true)
    }
  })
})
