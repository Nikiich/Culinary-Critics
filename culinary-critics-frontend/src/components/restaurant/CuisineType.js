import React from 'react';

const CuisineType = ({ data }) => {
  return (
    <div>
      <h4>{data.name}</h4>
      <p>{data.description}</p>
    </div>
  );
};

export default CuisineType;