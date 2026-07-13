// jsPDF's built-in fonts (Helvetica/Times/Courier) only reliably support the WinAnsi/Latin-1
// character set. A symbol outside that set - like the Ukrainian hryvnia sign "₴" - gets silently
// mis-encoded: jsPDF truncates the character code to its low byte, so "₴" (U+20B4) turns into
// the WinAnsi byte 0xB4, which renders as an acute accent ("´"), and it also corrupts the
// surrounding text on that line. Symbols confirmed safe (present in the standard WinAnsi table)
// are kept as-is; anything else falls back to the plain currency code (e.g. "UAH").
const PDF_SAFE_CURRENCY_SYMBOLS = new Set(['€', '$', '£', '¥', '₩', '₫']);

/**
 * Returns a currency label that is safe to pass to jsPDF's doc.text(): the symbol itself when
 * it's part of the standard PDF font encoding, otherwise the currency code.
 */
export function getPdfCurrencyLabel(currencySymbol: string, currencyCode: string): string {
  return PDF_SAFE_CURRENCY_SYMBOLS.has(currencySymbol) ? currencySymbol : currencyCode;
}

/**
 * Computes a width/height for doc.addImage() that preserves the source image's aspect ratio,
 * so a wide logo isn't squeezed into a square box (which visually compresses it horizontally).
 */
export function getPdfLogoSize(
  naturalWidth: number,
  naturalHeight: number,
  maxWidth: number
): { width: number; height: number } {
  const aspectRatio = naturalWidth / naturalHeight;

  return { width: maxWidth, height: maxWidth / aspectRatio };
}
