// src/components/common/Navigation.js
import React from 'react';

const Navigation = ({ activeSection, activeDepartment, onSectionClick, onDepartmentClick }) => {
  const navItems = [
    { id: 'campus', icon: 'fas fa-university', label: 'Campus' },
    { id: 'engineering', icon: 'fas fa-microchip', label: 'Engineering' },
    { id: 'ethnotech', icon: 'fas fa-cogs', label: 'Ethnotech' },
    { id: 'aicte', icon: 'fas fa-certificate', label: 'AICTE' },
    { id: 'law', icon: 'fas fa-gavel', label: 'Legal Education' },
    { id: 'agriculture', icon: 'fas fa-leaf', label: 'Agriculture' },
    { id: 'pharmacy', icon: 'fas fa-pills', label: 'Pharmacy' },
    { id: 'architecture', icon: 'fas fa-drafting-compass', label: 'Architecture' },
    { id: 'artsscience', icon: 'fas fa-atom', label: 'Arts & Science' }
  ];

  const engineeringDepts = [
    { id: 'ece', icon: 'fas fa-microchip', label: 'ECE' },
    { id: 'cse', icon: 'fas fa-laptop-code', label: 'CSE' },
    { id: 'eee', icon: 'fas fa-bolt', label: 'EEE' },
    { id: 'it', icon: 'fas fa-desktop', label: 'IT' },
    { id: 'mechanical', icon: 'fas fa-cogs', label: 'Mechanical' },
    { id: 'civil', icon: 'fas fa-hard-hat', label: 'Civil' },
    { id: 'bme', icon: 'fas fa-stethoscope', label: 'BME' },
    { id: 'mechatronics', icon: 'fas fa-robot', label: 'Mechatronics' },
    { id: 'ice', icon: 'fas fa-tools', label: 'ICE' },
    { id: 'aids', icon: 'fas fa-brain', label: 'AI&DS' },
    { id: 'csbs', icon: 'fas fa-database', label: 'CSEBS' },
    { id: 'cce', icon: 'fas fa-network-wired', label: 'CCE' }
  ];

  return (
    <>
      {/* Main Navigation */}
      <div className="nav-menu-container">
        <div className="nav-menu">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onSectionClick(item.id);
              }}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Engineering Departments Sub-Navigation */}
      {activeSection === 'engineering' && (
        <div className="sub-nav-container active">
          <div className="sub-nav-menu">
            {engineeringDepts.map(dept => (
              <a
                key={dept.id}
                href={`#eng-${dept.id}`}
                className={`sub-nav-item ${activeDepartment === dept.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onDepartmentClick(dept.id);
                }}
              >
                <i className={dept.icon}></i>
                {dept.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;