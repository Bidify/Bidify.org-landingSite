import React, { useState, useEffect } from "react";

const EarningsCalculator = () => {
  const [monthlyListings, setMonthlyListings] = useState(1000);
  const [averageSaleValue, setAverageSaleValue] = useState(500);
  const [successRate, setSuccessRate] = useState(25);
  const [listingRevenue, setListingRevenue] = useState(10);
  const [salesRevenue, setSalesRevenue] = useState(125);
  const [totalRevenue, setTotalRevenue] = useState(135);

  useEffect(() => {
    const listingsRevenue = (monthlyListings * 1) / 100;
    const successfulSales = monthlyListings * (successRate / 100);
    const salesRevenue = (successfulSales * averageSaleValue * 1) / 100;
    const total = listingsRevenue + salesRevenue;

    setListingRevenue(listingsRevenue);
    setSalesRevenue(salesRevenue);
    setTotalRevenue(total);
  }, [monthlyListings, averageSaleValue, successRate]);

  const formatCurrency = (value) => {
    return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="earnings-calculator">
      <h3 className="calculator-title">Earnings Calculator</h3>
      
      <div className="calculator-inputs">
        <div className="input-group">
          <label htmlFor="monthly-listings" className="input-label">
            Monthly Listings
          </label>
          <input
            id="monthly-listings"
            type="number"
            min="0"
            value={monthlyListings}
            onChange={(e) => setMonthlyListings(Number(e.target.value) || 0)}
            className="input-field"
            placeholder="1000"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="average-sale-value" className="input-label">
            Average Sale Value ($)
          </label>
          <input
            id="average-sale-value"
            type="number"
            min="0"
            value={averageSaleValue}
            onChange={(e) => setAverageSaleValue(Number(e.target.value) || 0)}
            className="input-field"
            placeholder="500"
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="success-rate" className="input-label">
            Success Rate (%)
          </label>
          <input
            id="success-rate"
            type="number"
            min="0"
            max="100"
            value={successRate}
            onChange={(e) => setSuccessRate(Number(e.target.value) || 0)}
            className="input-field"
            placeholder="25"
          />
        </div>
      </div>
      
      <div className="calculator-results">
        <div className="result-item">
          <span className="result-label">Listing Revenue:</span>
          <span className="result-value">{formatCurrency(listingRevenue)}/month</span>
        </div>
        
        <div className="result-item">
          <span className="result-label">Sales Revenue:</span>
          <span className="result-value">{formatCurrency(salesRevenue)}/month</span>
        </div>
        
        <div className="result-item total">
          <span className="result-label">Total Monthly:</span>
          <span className="result-value">{formatCurrency(totalRevenue)}/month</span>
        </div>
      </div>
    </div>
  );
};

export default EarningsCalculator;