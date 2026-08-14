/**
 * Google Drive and General Image Utility
 * Converts Google Drive sharing/view links into direct high-resolution embeddable image URLs
 */

/**
 * Extracts Google Drive File ID from any variant of Google Drive URL
 */
export const extractGoogleDriveFileId = (inputUrl: string): string | null => {
  if (!inputUrl || typeof inputUrl !== 'string') return null;

  const url = inputUrl.trim();

  // Pattern 1: /file/d/{FILE_ID}/view or /file/d/{FILE_ID}
  const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (fileDMatch && fileDMatch[1]) {
    return fileDMatch[1];
  }

  // Pattern 2: id={FILE_ID} in query string (open?id=, uc?id=, etc.)
  const idQueryMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/i);
  if (idQueryMatch && idQueryMatch[1]) {
    return idQueryMatch[1];
  }

  // Pattern 3: lh3.googleusercontent.com/d/{FILE_ID}
  const lh3Match = url.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/i);
  if (lh3Match && lh3Match[1]) {
    return lh3Match[1];
  }

  // Pattern 4: drive.google.com/thumbnail?id={FILE_ID}
  const thumbMatch = url.match(/thumbnail\?id=([a-zA-Z0-9_-]+)/i);
  if (thumbMatch && thumbMatch[1]) {
    return thumbMatch[1];
  }

  // Pattern 5: drive.google.com/uc?export=view&id={FILE_ID}
  const ucMatch = url.match(/uc\?.*id=([a-zA-Z0-9_-]+)/i);
  if (ucMatch && ucMatch[1]) {
    return ucMatch[1];
  }

  return null;
};

/**
 * Checks if a string or URL is from Google Drive
 */
export const isGoogleDriveUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  return (
    url.includes('drive.google.com') ||
    url.includes('docs.google.com') ||
    url.includes('googleusercontent.com/d/') ||
    url.includes('google.com/file/d/')
  );
};

/**
 * Formats a Google Drive URL or File ID into a high-performance direct viewable image URL.
 * Uses Google's direct CDN endpoint (lh3.googleusercontent.com/d/ID) and thumbnail endpoints.
 */
export const formatGoogleDriveDirectUrl = (
  urlOrId: string,
  preferredType: 'cdn' | 'thumbnail' | 'uc' = 'cdn'
): string => {
  const fileId = extractGoogleDriveFileId(urlOrId) || urlOrId.trim();

  // If not a valid file ID length/format, return original
  if (!fileId || fileId.length < 10) {
    return urlOrId;
  }

  if (preferredType === 'thumbnail') {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`;
  }

  if (preferredType === 'uc') {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  // Google User Content CDN - most fast & reliable direct embed for web
  return `https://lh3.googleusercontent.com/d/${fileId}`;
};

/**
 * Universally resolves any image URL.
 * If it's a Google Drive link, converts it to direct embed URL.
 * Otherwise returns clean URL or fallback.
 */
export const resolveDirectImageUrl = (
  url?: string | null,
  fallback: string = 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1000&q=80'
): string => {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return fallback;
  }

  const cleanUrl = url.trim();

  if (isGoogleDriveUrl(cleanUrl)) {
    const fileId = extractGoogleDriveFileId(cleanUrl);
    if (fileId) {
      return formatGoogleDriveDirectUrl(fileId, 'cdn');
    }
  }

  return cleanUrl;
};
