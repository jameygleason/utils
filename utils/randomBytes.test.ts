import { strictEqual } from "assert"
import { randomBytes } from "./randomBytes" // .ts

const nums = [10, 25, 50, 73, 512]

describe("randomBytes", () => {
  it("Generates a string of random bytes", async () => {
    for (const num of nums) {
      const [bytes, error] = await randomBytes(num)
      if (error !== null) {
        strictEqual(true, false)
        return
      }
      if (bytes === null) {
        strictEqual(true, false)
        return
      }

      strictEqual(bytes.length, num)
    }
  })
})
