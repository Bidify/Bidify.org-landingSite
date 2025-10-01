import React, { useState } from "react";
import "./NftSaleCalculator.scss";
import mfer from "../../assets/images/mfer.webp";
import doodle from "../../assets/images/doodle.png";
import ape from "../../assets/images/ape.webp";
import punk from "../../assets/images/punk.png";

const NftSaleCalculator = () => {
  const [ethPrice, setEthPrice] = useState(3000); // Default ETH price in USD
  const [nftPriceEth, setNftPriceEth] = useState(1); // NFT price in ETH
  
  // NFT options with different prices
  const nftOptions = [
    { id: 1, name: "Basic NFT", price: 0.5, image: mfer },
    { id: 2, name: "Standard NFT", price: 1, image: doodle },
    { id: 3, name: "Premium NFT", price: 10, image: ape },
    { id: 4, name: "Elite NFT", price: 50, image: punk }
  ];

  const calculateBreakdown = () => {
    const nftPriceUsd = nftPriceEth * ethPrice;
    
    // Fee calculations
    const daoFee = nftPriceUsd * 0.02; // 2% to DAO
    const listingPartnerFee = nftPriceUsd * 0.01; // 1% to listing partner
    const sellingPartnerFee = nftPriceUsd * 0.01; // 1% to selling partner
    const totalFees = daoFee + listingPartnerFee + sellingPartnerFee;
    const artistAmount = nftPriceUsd - totalFees;

    return {
      nftPriceUsd: nftPriceUsd.toFixed(2),
      daoFee: daoFee.toFixed(2),
      listingPartnerFee: listingPartnerFee.toFixed(2),
      sellingPartnerFee: sellingPartnerFee.toFixed(2),
      totalFees: totalFees.toFixed(2),
      artistAmount: artistAmount.toFixed(2)
    };
  };

  const breakdown = calculateBreakdown();

  const formatCurrency = (value) => {
    return `$${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="nft-sale-calculator">
      <h3 className="calculator-title">NFT Sale Breakdown Calculator</h3>
      <p className="calculator-description">
        See how the fees are distributed when an NFT is sold
      </p>
      
      <div className="calculator-inputs">
        <div className="input-group">
          <label htmlFor="eth-price" className="input-label">
            ETH Price (USD)
          </label>
          <input
            id="eth-price"
            type="number"
            min="0"
            step="0.01"
            value={ethPrice}
            onChange={(e) => setEthPrice(Number(e.target.value) || 0)}
            className="input-field"
            placeholder="3000"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="nft-price-eth" className="input-label">
            NFT Price (ETH)
          </label>
          <input
            id="nft-price-eth"
            type="number"
            min="0"
            step="0.01"
            value={nftPriceEth}
            onChange={(e) => setNftPriceEth(Number(e.target.value) || 0)}
            className="input-field"
            placeholder="1"
          />
        </div>
      </div>
      
      <div className="nft-thumbnails">
        <p className="thumbnails-label">Select NFT Type:</p>
        <div className="thumbnails-grid">
          {nftOptions.map((nft) => (
            <div
              key={nft.id}
              className={`thumbnail-item ${nftPriceEth === nft.price ? 'active' : ''}`}
              onClick={() => setNftPriceEth(nft.price)}
              title={`${nft.name} - ${nft.price} ETH`}
            >
              <img src={nft.image} alt={nft.name} className="thumbnail-image" />
              <div className="thumbnail-price">{nft.price} ETH</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="calculator-results">
        <div className="result-header">
          <span className="result-label">NFT Sale Value:</span>
          <span className="result-value">{nftPriceEth} ETH ({formatCurrency(breakdown.nftPriceUsd)})</span>
        </div>
        
        <div className="result-item">
          <span className="result-label">Artist Receives:</span>
          <span className="result-value artist-amount">{formatCurrency(breakdown.artistAmount)}</span>
        </div>
        
        <div className="result-item">
          <span className="result-label">CryptoSI DAO (2%):</span>
          <span className="result-value dao-fee">{formatCurrency(breakdown.daoFee)}</span>
        </div>
        
        <div className="result-item">
          <span className="result-label">Listing Partner (1%):</span>
          <span className="result-value listing-fee">{formatCurrency(breakdown.listingPartnerFee)}</span>
        </div>
        
        <div className="result-item">
          <span className="result-label">Selling Partner (1%):</span>
          <span className="result-value selling-fee">{formatCurrency(breakdown.sellingPartnerFee)}</span>
        </div>
        
        <div className="result-item total">
          <span className="result-label">Total Fees (4%):</span>
          <span className="result-value total-fees">{formatCurrency(breakdown.totalFees)}</span>
        </div>
      </div>
    </div>
  );
};

export default NftSaleCalculator;