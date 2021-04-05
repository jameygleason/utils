import fs from "fs"
import path from "path"

export function mkdir(dest: string): void {
  const splitPath: string[] = dest.split(path.sep)
  const buildPath: string[] = []

  // Walk tree to find missing directories in path
  for (let i = 0; i < splitPath.length; i++) {
    const walkTree: string = path.join(
      splitPath.slice(0, splitPath.length - i).join("/"),
    )

    if (fs.existsSync(walkTree)) {
      break
    }

    buildPath.push(walkTree)
  }

  // Build up directory path and make dest dir
  for (let i = 0; i < buildPath.length; i++) {
    const mkDir = buildPath[buildPath.length - i - 1]
    fs.mkdirSync(mkDir)
  }
}
