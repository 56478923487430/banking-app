const randomDigits = (length: number): string =>
  Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');

/** Generates a transaction id in the form TX392-941-230. */
export function generateTransactionId(): string {
  return `TX${randomDigits(3)}-${randomDigits(3)}-${randomDigits(3)}`;
}
