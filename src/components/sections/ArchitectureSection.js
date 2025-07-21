import React from 'react';
import ImageGrid from '../home/ImageGrid';
import { getImagesByCategory } from '../../data/imageData';

const ArchitectureSection = ({ onImageSelect }) => {
  const images = getImagesByCategory('architecture');

  return (
    <section id="architecture" className="section">
      <div className="section-header">Architecture</div>
      <div className="section-content">
        <ImageGrid images={images} onImageSelect={onImageSelect} />
      </div>
    </section>
  );
};

export default ArchitectureSection;