import React, { useState, useEffect } from 'react';
import './App.css';

import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@material-ui/core';
import InfoBox from './components/InfoBox';
import Map from './components/Map';

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
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>
          <FormControl className='app_dropdown'>
            <Select
              variant='outlined'
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value='worldwide'>WorldWide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className='app__stats'>
          <InfoBox title='Coronavirus Cases' cases={123} total={2000} />
          <InfoBox title='Recovered' cases={1234} total={3000} />
          <InfoBox title='Deaths' cases={12345} total={4000} />
        </div>

        <Map />
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Live Cases by Country</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
