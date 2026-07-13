/**
 * Formats a monetary amount for PDF output with a space between the currency symbol and digits
 * so glyphs do not overlap in jsPDF.
 */
export function formatPdfAmount(currencySymbol: string, amount: number, decimals = 2): string {
  const fixed = amount.toFixed(decimals);
  const [intPart, decPart] = fixed.split('.');
  const groupedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const formatted = decPart ? `${groupedIntPart}.${decPart}` : groupedIntPart;

  return `${currencySymbol} ${formatted}`;
}
