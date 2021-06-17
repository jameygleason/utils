import { assert } from "chai"

describe("Type Coercion Proof", () => {
  const proveCoercion = [
    {
      input: true,
      output: true,
    },
    {
      input: false,
      output: false,
    },
    {
      input: undefined,
      output: false,
    },
    {
      input: null,
      output: false,
    },
    {
      input: NaN,
      output: false,
    },
    {
      input: 0,
      output: false,
    },
    {
      input: -1,
      output: true,
    },
    {
      input: 0.0,
      output: false,
    },
    {
      input: -1.0,
      output: true,
    },
    {
      input: [],
      output: true,
    },
    {
      input: {},
      output: true,
    },
    {
      input: "",
      output: false,
    },
  ]

  it("Value coercion proof", () => {
    for (const { input, output } of proveCoercion) {
      // console.log("input:", input)
      assert.strictEqual(!!input, output)
    }
  })
})
