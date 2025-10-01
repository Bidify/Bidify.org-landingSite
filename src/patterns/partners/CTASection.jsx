import React from "react";
import Button from "../../components/Button";
import './CTASection.scss';

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2 className="cta-title">Ready to Build Your NFT Marketplace?</h2>
        <p className="cta-description">
          Join the decentralized revolution and start earning today
        </p>
      </div>
    </section>
  );
};

export default CTASection;