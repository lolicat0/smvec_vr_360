// src/components/vr/VRControls.js
import React from 'react';
import { useVR } from '../../contexts/VRContext';

const VRControls = ({ 
  onPrevious, 
  onNext, 
  onToggleFullscreen, 
  onLookUp, 
  onLookDown,
  canGoBack,
  canGoForward,
  isVRMode
}) => {
  const { state } = useVR();

  const handleButtonClick = (callback, buttonRef) => {
    if (buttonRef && buttonRef.current) {
      buttonRef.current.style.transform = 'scale(0.9)';
      setTimeout(() => {
        buttonRef.current.style.transform = '';
      }, 200);
    }
    callback();
  };

  return (
    <>
      {/* Horizontal Navigation Controls */}
      <div className="control-panel">
        <button 
          className={`control-btn ${!canGoBack ? 'disabled' : ''}`}
          onClick={onPrevious}
          disabled={!canGoBack}
          title="Previous Image"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        
        <button 
          className={`control-btn vr-toggle ${isVRMode ? 'active' : ''}`}
          onClick={onToggleFullscreen}
          title={isVRMode ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          <i className="fas fa-expand-arrows-alt"></i>
        </button>
        
        <button 
          className={`control-btn ${!canGoForward ? 'disabled' : ''}`}
          onClick={onNext}
          disabled={!canGoForward}
          title="Next Image"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Vertical Navigation Controls */}
      <div className="vr-navigation-controls">
        <button 
          className="vr-nav-btn"
          onClick={onLookUp}
          title="Look Up"
        >
          <i className="fas fa-chevron-up"></i>
        </button>
        
        <button 
          className="vr-nav-btn"
          onClick={onLookDown}
          title="Look Down"
        >
          <i className="fas fa-chevron-down"></i>
        </button>
      </div>
    </>
  );
};

export default VRControls;