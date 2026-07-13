export interface LogoAsset {
  dataUrl: string;
  width: number;
  height: number;
}

/**
 * Loads an image from the given URL and re-encodes it as a standard RGBA PNG data URL via canvas.
 *
 * jsPDF's built-in PNG parser can fail silently on indexed/palette PNGs (common export format
 * from design tools), which is why a logo can simply not appear in a generated PDF with no error.
 * Drawing the image onto a canvas first guarantees a plain RGBA PNG that jsPDF can always embed.
 *
 * The natural width/height are returned too, so callers can size the logo in the PDF while
 * preserving its aspect ratio instead of forcing it into a square box.
 */
export async function loadLogoDataUrl(url: string): Promise<LogoAsset> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });

  const canvas = document.createElement('canvas');

  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;

  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Canvas 2D context unavailable');

  ctx.drawImage(image, 0, 0);

  return {
    dataUrl: canvas.toDataURL('image/png'),
    width: canvas.width,
    height: canvas.height,
  };
}
