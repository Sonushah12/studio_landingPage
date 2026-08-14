/**
 * Performance, Asset Preloading, and In-Memory Caching Utilities
 */

const memoryCache = new Map<string, { data: any; expiry: number }>();

/**
 * Stores arbitrary data in in-memory cache with TTL (Time to Live in ms)
 */
export const setCacheItem = (key: string, data: any, ttlMs: number = 300000) => {
  memoryCache.set(key, {
    data,
    expiry: Date.now() + ttlMs,
  });
};

/**
 * Retrieves cached item or null if expired/missing
 */
export const getCacheItem = <T = any>(key: string): T | null => {
  const item = memoryCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    memoryCache.delete(key);
    return null;
  }
  return item.data as T;
};

/**
 * Pre-caches critical images in the browser background for instant transitions
 */
export const prefetchImages = (urls: string[]): void => {
  if (typeof window === 'undefined') return;

  const preload = () => {
    urls.forEach((url) => {
      if (!url || typeof url !== 'string') return;
      const img = new Image();
      img.src = url;
    });
  };

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(preload);
  } else {
    setTimeout(preload, 1000);
  }
};
