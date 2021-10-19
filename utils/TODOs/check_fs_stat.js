import fs from "fs"
import util from "util"
import kleur from "kleur"

export async function check_fs_stat(src) {
  if (!src) throw new Error(kleur.red("check_fs_stat requires a source path"))

  let isFile
  let isDirectory
  const stat = await util.promisify(fs.stat)

  await stat(src)
    .then(stats => {
      isFile = stats.isFile()
      isDirectory = stats.isDirectory()
    })
    .catch(err => {
      throw new Error(err)
    })

  return { isFile, isDirectory }
}
