// src/App.js
import React, { useState, useEffect } from 'react';
import { VRProvider } from './contexts/VRContext';
import WelcomeScreen from './components/welcome/WelcomeScreen';
import HomePage from './components/home/HomePage';
import VRContainer from './components/vr/VRContainer';
import BackToTop from './components/common/BackToTop';
import LoadingSpinner from './components/common/LoadingSpinner';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('welcome'); // 'welcome', 'home', 'vr'
  const [isLoading, setIsLoading] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);

  // Handle view transitions
  const handleViewChange = (view, mediaData = null) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setCurrentView(view);
      if (mediaData) {
        setCurrentMedia(mediaData);
      }
      setIsLoading(false);
    }, 300);
  };

  // Handle welcome screen entry
  const handleEnterTour = () => {
    handleViewChange('home');
  };

  // Handle image selection for VR view
  const handleImageSelect = (imageData) => {
    handleViewChange('vr', imageData);
  };

  // Handle back to home
  const handleBackToHome = () => {
    handleViewChange('home');
    setCurrentMedia(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && currentView === 'vr') {
        handleBackToHome();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView]);

  return (
    <VRProvider>
      <div className="App">
        {isLoading && <LoadingSpinner />}
        
        {currentView === 'welcome' && (
          <WelcomeScreen onEnterTour={handleEnterTour} />
        )}
        
        {currentView === 'home' && (
          <>
            <HomePage onImageSelect={handleImageSelect} />
            <BackToTop />
          </>
        )}
        
        {currentView === 'vr' && currentMedia && (
          <VRContainer 
            mediaData={currentMedia}
            onBackToHome={handleBackToHome}
          />
        )}
      </div>
    </VRProvider>
  );
}

export default App;