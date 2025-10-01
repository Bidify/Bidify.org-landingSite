import React from 'react';
import ModernCard from './ModernCard';
import { getIconComponent } from '../utils/icons';

const FeeStructureCard = ({ fee }) => {
  return (
    <ModernCard
      icon={fee.icon}
      title={fee.title}
      className="fee-structure-card"
    >
      <div className="fee-structure-card__percentage">
        <span className="fee-structure-card__percentage-value">{fee.percentage}</span>
        <span className="fee-structure-card__percentage-label">fee</span>
      </div>
      <p className="fee-structure-card__description">
        {fee.description}
      </p>
      <div className="fee-structure-card__benefits">
        <h4 className="fee-structure-card__benefits-title">Benefits:</h4>
        <ul className="fee-structure-card__benefits-list">
          {fee.benefits.map((benefit, index) => (
            <li key={index} className="fee-structure-card__benefit">
              <span className="fee-structure-card__benefit-icon">
                {getIconComponent('check', 16)}
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </ModernCard>
  );
};

export default FeeStructureCard;