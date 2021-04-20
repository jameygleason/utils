export function isEmpty(
  value: undefined | null | string | number | Array<any> | Object,
): boolean {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "number" && isNaN(value)) ||
    (value.constructor === String && value.trim().length === 0) ||
    (value.constructor === Array && value.length === 0) ||
    (value.constructor === Object && Object.keys(value).length === 0)
  ) {
    return true
  }

  if (value.constructor === Boolean) {
    console.warn(
      "Boolean args return original value. This can lead to unexpected behavior. isEmpty checks for empty String, Object, Array, NaN, null, and undefined.",
    )
    return value
  }

  // @ts-ignore
  if (
    typeof value === "function" ||
    typeof value === "symbol" ||
    typeof value === "bigint"
  ) {
    throw new Error(`Type of ${typeof value} is not supported`)
  }

  return false
}
