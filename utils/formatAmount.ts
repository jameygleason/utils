export interface FormattedAmount {
  currency: string
  dollars: string
  decimal: string
  cents: string
}

interface OptionsOptions {
  style: string
  currency: string
  minimumFractionDigits: number
}

interface Options {
  locales: "en-US"
  options: OptionsOptions
}

export function formatAmount(amount: number, options?: Options, format?: boolean): FormattedAmount {
  let amountToInt = amount
  if (typeof amount === "string") {
    amountToInt = parseInt(amount)
  }

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
  if (amountToInt % 100 === 0) {
    opts.options.minimumFractionDigits = 0
  }

  let k = "formatToParts"
  if (!!format !== false) {
    k = "format"
  }

  const value = new Intl.NumberFormat(opts.locales, opts.options)[k](amountToInt / 100)

  return {
    currency: value[0]?.value || "",
    dollars: k === "formatToParts" ? value[1]?.value : value,
    decimal: k === "formatToParts" ? value[2]?.value : value,
    cents: value[3]?.value || "",
  }
}
