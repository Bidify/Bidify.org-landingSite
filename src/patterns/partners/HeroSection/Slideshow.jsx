import React from 'react';
import Slider from 'react-slick';
import mfer from '../../../assets/images/mfer.webp';
import doodle from '../../../assets/images/doodle.png';
import ape from '../../../assets/images/ape.webp';
import punk from '../../../assets/images/punk.png';

// Import slick-carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slideshow = () => {
  // NFT images data from the sale calculator section
  const slides = [
    {
      id: 1,
      name: 'Basic NFT',
      image: mfer,
      alt: 'Basic NFT - Mfer'
    },
    {
      id: 2,
      name: 'Standard NFT',
      image: doodle,
      alt: 'Standard NFT - Doodle'
    },
    {
      id: 3,
      name: 'Premium NFT',
      image: ape,
      alt: 'Premium NFT - Ape'
    },
    {
      id: 4,
      name: 'Elite NFT',
      image: punk,
      alt: 'Elite NFT - Punk'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'linear',
    arrows: false,
    accessibility: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          autoplay: true,
          autoplaySpeed: 4000,
          pauseOnHover: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          autoplay: true,
          autoplaySpeed: 4000,
          pauseOnHover: true
        }
      }
    ]
  };

  return (
    <div className="hero-slideshow">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide-wrapper">
            <div className="slide-content">
              <img
                src={slide.image}
                alt={slide.alt}
                className="slide-image"
                loading="lazy"
                width="350"
                height="350"
                style={{
                  objectFit: 'contain',
                  width: '350px',
                  height: '350px'
                }}
              />
              <div className="slide-overlay" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;