import React from "react";
import CategoryCard from "./CategoryCard";

const categoryData = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="12" width="24" height="20" rx="2" stroke="#BF5B18" strokeWidth="2"/>
        <rect x="12" y="8" width="16" height="4" rx="2" stroke="#BF5B18" strokeWidth="2"/>
        <circle cx="20" cy="22" r="4" fill="#BF5B18"/>
      </svg>
    ),
    title: "Art & Collectibles",
    description: "Digital art, trading cards, and collectible items"
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 8L28 14V26L20 32L12 26V14L20 8Z" stroke="#BF5B18" strokeWidth="2"/>
        <circle cx="20" cy="20" r="3" fill="#BF5B18"/>
      </svg>
    ),
    title: "Music & Audio",
    description: "Songs, albums, and unique audio experiences"
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="12" width="24" height="16" rx="2" stroke="#BF5B18" strokeWidth="2"/>
        <polygon points="12,12 20,8 28,12" stroke="#BF5B18" strokeWidth="2" fill="none"/>
        <circle cx="20" cy="20" r="2" fill="#BF5B18"/>
      </svg>
    ),
    title: "Video & Media",
    description: "Video clips, animations, and multimedia content"
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="20" height="20" rx="2" stroke="#BF5B18" strokeWidth="2"/>
        <path d="M15 15L25 25M25 15L15 25" stroke="#BF5B18" strokeWidth="2"/>
      </svg>
    ),
    title: "Domains & Identity",
    description: "Blockchain domains and digital identity assets"
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="12" stroke="#BF5B18" strokeWidth="2"/>
        <path d="M20 12V20L26 24" stroke="#BF5B18" strokeWidth="2"/>
      </svg>
    ),
    title: "Financial Instruments",
    description: "Tokenized assets and future price discovery features"
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="20" height="20" rx="2" stroke="#BF5B18" strokeWidth="2"/>
        <circle cx="16" cy="16" r="2" fill="#BF5B18"/>
        <circle cx="24" cy="16" r="2" fill="#BF5B18"/>
        <circle cx="16" cy="24" r="2" fill="#BF5B18"/>
        <circle cx="24" cy="24" r="2" fill="#BF5B18"/>
      </svg>
    ),
    title: "Gaming & Virtual",
    description: "In-game items, virtual real estate, and gaming assets"
  }
];

const CategoryCards = () => {
  return (
    <div className="category-cards">
      {categoryData.map((category, index) => (
        <CategoryCard
          key={index}
          icon={category.icon}
          title={category.title}
          description={category.description}
        />
      ))}
    </div>
  );
};

export default CategoryCards;