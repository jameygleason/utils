import fs from "fs"
import path from "path"
import module from "module"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "rollup-plugin-typescript2"

const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"))
if (Object.keys(pkg).length === 0) {
  console.error("Failed to parse package.json")
}

const options = {
  plugins: [
    resolve({
      extensions: [".ts"],
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      // useTsconfigDeclarationDir: true,
    }),
  ],
  external: [].concat(
    Object.keys(pkg.dependencies || {}),
    Object.keys(pkg.devDependencies || {}),
    Object.keys(pkg.peerDependencies || {}),
    module.builtinModules,
  ),
  onwarn: (warning, onwarn) => warning.code === "CIRCULAR_DEPENDENCY" && onwarn(warning),
  watch: {
    clearScreen: false,
    include: "utils",
    exclude: ["node_modules", "*.js", "*.cjs", "*.mjs", "*.map", "*.d.ts", "**/*.test.*", "!utils/**/*"],
  },
}

const config = []

for (const k of Object.keys(pkg.exports)) {
  const filename = k.slice(2, k.length)

  config.push({
    input: `./utils/${filename}.ts`,
    output: [
      {
        file: `./${filename}.mjs`,
        format: "es",
        sourcemap: true,
        exports: "named",
      },
      {
        file: `./${filename}.cjs`,
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    ...options,
    plugins: [...options.plugins],
  })
}

export default config
