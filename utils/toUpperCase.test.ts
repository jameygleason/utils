import { strictEqual } from "assert"
import { toUpperCase } from "./toUpperCase"

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
