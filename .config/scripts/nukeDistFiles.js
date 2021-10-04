import fs from "fs"
import path from "path"
import fg from "fast-glob"
import { rimrafJS } from "../../buildUtils/rimrafJS.js"

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"))
if (Object.keys(pkg).length === 0) {
  console.error("Failed to parse package.json")
}

export async function nukeDistFiles() {
  try {
    const utilFiles = []

    for (const file of Object.keys(pkg.exports)) {
      const filename = file.slice(2, file.length)
      utilFiles.push(`${filename}.js`)
      utilFiles.push(`${filename}.mjs`)
      utilFiles.push(`${filename}.cjs.js`)
      utilFiles.push(`${filename}.cjs`)
    }

    const deleteFiles = [...utilFiles, "typings"]
    const map = await fg(["!node_modules", "**/*.map", "**/*.d.ts"])

    deleteFiles.push(...map)
    for (const file of deleteFiles) {
      rimrafJS(path.join(process.cwd(), file))
    }
  } catch (err) {
    console.error(err)
  }
}
nukeDistFiles()
