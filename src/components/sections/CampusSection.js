// src/components/sections/CampusSection.js
import React from 'react';
import ImageGrid from '../home/ImageGrid';
import { getImagesByCategory } from '../../data/imageData';

const CampusSection = ({ onImageSelect }) => {
  const campusImages = getImagesByCategory('campus');

  return (
    <section id="campus" className="section">
      <div className="section-header">Campus</div>
      <div className="section-content">
        <ImageGrid images={campusImages} onImageSelect={onImageSelect} />
      </div>
    </section>
  );
};

export default CampusSection;