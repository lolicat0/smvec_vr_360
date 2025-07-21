import React from 'react';
import ImageGrid from '../home/ImageGrid';
import { getImagesByCategory } from '../../data/imageData';

const AgricultureSection = ({ onImageSelect }) => {
  const images = getImagesByCategory('agriculture');

  return (
    <section id="agriculture" className="section">
      <div className="section-header">Agriculture</div>
      <div className="section-content">
        <ImageGrid images={images} onImageSelect={onImageSelect} />
      </div>
    </section>
  );
};

export default AgricultureSection;