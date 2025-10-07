import React from 'react';
import Button from '../../../components/Button';
import { getIconComponent } from '../utils/icons';
import Slideshow from './Slideshow';
import './HeroSection.scss';

const HeroSection = () => {
  const scrollToCalculator = () => {
    const element = document.getElementById('nft-sale-calculator');
    if (element) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - 20; // 20px extra padding
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToResources = () => {
    const element = document.getElementById('support-resources');
    if (element) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - 20; // 20px extra padding
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="hero-section">
      {/* Full width background */}
      <div className="hero-background" />
      
      <div className="hero-container">
        <div className="hero-content">
          {/* Left Content - Text and CTA */}
          <div className="hero-text">
            <div className="hero-badge">
              {getIconComponent('handshake', 20)}
              Partnership
            </div>
            
            <h1 className="hero-headline">
              Become a Bidify Partner
            </h1>
            
            <p className="hero-subheading">
              Join our decentralized ecosystem and build your own NFT marketplace front-end.
              Plug into Bidify's smart contracts and start earning today.
            </p>
            
            <div className="hero-buttons">
              <a
                href="#nft-sale-calculator"
                onClick={scrollToCalculator}
                className="hero-primary-cta"
              >
                <Button variant="primary">
                  <span>Earnings Calculator</span>
                  {getIconComponent('arrow', 20)}
                </Button>
              </a>
              
              <a
                href="#support-resources"
                onClick={scrollToResources}
                className="hero-secondary-cta"
              >
                <Button variant="secondary">
                  <span>Resources</span>
                  {getIconComponent('arrow', 20)}
                </Button>
              </a>
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="hero-visual">
            <div className="hero-image-container">
              <Slideshow />
              <div className="hero-image-glow" />
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator">
          <div className="scroll-indicator__dot" />
          <div className="scroll-indicator__text">
            Scroll to explore
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;