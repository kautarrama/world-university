import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Menu from './components/Menu';

const Detail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
      .then(response => {
        setCountry(response.data[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
        setLoading(false);
      });
  }, [name]);

  useEffect(() => {
    if (country) {
      const container = L.DomUtil.get('map');
      if (container != null) {
        container._leaflet_id = null;
      }
      const map = L.map('map').setView([country.latlng[0], country.latlng[1]], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker([country.latlng[0], country.latlng[1]]).addTo(map)
        .bindPopup(`<b>${country.name.common}</b>`).openPopup();
    }
  }, [country]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Menu />
      <div className="p-8 flex flex-col items-center">
        <button
          onClick={() => navigate('/search')} 
          className="flex self-start items-center text-green-700 hover:text-green-800 transition duration-300 mb-4"
        >
        <i className="fa-solid fa-arrow-left mr-2"></i>
        Back to Explore
      </button>
        <div className="p-6 rounded-lg shadow-lg w-full max-w-2xl bg-white">
          {loading ? (
            <div>
              <Skeleton height={40} width={300} />
              <Skeleton height={80} width={120} className="mt-4" />
              <Skeleton height={20} width={200} className="mt-4" />
              <Skeleton height={20} width={250} className="mt-2" />
              <Skeleton height={20} width={300} className="mt-2" />
              <Skeleton height={20} width={200} className="mt-2" />
              <Skeleton height={20} width={150} className="mt-2" />
              <Skeleton height={450} width="100%" className="mt-4 rounded-lg shadow-lg" />
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                className="w-32 h-20 mb-4"
              />
              <p className="text-lg"><strong>Capital:</strong> {country.capital}</p>
              <p className="text-lg"><strong>Region:</strong> {country.region}</p>
              <p className="text-lg"><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p className="text-lg"><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
              <p className="text-lg"><strong>Currency:</strong> {Object.values(country.currencies).map(currency => currency.name).join(', ')}</p>
              <p className="text-lg"><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
              <div id="map" style={{ width: '100%', height: '450px' }} className="mt-4 rounded-lg shadow-lg"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
