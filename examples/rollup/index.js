// @ts-check
import path from "path"

//! doesn't work with ts-check

// Check rollup config for notes
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
