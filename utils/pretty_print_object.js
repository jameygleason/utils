import kleur from "kleur"

export function pretty_print_object(object, pad = "", indention = "spaces") {
  if (!object) {
    throw new Error(
      kleur.red("pretty_print_object requires an Object argument"),
    )
  }

  const indent = indention === "spaces" ? "  " : "\t"
  let out = ""

  if (object.constructor === Array) {
    out += "[\n"
    for (let i = 0; i < object.length; i++) {
      out +=
        pad +
        indent +
        pretty_print_object(
          typeof object[i] === "string" ? `'${object[i]}'` : object[i],
          pad + indent,
        ) +
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
        pretty_print_object(
          typeof object[i] === "string" ? `'${object[i]}'` : object[i],
          pad + indent,
        ) +
        "," +
        "\n"
    }
    out += pad + "}"
  } else {
    out += object
  }

  return out
}
