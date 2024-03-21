import React from 'react';
import CuisineType from './CuisineType';
import { Link } from 'react-router-dom';

const Restaurant = ({ data }) => {
  const path = `/restaurants/${data._id}`;
  return (
    <Link to={path}><div>
      <h2>{data.name}</h2>
      <p>{data.address}</p>
      <p>{`${data.location.city}, ${data.location.country}`}</p>
      <div>
        {data.cuisineType.map(cuisine => (
          <CuisineType key={cuisine._id} data={cuisine} />
        ))}
      </div>
    </div>
    </Link>
  );
};

export default Restaurant;
