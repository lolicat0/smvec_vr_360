import React from 'react';
import ImageGrid from '../home/ImageGrid';
import { getImagesByCategory } from '../../data/imageData';

const LawSection = ({ onImageSelect }) => {
  const images = getImagesByCategory('law');

  return (
    <section id="law-block" className="section">
      <div className="section-header">Law Block</div>
      <div className="section-content">
        <ImageGrid images={images} onImageSelect={onImageSelect} />
      </div>
    </section>
  );
};

export default LawSection;