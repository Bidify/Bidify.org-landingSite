import React from "react";

const CategoryCard = ({ icon, title, description }) => {
  return (
    <div className="category-card">
      <div className="category-icon">
        {icon}
      </div>
      <h3 className="category-title">{title}</h3>
      <p className="category-description">{description}</p>
    </div>
  );
};

export default CategoryCard;