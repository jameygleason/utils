import chai, { assert, expect } from "chai"
import sinonChai from "sinon-chai"
import { spy } from "sinon"
import { isNil } from "./isNil"

chai.use(sinonChai)

const isTrue = [true, undefined, null, "", NaN, [], {}]

const isFalse = [false, "thing", 0, ["thing"], { thing: true }]

const shouldWarn = [
  {
    input: true,
    out:
      "Boolean args return their original value. This can lead to unexpected behavior. isNil checks for empty Strings, Objects, and Arrays, as well as NaN, null, and undefined.",
  },
  {
    input: false,
    out:
      "Boolean args return their original value. This can lead to unexpected behavior. isNil checks for empty Strings, Objects, and Arrays, as well as NaN, null, and undefined.",
  },
  {
    input: BigInt(9007199254740991),
    out: "Type of bigint is not supported",
  },
  {
    input: Symbol("foo"),
    out: "Type of symbol is not supported",
  },
  {
    input: () => {},
    out: "Type of function is not supported",
  },
]

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

describe("isNil", () => {
  beforeEach(function () {
    spy(console, "warn")
  })

  afterEach(function () {
    // @ts-ignore
    console.warn.restore()
  })

  it('Returns "true" for empty values', () => {
    for (const input of isTrue) {
      const bool = isNil(input)
      assert.strictEqual(bool, true)
    }
  })

  it('Returns "false" for values that are not empty', () => {
    for (const value of isFalse) {
      const bool = isNil(value)
      assert.strictEqual(bool, false)
    }
  })

  it("Warns for values that are not intended for use with function", () => {
    for (const { input, out } of shouldWarn) {
      isNil(input)
      expect(console.warn).to.have.been.calledWith(out)
    }
  })

  it("Value coercion proof", () => {
    for (const { input, output } of proveCoercion) {
      // console.log("input:", input)
      assert.strictEqual(!!input, output)
    }
  })

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
