import fs from "fs"
import path from "path"
import kleur from "kleur"
import { isEmptyJS } from "./isEmptyJS.js" // .ts

export function rimrafJS(entryPath) {
  if (isEmptyJS(entryPath)) {
    throw new Error(kleur.red("rimraf requires a path to a directory or file"))
  }

  if (!fs.existsSync(entryPath)) {
    return
  }

  const stats = fs.statSync(entryPath)

  if (stats.isDirectory()) {
    fs.readdirSync(entryPath).forEach(entry => {
      rimrafJS(path.join(entryPath, entry))
    })

    fs.rmdirSync(entryPath)
    return
  }

  fs.unlinkSync(entryPath)
}
