interface OptionProperties {
  style: string
  currency: string
  minimumFractionDigits: number
}

interface Options {
  locales: "en-US"
  options: OptionProperties
}

export interface formattedCurrency {
  currency: string
  integer: string
  separator: string
  decimal: string
  fraction: string
}

export function formatCurrency(amount: number, options?: Options): formattedCurrency {
  const opts: Options = {
    locales: "en-US",
    options: {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    },
    ...options,
  }

  // if its a whole, dollar amount, leave off the .00
  if (amount % 100 === 0) {
    opts.options.minimumFractionDigits = 0
  }

  const values = new Intl.NumberFormat(opts.locales, opts.options).formatToParts(amount / 100)

  const result = {
    currency: "",
    integer: "",
    separator: "",
    decimal: "",
    fraction: "",
  }

  for (const obj of values) {
    if (obj.type === "currency") {
      result.currency = obj.value
      continue
    }
    if (obj.type === "integer" || obj.type === "group") {
      result.integer = result.integer + obj.value
    }
    if (obj.type === "group") {
      result.separator = obj.value
      continue
    }
    if (obj.type === "decimal") {
      result.decimal = obj.value
      continue
    }
    if (obj.type === "fraction") {
      result.fraction = obj.value
    }
  }

  return result
}
