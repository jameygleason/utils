import { strictEqual, notStrictEqual } from "assert"
import { unsafeStripHTML } from "./unsafeStripHTML" // .ts

const pass = [
  {
    input: "<h1>Hello World!</h1>",
    output: "Hello World!",
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
