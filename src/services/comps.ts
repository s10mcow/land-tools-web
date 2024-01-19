export function formatPrice(price: number | null): string {
  return price
    ? `$${price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : "N/A";
}
