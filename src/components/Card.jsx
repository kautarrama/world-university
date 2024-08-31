import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Card = ({ country }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/country/${country.name.common}`);
  };

  return (
    <div onClick={handleClick} className="border p-4 rounded shadow cursor-pointer bg-slate-50 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-bold">{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Region: {country.region}</p>
      <img src={country.flags.png} alt={`${country.name.common} flag`} className="w-16 h-10 mt-2"/>
    </div>
  );
};

Card.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
    }).isRequired,
    capital: PropTypes.string,
    region: PropTypes.string.isRequired,
    flags: PropTypes.shape({
      png: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Card;
