import React from 'react';
import ImageGrid from '../home/ImageGrid';
import { getImagesByCategory } from '../../data/imageData';

const EthnoTechSection = ({ onImageSelect }) => {
  const images = getImagesByCategory('ethnotech');

  return (
    <section id="ethno-tech" className="section">
      <div className="section-header">Ethno Tech</div>
      <div className="section-content">
        <ImageGrid images={images} onImageSelect={onImageSelect} />
      </div>
    </section>
  );
};

export default EthnoTechSection;