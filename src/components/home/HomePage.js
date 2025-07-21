// src/components/home/HomePage.js - Simplified version that will work immediately
import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import ImageGrid from './ImageGrid';
import { getImagesByCategory } from '../../data/imageData';

const HomePage = ({ onImageSelect }) => {
  const [activeSection, setActiveSection] = useState('campus');
  const [activeDepartment, setActiveDepartment] = useState('ece');

  // Section visibility observer
  useEffect(() => {
    const observerOptions = {
      rootMargin: '0px 0px -20% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleDepartmentClick = (department) => {
    setActiveDepartment(department);
  };

  // Get images based on current section/department
  const getCurrentImages = () => {
    if (activeSection === 'engineering') {
      return getImagesByCategory(`engineering-${activeDepartment}`);
    }
    return getImagesByCategory(activeSection);
  };

  const getCurrentSectionTitle = () => {
    const titles = {
      'campus': 'Campus',
      'engineering': `Engineering - ${activeDepartment.toUpperCase()}`,
      'ethno-tech': 'Ethno Tech',
      'aicte': 'AICTE',
      'law-block': 'Law Block',
      'agriculture': 'Agriculture',
      'pharmacy': 'Pharmacy',
      'architecture': 'Architecture',
      'arts-science': 'Arts and Science'
    };
    return titles[activeSection] || activeSection;
  };

  return (
    <div className="home-page">
      <div className="home-overlay">
        <Header />
        
        <Navigation 
          activeSection={activeSection}
          activeDepartment={activeDepartment}
          onSectionClick={handleSectionClick}
          onDepartmentClick={handleDepartmentClick}
        />

        {/* Single Dynamic Section */}
        <section id={activeSection} className="section visible">
          <div className="section-header">{getCurrentSectionTitle()}</div>
          <div className="section-content">
            <ImageGrid images={getCurrentImages()} onImageSelect={onImageSelect} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;