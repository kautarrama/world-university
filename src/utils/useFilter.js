import { useState } from 'react';

export const useFilters = () => {
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedSubregions, setSelectedSubregions] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isIndependent, setIsIndependent] = useState(false);

  return {
    selectedRegions,
    setSelectedRegions,
    selectedSubregions,
    setSelectedSubregions,
    selectedLanguages,
    setSelectedLanguages,
    isIndependent,
    setIsIndependent,
  };
};