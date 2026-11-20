/**
 * Image upload, validation, and compression utility.
 * Compresses camera/phone photos before storage to avoid localStorage quota overflows
 * while preserving high fidelity for civic repair evidence.
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export const validateImageFile = (file: File): ValidationResult => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (!validTypes.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: `Invalid file type "${file.type}". Please upload JPG, PNG, or WebP images.`,
    };
  }

  // Maximum file size: 12MB before compression
  const maxSizeBytes = 12 * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max allowed size is 12MB.`,
    };
  }

  return { valid: true };
};

/**
 * Compresses an image file client-side using an HTML5 Canvas to produce a high-fidelity,
 * compact Data URI suitable for persistent browser storage.
 */
export const compressImageFile = (
  file: File,
  maxWidth = 1280,
  maxHeight = 960,
  quality = 0.82
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read image file.'));

    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image into memory.'));

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback if 2d context fails
          resolve(e.target?.result as string);
          return;
        }

        // Draw image with high-quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
};

