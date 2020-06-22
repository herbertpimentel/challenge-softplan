import React from 'react';

const HeroCard = (props) => {
  const imagePath = `${props.thumbnail.path}.${props.thumbnail.extension}`;

  return (
    <div className="hero-card">
      <div className="hero-card-image">
        <div
          className="content"
          style={{ backgroundImage: `url(${imagePath})` }}
        ></div>
      </div>
      <div className="hero-card-info">{props.name}</div>
    </div>
  );
};

export default HeroCard;
