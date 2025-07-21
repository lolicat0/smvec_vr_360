// src/contexts/VRContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// VR State
const initialState = {
  isVRMode: false,
  isFullscreen: false,
  currentMediaIndex: 0,
  currentCategory: 'campus',
  skyImageLoaded: false,
  isTransitioning: false,
  cameraRotation: { x: 0, y: -90, z: 0 },
  lookControlsComponent: null,
  mediaData: null,
  categoryItems: []
};

// Actions
const VR_ACTIONS = {
  SET_VR_MODE: 'SET_VR_MODE',
  SET_FULLSCREEN: 'SET_FULLSCREEN',
  SET_CURRENT_MEDIA: 'SET_CURRENT_MEDIA',
  SET_CURRENT_CATEGORY: 'SET_CURRENT_CATEGORY',
  SET_SKY_LOADED: 'SET_SKY_LOADED',
  SET_TRANSITIONING: 'SET_TRANSITIONING',
  SET_CAMERA_ROTATION: 'SET_CAMERA_ROTATION',
  SET_LOOK_CONTROLS: 'SET_LOOK_CONTROLS',
  NAVIGATE_MEDIA: 'NAVIGATE_MEDIA',
  RESET_VR_STATE: 'RESET_VR_STATE'
};

// Reducer
const vrReducer = (state, action) => {
  switch (action.type) {
    case VR_ACTIONS.SET_VR_MODE:
      return { ...state, isVRMode: action.payload };
    
    case VR_ACTIONS.SET_FULLSCREEN:
      return { ...state, isFullscreen: action.payload };
    
    case VR_ACTIONS.SET_CURRENT_MEDIA:
      return { 
        ...state, 
        mediaData: action.payload.mediaData,
        currentMediaIndex: action.payload.index,
        currentCategory: action.payload.category,
        categoryItems: action.payload.categoryItems
      };
    
    case VR_ACTIONS.SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload };
    
    case VR_ACTIONS.SET_SKY_LOADED:
      return { ...state, skyImageLoaded: action.payload };
    
    case VR_ACTIONS.SET_TRANSITIONING:
      return { ...state, isTransitioning: action.payload };
    
    case VR_ACTIONS.SET_CAMERA_ROTATION:
      return { ...state, cameraRotation: action.payload };
    
    case VR_ACTIONS.SET_LOOK_CONTROLS:
      return { ...state, lookControlsComponent: action.payload };
    
    case VR_ACTIONS.NAVIGATE_MEDIA:
      const newIndex = state.currentMediaIndex + action.payload;
      if (newIndex >= 0 && newIndex < state.categoryItems.length) {
        return { 
          ...state, 
          currentMediaIndex: newIndex,
          mediaData: state.categoryItems[newIndex]
        };
      }
      return state;
    
    case VR_ACTIONS.RESET_VR_STATE:
      return { ...initialState };
    
    default:
      return state;
  }
};

// Context
const VRContext = createContext();

// Provider
export const VRProvider = ({ children }) => {
  const [state, dispatch] = useReducer(vrReducer, initialState);

  // VR Actions
  const actions = {
    setVRMode: (isVRMode) => dispatch({ 
      type: VR_ACTIONS.SET_VR_MODE, 
      payload: isVRMode 
    }),
    
    setFullscreen: (isFullscreen) => dispatch({ 
      type: VR_ACTIONS.SET_FULLSCREEN, 
      payload: isFullscreen 
    }),
    
    setCurrentMedia: (mediaData, index, category, categoryItems) => dispatch({
      type: VR_ACTIONS.SET_CURRENT_MEDIA,
      payload: { mediaData, index, category, categoryItems }
    }),
    
    setSkyLoaded: (loaded) => dispatch({ 
      type: VR_ACTIONS.SET_SKY_LOADED, 
      payload: loaded 
    }),
    
    setTransitioning: (transitioning) => dispatch({ 
      type: VR_ACTIONS.SET_TRANSITIONING, 
      payload: transitioning 
    }),
    
    setCameraRotation: (rotation) => dispatch({ 
      type: VR_ACTIONS.SET_CAMERA_ROTATION, 
      payload: rotation 
    }),
    
    setLookControls: (component) => dispatch({ 
      type: VR_ACTIONS.SET_LOOK_CONTROLS, 
      payload: component 
    }),
    
    navigateMedia: (direction) => dispatch({ 
      type: VR_ACTIONS.NAVIGATE_MEDIA, 
      payload: direction 
    }),
    
    resetVRState: () => dispatch({ 
      type: VR_ACTIONS.RESET_VR_STATE 
    })
  };

  // Fullscreen change handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
      actions.setFullscreen(isFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return (
    <VRContext.Provider value={{ state, actions }}>
      {children}
    </VRContext.Provider>
  );
};

// Custom hook
export const useVR = () => {
  const context = useContext(VRContext);
  if (!context) {
    throw new Error('useVR must be used within a VRProvider');
  }
  return context;
};

export default VRContext;