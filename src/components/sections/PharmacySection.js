import React from 'react';
import ImageGrid from '../home/ImageGrid';
import { getImagesByCategory } from '../../data/imageData';

const PharmacySection = ({ onImageSelect }) => {
  const images = getImagesByCategory('pharmacy');

  return (
    <section id="pharmacy" className="section">
      <div className="section-header">Pharmacy</div>
      <div className="section-content">
        <ImageGrid images={images} onImageSelect={onImageSelect} />
      </div>
    </section>
  );
};

export default PharmacySection;