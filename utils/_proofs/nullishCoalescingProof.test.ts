import { assert } from "chai"

describe("Nullish Coalescing Proof", () => {
  const proveNullish = [
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
      output: "is nullish",
    },
    {
      input: null,
      output: "is nullish",
    },
    {
      input: NaN,
      output: NaN,
    },
    {
      input: 0,
      output: 0,
    },
    {
      input: -1,
      output: -1,
    },
    {
      input: 0.0,
      output: 0,
    },
    {
      input: -1.0,
      output: -1,
    },
    {
      input: [],
      output: [],
    },
    {
      input: {},
      output: {},
    },
    {
      input: "",
      output: "",
    },
  ]

  it("Nullish coalescing proof", () => {
    for (const { input, output } of proveNullish) {
      let defaultVal = "is nullish"
      let value = input ?? defaultVal

      // console.log("-------------------------------------")
      // console.log("input:", input, `(${typeof input})`)
      // console.log("output:", output, `(${typeof output})`)
      // console.log("value:", value, `(${typeof value})`)

      // @ts-ignore
      if (isNaN(input) && typeof input === "number") {
        // Input of NaN returns NaN typeof number
        // But fails the strictEqual assertion
        continue
      }

      if (value.constructor === Array && input !== output) {
        // The Reference to input object is not the same as the reference to output object. Effectively making the input different from and therefore not equal to the output.
        // So we need a separate test to properly asset
        value = input ?? defaultVal
        assert.strictEqual(value, input)
        continue
      }

      if (value.constructor === Object && input !== output) {
        // The Reference to input object is not the same as the reference to output object. Effectively making the input different from and therefore not equal to the output.
        // So we need a separate test to properly asset
        value = input ?? defaultVal
        assert.strictEqual(value, input)
        continue
      }

      assert.strictEqual(value, output)
    }
  })
})
