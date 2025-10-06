import React from "react";
import StepCard from "./StepCard";
import SupportResources from "./SupportResources";

const GettingStarted = () => {
  return (
    <section className="getting-started">
      <div className="section-header">
        <h2 className="section-title">Get Started as a Partner</h2>
        <p className="section-subtitle">
          Join our growing ecosystem of marketplace creators
        </p>
      </div>
      
      <div className="getting-started-content">
        <div className="steps-container">
          <StepCard
            stepNumber="1"
            title="Apply for Partnership"
            description="Fill out our partnership application and get approved"
            ctaText="Apply Now"
            ctaLink="http://partnerships.bidify.org"
            ctaTarget="_blank"
            ctaRel="noopener noreferrer"
          />
          
          <StepCard
            stepNumber="2"
            title="Integrate Smart Contracts"
            description="Use our SDK and documentation to connect to our contracts"
            ctaText="View Docs"
            ctaLink="#"
          />
          
          <StepCard
            stepNumber="3"
            title="Launch Your Marketplace"
            description="Go live and start earning from listings and sales"
            ctaText="Launch Guide"
            ctaLink="#"
          />
          
          <StepCard
            stepNumber="4"
            title="Scale Your Business"
            description="Access analytics, support, and advanced features"
            ctaText="Partner Portal"
            ctaLink="#"
          />
        </div>
        
        <SupportResources />
      </div>
    </section>
  );
};

export default GettingStarted;