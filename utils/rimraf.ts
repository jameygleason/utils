import fs from "fs"
import path from "path"

export function rimraf(entryPath: string): void {
  if (!fs.existsSync(entryPath)) {
    return
  }

  if (fs.statSync(entryPath).isDirectory()) {
    fs.readdirSync(entryPath).forEach(entry => {
      rimraf(path.join(entryPath, entry))
    })

    fs.rmdirSync(entryPath)
    return
  }

  fs.unlinkSync(entryPath)
}
