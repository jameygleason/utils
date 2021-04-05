import { strictEqual } from "assert"
import { isEmpty } from "./isEmpty" // .ts

const isTrue = [true, undefined, null, [], {}, "", NaN]

const isFalse = [false, ["thing"], { thing: true }, "thing", 0]

describe("isEmpty", () => {
  it("Returns true for empty values", () => {
    for (const value of isTrue) {
      const bool = isEmpty(value)
      strictEqual(bool, true)
    }
  })

  it("Returns false for values that are not empty", () => {
    for (const value of isFalse) {
      const bool = isEmpty(value)
      strictEqual(bool, false)
    }
  })
})
