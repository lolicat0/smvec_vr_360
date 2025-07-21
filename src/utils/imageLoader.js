// src/utils/imageLoader.js
// Utility functions for image loading and Cloudinary transformations

import React from 'react';

/**
 * Generate Cloudinary URL with quality transformations
 * @param {string} originalUrl - Original Cloudinary URL
 * @param {string} quality - Quality level ('low', 'medium', 'high')
 * @returns {string} Transformed URL
 */
export const getCloudinaryUrl = (originalUrl, quality = 'medium') => {
  if (!originalUrl || !originalUrl.includes('cloudinary.com')) {
    return originalUrl;
  }

  const qualityParams = {
    low: 'q_20,f_auto,w_200,h_150,c_fill,e_blur:200',
    medium: 'q_40,f_auto,w_400,h_300,c_fill',
    high: 'q_60,f_auto,w_600,h_450,c_fill'
  };

  // Insert transformation parameters into Cloudinary URL
  const transformParam = qualityParams[quality] || qualityParams.medium;
  
  // Find the position to insert transformations (after /upload/)
  const uploadIndex = originalUrl.indexOf('/upload/');
  if (uploadIndex === -1) return originalUrl;
  
  const beforeUpload = originalUrl.substring(0, uploadIndex + 8);
  const afterUpload = originalUrl.substring(uploadIndex + 8);
  
  return `${beforeUpload}${transformParam}/${afterUpload}`;
};

/**
 * Custom hook for intersection observer
 * @param {Object} options - Intersection observer options
 * @returns {Array} [ref, isIntersecting, entry]
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [entry, setEntry] = React.useState(null);
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options.threshold, options.rootMargin]);

  return [elementRef, isIntersecting, entry];
};
