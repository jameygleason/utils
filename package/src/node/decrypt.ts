import crypto from "crypto"
import { randomBytes } from "./randomBytes"
import { isNil } from "../isNil"
import { safeJSONParse } from "../safeJSONParse"

interface Options {
	algorithm: string
	byteLength: number
}

type DecryptionReturn = [string, Error | null]

/**
 * Decrypt value with key
 * example: https://www.youtube.com/watch?v=heldAl8Cfr4
 *
 * @param {string!} key - 32 character public key
 * @param {string!} value - string you wish to decrypt
 */
export async function decrypt(key: string, value: string, options: Options): Promise<DecryptionReturn> {
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

		const decipher = await crypto.createDecipheriv(algorithm, key, initializationVector)

		let decryptedValue = await decipher.update(value, "hex", "utf8")
		decryptedValue += await decipher.final("utf8")

		const match = /{[\s\S]+?}/.exec(decryptedValue)
		if (match && isNil(match[0])) {
			return [
				"",
				{
					name: "#92928743",
					message: "Decryption failed",
				},
			]
		}

		// @ts-ignore
		return [safeJSONParse(match[0]), null]
	} catch (err) {
		// @ts-ignore
		return ["", err]
	}
}
