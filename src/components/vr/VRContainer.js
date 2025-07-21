// src/components/vr/VRContainer.js
import React, { useEffect, useRef } from 'react';
import { useVR } from '../../contexts/VRContext';
import VRScene from './VRScene';
import VRControls from './VRControls';
import MediaInfo from './MediaInfo';
import LoadingSpinner from '../common/LoadingSpinner';
import { getImagesByCategory } from '../../data/imageData';
import '../../styles/components/VR.css';

const VRContainer = ({ mediaData, onBackToHome }) => {
  const { state, actions } = useVR();
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  // Initialize VR session
  useEffect(() => {
    if (mediaData) {
      const categoryItems = getImagesByCategory(mediaData.category);
      const currentIndex = categoryItems.findIndex(item => item.id === mediaData.id);
      
      actions.setCurrentMedia(mediaData, currentIndex, mediaData.category, categoryItems);
      actions.setSkyLoaded(false);
      actions.setTransitioning(true);
    }

    return () => {
      actions.resetVRState();
    };
  }, [mediaData, actions]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!state.skyImageLoaded || state.isTransitioning) return;

      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowUp':
          e.preventDefault();
          handleLookUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleLookDown();
          break;
        case 'f':
        case 'F':
          handleToggleFullscreen();
          break;
        case 'Escape':
          if (state.isVRMode) {
            exitFullscreen();
          } else {
            onBackToHome();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.skyImageLoaded, state.isTransitioning, state.isVRMode]);

  // Navigation handlers
  const handlePrevious = () => {
    if (state.currentMediaIndex > 0) {
      actions.navigateMedia(-1);
    }
  };

  const handleNext = () => {
    if (state.currentMediaIndex < state.categoryItems.length - 1) {
      actions.navigateMedia(1);
    }
  };

  const handleLookUp = () => {
    if (sceneRef.current) {
      sceneRef.current.lookUp();
    }
  };

  const handleLookDown = () => {
    if (sceneRef.current) {
      sceneRef.current.lookDown();
    }
  };

  const handleToggleFullscreen = () => {
    if (!state.isVRMode) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  const enterFullscreen = () => {
    const element = containerRef.current;
    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      actions.setVRMode(true);
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    actions.setVRMode(false);
  };

  // Back to home handler
  const handleBackToHome = () => {
    if (state.isVRMode) {
      exitFullscreen();
    }
    onBackToHome();
  };

  if (!state.mediaData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="vr-container" ref={containerRef}>
      {/* Back to Home Button */}
      <button 
        className="back-to-home"
        onClick={handleBackToHome}
      >
        <i className="fas fa-home"></i>
        Back to Home
      </button>

      {/* Media Info */}
      <MediaInfo 
        mediaName={state.mediaData.caption}
        isVisible={!state.isTransitioning}
      />

      {/* VR Scene */}
      <VRScene 
        ref={sceneRef}
        mediaData={state.mediaData}
        onSceneReady={() => {
          actions.setSkyLoaded(true);
          actions.setTransitioning(false);
        }}
      />

      {/* VR Controls */}
      <VRControls 
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToggleFullscreen={handleToggleFullscreen}
        onLookUp={handleLookUp}
        onLookDown={handleLookDown}
        canGoBack={state.currentMediaIndex > 0}
        canGoForward={state.currentMediaIndex < state.categoryItems.length - 1}
        isVRMode={state.isVRMode}
      />

      {/* Loading Spinner */}
      {(state.isTransitioning || !state.skyImageLoaded) && (
        <div className="vr-loading">
          <LoadingSpinner message="Loading 360° view..." />
        </div>
      )}
    </div>
  );
};

export default VRContainer;