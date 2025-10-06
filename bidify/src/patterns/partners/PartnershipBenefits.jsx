import React from "react";
import InfoCards from "../../patterns/cards/InfoCards";
import smartContract from "../../assets/icons/cryptoWallet.svg";
import nftIcon from "../../assets/icons/NFTs.svg";
import calculator from "../../assets/icons/fast&simple.svg";

const PartnershipBenefits = () => {
  return (
    <section id="partnership-benefits" className="partnership-benefits">
      <div className="section-header">
        <h2 className="section-title">Decentralized Partnerships</h2>
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
          <InfoCards
            img={smartContract}
            head="Smart Contract Integration"
            data="Plug into our battle-tested smart contracts for secure, transparent transactions"
          />
          <InfoCards
            img={nftIcon}
            head="All NFT Types Supported"
            data="Images, videos, music, domains, and more - we support the entire NFT spectrum"
          />
          <InfoCards
            img={calculator}
            head="Revenue Sharing"
            data="Earn from both listings and sales with our transparent fee structure: 1% on listings, 1% on sales, 2% to CryptoSI DAO"
          />
        </div>
      </div>
    </section>
  );
};

export default PartnershipBenefits;