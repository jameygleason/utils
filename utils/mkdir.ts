import fs from "fs"
import path from "path"

export function mkdir(dest: string): void {
  const splitDest: string[] = dest.split(path.sep)
  const buildPaths: string[] = []

  // Find directories that don't exist in dest path
  for (let i = 0; i < splitDest.length; i++) {
    const newPath: string = path.join(splitDest.slice(0, splitDest.length - i).join("/"))

    if (fs.existsSync(newPath)) {
      break
    }

    buildPaths.push(newPath)
  }

  // Create directories from deepest existing directory, to the dest directory
  for (let i = 0; i < buildPaths.length; i++) {
    fs.mkdirSync(buildPaths[buildPaths.length - i - 1])
  }
}
