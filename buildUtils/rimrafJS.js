import fs from "fs"
import path from "path"

export function rimrafJS(entryPath) {
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
