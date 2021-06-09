export function isNil(arg: undefined | null | string | number | Array<any> | Object): boolean {
  if (
    arg === undefined ||
    arg === null ||
    (arg.constructor === String && arg.trim().length === 0) ||
    (arg.constructor === Number && isNaN(arg)) ||
    (arg.constructor === Array && !!arg[0] === false) ||
    (arg.constructor === Object && !!Object.keys(arg)[0] === false)
  ) {
    return true
  }

  if (arg.constructor === Boolean) {
    console.warn(
      "Boolean args return their original value. This can lead to unexpected behavior. isNil checks for empty Strings, Objects, and Arrays, as well as NaN, null, and undefined.",
    )
    return arg
  }

  if (typeof arg === "function" || typeof arg === "symbol" || typeof arg === "bigint") {
    console.warn(`Type of ${typeof arg} is not supported`)
    return true
  }

  return false
}
