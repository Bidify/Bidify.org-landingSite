import React from "react";

const resourceData = [
  {
    title: "Documentation",
    description: "Comprehensive guides and API references"
  },
  {
    title: "Community",
    description: "Join our Discord and connect with other partners"
  },
  {
    title: "Technical Support",
    description: "Dedicated assistance for integration challenges"
  },
  {
    title: "Marketing Tools",
    description: "Assets and campaigns to promote your marketplace"
  }
];

const SupportResources = () => {
  return (
    <div id="support-resources" className="support-resources">
      <h3 className="resources-title">Support & Resources</h3>
      <div className="resources-grid">
        {resourceData.map((resource, index) => (
          <div key={index} className="resource">
            <h4 className="resource-title">{resource.title}</h4>
            <p className="resource-description">{resource.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportResources;