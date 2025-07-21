// src/components/vr/VRScene.js
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useVR } from '../../contexts/VRContext';
import 'aframe';

const VRScene = forwardRef(({ mediaData, onSceneReady }, ref) => {
  const { state, actions } = useVR();
  const sceneRef = useRef(null);
  const skyRef = useRef(null);
  const cameraRef = useRef(null);
  const assetsRef = useRef(null);
  const lookControlsRef = useRef(null);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    lookUp: () => handleLookUp(),
    lookDown: () => handleLookDown(),
    resetCamera: () => resetCameraRotation()
  }));

  // Initialize scene when component mounts
  useEffect(() => {
    if (sceneRef.current) {
      // Wait for A-Frame to initialize
      setTimeout(() => {
        initializeScene();
      }, 100);
    }
  }, []);

  // Update skybox when media changes
  useEffect(() => {
    if (mediaData && skyRef.current) {
      loadSkyTexture(mediaData.src);
    }
  }, [mediaData]);

  // Initialize A-Frame scene
  const initializeScene = () => {
    const camera = cameraRef.current;
    if (camera) {
      // Get look-controls component
      const lookControls = camera.components['look-controls'];
      if (lookControls) {
        lookControlsRef.current = lookControls;
        actions.setLookControls(lookControls);
        
        // Configure look controls
        lookControls.touchEnabled = false; // We'll handle touch manually
        lookControls.magicWindowTrackingEnabled = false;
        lookControls.gyroEnabled = false;
        lookControls.data.maxPitch = 90;
        lookControls.data.minPitch = -90;
        
        // Setup custom touch handling
        setupTouchControls();
      }
    }

    // Reset camera rotation
    resetCameraRotation();
  };

  // Load 360° image texture
  const loadSkyTexture = (imageSrc) => {
    actions.setTransitioning(true);
    actions.setSkyLoaded(false);

    // Create new image element
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // Remove existing sky image
      const existingSkyImg = document.getElementById('current-sky-image');
      if (existingSkyImg) {
        existingSkyImg.remove();
      }

      // Create new sky image asset
      const newSkyImg = document.createElement('img');
      newSkyImg.id = 'current-sky-image';
      newSkyImg.src = imageSrc;
      newSkyImg.setAttribute('crossorigin', 'anonymous');
      
      // Add to assets
      if (assetsRef.current) {
        assetsRef.current.appendChild(newSkyImg);
      }

      // Update sky src
      if (skyRef.current) {
        skyRef.current.setAttribute('src', '#current-sky-image');
      }

      // Reset camera and complete loading
      setTimeout(() => {
        resetCameraRotation();
        actions.setSkyLoaded(true);
        actions.setTransitioning(false);
        onSceneReady();
      }, 500);
    };

    img.onerror = () => {
      console.error('Failed to load 360° image:', imageSrc);
      actions.setTransitioning(false);
    };

    img.src = imageSrc;
  };

  // Setup custom touch controls
  const setupTouchControls = () => {
    const sceneElement = sceneRef.current;
    if (!sceneElement) return;

    let touchStartY = 0;
    let touchStartX = 0;
    let lastRotationX = 0;
    let lastRotationY = 0;
    let isTouch = false;

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isTouch = true;
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        
        const lookControls = lookControlsRef.current;
        if (lookControls && lookControls.pitchObject && lookControls.yawObject) {
          lastRotationX = lookControls.pitchObject.rotation.x;
          lastRotationY = lookControls.yawObject.rotation.y;
        }
        
        e.preventDefault();
      }
    };

    const handleTouchMove = (e) => {
      if (!isTouch || e.touches.length !== 1) return;

      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      
      const deltaY = touchStartY - currentY;
      const deltaX = touchStartX - currentX;
      
      const lookControls = lookControlsRef.current;
      if (lookControls && lookControls.pitchObject && lookControls.yawObject) {
        const sensitivity = 0.005;
        
        // Vertical rotation (pitch)
        const newPitch = Math.min(Math.max(
          lastRotationX + deltaY * sensitivity, 
          -Math.PI/2
        ), Math.PI/2);
        
        // Horizontal rotation (yaw)
        const newYaw = lastRotationY + deltaX * sensitivity;
        
        lookControls.pitchObject.rotation.x = newPitch;
        lookControls.yawObject.rotation.y = newYaw;
      }
      
      e.preventDefault();
    };

    const handleTouchEnd = (e) => {
      isTouch = false;
      e.preventDefault();
    };

    sceneElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    sceneElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    sceneElement.addEventListener('touchend', handleTouchEnd, { passive: false });
  };

  // Reset camera rotation
  const resetCameraRotation = () => {
    const camera = cameraRef.current;
    const lookControls = lookControlsRef.current;
    
    if (camera && lookControls) {
      // Reset rotation
      camera.setAttribute('rotation', '0 -90 0');
      
      // Reset look controls
      if (lookControls.pitchObject && lookControls.yawObject) {
        lookControls.pitchObject.rotation.x = 0;
        lookControls.yawObject.rotation.y = -Math.PI/2;
      }
    }
  };

  // Look up function
  const handleLookUp = () => {
    const lookControls = lookControlsRef.current;
    if (!lookControls || !lookControls.pitchObject) return;

    const currentRotation = lookControls.pitchObject.rotation;
    const newPitch = Math.max(
      currentRotation.x - (8 * Math.PI / 180), 
      -Math.PI/2
    );
    
    animateRotation(currentRotation.x, newPitch, 'x');
  };

  // Look down function
  const handleLookDown = () => {
    const lookControls = lookControlsRef.current;
    if (!lookControls || !lookControls.pitchObject) return;

    const currentRotation = lookControls.pitchObject.rotation;
    const newPitch = Math.min(
      currentRotation.x + (8 * Math.PI / 180), 
      Math.PI/2
    );
    
    animateRotation(currentRotation.x, newPitch, 'x');
  };

  // Animate rotation
  const animateRotation = (startRotation, targetRotation, axis) => {
    const lookControls = lookControlsRef.current;
    if (!lookControls) return;

    const duration = 200;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const interpolatedRotation = startRotation + (targetRotation - startRotation) * easeProgress;
      
      if (axis === 'x' && lookControls.pitchObject) {
        lookControls.pitchObject.rotation.x = interpolatedRotation;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  return (
    <div className="vr-scene-container">
      <a-scene
        ref={sceneRef}
        embedded
        vr-mode-ui="enabled: true"
        renderer="antialias: true; colorManagement: true; physicallyCorrectLights: true"
        loading-screen="enabled: false"
      >
        <a-assets ref={assetsRef} timeout="10000">
          <img 
            id="skybox-placeholder" 
            src={mediaData?.src || ''} 
            crossOrigin="anonymous"
            alt="360 degree view"
          />
        </a-assets>
        
        <a-sky 
          ref={skyRef}
          id="main-sky" 
          src="#skybox-placeholder" 
          rotation="0 -90 0"
        />
        
        <a-entity position="0 1.6 0">
          <a-camera
            ref={cameraRef}
            id="main-camera"
            look-controls="enabled: true; reverseMouseDrag: false; touchEnabled: true; magicWindowTrackingEnabled: false; maxPitch: 90; minPitch: -90; gyroEnabled: false"
            wasd-controls="enabled: false"
            rotation="0 -90 0"
          />
        </a-entity>
      </a-scene>
    </div>
  );
});

VRScene.displayName = 'VRScene';

export default VRScene;