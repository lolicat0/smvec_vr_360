// src/components/welcome/WelcomeScreen.js - Local Logo Version
import React from 'react';
import { logoImg } from '../../data/imageData';
import '../../styles/components/Welcome.css';

const WelcomeScreen = ({ onEnterTour }) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <img 
          className="welcome-logo" 
          src={logoImg} 
          alt="SMVEC University Logo" 
        />
        <h1 className="welcome-title">
          Welcome to Sri Manakula Vinayagar Engineering College
        </h1>
        <p className="welcome-subtitle">
          Experience our prestigious campus through an immersive virtual reality tour.
        </p>
        <button 
          className="enter-button"
          onClick={onEnterTour}
        >
          <i className="fas fa-vr-cardboard"></i>
          Begin Your Journey
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;