export function objectToString(object, pad = "", indention = "spaces"): string {
  const indent = indention === "spaces" ? "  " : "\t"
  let out = ""

  if (object.constructor === Array) {
    out += "[\n"
    for (let i = 0; i < object.length; i++) {
      out +=
        pad +
        indent +
        objectToString(typeof object[i] === "string" ? `'${object[i]}'` : object[i], pad + indent) +
        "," +
        "\n"
    }
    out += pad + "]"
  } else if (object.constructor === Object) {
    out += "{\n"
    for (const i in object) {
      let key = i
      if (i.match(/-/g)) {
        key = `'${i}'`
      }

      out +=
        pad +
        indent +
        key +
        ": " +
        objectToString(typeof object[i] === "string" ? `'${object[i]}'` : object[i], pad + indent) +
        "," +
        "\n"
    }
    out += pad + "}"
  } else {
    out += object
  }

  return out
}