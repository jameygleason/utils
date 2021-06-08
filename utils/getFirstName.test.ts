import { assert } from "chai"
import { getFirstName } from "./getFirstName" // .ts

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
    input: "Jimi Hendrix",
    output: "Jimi",
  },
  {
    input: "  Lindsey Buckingham", // trim front
    output: "Lindsey",
  },
  {
    input: "James Hetfield   ", // trim end
    output: "James",
  },
  {
    input: "andy Summers", // lowercase first string
    output: "Andy",
  },
  {
    input: "willie nelson", // lowercase all strings
    output: "Willie",
  },
  {
    input: "Jack white", // lowercase last string
    output: "Jack",
  },
  {
    input: "   stevie    ray     vaughn    ", // egregious usage of spaces and all lowercase
    output: "Stevie",
  },
  {
    input: "bç𝛀a🍌nanas string",
    output: "Bananas",
  },
  {
    input: "break case",
    output: "break",
  },
]

describe("getFirstName", () => {
  it("Capitalizes the first letter of the first word in a string", () => {
    for (const { input, output } of testCases) {
      const [data, error] = getFirstName(input)

      if (error !== null) {
        assert.strictEqual("This case should not happen", true)
        return
      }

      if (input === "break case") {
        assert.strictEqual("break", output)
        return
      }

      assert.strictEqual(data, output)
    }
  })
})
