import fs from "fs"
import path from "path"
import module from "module"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "rollup-plugin-typescript2"

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
    exclude: ["node_modules", "*.js", "!utils/**/*", "**/*.map", "**/*.d.ts"],
  },
}

export default [
  {
    input: "./utils/isEmpty.ts",
    output: {
      file: "./isEmpty.js",
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: "./utils/mkdir.ts",
    output: {
      file: "./mkdir.js",
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: "./utils/printObject.ts",
    output: {
      file: "./printObject.js",
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: "./utils/rimraf.ts",
    output: {
      file: "./rimraf.js",
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: "./utils/safeJSONParse.ts",
    output: {
      file: "./safeJSONParse.js",
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: "./utils/slugify.ts",
    output: {
      file: "./slugify.js",
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: "./utils/toUpperCase.ts",
    output: {
      file: "./toUpperCase.js",
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: "./utils/unsafeStripHTML.ts",
    output: {
      file: "./unsafeStripHTML.js",
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
]
