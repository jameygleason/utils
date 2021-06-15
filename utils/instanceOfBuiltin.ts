// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#data_and_structure_types

/**
 * @param {any}
 *
 * @returns {Array[string, string]} [Typeof instance, if it has mutable methods]
 */
export function instanceOfBuiltin(arg: any): [string, string] {
  // With Mutable Methods
  if (arg instanceof Date) {
    return ["Date", "HAS_MUTABLE_METHODS"]
  } else if (arg instanceof Set) {
    return ["Set", "HAS_MUTABLE_METHODS"]
  } else if (arg instanceof Map) {
    return ["Map", "HAS_MUTABLE_METHODS"]
  } else if (arg instanceof WeakSet) {
    return ["WeakSet", "HAS_MUTABLE_METHODS"]
  } else if (arg instanceof WeakMap) {
    return ["WeakMap", "HAS_MUTABLE_METHODS"]
  }

  // Without MutableMethods
  if (arg === null) {
    return ["Null", "NO_MUTABLE_METHODS"]
  } else if (typeof arg === "function") {
    return ["Function", "NO_MUTABLE_METHODS"]
  } else if (arg instanceof RegExp) {
    return ["RegExp", "NO_MUTABLE_METHODS"]
  }

  return ["", ""]
}
