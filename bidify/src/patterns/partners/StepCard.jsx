import React from "react";
import Button from "../../components/Button";

const StepCard = ({ stepNumber, title, description, ctaText, ctaLink, ctaTarget, ctaRel }) => {
  return (
    <div className="step-card">
      <div className="step-number">{stepNumber}</div>
      <h3 className="step-title">{title}</h3>
      <p className="step-description">{description}</p>
      <a 
        href={ctaLink} 
        target={ctaTarget || "_self"} 
        rel={ctaRel || undefined}
        className="step-cta"
      >
        <Button variant="secondary" size="small">{ctaText}</Button>
      </a>
    </div>
  );
};

export default StepCard;