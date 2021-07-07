import { assert } from "chai"
import { mapToObject } from "../mapToObject.js"

const m1 = new Map()
m1.set("name", "Jamey")
m1.set("isHuman", true)

const m2 = new Map()
m2.set("name", "Nori")
m2.set("isHuman", false)

describe("mapToObject", () => {
  const tests = [
    {
      input: m1,
      output: { name: "Jamey", isHuman: true },
    },
    {
      input: m2,
      output: { name: "Nori", isHuman: false },
    },
  ]

  it('Turns a "Map" into an "Object"', () => {
    for (const { input, output } of tests) {
      const res = mapToObject(input)
      assert.deepStrictEqual(res, output)
    }
  })

  it("TODO: Test nested Map", () => {
    // noop
  })
})
