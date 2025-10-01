import React from 'react';
import Button from '../../../components/Button';
import { getIconComponent } from '../utils/icons';
import handshake from '../../../assets/icons/handshake.svg';
import './HeroSection.scss';

const HeroSection = () => {
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
                href="http://partnerships.bidify.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-primary-cta"
              >
                <Button variant="primary" size="large">
                  <span>Get Started Now</span>
                  {getIconComponent('arrow', 20)}
                </Button>
              </a>
              
              <a
                href="#partnership-benefits"
                className="hero-secondary-cta"
              >
                <Button variant="secondary" size="large">
                  <span>Learn More</span>
                  {getIconComponent('arrow', 20)}
                </Button>
              </a>
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="hero-visual">
            <div className="hero-image-container">
              <img
                src={handshake}
                alt="Partnership"
                className="hero-image"
              />
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