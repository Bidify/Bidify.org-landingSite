import React from "react";
import { roadmap } from "../data/roadmap";
import "../styles/patterns/roadmap.scss";

const Roadmap = () => {
  const renderRoadmaps = (
    <div className="card_wrapper">
      {roadmap.map((data, index) => {
        return (
          <div key={index} className="card">
            <div className="card_header">
              <span className="card_quarter">{data.no}</span>
              <span className="card_index">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="card_icon">
              <img src={data.image} alt="" aria-hidden="true" />
            </div>
            <p className="card_title">{data.title}</p>
            <p className="card_description">{data.description}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="roadmap" id="roadmap">
      <div className="roadmap_header">
        <p className="roadmap_eyebrow">Roadmap</p>
        <p className="text_primary_24_W600">
          The future of Bidify
        </p>
        <p className="roadmap_subtitle">
          Planned milestones for network launches, partner tooling, governance,
          education, and community integrations.
        </p>
      </div>

      {renderRoadmaps}
    </div>
  );
};

export default Roadmap;
