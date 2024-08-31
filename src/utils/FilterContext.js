import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedSubregions, setSelectedSubregions] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isIndependent, setIsIndependent] = useState(false);

  return (
    <FilterContext.Provider value={{
      selectedRegions, setSelectedRegions,
      selectedSubregions, setSelectedSubregions,
      selectedLanguages, setSelectedLanguages,
      isIndependent, setIsIndependent,
    }}>
      {children}
    </FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
