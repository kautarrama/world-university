import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        const sortedCountries = response.data.sort((a, b) => b.population - a.population).slice(0, 4);
        setCountries(sortedCountries);
      })
      .catch(error => {
        console.error("Error fetching countries data:", error);
      });
  }, []);

  return (
    <div className="flex flex-col w-full bg-gray-50">
      <header className="bg-green-700 text-white p-6 shadow-md">
        <h1 className="text-5xl text-center font-bold">WorldUniversity</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <section className="text-center mb-12">
          <h2 className="text-5xl mb-6 font-semibold text-green-700">Welcome to WorldUniversity</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto text-gray-700">
            Discover information about universities worldwide and explore our exciting features. 
            Start your journey by exploring the countries with the largest populations or search for universities globally.
          </p>
          <img 
            src="https://media.istockphoto.com/id/466580732/vector/world-map-countries.jpg?s=612x612&w=0&k=20&c=osDt6c1-c7ssEWhiiywnEQJ6TzTumN4o6gHiEt4mCPw=" 
            alt="WorldUniversity Illustration" 
            className="mx-auto mb-8 rounded-lg shadow-lg"
          />
          <Link 
            to="/search" 
            className="px-8 py-4 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-800 transition duration-300 text-xl"
          >
            {`Let's Explore`}
          </Link>
        </section>

        <section className="text-center mt-12">
          <h2 className="text-4xl mb-8 font-semibold text-green-700">Favorite Countries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {countries.map((country) => (
              <Link 
                key={country.cca3} 
                to={`/country/${country.name.common}`} 
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
              >
                <img 
                  src={country.flags.svg} 
                  alt={`Flag of ${country.name.common}`} 
                  className="w-32 h-20 mb-4 rounded-lg shadow-md" 
                />
                <h3 className="text-2xl font-semibold mb-2">{country.name.common}</h3>
                <p className="text-lg text-gray-600">Population: {country.population.toLocaleString()}</p>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-gray-600 text-sm">
            Disclaimer: The list of favorite countries is based on population data retrieved from <a href="https://restcountries.com" target="_blank" rel="noopener noreferrer" className="text-green-700 underline">restcountries.com</a>.
          </p>
        </section>
      </main>
      <footer className="bg-green-700 text-white p-4 text-center mt-12">
        <p>© 2024 WorldUniversity. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
