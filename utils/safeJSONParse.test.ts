import { expect } from "chai"
import { safeJSONParse } from "../safeJSONParse.js"

const testCases = [
  {
    input: '{"isJson": true}',
    output: [{ isJson: true }, null],
  },
  {
    input: { isNotJson: true },
    output: [
      { isNotJson: true },
      {
        name: "#48975824",
        message:
          "String passed was not valid JSON and may result in unexpected behavior\nSyntaxError: Unexpected token o in JSON at position 1",
      },
    ],
  },
  {
    input: "I'm a string",
    output: [
      "I'm a string",
      {
        name: "#48975824",
        message:
          "String passed was not valid JSON and may result in unexpected behavior\nSyntaxError: Unexpected token I in JSON at position 0",
      },
    ],
  },
  {
    input: 500,
    output: [
      500,
      {
        name: "#89754824",
        message: "Number was passed instead of string. may result in unexpected behavior.",
      },
    ],
  },
]

describe("safeJSONParse", () => {
  it("Safely parse JSON strings", () => {
    for (const { input, output } of testCases) {
      // @ts-expect-error
      const [data, error] = safeJSONParse(input)

      expect(data).to.eql(output[0])
      expect(error).to.eql(output[1])
    }
  })
})
