import React, { useState, useEffect } from 'react';
import { useIntersectionObserver, getCloudinaryUrl } from '../../utils/imageLoader';

const ImageItem = ({ image, onImageSelect, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadHighQuality, setLoadHighQuality] = useState(false);
  
  const [imageRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Get optimized image URLs
  const lowQualityUrl = getCloudinaryUrl(image.src, 'low');
  const mediumQualityUrl = getCloudinaryUrl(image.src, 'medium');
  const highQualityUrl = getCloudinaryUrl(image.src, 'high');

  // Animation delay for staggered appearance
  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, index * 30); // Further reduced delay

      return () => clearTimeout(timer);
    }
  }, [isIntersecting, index]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setHasError(true);
  };

  const handleClick = () => {
    if (!hasError && isLoaded) {
      onImageSelect(image);
    }
  };

  const handleMouseEnter = () => {
    // Load high quality on hover for better UX
    setLoadHighQuality(true);
  };

  // Use medium quality by default, high quality on hover
  const getCurrentImageSrc = () => {
    if (loadHighQuality) return highQualityUrl;
    if (isVisible) return mediumQualityUrl;
    return lowQualityUrl;
  };

  const getImageClasses = () => {
    const classes = ['image-item'];
    
    if (isVisible) classes.push('visible');
    if (isLoaded) classes.push('loaded');
    if (loadHighQuality) classes.push('high-quality');
    
    return classes.join(' ');
  };

  return (
    <div 
      ref={imageRef}
      className={getImageClasses()}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      data-category={image.category}
    >
      {/* Simplified placeholder */}
      <div className={`image-placeholder ${!isLoaded ? 'visible' : ''}`}>
        <i className="fas fa-image"></i>
      </div>
      
      {/* Single optimized image */}
      {!hasError && isVisible ? (
        <img
          src={getCurrentImageSrc()}
          alt={image.alt}
          className="progressive-image"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      ) : hasError ? (
        <div className="image-error">
          <i className="fas fa-exclamation-triangle"></i>
          <span>Image not available</span>
        </div>
      ) : null}
      
      {/* UI elements */}
      <div className="image-overlay"></div>
      <div className="image-caption">{image.caption}</div>
      <div className="view-indicator">
        <i className="fas fa-vr-cardboard"></i>
      </div>
    </div>
  );
};

export default ImageItem;
