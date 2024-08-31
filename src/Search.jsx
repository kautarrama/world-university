import React, { useState, useEffect, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Menu from './components/Menu';
import Card from './components/Card';
import Select from 'react-select';
import { FilterContext } from './utils/FilterContext';
import { PaginationContext } from './utils/PaginationContext';

const Search = () => {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [subregions, setSubregions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const {
    selectedRegions, setSelectedRegions,
    selectedSubregions, setSelectedSubregions,
    selectedLanguages, setSelectedLanguages,
    isIndependent, setIsIndependent,
  } = useContext(FilterContext);
  const {
    sortOrder, setSortOrder,
    currentPage, setCurrentPage,
    countriesPerPage
  } = useContext(PaginationContext);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        const regions = [...new Set(data.map(country => country.region))];
        setRegions(regions);

        const subregions = [...new Set(data.map(country => country.subregion))];
        setSubregions(subregions);

        const languages = [...new Set(data.flatMap(country => Object.values(country.languages || {})))];
        setLanguages(languages);

        setLoading(false);  // Data sudah selesai dimuat
      });
  }, []);

  const handleRegionChange = (region) => {
    setSelectedRegions(prev => prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]);
  };

  const handleSubregionChange = (subregion) => {
    setSelectedSubregions(prev => prev.includes(subregion) ? prev.filter(r => r !== subregion) : [...prev, subregion]);
  };

  const handleLanguageChange = (languages) => {
    setSelectedLanguages(languages ? languages.map(option => option.value) : []);
  };

  const filteredCountries = countries.filter(country => {
    return (
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRegions.length === 0 || selectedRegions.includes(country.region)) &&
      (selectedSubregions.length === 0 || selectedSubregions.includes(country.subregion)) &&
      (selectedLanguages.length === 0 || selectedLanguages.some(language => country.languages && Object.values(country.languages).includes(language))) &&
      (isIndependent ? country.independent : true)
    );
  }).sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.common.localeCompare(b.name.common);
    } else {
      return b.name.common.localeCompare(a.name.common);
    }
  });

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => paginate(1)}
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="start-ellipsis" className="px-4 py-2">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-4 py-2 rounded ${currentPage === i ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="end-ellipsis" className="px-4 py-2">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => paginate(totalPages)}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  const languageOptions = languages.map(language => ({
    value: language,
    label: language
  }));

  return (
    <div className="bg-gray-100 min-h-screen">
      <Menu />
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/4 w-full p-4 bg-white rounded shadow-lg">
            <div>
              <h2 className="font-bold mb-2">Regions</h2>
              {loading ? (
                <Skeleton count={5} height={24} className="mb-2" />
              ) : (
                regions.map((region, index) => (
                  <label key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedRegions.includes(region)}
                      onChange={() => handleRegionChange(region)}
                      className="form-checkbox"
                    />
                    <span>{region}</span>
                  </label>
                ))
              )}
            </div>
            <div className="mt-4">
              <h2 className="font-bold mb-2">Subregions</h2>
              {loading ? (
                <Skeleton count={5} height={24} className="mb-2" />
              ) : (
                subregions.map((subregion, index) => (
                  <label key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedSubregions.includes(subregion)}
                      onChange={() => handleSubregionChange(subregion)}
                      className="form-checkbox"
                    />
                    <span>{subregion}</span>
                  </label>
                ))
              )}
            </div>
          </div>
          <div className="lg:w-3/4 w-full p-4">
            <h1 className="text-4xl font-bold text-green-700 mb-6">Search and get what you want!</h1>
            <input
              type="text"
              placeholder="Search for a country..."
              className="border p-2 mb-4 w-full rounded shadow"
              onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="flex items-center space-x-2 mb-4">
              <Select
                options={languageOptions}
                isMulti
                onChange={handleLanguageChange}
                className="w-full"
              />
              <select onChange={e => setSortOrder(e.target.value)} className="border p-2 rounded shadow">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={e => setIsIndependent(e.target.checked)}
                  className="form-checkbox"
                />
                <span>Independent</span>
              </label>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(countriesPerPage)].map((_, index) => (
                  <Skeleton key={index} height={200} />
                ))}
              </div>
            ) : currentCountries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentCountries.map(country => (
                  <Card 
                    key={country.cca3} 
                    country={{
                      ...country,
                      capital: Array.isArray(country.capital) ? country.capital.join(', ') : country.capital
                    }} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">No Countries Found</h2>
                <p className="text-lg">No countries match your search criteria. Try adjusting your filters or search term.</p>
              </div>
            )}
            <div className="flex justify-center mt-4 space-x-2">
              {!loading && renderPagination()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
