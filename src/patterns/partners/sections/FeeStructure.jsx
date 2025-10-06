import React from 'react';
import FeeStructureCard from '../cards/FeeStructureCard';
import { feeStructure } from '../utils/cardData';
import { getIconComponent } from '../../utils/icons';
import '../../../styles/patterns/partners/FeeStructure.scss';

const FeeStructure = () => {
  return (
    <section className="fee-structure">
      <div className="section-header">
        <h2 className="section-title">
          Simple Fee Structure
        </h2>
        <p className="section-subtitle">
          Transparent pricing that benefits everyone in the ecosystem
        </p>
      </div>
      
      <div className="fee-content">
        <div className="fee-cards-container">
          {feeStructure.map((fee) => (
            <div key={fee.id} className="fee-cards-container__item">
              <FeeStructureCard fee={fee} />
            </div>
          ))}
        </div>
        
        <div className="fee-calculator">
          <div className="fee-calculator__content">
            <h3 className="fee-calculator__title">
              {getIconComponent('calculator', 24)}
              Earnings Calculator
            </h3>
            <p className="fee-calculator__description">
              See how much you could earn with our transparent fee structure
            </p>
            <div className="fee-calculator__inputs">
              <div className="fee-calculator__input-group">
                <label className="fee-calculator__label">Monthly Listings</label>
                <input
                  type="number"
                  className="fee-calculator__input"
                  placeholder="1000"
                  min="0"
                />
              </div>
              <div className="fee-calculator__input-group">
                <label className="fee-calculator__label">Monthly Sales</label>
                <input
                  type="number"
                  className="fee-calculator__input"
                  placeholder="500"
                  min="0"
                />
              </div>
            </div>
            <div className="fee-calculator__results">
              <div className="fee-calculator__result-item">
                <span className="fee-calculator__result-label">Listing Revenue:</span>
                <span className="fee-calculator__result-value">$10.00</span>
              </div>
              <div className="fee-calculator__result-item">
                <span className="fee-calculator__result-label">Sales Revenue:</span>
                <span className="fee-calculator__result-value">$5.00</span>
              </div>
              <div className="fee-calculator__result-item total">
                <span className="fee-calculator__result-label">Total Monthly:</span>
                <span className="fee-calculator__result-value">$15.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeeStructure;