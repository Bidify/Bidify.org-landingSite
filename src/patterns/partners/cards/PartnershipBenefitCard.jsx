import React from 'react';
import ModernCard from './ModernCard';
import { getIconComponent } from '../../utils/icons';

const PartnershipBenefitCard = ({ benefit }) => {
  return (
    <ModernCard
      icon={benefit.icon}
      title={benefit.title}
      className="partnership-benefit-card"
    >
      <p className="partnership-benefit-card__description">
        {benefit.description}
      </p>
      <ul className="partnership-benefit-card__features">
        {benefit.features.map((feature, index) => (
          <li key={index} className="partnership-benefit-card__feature">
            <span className="partnership-benefit-card__feature-icon">
              {getIconComponent('check', 16)}
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </ModernCard>
  );
};

export default PartnershipBenefitCard;