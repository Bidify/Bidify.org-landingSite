import React from 'react';
import ModernCard from './ModernCard';
import { getIconComponent } from '../utils/icons';

const GettingStartedCard = ({ step }) => {
  return (
    <ModernCard
      icon={step.icon}
      title={step.title}
      className="getting-started-card"
      stepNumber={step.stepNumber}
    >
      <p className="getting-started-card__description">
        {step.description}
      </p>
    </ModernCard>
  );
};

export default GettingStartedCard;