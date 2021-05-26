import { performance } from "perf_hooks"
import { assert } from "chai"
import { wait } from "./wait"

describe("wait", () => {
  it("It waits the right amount of time (then syntax)", async () => {
    const t1 = 200
    const t2 = 500
    const start = performance.now()
    let end1
    let end2

    // Usage:
    wait(t1)
      .then(() => {
        end1 = performance.now()
        return wait(t2)
      })
      .then(() => {
        end2 = performance.now()
      })
    // Usage END

    // asserts don't work in a then block, so ironically we have to use the wait function to get a proper test result
    await wait(t1 + t2)
    assert.strictEqual(end1 >= start + t1, true)
    assert.strictEqual(end1 >= start + t1 + 2000, false)
    assert.strictEqual(end2 >= start + t2, true)
    console.log("end2:", end2)
    console.log("start + t2:", start + t2)
    console.log("end2 >= start + t2:", end2 >= start + t2)
    assert.strictEqual(end2 >= start + t2 + 2000, false)
  })

  it("It waits the right amount of time (async syntax)", async () => {
    const start = performance.now()

    const t1 = 200
    await wait(t1)
    const end1 = performance.now()
    assert.strictEqual(end1 >= start + t1, true)
    assert.strictEqual(end1 >= start + t1 + 2000, false)

    const t2 = 500
    await wait(t2)
    const end2 = performance.now()
    assert.strictEqual(end2 >= start + t2, true)
    assert.strictEqual(end2 >= start + t2 + 2000, false)
  })
})
