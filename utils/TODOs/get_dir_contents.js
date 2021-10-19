import fs from "fs"
import path from "path"
import kleur from "kleur"

export function get_dir_contents(source, ext_type) {
  if (!source) {
    throw new Error(kleur.red("get_dir_contents requires a source argument"))
  }

  if (ext_type) {
    const dirContentsByExt = fs.readdirSync(source).filter(file => {
      return file[0] !== "." && path.extname(file).match(ext_type)
    })
    return dirContentsByExt
  }

  const dirContents = fs.readdirSync(source)
  return dirContents
}
