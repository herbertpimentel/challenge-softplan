import React from 'react';

const HeroSerieList = ({ available = 0, items = [] }) => {
  return (
    <>
      <h3>
        Series <small>({available} disponíveis)</small>
      </h3>
      <ul>
        {items.map((item) => {
          return <li key={item.name}>{item.name}</li>;
        })}
      </ul>
    </>
  );
};

export default HeroSerieList;
