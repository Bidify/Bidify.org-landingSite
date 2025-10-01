import React from "react";
import FeeCard from "./FeeCard";
import EarningsCalculator from "./EarningsCalculator";

const FeeStructure = () => {
  return (
    <section className="fee-structure">
      <div className="section-header">
        <h2 className="section-title">Simple Fee Structure</h2>
        <p className="section-subtitle">
          Transparent pricing that benefits everyone in the ecosystem
        </p>
      </div>
      
      <div className="fee-content">
        <div className="fee-cards-container">
          <FeeCard
            type="listing"
            percentage="1%"
            title="Listing Partners"
            description="Earn 1% on all NFT listings through your platform"
            benefits={[
              "No setup fees",
              "Instant payouts",
              "Transparent tracking",
              "Real-time analytics"
            ]}
          />
          
          <FeeCard
            type="sales"
            percentage="1%"
            title="Sales Partners"
            description="Earn 1% on all successful sales through your marketplace"
            benefits={[
              "Only pay on successful sales",
              "Real-time analytics",
              "Competitive rates"
            ]}
          />
          
          <FeeCard
            type="dao"
            percentage="2%"
            title="CryptoSI DAO"
            description="Support the ecosystem with 2% fee contribution to CryptoSI DAO"
            benefits={[
              "Governance participation",
              "Ecosystem growth",
              "Community rewards"
            ]}
          />
        </div>
        
        <EarningsCalculator />
      </div>
    </section>
  );
};

export default FeeStructure;