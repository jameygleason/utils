import crypto from "crypto"
import { isNil } from "./isNil" // .ts
import { randomBytes } from "./randomBytes" // .ts

interface Options {
  algorithm: string
  byteLength: number
}

type EncryptionReturn = [string, Error | null]

/**
 * Encrypt value with key
 * example: https://www.youtube.com/watch?v=heldAl8Cfr4
 *
 * @param {string!} key - 32 character public key
 * @param {string!} value - string you wish to encrypt
 */
export async function encrypt(
  key: string,
  value: string,
  options: Options,
): Promise<EncryptionReturn> {
  try {
    const algorithm = options?.algorithm || "aes-256-cbc"
    const byteLength = options?.byteLength || 16

    const [initializationVector, err] = await randomBytes(byteLength)
    if (err) {
      return ["", err]
    }

    if (initializationVector?.length !== byteLength) {
      return [
        "",
        {
          name: "#67432928",
          message: `Initialization vector failed with byte length ${byteLength}`,
        },
      ]
    }
    const cipher = await crypto.createCipheriv(algorithm, key, initializationVector)

    // CLEAR_PAD_START is a hack to get around a weird encoding thing with the start of the value string
    let encryptedValue = await cipher.update(`CLEAR_PAD_START ${value}`, "utf8", "hex")
    encryptedValue += await cipher.final("hex")

    if (isNil(encryptedValue)) {
      return [
        "",
        {
          name: "#92928743",
          message: "Encryption failed",
        },
      ]
    }

    return [encryptedValue, null]
  } catch (err) {
    return ["", err]
  }
}
