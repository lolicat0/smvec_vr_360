// src/hooks/useImageLoader.js
import { useState, useEffect, useCallback } from 'react';

export const useImageLoader = () => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());

  // Preload image
  const preloadImage = useCallback((src) => {
    return new Promise((resolve, reject) => {
      if (loadedImages.has(src)) {
        resolve(src);
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, src]));
        resolve(src);
      };
      
      img.onerror = () => {
        setFailedImages(prev => new Set([...prev, src]));
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });
  }, [loadedImages]);

  // Preload multiple images
  const preloadImages = useCallback(async (imageUrls) => {
    const promises = imageUrls.map(url => preloadImage(url));
    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  }, [preloadImage]);

  // Check if image is loaded
  const isImageLoaded = useCallback((src) => {
    return loadedImages.has(src);
  }, [loadedImages]);

  // Check if image failed to load
  const isImageFailed = useCallback((src) => {
    return failedImages.has(src);
  }, [failedImages]);

  return {
    preloadImage,
    preloadImages,
    isImageLoaded,
    isImageFailed,
    loadedImages: Array.from(loadedImages),
    failedImages: Array.from(failedImages)
  };
};