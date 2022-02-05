import fs from "fs"
import path from "path"
import { assert } from "chai"
import { rimraf } from "../dist/rimraf.js"
import { mkdir } from "../dist/mkdir.js"

describe("rimraf", () => {
	it("Deletes single file", () => {
		const file = "./DELETE.js"
		fs.writeFileSync(file, "// noop")
		assert.strictEqual(fs.existsSync(file), true)
		rimraf(file)
		assert.strictEqual(fs.existsSync(file), false)
	})

	it("Deletes file in a directory", () => {
		const dir = "./DELETE"
		mkdir(dir)
		const file = "./DELETE/DELETE.js"
		fs.writeFileSync(file, "// noop")
		assert.strictEqual(fs.existsSync(file), true)
		rimraf(file)
		assert.strictEqual(fs.existsSync(file), false)
	})

	it("Deletes empty directory", () => {
		const dir = "./DELETE"
		mkdir(dir)
		assert.strictEqual(fs.existsSync(dir), true)
		rimraf(dir)
		assert.strictEqual(fs.existsSync(dir), false)
	})

	it("Deletes directory with file in it", () => {
		const dir = "./DELETE"
		mkdir(dir)
		const file = "./DELETE/DELETE.js"
		fs.writeFileSync(file, "// noop")
		assert.strictEqual(fs.existsSync(file), true)
		rimraf(dir)
		assert.strictEqual(fs.existsSync(dir), false)
	})

	it("Deletes nested directories and files", () => {
		const depth = 3
		const dirBase = path.join(process.cwd(), "DELETE")
		let dir = dirBase

		for (let i = 0; i < depth; i++) {
			dir = path.join(dir, `nested${i + 1}`)
		}
		mkdir(dir)

		const file = path.join(dir, "DELETE.js")
		fs.writeFileSync(file, "// noop")
		assert.strictEqual(fs.existsSync(file), true)
		rimraf(dirBase)
		assert.strictEqual(fs.existsSync(dirBase), false)
	})
})
