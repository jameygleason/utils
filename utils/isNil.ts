import { instanceOfBuiltin } from "./instanceOfBuiltin"

type Types = undefined | null | string | number | Array<any> | Object

export function isNil(arg: Types): boolean {
  if (
    arg === undefined ||
    arg === null ||
    (arg.constructor === String && !!arg.trim()[0] === false) ||
    (arg.constructor === Number && isNaN(arg)) ||
    (Array.isArray(arg) && !!arg[0] === false) ||
    (arg.toString() === "[object Object]" && !!Object.keys(arg)[0] === false)
  ) {
    return true
  }

  if (arg.constructor === Boolean) {
    console.warn(
      "Boolean args return their original value. This can lead to unexpected behavior. isNil checks for empty Strings, Objects, and Arrays, as well as NaN, null, and undefined.",
    )
    return arg
  }

  if (typeof arg === "symbol" || typeof arg === "bigint") {
    console.warn(`${typeof arg} type not supported`)
    return true
  }

  if (!!instanceOfBuiltin(arg)[0] === true) {
    console.warn(`${instanceOfBuiltin(arg)[0]} type not supported`)
    return true
  }

  return false
}
