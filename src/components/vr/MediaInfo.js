
import React, { useEffect, useState } from 'react';

const MediaInfo = ({ mediaName, isVisible }) => {
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowInfo(true);
      const timer = setTimeout(() => {
        setShowInfo(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, mediaName]);

  return (
    <div className={`media-info ${showInfo ? 'visible' : ''}`}>
      Currently viewing: <strong>{mediaName}</strong>
    </div>
  );
};

export default MediaInfo;