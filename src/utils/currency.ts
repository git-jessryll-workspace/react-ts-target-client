export function formatCurrency(
  value: number | string,
  currencyCode = "USD",
  locale = "en-US"
) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  });
  return formatter.format(+value);
}
