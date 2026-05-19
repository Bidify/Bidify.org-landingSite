import React from "react";

import "../../styles/patterns/cards/card.scss";

const InfoCards = ({ variant, img, head, data, index }) => {
  return (
    <div className="infoCards">
      {typeof index === "number" && (
        <span className="infoCards_index">{String(index + 1).padStart(2, "0")}</span>
      )}
      <div className="infoCards_icon">
        <img src={img} alt="" aria-hidden="true" />
      </div>
      <p
        className={`infoCards_title ${
          variant === "white" ? "text_white_20_W500" : "text_primary_20_W500"
        } `}
      >
        {head}
      </p>
      <p
        className={`infoCards_text ${
          variant === "white" ? "text_whiteSec_14_W400" : "text_secondary_14_W400"
        } `}
      >
        {data}
      </p>
    </div>
  );
};

export default InfoCards;
