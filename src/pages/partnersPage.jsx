import React from "react";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Partners — Bidify NFT Marketplace</title>
        <meta name="description" content="Become a Bidify partner and build your own NFT store. Access our decentralised auction system, earn from NFT sales, and join the leading multichain NFT marketplace network." />
        <meta property="og:title" content="Partners — Bidify NFT Marketplace" />
        <meta property="og:description" content="Become a Bidify partner and build your own NFT store. Access our decentralised auction system, earn from NFT sales, and join the leading multichain NFT marketplace network." />
        <meta property="og:url" content="https://bidify.org/partners" />
        <meta name="twitter:title" content="Partners — Bidify NFT Marketplace" />
        <meta name="twitter:description" content="Become a Bidify partner and build your own NFT store. Access our decentralised auction system, earn from NFT sales, and join the leading multichain NFT marketplace network." />
      </Helmet>

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