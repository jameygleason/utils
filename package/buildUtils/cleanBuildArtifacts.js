import path from "path"
import { rimraf } from "./rimraf.js"

export function cleanBuildArtifacts() {
	rimraf(path.join(process.cwd(), "dist"))
	rimraf(path.join(process.cwd(), "types"))
}
