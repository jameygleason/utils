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
  tsconfig: "./tsconfig.json",
  useTsconfigDeclarationDir: true,
}

export const utils = [
  "isEmpty",
  "mkdir",
  "printObject",
  "rimraf",
  "safeJSONParse",
  "slugify",
  "toUpperCase",
  "mkdir",
  "unsafeStripHTML",
  "wait",
]

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
    exclude: ["node_modules", "*.js", "**/*.map", "**/*.d.ts", "!utils/**/*"],
  },
}

export default [
  {
    input: `./utils/${utils[0]}.ts`,
    output: {
      file: `./${utils[0]}.js`,
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: `./utils/${utils[1]}.ts`,
    output: {
      file: `./${utils[1]}.js`,
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: `./utils/${utils[2]}.ts`,
    output: {
      file: `./${utils[2]}.js`,
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: `./utils/${utils[3]}.ts`,
    output: {
      file: `./${utils[3]}.js`,
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: `./utils/${utils[4]}.ts`,
    output: {
      file: `./${utils[4]}.js`,
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: `./utils/${utils[5]}.ts`,
    output: {
      file: `./${utils[5]}.js`,
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: `./utils/${utils[6]}.ts`,
    output: {
      file: `./${utils[6]}.js`,
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: `./utils/${utils[7]}.ts`,
    output: {
      file: `./${utils[7]}.js`,
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: `./utils/${utils[8]}.ts`,
    output: {
      file: `./${utils[8]}.js`,
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
  {
    input: `./utils/${utils[9]}.ts`,
    output: {
      file: `./${utils[9]}.js`,
      format: "es",
      sourcemap: true,
      exports: "named",
    },
    ...config,
    plugins: [...config.plugins],
  },
]
