// src/components/sections/EngineeringSection.js
import React from 'react';
import ImageGrid from '../home/ImageGrid';
import { getImagesByCategory } from '../../data/imageData';

const EngineeringSection = ({ activeDepartment, onImageSelect }) => {
  const departmentImages = getImagesByCategory(`engineering-${activeDepartment}`);

  const getDepartmentName = (dept) => {
    const names = {
      'ece': 'Electronics and Communication Engineering',
      'cse': 'Computer Science Engineering',
      'mechanical': 'Mechanical Engineering', 
      'civil': 'Civil Engineering',
      'eee': 'Electrical and Electronics Engineering',
      'it': 'Information Technology',
      'bme': 'Biomedical Engineering',
      'mechatronics': 'Mechatronics Engineering',
      'ice': 'Instrumentation and Control Engineering',
      'aids': 'Artificial Intelligence and Data Science',
      'csbs': 'Computer Science and Business Systems',
      'cce': 'Computer and Communication Engineering'
    };
    return names[dept] || dept.toUpperCase();
  };

  return (
    <section id="engineering" className="section">
      <div className="section-header">Engineering</div>
      <div className="section-content">
        <div className="department-content active">
          <h3 className="department-title">
            {getDepartmentName(activeDepartment)}
          </h3>
          <ImageGrid images={departmentImages} onImageSelect={onImageSelect} />
        </div>
      </div>
    </section>
  );
};

export default EngineeringSection;