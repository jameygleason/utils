import { instanceOfBuiltin } from "./instanceOfBuiltin"

type Types = undefined | null | string | number | Array<any> | Object

export function isNil(arg: Types): boolean {
  if (!!instanceOfBuiltin(arg)[0] === false) {
    console.warn(`Type of ${instanceOfBuiltin(arg)[0]} is not supported`)
    return true
  }

  if (
    arg === undefined ||
    arg === null ||
    (arg.constructor === String && !!arg.trim()[0] === false) ||
    (arg.constructor === Number && isNaN(arg)) ||
    (arg.constructor === Array && !!arg[0] === false) ||
    (arg.constructor === Object && !!Object.keys(arg)[0] === false)
  ) {
    return true
  }

  if (arg.constructor === Boolean) {
    console.warn(
      "Boolean args return their original arg. This can lead to unexpected behavior. isNil checks for empty Strings, Objects, and Arrays, as well as NaN, null, and undefined.",
    )
    return arg
  }

  if (typeof arg === "symbol" || typeof arg === "bigint") {
    console.warn(`Type of ${typeof arg} is not supported`)
    return true
  }

  return false
}
