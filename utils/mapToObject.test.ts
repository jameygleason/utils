import { assert } from "chai"
import { mapToObject } from "../mapToObject.js"
import type { MapKey } from "./mapToObject"

const m1: Map<MapKey, unknown> = new Map()
m1.set("name", "Jamey")
m1.set("isHuman", true)

const m2: Map<MapKey, unknown> = new Map()
m2.set("name", "Nori")
m2.set("isHuman", false)

const m3: Map<any, unknown> = new Map()
m3.set({ key: "name" }, "Nori")
m3.set("isHuman", false)

// TODO: Figure out how to type this
// @ts-ignore
// const m4: Map<MapKey, unknown> = new Map([
//   ["name", "Jamey"],
//   ["isHuman", true],
// ])
// console.log("m4:", m4)

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
    {
      input: m3,
      output: { "[object Object]": "Nori", isHuman: false },
    },
  ]

  it('Turns a "Map" into an "Object"', () => {
    for (const { input, output } of tests) {
      const res = mapToObject(input)
      assert.deepStrictEqual(res, output)
    }
  })

  it("TODO: Add spy test for console.error()", () => {
    // noop
    // Converting Map key of type "Object" can result in unexpected behavior
    // Converting Map key of type "Map" can result in unexpected behavior
    // Converting Map key of type "Boolean" can result in unexpected behavior
  })

  it("TODO: Test nested Map", () => {
    // noop
  })
})
