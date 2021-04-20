export function isEmpty(
  value: undefined | null | string | number | Array<any> | Object,
): boolean | void {
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
  console.error(`Type of ${typeof value} is not a valid argument`)
}
