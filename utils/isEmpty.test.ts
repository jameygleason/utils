import { assert, expect } from "chai"
import { isEmpty } from "./isEmpty"

const isTrue = [true, undefined, null, NaN, [], {}, ""]

const isFalse = [false, 0, ["thing"], { thing: true }, "thing"]

const shouldThrow = [
  {
    input: BigInt(9007199254740991),
    out: "Type of bigint is not supported",
  },
  { input: Symbol("foo"), out: "Type of symbol is not supported" },
  { input: () => {}, out: "Type of function is not supported" },
]

describe("isEmpty", () => {
  it('Returns "true" for empty values', () => {
    for (const value of isTrue) {
      const bool = isEmpty(value)
      assert.strictEqual(bool, true)
    }
  })

  it('Returns "false" for values that are not empty', () => {
    for (const value of isFalse) {
      const bool = isEmpty(value)
      assert.strictEqual(bool, false)
    }
  })

  it("Throws for values that are not supported", () => {
    for (const { input, out } of shouldThrow) {
      expect(() => isEmpty(input)).to.throw(out)
    }
  })
})
