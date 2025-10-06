import React from "react";
import "../styles/pages/partnersPage.scss";

// Import new modern components
import HeroSection from "../patterns/partners/HeroSection/HeroSection";
import PartnershipBenefits from "../patterns/partners/sections/PartnershipBenefits";
import NftSaleCalculator from "../patterns/partners/NftSaleCalculator";
import GettingStarted from "../patterns/partners/sections/GettingStarted";
import CTASection from "../patterns/partners/CTASection";

const PartnersPage = () => {
  return (
    <div className="partnersPage">
      {/* Hero section outside of constrained container for full width */}
      <HeroSection />
      
      <div className="padding_container">
        <PartnershipBenefits id="partnership-benefits" />
        <NftSaleCalculator id="earnings-calculator" />
        <GettingStarted id="getting-started" />
        <CTASection id="resources" />
      </div>
    </div>
  );
};

export default PartnersPage;