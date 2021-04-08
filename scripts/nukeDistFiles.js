import path from "path"
import fg from "fast-glob"
import { rimrafJS } from "../buildUtils/rimrafJS.js"
import { isEmptyJS } from "../buildUtils/isEmptyJS.js"

const utils = [
  "isEmpty",
  "isEmpty.cjs",
  "mapToObject",
  "mapToObject.cjs",
  "mkdir",
  "mkdir.cjs",
  "printElapsed",
  "printElapsed.cjs",
  "printObject",
  "printObject.cjs",
  "rimraf",
  "rimraf.cjs",
  "safeJSONParse",
  "safeJSONParse.cjs",
  "slugify",
  "slugify.cjs",
  "toUpperCase",
  "toUpperCase.cjs",
  "unsafeStripHTML",
  "unsafeStripHTML.cjs",
  "wait",
  "wait.cjs",
]

export async function nukeDistFiles() {
  try {
    const utilFiles = utils.map(f => `${f}.js`)
    const deleteFiles = [...utilFiles, "typings"]
    const map = await fg(["!node_modules", "**/*.map", "**/*.d.ts"])

    deleteFiles.push(...map)

    if (!isEmptyJS(deleteFiles)) {
      for (const file of deleteFiles) {
        rimrafJS(path.join(process.cwd(), file))
      }
    }
  } catch (err) {
    console.error(err)
  }
}
nukeDistFiles()
