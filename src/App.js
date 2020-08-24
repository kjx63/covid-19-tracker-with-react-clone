import React, { useState, useEffect } from 'react';
import './App.css';

import { FormControl, Select, MenuItem } from '@material-ui/core';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {
    // const getCountriesData = () => {
    //   fetch('https://disease.sh/v3/covid-19/countries')
    //     .then((response) => response.json())
    //     .then((data) => {
    //       const countries = data.map((country) => ({
    //         name: country.country, // United Sttes, United Kingdom
    //         value: country.countryInfo.iso2, // UK, USA,
    //       }));
    //       setCountries(countries);
    //     });
    // };

    const getCountriesData = async () => {
      const response = await fetch('https://disease.sh/v3/covid-19/countries');
      const data = await response.json();
      const countries = data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));
      setCountries(countries);
    };
    getCountriesData();
  }, []);

  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  };

  return (
    <div className='app'>
      <div className='app__header'>
        <h1>COVID-19 Tracker</h1>
        <FormControl className='app_dropdown'>
          <Select variant='outlined' onChange={onCountryChange} value={country}>
            <MenuItem value='worldwide'>WorldWide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
