/**
 * Formats a monetary amount with a space as the thousands separator and a dot
 * as the decimal separator, e.g. 10000 -> "10 000.00".
 */
export function formatAmount(amount: number, decimals = 2): string {
  const sign = amount < 0 ? '-' : '';
  const fixed = Math.abs(amount).toFixed(decimals);
  const [intPart, decPart] = fixed.split('.');
  const groupedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return decPart ? `${sign}${groupedIntPart}.${decPart}` : `${sign}${groupedIntPart}`;
}
