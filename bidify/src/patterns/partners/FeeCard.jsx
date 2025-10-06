import React from "react";

const FeeCard = ({ type, percentage, title, description, benefits }) => {
  return (
    <div className={`fee-card fee-card--${type}`}>
      <div className="fee-percentage">{percentage}</div>
      <h3 className="fee-title">{title}</h3>
      <p className="fee-description">{description}</p>
      <div className="fee-details">
        <ul className="benefits-list">
          {benefits.map((benefit, index) => (
            <li key={index} className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span className="benefit-text">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeeCard;