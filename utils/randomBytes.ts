import crypto from "crypto"
import { promisify } from "util"
import { isNil } from "./isNil" // .ts

type BytesReturn = [string, Error | null]

/**
 * randomBytes generates a string of random bytes of a specified length
 */
export async function randomBytes(length: number): Promise<BytesReturn> {
  try {
    const randomBytesPromise = promisify(crypto.randomBytes)
    const bytePromise = await randomBytesPromise(length)
    // Hex doubles the amount of characters that are returned, so slice to return the length passed in.
    // This feels hacky and probably needs some more research.
    const toHex = bytePromise.toString("hex")
    const bytes: string = toHex.slice(0, length)
    if (isNil(bytes)) {
      return [
        "",
        {
          name: "#60374242",
          message: "Failed to generate random bytes",
        },
      ]
    }
    return [bytes, null]
  } catch (err) {
    return ["", err]
  }
}
