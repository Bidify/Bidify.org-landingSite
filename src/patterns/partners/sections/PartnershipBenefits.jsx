import React from 'react';
import PartnershipBenefitCard from '../cards/PartnershipBenefitCard';
import { partnershipBenefits } from '../utils/cardData';
import '../../../styles/patterns/partners/PartnershipBenefits.scss';

const PartnershipBenefits = () => {
  return (
    <section id="partnership-benefits" className="partnership-benefits">
      <div className="section-header">
        <h2 className="section-title">
          Decentralized Partnerships
        </h2>
        <p className="section-subtitle">
          Anyone can build front-ends and plug into Bidify's smart contracts
        </p>
      </div>
      
      <div className="benefits-content">
        <div className="benefits-description">
          <p className="benefits-text">
            Bidify's revolutionary decentralized architecture allows anyone to create their own NFT marketplace front-end
            without building complex infrastructure. Our smart contracts handle all the heavy lifting while you focus
            on building great user experiences.
          </p>
        </div>
        
        <div className="benefits-grid">
          {partnershipBenefits.map((benefit, index) => (
            <div key={benefit.id} className="benefits-grid__item" style={{ '--index': index }}>
              <PartnershipBenefitCard benefit={benefit} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipBenefits;