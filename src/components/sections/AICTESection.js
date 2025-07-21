import React from 'react';
import ImageGrid from '../home/ImageGrid';
import { getImagesByCategory } from '../../data/imageData';

const AICTESection = ({ onImageSelect }) => {
  const images = getImagesByCategory('aicte');

  return (
    <section id="aicte" className="section">
      <div className="section-header">AICTE</div>
      <div className="section-content">
        <ImageGrid images={images} onImageSelect={onImageSelect} />
      </div>
    </section>
  );
};

export default AICTESection;