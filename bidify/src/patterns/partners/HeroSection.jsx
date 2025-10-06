import React from "react";
import Button from "../../components/Button";
import handshake from "../../assets/icons/handshake.svg";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">Partnership</div>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Button>
            </a>
            <a
              href="#partnership-benefits"
              className="hero-secondary-cta"
            >
              <Button variant="secondary" size="large">
                <span>Learn More</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </Button>
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-container">
            <img
              src={handshake}
              alt="Partnership"
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;