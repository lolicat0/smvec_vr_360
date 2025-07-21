// src/hooks/useVRControls.js
import { useState, useEffect, useCallback } from 'react';

export const useVRControls = (mediaData, onMediaChange) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Navigate to previous image
  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      if (onMediaChange && mediaData[newIndex]) {
        onMediaChange(mediaData[newIndex]);
      }
    }
  }, [currentIndex, mediaData, onMediaChange]);

  // Navigate to next image
  const goToNext = useCallback(() => {
    if (currentIndex < mediaData.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      if (onMediaChange && mediaData[newIndex]) {
        onMediaChange(mediaData[newIndex]);
      }
    }
  }, [currentIndex, mediaData, onMediaChange]);

  // Check if navigation is possible
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < mediaData.length - 1;

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isLoading) return;

      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, isLoading]);

  return {
    currentIndex,
    setCurrentIndex,
    goToPrevious,
    goToNext,
    canGoBack,
    canGoForward,
    isLoading,
    setIsLoading
  };
};