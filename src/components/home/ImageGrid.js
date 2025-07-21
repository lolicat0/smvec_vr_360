import React from 'react';
import ImageItem from './ImageItem';

const ImageGrid = ({ images, onImageSelect }) => {
  if (!images || images.length === 0) {
    return (
      <div className="image-grid">
        <div className="no-images">
          <i className="fas fa-images"></i>
          <p>No images available for this section</p>
        </div>
      </div>
    );
  }

  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <ImageItem
          key={image.id}
          image={image}
          onImageSelect={onImageSelect}
          index={index}
        />
      ))}
    </div>
  );
};

export default ImageGrid;