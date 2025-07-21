import React from 'react';
import ImageGrid from '../home/ImageGrid';
import { getImagesByCategory } from '../../data/imageData';

const ArtsScienceSection = ({ onImageSelect }) => {
  const images = getImagesByCategory('artsscience');

  return (
    <section id="arts-science" className="section">
      <div className="section-header">Arts and Science</div>
      <div className="section-content">
        <ImageGrid images={images} onImageSelect={onImageSelect} />
      </div>
    </section>
  );
};

export default ArtsScienceSection;