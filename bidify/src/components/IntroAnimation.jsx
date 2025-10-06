import React, { useEffect, useState } from 'react';
import logo from '../assets/images/logo.svg';
import '../styles/components/introAnimation.scss';

const IntroAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Hide the intro after animation completes
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 500); // Wait for fade out animation
    }, 2500); // Show intro for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`intro-animation ${isAnimating ? 'animate' : 'fade-out'}`}>
      <div className="intro-content">
        <div className="logo-container">
          <div className="logo-ring"></div>
          <img
            src={logo}
            alt="Bidify Logo"
            className="logo-image"
          />
          <div className="logo-text">Bidify</div>
          <div className="subtitle">Decentralised Digital Asset Auction House</div>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;