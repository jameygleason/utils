import fs from "fs"
import path from "path"
import module from "module"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "rollup-plugin-typescript2"
import multiInput from "rollup-plugin-multi-input"
import dts from "rollup-plugin-dts"

const pkg = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"),
)
if (Object.keys(pkg).length === 0) {
  console.error("Failed to parse package.json")
}

const production = !process.env.ROLLUP_WATCH

const tsOptions = {
  check: !!process.env.TS_CHECK_ENABLED,
  tsconfig: "tsconfig.json",
  useTsconfigDeclarationDir: true,
}

function mvUtilsDTSFiles() {
  return {
    generateBundle() {
      const src = path.join(process.cwd(), "typings", "src", "utils")
      const dest = path.join(process.cwd(), "utils")
      const files = fs.readdirSync(src)
      fs.writeFileSync(
        path.join(dest, ".generated-files"),
        "// This directory is generated at build time",
      )
      files.forEach(file => {
        const fileSrc = `${src}/${file}`
        const fileDest = `${dest}/${file}`
        fs.copyFile(fileSrc, fileDest, err => {
          if (err) {
            throw new Error(err)
          }
        })
      })
    },
  }
}

const config = {
  plugins: [
    resolve({
      extensions: [".js", ".ts"],
    }),
    commonjs(),
    typescript(tsOptions),
    production &&
      terser({
        output: {
          comments: () => false,
        },
      }),
  ],
  external: [].concat(
    Object.keys(pkg.devDependencies || {}),
    Object.keys(pkg.peerDependencies || {}),
    module.builtinModules,
  ),
  onwarn: (warning, onwarn) =>
    warning.code === "CIRCULAR_DEPENDENCY" && onwarn(warning),
  watch: {
    clearScreen: false,
    exclude: [
      "node_modules",
      "*.js",
      "!utils/**/*",
      "**/*.map",
      "**/*.d.ts",
    ],
  },
}

export default [
  {
    input: "./utils/isEmpty.ts",
    output: { file: "./isEmpty.js", format: "es", sourcemap: true, exports: "named" },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: ["src/utils/**/*.ts"],
    output: {
      dir: "./utils",
      format: "es",
      sourcemap: true,
    },
    ...config,
    plugins: [multiInput({ relative: "./src/utils" }), ...config.plugins],
  },
  {
    input: "./main.d.ts",
    output: [
      {
        file: "typings/types.d.ts",
        format: "es",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [dts(), mvUtilsDTSFiles()],
  },
]
