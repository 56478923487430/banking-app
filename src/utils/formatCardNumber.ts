/**
 * Formats a card number string with a space every 4 digits.
 * Strips all non-digit characters before formatting.
 */
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);

  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

/**
 * Returns the raw digits from a formatted card number.
 */
export function stripCardNumber(value: string): string {
  return value.replace(/\D/g, '');
}
