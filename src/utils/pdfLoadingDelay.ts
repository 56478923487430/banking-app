export const PDF_LOADING_MS = 5000;

/**
 * Simulates document preparation time before PDF generation starts.
 * Duration matches the transfer processing screen so every "preparing..."
 * moment in the app feels consistent.
 */
export function waitForPdfLoading(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, PDF_LOADING_MS);
  });
}
