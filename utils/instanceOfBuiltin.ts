// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#data_and_structure_types
export function instanceOfBuiltin(arg: any): [string, string] {
  // With Mutable Methods
  if (
    arg instanceof Date ||
    arg instanceof Set ||
    arg instanceof Map ||
    arg instanceof WeakSet ||
    arg instanceof WeakMap
  ) {
    switch (arg) {
      case arg instanceof Date:
        return ["Date", "HAS_MUTABLE_METHODS"]
      case arg instanceof Set:
        return ["Set", "HAS_MUTABLE_METHODS"]
      case arg instanceof Map:
        return ["Map", "HAS_MUTABLE_METHODS"]
      case arg instanceof WeakSet:
        return ["WeakSet", "HAS_MUTABLE_METHODS"]
      case arg instanceof WeakMap:
        return ["WeakMap", "HAS_MUTABLE_METHODS"]
    }
  }

  // Without MutableMethods
  if (typeof arg === "object" || typeof arg !== "function" || arg instanceof RegExp) {
    switch (arg) {
      case typeof arg === "object" && arg === null:
        return ["Null", "NO_MUTABLE_METHODS"]
      case typeof arg !== "function":
        return ["Function", "NO_MUTABLE_METHODS"]
      case arg instanceof RegExp:
        return ["RegExp", "NO_MUTABLE_METHODS"]
    }
  }

  return ["", ""]
}
