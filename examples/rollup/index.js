// @ts-check
import path from "path"

// Requires "paths" field to ignore false error
import { isNil } from "@signalchain/utils"
import { decamel } from "@signalchain/utils/decamel"
import { rimraf, mkdir } from "@signalchain/utils/node"
import { cleanDir } from "@signalchain/utils/node/cleanDir"

console.log("isNil:", isNil("nope"))
console.log("decamel:", decamel("camelCase"))

const dist = path.join(process.cwd(), "dist")
rimraf(dist)
mkdir(dist)
cleanDir(dist)
