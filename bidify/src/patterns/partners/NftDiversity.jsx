import React from "react";
import CategoryCards from "./CategoryCards";
import FutureFeatures from "./FutureFeatures";

const NftDiversity = () => {
  return (
    <section className="nft-diversity">
      <div className="section-header">
        <h2 className="section-title">Support All NFT Types</h2>
        <p className="section-subtitle">
          Beyond images - we support the entire digital asset ecosystem
        </p>
      </div>
      
      <div className="nft-content">
        <CategoryCards />
        <FutureFeatures />
      </div>
    </section>
  );
};

export default NftDiversity;