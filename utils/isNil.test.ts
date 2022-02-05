import chai, { assert, expect } from "chai"
import sinonChai from "sinon-chai"
import { spy } from "sinon"
import { isNil } from "../dist/isNil.js"

chai.use(sinonChai)

describe("isNil", () => {
	beforeEach(function () {
		spy(console, "warn")
	})

	afterEach(function () {
		// @ts-ignore
		console.warn.restore()
	})

	const isTrue = [true, undefined, null, "", NaN, [], {}]

	it('Returns "true" for empty values', () => {
		for (const input of isTrue) {
			const bool = isNil(input)
			assert.strictEqual(bool, true)
		}
	})

	const isFalse = [false, "thing", 0, ["thing"], { thing: true }]

	it('Returns "false" for values that are not empty', () => {
		for (const value of isFalse) {
			const bool = isNil(value)
			assert.strictEqual(bool, false)
		}
	})

	const shouldWarn = [
		{
			input: true,
			out: "Boolean args return their original value. This can lead to unexpected behavior. isNil checks for empty Strings, Objects, and Arrays, as well as NaN, null, and undefined.",
		},
		{
			input: false,
			out: "Boolean args return their original value. This can lead to unexpected behavior. isNil checks for empty Strings, Objects, and Arrays, as well as NaN, null, and undefined.",
		},
		{
			input: BigInt(9007199254740991),
			out: "bigint type not supported",
		},
		{
			// bigint literals are not available when targeting lower than ES2020.ts(2737)
			// @ts-ignore
			input: 1n,
			out: "bigint type not supported",
		},
		{
			input: Symbol("foo"),
			out: "symbol type not supported",
		},
		{
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			input: () => {},
			out: "Function type not supported",
		},
	]

	it("Warns for value types that are not supported", () => {
		for (const { input, out } of shouldWarn) {
			isNil(input)
			// @ts-ignore
			expect(console.warn).to.have.been.calledWith(out)
		}
	})
})
