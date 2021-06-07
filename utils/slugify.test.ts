import { expect } from "chai"
import { slugify } from "./slugify"

const whitespace = [
  { input: "   ", output: "" },
  { input: "  trim", output: "trim" },
  { input: "trim  ", output: "trim" },
  { input: "   trim me   ", output: "trim-me" },
  { input: "   trim\r\nme   ", output: "trim-me" },
  { input: "\n\n\ntrim\n\n\n", output: "trim" },
  { input: "\n\n\ntrim\nme\n\n\n", output: "trim-me" },
]

const nonAlphanumericChars = [
  { input: "./filename.js", output: "filename-js" },
  { input: "👻 boo", output: "boo" },
  { input: "hi:)", output: "hi" },
  { input: "hi :)", output: "hi" },
  { input: "hi $ ç 𝛀 :)", output: "hi-ç" },
  {
    input: "ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ",
    output: "zàèìòùàèìòùáéíóúýáéíóúýâêîôûâêîôûãñõãñõäëïöüÿäëïöüÿççßøøååææœ",
  },
]

const toLowercase = [
  { input: "iShOuLdBeLoWeRcAsE", output: "ishouldbelowercase" },
  { input: "@#$%ABC", output: "abc" },
]

describe("slugify", () => {
  it('Replaces any amount of whitespace with a "-"', () => {
    for (const { input, output } of whitespace) {
      const [data, err] = slugify(input)
      if (err !== null) {
        expect(err).to.eql(true)
      }
      expect(data).to.eql(output)
    }
  })

  it("Replaces non-alphanumeric chars", () => {
    for (const { input, output } of nonAlphanumericChars) {
      const [data, err] = slugify(input)
      if (err !== null) {
        expect(err).to.eql(true)
      }
      expect(data).to.eql(output)
    }
  })

  it("Converts capital letters to lowercase", () => {
    for (const { input, output } of toLowercase) {
      const [data, err] = slugify(input)
      if (err !== null) {
        expect(err).to.eql(true)
      }
      expect(data).to.eql(output)
    }
  })
})
