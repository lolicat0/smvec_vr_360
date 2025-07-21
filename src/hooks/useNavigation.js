// src/hooks/useNavigation.js
import { useState, useEffect, useCallback } from 'react';

export const useNavigation = () => {
  const [activeSection, setActiveSection] = useState('campus');
  const [activeDepartment, setActiveDepartment] = useState('ece');

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Handle section change
  const handleSectionChange = useCallback((sectionId) => {
    setActiveSection(sectionId);
    scrollToSection(sectionId);
  }, [scrollToSection]);

  // Handle department change
  const handleDepartmentChange = useCallback((department) => {
    setActiveDepartment(department);
  }, []);

  // Intersection observer for auto-detecting active section
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

  return {
    activeSection,
    activeDepartment,
    handleSectionChange,
    handleDepartmentChange,
    scrollToSection
  };
};
