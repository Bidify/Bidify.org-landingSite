import React, { useState } from 'react';
import GettingStartedCard from '../cards/GettingStartedCard';
import { gettingStarted } from '../utils/cardData';
import { getIconComponent } from '../../utils/icons';
import ComingSoonPopup from '../ComingSoonPopup';
import '../../../styles/patterns/partners/GettingStarted.scss';

const GettingStarted = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleComingSoon = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <section id="support-resources" className="getting-started">
      <div className="section-header">
        <h2 className="section-title">
          Get Started as a Partner
        </h2>
        <p className="section-subtitle">
          Join our growing ecosystem of marketplace creators
        </p>
      </div>
      
      <div className="getting-started-content">
        <div className="steps-container">
          {gettingStarted.map((step) => (
            <div key={step.id} className="steps-container__item">
              <GettingStartedCard step={step} />
            </div>
          ))}
        </div>
        
        <div className="support-resources">
          <div className="support-resources__content">
            <h3 className="support-resources__title">
              {getIconComponent('headset', 24)}
              Support Resources
            </h3>
            <p className="support-resources__description">
              Get the help you need to succeed as a Bidify partner
            </p>
            <div className="support-resources__grid">
              <div className="support-resources__item">
                <div className="support-resources__item-icon">
                  {getIconComponent('graduationCap', 20)}
                </div>
                <h4 className="support-resources__item-title">Documentation</h4>
                <p className="support-resources__item-description">
                  Comprehensive guides and API references
                </p>
                <button
                  className="support-resources__item-link"
                  onClick={handleComingSoon}
                >
                  View Docs {getIconComponent('arrow', 16)}
                </button>
              </div>
              <div className="support-resources__item">
                <div className="support-resources__item-icon">
                  {getIconComponent('users', 20)}
                </div>
                <h4 className="support-resources__item-title">Community</h4>
                <p className="support-resources__item-description">
                  Connect with other partners and experts
                </p>
                <a href="https://discord.gg/VSPUucsyvn" target="_blank" rel="noopener noreferrer" className="support-resources__item-link">
                  Join Community {getIconComponent('arrow', 16)}
                </a>
              </div>
              <div className="support-resources__item">
                <div className="support-resources__item-icon">
                  {getIconComponent('headset', 20)}
                </div>
                <h4 className="support-resources__item-title">24/7 Support</h4>
                <p className="support-resources__item-description">
                  Dedicated support for our partners
                </p>
                <button
                  className="support-resources__item-link"
                  onClick={handleComingSoon}
                >
                  Contact Support {getIconComponent('arrow', 16)}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <ComingSoonPopup
          isVisible={showPopup}
          onClose={closePopup}
        />
      </div>
    </section>
  );
};

export default GettingStarted;