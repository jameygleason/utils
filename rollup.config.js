import fs from "fs"
import path from "path"
import module from "module"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "rollup-plugin-typescript2"

const pkg = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"),
)
if (Object.keys(pkg).length === 0) {
  console.error("Failed to parse package.json")
}

const tsOptions = {
  tsconfig: "./tsconfig.json",
  useTsconfigDeclarationDir: true,
}

const config = {
  plugins: [
    resolve({
      extensions: [".js", ".ts"],
    }),
    commonjs(),
    typescript(tsOptions),
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

export default Object.keys(pkg.exports).map(k => {
  const filename = k.slice(2, k.length)
  return {
    input: `./utils/${filename}.ts`,
    output: [
      {
        file: `./${filename}.js`,
        format: "es",
        sourcemap: true,
        exports: "named",
      },
      {
        file: `./${filename}.mjs`,
        format: "es",
        sourcemap: true,
        exports: "named",
      },
      {
        file: `./${filename}.cjs.js`,
        format: "cjs",
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
    ...config,
    plugins: [...config.plugins],
  }
})
