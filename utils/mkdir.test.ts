import fs from "fs"
import path from "path"
import { assert } from "chai"
import { rimraf } from "../dist/rimraf.js"
import { mkdir } from "../dist/mkdir.js"

describe("mkdir", () => {
	it("Creates a root level directory", () => {
		const dir = "./DELETE"
		mkdir(dir)
		assert.strictEqual(fs.existsSync(dir), true)
		rimraf(dir)
		assert.strictEqual(fs.existsSync(dir), false)
	})

	it("Creates nested directories (absolute path)", () => {
		const depth = 3
		const dirBase = path.join(process.cwd(), "DELETE")
		let dir = dirBase

		for (let i = 0; i < depth; i++) {
			dir = path.join(dir, `nested${i + 1}`)
		}
		mkdir(dir)

		assert.strictEqual(fs.existsSync(dir), true)
		rimraf(dirBase)
		assert.strictEqual(fs.existsSync(dirBase), false)
	})

	it("Creates nested directories (relative path)", () => {
		const depth = 3
		const dirBase = "./DELETE"
		let dir = dirBase

		for (let i = 0; i < depth; i++) {
			dir = path.join(dir, `nested${i + 1}`)
		}
		mkdir(dir)

		assert.strictEqual(fs.existsSync(dir), true)
		rimraf(dirBase)
		assert.strictEqual(fs.existsSync(dirBase), false)
	})
})
