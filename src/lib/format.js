/** Formats a smallest-currency-unit integer (e.g. cents) as a localized money string. */
export function formatMoney(amount, currency = "usd") {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}
